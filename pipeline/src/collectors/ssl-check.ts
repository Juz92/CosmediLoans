import * as tls from "tls";
import type { CollectorResult } from "./types.js";
import { getSiteConfig } from "../config/site.js";

/**
 * SSL certificate checker: connects via TLS on port 443,
 * reads the peer certificate, and calculates days until expiry.
 * Row format: [timestamp, daysUntilExpiry, expiryDate, issuer, subject, error]
 */
export async function collectSslCheck(): Promise<CollectorResult> {
  const config = getSiteConfig();
  const timestamp = new Date().toISOString();

  try {
    const cert = await getCertificate(config.domain);
    const expiryDate = new Date(cert.valid_to);
    const now = new Date();
    const daysUntilExpiry = Math.floor(
      (expiryDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)
    );
    const issuer = formatCertField(cert.issuer);
    const subject = formatCertField(cert.subject);

    return {
      source: "ssl-check",
      timestamp,
      rows: [
        [
          timestamp,
          String(daysUntilExpiry),
          expiryDate.toISOString(),
          issuer,
          subject,
          "",
        ],
      ],
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return {
      source: "ssl-check",
      timestamp,
      rows: [[timestamp, "0", "", "", "", message]],
    };
  }
}

interface CertDetails {
  valid_to: string;
  issuer: Record<string, string>;
  subject: Record<string, string>;
}

function getCertificate(hostname: string): Promise<CertDetails> {
  return new Promise((resolve, reject) => {
    const socket = tls.connect(
      {
        host: hostname,
        port: 443,
        servername: hostname,
        timeout: 10_000,
      },
      () => {
        const cert = socket.getPeerCertificate();
        socket.end();

        if (!cert || !cert.valid_to) {
          reject(new Error("No certificate returned"));
          return;
        }

        resolve({
          valid_to: cert.valid_to,
          issuer: cert.issuer as unknown as Record<string, string>,
          subject: cert.subject as unknown as Record<string, string>,
        });
      }
    );

    socket.on("error", (err) => {
      socket.destroy();
      reject(err);
    });

    socket.on("timeout", () => {
      socket.destroy();
      reject(new Error("TLS connection timed out"));
    });
  });
}

function formatCertField(field: Record<string, string>): string {
  if (!field) return "";
  // Common fields: O (organization), CN (common name)
  const parts: string[] = [];
  if (field.O) parts.push(`O=${field.O}`);
  if (field.CN) parts.push(`CN=${field.CN}`);
  return parts.join(", ") || JSON.stringify(field);
}

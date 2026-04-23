import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Read the CosmediLoans privacy policy. Learn how we collect, use, and protect your personal information in accordance with the Australian Privacy Act 1988.",
  alternates: { canonical: "/privacy-policy" },
};

const sections = [
  "Introduction",
  "What We Collect",
  "How We Collect It",
  "How We Use It",
  "Sharing Your Data",
  "Storage & Security",
  "Cookies",
  "Your Rights",
  "Retention",
  "Third-Party Links",
  "Policy Changes",
  "Complaints",
  "Contact Us",
];

export default function PrivacyPolicyPage() {
  return (
    <>
      <section className="bg-gradient-to-b from-[#f0f5ff] to-[#e0ecff] section-padding">
        <div className="container-narrow text-center">
          <h1 className="text-4xl md:text-hero-h1 text-text-dark mb-4">
            Privacy Policy
          </h1>
          <p className="text-sm text-text-muted">Last updated: March 2026</p>
        </div>
      </section>

      <section className="section-padding bg-background">
        <div className="container-narrow max-w-3xl">

          {/* Quick nav */}
          <div className="flex flex-wrap gap-2 mb-10 pb-8 border-b border-border">
            {sections.map((s, i) => (
              <a
                key={s}
                href={`#pp-${i + 1}`}
                className="text-xs font-medium text-primary bg-primary-wash px-3 py-1.5 rounded-full hover:bg-primary/10 transition-colors"
              >
                {i + 1}. {s}
              </a>
            ))}
          </div>

          <div className="space-y-10">

            <div id="pp-1" className="scroll-mt-24">
              <h2 className="text-lg font-semibold text-text-dark mb-4 pb-2 border-b border-border">
                1. Introduction
              </h2>
              <div className="space-y-3 text-sm text-text-body leading-relaxed">
                <p>
                  CosmediLoans ABN 14 693 894 558 (&ldquo;CosmediLoans&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;,
                  &ldquo;our&rdquo;) is committed to protecting the privacy of individuals who use our
                  website and services. This Privacy Policy outlines how we collect, use, store,
                  disclose, and protect your personal information in accordance with the{" "}
                  <em>Privacy Act 1988</em> (Cth) and the Australian Privacy Principles (APPs).
                </p>
                <p>
                  By using our website at cosmediloans.com.au and submitting information through
                  our forms, you consent to the collection and use of your personal information
                  as described in this policy.
                </p>
              </div>
            </div>

            <div id="pp-2" className="scroll-mt-24">
              <h2 className="text-lg font-semibold text-text-dark mb-4 pb-2 border-b border-border">
                2. What Personal Information We Collect
              </h2>
              <p className="text-sm text-text-body leading-relaxed mb-3">
                We may collect the following types of personal information:
              </p>
              <ul className="space-y-2 text-sm text-text-body">
                <li className="flex gap-2"><span className="text-primary font-bold mt-0.5">·</span><span><strong className="text-text-dark">Identity information:</strong> Full name, date of birth (if required by a lender)</span></li>
                <li className="flex gap-2"><span className="text-primary font-bold mt-0.5">·</span><span><strong className="text-text-dark">Contact information:</strong> Email address, phone number, residential address</span></li>
                <li className="flex gap-2"><span className="text-primary font-bold mt-0.5">·</span><span><strong className="text-text-dark">Financial information:</strong> Estimated loan amount, procedure type, employment status, income details (only when shared voluntarily)</span></li>
                <li className="flex gap-2"><span className="text-primary font-bold mt-0.5">·</span><span><strong className="text-text-dark">Technical information:</strong> IP address, browser type, device information, pages visited, referring URLs</span></li>
                <li className="flex gap-2"><span className="text-primary font-bold mt-0.5">·</span><span><strong className="text-text-dark">Marketing information:</strong> UTM parameters, campaign source, ad click identifiers</span></li>
              </ul>
              <p className="text-sm text-text-body leading-relaxed mt-3">
                We do not collect sensitive information such as your credit file, tax file number,
                or health records through our website. Any credit checks or detailed financial
                assessments are conducted by the licensed broker you are connected with, under
                their own privacy obligations.
              </p>
            </div>

            <div id="pp-3" className="scroll-mt-24">
              <h2 className="text-lg font-semibold text-text-dark mb-4 pb-2 border-b border-border">
                3. How We Collect Personal Information
              </h2>
              <p className="text-sm text-text-body leading-relaxed mb-3">
                We collect personal information through:
              </p>
              <ul className="space-y-2 text-sm text-text-body">
                <li className="flex gap-2"><span className="text-primary font-bold mt-0.5">·</span><span>Online enquiry forms on our website (lead capture, contact, calculator email capture)</span></li>
                <li className="flex gap-2"><span className="text-primary font-bold mt-0.5">·</span><span>Direct communication via email or phone</span></li>
                <li className="flex gap-2"><span className="text-primary font-bold mt-0.5">·</span><span>Cookies and analytics tools that track website usage</span></li>
                <li className="flex gap-2"><span className="text-primary font-bold mt-0.5">·</span><span>Third-party advertising platforms (Google Ads, Meta) that provide referral data</span></li>
              </ul>
              <p className="text-sm text-text-body leading-relaxed mt-3">
                Where reasonable and practical, we collect personal information directly from
                you. We will not collect information by unlawful or unfair means.
              </p>
            </div>

            <div id="pp-4" className="scroll-mt-24">
              <h2 className="text-lg font-semibold text-text-dark mb-4 pb-2 border-b border-border">
                4. How We Use Your Personal Information
              </h2>
              <ul className="space-y-2 text-sm text-text-body">
                <li className="flex gap-2"><span className="text-primary font-bold mt-0.5">·</span><span>To connect you with a licensed finance broker who can assist with your medical financing enquiry</span></li>
                <li className="flex gap-2"><span className="text-primary font-bold mt-0.5">·</span><span>To respond to your questions and communications</span></li>
                <li className="flex gap-2"><span className="text-primary font-bold mt-0.5">·</span><span>To improve our website, services, and user experience</span></li>
                <li className="flex gap-2"><span className="text-primary font-bold mt-0.5">·</span><span>To analyse website traffic and marketing campaign performance</span></li>
                <li className="flex gap-2"><span className="text-primary font-bold mt-0.5">·</span><span>To comply with legal obligations</span></li>
                <li className="flex gap-2"><span className="text-primary font-bold mt-0.5">·</span><span>To send you service-related communications (not marketing, unless you opt in)</span></li>
              </ul>
              <p className="text-sm text-text-body leading-relaxed mt-3">
                We will not use your personal information for direct marketing purposes without
                your express consent. You may opt out of marketing communications at any time.
              </p>
            </div>

            <div id="pp-5" className="scroll-mt-24">
              <h2 className="text-lg font-semibold text-text-dark mb-4 pb-2 border-b border-border">
                5. How We Share Your Personal Information
              </h2>
              <p className="text-sm text-text-body leading-relaxed mb-3">
                We may share your personal information with the following third parties, strictly
                for the purposes described above:
              </p>
              <ul className="space-y-3 text-sm text-text-body">
                <li className="flex gap-2"><span className="text-primary font-bold mt-0.5">·</span><span><strong className="text-text-dark">Licensed finance brokers:</strong> Your enquiry details are shared with a licensed ACL holder or authorised credit representative to provide you with loan options</span></li>
                <li className="flex gap-2"><span className="text-primary font-bold mt-0.5">·</span><span><strong className="text-text-dark">Technology service providers:</strong> Hosting, CRM, email delivery, and analytics platforms that help us operate our website</span></li>
                <li className="flex gap-2"><span className="text-primary font-bold mt-0.5">·</span><span><strong className="text-text-dark">Advertising platforms:</strong> Aggregated, non-personally-identifiable conversion data for campaign optimisation</span></li>
                <li className="flex gap-2"><span className="text-primary font-bold mt-0.5">·</span><span><strong className="text-text-dark">Legal and regulatory bodies:</strong> Where required by law, court order, or government authority</span></li>
              </ul>
              <p className="text-sm text-text-body leading-relaxed mt-3">
                We do not sell your personal information to third parties.
              </p>
            </div>

            <div id="pp-6" className="scroll-mt-24">
              <h2 className="text-lg font-semibold text-text-dark mb-4 pb-2 border-b border-border">
                6. Data Storage and Security
              </h2>
              <div className="space-y-3 text-sm text-text-body leading-relaxed">
                <p>
                  We store personal information using secure, encrypted systems with SSL/TLS
                  encryption for all data transmitted between your browser and our servers. Data
                  is stored on servers located in Australia or in jurisdictions that provide
                  comparable privacy protections.
                </p>
                <p>
                  We implement reasonable technical and organisational measures to protect your
                  information against unauthorised access, loss, misuse, or alteration — including
                  access controls, encryption at rest, regular security assessments, and staff
                  training on data handling procedures.
                </p>
                <p>
                  If you become aware of any security breach, please contact us immediately at{" "}
                  <a href="mailto:cosmediloans@gmail.com" className="text-primary hover:underline">
                    cosmediloans@gmail.com
                  </a>
                  .
                </p>
              </div>
            </div>

            <div id="pp-7" className="scroll-mt-24">
              <h2 className="text-lg font-semibold text-text-dark mb-4 pb-2 border-b border-border">
                7. Cookies and Tracking Technologies
              </h2>
              <p className="text-sm text-text-body leading-relaxed mb-3">
                Our website uses cookies and similar technologies to:
              </p>
              <ul className="space-y-2 text-sm text-text-body">
                <li className="flex gap-2"><span className="text-primary font-bold mt-0.5">·</span><span>Remember your preferences and form entries</span></li>
                <li className="flex gap-2"><span className="text-primary font-bold mt-0.5">·</span><span>Analyse website traffic and user behaviour (via Google Analytics or similar)</span></li>
                <li className="flex gap-2"><span className="text-primary font-bold mt-0.5">·</span><span>Measure the effectiveness of advertising campaigns</span></li>
                <li className="flex gap-2"><span className="text-primary font-bold mt-0.5">·</span><span>Provide a better user experience</span></li>
              </ul>
              <p className="text-sm text-text-body leading-relaxed mt-3">
                You can control cookie settings through your browser preferences. Disabling
                cookies may affect the functionality of certain parts of our website.
              </p>
            </div>

            <div id="pp-8" className="scroll-mt-24">
              <h2 className="text-lg font-semibold text-text-dark mb-4 pb-2 border-b border-border">
                8. Your Rights Under the Australian Privacy Principles
              </h2>
              <ul className="space-y-2 text-sm text-text-body">
                <li className="flex gap-2"><span className="text-primary font-bold mt-0.5">·</span><span><strong className="text-text-dark">Access:</strong> Request access to the personal information we hold about you</span></li>
                <li className="flex gap-2"><span className="text-primary font-bold mt-0.5">·</span><span><strong className="text-text-dark">Correction:</strong> Request correction of any inaccurate, incomplete, or out-of-date information</span></li>
                <li className="flex gap-2"><span className="text-primary font-bold mt-0.5">·</span><span><strong className="text-text-dark">Complaint:</strong> Lodge a complaint if you believe we have breached the APPs</span></li>
                <li className="flex gap-2"><span className="text-primary font-bold mt-0.5">·</span><span><strong className="text-text-dark">Anonymity:</strong> In some cases, interact with us anonymously, although this may limit our ability to assist you</span></li>
              </ul>
              <p className="text-sm text-text-body leading-relaxed mt-3">
                To exercise any of these rights, contact us at{" "}
                <a href="mailto:cosmediloans@gmail.com" className="text-primary hover:underline">
                  cosmediloans@gmail.com
                </a>
                . We will respond within 30 days.
              </p>
            </div>

            <div id="pp-9" className="scroll-mt-24">
              <h2 className="text-lg font-semibold text-text-dark mb-4 pb-2 border-b border-border">
                9. Retention of Personal Information
              </h2>
              <p className="text-sm text-text-body leading-relaxed">
                We retain personal information only for as long as necessary to fulfil the
                purposes for which it was collected, or as required by law. Lead enquiry data is
                typically retained for 24 months from the date of submission, after which it is
                securely deleted or de-identified. You may request deletion of your information
                at any time by contacting us.
              </p>
            </div>

            <div id="pp-10" className="scroll-mt-24">
              <h2 className="text-lg font-semibold text-text-dark mb-4 pb-2 border-b border-border">
                10. Third-Party Links
              </h2>
              <p className="text-sm text-text-body leading-relaxed">
                Our website may contain links to third-party websites (such as lender websites
                or external resources). We are not responsible for the privacy practices or
                content of those websites. We encourage you to read the privacy policy of any
                website you visit.
              </p>
            </div>

            <div id="pp-11" className="scroll-mt-24">
              <h2 className="text-lg font-semibold text-text-dark mb-4 pb-2 border-b border-border">
                11. Changes to This Privacy Policy
              </h2>
              <p className="text-sm text-text-body leading-relaxed">
                We may update this Privacy Policy from time to time to reflect changes in our
                practices, technology, or legal requirements. The updated policy will be posted
                on this page with a revised &ldquo;Last updated&rdquo; date. We encourage you to review
                this policy periodically.
              </p>
            </div>

            <div id="pp-12" className="scroll-mt-24">
              <h2 className="text-lg font-semibold text-text-dark mb-4 pb-2 border-b border-border">
                12. Complaints
              </h2>
              <p className="text-sm text-text-body leading-relaxed">
                If you believe we have breached the Australian Privacy Principles, contact us at{" "}
                <a href="mailto:cosmediloans@gmail.com" className="text-primary hover:underline">
                  cosmediloans@gmail.com
                </a>
                . We will investigate and respond within 30 days. If you are not satisfied with
                our response, you may escalate your complaint to the Office of the Australian
                Information Commissioner (OAIC) at{" "}
                <a
                  href="https://www.oaic.gov.au"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  www.oaic.gov.au
                </a>
                .
              </p>
            </div>

            {/* Contact card */}
            <div id="pp-13" className="scroll-mt-24">
              <h2 className="text-lg font-semibold text-text-dark mb-4 pb-2 border-b border-border">
                13. Contact Us
              </h2>
              <div className="bg-primary-wash rounded-card p-6 space-y-2 text-sm">
                <p className="font-semibold text-text-dark mb-3">
                  For privacy enquiries or to exercise your rights:
                </p>
                <p><span className="text-text-muted w-20 inline-block">Business</span> CosmediLoans</p>
                <p><span className="text-text-muted w-20 inline-block">ABN</span> 14 693 894 558</p>
                <p>
                  <span className="text-text-muted w-20 inline-block">Email</span>
                  <a href="mailto:cosmediloans@gmail.com" className="text-primary hover:underline">
                    cosmediloans@gmail.com
                  </a>
                </p>
                <p>
                  <span className="text-text-muted w-20 inline-block">Phone</span>
                  <a href="tel:0422676073" className="text-primary hover:underline">
                    0422 676 073
                  </a>
                </p>
                <p><span className="text-text-muted w-20 inline-block">Website</span> cosmediloans.com.au</p>
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}

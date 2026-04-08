import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Read the CosmediLoans privacy policy. Learn how we collect, use, and protect your personal information in accordance with the Australian Privacy Act 1988.",
  alternates: { canonical: "/privacy-policy" },
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <section className="bg-gradient-to-b from-[#f0f5ff] to-[#e0ecff] section-padding">
        <div className="container-narrow text-center">
          <h1 className="text-4xl md:text-hero-h1 text-text-dark mb-4">
            Privacy Policy
          </h1>
          <p className="text-sm text-text-muted">
            Last updated: March 2026
          </p>
        </div>
      </section>

      <section className="section-padding bg-background">
        <div className="container-narrow max-w-3xl prose prose-slate max-w-none">
          <h2>1. Introduction</h2>
          <p>
            [PLACEHOLDER: Business Name] ABN [PLACEHOLDER: ABN] (&ldquo;CosmediLoans&rdquo;,
            &ldquo;we&rdquo;, &ldquo;us&rdquo;, &ldquo;our&rdquo;) is committed to protecting the privacy of
            individuals who use our website and services. This Privacy Policy outlines how we
            collect, use, store, disclose, and protect your personal information in accordance
            with the <em>Privacy Act 1988</em> (Cth) and the Australian Privacy Principles
            (APPs).
          </p>
          <p>
            By using our website at cosmedloans.com.au and submitting information through our
            forms, you consent to the collection and use of your personal information as
            described in this policy.
          </p>

          <h2>2. What Personal Information We Collect</h2>
          <p>We may collect the following types of personal information:</p>
          <ul>
            <li>
              <strong>Identity information:</strong> Full name, date of birth (if required by a
              lender)
            </li>
            <li>
              <strong>Contact information:</strong> Email address, phone number, residential
              address
            </li>
            <li>
              <strong>Financial information:</strong> Estimated loan amount, procedure type,
              employment status, income details (only when shared voluntarily through our
              forms)
            </li>
            <li>
              <strong>Technical information:</strong> IP address, browser type, device
              information, pages visited, referring URLs
            </li>
            <li>
              <strong>Marketing information:</strong> UTM parameters, campaign source, ad
              click identifiers
            </li>
          </ul>
          <p>
            We do not collect sensitive information such as your credit file, tax file number,
            or health records through our website. Any credit checks or detailed financial
            assessments are conducted by the licensed broker you are connected with, under
            their own privacy obligations.
          </p>

          <h2>3. How We Collect Personal Information</h2>
          <p>We collect personal information through:</p>
          <ul>
            <li>Online enquiry forms on our website (lead capture forms, contact forms, calculator email capture)</li>
            <li>Direct communication via email or phone</li>
            <li>Cookies and analytics tools that track website usage</li>
            <li>Third-party advertising platforms (such as Google Ads and Meta) that provide referral data</li>
          </ul>
          <p>
            Where reasonable and practical, we collect personal information directly from
            you. We will not collect information by unlawful or unfair means.
          </p>

          <h2>4. How We Use Your Personal Information</h2>
          <p>We use your personal information for the following purposes:</p>
          <ul>
            <li>To connect you with a licensed finance broker who can assist with your medical financing enquiry</li>
            <li>To respond to your questions and communications</li>
            <li>To improve our website, services, and user experience</li>
            <li>To analyse website traffic and marketing campaign performance</li>
            <li>To comply with legal obligations</li>
            <li>To send you service-related communications (not marketing, unless you opt in)</li>
          </ul>
          <p>
            We will not use your personal information for direct marketing purposes without
            your express consent. You may opt out of marketing communications at any time.
          </p>

          <h2>5. How We Share Your Personal Information</h2>
          <p>
            We may share your personal information with the following third parties, strictly
            for the purposes described above:
          </p>
          <ul>
            <li>
              <strong>Licensed finance brokers:</strong> Your enquiry details (name, contact
              information, procedure type, estimated amount) are shared with a licensed
              Australian Credit Licence (ACL) holder or authorised credit representative in
              our broker network for the purpose of providing you with loan options
            </li>
            <li>
              <strong>Technology service providers:</strong> Hosting providers, CRM systems,
              email delivery services, and analytics platforms that assist us in operating
              our website and managing enquiries
            </li>
            <li>
              <strong>Advertising platforms:</strong> Aggregated, non-personally-identifiable
              conversion data may be shared with advertising platforms for campaign
              optimisation
            </li>
            <li>
              <strong>Legal and regulatory bodies:</strong> Where required by law, court
              order, or government authority
            </li>
          </ul>
          <p>
            We do not sell your personal information to third parties. We do not share your
            information with lenders directly — the broker you are connected with manages
            the lender relationship under their own privacy and licensing obligations.
          </p>

          <h2>6. Data Storage and Security</h2>
          <p>
            We store personal information using secure, encrypted systems. Our website uses
            SSL/TLS encryption for all data transmitted between your browser and our servers.
            Data is stored on servers located in Australia or in jurisdictions that provide
            comparable privacy protections.
          </p>
          <p>
            We implement reasonable technical and organisational measures to protect your
            information against unauthorised access, loss, misuse, or alteration. These
            measures include access controls, encryption at rest, regular security
            assessments, and staff training on data handling procedures.
          </p>
          <p>
            Despite our best efforts, no method of electronic transmission or storage is
            100% secure. If you become aware of any security breach, please contact us
            immediately at [PLACEHOLDER: Contact Email].
          </p>

          <h2>7. Cookies and Tracking Technologies</h2>
          <p>Our website uses cookies and similar technologies to:</p>
          <ul>
            <li>Remember your preferences and form entries</li>
            <li>Analyse website traffic and user behaviour (via Google Analytics or similar)</li>
            <li>Measure the effectiveness of advertising campaigns</li>
            <li>Provide a better user experience</li>
          </ul>
          <p>
            You can control cookie settings through your browser preferences. Disabling
            cookies may affect the functionality of certain parts of our website. We use both
            session cookies (which expire when you close your browser) and persistent cookies
            (which remain until they expire or you delete them).
          </p>

          <h2>8. Your Rights Under the Australian Privacy Principles</h2>
          <p>Under the APPs, you have the right to:</p>
          <ul>
            <li>
              <strong>Access:</strong> Request access to the personal information we hold
              about you
            </li>
            <li>
              <strong>Correction:</strong> Request correction of any inaccurate, incomplete,
              or out-of-date information
            </li>
            <li>
              <strong>Complaint:</strong> Lodge a complaint if you believe we have breached
              the APPs
            </li>
            <li>
              <strong>Anonymity:</strong> In some cases, you may choose to interact with us
              anonymously or using a pseudonym, although this may limit our ability to assist
              you
            </li>
          </ul>
          <p>
            To exercise any of these rights, contact us at [PLACEHOLDER: Contact Email]. We
            will respond to your request within 30 days.
          </p>

          <h2>9. Retention of Personal Information</h2>
          <p>
            We retain personal information only for as long as necessary to fulfil the
            purposes for which it was collected, or as required by law. Lead enquiry data is
            typically retained for 24 months from the date of submission. After this period,
            data is securely deleted or de-identified. You may request deletion of your
            information at any time by contacting us.
          </p>

          <h2>10. Third-Party Links</h2>
          <p>
            Our website may contain links to third-party websites (such as lender websites
            or external resources). We are not responsible for the privacy practices or
            content of those websites. We encourage you to read the privacy policy of any
            website you visit.
          </p>

          <h2>11. Changes to This Privacy Policy</h2>
          <p>
            We may update this Privacy Policy from time to time to reflect changes in our
            practices, technology, or legal requirements. The updated policy will be posted
            on this page with a revised &ldquo;Last updated&rdquo; date. We encourage you to review
            this policy periodically.
          </p>

          <h2>12. Complaints</h2>
          <p>
            If you believe we have breached the Australian Privacy Principles, you may lodge
            a complaint by contacting us at [PLACEHOLDER: Contact Email]. We will investigate
            your complaint and respond within 30 days. If you are not satisfied with our
            response, you may escalate your complaint to the Office of the Australian
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

          <h2>13. Contact Us</h2>
          <p>
            If you have questions about this Privacy Policy or wish to exercise your privacy
            rights, please contact us:
          </p>
          <ul>
            <li>
              <strong>Business:</strong> [PLACEHOLDER: Business Name]
            </li>
            <li>
              <strong>ABN:</strong> [PLACEHOLDER: ABN]
            </li>
            <li>
              <strong>Email:</strong> [PLACEHOLDER: Contact Email]
            </li>
            <li>
              <strong>Website:</strong> cosmedloans.com.au
            </li>
          </ul>
        </div>
      </section>
    </>
  );
}

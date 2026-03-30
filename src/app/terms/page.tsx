import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Use",
  description:
    "Read the CosmodiLoans terms of use. Understand the terms and conditions governing your use of our medical financing lead generation service.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <>
      <section className="bg-gradient-to-b from-[#f0f5ff] to-[#e0ecff] section-padding">
        <div className="container-narrow text-center">
          <h1 className="text-4xl md:text-hero-h1 text-text-dark mb-4">
            Terms of Use
          </h1>
          <p className="text-sm text-text-muted">
            Last updated: March 2026
          </p>
        </div>
      </section>

      <section className="section-padding bg-background">
        <div className="container-narrow max-w-3xl prose prose-slate max-w-none">
          <h2>1. Acceptance of Terms</h2>
          <p>
            By accessing and using the website at cosmedloans.com.au (&ldquo;the Website&rdquo;),
            operated by [PLACEHOLDER: Business Name] ABN [PLACEHOLDER: ABN]
            (&ldquo;CosmodiLoans&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;, &ldquo;our&rdquo;), you agree to be bound
            by these Terms of Use. If you do not agree with any part of these terms, you
            must not use the Website.
          </p>
          <p>
            These terms should be read in conjunction with our{" "}
            <a href="/privacy-policy" className="text-primary hover:underline">
              Privacy Policy
            </a>{" "}
            and{" "}
            <a href="/disclaimer" className="text-primary hover:underline">
              Disclaimer
            </a>
            , which also govern your use of the Website.
          </p>

          <h2>2. Description of Service</h2>
          <p>
            CosmodiLoans operates a lead generation website that connects Australian
            patients seeking medical procedure financing with licensed finance brokers.
            Specifically:
          </p>
          <ul>
            <li>
              <strong>We are NOT a credit provider, lender, or credit assistance
              provider.</strong> We do not provide credit, arrange credit, or act as an
              intermediary in any credit transaction.
            </li>
            <li>
              <strong>We are NOT a financial adviser.</strong> Nothing on this Website
              constitutes personal financial advice. All information is general in nature
              and does not take into account your personal objectives, financial situation,
              or needs.
            </li>
            <li>
              <strong>We are a lead generation service.</strong> We collect enquiry
              information from users and pass it to licensed finance brokers who hold
              Australian Credit Licences (ACLs) or operate as authorised credit
              representatives. The broker then provides credit assistance directly to you
              under their own licence and regulatory obligations.
            </li>
          </ul>

          <h2>3. Eligibility</h2>
          <p>
            To use the Website and submit an enquiry, you must be at least 18 years of
            age and an Australian citizen or permanent resident. By submitting an enquiry
            form, you represent and warrant that you meet these requirements.
          </p>

          <h2>4. User Obligations</h2>
          <p>When using the Website, you agree to:</p>
          <ul>
            <li>Provide accurate, current, and complete information in all forms and communications</li>
            <li>Not submit false, misleading, or fraudulent information</li>
            <li>Not use the Website for any unlawful purpose or in violation of any applicable laws</li>
            <li>Not attempt to gain unauthorised access to our systems or data</li>
            <li>Not interfere with the proper functioning of the Website</li>
            <li>Not use automated means (bots, scrapers) to access the Website without our written consent</li>
            <li>Not impersonate another person or misrepresent your identity</li>
          </ul>
          <p>
            We reserve the right to refuse service, terminate accounts, or block access
            to the Website at our discretion if we believe you have violated these terms.
          </p>

          <h2>5. Intellectual Property</h2>
          <p>
            All content on the Website — including text, graphics, logos, images, software,
            and design elements — is the property of [PLACEHOLDER: Business Name] or its
            licensors and is protected by Australian and international copyright, trademark,
            and intellectual property laws.
          </p>
          <p>
            You may not reproduce, distribute, modify, create derivative works from,
            publicly display, or otherwise exploit any content from the Website without
            our prior written consent.
          </p>

          <h2>6. Disclaimers</h2>
          <p>
            The Website and its content are provided on an &ldquo;as is&rdquo; and &ldquo;as available&rdquo;
            basis. To the maximum extent permitted by Australian Consumer Law, we disclaim
            all warranties, express or implied, including but not limited to:
          </p>
          <ul>
            <li>Warranties of merchantability or fitness for a particular purpose</li>
            <li>Warranties that the Website will be uninterrupted, error-free, or secure</li>
            <li>Warranties regarding the accuracy, reliability, or completeness of any content</li>
            <li>Warranties regarding the availability or terms of any loan product</li>
          </ul>
          <p>
            Interest rates, repayment amounts, loan terms, and other financial information
            displayed on the Website are indicative only and may change without notice. Actual
            rates and terms are determined by the lender and depend on your individual
            circumstances.
          </p>

          <h2>7. Limitation of Liability</h2>
          <p>
            To the maximum extent permitted by law, [PLACEHOLDER: Business Name] and its
            directors, officers, employees, and agents shall not be liable for any direct,
            indirect, incidental, consequential, or special damages arising from or in
            connection with:
          </p>
          <ul>
            <li>Your use of or inability to use the Website</li>
            <li>Any errors, inaccuracies, or omissions in Website content</li>
            <li>Any actions taken by you based on information provided on the Website</li>
            <li>The conduct, products, or services of any broker, lender, or third party you are connected with through our service</li>
            <li>Unauthorised access to your personal information</li>
          </ul>
          <p>
            Nothing in these terms excludes, restricts, or modifies any consumer guarantee,
            right, or remedy conferred on you by the <em>Australian Consumer Law</em>{" "}
            (Schedule 2 of the <em>Competition and Consumer Act 2010</em>) or any other
            applicable law that cannot be excluded, restricted, or modified by agreement.
          </p>

          <h2>8. Indemnity</h2>
          <p>
            You agree to indemnify and hold harmless [PLACEHOLDER: Business Name] and its
            directors, officers, employees, and agents from and against any claims, losses,
            damages, liabilities, and expenses (including reasonable legal fees) arising
            from your use of the Website, your violation of these Terms, or your violation
            of any rights of a third party.
          </p>

          <h2>9. Third-Party Links and Services</h2>
          <p>
            The Website may contain links to third-party websites, products, or services
            that are not owned or controlled by CosmodiLoans. We have no control over, and
            assume no responsibility for, the content, privacy policies, or practices of
            any third-party websites or services. You acknowledge and agree that
            CosmodiLoans shall not be responsible or liable for any damage or loss caused
            by the use of any such third-party content or services.
          </p>

          <h2>10. Broker Relationship</h2>
          <p>
            When we connect you with a finance broker through our service, that broker
            operates independently of CosmodiLoans. The broker-client relationship is
            between you and the broker, governed by their own terms, privacy policy, and
            regulatory obligations. CosmodiLoans is not a party to any loan agreement,
            credit contract, or advisory relationship between you and the broker or lender.
          </p>

          <h2>11. Modifications to Terms</h2>
          <p>
            We reserve the right to modify these Terms of Use at any time. Changes will
            be effective immediately upon posting on the Website. Your continued use of
            the Website after changes are posted constitutes your acceptance of the revised
            terms. We encourage you to review these terms periodically.
          </p>

          <h2>12. Governing Law</h2>
          <p>
            These Terms of Use are governed by and construed in accordance with the laws
            of the Commonwealth of Australia. Any disputes arising from these terms shall
            be subject to the exclusive jurisdiction of the courts of Australia.
          </p>

          <h2>13. Severability</h2>
          <p>
            If any provision of these Terms is found to be invalid, illegal, or
            unenforceable, the remaining provisions shall continue in full force and effect.
          </p>

          <h2>14. Contact</h2>
          <p>
            If you have questions about these Terms of Use, please contact us:
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
          </ul>
        </div>
      </section>
    </>
  );
}

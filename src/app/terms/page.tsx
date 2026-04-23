import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Use",
  description:
    "Read the CosmediLoans terms of use. Understand the terms and conditions governing your use of our medical financing lead generation service.",
  alternates: { canonical: "/terms" },
};

const sections = [
  "Acceptance of Terms",
  "Description of Service",
  "Eligibility",
  "User Obligations",
  "Intellectual Property",
  "Disclaimers",
  "Limitation of Liability",
  "Indemnity",
  "Third-Party Links",
  "Broker Relationship",
  "Modifications",
  "Governing Law",
  "Severability",
  "Contact",
];

export default function TermsPage() {
  return (
    <>
      <section className="bg-gradient-to-b from-[#f0f5ff] to-[#e0ecff] section-padding">
        <div className="container-narrow text-center">
          <h1 className="text-4xl md:text-hero-h1 text-text-dark mb-4">
            Terms of Use
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
                href={`#tu-${i + 1}`}
                className="text-xs font-medium text-primary bg-primary-wash px-3 py-1.5 rounded-full hover:bg-primary/10 transition-colors"
              >
                {i + 1}. {s}
              </a>
            ))}
          </div>

          <div className="space-y-10">

            <div id="tu-1" className="scroll-mt-24">
              <h2 className="text-lg font-semibold text-text-dark mb-4 pb-2 border-b border-border">
                1. Acceptance of Terms
              </h2>
              <div className="space-y-3 text-sm text-text-body leading-relaxed">
                <p>
                  By accessing and using the website at cosmediloans.com.au (&ldquo;the Website&rdquo;),
                  operated by CosmediLoans ABN 14 693 894 558 (&ldquo;CosmediLoans&rdquo;, &ldquo;we&rdquo;,
                  &ldquo;us&rdquo;, &ldquo;our&rdquo;), you agree to be bound by these Terms of Use. If you do not
                  agree with any part of these terms, you must not use the Website.
                </p>
                <p>
                  These terms should be read in conjunction with our{" "}
                  <a href="/privacy-policy" className="text-primary hover:underline">Privacy Policy</a>{" "}
                  and{" "}
                  <a href="/disclaimer" className="text-primary hover:underline">Disclaimer</a>
                  , which also govern your use of the Website.
                </p>
              </div>
            </div>

            <div id="tu-2" className="scroll-mt-24">
              <h2 className="text-lg font-semibold text-text-dark mb-4 pb-2 border-b border-border">
                2. Description of Service
              </h2>
              <p className="text-sm text-text-body leading-relaxed mb-4">
                CosmediLoans operates a lead generation website that connects Australian patients
                seeking medical procedure financing with licensed finance brokers. Specifically:
              </p>
              <div className="space-y-3">
                <div className="bg-surface rounded-xl p-4 border border-border text-sm text-text-body leading-relaxed">
                  <p className="font-semibold text-text-dark mb-1">We are NOT a credit provider, lender, or credit assistance provider.</p>
                  <p>We do not provide credit, arrange credit, or act as an intermediary in any credit transaction.</p>
                </div>
                <div className="bg-surface rounded-xl p-4 border border-border text-sm text-text-body leading-relaxed">
                  <p className="font-semibold text-text-dark mb-1">We are NOT a financial adviser.</p>
                  <p>Nothing on this Website constitutes personal financial advice. All information is general in nature and does not take into account your personal objectives, financial situation, or needs.</p>
                </div>
                <div className="bg-surface rounded-xl p-4 border border-border text-sm text-text-body leading-relaxed">
                  <p className="font-semibold text-text-dark mb-1">We are a lead generation service.</p>
                  <p>We collect enquiry information from users and pass it to licensed finance brokers who hold Australian Credit Licences (ACLs) or operate as authorised credit representatives.</p>
                </div>
              </div>
            </div>

            <div id="tu-3" className="scroll-mt-24">
              <h2 className="text-lg font-semibold text-text-dark mb-4 pb-2 border-b border-border">
                3. Eligibility
              </h2>
              <p className="text-sm text-text-body leading-relaxed">
                To use the Website and submit an enquiry, you must be at least 18 years of age
                and an Australian citizen or permanent resident. By submitting an enquiry form,
                you represent and warrant that you meet these requirements.
              </p>
            </div>

            <div id="tu-4" className="scroll-mt-24">
              <h2 className="text-lg font-semibold text-text-dark mb-4 pb-2 border-b border-border">
                4. User Obligations
              </h2>
              <p className="text-sm text-text-body leading-relaxed mb-3">When using the Website, you agree to:</p>
              <ul className="space-y-2 text-sm text-text-body">
                <li className="flex gap-2"><span className="text-primary font-bold mt-0.5">·</span><span>Provide accurate, current, and complete information in all forms and communications</span></li>
                <li className="flex gap-2"><span className="text-primary font-bold mt-0.5">·</span><span>Not submit false, misleading, or fraudulent information</span></li>
                <li className="flex gap-2"><span className="text-primary font-bold mt-0.5">·</span><span>Not use the Website for any unlawful purpose or in violation of any applicable laws</span></li>
                <li className="flex gap-2"><span className="text-primary font-bold mt-0.5">·</span><span>Not attempt to gain unauthorised access to our systems or data</span></li>
                <li className="flex gap-2"><span className="text-primary font-bold mt-0.5">·</span><span>Not interfere with the proper functioning of the Website</span></li>
                <li className="flex gap-2"><span className="text-primary font-bold mt-0.5">·</span><span>Not use automated means (bots, scrapers) to access the Website without our written consent</span></li>
                <li className="flex gap-2"><span className="text-primary font-bold mt-0.5">·</span><span>Not impersonate another person or misrepresent your identity</span></li>
              </ul>
              <p className="text-sm text-text-body leading-relaxed mt-3">
                We reserve the right to refuse service or block access to the Website if we
                believe you have violated these terms.
              </p>
            </div>

            <div id="tu-5" className="scroll-mt-24">
              <h2 className="text-lg font-semibold text-text-dark mb-4 pb-2 border-b border-border">
                5. Intellectual Property
              </h2>
              <div className="space-y-3 text-sm text-text-body leading-relaxed">
                <p>
                  All content on the Website — including text, graphics, logos, images, software,
                  and design elements — is the property of CosmediLoans or its licensors and is
                  protected by Australian and international copyright, trademark, and intellectual
                  property laws.
                </p>
                <p>
                  You may not reproduce, distribute, modify, create derivative works from,
                  publicly display, or otherwise exploit any content from the Website without
                  our prior written consent.
                </p>
              </div>
            </div>

            <div id="tu-6" className="scroll-mt-24">
              <h2 className="text-lg font-semibold text-text-dark mb-4 pb-2 border-b border-border">
                6. Disclaimers
              </h2>
              <p className="text-sm text-text-body leading-relaxed mb-3">
                The Website and its content are provided on an &ldquo;as is&rdquo; and &ldquo;as available&rdquo;
                basis. To the maximum extent permitted by Australian Consumer Law, we disclaim
                all warranties, express or implied, including:
              </p>
              <ul className="space-y-2 text-sm text-text-body">
                <li className="flex gap-2"><span className="text-primary font-bold mt-0.5">·</span><span>Warranties of merchantability or fitness for a particular purpose</span></li>
                <li className="flex gap-2"><span className="text-primary font-bold mt-0.5">·</span><span>Warranties that the Website will be uninterrupted, error-free, or secure</span></li>
                <li className="flex gap-2"><span className="text-primary font-bold mt-0.5">·</span><span>Warranties regarding the accuracy or completeness of any content</span></li>
                <li className="flex gap-2"><span className="text-primary font-bold mt-0.5">·</span><span>Warranties regarding the availability or terms of any loan product</span></li>
              </ul>
              <p className="text-sm text-text-body leading-relaxed mt-3">
                Interest rates, repayment amounts, and other financial information displayed on
                the Website are indicative only. Actual rates and terms are determined by the
                lender based on your individual circumstances.
              </p>
            </div>

            <div id="tu-7" className="scroll-mt-24">
              <h2 className="text-lg font-semibold text-text-dark mb-4 pb-2 border-b border-border">
                7. Limitation of Liability
              </h2>
              <p className="text-sm text-text-body leading-relaxed mb-3">
                To the maximum extent permitted by law, CosmediLoans and its directors, officers,
                employees, and agents shall not be liable for any direct, indirect, incidental,
                consequential, or special damages arising from:
              </p>
              <ul className="space-y-2 text-sm text-text-body">
                <li className="flex gap-2"><span className="text-primary font-bold mt-0.5">·</span><span>Your use of or inability to use the Website</span></li>
                <li className="flex gap-2"><span className="text-primary font-bold mt-0.5">·</span><span>Any errors, inaccuracies, or omissions in Website content</span></li>
                <li className="flex gap-2"><span className="text-primary font-bold mt-0.5">·</span><span>Any actions taken by you based on information provided on the Website</span></li>
                <li className="flex gap-2"><span className="text-primary font-bold mt-0.5">·</span><span>The conduct, products, or services of any broker, lender, or third party you are connected with</span></li>
                <li className="flex gap-2"><span className="text-primary font-bold mt-0.5">·</span><span>Unauthorised access to your personal information</span></li>
              </ul>
              <p className="text-sm text-text-body leading-relaxed mt-3">
                Nothing in these terms excludes, restricts, or modifies any consumer guarantee
                or right conferred on you by the <em>Australian Consumer Law</em> (Schedule 2 of
                the <em>Competition and Consumer Act 2010</em>) that cannot be excluded by agreement.
              </p>
            </div>

            <div id="tu-8" className="scroll-mt-24">
              <h2 className="text-lg font-semibold text-text-dark mb-4 pb-2 border-b border-border">
                8. Indemnity
              </h2>
              <p className="text-sm text-text-body leading-relaxed">
                You agree to indemnify and hold harmless CosmediLoans and its directors, officers,
                employees, and agents from and against any claims, losses, damages, liabilities,
                and expenses (including reasonable legal fees) arising from your use of the
                Website, your violation of these Terms, or your violation of any rights of a
                third party.
              </p>
            </div>

            <div id="tu-9" className="scroll-mt-24">
              <h2 className="text-lg font-semibold text-text-dark mb-4 pb-2 border-b border-border">
                9. Third-Party Links and Services
              </h2>
              <p className="text-sm text-text-body leading-relaxed">
                The Website may contain links to third-party websites, products, or services not
                owned or controlled by CosmediLoans. We have no control over, and assume no
                responsibility for, the content, privacy policies, or practices of any
                third-party websites or services. CosmediLoans shall not be responsible or liable
                for any damage or loss caused by their use.
              </p>
            </div>

            <div id="tu-10" className="scroll-mt-24">
              <h2 className="text-lg font-semibold text-text-dark mb-4 pb-2 border-b border-border">
                10. Broker Relationship
              </h2>
              <p className="text-sm text-text-body leading-relaxed">
                When we connect you with a finance broker, that broker operates independently of
                CosmediLoans. The broker-client relationship is between you and the broker,
                governed by their own terms, privacy policy, and regulatory obligations.
                CosmediLoans is not a party to any loan agreement, credit contract, or advisory
                relationship between you and the broker or lender.
              </p>
            </div>

            <div id="tu-11" className="scroll-mt-24">
              <h2 className="text-lg font-semibold text-text-dark mb-4 pb-2 border-b border-border">
                11. Modifications to Terms
              </h2>
              <p className="text-sm text-text-body leading-relaxed">
                We reserve the right to modify these Terms of Use at any time. Changes will be
                effective immediately upon posting on the Website. Your continued use of the
                Website after changes are posted constitutes your acceptance of the revised
                terms. We encourage you to review these terms periodically.
              </p>
            </div>

            <div id="tu-12" className="scroll-mt-24">
              <h2 className="text-lg font-semibold text-text-dark mb-4 pb-2 border-b border-border">
                12. Governing Law
              </h2>
              <p className="text-sm text-text-body leading-relaxed">
                These Terms of Use are governed by and construed in accordance with the laws of
                the Commonwealth of Australia. Any disputes arising from these terms shall be
                subject to the exclusive jurisdiction of the courts of Australia.
              </p>
            </div>

            <div id="tu-13" className="scroll-mt-24">
              <h2 className="text-lg font-semibold text-text-dark mb-4 pb-2 border-b border-border">
                13. Severability
              </h2>
              <p className="text-sm text-text-body leading-relaxed">
                If any provision of these Terms is found to be invalid, illegal, or
                unenforceable, the remaining provisions shall continue in full force and effect.
              </p>
            </div>

            {/* Contact card */}
            <div id="tu-14" className="scroll-mt-24">
              <h2 className="text-lg font-semibold text-text-dark mb-4 pb-2 border-b border-border">
                14. Contact
              </h2>
              <div className="bg-primary-wash rounded-card p-6 space-y-2 text-sm">
                <p className="font-semibold text-text-dark mb-3">
                  Questions about these Terms of Use?
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
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}

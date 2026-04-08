import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Disclaimer",
  description:
    "Read the CosmediLoans financial services disclaimer. CosmediLoans is a lead generation service, not a credit provider or financial adviser.",
  alternates: { canonical: "/disclaimer" },
};

export default function DisclaimerPage() {
  return (
    <>
      <section className="bg-gradient-to-b from-[#f0f5ff] to-[#e0ecff] section-padding">
        <div className="container-narrow text-center">
          <h1 className="text-4xl md:text-hero-h1 text-text-dark mb-4">
            Disclaimer
          </h1>
          <p className="text-sm text-text-muted">
            Last updated: March 2026
          </p>
        </div>
      </section>

      <section className="section-padding bg-background">
        <div className="container-narrow max-w-3xl prose prose-slate max-w-none">
          <h2>Important Notice</h2>
          <p>
            Please read this disclaimer carefully before using the CosmediLoans website at
            cosmedloans.com.au (&ldquo;the Website&rdquo;).
          </p>

          <h2>Not a Credit Provider</h2>
          <p>
            [PLACEHOLDER: Business Name] ABN [PLACEHOLDER: ABN] trading as CosmediLoans is
            <strong> not a credit provider, lender, or credit assistance provider</strong>.
            We do not hold an Australian Credit Licence (ACL) and we do not provide credit,
            arrange credit, or act as an intermediary in any credit transaction.
          </p>
          <p>
            CosmediLoans operates as a lead generation service. We collect enquiry
            information from users of the Website and pass that information to licensed
            finance brokers who hold Australian Credit Licences or operate as authorised
            credit representatives. Any credit assistance, credit assessment, or loan
            arrangement is provided by the broker and/or lender directly, not by
            CosmediLoans.
          </p>
          <p className="text-text-muted italic">
            [PLACEHOLDER: If CosmediLoans obtains an Australian Credit Representative (ACR)
            number or operates under an ACL holder, insert details here. For example:
            &ldquo;CosmediLoans is an authorised credit representative (ACR Number: XXXXXX) of
            [Licence Holder Name] (ACL Number: XXXXXX).&rdquo;]
          </p>

          <h2>Not Financial Advice</h2>
          <p>
            The information provided on the Website is general in nature and does not
            constitute personal financial advice, credit advice, tax advice, or any other
            form of professional advice. The content on this Website does not take into
            account your individual objectives, financial situation, or needs.
          </p>
          <p>
            Before making any financial decisions, you should consider seeking independent
            financial advice from a qualified professional who can assess your personal
            circumstances. You should read the terms and conditions, product disclosure
            statement (PDS), and target market determination (TMD) of any financial product
            before committing to it.
          </p>

          <h2>Indicative Rates and Figures</h2>
          <p>
            All interest rates, repayment amounts, loan terms, and financial figures
            displayed on the Website are <strong>indicative only</strong> and are provided
            for general informational and comparison purposes. They do not constitute an
            offer, quote, or guarantee of any specific rate or term.
          </p>
          <p>
            Actual interest rates, fees, charges, and loan terms are determined by the
            lender based on your individual credit profile, financial situation, loan amount,
            and term length. Rates and product availability may change without notice.
            Comparison rates displayed are calculated based on specific loan amounts and
            terms as required by law and may not represent the rate applicable to your
            circumstances.
          </p>

          <h2>Calculator Disclaimer</h2>
          <p>
            The loan calculator on this Website provides estimates for illustrative purposes
            only. The calculator assumes a fixed interest rate, constant repayments, and
            does not account for fees, charges, or other costs that may apply to your loan.
            Actual repayment amounts may differ from calculator estimates. Do not rely on
            calculator results as a guarantee of repayment amounts.
          </p>

          <h2>No Guarantee of Approval</h2>
          <p>
            Submitting an enquiry through the Website does not guarantee approval for any
            loan product. Loan approval is subject to the lender&apos;s assessment criteria,
            including but not limited to credit checks, income verification, and
            responsible lending assessments. CosmediLoans has no influence over any
            lender&apos;s approval decision.
          </p>

          <h2>Third-Party Content</h2>
          <p>
            The Website may contain references to, or links to, third-party websites,
            products, and services. These references are provided for convenience only and
            do not constitute an endorsement or recommendation by CosmediLoans. We are not
            responsible for the content, accuracy, or practices of any third-party website.
          </p>

          <h2>Testimonials and Reviews</h2>
          <p>
            Any testimonials, reviews, or case studies displayed on the Website represent
            individual experiences and may not be representative of all users. Individual
            results may vary significantly depending on personal circumstances, credit
            profile, and market conditions at the time of application.
          </p>

          <h2>Changes to Information</h2>
          <p>
            We make reasonable efforts to ensure the information on the Website is accurate
            and up to date. However, we do not warrant the accuracy, completeness, or
            currency of any information and reserve the right to make changes at any time
            without notice.
          </p>

          <h2>Regulatory Compliance</h2>
          <p>
            All brokers in the CosmediLoans network are required to hold appropriate
            Australian Credit Licences (ACL) or operate as authorised credit
            representatives under the <em>National Consumer Credit Protection Act 2009</em>{" "}
            (Cth). They are bound by responsible lending obligations under the National
            Credit Code and are members of the Australian Financial Complaints Authority
            (AFCA) for external dispute resolution.
          </p>
          <p className="text-text-muted italic">
            [PLACEHOLDER: Insert specific ACL/ACR details, AFCA membership numbers, and
            any other relevant regulatory information here once confirmed.]
          </p>

          <h2>Contact</h2>
          <p>
            If you have questions about this disclaimer, please contact us:
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

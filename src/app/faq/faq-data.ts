export interface FAQItem {
  question: string;
  answer: string;
  category: "general" | "loans" | "eligibility" | "procedures" | "process";
}

export const allFAQItems: FAQItem[] = [
  // ── GENERAL (8) ──────────────────────────────────────────────────
  {
    category: "general",
    question: "What is CosmodiLoans?",
    answer:
      "CosmodiLoans is a free broker-matching service designed specifically for Australian patients who need financing for medical and cosmetic procedures. Rather than going to a single bank, we connect you with specialist medical finance brokers who compare offers from 20+ lenders across Australia. Our goal is to ensure you receive the most competitive interest rate available for your individual circumstances, without the hassle of applying to multiple lenders yourself. We operate entirely online, making the process convenient regardless of where you live in Australia.",
  },
  {
    category: "general",
    question: "Is CosmodiLoans a lender or credit provider?",
    answer:
      "No. CosmodiLoans is not a lender, credit provider, or financial adviser. We are a lead generation and broker-matching service. When you submit an enquiry through our website, we pass your details to a licensed Australian finance broker who then compares loan products from their panel of 20+ lenders on your behalf. The broker handles the credit assessment, application, and settlement process. This means you get professional guidance throughout the entire process from someone who is legally required to act in your best interest under responsible lending laws.",
  },
  {
    category: "general",
    question: "How much does it cost to use CosmodiLoans?",
    answer:
      "Our service is completely free for patients. There are no upfront fees, application fees, or hidden charges from CosmodiLoans. We receive a commission from the lender only when a loan successfully settles, which means our costs are built into the loan product itself — the same product you would receive if you went to the lender directly. This model aligns our interests with yours: we benefit when you find a loan that works for your situation, so we are motivated to match you with the best possible option. You are never under any obligation to proceed with any offer presented.",
  },
  {
    category: "general",
    question: "How is CosmodiLoans different from going to my bank?",
    answer:
      "When you approach your bank directly, you receive a single offer based on that one institution's lending criteria and rate card. Your bank has no incentive to offer their most competitive rate because there is no competition. With CosmodiLoans, your broker simultaneously compares products from 20+ lenders, creating genuine competition for your business. This often results in lower interest rates, more flexible terms, and faster approvals. Additionally, our brokers specialise in medical financing, so they understand the specific costs and timelines associated with different procedures, which general bank staff may not.",
  },
  {
    category: "general",
    question: "Is my personal information safe with CosmodiLoans?",
    answer:
      "Yes. Protecting your personal information is a top priority. We use industry-standard SSL encryption for all data transmitted through our website, and we store information in accordance with the Australian Privacy Act 1988 and the Australian Privacy Principles (APPs). Your details are only shared with the licensed broker assigned to your enquiry — never with third parties for marketing purposes. You can read our full Privacy Policy for details on how we collect, store, and use your data, including your right to access and correct your information at any time.",
  },
  {
    category: "general",
    question: "What areas does CosmodiLoans serve?",
    answer:
      "CosmodiLoans serves patients across all Australian states and territories. Because our service is 100% online and our broker network operates nationally, your physical location does not affect your access to competitive rates. Whether you are in Sydney, Melbourne, Brisbane, Perth, Adelaide, Hobart, Darwin, Canberra, or a regional area, you can submit an enquiry and be matched with a broker who can assist you. The lenders in our network also operate Australia-wide, so you have access to the same broad range of products regardless of where you live.",
  },
  {
    category: "general",
    question: "How long has CosmodiLoans been operating?",
    answer:
      "CosmodiLoans was founded to address a specific gap in the Australian medical financing market: patients were either settling for their bank's rate or turning to expensive buy-now-pay-later products without realising that better options existed. Our founding team has extensive experience in finance broking and digital health services. While we are a newer brand, the brokers in our network hold established Australian Credit Licences and have years of experience in personal and medical lending. We are focused on building long-term trust through transparency, competitive outcomes, and exceptional service.",
  },
  {
    category: "general",
    question: "Can I leave a review of my experience with CosmodiLoans?",
    answer:
      "Absolutely, and we encourage it. Patient feedback is incredibly valuable to us and helps future patients make informed decisions. After your loan has settled, you may receive an invitation to share your experience. You can also leave reviews on Google or contact us directly with feedback. We take all reviews seriously — both positive and constructive — and use them to continually improve our service. If you had an issue at any point during the process, we want to hear about it so we can resolve it and prevent it from recurring.",
  },

  // ── LOANS & RATES (8) ───────────────────────────────────────────
  {
    category: "loans",
    question: "What interest rates can I expect for a medical loan?",
    answer:
      "Interest rates for medical loans through our broker network start from approximately 6.99% per annum for well-qualified borrowers. However, your actual rate depends on several factors including your credit score, employment status, loan amount, chosen term length, and the specific lender. Because our brokers compare 20+ lenders, you are more likely to receive a competitive rate than if you approached a single bank. During your consultation, your broker will provide a clear indication of the rates available to you based on your individual circumstances before you commit to anything.",
  },
  {
    category: "loans",
    question: "How much can I borrow for a medical procedure?",
    answer:
      "Loan amounts through our lender network typically range from $2,000 to $100,000, depending on the procedure, lender, and your financial circumstances. Some lenders offer higher limits for specific procedures such as extensive dental work or multiple cosmetic procedures. Your broker will assess your borrowing capacity based on your income, existing commitments, and the lender's criteria. It is important to borrow only what you need and what you can comfortably repay. Your broker is legally required to ensure any loan recommended is suitable for your financial situation under responsible lending obligations.",
  },
  {
    category: "loans",
    question: "What repayment terms are available?",
    answer:
      "Repayment terms available through our lender panel range from 1 to 7 years, giving you flexibility to choose a term that balances affordable monthly repayments with minimising the total interest paid over the life of the loan. Shorter terms mean higher monthly repayments but less total interest, while longer terms reduce your monthly commitment but increase the overall cost. Your broker will walk you through the trade-offs for different term lengths based on your specific loan amount and rate, helping you find the right balance for your budget.",
  },
  {
    category: "loans",
    question: "Are the rates fixed or variable?",
    answer:
      "Both fixed and variable rate options are available through our lender network, depending on the specific lender and product. Fixed-rate loans lock in your interest rate for the entire loan term, providing certainty about your repayments. Variable-rate loans may start lower but can increase or decrease over time based on market conditions. Most patients prefer fixed-rate medical loans for the repayment certainty they provide. Your broker will explain the options available and help you decide which type best suits your circumstances and risk tolerance.",
  },
  {
    category: "loans",
    question: "Can I pay off my medical loan early?",
    answer:
      "Most lenders in our network allow early repayment, though the specific terms vary by lender and product. Some lenders charge no early repayment fee at all, while others may charge a small fee to offset the interest they would have earned. Your broker will clearly explain the early repayment terms of any loan before you accept an offer, so you can factor this into your decision. If early repayment flexibility is important to you, let your broker know upfront and they can prioritise lenders with favourable early repayment policies.",
  },
  {
    category: "loans",
    question: "What fees are associated with a medical loan?",
    answer:
      "Fees vary by lender but typically include an establishment fee (sometimes called an application fee) which can range from $0 to $400, and a monthly or annual account-keeping fee. Some lenders waive the establishment fee for certain products or promotions. Your broker will provide a clear breakdown of all fees associated with each loan option before you commit, so there are no surprises. The comparison rate — which includes both the interest rate and standard fees — gives you a more accurate picture of the true cost of each loan.",
  },
  {
    category: "loans",
    question: "Is a medical loan different from a personal loan?",
    answer:
      "Structurally, a medical loan is a type of unsecured personal loan — the mechanics of borrowing, repaying, and interest calculation are the same. However, some lenders offer specific medical loan products with features tailored to healthcare financing, such as deferred repayment start dates (useful if you need recovery time before returning to work), direct payment to your healthcare provider, and competitive rates for medical purposes. Our brokers specialise in finding these medical-specific products when they offer genuine advantages over standard personal loans.",
  },
  {
    category: "loans",
    question: "What is a comparison rate and why does it matter?",
    answer:
      "A comparison rate is a single percentage figure that combines the advertised interest rate with most of the fees and charges associated with a loan, giving you a more accurate indication of the true annual cost. In Australia, lenders are legally required to display comparison rates alongside advertised rates. When comparing medical loan options, always look at the comparison rate rather than just the headline interest rate, as a loan with a lower interest rate but higher fees could actually cost you more overall. Your broker will ensure you understand the comparison rate for every option presented.",
  },

  // ── ELIGIBILITY (6) ─────────────────────────────────────────────
  {
    category: "eligibility",
    question: "What are the basic eligibility requirements?",
    answer:
      "Basic eligibility requirements for most lenders in our network include: being at least 18 years old, being an Australian citizen or permanent resident, having a regular source of income (employment, self-employment, or government benefits in some cases), and having a valid Australian bank account. Some lenders also require you to have been at your current address for a minimum period. These are general requirements — specific lenders may have additional criteria. Your broker will assess your situation during the initial consultation and identify which lenders are most likely to approve your application.",
  },
  {
    category: "eligibility",
    question: "Do I need a good credit score to get a medical loan?",
    answer:
      "While a higher credit score generally gives you access to more lenders and lower interest rates, you do not necessarily need an excellent credit score to be approved. Our broker network includes lenders who specialise in applicants with average or below-average credit histories. If you have had credit issues in the past — such as defaults, late payments, or a low Equifax score — your broker can still explore options on your behalf. Being upfront about your credit history helps your broker target the most appropriate lenders, saving time and avoiding unnecessary hard credit inquiries.",
  },
  {
    category: "eligibility",
    question: "Can I apply if I am self-employed?",
    answer:
      "Yes. Self-employed Australians can absolutely apply for medical financing through our service. The documentation requirements may differ from standard employment — you may need to provide Business Activity Statements (BAS), tax returns, or accountant-prepared financial statements instead of payslips. Some lenders have specific products designed for self-employed borrowers with streamlined documentation requirements. Let your broker know about your employment situation upfront so they can match you with lenders experienced in assessing self-employed applications, which can significantly improve your chances of approval.",
  },
  {
    category: "eligibility",
    question: "Will checking my rate affect my credit score?",
    answer:
      "No. When you submit an enquiry through CosmodiLoans, we do not perform a credit check. Your assigned broker may conduct a soft credit inquiry during the initial assessment, which does not appear on your credit file and has zero impact on your credit score. A hard credit inquiry — which is recorded on your credit file — only occurs if you decide to proceed with a formal loan application. Your broker will always inform you before a hard inquiry is made, giving you the opportunity to decide whether to proceed. This protects your credit score while you explore your options.",
  },
  {
    category: "eligibility",
    question: "Is there a minimum income requirement?",
    answer:
      "Income requirements vary by lender, but most require a minimum annual income of approximately $25,000 to $35,000. Some lenders are more flexible, particularly for smaller loan amounts. Income can come from various sources including full-time or part-time employment, casual work (with sufficient history), self-employment, government benefits (Centrelink), or a combination. Your broker will assess your total financial picture — including income, existing debts, and living expenses — to determine your borrowing capacity and match you with lenders whose criteria align with your situation.",
  },
  {
    category: "eligibility",
    question: "Can I apply with a partner or co-borrower?",
    answer:
      "Yes, many lenders in our network allow joint applications. Applying with a co-borrower can be advantageous as it combines both incomes for the purposes of borrowing capacity, potentially qualifying you for a larger loan amount or better interest rate. Both applicants will need to meet the lender's eligibility requirements and provide the required documentation. Both borrowers are equally responsible for repaying the loan. Discuss this option with your broker during the initial consultation, and they can advise whether a joint application would strengthen your position.",
  },

  // ── PROCEDURES (6) ──────────────────────────────────────────────
  {
    category: "procedures",
    question: "What types of medical procedures can I finance?",
    answer:
      "We help Australians finance virtually any medical or cosmetic procedure. Our most popular categories include dental work (implants, veneers, orthodontics, Invisalign), fertility treatments (IVF, egg freezing, ICSI), cosmetic surgery (breast augmentation, rhinoplasty, tummy tuck, liposuction, facelift), vision correction (LASIK, PRK), weight loss surgery (gastric sleeve, gastric bypass), hair transplants, orthopaedic procedures, and dermatological treatments. If your procedure is not listed on our website, select 'Other Medical Procedure' on the enquiry form and your broker will still be able to assist you.",
  },
  {
    category: "procedures",
    question: "Can I finance multiple procedures at once?",
    answer:
      "Yes. Many patients choose to combine multiple procedures — such as a breast augmentation with a tummy tuck (sometimes called a 'mommy makeover') or dental veneers with orthodontic work. You can request financing for the total cost of all procedures in a single loan application. In fact, combining procedures into one loan is often more cost-effective than taking out separate loans, as you benefit from a single establishment fee and potentially a better rate due to the higher loan amount. Discuss your planned procedures with your broker so they can structure the best possible financing package.",
  },
  {
    category: "procedures",
    question: "Do I need a quote from my doctor before applying?",
    answer:
      "While having a formal quote from your healthcare provider is helpful, it is not strictly required to submit an initial enquiry. You can provide an estimated amount and your broker will begin the comparison process. However, most lenders will require a formal quote or treatment plan before final loan approval, as this confirms the purpose and amount of the loan. We recommend obtaining at least a rough estimate from your chosen provider before applying, as this helps your broker identify the most suitable products and provide accurate repayment projections during your consultation.",
  },
  {
    category: "procedures",
    question: "Can I use the loan for procedures performed overseas?",
    answer:
      "This depends on the specific lender's policies. Some lenders in our network do finance procedures performed overseas (commonly known as medical tourism), while others restrict loans to procedures performed within Australia. If you are planning to have a procedure overseas, let your broker know upfront so they can identify lenders who accommodate international treatments. Keep in mind that additional considerations apply to overseas procedures, such as follow-up care costs and travel expenses, which your broker can help you factor into the overall financing plan.",
  },
  {
    category: "procedures",
    question: "What if my procedure cost changes after approval?",
    answer:
      "It is not uncommon for the final cost of a medical procedure to differ slightly from the initial quote, especially if additional work is identified during surgery or treatment. If the cost increases before funds are disbursed, your broker may be able to adjust the loan amount with the lender, depending on your borrowing capacity. If the cost decreases, you can simply borrow less than the approved amount. Significant changes may require a new assessment. Communication with your broker is key — keep them informed of any changes to your treatment plan so they can adjust the financing accordingly.",
  },
  {
    category: "procedures",
    question: "Can the loan be paid directly to my healthcare provider?",
    answer:
      "Yes, many lenders offer the option to disburse funds directly to your healthcare provider, which some patients find more convenient and reassuring. Alternatively, funds can be deposited into your personal bank account, giving you the flexibility to manage payments to your provider yourself. The disbursement method can vary by lender — some require direct payment to the provider for medical-purpose loans, while others leave the choice to you. Your broker will explain the disbursement options available with each lender so you can choose the arrangement that works best for your situation.",
  },

  // ── PROCESS & PAYMENT (6) ───────────────────────────────────────
  {
    category: "process",
    question: "How long does the entire process take from enquiry to funding?",
    answer:
      "The entire process — from submitting your initial enquiry to receiving funds — typically takes between 24 hours and 5 business days. Many patients receive a pre-approval decision within hours of their broker consultation. The formal approval and settlement process then depends on the lender and how quickly you provide any required documentation. Some lenders offer same-day approval and next-day funding for straightforward applications. Complex situations (such as self-employment or credit issues) may take longer. Your broker will give you a realistic timeline based on your specific circumstances.",
  },
  {
    category: "process",
    question: "What documents will I need to provide?",
    answer:
      "Documentation requirements vary by lender, but commonly requested documents include: proof of identity (driver's licence or passport), proof of income (recent payslips, tax returns for self-employed applicants, or Centrelink income statements), bank statements (usually the last 90 days, often provided via secure online bank statement retrieval), and a quote or treatment plan from your healthcare provider. Your broker will provide a specific list based on the lender's requirements. Many lenders now use digital verification, which means you may only need to provide online access to your bank statements rather than physical documents.",
  },
  {
    category: "process",
    question: "What happens after I submit the online enquiry form?",
    answer:
      "After you submit the enquiry form on our website, here is what happens: First, your details are securely transmitted to a licensed medical finance broker in our network (typically within minutes). The broker will then contact you — usually by phone — within 2 business hours during office hours to discuss your needs, answer questions, and gather any additional information. They will then compare products across their lender panel and present you with the most competitive options. You review the options, ask questions, and decide whether to proceed. There is never any pressure or obligation to accept an offer.",
  },
  {
    category: "process",
    question: "Can I choose which lender to go with?",
    answer:
      "Absolutely. The final decision is always yours. Your broker will present you with a shortlist of the most competitive options from their lender panel, explaining the pros and cons of each — including interest rates, fees, repayment terms, and any special features. You are free to choose whichever option best suits your needs, or to decline all offers if none are suitable. A good broker will never pressure you into accepting a particular product. If you have questions or need time to consider your options, your broker will be happy to give you the space to make an informed decision.",
  },
  {
    category: "process",
    question: "How do I make repayments on my medical loan?",
    answer:
      "Repayments are made directly to the lender (not to CosmodiLoans) via automatic direct debit from your nominated bank account. Most lenders offer weekly, fortnightly, or monthly repayment frequencies — choosing weekly or fortnightly payments can reduce total interest over the life of the loan. Your broker will set up the repayment schedule as part of the loan settlement process. Most lenders also provide an online portal or app where you can view your loan balance, upcoming payments, and make additional repayments if you wish. If you experience financial hardship, contact your lender directly to discuss hardship provisions.",
  },
  {
    category: "process",
    question: "What if I change my mind after accepting a loan offer?",
    answer:
      "Under Australian Consumer Law, you have a cooling-off period after signing a loan contract during which you can cancel without penalty. The cooling-off period is typically 2 business days for electronically signed contracts, but this can vary by product and state. If you cancel within the cooling-off period, you must repay any funds already disbursed. After the cooling-off period, the standard loan terms apply, including any early repayment fees outlined in your contract. Your broker will explain the cooling-off terms and your rights before you sign anything, ensuring you are fully informed before committing.",
  },
];

import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";
import { OWNER_NAME } from "@/config";

export default function Terms() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-8">
        <Link
          href="/"
          className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6"
        >
          <ArrowLeftIcon className="w-4 h-4 mr-2" />
          Back to Chatbot
        </Link>

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">MB-AI</h1>
          <h2 className="text-xl text-gray-600 mt-2">Terms of Use / Disclaimer</h2>
        </div>

        <div className="prose prose-gray max-w-none space-y-6">
          <p className="text-sm text-gray-700">
            The following terms of use govern access to and use of the MB-AI
            Assistant ("AI Chatbot"), an artificial intelligence tool provided
            by {OWNER_NAME} ("I", "me", "we", or "us"). By engaging with the AI
            Chatbot, you agree to these terms. If you do not agree, you may not
            use the AI Chatbot.
          </p>

          <section>
            <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-3">
              General Information
            </h3>

            <div className="space-y-4 text-sm text-gray-700">
              <div>
                <strong>1. Provider and Purpose:</strong> The AI Chatbot is a
                tool developed and maintained by {OWNER_NAME}. It is intended
                solely to assist users with MBA admissions guidance, career
                counselling, college selection, entrance exam preparation advice
                (including CAT, XAT, GMAT, GRE, NMAT, SNAP, etc.), and related
                educational queries for MBA programs in India and abroad. The AI
                Chatbot is not affiliated with, endorsed by, or operated by any
                educational institution, examination body (such as IIM, CAT,
                XAT, GMAT, GRE), or admissions authority.
              </div>

              <div>
                <strong>2. Third-Party Involvement:</strong> The AI Chatbot
                utilizes multiple third-party platforms and vendors, some of
                which may operate outside India. Your inputs may be transmitted,
                processed, and stored by these third-party systems. As such,
                confidentiality, security, and privacy cannot be guaranteed, and
                data transmission may be inherently insecure and subject to
                interception.
              </div>

              <div>
                <strong>3. No Guarantee of Accuracy:</strong> The AI Chatbot is
                designed to provide helpful and relevant responses but may
                deliver inaccurate, incomplete, or outdated information. MBA
                admissions criteria, cutoffs, deadlines, exam patterns, college
                policies, fee structures, and placement statistics change
                frequently. Users are strongly encouraged to independently
                verify any information with official sources (college websites,
                exam conducting bodies, AICTE, etc.) before relying on it for
                decisions or applications.
              </div>

              <div>
                <strong>4. Not Professional Career Counselling:</strong> The AI
                Chatbot does not provide professional career counselling,
                psychological assessment, or personalized career advisory
                services. The guidance provided is general in nature and should
                not replace consultation with certified career counsellors,
                psychologists, or admissions consultants.
              </div>
            </div>
          </section>

          <section>
            <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-3">
              Liability
            </h3>

            <div className="space-y-4 text-sm text-gray-700">
              <div>
                <strong>1. Use at Your Own Risk:</strong> The AI Chatbot is
                provided on an "as-is" and "as-available" basis. To the fullest
                extent permitted by applicable laws in India and internationally:
                <ul className="list-disc ml-6 mt-2 space-y-1">
                  <li>
                    {OWNER_NAME} disclaims all warranties, express or implied,
                    including but not limited to warranties of merchantability,
                    fitness for a particular purpose, and non-infringement.
                  </li>
                  <li>
                    {OWNER_NAME} is not liable for any errors, inaccuracies, or
                    omissions in the information provided by the AI Chatbot.
                  </li>
                  <li>
                    {OWNER_NAME} is not responsible for any admission decisions,
                    missed deadlines, incorrect college selections, or financial
                    losses resulting from reliance on the AI Chatbot's guidance.
                  </li>
                </ul>
              </div>

              <div>
                <strong>2. No Responsibility for Damages:</strong> Under no
                circumstances shall {OWNER_NAME}, collaborators, partners,
                affiliated entities, or representatives be liable for any
                direct, indirect, incidental, consequential, special, or
                punitive damages arising out of or in connection with the use of
                the AI Chatbot, including but not limited to missed admissions
                opportunities, financial losses, or career setbacks.
              </div>

              <div>
                <strong>3. Modification or Discontinuation:</strong> We reserve
                the right to modify, suspend, or discontinue the AI Chatbot's
                functionalities at any time without notice.
              </div>

              <div>
                <strong>4. Future Fees:</strong> While the AI Chatbot may
                currently be provided free of charge, we reserve the right to
                implement a fee for its use at any time.
              </div>
            </div>
          </section>

          <section>
            <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-3">
              User Responsibilities
            </h3>

            <div className="space-y-4 text-sm text-gray-700">
              <div>
                <strong>1. Eligibility:</strong> Use of the AI Chatbot is
                restricted to individuals aged 18 or older. Minors must obtain
                parental or guardian consent before using this service.
              </div>

              <div>
                <strong>2. Prohibited Conduct:</strong> By using the AI Chatbot,
                you agree not to:
                <ul className="list-disc ml-6 mt-2 space-y-1">
                  <li>
                    Post or transmit content that is defamatory, offensive,
                    intimidating, illegal, discriminatory (based on caste,
                    religion, gender, race, or any other protected
                    characteristic), obscene, or otherwise inappropriate.
                  </li>
                  <li>
                    Use the AI Chatbot to engage in unlawful or unethical
                    activities, including cheating, plagiarism, or fraudulent
                    misrepresentation in applications.
                  </li>
                  <li>
                    Attempt to compromise the security or functionality of the
                    AI Chatbot.
                  </li>
                  <li>
                    Copy, distribute, modify, reverse engineer, decompile, or
                    extract the source code of the AI Chatbot without explicit
                    written consent.
                  </li>
                  <li>Share false information or impersonate others.</li>
                </ul>
              </div>

              <div>
                <strong>3. Verification Responsibility:</strong> You are solely
                responsible for verifying all information provided by the AI
                Chatbot with official sources, including but not limited to IIM
                websites, business school admissions portals, CAT/XAT/GMAT/GRE
                official websites, and AICTE-approved institution lists.
              </div>
            </div>
          </section>

          <section>
            <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-3">
              Data Privacy and Security
            </h3>

            <div className="space-y-4 text-sm text-gray-700">
              <div>
                <strong>1. No Privacy Guarantee:</strong> The AI Chatbot does
                not guarantee privacy, confidentiality, or security of the
                information you provide. Conversations may be reviewed by{" "}
                {OWNER_NAME}, collaborators, partners, or affiliated entities
                for purposes such as improving the AI Chatbot, developing
                educational content, training machine learning models, and
                conducting research.
              </div>

              <div>
                <strong>2. Sensitive Personal Information:</strong> Do not share
                sensitive personal information such as Aadhaar numbers, PAN
                numbers, bank account details, credit/debit card information,
                passwords, or other confidential data through the AI Chatbot. We
                are not responsible for any misuse of information you
                voluntarily provide.
              </div>

              <div>
                <strong>3. Public Information:</strong> Any information you
                provide through the AI Chatbot is treated as public and
                non-confidential.
              </div>

              <div>
                <strong>4. Data Transmission and Compliance:</strong> Inputs may
                be transmitted to and processed by third-party services that may
                not be subject to Indian data protection regulations. While we
                strive to maintain reasonable security measures, we cannot
                guarantee compliance with the Digital Personal Data Protection
                Act, 2023 or other applicable data protection laws.
              </div>
            </div>
          </section>

          <section>
            <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-3">
              Ownership of Content and Commercial Use
            </h3>

            <div className="space-y-4 text-sm text-gray-700">
              <div>
                <strong>1. License Grant:</strong> By using the AI Chatbot, you
                grant {OWNER_NAME} a worldwide, perpetual, irrevocable,
                royalty-free, non-exclusive license to use, reproduce, modify,
                adapt, publish, translate, create derivative works from,
                distribute, and display any content, inputs you provide, and
                outputs generated by the AI Chatbot. This includes, but is not
                limited to, questions, conversations, profile information, and
                academic data.
              </div>

              <div>
                <strong>2. Commercial and Research Use:</strong> {OWNER_NAME}{" "}
                reserves the right to use any input provided by users and any
                output generated by the AI Chatbot for commercial purposes,
                research, training datasets, educational content development, or
                other activities without compensation or notification to users.
              </div>

              <div>
                <strong>3. No Claim to Gains or Profits:</strong> Users agree
                that they have no rights, claims, or entitlement to any gains,
                profits, or benefits derived from the use or exploitation of the
                content provided to the AI Chatbot.
              </div>

              <div>
                <strong>4. Anonymization:</strong> While we may anonymize data
                for research and commercial purposes, we do not guarantee
                complete anonymization or de-identification of your inputs.
              </div>
            </div>
          </section>

          <section>
            <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-3">
              Disclaimer for Indian MBA Admissions
            </h3>

            <div className="text-sm text-gray-700">
              <p>
                The AI Chatbot provides general guidance on MBA admissions in
                India, including but not limited to IIMs (Indian Institutes of
                Management), IITs, XLRI, FMS Delhi, SPJIMR, ISB, MDI, NMIMS, and
                other business schools. However:
              </p>
              <ul className="list-disc ml-6 mt-2 space-y-1">
                <li>
                  Admission criteria, cutoffs, eligibility requirements, and
                  processes are subject to change by respective institutions and
                  examination bodies.
                </li>
                <li>
                  The AI Chatbot does not guarantee admission to any
                  institution.
                </li>
                <li>
                  College rankings, placement statistics, fee structures, and
                  return on investment (ROI) figures mentioned are indicative
                  and may not reflect current data.
                </li>
                <li>
                  Users must independently verify all details with official
                  institution websites and admission authorities before making
                  any decisions.
                </li>
                <li>
                  Information about reservation policies, category-wise cutoffs,
                  and diversity requirements should be confirmed with official
                  sources.
                </li>
              </ul>
            </div>
          </section>

          <section>
            <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-3">
              Indemnification
            </h3>

            <p className="text-sm text-gray-700">
              By using the AI Chatbot, you agree to indemnify and hold harmless{" "}
              {OWNER_NAME}, collaborators, partners, affiliated entities, and
              representatives from any claims, damages, losses, liabilities,
              costs, or expenses (including reasonable attorneys' fees) arising
              out of your use of the AI Chatbot, violation of these terms, or
              violation of any applicable laws or third-party rights.
            </p>
          </section>

          <section>
            <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-3">
              Governing Law and Jurisdiction
            </h3>

            <p className="text-sm text-gray-700">
              These terms are governed by the laws of India. Any disputes
              arising under or in connection with these terms shall be subject
              to the exclusive jurisdiction of the courts located in [Your
              City], India. If you are accessing this service from outside
              India, you agree to comply with all applicable local laws and
              regulations.
            </p>
          </section>

          <section>
            <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-3">
              Changes to Terms
            </h3>

            <p className="text-sm text-gray-700">
              We reserve the right to modify these Terms of Use at any time
              without prior notice. Your continued use of the AI Chatbot
              following any changes constitutes acceptance of the modified
              terms. It is your responsibility to review these terms
              periodically.
            </p>
          </section>

          <section>
            <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-3">
              Severability
            </h3>

            <p className="text-sm text-gray-700">
              If any provision of these terms is found to be unenforceable or
              invalid under applicable law, such provision shall be modified to
              the minimum extent necessary to make it enforceable, or if it
              cannot be made enforceable, it shall be severed from these terms.
              The remaining provisions shall continue in full force and effect.
            </p>
          </section>

          <section>
            <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-3">
              Contact Information
            </h3>

            <p className="text-sm text-gray-700">
              For questions or concerns regarding these Terms of Use, please
              contact {OWNER_NAME} at [Your Contact Email].
            </p>
          </section>

          <section className="bg-blue-50 border-l-4 border-blue-500 p-4 mt-6">
            <h3 className="text-lg font-semibold text-blue-900 mb-2">
              Acceptance of Terms
            </h3>
            <p className="text-sm text-blue-800">
              By using the AI Chatbot, you confirm that you have read,
              understood, and agreed to these Terms of Use and Disclaimer. If
              you do not agree with any part of these terms, you may not use the
              AI Chatbot.
            </p>
          </section>

          <p className="text-xs text-gray-500 mt-8 pt-4 border-t">
            Last Updated: November 27, 2025
          </p>
        </div>
      </div>
    </div>
  );
}

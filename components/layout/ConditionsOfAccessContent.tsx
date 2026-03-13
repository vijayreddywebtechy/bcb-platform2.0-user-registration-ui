"use client";

import Link from "next/link";

const REGULATORY_URL = process.env.NEXT_PUBLIC_FOOTER_REGULATORY ?? "#";
const SECURITY_CENTRE_URL =
  process.env.NEXT_PUBLIC_FOOTER_SECURITY_CENTRE ?? "#";
const PRIVACY_STATEMENT_URL =
  process.env.NEXT_PUBLIC_FOOTER_PRIVACY_STATEMENT ?? "#";

const linkClass = "text-[#0051FF] hover:underline transition-colors";

function ClauseParagraph({
  num,
  className = "mb-5",
  children,
}: {
  num: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={`flex gap-2 ${className}`}>
      <span className="text-[#0051FF] font-bold text-sm flex-shrink-0">{num}</span>
      <span className="flex-1 min-w-0">{children}</span>
    </div>
  );
}

export default function ConditionsOfAccessContent() {
  return (
    <div className="max-w-none text-secondary text-sm leading-relaxed">
      <p className="text-xs text-neutral-500 mb-6">
        Version 2 April 2023
      </p>

      <h2 className="text-2xl font-bold text-primary-dark mt-8 mb-6">
        Platform Access Terms and Conditions
      </h2>

      <h3 className="text-xl font-bold text-primary-dark mt-10 mb-5">
        1   Conditions of access
      </h3>
      <ClauseParagraph num="1.1" className="mb-5">
        Thank you for visiting the platform Before you go further, you must read and understand the terms in this document (<strong>platform terms</strong>) as well as the following documents that form part of these platform terms :
      
        <ul className="list-disc pl-6 space-y-2 mb-5">
          <li>
            <Link href={PRIVACY_STATEMENT_URL} target="_blank" rel="noopener noreferrer" className={linkClass}>
              Privacy
            </Link>
          </li>
          <li>
            <Link href={SECURITY_CENTRE_URL} target="_blank" rel="noopener noreferrer" className={linkClass}>
              Security Centre
            </Link>
          </li>
          <li>
            <Link href={REGULATORY_URL} target="_blank" rel="noopener noreferrer" className={linkClass}>
              Regulatory
            </Link>
          </li>
          <li>Code of Conduct</li>
        </ul>
      </ClauseParagraph>
      <ClauseParagraph num="1.2" className="mb-5">
        The platform terms tell you all the important things you need to know to use the platform so if there is anything about them that you do not understand, you must ask us to explain it to you before you accept them or continue using the platform.
      </ClauseParagraph>
      <ClauseParagraph num="1.3" className="mb-8">
        Certain words in the platform terms are defined at the end of this document.
      </ClauseParagraph>

      <h3 className="text-xl font-bold text-primary-dark mt-10 mb-5">
        2 Introduction
      </h3>
      <ClauseParagraph num="2.1" className="mb-5">
        These platform terms apply when you access the platform for the first time, and the most recent version will apply each time you log in. They are a binding legal agreement between you and us. If you do not agree to be bound by these platform terms, do not access or use the platform <strong>By accessing the platform you agree that the platform terms apply to you.</strong>
      </ClauseParagraph>
      <ClauseParagraph num="2.2" className="mb-5">
        <strong>In the platform terms, certain words and sentences appear in bold text to alert you to any limitations or anything that creates risk or liability, requires you to provide us with an indemnity and/or serves as an acknowledgement, by you, of a fact.</strong>
      </ClauseParagraph>
      <ClauseParagraph num="2.3" className="mb-5">
        You must register as a user to have access to all of the features and benefits of the platform. We may accept or reject your registration using our own judgement and without giving reasons.
      </ClauseParagraph>
      <ClauseParagraph num="2.4" className="mb-5">
        You may be able to access various solutions provided by us and by producers on the platform The producers are independent of us and their solution terms will apply to the solutions they provide. To be clear, and regardless of what a producer tells you in any correspondence with you or in their solution terms, we are not responsible for the solutions producers make available to you. The producers, and not us, are entirely responsible and liable for the solutions. Any concerns or disputes must be sent directly to them.
      </ClauseParagraph>
      <ClauseParagraph num="2.5" className="mb-5">
        Once registered, you will use a combination of security details to access the platform You must always keep your security details safe because any login to the platform or any instructions submitted on or through the platform will be treated as authentic. The same will apply if you delegate your authority to someone else to access the platform.
      </ClauseParagraph>
      <ClauseParagraph num="2.6" className="mb-8">
        When you use our platform we assume that you are at least 18 years old, or that someone (such as a parent or legal guardian) has assisted you with consent to these platform terms.
      </ClauseParagraph>

      <h3 className="text-xl font-bold text-primary-dark mt-10 mb-5">
        3 User Authority
      </h3>
      <ClauseParagraph num="3.1" className="mb-5">
        By accepting the platform terms you confirm that, if you are (or reasonably appear to be) validly acting on behalf of an organisation, you have the authority to access and perform as such on the platform.
      </ClauseParagraph>
      <ClauseParagraph num="3.2" className="mb-5">
        An organisation is responsible for the actions of its users.
      </ClauseParagraph>
      <ClauseParagraph num="3.3" className="mb-5">
        We will assume that the actions of any user are performed in accordance with the authority granted to them by their organisation. You agree that you will comply with all internal and external requirements (including authorities, policies and instructions) that apply to the organisation that you represent.
      </ClauseParagraph>
      <ClauseParagraph num="3.4" className="mb-5">
        We may check the integrity of any action or the authenticity of any use of this platform.
      </ClauseParagraph>
      <ClauseParagraph num="3.5" className="mb-8">
        The organisation and/or the authorised person must tell us if any user is no longer authorised to access the platform and/or represent the organisation. We will process any changes within a reasonable time.
      </ClauseParagraph>

      <h3 className="text-xl font-bold text-primary-dark mt-10 mb-5">
        4 Information provided by you
      </h3>
      <ClauseParagraph num="4.1" className="mb-5">
        All information you give us through the platform (and through any chatbot technologies that we use) must be complete and accurate. It must not be misleading nor (to the best of your knowledge) be missing any important details, as we rely on that information.
      </ClauseParagraph>
      <ClauseParagraph num="4.2" className="mb-5">
        We and any agent acting on our behalf can verify any information you have given us.
      </ClauseParagraph>
      <ClauseParagraph num="4.3" className="mb-8">
        <strong>You confirm that, if you share third-party information with us, it will not breach that third party&apos;s confidentiality, privacy or Intellectual Property rights.</strong>
      </ClauseParagraph>

      <h3 className="text-xl font-bold text-primary-dark mt-10 mb-5">
        5 Information provided on the Platform
      </h3>
      <ClauseParagraph num="5.1" className="mb-5">
        All information on this platform is for information purposes only and you must always contact a professional adviser before acting on any information on this platform.
      </ClauseParagraph>
      <ClauseParagraph num="5.2" className="mb-5">
        <strong>We do not control information provided by users or producers, including newsfeeds, and we do not guarantee that it is correct or suitable for anything.</strong> If you see an article or a report that you think breaches our Code of Conduct, please contact us.
      </ClauseParagraph>
      <ClauseParagraph num="5.3" className="mb-5">
        All current news, market information and data shown on our platform are delayed unless we tell you otherwise.
      </ClauseParagraph>
      <ClauseParagraph num="5.4" className="mb-5">
        You must not use, aggregate, create a link to, or reproduce any portion of a newsfeed without our prior written consent and you must not do anything that breaches our rights or the rights of any third party in respect of any news or article in the newsfeed.
      </ClauseParagraph>
      <ClauseParagraph num="5.5" className="mb-5">
        Information sent over the Internet, including by email, can be intercepted, seen or changed. We take steps to limit these risks as explained in our <Link href={PRIVACY_STATEMENT_URL} target="_blank" rel="noopener noreferrer" className={linkClass}>privacy</Link> and <Link href={SECURITY_CENTRE_URL} target="_blank" rel="noopener noreferrer" className={linkClass}>security statement</Link> and <strong>we are not responsible for any loss or damage you may suffer if your information is intercepted, seen or changed while you are on the platform or leaving the platform.</strong>
      </ClauseParagraph>
      <ClauseParagraph num="5.6" className="mb-8">
        You agree that, if you receive confidential information about us, another User or a third party, you will not share that information with anyone and you will use it only for the purpose for which you received it.
      </ClauseParagraph>

      <h3 className="text-xl font-bold text-primary-dark mt-10 mb-5">
        6 Charges
      </h3>
      <ClauseParagraph num="6.1" className="mb-5">
        We do not charge fees for the use of the platform. This may change and, if so, we will tell you beforehand. Solutions may incur fees, which will be covered in the solution terms, and any questions must be sent to the producer.
      </ClauseParagraph>
      <ClauseParagraph num="6.2" className="mb-8">
        Data costs charged by your Internet service provider or mobile phone operator will apply when you use the platform and any questions related to your data costs must be sent to them.
      </ClauseParagraph>

      <h3 className="text-xl font-bold text-primary-dark mt-10 mb-5">
        7 Compliance with applicable laws
      </h3>
      <ClauseParagraph num="7.1" className="mb-5">
        <strong>You must comply with all applicable laws and any policies, requirements and instructions related to your use of the platform.</strong>
      </ClauseParagraph>
      <ClauseParagraph num="7.2" className="mb-5">
        You must notify us immediately of any payments made in terms of these platform terms that may result in a breach of any applicable laws, including anti-money laundering legislation and anti-bribery and corruption legislation, and you must help us to investigate such breach.
      </ClauseParagraph>
      <ClauseParagraph num="7.3" className="mb-5">
        We may report a violation or suspected violation of any applicable laws, including anti-money laundering legislation and anti-bribery and corruption legislation, to the relevant regulatory or industry body or law enforcement agency, and subsequently act according to the guidance of that authorised body or agency and, at our discretion, refuse to fulfil any of our obligations under these platform terms or we may terminate the platform terms with immediate effect.
      </ClauseParagraph>
      <ClauseParagraph num="7.4" className="mb-8">
        We are not responsible for any losses you may suffer should a regulatory body seize or withhold any funds or should we terminate these platform terms or any other relationship that we have with you.
      </ClauseParagraph>

      <h3 className="text-xl font-bold text-primary-dark mt-10 mb-5">
        8 Sanctions
      </h3>
      <ClauseParagraph num="8.1" className="mb-5">
        You must not use this platform in any way to benefit a sanctioned entity (that is, a person or country listed on a sanctions list or subject to sanctions).
      </ClauseParagraph>
      <ClauseParagraph num="8.2" className="mb-5">
        You must let us know immediately if sanctions are to be applied to you or an affiliate of yours.
      </ClauseParagraph>
      <ClauseParagraph num="8.3" className="mb-5">
        If we know or believe that you have breached this clause or that sanctions are to be applied to you or an affiliate of yours, we may with immediate effect restrict, suspend or terminate your access to the platform or terminate the platform terms.
      </ClauseParagraph>
      <ClauseParagraph num="8.4" className="mb-8">
        We cannot be held liable to you for any losses you may incur or any claims against you as a result of our termination of the platform terms in terms of this clause.
      </ClauseParagraph>

      <h3 className="text-xl font-bold text-primary-dark mt-10 mb-5">
        9 Security and Availability
      </h3>
      <ClauseParagraph num="9.1" className="mb-5">
        We aim to keep the platform and associated services available and running but all online services suffer occasional disruptions and outages. <strong>We will not be liable in any way for any outage or disruption of services, regardless of the cause of the disruption or outage.</strong>
      </ClauseParagraph>
      <ClauseParagraph num="9.2" className="mb-5">
        You must maintain and secure your hardware and software (computer equipment and programs and communication systems) for best use of the platform and have appropriate software to protect your systems against fraud and cybersecurity attacks.
      </ClauseParagraph>
      <ClauseParagraph num="9.3" className="mb-5">
        If we offer any software to you on or through our platform the licence agreement will be between you and the software licensor (owner). <strong>We will not be responsible for any breach by you of a software licence. We do not expressly or implicitly warrant that any software is of good quality or suitable for its purpose. Certain files produced by third parties may also contain computer viruses, spyware, malware, disabling codes, worms or other devices or defects. By using the platform you acknowledge and accept these risks.</strong>
      </ClauseParagraph>
      <ClauseParagraph num="9.4" className="mb-5">
        If you suspect that an unauthorised person has compromised your profile or systems, you must inform us about this as soon as you become aware of it.
      </ClauseParagraph>
      <ClauseParagraph num="9.5" className="mb-8">
        We use security controls to protect the platform from unauthorised access. Neither we nor anyone else should ever ask you for any of your security details by email. If you are asked for any of your security details in this way, do not disclose them.
      </ClauseParagraph>

      <h3 className="text-xl font-bold text-primary-dark mt-10 mb-5">
        10 Access, Suspension and Termination
      </h3>
      <ClauseParagraph num="10.1" className="mb-5">
        <strong>We may terminate your access to the platform or suspend your status as a registered user at any time for any reason.</strong>
      </ClauseParagraph>
      <ClauseParagraph num="10.2" className="mb-5">
        <strong>You may stop using the platform at any time. If you are a registered user, you may delete your account. If you are not sure how to delete your account, please contact us using the details provided in 18.3 below.</strong>
      </ClauseParagraph>
      <ClauseParagraph num="10.3" className="mb-5">
        <strong>We may modify or discontinue (temporarily or permanently) the platform (or any part of it) at any time, with or without notice.</strong>
      </ClauseParagraph>
      <ClauseParagraph num="10.4" className="mb-5">
        <strong>We will not be responsible for any loss or damage that you may suffer as a result of any action taken in terms of clause 10.</strong>
      </ClauseParagraph>
      <ClauseParagraph num="10.5" className="mb-5">
        <strong>You will hold us harmless in any dispute you may have with a producer or user, including where your access to or your use of a solution has been suspended or terminated for any reason.</strong>
      </ClauseParagraph>
      <ClauseParagraph num="10.6" className="mb-5">
        Any licences or rights of use that may have been granted to you under the platform terms will cease to exist immediately on termination.
      </ClauseParagraph>
      <ClauseParagraph num="10.7" className="mb-8">
        No claim that we have against you for a breach of the platform terms will be affected by any termination or suspension of a registered user.
      </ClauseParagraph>

      <h3 className="text-xl font-bold text-primary-dark mt-10 mb-5">
        11 Communication
      </h3>
      <ClauseParagraph num="11.1" className="mb-5">
        We will communicate with you by any means we deem suitable if we need to contact you.
      </ClauseParagraph>
      <ClauseParagraph num="11.2" className="mb-5">
        <strong>You agree to receive contractual and/or legal communications and/or notices from us in an electronic form through the email address you supplied on registration and they will have the same legal effect as if written on paper.</strong>
      </ClauseParagraph>
      <ClauseParagraph num="11.3" className="mb-8">
        <strong>Emails to us or messages on the platform will not be considered valid legal notice to us.</strong> Legal notice must be in writing, copy-marked for the attention of the Head: Legal SA and Head: Business and Commercial Banking SA and served by hand at 5 Simmonds Street, Johannesburg, South Africa during ordinary business hours.
      </ClauseParagraph>

      <h3 className="text-xl font-bold text-primary-dark mt-10 mb-5">
        12 Intellectual Property
      </h3>
      <ClauseParagraph num="12.1" className="mb-5">
        We and/or our third-party licensors own all Intellectual Property rights to the platform and all content published on it or sent to or from it.
      </ClauseParagraph>
      <ClauseParagraph num="12.2" className="mb-5">
        Nothing on our platform is a licence (permission) to use any Intellectual Property without prior written permission from us or from any other party that has rights in the Intellectual Property.
      </ClauseParagraph>
      <ClauseParagraph num="12.3" className="mb-5">
        We give you the right to use our Intellectual Property in and to the platform only for purposes of accessing and using the platform in line with the platform terms. You must not use our Intellectual Property for any other purpose. This right will commence when you access the platform and will end in accordance with the platform terms or on written notice from us if we believe or suspect that you are wrongly or unlawfully (illegally) using the platform at which point you must immediately stop all use of all Intellectual Property in and to our platform.
      </ClauseParagraph>
      <ClauseParagraph num="12.4" className="mb-5">You must not do the following in respect of our Intellectual Property and/or third-party licensors&apos; Intellectual Property:
        <ul className="list-disc pl-6 space-y-2 mb-5">
          <li>copy or claim to have any rights in such Intellectual Property;</li>
          <li>dispute or contest the validity of or our rights in such Intellectual Property; and</li>
          <li>damage or cause detriment to such intellectual property or to the reputation of or any goodwill associated with such Intellectual Property.</li>
        </ul>
      </ClauseParagraph>
      <ClauseParagraph num="12.5" className="mb-5">
        <strong>We provide the Intellectual Property on our platform without any warranty of any kind, either express or implied, including non-infringement of our Intellectual Property.</strong>
      </ClauseParagraph>
      <ClauseParagraph num="12.6" className="mb-8">
        <strong>You will compensate us for any losses that we suffer because of your use of the Intellectual Property rights in and to our platform.</strong>
      </ClauseParagraph>

      <h3 className="text-xl font-bold text-primary-dark mt-10 mb-5">
        13 Licence and Usage
      </h3>
      <ClauseParagraph num="13.1" className="mb-5">
        We process all information collected, held or produced as a result of your access and/or use of the platform (including that of your end-users) including any ideas, suggestions, recommendations and experiences, and any other information that does not constitute Personal Information or Intellectual Property (<strong>feedback</strong>). We may use and incorporate feedback for the platform and/or for any other purpose we choose, without payment of royalties or other benefit to you.
      </ClauseParagraph>
      <ClauseParagraph num="13.2" className="mb-8">
        You agree to provide us with a non-exclusive, fully paid-up, irrevocable, perpetual, transferable and worldwide licence to use, access, collect, store, reproduce, analyse, enhance, modify, distribute and determine the use of all information provided, including any third-party material, for purposes determined by us at our reasonable discretion, which may include marketing, diagnostics, analysis, development, correction and promotion.
      </ClauseParagraph>

      <h3 className="text-xl font-bold text-primary-dark mt-10 mb-5">
        14 Personal Information and Privacy
      </h3>
      <ClauseParagraph num="14.1" className="mb-5">
        We understand that your personal information is important to you. By using the platform you acknowledge that your personal information will be processed by us and third parties (if necessary) according to our Privacy Statement, which is in line with all applicable laws on protecting and processing personal information.
      </ClauseParagraph>
      <ClauseParagraph num="14.2" className="mb-5">
        It is your responsibility to read and understand the contents of the Privacy Statement
      </ClauseParagraph>
      <ClauseParagraph num="14.3" className="mb-5">
        We will maintain the confidentiality of your personal information and we will implement security safeguards to secure your personal information as set out in the Privacy Statement.
      </ClauseParagraph>
      <ClauseParagraph num="14.4" className="mb-8">
        Our Privacy Statement includes what personal information is; what information we process; how we process your information; where we collect your information; who we share your information with; your rights as a data subject and the complaints contact details of both Standard Bank and the Information Regulator.
      </ClauseParagraph>

      <h3 className="text-xl font-bold text-primary-dark mt-10 mb-5">
        15 Letter of proof
      </h3>
      <p className="mb-8">
        A letter provided by us confirming the content on the platform as at a specified date, will be accepted by you as correct, unless you prove otherwise.
      </p>

      <h3 className="text-xl font-bold text-primary-dark mt-10 mb-5">
        16 Hyperlinks
      </h3>
      <p className="mb-8">
        You must not establish a hyperlink, a frame, a metatag or a similar reference to our platform whether electronically or otherwise, without our prior written consent.
      </p>

      <h3 className="text-xl font-bold text-primary-dark mt-10 mb-5">
        17 Our responsibilities to you
      </h3>
      <ClauseParagraph num="17.1" className="mb-5">
        <strong>We will not be liable for any loss or damage you may incur as a result of your use of the platform unless we have been grossly negligent or acted with harmful intent.</strong>
      </ClauseParagraph>
      <ClauseParagraph num="17.2" className="mb-5">
        <strong>We are not responsible for losses caused by unforeseeable things or circumstances outside our control, including a change in law, regulations, market conditions or political or economic circumstances, or where we acted to comply with the platform terms or any law, or unforeseeable disruptions to your services.</strong>
      </ClauseParagraph>
      <ClauseParagraph num="17.3" className="mb-5">
        <strong>We are not responsible for losses caused during periods of maintenance (planned or unplanned).</strong>
      </ClauseParagraph>
      <ClauseParagraph num="17.4" className="mb-5">
        <strong>We are not responsible for losses caused by your reliance on any information we provide on the platform.</strong>
      </ClauseParagraph>
      <ClauseParagraph num="17.5" className="mb-5">
        <strong>We are not responsible for any indirect or consequential losses you or your organisation suffered by accessing and/or using the platform or any solution or API found on it and you will hold us harmless if anyone brings a claim because of your use of the platform or any breach by you of the platform terms.</strong>
      </ClauseParagraph>
      <ClauseParagraph num="17.6" className="mb-8">
        <strong>If you have a dispute with any third party, we will not be involved in it. You will hold us harmless and release us from all claims, demands and damages (whether these constitute direct or consequential loss) connected with such disputes.</strong>
      </ClauseParagraph>

      <h3 className="text-xl font-bold text-primary-dark mt-10 mb-5">
        18 General
      </h3>
      <ClauseParagraph num="18.1" className="mb-5">
        The laws of the Republic of South Africa govern these platform terms and the relationship between us and you. The courts in the Republic of South Africa have sole jurisdiction (the authority to hear and decide disputes).
      </ClauseParagraph>
      <ClauseParagraph num="18.2" className="mb-5">
        If any provision or any part thereof in the platform terms is found to be illegal, invalid, defective or unenforceable for any reason, the remaining provisions will continue to be of full force and effect.
      </ClauseParagraph>
      <ClauseParagraph num="18.3" className="mb-8">
        You must not transfer any of your rights and obligations under these platform terms without our prior written consent. You can contact us at{" "}
        <a href="mailto:BusinessBankingDigitalSupport@standardbank.co.za" className={linkClass}>
          BusinessBankingDigitalSupport@standardbank.co.za
        </a>{" "}
        or on{" "}
        <a href="tel:0860109075" className={linkClass}>
          0860 109 075 (Option 3)
        </a>{" "}
        / Int:{" "}
        <a href="tel:+27108242934" className={linkClass}>
          +27 10 824 2934
        </a>{" "}
        if you have a complaint or a question about the platform or the platform terms.
      </ClauseParagraph>

      <h3 className="text-xl font-bold text-primary-dark mt-10 mb-5">
        19 Glossary
      </h3>
      <div className="overflow-x-auto rounded-lg border-2 border-gray-300">
        <table className="w-full text-sm text-left border-collapse border border-gray-300">
          <thead>
            <tr className="bg-neutral-100">
              <th className="px-4 py-3 font-semibold text-primary-dark border border-gray-300">
                Term
              </th>
              <th className="px-4 py-3 font-semibold text-primary-dark border border-gray-300">
                Meaning
              </th>
            </tr>
          </thead>
          <tbody className="text-secondary">
            <tr>
              <td className="px-4 py-3 font-semibold text-primary-dark align-top border border-gray-300">API</td>
              <td className="px-4 py-3 border border-gray-300">Application programming interface, a set of functions and procedures that allow the creation of applications that access the features of or data from an operating system, an application or some other service.</td>
            </tr>
            <tr className="border-b border-gray-100">
              <td className="px-4 py-3 font-medium text-primary-dark align-top border border-gray-300">applicable laws</td>
              <td className="px-4 py-3 border border-gray-300">Laws, legislation, regulations, statutes, by-laws, consents and other laws of any relevant governmental authority and any other instrument having the force of law that may be issued and in force from time to time in any relevant jurisdiction relating to the platform and the activities performed on it and/or to any solution or API accessed through it.</td>
            </tr>
            <tr className="border-b border-gray-100">
              <td className="px-4 py-3 font-medium text-primary-dark align-top border border-gray-300">authorised person</td>
              <td className="px-4 py-3 border border-gray-300">A registered user who has been (or reasonably appears to have been) appointed by an organisation with the authority to bind that organisation to the platform terms and the solution terms and to determine which other individuals from the organisation can access the platform.</td>
            </tr>
            <tr className="border-b border-gray-100">
              <td className="px-4 py-3 font-medium text-primary-dark align-top border border-gray-300">confidential information</td>
              <td className="px-4 py-3 border border-gray-300">Proprietary information that is by its nature regarded in law as confidential and is designated as confidential; agreed in writing by you and us to be confidential; and/or information that you or we know (or should know) is confidential. It does not include information that is or becomes public knowledge, other than by breach of the platform terms or any other confidentiality obligation.</td>
            </tr>
            <tr className="border-b border-gray-100">
              <td className="px-4 py-3 font-medium text-primary-dark align-top border border-gray-300">content</td>
              <td className="px-4 py-3 border border-gray-300">Information, data, documents, pages and images.</td>
            </tr>
            <tr className="border-b border-gray-100">
              <td className="px-4 py-3 font-medium text-primary-dark align-top border border-gray-300">Intellectual Property</td>
              <td className="px-4 py-3 border border-gray-300">Works of copyright, trade marks (statutory and common law), patentable inventions, patents, protectable design subject matter, designs and domain names including applications, registrations and unregistered forms of any of these, as well as all other intellectual property rights (registered or unregistered) and the right to apply for all or any of these.</td>
            </tr>
            <tr className="border-b border-gray-100">
              <td className="px-4 py-3 font-medium text-primary-dark align-top border border-gray-300">marketplace</td>
              <td className="px-4 py-3 border border-gray-300">The community forum on the platform.</td>
            </tr>
            <tr className="border-b border-gray-100">
              <td className="px-4 py-3 font-medium text-primary-dark align-top border border-gray-300">organisation</td>
              <td className="px-4 py-3 border border-gray-300">An entity that has a legal and separately identifiable existence.</td>
            </tr>
            <tr className="border-b border-gray-100">
              <td className="px-4 py-3 font-medium text-primary-dark align-top border border-gray-300">personal information</td>
              <td className="px-4 py-3 border border-gray-300">Information as defined in the data protection laws applicable in the country/ies that you, we and/or the third parties operate in and applicable to our use of the information.</td>
            </tr>
            <tr className="border-b border-gray-100">
              <td className="px-4 py-3 font-medium text-primary-dark align-top border border-gray-300">platform</td>
              <td className="px-4 py-3 border border-gray-300">The platform as updated from time to time and owned by us, that provides an interface through which (i) a user can buy, access, sign up to and/or use various solutions and (ii) a producer can make their solutions available to users; (iii) a user can participate in the marketplace; and (iv) any other features and functionalities may be made available at any time.</td>
            </tr>
            <tr className="border-b border-gray-100">
              <td className="px-4 py-3 font-medium text-primary-dark align-top border border-gray-300">process/ing</td>
              <td className="px-4 py-3 border border-gray-300">As defined in the data protection laws applicable in the country/ies that you, we and the relevant third parties operate in and applicable to our use of your personal information.</td>
            </tr>
            <tr className="border-b border-gray-100">
              <td className="px-4 py-3 font-medium text-primary-dark align-top border border-gray-300">producer</td>
              <td className="px-4 py-3 border border-gray-300">Any third party (including a juristic entity) registered on the platform to market, sell and provide a solution to a user.</td>
            </tr>
            <tr className="border-b border-gray-100">
              <td className="px-4 py-3 font-medium text-primary-dark align-top border border-gray-300">security details</td>
              <td className="px-4 py-3 border border-gray-300">Security processes or security procedures that we ask you to follow as well as unique information we need in order to identify you so that we can give you access to the platform and provide you with solutions or any other services available on or through the platform.</td>
            </tr>
            <tr className="border-b border-gray-100">
              <td className="px-4 py-3 font-medium text-primary-dark align-top border border-gray-300">solution</td>
              <td className="px-4 py-3 border border-gray-300">A service or product, or a combination of these, that we or the producer may offer and that is viewed, accessed, used, bought and/or subscribed to on or through the platform.</td>
            </tr>
            <tr className="border-b border-gray-100">
              <td className="px-4 py-3 font-medium text-primary-dark align-top border border-gray-300">solution terms</td>
              <td className="px-4 py-3 border border-gray-300">Any additional terms and conditions set by a producer that apply to you. These can be accessed through the hyperlink in the platform terms or through the platform itself or the producer can make them available to you.</td>
            </tr>
            <tr className="border-b border-gray-100">
              <td className="px-4 py-3 font-medium text-primary-dark align-top border border-gray-300">us/we/our</td>
              <td className="px-4 py-3 border border-gray-300">The Standard Bank of South Africa Limited, the Platform provider.</td>
            </tr>
            <tr className="border-b border-gray-100">
              <td className="px-4 py-3 font-medium text-primary-dark align-top border border-gray-300">user/you/your</td>
              <td className="px-4 py-3 border border-gray-300">Refers to any person accessing the platform and includes an individual registered to access the platform as an authorised person.</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

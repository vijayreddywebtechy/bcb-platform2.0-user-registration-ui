import Link from "next/link";

interface ContactRow {
  label: string;
  value: string;
  href?: string;
}

interface ContactBlock {
  title: string;
  contacts: ContactRow[];
}

interface LinkBlock {
  title: string;
  links: { label: string; href: string }[];
}

const contactBlocks: ContactBlock[] = [
  {
    title: "Lost or stolen cards",
    contacts: [
      { label: "Local", value: "0800 020 600", href: "tel:0800020600" },
      {
        label: "International",
        value: "+27 10 824 1515",
        href: "tel:+27108241515",
      },
    ],
  },
  {
    title: "Get in touch",
    contacts: [
      { label: "Local", value: "0860 123 000", href: "tel:0860123000" },
      {
        label: "International",
        value: "+27 10 824 1515",
        href: "tel:+27108241515",
      },
    ],
  },
  {
    title: "Report unethical behaviour",
    contacts: [
      { label: "Local", value: "0800 020 600", href: "tel:0800020600" },
      {
        label: "Email",
        value: "whistleblowingline@tip-offs.com",
        href: "mailto:whistleblowingline@tip-offs.com",
      },
    ],
  },
];

const getToKnowUs: LinkBlock = {
  title: "Get to know us",
  links: [
    { label: "Standard Bank Group", href: "/" },
    { label: "Investor relations", href: "/" },
    { label: "Who we sponsor", href: "/" },
  ],
};

const fraudBlock: ContactBlock = {
  title: "Report a fraud incident",
  contacts: [
    { label: "Local", value: "0800 222 050", href: "tel:0800222050" },
    {
      label: "International",
      value: "+27 10 824 1515",
      href: "tel:+27108241515",
    },
    {
      label: "Email",
      value: "Reportfraud@standardbank.co.za",
      href: "mailto:Reportfraud@standardbank.co.za",
    },
  ],
};

const extraLinks = [
  {
    label: "Click here for more information about unethical behaviour",
    href: "/",
  },
  { label: "Compliments or complaints", href: "/" },
  { label: "Give us a call", href: "/" },
  { label: "Contact us", href: "/" },
];

function Chevron() {
  return <span className="inline-block ml-1 text-[10px] leading-none">&rsaquo;</span>;
}

function ContactTable({ contacts }: { contacts: ContactRow[] }) {
  return (
    <div className="mt-3 space-y-1.5">
      {contacts.map((row, i) => (
        <div key={i} className="flex gap-3 text-sm text-white/80">
          <span className="w-24 flex-shrink-0">{row.label}</span>
          {row.href ? (
            <Link href={row.href} className="hover:text-white transition-colors break-all">
              {row.value}
            </Link>
          ) : (
            <span>{row.value}</span>
          )}
        </div>
      ))}
    </div>
  );
}

function FooterInfo() {
  return (
    <section className="bg-primary-dark py-10 md:py-12 lg:py-14">
      <div className="page-container">
        {/* Row 1: Contact blocks */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          {contactBlocks.map((block) => (
            <div key={block.title}>
              <h3 className="text-lg md:text-xl font-medium text-white">{block.title}</h3>
              <ContactTable contacts={block.contacts} />
            </div>
          ))}
        </div>

        {/* Row 2: Links & Fraud */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Get to know us */}
          <div>
            <h3 className="text-lg md:text-xl font-medium text-white">{getToKnowUs.title}</h3>
            <div className="mt-3 space-y-1.5">
              {getToKnowUs.links.map((link) => (
                <div key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/80 hover:text-white transition-colors"
                  >
                    {link.label}
                    <Chevron />
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {/* Report a fraud incident */}
          <div>
            <h3 className="text-lg md:text-xl font-medium text-white">{fraudBlock.title}</h3>
            <ContactTable contacts={fraudBlock.contacts} />
          </div>

          {/* Extra links */}
          <div>
            <div className="space-y-1.5">
              {extraLinks.map((link) => (
                <div key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/80 hover:text-white transition-colors"
                  >
                    {link.label}
                    <Chevron />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default FooterInfo;

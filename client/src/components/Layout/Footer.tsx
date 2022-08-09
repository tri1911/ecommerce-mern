import { Link } from "react-router-dom";

/* Logo & Text */

function FooterText() {
  return (
    <div className="space-y-8 xl:col-span-1">
      <img className="w-30" src="/images/svg/logo.svg" alt="E-commerce Logo" />
      <p className="text-gray-500 text-base">
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quasi est
        consectetur aperiam similique consequuntur beatae.
      </p>
      <div className="flex space-x-6">
        <SocialLink icon="fab fa-facebook-f" />
        <SocialLink icon="fab fa-twitter" />
        <SocialLink icon="fab fa-instagram" />
        <SocialLink icon="fab fa-linkedin-in" />
      </div>
    </div>
  );
}

function SocialLink({ href = "#", icon }: { href?: string; icon: string }) {
  return (
    <Link to={href} className="text-gray-400 hover:text-gray-500">
      <i className={icon} />
    </Link>
  );
}

/* Links */

type LinksGroupType = {
  title: string;
  links: string[];
};

const GROUPS: LinksGroupType[] = [
  {
    title: "Solution",
    links: ["Marketing", "Analytics", "Commerce", "Insights"],
  },
  {
    title: "Support",
    links: ["Pricing", "Documentation", "Guides", "API Status"],
  },
  {
    title: "Company",
    links: ["About", "Blog", "Jobs", "Press"],
  },
  {
    title: "Legal",
    links: ["Claim", "Privacy", "Policy", "Terms"],
  },
];

function LinksGroup({ group: { title, links } }: { group: LinksGroupType }) {
  return (
    <div className="mt-12 md:mt-0">
      <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">
        {title}
      </h3>
      <div className="mt-4 space-y-4">
        {links.map((link) => (
          <a
            key={link}
            href="/"
            className="text-base text-gray-500 hover:text-gray-900 block"
          >
            {link}
          </a>
        ))}
      </div>
    </div>
  );
}

function FooterLinks() {
  return (
    <div className="mt-12 grid grid-cols-2 gap-8 xl:mt-0 xl:col-span-2">
      <div className="md:grid md:grid-cols-2 md:gap-8">
        {GROUPS.slice(0, 2).map((group) => (
          <LinksGroup key={group.title} group={group} />
        ))}
      </div>
      <div className="md:grid md:grid-cols-2 md:gap-8">
        {GROUPS.slice(2).map((group) => (
          <LinksGroup key={group.title} group={group} />
        ))}
      </div>
    </div>
  );
}

function CopyRight() {
  return (
    <div className="bg-gray-800 py-4">
      <div className="container flex items-center justify-between">
        <p className="text-white">&copy; Elliot - All Rights Reserved</p>
        <img className="h-5" src="/images/methods.png" alt="" />
      </div>
    </div>
  );
}

export default function Footer() {
  return (
    <>
      <footer className="bg-white pt-16 pb-12 border-t border-gray-100">
        <div className="container">
          <section className="xl:grid xl:grid-cols-3 xl:gap-8">
            <FooterText />
            <FooterLinks />
          </section>
        </div>
      </footer>
      <CopyRight />
    </>
  );
}

import Image from "next/image";
import Link from "next/link";
import { Building2, ExternalLink, Linkedin, Mail, MapPin } from "lucide-react";
import { navLinks } from "@/lib/site-data";

const contact = {
  email: "biosynmat@gmail.com",
  mapsUrl: "https://maps.app.goo.gl/W1w41B2wLas4V69D7",
  institutionUrl: "https://www.srmist.edu.in/",
  address:
    "Department of Chemistry, SRM Institute of Science and Technology, SRM Nagar, Kattankulathur, Tamil Nadu 603203",
};

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-200 bg-slate-50">
      <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <section className="space-y-4">
            <Link href="/" className="inline-flex items-center gap-3">
              <Image
                src="/logo.svg"
                alt="BioSynMat logo"
                width={64}
                height={64}
                className="h-14 w-14 rounded-md object-contain sm:h-16 sm:w-16"
              />
              <span className="text-xl font-semibold tracking-[0.14em] text-slate-900">
                BIOSYNMAT
              </span>
            </Link>
            <p className="max-w-xs text-sm leading-relaxed text-slate-600">
              BioSynMat Lab develops bioinspired synthetic materials and
              protocell systems to study communication, organization, and
              emergent behavior.
            </p>
          </section>

          <section>
            <h2 className="text-sm font-semibold uppercase tracking-[0.12em] text-slate-900">
              Navigation
            </h2>
            <ul className="mt-4 space-y-2">
              {navLinks.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-slate-600 transition hover:text-slate-900"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-sm font-semibold uppercase tracking-[0.12em] text-slate-900">
              Contact
            </h2>
            <div className="mt-4 space-y-3">
              <a
                href={`mailto:${contact.email}`}
                className="inline-flex items-center gap-2 text-sm text-slate-700 transition hover:text-slate-900"
              >
                <Mail className="h-4 w-4" />
                {contact.email}
              </a>
              <p className="text-sm leading-relaxed text-slate-600">
                {contact.address}
              </p>
              <a
                href={contact.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-medium text-teal-800 transition hover:text-teal-900"
              >
                <MapPin className="h-4 w-4" />
                View on Google Maps
              </a>
            </div>
          </section>

          <section>
            <div className="flex flex-col">
              <h2 className="inline-flex items-center gap-1.5 text-sm font-semibold uppercase tracking-[0.12em] text-slate-900">
                <Building2 className="h-4 w-4" />
                Affiliation
              </h2>
              <a
                href={contact.institutionUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit SRM Institute of Science and Technology website"
                className="mt-4 inline-flex"
              >
                <Image
                  src="/srm.png"
                  alt="SRM Institute logo"
                  width={180}
                  height={64}
                  className="h-14 w-auto object-contain"
                />
              </a>
            </div>
            <div className="mt-5 flex flex-wrap gap-2">
              <a
                href="https://www.linkedin.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full border border-slate-300 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 transition hover:bg-slate-100"
              >
                <Linkedin className="h-3.5 w-3.5" />
                LinkedIn
              </a>
              <a
                href={`mailto:${contact.email}`}
                className="inline-flex items-center gap-1.5 rounded-full border border-slate-300 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 transition hover:bg-slate-100"
              >
                <Mail className="h-3.5 w-3.5" />
                Mail
              </a>
            </div>
          </section>
        </div>

        <div className="mt-8 flex flex-col gap-2 border-t border-slate-200 pt-5 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>Copyright © {year} BioSynMat Lab. All rights reserved.</p>
          <a
            href={contact.institutionUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-slate-500 transition hover:text-slate-700"
          >
            SRM Institute of Science and Technology
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>
    </footer>
  );
}

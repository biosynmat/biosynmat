import Image from "next/image";
import Link from "next/link";
import { Building2, Linkedin, Mail } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="border-t border-slate-200 bg-slate-50/80">
      <div className="mx-auto grid w-full max-w-7xl gap-8 px-4 py-8 text-sm text-slate-600 sm:px-6 lg:grid-cols-[1.2fr_0.8fr] lg:px-8">
        <div>
          <Link href="/" className="inline-flex items-center gap-3">
            <Image
              src="/logo.png"
              alt="BioSynMat logo"
              width={160}
              height={160}
              className="h-40 w-40 rounded-md object-contain"
            />
            <div>
              <p className="text-4xl font-semibold text-slate-900">BioSynMat</p>
            </div>
          </Link>
          {/* <p className="mt-2 max-w-md leading-relaxed">
            Protocell-inspired synthetic systems for biomimetic behavior and
            artificial cellular communication.
          </p> */}
        </div>

        <div className="flex flex-col items-end">
          <div className="mb-4 flex flex-col">
            <p className="mb-2 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.1em] text-slate-500">
              <Building2 className="h-3.5 w-3.5" />
              Institution
            </p>
            <a
              href="https://www.srmist.edu.in/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit SRM Institute of Science and Technology website"
              className="inline-flex"
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

          <div className="mt-3 flex flex-col gap-2">
            <p className="text-sm font-semibold uppercase tracking-[0.12em] text-slate-900">
              Connect
            </p>
            <div className="flex flex-row">
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
                href="mailto:ananyam@srmist.edu.in"
                className="inline-flex items-center gap-1.5 rounded-full border border-slate-300 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 transition hover:bg-slate-100"
              >
                <Mail className="h-3.5 w-3.5" />
                Mail
              </a>
            </div>
          </div>
          <p className="mt-4 text-xs text-slate-500">
            Email: ananyam@srmist.edu.in
          </p>
        </div>
      </div>
    </footer>
  );
}

import type { Metadata } from "next";
import {
  AlertTriangle,
  ExternalLink,
  GraduationCap,
  Mail,
  MapPin,
  Users,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Opportunities",
};

export default function OpportunitiesPage() {
  return (
    <div className="section-shell py-8 sm:py-12 lg:py-14">
      <div className="mb-6 sm:mb-8">
        <h1 className="text-4xl font-semibold text-slate-900">Opportunities</h1>
      </div>

      <div className="grid gap-6 lg:gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-8">
          <h2 className="inline-flex items-center gap-2 text-2xl font-semibold text-slate-900">
            <Users className="h-6 w-6 text-teal-700" />
            Join Our Team
          </h2>

          <div className="mt-4 space-y-4 text-sm leading-relaxed text-slate-700">
            <p>
              Are you interested in our research group? Do supramolecular
              chemistry and biological systems interest you? Then come join our
              team. To know about Ph.D. and postdoctoral positions stay updated
              with our opportunities page. We regularly update our page, so all
              open positions are advertised here.
            </p>
            <p className="rounded-xl border border-amber-200 bg-amber-50 p-3 text-amber-900">
              <span className="mb-1 inline-flex items-center gap-1.5 font-semibold">
                <AlertTriangle className="h-4 w-4" />
                Important
              </span>
              <br />
              *Please note emails without the mentioned subject line (see below)
              may get filtered and you might not receive a reply.
            </p>
          </div>

          <div className="mt-8 space-y-6">
            <div>
              <h3 className="inline-flex items-center gap-1.5 text-lg font-semibold text-slate-900">
                <GraduationCap className="h-5 w-5 text-teal-700" />
                PhD positions
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-700">
                We currently have no open PhD positions.
              </p>
              <p className="mt-2 text-sm text-slate-800">
                For any information, please send email with the subject line:
                <span className="font-semibold">
                  {" "}
                  &quot;PhD BioSynMat Lab.&quot;
                </span>
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-slate-900">
                Internship
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-700">
                If you are interested in pursuing your bachelors or masters
                internship/thesis in BioSynMat Lab, then we encourage you to
                submit a 1-paragraph summary of your research interest along
                with your CV. Please send it via email with the appropriate
                subject line.
              </p>
            </div>
          </div>
        </section>

        <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-8">
          <h2 className="inline-flex items-center gap-2 text-2xl font-semibold text-slate-900">
            <MapPin className="h-6 w-6 text-teal-700" />
            Contact and Location
          </h2>

          <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-4 sm:mt-5 sm:p-5">
            <div className="flex flex-col">
              <p className="inline-flex items-center gap-1.5 text-sm font-semibold uppercase  text-slate-500">
                <Mail className="h-3.5 w-3.5" />
                Email
              </p>
              <a
                href="mailto:ananyam@srmist.edu.in"
                className="text-sm text-slate-800 underline decoration-slate-300 underline-offset-4"
              >
                ananyam@srmist.edu.in
              </a>
            </div>
            <p className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.1em] text-slate-500">
              <MapPin className="h-3.5 w-3.5" />
              Address
            </p>
            <p className="mt-1 text-sm text-slate-700">
              Department of Chemistry, SRM Institute of Science and Technology,
              SRM Nagar, Kattankulathur, Tamil Nadu 603203
            </p>

            <a
              href="https://maps.app.goo.gl/W1w41B2wLas4V69D7"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-teal-800 underline decoration-teal-300 underline-offset-4"
            >
              <ExternalLink className="h-4 w-4" />
              Open in Google Maps
            </a>
          </div>

          <div className="mt-4 overflow-hidden rounded-2xl border border-slate-200 sm:mt-5">
            <iframe
              title="Department of Chemistry, SRMIST map"
              src="https://www.google.com/maps?q=Department%20of%20Chemistry%2C%20SRM%20Institute%20of%20Science%20and%20Technology%2C%20SRM%20Nagar%2C%20Kattankulathur%2C%20Tamil%20Nadu%20603203&output=embed"
              width="100%"
              height="320"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </section>
      </div>
    </div>
  );
}

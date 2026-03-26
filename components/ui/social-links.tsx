import { Linkedin } from "lucide-react";
import { normalizeExternalUrl } from "@/lib/utils";
import { cn } from "@/lib/utils";

type SocialLinksProps = {
  name: string;
  linkedin?: string;
  researchgate?: string;
  orcid?: string;
  webofscience?: string;
  scopus?: string;
  /** "light" renders white-on-dark style (for overlays), "default" renders slate borders */
  variant?: "default" | "light";
  className?: string;
};

const baseDefault =
  "inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-300 bg-white text-slate-700 transition hover:bg-slate-100";
const baseLight =
  "inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/40 text-white transition hover:bg-white/15";

export function SocialLinks({
  name,
  linkedin,
  researchgate,
  orcid,
  webofscience,
  scopus,
  variant = "default",
  className,
}: SocialLinksProps) {
  const linkedinUrl = normalizeExternalUrl(linkedin);
  const researchgateUrl = normalizeExternalUrl(researchgate);
  const orcidUrl = normalizeExternalUrl(orcid);
  const webOfScienceUrl = normalizeExternalUrl(webofscience);
  const scopusUrl = normalizeExternalUrl(scopus);

  const hasAny =
    linkedinUrl ||
    researchgateUrl ||
    orcidUrl ||
    webOfScienceUrl ||
    scopusUrl;
  if (!hasAny) return null;

  const base = variant === "light" ? baseLight : baseDefault;

  return (
    <div className={cn("flex items-center gap-1.5", className)}>
      {linkedinUrl ? (
        <a
          href={linkedinUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${name} LinkedIn`}
          className={base}
        >
          <Linkedin className="h-4 w-4" />
          <span className="sr-only">LinkedIn</span>
        </a>
      ) : null}
      {researchgateUrl ? (
        <a
          href={researchgateUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${name} ResearchGate`}
          className={cn(
            base,
            variant === "light" ? "text-[10px] font-semibold" : "text-[11px] font-semibold",
          )}
        >
          RG
          <span className="sr-only">ResearchGate</span>
        </a>
      ) : null}
      {orcidUrl ? (
        <a
          href={orcidUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${name} ORCID`}
          className={cn(
            base,
            variant === "light" ? "text-[10px] font-semibold" : "text-[11px] font-semibold",
          )}
        >
          iD
          <span className="sr-only">ORCID</span>
        </a>
      ) : null}
      {webOfScienceUrl ? (
        <a
          href={webOfScienceUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${name} Web of Science`}
          className={cn(
            base,
            variant === "light" ? "px-2 text-[10px] font-semibold" : "px-2 text-[11px] font-semibold",
          )}
        >
          WoS
          <span className="sr-only">Web of Science</span>
        </a>
      ) : null}
      {scopusUrl ? (
        <a
          href={scopusUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${name} Scopus`}
          className={cn(
            base,
            variant === "light" ? "px-2 text-[10px] font-semibold" : "px-2 text-[11px] font-semibold",
          )}
        >
          SC
          <span className="sr-only">Scopus</span>
        </a>
      ) : null}
    </div>
  );
}

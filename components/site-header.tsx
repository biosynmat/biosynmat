"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "motion/react";
import type { LucideIcon } from "lucide-react";
import {
  BriefcaseBusiness,
  FlaskConical,
  Home,
  ImageIcon,
  Newspaper,
  BookOpen,
  UserRound,
  Users,
  Menu,
} from "lucide-react";
import { navLinks } from "@/lib/site-data";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from "@/components/ui/sheet";

export function SiteHeader() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [pendingHref, setPendingHref] = useState<string | null>(null);
  const [prevPathname, setPrevPathname] = useState(pathname);

  // Reset pending state once the route has actually changed
  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    setPendingHref(null);
  }

  const navIcons: Record<string, LucideIcon> = {
    "/": Home,
    "/meet-ananya-mishra": UserRound,
    "/team": Users,
    "/research": FlaskConical,
    "/publications": BookOpen,
    "/news": Newspaper,
    "/gallery": ImageIcon,
    "/opportunities": BriefcaseBusiness,
  };
  const headerNavLinks = navLinks.filter((item) => item.href !== "/news");
  const primaryNavLinks = headerNavLinks;

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    if (href === "/meet-ananya-mishra")
      return pathname === "/meet-ananya-mishra" || pathname === "/meet-pi";
    if (href === "/opportunities")
      return pathname === "/opportunities" || pathname === "/oppturnities";
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  // Use pending click target if available, otherwise fall back to pathname
  const isHighlighted = (href: string) => {
    if (pendingHref !== null) return href === pendingHref;
    return isActive(href);
  };

  useEffect(() => {
    const onEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMobileMenuOpen(false);
      }
    };

    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", onEscape);
    }

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onEscape);
    };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <>
      <header className="sticky top-0 z-30 border-b border-slate-200/60 bg-white/60 backdrop-blur-md!">
        <div className="mx-auto flex w-full max-w-7xl items-center gap-4 px-4 py-5 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="inline-flex shrink-0 items-center gap-3 text-lg font-semibold tracking-[0.18em] text-slate-900"
          >
            <Image
              src="/logo.svg"
              alt="BioSynMat logo"
              width={54}
              height={54}
              className="h-12 w-12 rounded-md object-cover"
            />
            <span>BIOSYNMAT</span>
          </Link>

          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(true)}
            aria-label="Open navigation menu"
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu-sheet"
            className="ml-auto inline-flex items-center justify-center rounded-full border border-slate-200 bg-white p-3 text-slate-700 transition hover:bg-slate-100 md:hidden"
          >
            <Menu className="h-5 w-5 fill-none" />
          </button>

          <nav
            aria-label="Primary"
            className=" justify-end hidden md:flex! md:gap-1"
          >
            <ul className="flex flex-wrap items-center justify-end gap-1">
              {primaryNavLinks.map((item) => {
                const Icon = navIcons[item.href] ?? Home;
                const active = isHighlighted(item.href);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={() => setPendingHref(item.href)}
                      className={`relative inline-flex rounded-full items-center justify-center px-4 py-2.5 text-base font-medium transition-colors ${
                        active
                          ? "teal-link"
                          : "text-slate-700 hover:bg-slate-100 hover:text-slate-900"
                      }`}
                    >
                      {active ? (
                        <motion.span
                          layoutId="nav-active-pill"
                          className="absolute inset-0 rounded-full bg-teal-700 shadow-sm"
                          transition={{
                            type: "spring",
                            stiffness: 380,
                            damping: 30,
                          }}
                        />
                      ) : null}
                      <span className="relative z-10 inline-flex items-center justify-center gap-1.5 text-inherit">
                        <Icon className="h-4 w-4 fill-none" />
                        {item.label}
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      </header>

      {isMobileMenuOpen ? (
        <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
          <SheetContent side="right" showCloseButton>
            <SheetHeader>
              <SheetTitle>MENU</SheetTitle>
            </SheetHeader>
            <nav aria-label="Mobile Primary" className="flex-1 px-5">
              <ul className="space-y-2">
                {primaryNavLinks.map((item) => {
                  const Icon = navIcons[item.href] ?? Home;
                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={`inline-flex w-full items-center gap-2 rounded-xl px-3.5 py-3 text-base font-medium transition ${
                          isActive(item.href)
                            ? "teal-link bg-teal-700"
                            : "text-slate-700 hover:bg-slate-100 hover:text-slate-900"
                        }`}
                      >
                        <Icon className="h-4 w-4 fill-none" />
                        {item.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>
            <SheetFooter>
              {/* Add any footer actions here if needed */}
            </SheetFooter>
          </SheetContent>
        </Sheet>
      ) : null}
    </>
  );
}

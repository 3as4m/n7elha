import { Link } from "react-router-dom";
import { useAuth } from "@/lib/auth";
import { useTranslation } from "react-i18next";
import { ArrowUpRight, Mail, Github, Twitter, Instagram } from "lucide-react";
import logoMark from "@/assets/logo-mark.png";
import logoMask from "@/assets/logo-mark-mask.webp";
import { LIME } from "@/components/teacher/DashboardAccents";

export const SiteFooter = () => {
  const { user } = useAuth();
  const { i18n } = useTranslation();
  const isAr = i18n.language === "ar";

  const t = isAr
    ? {
        talk: "تواصل معنا",
        bigA: "خلّ حصتك الجاية",
        bigB: "يستنونها.",
        ctaBtn: "ابدأ معنا",
        footerFeatures: "المميزات",
        footerHow: "كيف يعمل",
        footerAbout: "من نحن",
        footerContact: "تواصل",
        footerPrivacy: "الخصوصية",
        footerTerms: "الشروط",
        footerRights: "© 2026 نفلها. جميع الحقوق محفوظة.",
      }
    : {
        talk: "Let's talk",
        bigA: "Make your next class",
        bigB: "the one they wait for.",
        ctaBtn: "Get started",
        footerFeatures: "Features",
        footerHow: "How it works",
        footerAbout: "About",
        footerContact: "Contact",
        footerPrivacy: "Privacy",
        footerTerms: "Terms",
        footerRights: "© 2026 nefelha. All rights reserved.",
      };

  const links = [
    { label: t.footerFeatures, to: "/services" },
    { label: t.footerHow, to: "/services#how" },
    { label: t.footerAbout, to: "/about" },
    { label: t.footerContact, to: "/contact" },
    { label: t.footerPrivacy, to: "#" },
    { label: t.footerTerms, to: "#" },
  ];
  const social = [
    { icon: Twitter, href: "#" },
    { icon: Instagram, href: "#" },
    { icon: Github, href: "#" },
    { icon: Mail, href: "mailto:hello@nefelha.com" },
  ];

  /* One big statement and the button, then a quiet row of links, with the
     logo large in the bottom corner. */
  return (
    <footer data-skew className="relative isolate text-white">
      <svg aria-hidden viewBox="0 0 1440 72" preserveAspectRatio="none" className="relative block w-full h-[72px] -mb-px">
        <path fill="#2B3F45" d="M0 30C240 66 500 8 780 36C1040 62 1250 12 1440 34V72H0Z" />
      </svg>

      <div className="relative overflow-hidden bg-[#2B3F45] px-5 sm:px-8 md:px-14 pt-10 sm:pt-14 pb-10">
        {/* the logo exactly as drawn, dot and all (never mirrored, tilted or
            drawn on), only larger, in flat white, cropped by the bottom corner */}
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-[70px] end-5 w-[200px] sm:-bottom-[90px] sm:end-8 sm:w-[280px] lg:-bottom-[110px] lg:end-12 lg:w-[380px] aspect-[616/799]"
          style={{ background: "#FFFFFF", WebkitMaskImage: `url(${logoMask})`, maskImage: `url(${logoMask})`, WebkitMaskSize: "contain", maskSize: "contain", WebkitMaskRepeat: "no-repeat", maskRepeat: "no-repeat" }}
        />

        <div className="wrap relative">
          <div className="flex items-center gap-4">
            <span className="text-[13px] text-white/60 shrink-0">{t.talk}</span>
            <span className="h-px flex-1 bg-white/15" />
          </div>

          <h2
            className="mt-10 sm:mt-14 max-w-4xl text-[46px] sm:text-[72px] lg:text-[96px] leading-[1.05] tracking-tight"
            style={{ fontFamily: "'ArslanWessam', 'Almarai', sans-serif" }}
          >
            <span className="block">{t.bigA}</span>
            <span className="block italic" style={{ color: LIME }}>{t.bigB}</span>
          </h2>

          <Link
            to={user ? "/app" : "/auth?mode=signup"}
            className="mt-10 group inline-flex items-center gap-3 rounded-full border-2 border-[hsl(var(--nb-border))] bg-[#A9CB1E] text-[#12262B] pl-6 pr-2 py-2 text-[15px] font-semibold shadow-[4px_4px_0_0_#12262B] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0_0_#12262B] transition-all"
          >
            {t.ctaBtn}
            <span className="h-9 w-9 rounded-full bg-white text-[#12262B] flex items-center justify-center transition group-hover:rotate-12">
              <ArrowUpRight className="h-4 w-4" strokeWidth={2.25} />
            </span>
          </Link>

          <div className="mt-20 sm:mt-28 flex flex-wrap items-center justify-between gap-x-8 gap-y-5 max-w-full lg:max-w-[calc(100%-26rem)]">
            <nav className="flex flex-wrap gap-x-6 gap-y-2">
              {links.map(l => (
                <Link key={l.label} to={l.to} className="text-[14px] text-white/70 hover:text-white transition">{l.label}</Link>
              ))}
            </nav>
            <div className="flex gap-2.5">
              {social.map(({ icon: Icon, href }, i) => (
                <a key={i} href={href} className="h-9 w-9 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:bg-white hover:text-[#2B3F45] transition">
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-[12px] text-white/40 lg:max-w-[calc(100%-26rem)]">
            <Link to="/" className="flex items-center gap-2">
              <img src={logoMark} alt="nefelha" className="h-5 w-5 object-contain brightness-0 invert opacity-70" />
              <span>{t.footerRights}</span>
            </Link>
            <span className="tracking-wider">
              Built for teachers.{" "}
              <a href="https://3asem.com" target="_blank" rel="noopener" className="text-white/25 hover:text-white/60 transition-colors">3asem.com</a>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

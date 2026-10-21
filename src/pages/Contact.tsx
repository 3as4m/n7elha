// ── Contact us ──────────────────────────────────────────────────────────────
// Direct contact info only, no card chrome — a teacher with a question wants
// the fastest way to reach a human, not a form or a grid of boxes to read
// through first.

import { useTranslation } from "react-i18next";
import { Mail, Phone, School, UserRound, GraduationCap } from "lucide-react";
import { SiteNav } from "@/components/site/SiteNav";
import { PageShapes } from "@/components/site/PageShapes";
import { SiteFooter } from "@/components/site/SiteFooter";
import { Seo } from "@/components/Seo";
import logoMark from "@/assets/logo-mark.png";

const SUPPORT_EMAIL = "hello@nefelha.com";
// TODO: placeholder — swap for the real support line once one exists.
const SUPPORT_PHONE = "+966 53 923 3095";

const Contact = () => {
  const { i18n } = useTranslation();
  const isAr = i18n.language === "ar";

  const t = isAr
    ? {
        kicker: "تواصل معنا",
        title: "عندك سؤال؟ إحنا نسمعك",
        emailLabel: "البريد الإلكتروني",
        phoneLabel: "الهاتف",
        replyTime: "الرد خلال يوم عمل",
        clientsTitle: "نشتغل مع",
        schools: "المدارس",
        academies: "الأكاديميات",
        teachers: "المعلمين المستقلين",
      }
    : {
        kicker: "CONTACT",
        title: "Have a question? We're listening",
        emailLabel: "Email",
        phoneLabel: "Phone",
        replyTime: "Reply within a working day",
        clientsTitle: "Who we work with",
        schools: "Schools",
        academies: "Academies",
        teachers: "Independent teachers",
      };

  return (
    <div
      className="relative isolate overflow-x-clip min-h-screen w-full"
      style={{ background: "hsl(var(--cream-panel))", fontFamily: "'Outfit', 'Almarai', system-ui, sans-serif" }}
    >
      <Seo
        path="/contact"
        titleAr="تواصل معنا — نفلها"
        titleEn="Contact Us — nefelha"
        descriptionAr="راسل فريق نفلها. أسئلة المعلمين، شراكات المدارس، والدعم الفني — نقرأ كل رسالة ونرد خلال يوم عمل."
        descriptionEn="Get in touch with the nefelha team. Teacher questions, school partnerships, and technical support — we read every message and reply within a working day."
      />
      <PageShapes />
      <SiteNav />

      <div className="relative">
      {/* the empty side next to the contact details: the logo, white on a
          teal drop, with a lime drop and the thin oval from the home page */}
      <div aria-hidden className="pointer-events-none absolute inset-y-0 end-[4%] hidden lg:flex w-[40%] items-center justify-center">
        <div className="relative w-[340px] xl:w-[380px] aspect-square">
          <svg viewBox="0 0 120 120" className="absolute inset-0 w-full h-full">
            <path fill="#0E7C7B" d="M64 6C94 8 116 34 112 66C108 98 82 116 52 112C22 108 4 84 8 56C12 26 34 4 64 6Z" />
          </svg>
          <svg viewBox="0 0 240 140" className="absolute -inset-x-[14%] top-[18%] w-[128%]">
            <ellipse cx="120" cy="70" rx="112" ry="52" transform="rotate(-18 120 70)" fill="none" stroke="#12262B" strokeWidth="1.2" opacity="0.4" />
          </svg>
          <svg viewBox="0 0 120 120" className="absolute w-[22%] -top-[2%] end-[2%]">
            <path fill="#A9CB1E" d="M64 6C94 8 116 34 112 66C108 98 82 116 52 112C22 108 4 84 8 56C12 26 34 4 64 6Z" />
          </svg>
          <svg viewBox="0 0 120 120" className="absolute w-[11%] bottom-[6%] start-[4%]">
            <path fill="#EAD7B0" d="M64 6C94 8 116 34 112 66C108 98 82 116 52 112C22 108 4 84 8 56C12 26 34 4 64 6Z" />
          </svg>
          <img src={logoMark} alt="" className="absolute inset-[27%] w-[46%] h-[46%] object-contain brightness-0 invert" />
        </div>
      </div>

      {/* ---------------- HERO ---------------- */}
      <section className="wrap px-5 sm:px-8 md:px-14 pt-10 sm:pt-16 pb-14">
        <span className={`text-[12px] font-semibold text-[#2B3F45] ${isAr ? "tracking-normal" : "tracking-[0.25em]"}`}>
          {t.kicker}
        </span>
        <h1
          className="mt-3 max-w-2xl leading-[1.1] tracking-tight text-[32px] sm:text-[46px]"
          style={{ fontFamily: "'ArslanWessam', 'Almarai', sans-serif", color: "#2B3F45" }}
        >
          {t.title}
        </h1>
      </section>

      {/* ---------------- CONTACT INFO — plain, no cards ---------------- */}
      <section className="wrap px-5 sm:px-8 md:px-14 pb-20 sm:pb-28">
        <div className="max-w-xl divide-y divide-black/10 border-t border-b border-black/10">
          <a href={`mailto:${SUPPORT_EMAIL}`} className="group flex items-center gap-4 py-6">
            <Mail className="h-5 w-5 shrink-0" style={{ color: "#8FC44A" }} />
            <div className="min-w-0">
              <div className="text-[11px] font-semibold tracking-widest uppercase text-black/40">{t.emailLabel}</div>
              <div className="text-[19px] font-semibold group-hover:underline underline-offset-4" style={{ color: "#2B3F45" }} dir="ltr">
                {SUPPORT_EMAIL}
              </div>
            </div>
            <span className="ms-auto text-[12px] text-black/35 shrink-0">{t.replyTime}</span>
          </a>

          <a href={`tel:${SUPPORT_PHONE.replace(/\s+/g, "")}`} className="group flex items-center gap-4 py-6">
            <Phone className="h-5 w-5 shrink-0" style={{ color: "#8FC44A" }} />
            <div className="min-w-0">
              <div className="text-[11px] font-semibold tracking-widest uppercase text-black/40">{t.phoneLabel}</div>
              <div className="text-[19px] font-semibold group-hover:underline underline-offset-4" style={{ color: "#2B3F45" }} dir="ltr">
                {SUPPORT_PHONE}
              </div>
            </div>
          </a>
        </div>

        <div className="mt-10 max-w-xl">
          <div className="text-[11px] font-semibold tracking-widest uppercase text-black/40">{t.clientsTitle}</div>
          <div className="mt-3 flex flex-wrap gap-x-8 gap-y-2">
            <span className="flex items-center gap-2 text-[15px] font-medium" style={{ color: "#2B3F45" }}>
              <School className="h-4 w-4 opacity-60" />{t.schools}
            </span>
            <span className="flex items-center gap-2 text-[15px] font-medium" style={{ color: "#2B3F45" }}>
              <GraduationCap className="h-4 w-4 opacity-60" />{t.academies}
            </span>
            <span className="flex items-center gap-2 text-[15px] font-medium" style={{ color: "#2B3F45" }}>
              <UserRound className="h-4 w-4 opacity-60" />{t.teachers}
            </span>
          </div>
        </div>
      </section>
      </div>

      <SiteFooter />
    </div>
  );
};

export default Contact;

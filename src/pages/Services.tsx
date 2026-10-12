import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ArrowUpRight, FileText, Check } from "lucide-react";
import { LIME, SAND, TEAL } from "@/components/teacher/DashboardAccents";
import { SQUARE_TYPES } from "@/lib/physicalGames";
import { SiteNav } from "@/components/site/SiteNav";
import { PageShapes } from "@/components/site/PageShapes";
import { SiteFooter } from "@/components/site/SiteFooter";
import { Seo } from "@/components/Seo";
import phoneClassic from "@/assets/phone-classic.png";
import phoneCrypto from "@/assets/phone-crypto.png";

const INK = "#14282D";
const SLATE = "#3F5A63";
const DISPLAY = "'ArslanWessam', 'Almarai', sans-serif";

type Service = { name: string; pitch: string; gets: string[]; forWho: string };

/* What a school or teacher can actually order from nefelha. Each service is
   its own band with a picture of what it looks like, alternating sides and
   colors so the page reads as a menu of offerings, not a feature list. */
const Services = () => {
  const { i18n } = useTranslation();
  const isAr = i18n.language === "ar";

  const t = isAr
    ? {
        kicker: "خدماتنا",
        title: "كل اللي نقدّمه، من معلم واحد لمدرسة كاملة",
        sub: "تبي حساب لك وبس، أو تبي نفلها في مدرستك كلها، أو بطولة بين الفصول قدام الكل؟ اختر اللي يناسبك، والباقي علينا.",
        serviceLabel: "خدمة",
        getsLabel: "وش تحصل",
        forLabel: "لمن",
        request: "اطلب الخدمة",
        services: [
          {
            name: "منصة نفلها للمعلم",
            pitch: "حساب واحد وكل الألعاب. تجهّز أسئلتك، تشغّل اللعبة على شاشة الفصل، والطلاب يدخلون من جوالاتهم برمز قصير.",
            gets: ["ثمانية أنماط لعب على نفس الأسئلة", "بدون تطبيق وبدون تسجيل للطلاب", "تقرير بعد كل لعبة لكل طالب وكل سؤال"],
            forWho: "المعلم والمدرّس الخصوصي",
          },
          {
            name: "أسئلة بالذكاء الاصطناعي",
            pitch: "ارفع ملف الدرس، والذكاء الاصطناعي يطلّع لك أسئلة جاهزة للعب خلال دقايق. تراجعها وتعدّل عليها قبل ما تبدأ.",
            gets: ["يقرأ ملفات PDF وWord وPowerPoint", "أسئلة بمستويات صعوبة مختلفة", "صور توضيحية للأسئلة تنرسم لك"],
            forWho: "كل معلم يبي يختصر وقت التحضير",
          },
          {
            name: "نفلها لمدرستك كاملة",
            pitch: "نجهّز نفلها لكل معلمين المدرسة، نسوي لهم ورشة تدريب، ونتابع معكم أول الأسابيع لين تصير اللعبة جزء من الحصة.",
            gets: ["حسابات لكل معلمين المدرسة", "ورشة تدريب داخل المدرسة", "متابعة ودعم بالعربي"],
            forWho: "المدارس الخاصة والحكومية",
          },
          {
            name: "ألواح اللعب المطبوعة",
            pitch: "لوح لعب مطبوع نوصله لمدرستك، والفصل كله يلعب عليه بجوال واحد يمسح الرموز. حل للفصول اللي ما فيها جهاز لكل طالب.",
            gets: ["لوح ورموز QR جاهزة للعب", "جوال واحد يكفي الفصل كله", "يشتغل على أسئلة المعلم نفسه"],
            forWho: "الفصول بدون أجهزة والصفوف الأولية",
          },
          {
            name: "فعاليات ومسابقات المدرسة",
            pitch: "بطولة بين الفصول، يوم مفتوح، اليوم الوطني أو أسبوع المراجعة. نجهّز الفعالية وأسئلتها، ونشغّل اللعبة على الشاشة الكبيرة قدام الكل.",
            gets: ["تجهيز الفعالية والأسئلة كاملة", "تشغيل مباشر على شاشة المسرح أو الساحة", "ترتيب ونتائج لحظية للفصول"],
            forWho: "المدارس وإدارات التعليم",
          },
        ] as Service[],
        ctaTitle: "مو متأكد وش يناسبك؟",
        ctaSub: "قل لنا عن فصلك أو مدرستك، ونقترح عليك البداية الصح.",
        ctaLink: "كلّمنا",
      }
    : {
        kicker: "SERVICES",
        title: "Everything we offer, from one teacher to a whole school",
        sub: "Just an account for yourself, nefelha across your whole school, or a class-vs-class tournament in front of everyone? Pick what fits, and we handle the rest.",
        serviceLabel: "SERVICE",
        getsLabel: "What you get",
        forLabel: "For",
        request: "Request this",
        services: [
          {
            name: "nefelha for teachers",
            pitch: "One account, every game. Prepare your questions, run the game on the classroom screen, and students join from their phones with a short code.",
            gets: ["Eight game modes on the same questions", "No app and no sign-up for students", "A report after every game, per student and per question"],
            forWho: "Teachers and private tutors",
          },
          {
            name: "AI-made quizzes",
            pitch: "Upload your lesson file and the AI turns it into questions ready to play in minutes. You review and edit them before you start.",
            gets: ["Reads PDF, Word and PowerPoint files", "Questions at different difficulty levels", "Illustrations drawn for your questions"],
            forWho: "Every teacher who wants prep time back",
          },
          {
            name: "nefelha for your whole school",
            pitch: "We set nefelha up for every teacher in the school, run a training workshop, and stay with you for the first weeks until the game is part of the lesson.",
            gets: ["Accounts for every teacher", "A training workshop at your school", "Follow-up and support in Arabic"],
            forWho: "Private and public schools",
          },
          {
            name: "Printed game boards",
            pitch: "A printed game board delivered to your school. The whole class plays on it with one phone scanning the codes, built for classrooms without a device per student.",
            gets: ["A board and QR codes ready to play", "One phone is enough for the whole class", "Runs on the teacher's own questions"],
            forWho: "Classrooms without devices and early grades",
          },
          {
            name: "School events and competitions",
            pitch: "A tournament between classes, an open day, National Day or review week. We prepare the event and its questions, and run the game on the big screen in front of everyone.",
            gets: ["The event and its questions, fully prepared", "Run live on the stage or courtyard screen", "Live rankings and results for every class"],
            forWho: "Schools and education offices",
          },
        ] as Service[],
        ctaTitle: "Not sure what fits?",
        ctaSub: "Tell us about your class or school, and we'll suggest the right place to start.",
        ctaLink: "Talk to us",
      };

  const visuals = [
    <PhonesVisual key="phones" />,
    <AiVisual key="ai" isAr={isAr} />,
    <TeachersVisual key="teachers" isAr={isAr} />,
    <BoardVisual key="board" />,
    <EventVisual key="event" isAr={isAr} />,
  ];
  // band color per service: cream, teal, cream, ink, cream
  const tones: Tone[] = ["cream", "teal", "cream", "ink", "cream"];

  return (
    <div
      className="relative isolate overflow-x-clip min-h-screen w-full"
      style={{ background: "#F3E7C9", fontFamily: "'Outfit', 'Almarai', system-ui, sans-serif" }}
    >
      <Seo
        path="/services"
        titleAr="خدمات نفلها — منصة للمعلم، أسئلة بالذكاء الاصطناعي، تفعيل المدارس، ألواح مطبوعة وفعاليات"
        titleEn="nefelha Services — Teacher Platform, AI-Made Quizzes, School Rollout, Printed Boards and Events"
        descriptionAr="كل اللي تقدّمه نفلها: منصة ألعاب تعليمية للمعلم، أسئلة جاهزة بالذكاء الاصطناعي من ملف الدرس، تفعيل وتدريب لمدرسة كاملة، ألواح لعب مطبوعة بجوال واحد، وفعاليات ومسابقات مدرسية على الشاشة الكبيرة."
        descriptionEn="Everything nefelha offers: a classroom game platform for teachers, AI-made quizzes from your lesson file, rollout and training for a whole school, printed game boards played with one phone, and school events on the big screen."
      />
      <PageShapes />
      <SiteNav />

      {/* ---------------- HERO ---------------- */}
      <section className="wrap relative px-5 sm:px-8 md:px-14 pt-10 sm:pt-16 pb-10 sm:pb-14">
        <span className={`text-[12px] font-semibold ${isAr ? "tracking-normal" : "tracking-[0.25em]"}`} style={{ color: SLATE }}>{t.kicker}</span>
        <h1 className="mt-3 max-w-3xl leading-[1.1] tracking-tight text-[32px] sm:text-[48px]" style={{ fontFamily: DISPLAY, color: SLATE }}>
          {t.title}
        </h1>
        <p className="mt-5 max-w-xl text-[15px] sm:text-[16px] leading-relaxed text-black/65">{t.sub}</p>

        {/* the five services as a quick index */}
        <ol className="mt-10 flex flex-wrap gap-x-6 gap-y-3">
          {t.services.map((s, i) => (
            <li key={s.name}>
              <a href={`#service-${i + 1}`} className="group inline-flex items-baseline gap-2 text-[14px] font-semibold" style={{ color: SLATE }}>
                <span className="text-[12px]" style={{ color: TEAL }}>{num(i, isAr)}</span>
                <span className="underline decoration-transparent group-hover:decoration-current underline-offset-4 transition-colors">{s.name}</span>
              </a>
            </li>
          ))}
        </ol>
      </section>

      {/* ---------------- SERVICES ---------------- */}
      {t.services.map((s, i) => (
        <ServiceBand
          key={s.name}
          id={`service-${i + 1}`}
          tone={tones[i]}
          flip={i % 2 === 1}
          n={num(i, isAr)}
          s={s}
          labels={{ service: t.serviceLabel, gets: t.getsLabel, forWho: t.forLabel, request: t.request }}
          isAr={isAr}
          visual={visuals[i]}
        />
      ))}

      {/* ---------------- CTA ---------------- */}
      <section className="wrap px-5 sm:px-8 md:px-14 pt-8 pb-20 sm:pb-28 text-center">
        <h2 className="text-[28px] sm:text-[40px] tracking-tight leading-[1.15]" style={{ fontFamily: DISPLAY, color: SLATE }}>{t.ctaTitle}</h2>
        <p className="mt-3 mx-auto max-w-md text-[15px] leading-relaxed text-black/65">{t.ctaSub}</p>
        <Link
          to="/contact"
          className="mt-7 inline-flex items-center gap-2 rounded-full px-6 py-3 text-[15px] font-semibold text-white transition-transform hover:-translate-y-0.5"
          style={{ background: INK }}
        >
          {t.ctaLink}
          <ArrowUpRight className="h-4 w-4" />
        </Link>
      </section>

      <SiteFooter />
    </div>
  );
};

/* ---------- helpers ---------- */

const num = (i: number, isAr: boolean) => (isAr ? ["١", "٢", "٣", "٤", "٥"][i] : `0${i + 1}`);

type Tone = "cream" | "teal" | "ink";

/* One service. Cream bands sit straight on the page; teal and ink bands get
   wavy top and bottom edges like the home page's story band. */
const ServiceBand = ({
  id, tone, flip, n, s, labels, isAr, visual,
}: {
  id: string; tone: Tone; flip: boolean; n: string; s: Service;
  labels: { service: string; gets: string; forWho: string; request: string };
  isAr: boolean; visual: React.ReactNode;
}) => {
  const dark = tone !== "cream";
  const bg = tone === "teal" ? TEAL : tone === "ink" ? INK : undefined;
  const accent = tone === "teal" ? SAND : tone === "ink" ? LIME : TEAL;

  const body = (
    <div className="wrap grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
      <div className={flip ? "lg:order-2" : ""}>
        <div className="flex items-baseline gap-3">
          <span className="text-[44px] sm:text-[56px] leading-none font-extrabold" style={{ color: accent, fontFamily: "'Outfit', 'Almarai', sans-serif" }}>{n}</span>
          <span className={`text-[12px] font-semibold ${dark ? "text-white/60" : "text-black/45"} ${isAr ? "" : "tracking-[0.25em]"}`}>{labels.service}</span>
        </div>
        <h2 className="mt-3 text-[30px] sm:text-[42px] tracking-tight leading-[1.1]" style={{ fontFamily: DISPLAY, color: dark ? "#FFFFFF" : SLATE }}>
          {s.name}
        </h2>
        <p className={`mt-4 max-w-lg text-[16px] sm:text-[17px] leading-relaxed ${dark ? "text-white/80" : "text-black/70"}`}>{s.pitch}</p>

        <p className={`mt-8 text-[12px] font-semibold ${isAr ? "" : "tracking-[0.2em] uppercase"}`} style={{ color: accent }}>{labels.gets}</p>
        <ul className="mt-3 space-y-2.5">
          {s.gets.map((g) => (
            <li key={g} className={`flex items-start gap-3 text-[15px] ${dark ? "text-white" : "text-black/80"}`}>
              <Check className="mt-0.5 h-4 w-4 shrink-0" style={{ color: tone === "cream" ? TEAL : LIME }} strokeWidth={3} />
              <span>{g}</span>
            </li>
          ))}
        </ul>

        <div className={`mt-8 pt-5 border-t flex flex-wrap items-center justify-between gap-4 ${dark ? "border-white/15" : "border-black/10"}`}>
          <p className={`text-[14px] ${dark ? "text-white/70" : "text-black/60"}`}>
            <span className="font-semibold" style={{ color: dark ? "#FFFFFF" : SLATE }}>{labels.forWho}: </span>{s.forWho}
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-1.5 text-[14px] font-semibold underline decoration-2 underline-offset-[6px] hover:decoration-transparent transition-colors"
            style={{ color: dark ? "#FFFFFF" : SLATE, textDecorationColor: tone === "cream" ? LIME : accent }}
          >
            {labels.request}
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
      <div className={flip ? "lg:order-1" : ""}>{visual}</div>
    </div>
  );

  if (!dark) {
    return (
      <section id={id} className="scroll-mt-24 px-5 sm:px-8 md:px-14 py-16 sm:py-24">
        {body}
      </section>
    );
  }
  return (
    <section id={id} className="scroll-mt-24 relative z-10 my-4">
      <svg aria-hidden viewBox="0 0 1440 72" preserveAspectRatio="none" className="relative block w-full h-[48px] sm:h-[64px] -mb-px">
        <path fill={bg} d="M0 44C220 6 470 64 760 30C1010 2 1240 8 1440 26V72H0Z" />
      </svg>
      <div className="px-5 sm:px-8 md:px-14 py-14 sm:py-20" style={{ background: bg }}>{body}</div>
      <svg aria-hidden viewBox="0 0 1440 72" preserveAspectRatio="none" className="relative block w-full h-[48px] sm:h-[64px] -mt-px">
        <path fill={bg} d="M0 0H1440V36C1200 70 960 14 690 46C430 74 200 64 0 30Z" />
      </svg>
    </section>
  );
};

/* ---------- pictures of each service ---------- */
/* Small drawings of the real thing (phones, the quiz builder, the printed
   board, a live ranking), flat colors on the band, no card boxes. */

const Blob = ({ color, className }: { color: string; className: string }) => (
  <svg aria-hidden viewBox="0 0 120 120" className={`absolute ${className}`}>
    <path fill={color} d="M64 6C94 8 116 34 112 66C108 98 82 116 52 112C22 108 4 84 8 56C12 26 34 4 64 6Z" />
  </svg>
);

const PhonesVisual = () => (
  <div dir="ltr" className="relative mx-auto max-w-md flex items-end justify-center py-4">
    <Blob color={SAND} className="w-[78%] left-[11%] top-[8%] -z-10" />
    <Blob color={LIME} className="w-[64px] right-[6%] top-[4%] -z-10" />
    <img src={phoneClassic} alt="" loading="lazy" className="relative z-10 w-[46%] max-w-[210px] h-auto -rotate-[6deg] translate-x-3 drop-shadow-[0_20px_30px_rgba(20,33,42,0.28)]" />
    <img src={phoneCrypto} alt="" loading="lazy" className="w-[42%] max-w-[190px] h-auto rotate-[7deg] -translate-x-3 translate-y-4 drop-shadow-[0_18px_28px_rgba(20,33,42,0.26)]" />
  </div>
);

const AiVisual = ({ isAr }: { isAr: boolean }) => {
  const file = isAr ? "درس_الخلية_النباتية.pdf" : "plant-cells-lesson.pdf";
  const qs = isAr
    ? [["ما وظيفة الجدار الخلوي؟", ["الدعم والحماية", "صنع الغذاء", "التنفس", "التكاثر"], 0], ["أين تتم عملية البناء الضوئي؟", ["النواة", "البلاستيدات الخضراء", "الفجوة", "الغشاء"], 1]]
    : [["What does the cell wall do?", ["Support and protection", "Makes food", "Respiration", "Reproduction"], 0], ["Where does photosynthesis happen?", ["Nucleus", "Chloroplasts", "Vacuole", "Membrane"], 1]];
  return (
    <div className="relative mx-auto max-w-md">
      <div className="inline-flex items-center gap-3 rounded-2xl px-4 py-3 text-white" style={{ background: "rgba(255,255,255,0.12)" }}>
        <FileText className="h-5 w-5" style={{ color: SAND }} />
        <span className="text-[14px] font-semibold" dir="ltr">{file}</span>
      </div>
      <div className="ms-8 h-8 w-px border-s-2 border-dashed border-white/40" />
      <div className="space-y-3">
        {qs.map(([q, opts, right], qi) => (
          <div key={qi} className="rounded-2xl p-4" style={{ background: "#FFFFFF" }}>
            <p className="text-[15px] font-semibold" style={{ color: SLATE }}>{q as string}</p>
            <div className="mt-3 grid grid-cols-2 gap-2">
              {(opts as string[]).map((o, oi) => (
                <span
                  key={o}
                  className="rounded-lg px-3 py-1.5 text-[12.5px] font-medium"
                  style={oi === right ? { background: LIME, color: INK } : { background: "#F1EEE6", color: "rgba(0,0,0,0.6)" }}
                >
                  {o}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const AV_COLORS = ["#2563eb", "#16a34a", "#b45309", "#dc2626", "#7c3aed", "#0891b2", "#c2410c", "#0f766e"];

const TeachersVisual = ({ isAr }: { isAr: boolean }) => {
  const letters = isAr
    ? ["م", "ن", "ع", "س", "ف", "ر", "ه", "ل", "خ", "ج", "ب", "ي", "د", "ش", "ك"]
    : ["M", "N", "A", "S", "F", "R", "H", "L", "K", "J", "B", "Y", "D", "O", "T"];
  return (
    <div className="relative mx-auto max-w-sm py-6">
      <Blob color={SAND} className="w-[90%] left-[5%] top-0 -z-10" />
      <div dir="ltr" className="grid grid-cols-5 gap-3 sm:gap-4 px-6 pt-10 pb-6">
        {letters.map((l, i) => (
          <span key={i} className="relative aspect-square rounded-full flex items-center justify-center text-white text-[18px] sm:text-[20px] font-bold" style={{ background: AV_COLORS[(i * 5) % AV_COLORS.length] }}>
            {l}
            <span className="absolute -bottom-0.5 -right-0.5 h-4 w-4 rounded-full flex items-center justify-center ring-2 ring-[#F3E7C9]" style={{ background: LIME }}>
              <Check className="h-2.5 w-2.5" style={{ color: INK }} strokeWidth={4} />
            </span>
          </span>
        ))}
      </div>
    </div>
  );
};

// a fixed path of squares, like a printed board laid out on the table
const BOARD = [1, 2, 4, 3, 1, 5, 2, 6, 1, 3, 4, 2, 5, 1, 6, 3, 2, 1, 4, 5, 3, 2, 6, 1];

const BoardVisual = () => (
  <div className="relative mx-auto max-w-md">
    <div dir="ltr" className="grid grid-cols-6 gap-2 sm:gap-2.5 rotate-[-4deg]">
      {BOARD.map((code, i) => {
        const sq = SQUARE_TYPES[code];
        const fill = code === 2 ? "#F4F1EA" : sq.color;
        return (
          <span key={i} className="aspect-square rounded-lg flex items-center justify-center text-[18px] font-extrabold" style={{ background: fill, color: code === 2 ? INK : "#FFFFFF" }}>
            {sq.kind === "wildcard" ? "?" : sq.kind === "double" ? "x2" : ""}
          </span>
        );
      })}
    </div>
  </div>
);

const EventVisual = ({ isAr }: { isAr: boolean }) => {
  const rows = isAr
    ? [["ثالث أ", 2480], ["ثالث ج", 2310], ["ثالث ب", 1975], ["ثالث د", 1640]]
    : [["3A", 2480], ["3C", 2310], ["3B", 1975], ["3D", 1640]];
  const max = 2480;
  return (
    <div className="relative mx-auto max-w-md rounded-3xl p-6 sm:p-8 text-white" style={{ background: INK }}>
      <Blob color={LIME} className="w-[44px] -top-4 -end-3" />
      <p className={`text-[11px] font-semibold text-white/50 ${isAr ? "" : "tracking-[0.25em]"}`}>{isAr ? "بطولة الفصول — مباشر" : "CLASS TOURNAMENT — LIVE"}</p>
      <div className="mt-5 space-y-4">
        {rows.map(([name, score], i) => (
          <div key={name as string} className="flex items-center gap-3">
            <span className="w-5 text-[14px] font-bold" style={{ color: i === 0 ? LIME : "rgba(255,255,255,0.45)" }}>{isAr ? "١٢٣٤"[i] : i + 1}</span>
            <span className="w-16 text-[15px] font-semibold whitespace-nowrap">{name as string}</span>
            <span className="flex-1 h-2.5 rounded-full bg-white/10 overflow-hidden">
              <span className="block h-full rounded-full" style={{ width: `${((score as number) / max) * 100}%`, background: i === 0 ? LIME : SAND }} />
            </span>
            <span className="w-14 text-end text-[14px] font-semibold tabular-nums">{(score as number).toLocaleString(isAr ? "ar-EG" : "en-US")}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services;

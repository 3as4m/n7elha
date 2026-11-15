import { Link } from "react-router-dom";
import { LIME, SAND, TEAL } from "@/components/teacher/DashboardAccents";
import { useAuth } from "@/lib/auth";
import { useTranslation } from "react-i18next";
import { ArrowUpRight, Play } from "lucide-react";
import { useSmoothScroll } from "@/lib/smoothScroll";
import { SiteNav } from "@/components/site/SiteNav";
import { SiteFooter } from "@/components/site/SiteFooter";
import { Seo } from "@/components/Seo";
import { Buddy, ShapeField } from "@/components/site/Buddy";
import { BUDDY_SHAPES } from "@/components/site/buddyShapes";
import { PaperSheet } from "@/components/site/PaperSheet";
import { ExplainerVideo } from "@/components/site/ExplainerVideo";
import productMockup from "@/assets/product-mockup.png";
import phoneJoin from "@/assets/phone-join.png";
import phoneClassic from "@/assets/phone-classic.png";
import phoneCrypto from "@/assets/phone-crypto.png";
import saudiMap from "@/assets/saudi-map.svg";

/* ---------- helpers ---------- */


const CORAL = "#E8794A"; // the one warm accent, only ever on a buddy
const CREAM = "#F3E7C9";
const SLATE = "#2B3F45"; // the story sheet, the dark slate of the footer and the nav buttons


const Landing = () => {
  const { user } = useAuth();
  const { i18n } = useTranslation();
  const isAr = i18n.language === "ar";
  useSmoothScroll();

  const t = isAr
    ? {
        line1: "نخلي الطالب",
        line2a: "يحب التعلّم",
        line2b: "",
        line3a: "",
        line3b: "مو يكرهه",
        sub: "نفلها مو نظام إدارة تعلّم (LMS) ثاني، ولا أداة اختبارات. إحنا نغيّر نظرة الطالب للتعلّم — نخليه ينتظر الحصة، مو يتهرّب منها. تجربة مصمّمة للفصل العربي من الأساس: أنت جهّز درسك، وإحنا نحوّله لشي يحبه طلابك.",
        cta: "ابدأ معنا",
        joinGame: "ادخل اللعبة",

        mapCaption: "من هنا نبدأ",
        storyKicker: "قصتنا",
        storyTitle: "الطالب حاضر بجسمه، غايب بعقله",
        sp1: "نعرف زين شكل الحصة: الطالب قاعد قدامك بس عقله بمكان ثاني. عيونه على الساعة، أو على الجوال تحت الطاولة، يعدّ الدقايق للجرس. مو لأنه ما يفهم — الطريقة اللي يتعلّم فيها ميتة، ما تعطيه سبب يهتم.",
        sp2: "والمعلم يحارب معركة خاسرة. ينافس جوالات وتطبيقات على انتباهٍ ما عاد يطول أكثر من دقايق. يجتهد ويجهّز زين، بس الصف طافي قبل لا يبدأ الدرس.",
        sp3: "هالمفهوم — تجربة تعليمية تخلي الطالب يحب التعلّم بدل ما يهرب منه — ما موجود في الفصول العربية. قررنا نكون أول واحد يبنيه. من هني طلعت نفلها.",

        visKicker: "رؤية السعودية 2030",
        visTitleA: "الرؤية تنبني",
        visTitleB: "داخل الفصل",
        visIntro: "رؤية 2030 تضع الإنسان في قلب التنمية، والتعليم هو الطريق لهذا الهدف. قطاع التعليم قطع خطوات كبيرة، لكن فيه مساحة واسعة للتطوير لسا: حصص تعتمد على التلقين، وطلاب حاضرين بأجسامهم بس، ومعلمين ما عندهم أدوات تعرّفهم مين فهم ومين ضاع. هنا نشتغل، داخل الحصة نفسها.",
        visPillar: "ركيزة",
        visItems: [
          ["مجتمع حيوي", "طالب يحب يجي المدرسة", "الحصة اللي يستناها الطالب تبني علاقة جديدة مع المدرسة. وكلها بالعربية وبلغة الفصل، لأن الهوية واللغة جزء من بناء الإنسان."],
          ["اقتصاد مزدهر", "مهارات المستقبل داخل كل درس", "الطالب يتعامل مع التقنية في كل حصة، والمعلم يبني أسئلته بالذكاء الاصطناعي، فتنمو الثقة الرقمية من الدرس نفسه."],
          ["وطن طموح", "معلم يشوف كل طالب", "تقارير بعد كل لعبة توضح مين فهم ومين يحتاج مساعدة، فيصير القرار في الفصل مبني على بيانات، مو على إحساس."],
        ],
        visNote: "نفلها منتج مستقل، وليست جهة حكومية ولا شريكًا رسميًا لبرامج الرؤية. نبني باتجاهها.",

        feelKicker: "ما نؤمن به",
        feelLine1: "التفاعل مو رقم",
        feelLine2: "في تقرير",
        feelBody: "هو إحساس نبيه لكل طالب: لحظة يدخل فيها الحصة وهو متحمّس، مو طافي. لحظة يتفاعل مع السؤال لأنه يبي، مو لأنه مجبور. هذا اللي نصمّمه، سؤال ورا سؤال.",

        statsKicker: "بالأرقام",
        stats: [
          ["3X", "انتباه أكثر من الحصة العادية"],
          ["16+", "نمط لعب تفاعلي"],
          ["2X", "تحصيل علمي، بمتعة"],
        ],

        vidKicker: "شوف بنفسك",
        vidTitleA: "تسع ألعاب",
        vidTitleB: "في نص دقيقة",
        vidSoundOn: "شغّل الصوت",
        vidSoundOff: "اكتم الصوت",
        vidReplay: "شوفه مرة ثانية",

        phonesKicker: "على جوال الطالب",
        phonesTitle: "نفس السؤال، عوالم مختلفة",
        phonesSub: "الطالب يدخل برمز من أربعة أرقام، ثم يلعب. كل نمط يغيّر الشكل والإحساس بالكامل، فنفس أسئلتك تصير تجربة جديدة كل حصة.",
        phoneJoinCap: "يدخل بالرمز",
        phoneClassicCap: "الوضع الكلاسيكي",
        phoneCryptoCap: "سباق التشفير",

        forWhoKicker: "لمن هذه المنصة؟",
        forWhoTitle: "صُممت للمعلم العربي أولاً",
        forWho1: "سواء كنت معلمًا في مدرسة حكومية تبحث عن طريقة تجعل مراجعة الدرس أكثر حيوية، أو مدرّسًا خاصًا يريد تتبع مستوى كل طالب بدقة — نفلها صُممت لك.",
        forWho2: "لا يشترط أن تكون خبيرًا في التكنولوجيا. المنصة تعمل من المتصفح مباشرة، ولا تحتاج الطلاب إلى تحميل أي تطبيق. رمز قصير، وينضم الجميع في ثوانٍ.",
        forWho3: "الأسئلة باللغة العربية، التقارير باللغة العربية، وتجربة الطالب مصممة للشاشات الصغيرة التي يحملها طلابك في جيوبهم.",
        readMore: "اقرأ المزيد عنّا",

      }
    : {
        line1: "Make students",
        line2a: "love learning",
        line2b: "",
        line3a: "",
        line3b: "not dread it.",
        sub: "nefelha isn't another LMS, and it isn't a quiz tool. We change how students feel about learning — so they look forward to class instead of running from it. Built for the Arabic classroom from the ground up: you prepare the lesson, we turn it into something your students love.",
        cta: "Get started",
        joinGame: "JOIN GAME",

        mapCaption: "This is where we start",
        storyKicker: "OUR STORY",
        storyTitle: "Students show up. Their minds don't.",
        sp1: "We know exactly what class looks like. The student's body is there, but their mind is somewhere else. Eyes on the clock. Scrolling under the desk. Counting down to the bell. Not because they don't understand — it's because the way we teach gives them no reason to care.",
        sp2: "The teacher is fighting a losing battle over attention. Competing with devices they can't beat. Working hard, preparing well, but the room checks out before the lesson even starts.",
        sp3: "The idea of making students actually want to learn — of creating an experience that intrinsically engages instead of coercing compliance — doesn't exist yet in Arabic classrooms. We decided to build it first. That's how nefelha started.",

        visKicker: "SAUDI VISION 2030",
        visTitleA: "The Vision is built",
        visTitleB: "in the classroom",
        visIntro: "Vision 2030 puts people at the center of development, and education is the road there. The sector has come a long way, but there is still a lot of room to grow: lessons built on memorizing, students who are in the room but not in the lesson, and teachers without the tools to see who understood and who got lost. That is where we work, inside the lesson itself.",
        visPillar: "PILLAR",
        visItems: [
          ["Vibrant society", "Students who want to be at school", "A lesson students look forward to builds a new relationship with school. And all of it is in Arabic, in the voice of the classroom, because language and identity are part of building people."],
          ["Thriving economy", "Future skills inside every lesson", "Students work with technology in every lesson, and teachers build their questions with AI, so digital confidence grows inside the lesson itself."],
          ["Ambitious nation", "A teacher who sees every student", "Reports after every game show who understood and who needs help, so decisions in class rest on data, not guesswork."],
        ],
        visNote: "nefelha is an independent product, not a government body or an official partner of the Vision programs. We build in its direction.",

        feelKicker: "WHAT WE BELIEVE",
        feelLine1: "Engagement isn't a number",
        feelLine2: "on a report",
        feelBody: "It's a feeling every student needs: the moment they walk into class excited instead of checked out. The moment they answer because they want to, not because they have to. That's what we design, one question at a time.",

        statsKicker: "BY THE NUMBERS",
        stats: [
          ["3X", "more engaged than a regular class"],
          ["16+", "interactive game modes"],
          ["2X", "the learning, all fun"],
        ],

        vidKicker: "SEE IT",
        vidTitleA: "Nine games",
        vidTitleB: "in thirty seconds",
        vidSoundOn: "Sound on",
        vidSoundOff: "Mute",
        vidReplay: "Watch again",

        phonesKicker: "ON THE STUDENT'S PHONE",
        phonesTitle: "The same question, different worlds",
        phonesSub: "A student joins with a four-digit code, then plays. Each mode changes the look and the feel completely, so the questions you already wrote become a new experience every lesson.",
        phoneJoinCap: "Joins with a code",
        phoneClassicCap: "Classic",
        phoneCryptoCap: "Crypto Rush",

        forWhoKicker: "WHO IS IT FOR",
        forWhoTitle: "Built around the Arabic-speaking teacher",
        forWho1: "Whether you're a school teacher looking to make lesson reviews more engaging, or a private tutor who wants to track each student's level with precision — nefelha was built for you.",
        forWho2: "You don't need to be tech-savvy. The platform runs entirely in the browser — students don't download anything. One short code and everyone's in within seconds.",
        forWho3: "Questions in Arabic, reports in Arabic, and a student experience designed for the small screens they carry in their pockets.",
        readMore: "Read more about us",

      };

  return (
    <div
      className="min-h-screen w-full"
      style={{ background: "#F3E7C9", fontFamily: "'Outfit', 'Almarai', system-ui, sans-serif" }}
    >
      <Seo
        path="/"
        titleAr="نفلها — نخلي الطلاب يحبون التعلّم | تجربة تفاعلية للفصل العربي"
        titleEn="nefelha — Make Students Love Learning | Interactive Classroom Experience"
        descriptionAr="نفلها مو نظام LMS ولا أداة اختبارات — إحنا نغيّر نظرة الطالب للتعلّم ونخليه يحب الحصة. تجربة تفاعلية للفصل العربي، تشتغل بدون أي تطبيق على أجهزة الطلاب."
        descriptionEn="nefelha isn't an LMS or a quiz tool. It's an interactive classroom experience that makes students love learning, not dread it. AI-powered, Arabic-first, nine play modes — no apps needed."
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "EducationalOrganization",
          name: "نفلها",
          alternateName: "nefelha",
          url: "https://www.nefelha.com/",
          description: "نفلها شركة ناشئة سعودية تبني تجربة تعليمية تفاعلية تخلي الطلاب يحبون التعلّم — بتوليد أسئلة بالذكاء الاصطناعي وتسعة أنماط لعب مباشرة بلا تطبيقات.",
          areaServed: { "@type": "Country", name: "Saudi Arabia" },
          address: { "@type": "PostalAddress", addressCountry: "SA" },
          inLanguage: ["ar", "en"],
        }}
      />
      <div className="relative w-full">

        {/* Positioned so it paints over the hero shapes that run up behind it. */}
        <div data-skew className="relative z-10 hero-nav"><SiteNav /></div>

        {/* ---------------- HERO ---------------- */}
        <div data-skew className="relative isolate">
        {/* Brand shapes (the business-card look), running from the very top
            of the page up behind the nav so the top reads as one piece. Drawn
            for left-to-right and mirrored in Arabic, so they always sit on the
            mockup's side. The layer clips itself; nothing can scroll sideways. */}
        <div aria-hidden className="pointer-events-none absolute inset-x-0 -top-40 -bottom-24 overflow-hidden">
          {/* entrance: each layer unfolds out of its own corner (hero-shape) */}
          <div className="absolute -top-10 -end-20 w-[300px] md:w-[600px] rtl:-scale-x-100">
              <svg viewBox="0 0 400 400" className="w-full overflow-visible">
                <path className="hero-shape" style={{ transformOrigin: "400px 0px", animationDelay: "40ms" }} fill={SAND} d="M400 0H70C20 40 48 118 100 172C154 228 132 300 204 356C254 396 338 404 400 392Z" />
                <path className="hero-shape" style={{ transformOrigin: "400px 0px", animationDelay: "200ms" }} fill={LIME} d="M400 0H154C102 34 130 104 174 150C222 200 202 262 266 310C308 342 360 340 400 330Z" />
              </svg>
          </div>
          <div className="absolute bottom-20 -end-10 w-[240px] md:w-[440px] rtl:-scale-x-100">
              <svg viewBox="0 0 400 300" className="w-full overflow-visible">
                <path className="hero-shape" style={{ transformOrigin: "400px 300px", animationDelay: "380ms" }} fill={TEAL} d="M400 300V120C360 104 318 124 296 166C266 226 198 226 148 258C108 282 94 304 122 322C176 354 330 352 400 336Z" />
              </svg>
          </div>
          {/* a few buddies landing on the shapes: one on the lime corner, one in the oval */}
          <Buddy shape="splash" color={CORAL} mood="grin" className="hero-pop absolute top-[150px] md:top-[230px] end-[90px] md:end-[150px] w-14 md:w-20 -rotate-12" style={{ animationDelay: "900ms" }} />
          <div className="absolute top-48 start-[38%] w-[200px] hidden lg:block">
              <svg viewBox="0 0 240 140" className="w-full overflow-visible">
                <ellipse className="hero-draw" pathLength={1} style={{ animationDelay: "650ms" }} cx="120" cy="70" rx="112" ry="52" transform="rotate(-14 120 70)" fill="none" stroke="#12262B" strokeWidth="1.5" opacity="0.4" />
              </svg>
              <Buddy shape="pebble" color={LIME} mood="wink" className="hero-pop absolute top-[28%] left-[38%] w-14" style={{ animationDelay: "1100ms" }} />
          </div>
        </div>
        <div className="wrap relative grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] items-center gap-8 lg:gap-14 px-5 sm:px-8 md:px-14 pt-10 sm:pt-16 pb-28 sm:pb-32">
          <div className="relative z-10">
            <h1
              className="leading-[1.05] tracking-tight text-[38px] sm:text-[52px] md:text-[68px]"
              style={{ fontFamily: "'ArslanWessam', 'Almarai', sans-serif", color: "#2B3F45" }}
            >
              {/* each line slides up out of its own mask */}
              <span className="hero-mask"><span className="hero-line" style={{ animationDelay: "120ms" }}>{t.line1}</span></span>
              <span className="hero-mask">
                <span className="hero-line" style={{ animationDelay: "230ms" }}>
                  <span className="relative inline-block italic" style={{ color: "#8FC44A" }}>
                    {t.line2a}
                    {/* a hand-drawn lime underline sweeps in once the line has landed */}
                    <svg aria-hidden viewBox="0 0 200 20" preserveAspectRatio="none" className="absolute inset-x-0 -bottom-[0.08em] w-full h-[0.22em] overflow-visible">
                      <path className="hero-draw" pathLength={1} style={{ animationDelay: "900ms", animationDuration: ".8s" }} d="M3 13C48 5 104 4 150 8C170 10 186 12 197 9" fill="none" stroke="#A9CB1E" strokeWidth="5" strokeLinecap="round" />
                    </svg>
                  </span>
                  {t.line2b && <>{" "}<span>{t.line2b}</span></>}
                </span>
              </span>
              <span className="hero-mask">
                <span className="hero-line" style={{ animationDelay: "340ms" }}>
                  {t.line3a && <span>{t.line3a} </span>}
                  <span style={{ color: "#2B3F45" }}>{t.line3b}</span>
                </span>
              </span>
            </h1>

            <p className="mt-5 text-[15px] sm:text-[16px] leading-relaxed text-black/70 max-w-[27rem] hero-fade" style={{ animationDelay: "520ms" }}>
              {t.sub}
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-3">
              <Link
                to={user ? "/app" : "/auth?mode=signup"}
                style={{ animationDelay: "680ms" }}
                className="hero-pop group inline-flex items-center gap-3 rounded-full border-2 border-[hsl(var(--nb-border))] bg-[#2B3F45] text-white pl-6 pr-2 py-2 text-[15px] font-medium shadow-[4px_4px_0_0_hsl(var(--nb-border))] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0_0_hsl(var(--nb-border))] transition-all"
              >
                {t.cta}
                <span className="h-9 w-9 rounded-full bg-white text-black flex items-center justify-center transition group-hover:rotate-12">
                  <ArrowUpRight className="h-4 w-4" strokeWidth={2.25} />
                </span>
              </Link>

              <Link
                to="/join"
                style={{ animationDelay: "780ms" }}
                className="hero-pop group inline-flex items-center gap-3 rounded-full border-2 border-[hsl(var(--nb-border))] bg-[#A9CB1E] text-[#2B3F45] pl-6 pr-2 py-2 text-[15px] font-medium shadow-[4px_4px_0_0_hsl(var(--nb-border))] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0_0_hsl(var(--nb-border))] transition-all"
              >
                {t.joinGame}
                <span className="h-9 w-9 rounded-full bg-white text-[#A9CB1E] flex items-center justify-center">
                  <Play className="h-4 w-4 fill-[#A9CB1E]" strokeLinejoin="round" strokeWidth={4} />
                </span>
              </Link>

            </div>
          </div>

          {/* RIGHT */}
          <div className="relative flex items-center justify-center hero-rise" style={{ animationDelay: "300ms" }}>
            <img
              src={productMockup}
              alt=""
              className="w-full max-w-[520px] h-auto select-none"
            />
            <Buddy shape="bows" color={TEAL} mood="happy" faceColor={CREAM} className="absolute -bottom-4 start-[4%] w-16 sm:w-20 rotate-6" />
          </div>
        </div>
        </div>

        {/* ---------------- OUR STORY ---------------- */}
        {/* A slate sheet of cut paper laid on the page, and on it the class as
            it is today: a few rows of buddies, all bored. */}
        <section data-skew className="relative z-10 px-4 sm:px-8 md:px-12 py-8 sm:py-12">
          <PaperSheet color={SLATE} tilt={-1.2} className="wrap text-white">
            <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] gap-10 lg:gap-14 items-center px-7 sm:px-12 md:px-16 py-12 sm:py-16">
              <div>
                <span className={`text-[12px] font-semibold ${isAr ? "tracking-normal" : "tracking-[0.25em]"}`} style={{ color: SAND }}>{t.storyKicker}</span>
                <h2
                  className="mt-3 text-[28px] sm:text-[36px] tracking-tight leading-[1.15]"
                  style={{ color: "#FFFFFF", fontFamily: "'ArslanWessam', 'Almarai', sans-serif" }}
                >
                  {t.storyTitle}
                </h2>
                <div className="mt-6 h-1 w-16 rounded-full" style={{ background: LIME }} />
                <p className="mt-6 text-[17px] sm:text-[18px] leading-relaxed text-white font-medium">{t.sp1}</p>
                <p className="mt-5 text-[15px] leading-relaxed text-white/75">{t.sp2}</p>
                <p className="mt-5 text-[15px] leading-relaxed text-white/75">{t.sp3}</p>
              </div>
              {/* the class, two rows facing us, nobody awake */}
              <div aria-hidden className="relative mx-auto w-full max-w-[420px] aspect-[5/4]">
                <Buddy shape="pebble" color="#5C7B82" mood="meh" className="absolute top-[4%] left-[6%] w-[26%]" />
                <Buddy shape="blob" color={SAND} mood="oh" className="absolute top-[0%] left-[37%] w-[26%] rotate-6" />
                <Buddy shape="heart" color="#5C7B82" mood="meh" className="absolute top-[6%] left-[68%] w-[26%] -rotate-12" />
                <Buddy shape="stack" color={SAND} mood="meh" className="absolute top-[44%] left-[0%] w-[33%] -rotate-6" />
                <Buddy shape="buddy" color={TEAL} mood="meh" faceColor={CREAM} className="absolute top-[40%] left-[34%] w-[33%]" />
                <Buddy shape="spool" color={SAND} mood="oh" className="absolute top-[46%] left-[67%] w-[33%] rotate-12" />
              </div>
            </div>
          </PaperSheet>
        </section>

        {/* ---------------- WHAT WE BELIEVE ---------------- */}
        {/* The answer to the bored class in the story: the same buddies, now
            cheering at the foot of the phones. Text and the three modes on one
            side, the phones standing on a big sand cutout on the other. */}
        <div data-skew className="relative isolate">
        {/* the pattern: faceless shapes down both page edges, from here to the footer */}
        <ShapeField />
        <section className="relative isolate overflow-hidden px-5 sm:px-8 md:px-14 pt-16 sm:pt-24 pb-20 sm:pb-28">
          <div className="wrap grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] gap-12 lg:gap-16 items-center">
            <div>
              <span className={`text-[12px] font-semibold text-[#8FC44A] ${isAr ? "tracking-normal" : "tracking-[0.25em]"}`}>
                {t.feelKicker}
              </span>
              <h2
                className="mt-4 text-[32px] sm:text-[44px] md:text-[52px] tracking-tight leading-[1.12]"
                style={{ fontFamily: "'ArslanWessam', 'Almarai', sans-serif", color: SLATE }}
              >
                <span className="block">{t.feelLine1}</span>
                <span className="block italic" style={{ color: "#8FC44A" }}>{t.feelLine2}</span>
              </h2>
              <p className="mt-6 max-w-xl text-[16px] sm:text-[18px] leading-relaxed text-black/70">{t.feelBody}</p>
              <ul className="mt-8 space-y-3">
                {([
                  ["pebble", TEAL, "smile", t.phoneJoinCap],
                  ["splash", LIME, "grin", t.phoneClassicCap],
                  ["coral", CORAL, "wink", t.phoneCryptoCap],
                ] as const).map(([shape, color, mood, cap]) => (
                  <li key={cap} className="flex items-center gap-3">
                    <Buddy shape={shape} color={color} mood={mood} faceColor={color === TEAL ? CREAM : undefined} className="w-10 h-10 shrink-0" />
                    <span className="text-[20px] sm:text-[22px]" style={{ color: SLATE, fontFamily: "'ArslanWessam', 'Almarai', sans-serif" }}>{cap}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Three real student screens, fanned on a sand cutout: the side
                phones tuck behind the center one so the three read as one
                object. Forced LTR so the fan stays symmetrical in Arabic. */}
            <div className="relative pb-10">
              <svg aria-hidden viewBox="-1.05 -1.05 2.1 2.1" className="absolute inset-x-[2%] top-[4%] w-[96%] -z-10 rotate-6">
                <path d={BUDDY_SHAPES.blob.d} fill="#E3CC98" />
              </svg>
              <div dir="ltr" className="flex items-end justify-center pt-6">
                <img
                  src={phoneJoin}
                  alt={t.phoneJoinCap}
                  loading="lazy"
                  className="w-[30%] max-w-[190px] h-auto select-none origin-bottom -rotate-[9deg] translate-y-3 -mr-[6%] drop-shadow-[0_18px_30px_rgba(20,33,42,0.28)]"
                />
                <img
                  src={phoneClassic}
                  alt={t.phoneClassicCap}
                  loading="lazy"
                  className="relative z-10 w-[34%] max-w-[220px] h-auto select-none drop-shadow-[0_22px_36px_rgba(20,33,42,0.32)]"
                />
                <img
                  src={phoneCrypto}
                  alt={t.phoneCryptoCap}
                  loading="lazy"
                  className="w-[30%] max-w-[190px] h-auto select-none origin-bottom rotate-[9deg] translate-y-3 -ml-[6%] drop-shadow-[0_18px_30px_rgba(20,33,42,0.28)]"
                />
              </div>
              {/* the class, awake now, at the foot of the phones */}
              <div aria-hidden dir="ltr" className="absolute bottom-0 inset-x-0 z-20 flex items-end justify-center gap-1 sm:gap-3">
                <Buddy shape="sprout" color={TEAL} mood="grin" faceColor={CREAM} className="w-16 sm:w-24 -rotate-6" />
                <Buddy shape="heart" color={CORAL} mood="happy" className="w-14 sm:w-20 translate-y-1" />
                <Buddy shape="maple" color={LIME} mood="oh" className="w-16 sm:w-24 rotate-6" />
                <Buddy shape="tulips" color={SLATE} mood="wink" faceColor={CREAM} className="w-14 sm:w-20" />
              </div>
            </div>
          </div>
        </section>

        {/* ---------------- BY THE NUMBERS ---------------- */}
        {/* Three big numbers, each standing on a cut-paper shape with a buddy
            peeking from its corner. No boxes: the shapes are the frame. */}
        <section className="relative px-5 sm:px-8 md:px-14 pt-4 sm:pt-8 pb-16 sm:pb-24">
          <div className="wrap">
            <span className={`block text-center text-[12px] font-semibold text-[#8FC44A] ${isAr ? "tracking-normal" : "tracking-[0.25em]"}`}>{t.statsKicker}</span>
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-14 sm:gap-6 md:gap-10">
              {([
                ["blob", TEAL, "pebble", LIME, "grin", -6],
                ["bush", "#E3CC98", "splash", CORAL, "happy", 4],
                ["cross", LIME, "sprout", TEAL, "wink", -3],
              ] as const).map(([bg, bgColor, buddy, buddyColor, mood, rot], i) => {
                const [num, label] = t.stats[i];
                return (
                  <div key={num} className="flex flex-col items-center text-center">
                    <div className="relative w-[200px] sm:w-full max-w-[240px] aspect-square flex items-center justify-center">
                      <svg aria-hidden viewBox="-1.05 -1.05 2.1 2.1" className="absolute inset-0 w-full h-full" style={{ transform: `rotate(${rot}deg)`, filter: "drop-shadow(6px 7px 0 hsl(var(--nb-border)))" }}>
                        <path d={BUDDY_SHAPES[bg].d} fill={bgColor} />
                      </svg>
                      <span
                        dir="ltr"
                        className="relative text-[72px] sm:text-[64px] md:text-[84px] font-extrabold leading-none tracking-tight"
                        style={{ fontFamily: "'Outfit', system-ui, sans-serif", color: bgColor === TEAL ? CREAM : SLATE }}
                      >
                        {num}
                      </span>
                      <Buddy shape={buddy} color={buddyColor} mood={mood} faceColor={buddyColor === TEAL ? CREAM : undefined} className="absolute -bottom-2 -end-2 w-14 sm:w-16 rotate-12" />
                    </div>
                    <p className="mt-6 max-w-[16rem] text-[20px] sm:text-[22px] leading-snug" style={{ color: SLATE, fontFamily: "'ArslanWessam', 'Almarai', sans-serif" }}>{label}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ---------------- THE GAMES, ON VIDEO ---------------- */}
        {/* The 30-second explainer on a slate sheet, a buddy on each corner. */}
        <section className="relative px-4 sm:px-8 md:px-12 pt-6 sm:pt-10 pb-10 sm:pb-14">
          <div className="wrap text-center">
            <span className={`text-[12px] font-semibold text-[#8FC44A] ${isAr ? "tracking-normal" : "tracking-[0.25em]"}`}>{t.vidKicker}</span>
            <h2
              className="mt-3 text-[30px] sm:text-[42px] md:text-[50px] tracking-tight leading-[1.12]"
              style={{ fontFamily: "'ArslanWessam', 'Almarai', sans-serif", color: SLATE }}
            >
              <span>{t.vidTitleA} </span>
              <span className="italic" style={{ color: "#8FC44A" }}>{t.vidTitleB}</span>
            </h2>
          </div>
          <div className="relative mx-auto mt-10 sm:mt-12 max-w-4xl">
            <PaperSheet color={SLATE} tilt={-1} edge={1}>
              <div className="p-3 sm:p-5 md:p-6">
                <ExplainerVideo soundOn={t.vidSoundOn} soundOff={t.vidSoundOff} replay={t.vidReplay} />
              </div>
            </PaperSheet>
            <Buddy shape="splash" color={LIME} mood="grin" className="absolute -top-8 sm:-top-10 -start-4 sm:-start-8 w-16 sm:w-24 -rotate-12" />
            <Buddy shape="heart" color={CORAL} mood="happy" className="absolute -bottom-7 sm:-bottom-9 -end-3 sm:-end-7 w-14 sm:w-20 rotate-12" />
          </div>
        </section>

        {/* ---------------- VISION 2030 ---------------- */}
        {/* A sand sheet of cut paper with the class gathered at its bottom corner. A
            huge outlined 2030 sits behind the text, and each of the Vision's
            three pillars gets what nefelha does for it, split by thin rules. */}
        <section className="relative z-10 px-4 sm:px-8 md:px-12 py-10 sm:py-14" style={{ color: SLATE }}>
          <PaperSheet color={SAND} tilt={0.9} edge={1} className="wrap">
          {/* the class this is for, gathered at the bottom corner of the sheet */}
          <div aria-hidden className="absolute bottom-6 sm:bottom-8 end-8 sm:end-14 z-10 flex items-end gap-1 sm:gap-2">
            <Buddy shape="splash" color={LIME} mood="grin" className="w-14 sm:w-20 -rotate-6" />
            <Buddy shape="pinwheel" color={TEAL} mood="happy" faceColor={CREAM} className="w-12 sm:w-16" />
            <Buddy shape="coral" color={CORAL} mood="smile" className="w-14 sm:w-[76px] rotate-6" />
            <Buddy shape="cross" color={SLATE} mood="wink" faceColor={CREAM} className="w-12 sm:w-16 -rotate-3" />
          </div>
          <div className="relative isolate overflow-hidden px-7 sm:px-12 md:px-16 py-14 sm:py-20">
            <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
              <span
                className="absolute top-2 -end-4 sm:end-0 select-none leading-none font-extrabold tracking-tight text-[30vw] lg:text-[19rem]"
                style={{ color: "transparent", WebkitTextStroke: "1.5px rgba(43,63,69,0.14)", fontFamily: "'Outfit', 'Almarai', sans-serif" }}
              >
                2030
              </span>
            </div>

            <div className="wrap">
              <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,26rem)] gap-6 lg:gap-16 items-end">
                <div>
                  <span className={`text-[12px] font-semibold ${isAr ? "tracking-normal" : "tracking-[0.25em]"}`} style={{ color: TEAL }}>{t.visKicker}</span>
                  <h2 className="mt-4 text-[32px] sm:text-[46px] md:text-[54px] tracking-tight leading-[1.1]" style={{ fontFamily: "'ArslanWessam', 'Almarai', sans-serif" }}>
                    <span className="block">{t.visTitleA}</span>
                    <span className="block italic" style={{ color: TEAL }}>{t.visTitleB}</span>
                  </h2>
                </div>
                <p className="text-[15px] leading-relaxed text-black/65">{t.visIntro}</p>
              </div>

              {/* the three pillars */}
              <ol className="mt-12 sm:mt-16 grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-12">
                {t.visItems.map(([pillar, head, body], i) => (
                  <li key={pillar} className="border-t border-black/15 pt-6">
                    <span className={`text-[12px] font-semibold ${isAr ? "tracking-normal" : "tracking-[0.2em]"}`} style={{ color: SLATE }}>
                      {t.visPillar} {isAr ? ["١", "٢", "٣"][i] : `0${i + 1}`}
                      <span className="mx-2 text-black/25">/</span>
                      <span style={{ color: TEAL }}>{pillar}</span>
                    </span>
                    <h3 className="mt-4 text-[20px] sm:text-[22px] font-semibold leading-snug">{head}</h3>
                    <p className="mt-2.5 text-[15px] leading-relaxed text-black/65">{body}</p>
                  </li>
                ))}
              </ol>

              <p className="mt-14 text-[12.5px] leading-relaxed text-black/45 max-w-2xl">{t.visNote}</p>
            </div>
          </div>
          </PaperSheet>
        </section>

        {/* ---------------- FOR WHO ---------------- */}
        <section className="wrap relative px-5 sm:px-8 md:px-14 pt-10 sm:pt-14 pb-16 sm:pb-24">
          {/* the gap between the text and the map gets a small lime drop and an oval */}
          <div aria-hidden className="pointer-events-none absolute inset-0 hidden md:block">
            <svg viewBox="0 0 240 140" className="absolute top-[30%] left-1/2 -translate-x-1/2 w-[170px]">
              <ellipse cx="120" cy="70" rx="112" ry="52" transform="rotate(18 120 70)" fill="none" stroke="#12262B" strokeWidth="1.5" opacity="0.35" />
            </svg>
            <Buddy shape="hill" color={LIME} mood="smile" className="absolute top-[50%] left-[53%] w-[64px]" />
          </div>
          <div className="relative grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20">
            <div>
              <span className={`text-[12px] font-semibold text-[#2B3F45] ${isAr ? "tracking-normal" : "tracking-[0.25em]"}`}>
                {t.forWhoKicker}
              </span>
              <h2 className="mt-4 text-[26px] sm:text-[36px] tracking-tight leading-[1.15]" style={{ color: "#2B3F45", fontFamily: "'ArslanWessam', 'Almarai', sans-serif" }}>
                {t.forWhoTitle}
              </h2>
              <img src={saudiMap} alt={isAr ? "المملكة العربية السعودية" : "Saudi Arabia"} className="mt-8 w-full max-w-[19rem]" />
              <p className="mt-4 text-[13px] font-semibold text-[#2B3F45]">{t.mapCaption}</p>
            </div>
            <div className="space-y-6 text-[15px] leading-relaxed text-black/65">
              <p>{t.forWho1}</p>
              <p>{t.forWho2}</p>
              <p>{t.forWho3}</p>
              <Link to="/about" className="inline-flex items-center gap-1.5 text-[14px] font-semibold" style={{ color: "#2B3F45" }}>
                {t.readMore}
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>
        </div>

        <SiteFooter />
      </div>
    </div>
  );
};

export default Landing;

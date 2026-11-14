import { useTranslation } from "react-i18next";
import saudiMap from "@/assets/saudi-map-light.svg";
import storyBoy from "@/assets/story/boy.webp";
import { LIME, SAND, TEAL } from "@/components/teacher/DashboardAccents";
import { SiteNav } from "@/components/site/SiteNav";
import { PageShapes } from "@/components/site/PageShapes";
import { PaperSheet } from "@/components/site/PaperSheet";
import { Buddy } from "@/components/site/Buddy";
import { SiteFooter } from "@/components/site/SiteFooter";
import { Seo } from "@/components/Seo";

const About = () => {
  const { i18n } = useTranslation();
  const isAr = i18n.language === "ar";

  const t = isAr
    ? {
        kicker: "من نحن",
        title: "كنا الطلاب اللي في آخر الصف",
        sub: "نفلها شركة ناشئة سعودية في تقنية التعليم (EdTech) تبني منصة تعليمية تفاعلية للفصل. لم نبدأ من دراسة سوق، بدأنا من تجربتنا نحن كطلاب.",
        sub2: "جلسنا سنين في آخر الصف نعدّ الدقايق، ونعرف بالضبط وش يطفّي الطالب ووش يشعله. اليوم نبني الشي اللي تمنينا يكون موجود وقتها: حصة يدخلها الطالب متحمس، ويطلع منها فاهم.",
        motto: ["نلعب", "نتعلّم", "نتغيّر"],

        storyKicker: "قصتنا",
        quote: "ما كنت أحب المدرسة. كل يوم فيها كان ثقيل... لين جا يوم، أستاذ قرر يحوّل الدرس إلى لعبة. المنهج ما تغير. أنا اللي تغيرت، وكل الفصل بعد.",
        quoteBy: "مؤسس نفلها",
        chapters: [
          ["الحصة كما نعرفها", "الطالب موجود، بس عقله مو موجود. عيونه على الساعة والجوال، يستنى الجرس. مو لأنه ما فهم، بس لأن الطريقة ما تعطيه سبب يهتم."],
          ["المعلم لحاله", "يحارب معركة خاسرة على الانتباه، ينافس شاشات صعب يغلبها. والمنصات الجاهزة مبنية بلغة وذهنية ثانية، والعربي فيها مجرد ترجمة."],
          ["ليش نفلها", "تجربة تخلي الطالب يبي يتعلّم ما كانت موجودة في الفصول العربية. قررنا نكون أول من يبنيها، من مكان نعرفه زين: آخر الصف."],
        ],


        missionTitle: "طموحنا يبدأ من الخليج",
        m1: "هدفنا أن يصبح التعلّم التفاعلي هو الأصل في فصول الخليج، لا الاستثناء الذي يحدث مرة في الفصل الدراسي.",
        mapCaption: "من هنا نبدأ",
        m2: "نبني نفلها لتعمل في الفصل الواقعي كما هو: الفصل الذي لا يملك جهازًا لكل طالب، والفصل الذي يملك. لهذا السبب تحديدًا بنينا نمط الألعاب الفعلية بلوح مطبوع ورموز QR، حتى لا تكون التقنية شرطًا لدخول التجربة.",

        valuesKicker: "ما الذي يوجّهنا",
        valuesTitle: "ثلاثة مبادئ لا نتنازل عنها",
        v1t: "الطالب لازم يبي يكون هنا", v1d: "إذا الطالب ما يبي يحضر الحصة، ولا شي ثاني يشتغل. لا منهج ولا تقرير ولا اختبار. نبدأ من الحماس، والباقي يجي وراه.",
        v2t: "اللعب جدّ", v2d: "المتعة هي الطريق، والتعلّم هو الهدف. كل فوز في اللعبة وراه إجابة صحيحة، وما نضيف شي يلهي الطالب عن السؤال.",
        v3t: "المعلم قلب الحصة", v3d: "ما نبي نستبدل المعلم. نعطيه أدوات تخلي حصته هي اللي يستناها الطلاب، وهو اللي يقودها.",

      }
    : {
        kicker: "ABOUT US",
        title: "We were the kids in the back row",
        sub: "nefelha is a Saudi EdTech startup building an interactive learning platform for the classroom. We did not begin with market research. We began with our own time as students.",
        sub2: "We spent years in the back row counting the minutes, and we know exactly what switches a student off and what lights them up. Today we are building what we wished existed back then: a lesson students walk into excited and leave understanding.",
        motto: ["We play", "We learn", "We change"],

        storyKicker: "OUR STORY",
        quote: "I didn't like school. Every day there felt heavy... until one day a teacher decided to turn the lesson into a game. The curriculum didn't change. I did, and so did the whole class.",
        quoteBy: "nefelha's founder",
        chapters: [
          ["Class as we know it", "The student is there, but their mind isn't. Eyes on the clock and the phone, waiting for the bell. Not because they don't understand, but because the way we teach gives them no reason to care."],
          ["The teacher, alone", "Fighting a losing battle over attention, against screens that are hard to beat. And the ready-made platforms were built in another language and mindset, with Arabic as a translation."],
          ["Why nefelha", "An experience that makes students want to learn didn't exist in Arabic classrooms. We decided to build it first, from a place we know well: the back row."],
        ],


        missionTitle: "Our ambition starts with the Gulf",
        m1: "We want interactive learning to become the default in GCC classrooms, not the exception that happens once a semester.",
        mapCaption: "This is where we start",
        m2: "We build nefelha for the classroom as it actually is: the one without a device for every student, and the one with. That is exactly why we built Physical Games, a printed board and QR codes, so that technology is never the price of admission.",

        valuesKicker: "WHAT GUIDES US",
        valuesTitle: "Three principles we don't compromise on",
        v1t: "Students have to want to be there", v1d: "If students don't want to be in class, nothing else works: not the curriculum, not the report, not the test. We start from excitement, and the rest follows.",
        v2t: "Play is serious", v2d: "Fun is the way, learning is the goal. Every win in the game comes from a right answer, and we add nothing that pulls students away from the question.",
        v3t: "The teacher is the heart of the lesson", v3d: "We are not here to replace teachers. We give them tools that make their lesson the one students wait for, with them leading it.",

      };

  const values = [
    { title: t.v1t, desc: t.v1d },
    { title: t.v2t, desc: t.v2d },
    { title: t.v3t, desc: t.v3d },
  ];


  return (
    <div
      className="relative isolate overflow-x-clip min-h-screen w-full"
      style={{ background: "#F3E7C9", fontFamily: "'Outfit', 'Almarai', system-ui, sans-serif" }}
    >
      <Seo
        path="/about"
        titleAr="من نحن — نفلها، شركة تقنية تعليم سعودية"
        titleEn="About Us — nefelha, an EdTech Startup in Saudi Arabia"
        descriptionAr="نفلها شركة ناشئة سعودية في تقنية التعليم أسسها طلاب سابقون أرادوا منصة تعليمية تفاعلية مصممة للفصل العربي من الأساس، لا مترجمة عنه. تعرّف على قصتنا وقيمنا."
        descriptionEn="nefelha is a Saudi EdTech startup founded by former students who wanted an interactive learning platform built for the Arabic classroom from the ground up, not translated into it. Meet our story and values."
      />
      <PageShapes />
      <SiteNav />

      {/* ---------------- HERO ---------------- */}
      <section className="wrap px-5 sm:px-8 md:px-14 pt-10 sm:pt-16 pb-14 sm:pb-20">
        <span className={`text-[12px] font-semibold text-[#2B3F45] ${isAr ? "tracking-normal" : "tracking-[0.25em]"}`}>{t.kicker}</span>
        <h1
          className="mt-3 max-w-2xl leading-[1.1] tracking-tight text-[32px] sm:text-[46px]"
          style={{ fontFamily: "'ArslanWessam', 'Almarai', sans-serif", color: "#2B3F45" }}
        >
          {t.title}
        </h1>
        <p className="mt-5 max-w-xl text-[16px] sm:text-[17px] leading-relaxed text-black/70">{t.sub}</p>
        <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-black/60">{t.sub2}</p>
        <p className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-2 text-[22px] sm:text-[28px]" style={{ fontFamily: "'ArslanWessam', 'Almarai', sans-serif", color: "#2B3F45" }}>
          {t.motto.map((w, i) => (
            <span key={w} className="inline-flex items-center gap-4">
              {i > 0 && <span className="h-2.5 w-2.5 rounded-full" style={{ background: i === 1 ? LIME : TEAL }} />}
              <span style={i === 2 ? { color: TEAL } : undefined}>{w}</span>
            </span>
          ))}
        </p>
      </section>

      {/* ---------------- ORIGIN STORY ---------------- */}
      {/* A poster: the boy looking up on one side (his orbit lines and
          sparkles are in the photo), the founder's quote on the other with a
          few sparkles and shapes. No lines of our own: they ran through the text. The band takes the
          photo's own paper color so the picture has no edge. */}
      <section className="relative z-10">
        <svg aria-hidden viewBox="0 0 1440 72" preserveAspectRatio="none" className="relative block w-full h-[48px] sm:h-[64px] -mb-px">
          <path fill={PAPER} d="M0 44C220 6 470 64 760 30C1010 2 1240 8 1440 26V72H0Z" />
        </svg>
        <div className="relative isolate overflow-hidden" style={{ background: PAPER }}>

          <div dir="ltr" className="wrap relative grid grid-cols-1 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] items-center gap-6 lg:gap-4 px-5 sm:px-8 md:px-14 pt-6 lg:pt-0 lg:min-h-[600px]">
            {/* the photo has empty paper on its right, so on wide screens it
                spreads under the quote side and the paper just continues */}
            <div className="relative h-[340px] sm:h-[440px] lg:h-auto lg:self-stretch">
              <img
                src={storyBoy}
                alt={isAr ? "طالب ينظر للأعلى" : "A student looking up"}
                className="absolute inset-y-0 left-0 h-full w-full lg:w-[150%] max-w-none object-cover object-left select-none"
                style={{
                  WebkitMaskImage: "linear-gradient(to right, #000 75%, transparent 100%), linear-gradient(to bottom, #000 62%, transparent 100%)",
                  WebkitMaskComposite: "source-in",
                  maskImage: "linear-gradient(to right, #000 75%, transparent 100%), linear-gradient(to bottom, #000 62%, transparent 100%)",
                  maskComposite: "intersect",
                }}
              />
            </div>

            <div dir={isAr ? "rtl" : "ltr"} className="relative py-10 lg:py-20">
              <span className="absolute top-[38%] -start-3 h-4 w-4 rounded-full" style={{ background: SAND }} />
              <svg viewBox="0 0 20 20" className="absolute bottom-[22%] end-[2%] w-5 rotate-12"><path d="M2 18L10 2L18 18Z" fill={SAND} /></svg>

              <span className={`text-[14px] font-bold ${isAr ? "tracking-normal" : "tracking-[0.25em]"}`} style={{ color: TEAL }}>{t.storyKicker}</span>
              <blockquote
                className="mt-4 text-[26px] sm:text-[34px] lg:text-[38px] font-extrabold leading-[1.45]"
                style={{ color: INKBROWN, fontFamily: "'Almarai', 'Outfit', sans-serif" }}
              >
                <span style={{ color: TEAL }}>{isAr ? "”" : "“"}</span>{t.quote}<span style={{ color: TEAL }}>{isAr ? "“" : "”"}</span>
              </blockquote>
              <p className="mt-6 text-[20px] sm:text-[24px] font-extrabold" style={{ color: INKBROWN, fontFamily: "'Almarai', 'Outfit', sans-serif" }}>
                <span style={{ color: LIME }}>—</span> {t.quoteBy}
              </p>
            </div>
          </div>

          {/* the story itself, as three short chapters under the poster */}
          <div className="wrap relative isolate px-5 sm:px-8 md:px-14 pb-20 sm:pb-24 pt-2">
            {/* our own shapes around the chapters, so the band is more than the photo */}
            <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
              <Buddy shape="pebble" color={SAND} mood="smile" className="absolute w-[110px] bottom-0 -start-16 hidden xl:block" />
              <Buddy shape="pinwheel" color={LIME} mood="wink" className="absolute w-[70px] md:w-[90px] bottom-2 end-[2%] rotate-12" />
              <svg viewBox="0 0 240 140" className="absolute w-[150px] bottom-0 end-[12%] hidden md:block">
                <ellipse cx="120" cy="70" rx="112" ry="52" transform="rotate(-16 120 70)" fill="none" stroke="#12262B" strokeWidth="1.5" opacity="0.35" />
              </svg>
            </div>
            <ol className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
              {t.chapters.map(([head, body], i) => (
                <li key={head} className="pt-6">
                  <span className="text-[13px] font-bold" style={{ color: TEAL }}>{isAr ? ["١", "٢", "٣"][i] : `0${i + 1}`}</span>
                  <h3 className="mt-2 text-[19px] sm:text-[21px] font-extrabold" style={{ color: INKBROWN, fontFamily: "'Almarai', 'Outfit', sans-serif" }}>{head}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed" style={{ color: "rgba(43,33,28,0.72)" }}>{body}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
        <svg aria-hidden viewBox="0 0 1440 72" preserveAspectRatio="none" className="relative block w-full h-[48px] sm:h-[64px] -mt-px">
          <path fill={PAPER} d="M0 0H1440V36C1200 70 960 14 690 46C430 74 200 64 0 30Z" />
        </svg>
      </section>

      {/* ---------------- MISSION ---------------- */}
      {/* A slate sheet of cut paper laid on the page (the home page's story
          sheet), the map, and the faint wordmark behind. */}
      <section className="relative z-10 mt-6 px-4 sm:px-8 md:px-12 py-8 sm:py-12">
        <PaperSheet color={NAVY} tilt={-1} className="wrap text-white">
          <div className="relative isolate overflow-hidden px-7 sm:px-12 md:px-16 py-12 sm:py-16">
            <span
              aria-hidden
              className="pointer-events-none select-none absolute -z-10 -top-4 end-[-2%] text-[150px] sm:text-[230px] leading-none text-white opacity-[0.07]"
              style={{ fontFamily: "'ArslanWessam', 'Almarai', sans-serif" }}
            >
              نفلها
            </span>

            <div className="relative grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,24rem)] gap-12 lg:gap-16 items-center">
              <div className="max-w-2xl">
                <h2 className="text-[32px] sm:text-[44px] tracking-tight leading-[1.1]" style={{ fontFamily: "'ArslanWessam', 'Almarai', sans-serif" }}>
                  {t.missionTitle}
                </h2>
                <div className="mt-6 h-1 w-16 rounded-full" style={{ background: LIME }} />
                <p className="mt-6 text-[17px] sm:text-[19px] leading-relaxed text-white font-medium">{t.m1}</p>
                <p className="mt-4 text-[15px] leading-relaxed text-white/75">{t.m2}</p>
              </div>

              <div className="relative mx-auto w-full max-w-sm">
                <img src={saudiMap} alt={isAr ? "المملكة العربية السعودية" : "Saudi Arabia"} className="w-full" />
                <p className="mt-5 text-center text-[13px] font-semibold text-white/80">{t.mapCaption}</p>
              </div>
            </div>
          </div>
        </PaperSheet>
        <div aria-hidden dir="ltr" className="absolute bottom-2 sm:bottom-4 left-8 sm:left-16 z-20 flex items-end gap-1 sm:gap-2">
          <Buddy shape="splash" color={LIME} mood="grin" className="w-12 sm:w-16 -rotate-6" />
          <Buddy shape="heart" color="#E8794A" mood="happy" className="w-10 sm:w-14 rotate-6" />
        </div>
      </section>

      {/* ---------------- VALUES ---------------- */}
      {/* Three principles as big statements: a large outlined number, the
          principle in display type, one line under it. Rows split by hairlines,
          no icon tiles, nothing sticky. */}
      <section className="wrap px-5 sm:px-8 md:px-14 py-16 sm:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,20rem)_minmax(0,1fr)] gap-10 lg:gap-16">
          <div>
            <span className={`text-[13px] font-bold ${isAr ? "tracking-normal" : "tracking-[0.25em]"}`} style={{ color: TEAL }}>{t.valuesKicker}</span>
            <h2 className="mt-3 text-[30px] sm:text-[42px] tracking-tight leading-[1.1]" style={{ color: "#2B3F45", fontFamily: "'ArslanWessam', 'Almarai', sans-serif" }}>
              {t.valuesTitle}
            </h2>
          </div>

          <ol>
            {values.map((v, i) => (
              <li key={v.title} className="grid grid-cols-[4.5rem_minmax(0,1fr)] sm:grid-cols-[6.5rem_minmax(0,1fr)] gap-4 sm:gap-6 py-8 sm:py-10 border-t border-black/15 last:border-b">
                <span
                  className="text-[64px] sm:text-[88px] leading-[0.8] font-extrabold"
                  style={{ color: "transparent", WebkitTextStroke: `2px ${i === 1 ? LIME : TEAL}`, fontFamily: "'Outfit', 'Almarai', sans-serif" }}
                >
                  {isAr ? ["١", "٢", "٣"][i] : i + 1}
                </span>
                <div>
                  <h3 className="text-[24px] sm:text-[32px] tracking-tight leading-[1.15]" style={{ color: "#2B3F45", fontFamily: "'ArslanWessam', 'Almarai', sans-serif" }}>{v.title}</h3>
                  <p className="mt-3 max-w-xl text-[15px] sm:text-[16px] leading-relaxed text-black/65">{v.desc}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>

      </section>

      <SiteFooter />
    </div>
  );
};

/* ---------- story poster pieces ---------- */

const NAVY = "#2B3F45";  // the mission sheet, the dark slate of the footer and the nav buttons
const PAPER = "#F4F2E5";     // the photo's own paper color
const INKBROWN = "#2B211C";  // quote text, as on the poster



export default About;

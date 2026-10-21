import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ArrowUpRight } from "lucide-react";
import { LIME, SAND, TEAL } from "@/components/teacher/DashboardAccents";
import { SiteNav } from "@/components/site/SiteNav";
import { PageShapes } from "@/components/site/PageShapes";
import { SiteFooter } from "@/components/site/SiteFooter";
import { Seo } from "@/components/Seo";

const INK = "#14282D";
const SLATE = "#2B3F45";
const DISPLAY = "'ArslanWessam', 'Almarai', sans-serif";

type Gain = { word: string; title: string; points: [string, string][] };

/* Written for whoever runs the school, not the teacher: every section answers
   "what does my school get out of this" (enrollment, reputation, proof,
   teachers), then how to start small. No numbers or testimonials we don't
   have. */
const Schools = () => {
  const { i18n } = useTranslation();
  const isAr = i18n.language === "ar";

  const t = isAr
    ? {
        kicker: "للمدارس",
        title: "مدرسة يحبها الطالب، ويختارها أهله",
        sub: "ولي الأمر يختار المدرسة من اللي يسمعه من عياله على العشا. نفلها تعطي طلابك شي يسولفون عنه كل يوم، وتعطيك أنت أرقام تثبت إن الحصة فعلًا تغيّرت.",
        cta: "احجز تجربة لمدرستك",
        bubbles: ["يمه اليوم فزنا على فصل ب!", "بكرة عندنا لعبة الزومبي، لا تغيّبوني", "الأستاذ خلانا نبني برج فوق الحمم"],

        gainsKicker: "وش تكسب مدرستك",
        gainsTitle: "أكثر من حصة ممتعة",
        gains: [
          {
            word: "التسجيل",
            title: "طلاب يكملون، وأهالي يجددون",
            points: [
              ["الطالب اللي يحب مدرسته يكمل فيها", "طالب مبسوط يعني ولي أمر يجدد التسجيل، ويسجّل إخوانه، وينصح فيكم غيره."],
              ["تكلفة بداية بسيطة", "لا أجهزة جديدة ولا تطبيقات. يشتغل من المتصفح على البروجكتر اللي عندكم، والفصول بدون جوالات تلعب على لوح مطبوع بجوال واحد."],
              ["ساعات تحضير أقل", "الذكاء الاصطناعي يطلّع الأسئلة من ملف الدرس في دقايق، فوقت المعلم يروح للطلاب مو للأوراق."],
            ],
          },
          {
            word: "السمعة",
            title: "اسم مدرستك على لسان الكل",
            points: [
              ["يوم مفتوح يقنع لحاله", "ولي الأمر الزائر يشوف لعبة مباشرة على الشاشة والفصل كله متحمس. هذا يقنع أكثر من أي بروشور."],
              ["مدرسة سابقة غيرها", "تقنية حديثة بالعربي داخل الحصة، وباتجاه رؤية 2030. هذا اللي يميزكم عن مدارس شغالة على نفس النظام القديم."],
              ["تسويق ببلاش", "الطالب يرجع البيت يسولف عن أرضية الحمم وسباق التشفير، وهذا أصدق إعلان ممكن."],
            ],
          },
          {
            word: "النتائج",
            title: "أرقام تقدر تعرضها",
            points: [
              ["تقرير بعد كل لعبة", "لكل طالب ولكل سؤال. تعرضه في اجتماع أولياء الأمور أو في تقييم المدرسة بدل الكلام العام."],
              ["تعرف مين يحتاج متابعة", "صفحة التحليلات تبيّن الطلاب اللي يتعثرون والأسئلة الأصعب، قبل الاختبارات مو بعدها."],
            ],
          },
          {
            word: "المعلمين",
            title: "معلم مرتاح، يبقى معكم",
            points: [
              ["فصل متفاعل، حصة أخف", "لما الطلاب متحمسين، الحصة تصير أسهل على المعلم والإرهاق يقل."],
              ["معلمين يكملون", "المعلم اللي يستمتع بتدريسه يكمل معكم، وهذا يوفر عليكم البحث والتدريب من جديد كل سنة."],
            ],
          },
        ] as Gain[],

        startKicker: "كيف تبدأ",
        startTitle: "ابدأ صغير، وشوف بنفسك",
        steps: [
          ["نبدأ بصف واحد", "نختار معكم صف أو مادة، ونجهّز المعلمين في يوم واحد."],
          ["تشوفون النتيجة", "كم أسبوع من اللعب، مع تقارير توضح التفاعل والفهم."],
          ["تعمّمونها", "إذا عجبتكم، نفعّل نفلها لكل المدرسة ونتابع معكم."],
        ],

        ctaTitle: "خلّ مدرستك هي اللي يسولفون عنها",
        ctaSub: "قل لنا عن مدرستك وعدد الفصول، ونرجع لك خلال يوم عمل.",
      }
    : {
        kicker: "FOR SCHOOLS",
        title: "A school students love, and parents choose",
        sub: "Parents choose a school from what their kids tell them at dinner. nefelha gives your students something to talk about every day, and gives you the numbers to show that the lesson really changed.",
        cta: "Book a trial for your school",
        bubbles: ["Mom, we beat class B today!", "Zombies game tomorrow, don't let me miss it", "Our teacher had us build a tower over lava"],

        gainsKicker: "WHAT YOUR SCHOOL GETS",
        gainsTitle: "More than a fun lesson",
        gains: [
          {
            word: "Enrollment",
            title: "Students who stay, parents who renew",
            points: [
              ["A student who loves school stays", "A happy student means a parent who renews, enrolls the siblings, and recommends you to others."],
              ["A low cost to start", "No new devices and no apps. It runs in the browser on the projector you already have, and classrooms without phones play on a printed board with one phone."],
              ["Fewer prep hours", "The AI turns the lesson file into questions in minutes, so teachers spend their time on students, not paperwork."],
            ],
          },
          {
            word: "Reputation",
            title: "Your school's name on everyone's lips",
            points: [
              ["An open day that sells itself", "A visiting parent sees a live game on the screen and a whole class lit up. That convinces more than any brochure."],
              ["A school ahead of the rest", "Modern, Arabic-first classroom tech, in the direction of Vision 2030. That sets you apart from schools on the same old system."],
              ["Free marketing", "Students go home talking about Lava Floor and Crypto Rush, and that is the most honest ad there is."],
            ],
          },
          {
            word: "Results",
            title: "Numbers you can show",
            points: [
              ["A report after every game", "Per student and per question. Bring it to parent meetings or school evaluations instead of general claims."],
              ["Know who needs follow-up", "The analytics page shows struggling students and the hardest questions, before exams, not after."],
            ],
          },
          {
            word: "Teachers",
            title: "Teachers at ease, who stay",
            points: [
              ["An engaged class, a lighter lesson", "When students are excited, the lesson gets easier on the teacher and burnout drops."],
              ["Teachers who stay", "A teacher who enjoys teaching stays with you, which saves you hiring and training again every year."],
            ],
          },
        ] as Gain[],

        startKicker: "HOW TO START",
        startTitle: "Start small, see it yourself",
        steps: [
          ["Start with one class", "We pick a class or subject with you and get the teachers ready in a day."],
          ["See the results", "A few weeks of play, with reports showing engagement and understanding."],
          ["Roll it out", "If you like it, we turn nefelha on for the whole school and stay with you."],
        ],

        ctaTitle: "Make your school the one they talk about",
        ctaSub: "Tell us about your school and how many classes you have, and we'll get back to you within a business day.",
      };

  const num = (i: number) => (isAr ? ["١", "٢", "٣", "٤"][i] : `0${i + 1}`);

  return (
    <div
      className="relative isolate overflow-x-clip min-h-screen w-full"
      style={{ background: "#F3E7C9", fontFamily: "'Outfit', 'Almarai', system-ui, sans-serif" }}
    >
      <Seo
        path="/schools"
        titleAr="نفلها للمدارس — مدرسة يحبها الطالب ويختارها أهله"
        titleEn="nefelha for Schools — A School Students Love and Parents Choose"
        descriptionAr="وش تكسب مدرستك من نفلها: طلاب يكملون وأهالي يجددون، سمعة تميزكم، تقارير تقدرون تعرضونها، ومعلمين مرتاحين. ابدأ بتجربة على صف واحد."
        descriptionEn="What your school gets from nefelha: students who stay and parents who renew, a reputation that sets you apart, reports you can show, and teachers at ease. Start with a trial in one class."
      />
      <PageShapes />
      <SiteNav />

      {/* ---------------- HERO ---------------- */}
      <section className="wrap relative px-5 sm:px-8 md:px-14 pt-10 sm:pt-16 pb-16 sm:pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] gap-12 lg:gap-16 items-center">
          <div>
            <span className={`text-[12px] font-semibold ${isAr ? "tracking-normal" : "tracking-[0.25em]"}`} style={{ color: SLATE }}>{t.kicker}</span>
            <h1 className="mt-3 leading-[1.1] tracking-tight text-[34px] sm:text-[48px]" style={{ fontFamily: DISPLAY, color: SLATE, textWrap: "balance" }}>
              {t.title}
            </h1>
            <p className="mt-5 max-w-xl text-[16px] sm:text-[17px] leading-relaxed text-black/65">{t.sub}</p>
            <Link
              to="/contact"
              className="mt-8 inline-flex items-center gap-2 rounded-full px-6 py-3 text-[15px] font-semibold text-white transition-transform hover:-translate-y-0.5"
              style={{ background: INK }}
            >
              {t.cta}
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
          <Bubbles lines={t.bubbles} />
        </div>
      </section>

      {/* ---------------- WHAT THE SCHOOL GETS ---------------- */}
      {/* One row per gain: a huge word on one side, the points on the other,
          rows split by hairlines. */}
      <section className="relative z-10">
        <svg aria-hidden viewBox="0 0 1440 72" preserveAspectRatio="none" className="relative block w-full h-[48px] sm:h-[64px] -mb-px">
          <path fill={TEAL} d="M0 44C220 6 470 64 760 30C1010 2 1240 8 1440 26V72H0Z" />
        </svg>
        <div className="px-5 sm:px-8 md:px-14 py-14 sm:py-20 text-white" style={{ background: TEAL }}>
          <div className="wrap">
            <span className={`text-[12px] font-semibold ${isAr ? "tracking-normal" : "tracking-[0.25em]"}`} style={{ color: SAND }}>{t.gainsKicker}</span>
            <h2 className="mt-3 text-[30px] sm:text-[44px] tracking-tight leading-[1.1]" style={{ fontFamily: DISPLAY }}>{t.gainsTitle}</h2>

            <div className="mt-10 sm:mt-14">
              {t.gains.map((g, i) => (
                <div key={g.word} className="grid grid-cols-1 lg:grid-cols-[minmax(0,22rem)_minmax(0,1fr)] gap-6 lg:gap-16 py-10 sm:py-12 border-t border-white/20">
                  <div>
                    <span className="text-[13px] font-semibold" style={{ color: SAND }}>{num(i)}</span>
                    <p className="mt-1 text-[44px] sm:text-[60px] leading-none tracking-tight" style={{ fontFamily: DISPLAY, color: i % 2 ? SAND : LIME }}>{g.word}</p>
                    <p className="mt-4 text-[18px] sm:text-[20px] font-semibold leading-snug">{g.title}</p>
                  </div>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-7 lg:pt-2">
                    {g.points.map(([head, body]) => (
                      <li key={head}>
                        <div className="h-1 w-8 rounded-full" style={{ background: LIME }} />
                        <h3 className="mt-3 text-[16px] sm:text-[17px] font-semibold">{head}</h3>
                        <p className="mt-1.5 text-[14.5px] leading-relaxed text-white/75">{body}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
        <svg aria-hidden viewBox="0 0 1440 72" preserveAspectRatio="none" className="relative block w-full h-[48px] sm:h-[64px] -mt-px">
          <path fill={TEAL} d="M0 0H1440V36C1200 70 960 14 690 46C430 74 200 64 0 30Z" />
        </svg>
      </section>

      {/* ---------------- HOW TO START ---------------- */}
      <section className="wrap px-5 sm:px-8 md:px-14 pt-14 sm:pt-20 pb-16 sm:pb-24">
        <span className={`text-[12px] font-semibold ${isAr ? "tracking-normal" : "tracking-[0.25em]"}`} style={{ color: TEAL }}>{t.startKicker}</span>
        <h2 className="mt-3 text-[30px] sm:text-[44px] tracking-tight leading-[1.1]" style={{ fontFamily: DISPLAY, color: SLATE }}>{t.startTitle}</h2>
        <ol className="mt-10 sm:mt-14 grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12">
          {t.steps.map(([head, body], i) => (
            <li key={head} className="border-t-2 pt-6" style={{ borderColor: i === 0 ? LIME : "rgba(0,0,0,0.12)" }}>
              <span className="text-[44px] leading-none font-extrabold" style={{ color: i === 0 ? TEAL : "rgba(43,63,69,0.35)", fontFamily: "'Outfit', 'Almarai', sans-serif" }}>{num(i)}</span>
              <h3 className="mt-4 text-[19px] sm:text-[21px] font-semibold" style={{ color: SLATE }}>{head}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-black/65">{body}</p>
            </li>
          ))}
        </ol>

        {/* the footer already carries the big lime CTA, so the school ask stays a line here */}
        <div className="mt-14 sm:mt-16 pt-8 border-t border-black/10 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div>
            <p className="text-[22px] sm:text-[28px] leading-tight" style={{ fontFamily: DISPLAY, color: SLATE }}>{t.ctaTitle}</p>
            <p className="mt-2 text-[15px] text-black/60">{t.ctaSub}</p>
          </div>
          <Link
            to="/contact"
            className="shrink-0 inline-flex items-center gap-2 self-start sm:self-auto rounded-full px-6 py-3 text-[15px] font-semibold text-white transition-transform hover:-translate-y-0.5"
            style={{ background: INK }}
          >
            {t.cta}
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
};

/* What kids say at home: three speech bubbles, staggered, flat colors. */
const Bubbles = ({ lines }: { lines: string[] }) => {
  const styles = [
    { bg: "#FFFFFF", fg: SLATE, cls: "self-start", tail: "start" },
    { bg: LIME, fg: INK, cls: "self-end", tail: "end" },
    { bg: TEAL, fg: "#FFFFFF", cls: "self-start ms-6 sm:ms-12", tail: "start" },
  ] as const;
  return (
    <div className="relative mx-auto w-full max-w-md flex flex-col gap-5 py-4">
      <svg aria-hidden viewBox="0 0 120 120" className="absolute -z-10 inset-x-[8%] top-[6%] w-[84%]">
        <path fill={SAND} d="M64 6C94 8 116 34 112 66C108 98 82 116 52 112C22 108 4 84 8 56C12 26 34 4 64 6Z" />
      </svg>
      {lines.map((line, i) => {
        const s = styles[i % styles.length];
        return (
          <div key={line} className={`relative max-w-[85%] ${s.cls}`}>
            <p
              className={`rounded-[22px] px-5 py-3.5 text-[16px] sm:text-[17px] font-semibold leading-snug ${s.tail === "start" ? "rounded-es-md" : "rounded-ee-md"}`}
              style={{ background: s.bg, color: s.fg }}
            >
              {line}
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default Schools;

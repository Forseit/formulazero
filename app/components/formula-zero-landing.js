"use client";

import Image from "next/image";
import { useRef, useState, useTransition } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const navigationLinks = [
  { href: "#hero", label: "Манифест" },
  { href: "#features", label: "Техника" },
  { href: "#media", label: "Ритм лиги" },
  { href: "#feedback", label: "Контакт" }
];

const marqueeItems = [
  "Michelin-spec traction",
  "Carbon monocoque",
  "Manual acceleration",
  "Manual braking",
  "Night circuit energy",
  "Closed league access"
];

const bentoCards = [
  {
    title: "Траектория строится не мотором, а телом пилота.",
    description:
      "Formula 0 переводит ручной привод в формат ночной лиги, где Michelin держит покрытие, а карбоновый кокпит выдерживает жесткий темп каждого круга.",
    mediaType: "image",
    mediaSrc: "/media/formula-zero-track-sparks.png",
    mediaAlt: "Dynamic Formula 0 racing wheelchair sliding on a circuit with sparks.",
    layout: "md:col-span-2 md:row-span-2",
    tone: "from-zinc-950/85 via-zinc-950/50 to-transparent"
  },
  {
    title: "Michelin берет на себя перегрев, дым и зацеп.",
    description:
      "Сlick-ориентированный состав рассчитан на короткие агрессивные сессии и чистую реакцию при резком ручном торможении.",
    mediaType: "image",
    mediaSrc: "/media/formula-zero-michelin-smoke.png",
    mediaAlt: "Close-up of Michelin tire smoke on a Formula 0 wheelchair.",
    layout: "md:col-span-1 md:row-span-2",
    tone: "from-zinc-950/88 via-zinc-950/58 to-transparent"
  },
  {
    title: "Двойной рычаг дает чистый manual feel.",
    description:
      "Раздельные рычаги ускорения и торможения оставляют пилоту полный тактильный контроль без электроусилителей и программных фильтров.",
    mediaType: "image",
    mediaSrc: "/media/formula-zero-brake-levers.png",
    mediaAlt: "Close-up of manual acceleration and brake levers on a Formula 0 wheelchair.",
    layout: "md:col-span-1 md:row-span-2",
    tone: "from-zinc-950/88 via-zinc-950/60 to-transparent"
  },
  {
    title: "Карбон не декорирует конструкцию, а становится ее силовой логикой.",
    description:
      "Силовые узлы, спицы и несущая геометрия проектируются вокруг низкой массы, точной жесткости и мгновенного отклика на импульс пилота.",
    mediaType: "image",
    mediaSrc: "/media/formula-zero-accel-rig.png",
    mediaAlt: "Carbon wheel structure and acceleration lever system for Formula 0.",
    layout: "md:col-span-2 md:row-span-2",
    tone: "from-zinc-950/85 via-zinc-950/52 to-transparent"
  },
  {
    title: "Визуальный след лиги виден раньше, чем звучит старт.",
    description:
      "Шина прогревается, дым рвет тишину, а механика выходит на передний план без единой электрической подсказки.",
    mediaType: "video",
    mediaSrc: "/media/formula-zero-tire-smoke.mp4",
    mediaAlt: "Formula 0 tire smoke video loop.",
    layout: "md:col-span-2 md:row-span-2",
    tone: "from-zinc-950/86 via-zinc-950/46 to-transparent"
  }
];

const accordionItems = [
  {
    title: "Night Sprint Sessions",
    body:
      "Короткие городские или стадионные сессии, где темп поднимается за счет света, дыма и ручной агрессии в каждом входе в поворот.",
    image: "/media/formula-zero-hero.png",
    alt: "Formula 0 hero shot at night."
  },
  {
    title: "Michelin Control Lab",
    body:
      "Показ техники строится вокруг теплового поведения покрышки, трения и того, как пилот дозирует нагрузку только руками.",
    image: "/media/formula-zero-michelin-compound.png",
    alt: "Michelin compound close-up on Formula 0 racing tire."
  },
  {
    title: "Representative Briefing",
    body:
      "Приватный разговор для промоутеров, треков и брендов, которым нужен новый формат спортивного зрелища с высокой визуальной ценностью.",
    image: "/media/formula-zero-representative.png",
    alt: "Portrait of Formula 0 representative."
  }
];

const desireCards = [
  {
    title: "The smoke roll",
    text:
      "Видео не имитирует мощность, а показывает физику ручной подачи и то, как состав Michelin работает под нагрузкой.",
    mediaType: "video",
    mediaSrc: "/media/formula-zero-tire-smoke.mp4",
    mediaAlt: "Tire smoke video from Formula 0.",
    height: "lg:h-[72vh]"
  },
  {
    title: "The contact patch",
    text:
      "Крупный макро-ракурс превращает покрышку в главный визуальный объект лиги: трение, дым и фактура материала работают как айдентика.",
    mediaType: "image",
    mediaSrc: "/media/formula-zero-michelin-compound.png",
    mediaAlt: "Close-up of Michelin tire compound.",
    height: "lg:h-[56vh]"
  },
  {
    title: "The representative line",
    text:
      "Форма ниже ведет в закрытый контур представительства, где обсуждаются показательные заезды, партнерские активации и запуск событийного формата.",
    mediaType: "image",
    mediaSrc: "/media/formula-zero-representative.png",
    mediaAlt: "Portrait for Formula 0 representative line.",
    height: "lg:h-[48vh]"
  }
];

const interestOptions = [
  "Показательный этап",
  "Партнерская интеграция",
  "Трековый запуск",
  "Медиазапрос"
];

const initialFormState = {
  name: "",
  email: "",
  organization: "",
  interest: interestOptions[0],
  message: ""
};

function MediaFrame({ type, src, alt, priority = false, sizes = "100vw", videoPoster }) {
  if (type === "video") {
    return (
      <video
        autoPlay
        className="h-full w-full object-cover"
        loop
        muted
        playsInline
        poster={videoPoster}
      >
        <source src={src} type="video/mp4" />
      </video>
    );
  }

  return (
    <Image
      alt={alt}
      className="h-full w-full object-cover"
      fill
      priority={priority}
      sizes={sizes}
      src={src}
    />
  );
}

export default function FormulaZeroLanding() {
  const scope = useRef(null);
  const [activeAccordion, setActiveAccordion] = useState(0);
  const [formState, setFormState] = useState(initialFormState);
  const [status, setStatus] = useState({ type: "idle", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isPending, startTransition] = useTransition();

  useGSAP(
    () => {
      const revealItems = gsap.utils.toArray(".js-reveal");
      revealItems.forEach((item) => {
        gsap.fromTo(
          item,
          { y: 56, opacity: 0.45, scale: 0.985 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 1.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: item,
              start: "top 84%"
            }
          }
        );
      });

      const scrollCards = gsap.utils.toArray(".js-scroll-card");
      scrollCards.forEach((card) => {
        gsap.fromTo(
          card,
          { scale: 0.86, opacity: 0.48, filter: "brightness(0.76)" },
          {
            scale: 1,
            opacity: 1,
            filter: "brightness(1)",
            ease: "none",
            scrollTrigger: {
              trigger: card,
              start: "top 86%",
              end: "bottom 18%",
              scrub: true
            }
          }
        );

        gsap.to(card, {
          opacity: 0.34,
          filter: "brightness(0.62)",
          ease: "none",
          scrollTrigger: {
            trigger: card,
            start: "center center",
            end: "bottom top",
            scrub: true
          }
        });
      });

      ScrollTrigger.refresh();

      return () => {
        ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      };
    },
    { scope }
  );

  function handleSectionScroll(event, sectionId) {
    event.preventDefault();

    const section = document.getElementById(sectionId);

    if (!section) {
      return;
    }

    section.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });

    window.history.replaceState(null, "", `#${sectionId}`);
  }

  function handleInputChange(event) {
    const { name, value } = event.target;

    setFormState((currentState) => ({
      ...currentState,
      [name]: value
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    setStatus({ type: "idle", message: "" });
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formState)
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Не удалось отправить запрос.");
      }

      setFormState(initialFormState);

      startTransition(() => {
        setStatus({
          type: "success",
          message: result.message
        });
      });
    } catch (error) {
      startTransition(() => {
        setStatus({
          type: "error",
          message:
            error instanceof Error
              ? error.message
              : "Сервис формы временно недоступен. Повторите попытку позже."
        });
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main
      className="page-shell overflow-x-hidden w-full max-w-full bg-zinc-950 text-zinc-100"
      ref={scope}
    >
      <header className="fixed inset-x-0 top-5 z-50 px-4 sm:px-6">
        <div className="mx-auto max-w-7xl">
          <div className="glass-panel flex items-center justify-between rounded-full px-4 py-3 sm:px-6">
            <a
              className="flex items-center gap-3 text-sm font-medium tracking-[0.28em] text-zinc-100 transition-opacity duration-300 hover:opacity-75"
              href="#hero"
            >
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/12 bg-white/6 text-[0.7rem] tracking-[0.3em] text-[rgb(var(--accent-strong))]">
                F0
              </span>
              <span className="hidden text-[0.72rem] uppercase sm:inline">
                Formula 0
              </span>
            </a>

            <nav className="hidden items-center gap-7 lg:flex">
              {navigationLinks.map((link) => (
                <a
                  className="text-sm text-zinc-300 transition-colors duration-300 hover:text-white"
                  href={link.href}
                  key={link.href}
                  onClick={(event) => handleSectionScroll(event, link.href.slice(1))}
                >
                  {link.label}
                </a>
              ))}
            </nav>

            <a
              className="accent-button rounded-full px-5 py-3 text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5"
              href="#feedback"
              onClick={(event) => handleSectionScroll(event, "feedback")}
            >
              Связаться с представительством
            </a>
          </div>
        </div>
      </header>

      <section
        className="relative scroll-mt-28 overflow-hidden pb-32 pt-36 md:scroll-mt-32 md:pb-40 md:pt-44 xl:pb-48"
        id="hero"
      >
        <div className="absolute inset-x-0 top-20 mx-auto h-[38rem] max-w-[90rem] rounded-full bg-[radial-gradient(circle,_rgba(121,149,166,0.24),_transparent_56%)] blur-3xl" />

        <div className="relative mx-auto grid max-w-[1600px] gap-10 px-6 sm:px-8 lg:grid-cols-12 lg:gap-8 lg:px-10">
          <div className="js-reveal lg:col-span-7 lg:pr-8">
            <p className="mb-6 text-sm uppercase tracking-[0.32em] text-[rgb(var(--accent-strong))]">
              Официальное представительство Formula 0
            </p>

            <h1 className="max-w-6xl font-display text-[clamp(3rem,5vw,5.5rem)] font-semibold leading-[0.94] tracking-[-0.04em] text-white">
              <span className="block">Формула 0 превращает</span>
              <span className="block">
                ручной{" "}
                <span className="pill-image relative mx-2 inline-flex h-14 w-28 translate-y-1 align-middle rounded-full sm:h-16 sm:w-32">
                  <Image
                    alt="Formula 0 inline racing image."
                    className="object-cover"
                    fill
                    priority
                    sizes="128px"
                    src="/media/formula-zero-track-sparks.png"
                  />
                </span>
                привод
              </span>
              <span className="block">в новую элиту гонок.</span>
            </h1>

            <p className="mt-8 max-w-2xl text-lg leading-8 text-zinc-300 sm:text-xl">
              Экстремальная лига на high-tech wheelchairs с Michelin tires, карбоновым
              монококом и механическими рычагами ускорения и торможения. Никакой
              электроники между пилотом и покрытием.
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <a
                className="accent-button inline-flex items-center justify-center rounded-full px-7 py-4 text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5"
                href="#feedback"
                onClick={(event) => handleSectionScroll(event, "feedback")}
              >
                Запросить разговор
              </a>
              <a
                className="accent-outline inline-flex items-center justify-center rounded-full px-7 py-4 text-sm font-semibold text-zinc-100 transition-all duration-300 hover:-translate-y-0.5 hover:border-white/20 hover:bg-white/6"
                href="#features"
                onClick={(event) => handleSectionScroll(event, "features")}
              >
                Смотреть технику лиги
              </a>
            </div>
          </div>

          <div className="js-reveal relative lg:col-span-5">
            <div className="glass-panel relative ml-auto overflow-hidden rounded-[2rem] p-3 shadow-ambient lg:w-[92%]">
              <div className="relative h-[32rem] overflow-hidden rounded-[1.6rem] sm:h-[38rem]">
                <MediaFrame
                  alt="Formula 0 hero wheelchair at night."
                  priority
                  sizes="(min-width: 1024px) 42vw, 100vw"
                  src="/media/formula-zero-hero.png"
                  type="image"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/32 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-7">
                  <p className="max-w-sm text-sm uppercase tracking-[0.32em] text-[rgb(var(--accent-strong))]">
                    Michelin traction. Carbon precision. Manual force.
                  </p>
                </div>
              </div>
            </div>

            <div className="glass-panel absolute -bottom-8 -left-2 w-[58%] overflow-hidden rounded-[1.8rem] p-3 sm:-left-6">
              <div className="relative h-48 overflow-hidden rounded-[1.35rem] sm:h-56">
                <MediaFrame
                  alt="Formula 0 tire smoke video."
                  sizes="(min-width: 1024px) 24vw, 55vw"
                  src="/media/formula-zero-tire-smoke.mp4"
                  type="video"
                  videoPoster="/media/formula-zero-michelin-smoke.png"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 p-4">
                  <p className="text-xs uppercase tracking-[0.28em] text-zinc-200">
                    Smoke test loop
                  </p>
                </div>
              </div>
            </div>

            <div className="absolute -right-2 top-12 hidden w-44 rounded-[1.6rem] border border-white/10 bg-black/30 p-4 backdrop-blur-xl lg:block">
              <p className="text-xs uppercase tracking-[0.3em] text-[rgb(var(--accent-strong))]">
                Pure manual control
              </p>
              <p className="mt-3 text-sm leading-6 text-zinc-300">
                Гонка читается руками, а не софтом.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="relative pb-8">
        <div className="mx-auto max-w-[1600px] overflow-hidden border-y border-white/10">
          <div className="marquee-track flex min-w-max gap-4 py-4">
            {[...marqueeItems, ...marqueeItems].map((item, index) => (
              <div
                className="rounded-full border border-white/10 bg-white/4 px-5 py-3 text-sm uppercase tracking-[0.28em] text-zinc-300"
                key={`${item}-${index}`}
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        className="section-frame scroll-mt-28 py-32 md:scroll-mt-32 md:py-40 xl:py-48"
        id="features"
      >
        <div className="mx-auto max-w-7xl px-6 sm:px-8">
          <div className="js-reveal max-w-3xl">
            <p className="text-sm uppercase tracking-[0.32em] text-[rgb(var(--accent-strong))]">
              Техника, из которой строится зрелище
            </p>
            <h2 className="mt-4 font-display text-4xl font-semibold tracking-[-0.04em] text-white sm:text-5xl">
              Плотный бенто-блок собирает Michelin, карбон и рычаги в одну систему.
            </h2>
            <p className="mt-5 text-lg leading-8 text-zinc-300">
              На десктопе сетка занимает точную матрицу 4x4 без пустот. Каждый модуль
              работает как вход в разговор с представителем и реагирует на курсор без
              дешевой анимационной мишуры.
            </p>
          </div>

          <div className="mt-14 grid grid-cols-1 gap-4 md:auto-rows-[15rem] md:grid-cols-4 md:grid-flow-dense">
            {bentoCards.map((card) => (
              <a
                className={`js-reveal group glass-panel relative overflow-hidden rounded-[2rem] p-3 transition-transform duration-700 ease-out hover:-translate-y-1 ${card.layout}`}
                href="#feedback"
                key={card.title}
                onClick={(event) => handleSectionScroll(event, "feedback")}
              >
                <div className="relative h-full overflow-hidden rounded-[1.6rem]">
                  <div className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-105">
                    <MediaFrame
                      alt={card.mediaAlt}
                      sizes="(min-width: 768px) 50vw, 100vw"
                      src={card.mediaSrc}
                      type={card.mediaType}
                      videoPoster="/media/formula-zero-track-sparks.png"
                    />
                  </div>
                  <div
                    className={`absolute inset-0 bg-gradient-to-t ${card.tone}`}
                  />
                  <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
                    <p className="max-w-[26rem] font-display text-2xl font-semibold tracking-[-0.03em] text-white">
                      {card.title}
                    </p>
                    <p className="mt-3 max-w-[30rem] text-sm leading-7 text-zinc-300 sm:text-base">
                      {card.description}
                    </p>
                    <span className="mt-5 inline-flex rounded-full border border-white/12 bg-black/25 px-4 py-2 text-xs uppercase tracking-[0.3em] text-zinc-100">
                      Перейти к запросу
                    </span>
                  </div>
                </div>
              </a>
            ))}
          </div>

          <div className="mt-20 js-reveal">
            <div className="mb-8 max-w-2xl">
              <h3 className="font-display text-3xl font-semibold tracking-[-0.04em] text-white sm:text-4xl">
                Горизонтальные панели объясняют, как лига входит в событие, бренд и
                трековый календарь.
              </h3>
            </div>

            <div className="flex flex-col gap-4 md:h-[34rem] md:flex-row">
              {accordionItems.map((item, index) => {
                const isActive = activeAccordion === index;

                return (
                  <button
                    className={`group glass-panel relative overflow-hidden rounded-[2rem] text-left transition-[flex,transform] duration-700 ease-out md:flex-1 ${
                      isActive ? "md:flex-[1.45]" : "md:flex-[0.78]"
                    }`}
                    key={item.title}
                    onClick={() => setActiveAccordion(index)}
                    onFocus={() => setActiveAccordion(index)}
                    onMouseEnter={() => setActiveAccordion(index)}
                    type="button"
                  >
                    <div className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-105">
                      <div className="relative h-full w-full">
                        <MediaFrame
                          alt={item.alt}
                          sizes="(min-width: 768px) 33vw, 100vw"
                          src={item.image}
                          type="image"
                        />
                      </div>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/45 to-transparent" />
                    <div className="relative flex h-full flex-col justify-end p-6 sm:p-7">
                      <p className="text-xs uppercase tracking-[0.32em] text-[rgb(var(--accent-strong))]">
                        {index === 0 ? "Launch format" : index === 1 ? "Performance focus" : "Direct access"}
                      </p>
                      <p className="mt-4 font-display text-2xl font-semibold tracking-[-0.03em] text-white">
                        {item.title}
                      </p>
                      <p
                        className={`mt-4 max-w-md text-sm leading-7 text-zinc-300 transition-all duration-500 sm:text-base ${
                          isActive
                            ? "translate-y-0 opacity-100"
                            : "translate-y-4 opacity-0 md:pointer-events-none"
                        }`}
                      >
                        {item.body}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section
        className="js-desire section-frame scroll-mt-28 py-32 md:scroll-mt-32 md:py-40 xl:py-48"
        id="media"
      >
        <div className="mx-auto grid max-w-7xl gap-12 px-6 sm:px-8 lg:grid-cols-11 lg:gap-8">
          <div className="lg:col-span-4 lg:self-start">
            <div className="js-pin-title lg:sticky lg:top-28">
              <div className="js-reveal max-w-md rounded-[2rem] border border-white/10 bg-white/4 p-8 backdrop-blur-xl">
                <p className="text-sm uppercase tracking-[0.32em] text-[rgb(var(--accent-strong))]">
                  ScrollTrigger sequence
                </p>
                <h2 className="mt-5 font-display text-4xl font-semibold tracking-[-0.04em] text-white">
                  Слева остается мысль, справа раскрывается физика Formula 0.
                </h2>
                <p className="mt-5 text-base leading-8 text-zinc-300">
                  Заголовок пинится при скролле, а медиа-карты справа появляются через
                  плавный рост масштаба и уходят в затемнение. Это не декоративный
                  эффект, а часть ощущения лиги.
                </p>
                <a
                  className="accent-button mt-8 inline-flex rounded-full px-6 py-4 text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5"
                  href="#feedback"
                  onClick={(event) => handleSectionScroll(event, "feedback")}
                >
                  Открыть линию представителя
                </a>
              </div>
            </div>
          </div>

          <div className="space-y-8 lg:col-span-7">
            {desireCards.map((card) => (
              <article
                className={`js-scroll-card glass-panel overflow-hidden rounded-[2rem] p-3 ${card.height}`}
                key={card.title}
              >
                <div className="relative flex h-full flex-col overflow-hidden rounded-[1.6rem]">
                  <div className="absolute inset-0">
                    <MediaFrame
                      alt={card.mediaAlt}
                      sizes="(min-width: 1024px) 56vw, 100vw"
                      src={card.mediaSrc}
                      type={card.mediaType}
                      videoPoster="/media/formula-zero-michelin-smoke.png"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/36 to-transparent" />
                  <div className="relative mt-auto p-7 sm:p-8">
                    <p className="text-xs uppercase tracking-[0.32em] text-[rgb(var(--accent-strong))]">
                      {card.title}
                    </p>
                    <p className="mt-4 max-w-2xl font-display text-3xl font-semibold tracking-[-0.04em] text-white">
                      {card.text}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        className="section-frame scroll-mt-28 py-32 md:scroll-mt-32 md:py-40 xl:py-48"
        id="feedback"
      >
        <div className="mx-auto max-w-7xl px-6 sm:px-8">
          <div className="js-reveal max-w-5xl">
            <p className="text-sm uppercase tracking-[0.32em] text-[rgb(var(--accent-strong))]">
              Закрытый контакт с представительством
            </p>
            <h2 className="mt-4 font-display text-[clamp(2.75rem,5vw,5.25rem)] font-semibold leading-[0.96] tracking-[-0.05em] text-white">
              Запросите разговор о запуске Formula 0 на вашем треке, в бренде или в
              событийной программе.
            </h2>
          </div>

          <div className="mt-14 grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
            <div className="js-reveal glass-panel accent-surface overflow-hidden rounded-[2rem] p-3">
              <div className="grid h-full gap-6 rounded-[1.6rem] border border-white/6 bg-black/18 p-6 sm:p-7">
                <div className="relative overflow-hidden rounded-[1.5rem]">
                  <div className="relative h-[28rem]">
                    <MediaFrame
                      alt="Official Formula 0 representative portrait."
                      sizes="(min-width: 1024px) 42vw, 100vw"
                      src="/media/formula-zero-representative.png"
                      type="image"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/10 to-transparent" />
                </div>

                <div>
                  <p className="text-xs uppercase tracking-[0.32em] text-[rgb(var(--accent-strong))]">
                    Direct representative line
                  </p>
                  <p className="mt-4 font-display text-3xl font-semibold tracking-[-0.04em] text-white">
                    Здесь обсуждаются шоу-заезды, закрытые презентации, интеграции и
                    запуск Formula 0 как нового зрелищного формата.
                  </p>
                  <div className="mt-8 grid gap-3 text-sm leading-7 text-zinc-200">
                    <div className="rounded-2xl border border-white/10 bg-black/18 px-4 py-3">
                      Демонстрационные ночные сессии с визуальным пакетом под бренд или
                      площадку.
                    </div>
                    <div className="rounded-2xl border border-white/10 bg-black/18 px-4 py-3">
                      Партнерские запуски для треков, фестивалей, технологических
                      кампаний и private showcases.
                    </div>
                    <div className="rounded-2xl border border-white/10 bg-black/18 px-4 py-3">
                      Ответная линия работает через форму и фиксирует входящий запрос в
                      локальном контуре сайта.
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="js-reveal glass-panel rounded-[2rem] p-3">
              <div className="rounded-[1.6rem] border border-white/8 bg-black/18 p-6 sm:p-8">
                <div className="mb-8">
                  <p className="text-sm uppercase tracking-[0.32em] text-[rgb(var(--accent-strong))]">
                    Feedback form
                  </p>
                  <p className="mt-4 text-base leading-8 text-zinc-300">
                    Оставьте имя, контакт и контекст запроса. Ответ будет сохранен на
                    сервере и готов для дальнейшей обработки представителем.
                  </p>
                </div>

                <form className="grid gap-5" onSubmit={handleSubmit}>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <label className="grid gap-2 text-sm text-zinc-200">
                      <span>Имя</span>
                      <input
                        className="input-shell"
                        name="name"
                        onChange={handleInputChange}
                        placeholder="Как к вам обращаться"
                        required
                        type="text"
                        value={formState.name}
                      />
                    </label>

                    <label className="grid gap-2 text-sm text-zinc-200">
                      <span>Email</span>
                      <input
                        className="input-shell"
                        name="email"
                        onChange={handleInputChange}
                        placeholder="you@company.com"
                        required
                        type="email"
                        value={formState.email}
                      />
                    </label>
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <label className="grid gap-2 text-sm text-zinc-200">
                      <span>Организация</span>
                      <input
                        className="input-shell"
                        name="organization"
                        onChange={handleInputChange}
                        placeholder="Трек, бренд или медиа"
                        type="text"
                        value={formState.organization}
                      />
                    </label>

                    <label className="grid gap-2 text-sm text-zinc-200">
                      <span>Интерес</span>
                      <select
                        className="input-shell appearance-none"
                        name="interest"
                        onChange={handleInputChange}
                        value={formState.interest}
                      >
                        {interestOptions.map((option) => (
                          <option className="bg-zinc-950 text-zinc-100" key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    </label>
                  </div>

                  <label className="grid gap-2 text-sm text-zinc-200">
                    <span>Сообщение</span>
                    <textarea
                      className="input-shell min-h-[10rem] resize-none"
                      name="message"
                      onChange={handleInputChange}
                      placeholder="Опишите площадку, формат активации, даты или медиазадачу."
                      required
                      value={formState.message}
                    />
                  </label>

                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <button
                      className="accent-button inline-flex items-center justify-center rounded-full px-7 py-4 text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
                      disabled={isSubmitting || isPending}
                      type="submit"
                    >
                      {isSubmitting ? "Отправляем запрос" : "Отправить запрос"}
                    </button>

                    <p className="text-sm leading-7 text-zinc-400">
                      Запрос сохраняется локально и остается доступным для дальнейшей
                      обработки.
                    </p>
                  </div>

                  {status.message ? (
                    <div
                      className={`rounded-2xl px-4 py-3 text-sm leading-7 ${
                        status.type === "success"
                          ? "border border-emerald-400/25 bg-emerald-400/12 text-emerald-100"
                          : "border border-rose-400/25 bg-rose-400/12 text-rose-100"
                      }`}
                    >
                      {status.message}
                    </div>
                  ) : null}
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-white/10 pb-10 pt-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 text-sm text-zinc-400 sm:px-8 md:flex-row md:items-center md:justify-between">
          <p>Formula 0. Extreme racing league built around Michelin traction and pure manual control.</p>
          <div className="flex flex-wrap gap-5">
            {navigationLinks.map((link) => (
              <a
                className="transition-colors duration-300 hover:text-zinc-100"
                href={link.href}
                key={link.href}
                onClick={(event) => handleSectionScroll(event, link.href.slice(1))}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </main>
  );
}

import { useEffect, useMemo, useRef, useState } from "react";

/**
 * ✅ Encontra o container real de scroll (window OU wrapper com overflow auto/scroll)
 */
function getScrollParent(node) {
  if (!node) return window;

  const isScrollable = (el) => {
    const st = getComputedStyle(el);
    const oy = st.overflowY;
    const ox = st.overflowX;
    const scrollY = oy === "auto" || oy === "scroll";
    const scrollX = ox === "auto" || ox === "scroll";
    return scrollY || scrollX;
  };

  let cur = node.parentElement;
  while (cur && cur !== document.body) {
    if (isScrollable(cur)) return cur;
    cur = cur.parentElement;
  }
  return window;
}

export default function ProgramasStickyScroll() {
  const sectionRef = useRef(null);

  // ✅ mobile detector (SEM alterar desktop)
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 980px)");
    const apply = () => setIsMobile(!!mq.matches);
    apply();

    if (mq.addEventListener) mq.addEventListener("change", apply);
    else mq.addListener(apply);

    return () => {
      if (mq.removeEventListener) mq.removeEventListener("change", apply);
      else mq.removeListener(apply);
    };
  }, []);

  // ✅ Fade in/out (reverso) quando entra/sai da seção
  const [revealed, setRevealed] = useState(false);

  // esquerda (fake-sticky)
  const leftWrapRef = useRef(null);
  const leftCardRef = useRef(null);
  const leftRaf = useRef(0);

  const cardRefs = useRef([]);
  const rafRef = useRef(0);
  const lastActiveRef = useRef(0);

  const [active, setActive] = useState(0);
  const [leftMode, setLeftMode] = useState("static"); // "static" | "fixed" | "absolute"
  const [leftStyle, setLeftStyle] = useState({}); // top/left/width

  const programs = useMemo(
    () => [
      {
        tag: "PROGRAMA 01",
        title: "Box",
        desc:
          "Projeto para crianças, jovens e adolescentes com interesse em boxe e inclusão social. Disciplina, respeito e evolução real.",
        icon: (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <path
              d="M9 10.5V8.8c0-1.6 1.3-2.8 2.8-2.8h.9c1.6 0 2.8 1.3 2.8 2.8v1.7"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
            />
            <path
              d="M6.8 11.2h10.4c.9 0 1.8.7 1.9 1.6l.7 6.1c.1 1.1-.7 2.1-1.9 2.1H6.1c-1.1 0-2-.9-1.9-2.1l.7-6.1c.1-.9.9-1.6 1.9-1.6Z"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinejoin="round"
            />
          </svg>
        ),
      },
      {
        tag: "PROGRAMA 02",
        title: "Barbearia",
        desc:
          "Formação prática com acompanhamento. Rotina, postura profissional e base para entrar no mercado com confiança.",
        icon: (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <path
              d="M7 4h10v5a5 5 0 0 1-10 0V4Z"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinejoin="round"
            />
            <path
              d="M9 20h6"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
            />
            <path
              d="M12 14v6"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
            />
          </svg>
        ),
      },
      {
        tag: "PROGRAMA 03",
        title: "Manicure",
        desc:
          "Capacitação completa, do básico ao atendimento. Um caminho direto para gerar renda com técnica e cuidado.",
        icon: (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <path
              d="M7 3l3 3-5 5-3-3 5-5Z"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinejoin="round"
            />
            <path
              d="M14 10l7 7-4 4-7-7 4-4Z"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinejoin="round"
            />
            <path
              d="M9.5 6.5l8 8"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
            />
          </svg>
        ),
      },
      {
        tag: "PROGRAMA 04",
        title: "Capoeira",
        desc:
          "Esporte + cultura: disciplina, musicalidade e pertencimento. Uma prática que fortalece corpo e mente.",
        icon: (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <path
              d="M12 3c2.5 0 4.5 2 4.5 4.5S14.5 12 12 12 7.5 10 7.5 7.5 9.5 3 12 3Z"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinejoin="round"
            />
            <path
              d="M6 21c1.2-4.2 4-6 6-6s4.8 1.8 6 6"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
            />
          </svg>
        ),
      },
      {
        tag: "PROGRAMA 05",
        title: "Tecnologia",
        desc:
          "Cursos e oficinas pra colocar a galera no jogo: lógica, ferramentas e projetos pra começar no digital.",
        icon: (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <path
              d="M8 3h8v4H8V3Z"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinejoin="round"
            />
            <path
              d="M6 7h12v10H6V7Z"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinejoin="round"
            />
            <path
              d="M9 20h6"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
            />
          </svg>
        ),
      },
      {
        tag: "PROGRAMA 06",
        title: "Música & Cultura",
        desc:
          "Acesso à cultura como caminho. Oficinas e vivências que desenvolvem expressão, confiança e identidade.",
        icon: (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <path
              d="M14 3v12.5a2.5 2.5 0 1 1-1.5-2.3V6h7V3h-5.5Z"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        ),
      },
    ],
    []
  );

  // ✅ Fade (com reverse) quando entra/sai - e repete ao voltar
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const scroller = getScrollParent(el);
    const root = scroller === window ? null : scroller;

    const obs = new IntersectionObserver(
      ([entry]) => setRevealed(entry.isIntersecting),
      { threshold: 0.18, root }
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  // ✅ ativa o card mais próximo do centro visual (sem pulo) — ouvindo o scroller real
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const scroller = getScrollParent(section);
    const target = scroller === window ? window : scroller;

    const getFocusY = () => {
      if (scroller === window) return window.innerHeight * 0.46;
      return scroller.getBoundingClientRect().height * 0.46;
    };

    const pickActive = () => {
      const els = cardRefs.current.filter(Boolean);
      if (!els.length) return;

      const focusY = getFocusY();

      let bestIdx = lastActiveRef.current;
      let bestDist = Infinity;

      for (let i = 0; i < els.length; i++) {
        const r = els[i].getBoundingClientRect();
        const mid = r.top + r.height * 0.5;
        const dist = Math.abs(mid - focusY);
        if (dist < bestDist) {
          bestDist = dist;
          bestIdx = i;
        }
      }

      if (bestIdx !== lastActiveRef.current) {
        lastActiveRef.current = bestIdx;
        setActive(bestIdx);
      }
    };

    const onScroll = () => {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(pickActive);
    };

    pickActive();
    target.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(rafRef.current);
      target.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [programs.length]);

  // ✅ sticky via JS (funciona mesmo com wrapper overflow hidden/auto/scroll)
  // ✅ NO MOBILE: desliga o sticky pra não sobrepor (desktop fica exatamente igual)
  useEffect(() => {
    if (isMobile) {
      setLeftMode("static");
      setLeftStyle({});
      return;
    }

    const section = sectionRef.current;
    const wrap = leftWrapRef.current;
    const card = leftCardRef.current;
    if (!section || !wrap || !card) return;

    const scroller = getScrollParent(section);

    const getScrollerRect = () => {
      if (scroller === window) {
        return {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight,
        };
      }
      const r = scroller.getBoundingClientRect();
      return { top: r.top, left: r.left, width: r.width, height: r.height };
    };

    const onScroll = () => {
      cancelAnimationFrame(leftRaf.current);
      leftRaf.current = requestAnimationFrame(() => {
        const wrapRect = wrap.getBoundingClientRect();
        const sectionRect = section.getBoundingClientRect();
        const scRect = getScrollerRect();
        const cardH = card.offsetHeight;

        // ✅ FIXA NO MEIO (não no topo)
        const centeredTop = scRect.top + (scRect.height - cardH) / 2;

        // ✅ trava alinhamento horizontal no wrapper (não “anda pro lado”)
        const wrapLeft = wrapRect.left;
        const wrapWidth = wrapRect.width;

        // ✅ limites da seção
        const withinSection =
          sectionRect.top <= centeredTop &&
          sectionRect.bottom >= centeredTop + cardH;

        // ✅ evita “subir mais do que devia” na volta
        const shouldFix = withinSection && wrapRect.top <= centeredTop;

        const reachedEnd = sectionRect.bottom < centeredTop + cardH;

        if (reachedEnd) {
          setLeftMode("absolute");
          setLeftStyle({});
          return;
        }

        if (shouldFix) {
          setLeftMode("fixed");
          setLeftStyle({
            top: centeredTop,
            left: wrapLeft,
            width: wrapWidth,
          });
          return;
        }

        setLeftMode("static");
        setLeftStyle({});
      });
    };

    const target = scroller === window ? window : scroller;
    target.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    onScroll();

    return () => {
      cancelAnimationFrame(leftRaf.current);
      target.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [isMobile]);

  const goInscricoes = () => {
    const el = document.getElementById("inscricoes");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const effectiveLeftMode = isMobile ? "static" : leftMode;

  return (
    <section
      id="programas"
      ref={sectionRef}
      className="nd_programas"
      style={{
        position: "relative",
        background: "#070707", // ✅ DESKTOP sem iluminação
        padding: "110px 18px",
      }}
    >
      {/* ✅ Fade wrapper SEM transform (pra não quebrar o fixed do lado esquerdo) */}
      <div className={`nd_reveal_wrap ${revealed ? "isOn" : ""}`}>
        {/* grid sutil */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            opacity: 0.06,
            pointerEvents: "none",
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.18) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.18) 1px, transparent 1px)",
            backgroundSize: "62px 62px",
            maskImage:
              "radial-gradient(circle at 45% 30%, black 0%, transparent 62%)",
            WebkitMaskImage:
              "radial-gradient(circle at 45% 30%, black 0%, transparent 62%)",
          }}
        />

        <div
          className="nd_prog_grid"
          style={{
            maxWidth: 1180,
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "0.95fr 1.05fr",
            gap: 28,
            alignItems: "start",
            position: "relative",
            zIndex: 2,
          }}
        >
          {/* LEFT WRAP */}
          <div
            ref={leftWrapRef}
            className="nd_left_wrap"
            style={{
              position: "relative",
              minHeight: "calc(100vh - 110px)",
            }}
          >
            {/* LEFT CARD (fixed/absolute/static) */}
            <div
              ref={leftCardRef}
              className="nd_left_card"
              style={{
                position:
                  effectiveLeftMode === "fixed"
                    ? "fixed"
                    : effectiveLeftMode === "absolute"
                    ? "absolute"
                    : "relative",
                top: effectiveLeftMode === "fixed" ? leftStyle.top : "auto",
                left: effectiveLeftMode === "fixed" ? leftStyle.left : "auto",
                width: effectiveLeftMode === "fixed" ? leftStyle.width : "auto",
                bottom: effectiveLeftMode === "absolute" ? 0 : "auto",
                zIndex: 10,
              }}
            >
              {/* ❌ ILUMINAÇÕES DO LADO ESQUERDO REMOVIDAS (as que acompanhavam o conteúdo) */}

              {/* conteúdo */}
              <div style={{ position: "relative", zIndex: 1, paddingTop: 10 }}>
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 10,
                    padding: "10px 14px",
                    borderRadius: 999,
                    border: "1px solid rgba(212,175,55,.25)",
                    background:
                      "linear-gradient(180deg, rgba(255,255,255,.06), rgba(255,255,255,.02))",
                    boxShadow:
                      "0 12px 32px rgba(0,0,0,.35), inset 0 0 0 1px rgba(255,255,255,.06)",
                    marginBottom: 18,
                  }}
                >
                  <span
                    style={{
                      width: 10,
                      height: 10,
                      borderRadius: 999,
                      background:
                        "linear-gradient(180deg, #f5d76e, #d4af37, #b8962e)",
                      boxShadow: "0 0 0 4px rgba(212,175,55,.16)",
                    }}
                  />
                  <span
                    style={{
                      color: "rgba(245,215,110,.95)",
                      fontWeight: 900,
                      letterSpacing: ".14em",
                      fontSize: 12,
                      textTransform: "uppercase",
                    }}
                  >
                    Nossos programas
                  </span>
                </div>

                <h2
                  className="nd_left_title"
                  style={{
                    margin: 0,
                    fontWeight: 950,
                    letterSpacing: "-0.03em",
                    lineHeight: 1.05,
                    fontSize: "clamp(2.2rem, 3.6vw, 3.3rem)",
                    color: "#f2f2f2",
                  }}
                >
                  Tudo o que você
                  <br />
                  vai encontrar
                  <br />
                  <span
                    style={{
                      background:
                        "linear-gradient(90deg, #f5d76e 0%, #d4af37 45%, #b8962e 100%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      filter: "drop-shadow(0 12px 30px rgba(212,175,55,.12))",
                    }}
                  >
                    no Instituto
                  </span>
                </h2>

                <p
                  className="nd_left_desc"
                  style={{
                    marginTop: 14,
                    marginBottom: 22,
                    maxWidth: 520,
                    color: "rgba(235,235,235,.72)",
                    lineHeight: 1.75,
                    fontSize: 15.5,
                  }}
                >
                  Conforme você desce, um programa fica claro e os outros
                  borrados — sem travar.
                </p>

                <button onClick={goInscricoes} className="nd_insc_btn">
                  <span className="nd_insc_pill" aria-hidden="true">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M12 21s-7-4.35-9.5-8.2C.4 9.1 2.6 6 6 6c1.9 0 3.3 1 4 2.05C10.7 7 12.1 6 14 6c3.4 0 5.6 3.1 3.5 6.8C19 16.65 12 21 12 21Z"
                        fill="rgba(0,0,0,.78)"
                      />
                    </svg>
                  </span>

                  <span className="nd_insc_txt">
                    <span className="nd_insc_kicker">Garanta sua vaga</span>
                    <span className="nd_insc_main">INSCRIÇÕES</span>
                  </span>
                </button>

                <div
                  className="nd_left_meta"
                  style={{
                    marginTop: 18,
                    display: "flex",
                    gap: 10,
                    alignItems: "center",
                    color: "rgba(235,235,235,.55)",
                    fontSize: 13,
                    flexWrap: "wrap",
                  }}
                >
                  <span
                    style={{
                      padding: "8px 10px",
                      borderRadius: 12,
                      border: "1px solid rgba(255,255,255,.10)",
                      background:
                        "linear-gradient(180deg, rgba(255,255,255,.06), rgba(255,255,255,.02))",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {programs[active]?.tag}
                  </span>

                  <span
                    style={{
                      color: "rgba(245,215,110,.90)",
                      fontWeight: 900,
                      whiteSpace: "nowrap",
                    }}
                  >
                    {programs[active]?.title}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <div className="nd_right" style={{ position: "relative" }}>
            <div style={{ display: "grid", gap: 18 }}>
              {programs.map((p, idx) => {
                const isActive = idx === active;

                return (
                  <article
                    key={p.title}
                    ref={(el) => (cardRefs.current[idx] = el)}
                    className={`nd_prog_card ${isActive ? "isActive" : ""}`}
                    style={{
                      position: "relative",
                      borderRadius: 24,
                      padding: "22px 22px 18px",
                      border: isActive
                        ? "1px solid rgba(245,215,110,.22)"
                        : "1px solid rgba(255,255,255,.10)",
                      background:
                        "linear-gradient(180deg, rgba(255,255,255,.06), rgba(255,255,255,.02))",
                      boxShadow: isActive
                        ? "0 34px 110px rgba(0,0,0,.55), 0 24px 70px rgba(212,175,55,.10), inset 0 0 0 1px rgba(255,255,255,.06)"
                        : "0 28px 80px rgba(0,0,0,.45), inset 0 0 0 1px rgba(255,255,255,.05)",
                      overflow: "hidden",

                      opacity: isActive ? 1 : 0.24,
                      filter: isActive ? "blur(0px)" : "blur(7px)",
                      transform: isActive
                        ? "translateY(0) scale(1)"
                        : "translateY(10px) scale(.988)",
                      transition:
                        "transform 220ms ease, opacity 220ms ease, filter 220ms ease, border-color 220ms ease, box-shadow 220ms ease",
                      willChange: "transform, opacity, filter",
                    }}
                  >
                    <div
                      aria-hidden="true"
                      style={{
                        position: "absolute",
                        inset: -2,
                        pointerEvents: "none",
                        background:
                          "radial-gradient(circle at 18% 12%, rgba(245,215,110,.22), transparent 55%), radial-gradient(circle at 86% 88%, rgba(212,175,55,.12), transparent 60%)",
                        filter: "blur(16px)",
                        opacity: isActive ? 0.9 : 0.38,
                        transition: "opacity 220ms ease",
                      }}
                    />

                    <div className="nd_prog_shine" aria-hidden="true" />

                    <div
                      style={{
                        position: "relative",
                        display: "flex",
                        alignItems: "flex-start",
                        justifyContent: "space-between",
                        gap: 14,
                        marginBottom: 10,
                      }}
                    >
                      <div style={{ display: "grid", gap: 8 }}>
                        <span
                          style={{
                            color: "rgba(245,215,110,.75)",
                            letterSpacing: ".18em",
                            fontSize: 12,
                            fontWeight: 900,
                            textTransform: "uppercase",
                          }}
                        >
                          {p.tag}
                        </span>

                        <h3
                          style={{
                            margin: 0,
                            fontSize: 22,
                            fontWeight: 1000,
                            letterSpacing: ".02em",
                            color: "#f2f2f2",
                          }}
                        >
                          {p.title}
                        </h3>
                      </div>

                      <div
                        style={{
                          width: 46,
                          height: 46,
                          borderRadius: 16,
                          display: "grid",
                          placeItems: "center",
                          color: "rgba(245,215,110,.95)",
                          border: "1px solid rgba(212,175,55,.22)",
                          background:
                            "linear-gradient(135deg, rgba(245,215,110,.18), rgba(212,175,55,.06))",
                          boxShadow: "0 18px 46px rgba(212,175,55,.10)",
                          flex: "0 0 auto",
                        }}
                      >
                        {p.icon}
                      </div>
                    </div>

                    <p
                      style={{
                        position: "relative",
                        margin: 0,
                        color: "rgba(235,235,235,.72)",
                        lineHeight: 1.75,
                        fontSize: 15,
                        maxWidth: 560,
                      }}
                    >
                      {p.desc}
                    </p>

                    <div
                      style={{
                        position: "absolute",
                        left: 18,
                        bottom: 14,
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 10,
                        opacity: isActive ? 1 : 0.18,
                        transition: "opacity 220ms ease",
                        pointerEvents: "none",
                      }}
                    ></div>
                  </article>
                );
              })}
            </div>

            <div style={{ height: 170 }} />
          </div>
        </div>

        <style>{`
          /* ✅ Fade in/out (reverse) SEM transform => não quebra o fixed */
          .nd_reveal_wrap{
            position: relative;
            opacity: 0;
            transition: opacity 740ms ease;
            will-change: opacity;
            z-index: 1; /* ✅ acima do glow mobile */
          }
          .nd_reveal_wrap.isOn{
            opacity: 1;
          }

          /* ✅ ILUMINAÇÃO DO FUNDO SOMENTE NO MOBILE */
          @media (max-width: 980px){
            .nd_programas{
              overflow: hidden; /* evita o glow “vazar” e criar scroll horizontal */
            }
            .nd_programas::before{
              content:"";
              position:absolute;
              inset:-10%;
              pointer-events:none;
              z-index: 0;
              background:
                radial-gradient(900px 600px at 18% 20%, rgba(245,215,110,.10) 0%, rgba(0,0,0,0) 55%),
                radial-gradient(900px 600px at 90% 60%, rgba(212,175,55,.08) 0%, rgba(0,0,0,0) 55%);
            }
          }

          .nd_insc_btn{
            position: relative;
            height: 46px;
            padding: 0 26px;
            border-radius: 999px;
            border: none;
            cursor: pointer;
            overflow: hidden;
            transform-origin: center;
            transition: transform .22s ease;
            will-change: transform;
            display: inline-flex;
            align-items: center;
            gap: 12px;
            justify-content: center;
            color: #141414;
            background: linear-gradient(135deg, #b8962e, #f5d76e, #b8962e);
            box-shadow: 0 18px 50px rgba(212,175,55,.18), 0 10px 24px rgba(0,0,0,.38);
            -webkit-tap-highlight-color: transparent;
          }
          .nd_insc_btn::after{
            content:"";
            position:absolute;
            inset:0;
            background: linear-gradient(120deg, transparent 42%, rgba(255,255,255,.58) 50%, transparent 58%);
            transform: translateX(-140%) skewX(-20deg);
            opacity: 0;
            pointer-events:none;
            will-change: transform, opacity;
          }
          .nd_insc_btn:hover{ transform: scale(1.06); }
          .nd_insc_btn:hover::after{ opacity: 1; animation: nd_insc_shine .85s ease forwards; }
          @keyframes nd_insc_shine{ to { transform: translateX(140%) skewX(-20deg); opacity: 0; } }

          .nd_insc_pill{
            width: 34px;
            height: 34px;
            border-radius: 999px;
            display: grid;
            place-items: center;
            background: rgba(255,255,255,.45);
            box-shadow: inset 0 0 0 1px rgba(0,0,0,.08);
            flex: 0 0 auto;
          }
          .nd_insc_txt{ display:grid; text-align:left; line-height:1.05; }
          .nd_insc_kicker{ font-size: 11px; font-weight: 900; opacity:.85; }
          .nd_insc_main{ font-size: 14px; font-weight: 1000; letter-spacing:.08em; }

          .nd_prog_shine{
            position:absolute;
            inset:0;
            border-radius: inherit;
            pointer-events:none;
            background: linear-gradient(110deg, transparent 0%, rgba(255,255,255,.12) 22%, transparent 44%);
            transform: translateX(-120%);
            opacity: 0;
            will-change: transform, opacity;
          }
          .nd_prog_card.isActive .nd_prog_shine{
            opacity: .9;
            animation: nd_prog_shimmer 900ms ease forwards;
          }
          @keyframes nd_prog_shimmer{
            to { transform: translateX(120%); opacity: 0; }
          }

          /* ✅ MOBILE: fica bonito e SEM sobreposição (desktop não muda) */
          @media (max-width: 980px){
            .nd_programas{
              padding: 92px 14px !important;
            }

            .nd_prog_grid{
              grid-template-columns: 1fr !important;
              gap: 16px !important;
            }

            .nd_left_wrap{
              min-height: auto !important;
            }

            .nd_left_card{
              position: relative !important;
              top: auto !important;
              left: auto !important;
              width: auto !important;
              bottom: auto !important;
              z-index: 1 !important;
              padding-bottom: 6px;
              margin-bottom: 8px;
            }

            .nd_left_title{
              font-size: clamp(2rem, 8vw, 2.6rem) !important;
              line-height: 1.06 !important;
            }

            .nd_left_desc{
              font-size: 14.5px !important;
              line-height: 1.7 !important;
              margin-bottom: 18px !important;
              max-width: 100% !important;
            }

            .nd_insc_btn{
              width: 100%;
              justify-content: flex-start;
              padding: 0 18px;
              height: 50px;
            }

            .nd_prog_card{
              opacity: 1 !important;
              filter: none !important;
              transform: none !important;
              padding: 18px 18px 16px !important;
            }

            .nd_prog_card h3{
              font-size: 20px !important;
            }
          }

          @media (max-width: 420px){
            .nd_programas{
              padding: 86px 12px !important;
            }
          }

          @media (prefers-reduced-motion: reduce){
            .nd_prog_shine{ animation: none !important; }
            .nd_prog_card{ transition: none !important; }
            .nd_insc_btn{ transition: none !important; }
          }
        `}</style>
      </div>
    </section>
  );
}

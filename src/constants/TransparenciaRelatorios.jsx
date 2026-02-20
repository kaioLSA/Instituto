import { useEffect, useMemo, useRef, useState } from "react";

export default function TransparenciaRelatorios() {
  const wrapRef = useRef(null);

  // ✅ revela quando entra na tela
  const [show, setShow] = useState(false);

  // modal
  const [open, setOpen] = useState(false);
  const [activeDoc, setActiveDoc] = useState(null);

  // refs p/ GSAP
  const yearsWrapRef = useRef(null);
  const metricRefs = useRef([]);

  const DOCS = useMemo(
    () => [
      {
        year: "2024",
        pdf: "/relatorios/relatorio-2024.pdf",
      },
      {
        year: "2025",
        pdf: "/relatorios/relatorio-2025.pdf",
      },
    ],
    []
  );

  // ✅ 5 quadradinhos (linha)
  const METRICS = useMemo(
    () => [
      { n: "+1.205", t: "Pessoas capacitadas\npara o Mercado de\nTrabalho", icon: "book" },
      { n: "+51.754", t: "Atendimentos nas\nOficinas Culturais e\nEsportivas", icon: "ball" },
      { n: "+400", t: "Pessoas inseridas\nno mercado de trabalho", icon: "building" },
      { n: "+300", t: "Pessoas gerando renda", icon: "money" },
      { n: "+50", t: "Pessoas empreendendo", icon: "idea" },
    ],
    []
  );

  // reveal ao aparecer
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;

    const obs = new IntersectionObserver(([e]) => setShow(e.isIntersecting), {
      threshold: 0.18,
    });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  // ✅ GSAP (anima quando entra; se sair e entrar de novo, anima de novo)
  useEffect(() => {
    if (!show) return;

    let ctx;
    let cancelled = false;

    (async () => {
      try {
        const mod = await import("gsap");
        if (cancelled) return;
        const gsap = mod.gsap || mod.default || mod;

        ctx = gsap.context(() => {
          // header
          gsap.fromTo(
            ".nd_t_reveal",
            { y: 18, opacity: 0, filter: "blur(6px)" },
            {
              y: 0,
              opacity: 1,
              filter: "blur(0px)",
              duration: 0.9,
              ease: "power3.out",
            }
          );

          // botões anos (stagger)
          const yearBtns = yearsWrapRef.current?.querySelectorAll(".nd_year_btn");
          if (yearBtns?.length) {
            gsap.fromTo(
              yearBtns,
              { y: 14, opacity: 0, scale: 0.98 },
              {
                y: 0,
                opacity: 1,
                scale: 1,
                duration: 0.7,
                ease: "power3.out",
                stagger: 0.12,
                delay: 0.1,
              }
            );
          }

          // 5 cards (stagger)
          const cards = metricRefs.current.filter(Boolean);
          if (cards.length) {
            gsap.fromTo(
              cards,
              { y: 18, opacity: 0, scale: 0.985 },
              {
                y: 0,
                opacity: 1,
                scale: 1,
                duration: 0.75,
                ease: "power3.out",
                stagger: 0.12,
                delay: 0.18,
              }
            );
          }
        }, wrapRef);
      } catch {
        // se gsap não estiver instalado, só ignora (mantém UI perfeita)
      }
    })();

    return () => {
      cancelled = true;
      try {
        ctx?.revert?.();
      } catch {}
    };
  }, [show]);

  // fechar com ESC + travar scroll
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  const openPdf = (doc) => {
    setActiveDoc(doc);
    setOpen(true);
  };

  const Icon = ({ name }) => {
    const common = {
      width: 36,
      height: 36,
      viewBox: "0 0 24 24",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
    };

    if (name === "book") {
      return (
        <svg {...common}>
          <path
            d="M4.5 5.5c0-1.1.9-2 2-2H19v15.5c0 .83-.67 1.5-1.5 1.5H6.5c-1.1 0-2-.9-2-2V5.5Z"
            stroke="currentColor"
            strokeWidth="1.8"
          />
          <path d="M8 3.5v14.8" stroke="currentColor" strokeWidth="1.8" opacity=".8" />
          <path
            d="M11.2 7h5.4"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            opacity=".85"
          />
          <path
            d="M11.2 10.2h5.4"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            opacity=".65"
          />
        </svg>
      );
    }

    if (name === "ball") {
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="8.5" stroke="currentColor" strokeWidth="1.8" />
          <path
            d="M12 3.6l2.2 2 2.9.2 1 2.7-1.8 2 1 2.7-2.8.8-2.5 1.6-2.5-1.6-2.8-.8 1-2.7-1.8-2 1-2.7 2.9-.2L12 3.6Z"
            stroke="currentColor"
            strokeWidth="1.4"
            opacity=".85"
            fill="none"
          />
        </svg>
      );
    }

    if (name === "building") {
      return (
        <svg {...common}>
          <path
            d="M4.5 20V6.5c0-1.1.9-2 2-2h7c1.1 0 2 .9 2 2V20"
            stroke="currentColor"
            strokeWidth="1.8"
          />
          <path d="M17.5 20v-9c0-1.1.9-2 2-2h0" stroke="currentColor" strokeWidth="1.8" opacity=".85" />
          <path
            d="M7.5 8.2h3M7.5 11.2h3M7.5 14.2h3"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            opacity=".75"
          />
          <path
            d="M12.2 20v-3.2c0-.6.5-1.1 1.1-1.1h.4c.6 0 1.1.5 1.1 1.1V20"
            stroke="currentColor"
            strokeWidth="1.8"
            opacity=".9"
          />
        </svg>
      );
    }

    if (name === "money") {
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="8.5" stroke="currentColor" strokeWidth="1.8" />
          <path
            d="M14.4 8.2c-.3-.7-1.1-1.2-2.1-1.2-1.2 0-2.2.7-2.2 1.7 0 2.4 4.9 1.2 4.9 3.7 0 1.1-1.1 1.9-2.7 1.9-1.2 0-2.2-.5-2.6-1.3"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
          <path d="M12 6.2v11.6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" opacity=".85" />
        </svg>
      );
    }

    // idea
    return (
      <svg {...common}>
        <path
          d="M12 3.5a6.5 6.5 0 0 0-3.6 11.9c.5.3.8.9.8 1.5V18c0 .6.5 1 1 1h3.6c.6 0 1-.4 1-1v-1.1c0-.6.3-1.2.8-1.5A6.5 6.5 0 0 0 12 3.5Z"
          stroke="currentColor"
          strokeWidth="1.8"
        />
        <path d="M9.8 21h4.4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" opacity=".85" />
        <path d="M10 18h4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" opacity=".7" />
      </svg>
    );
  };

  return (
    <section
      id="transparencia"
      ref={wrapRef}
      style={{
        position: "relative",
        overflow: "hidden",
        padding: "92px 20px",
        background: "radial-gradient(1200px 720px at 20% 10%, #222 0%, #141414 55%, #0b0b0b 100%)",
      }}
    >
      {/* vinheta */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          background: "radial-gradient(circle at 50% 35%, transparent 0%, rgba(0,0,0,.36) 55%, rgba(0,0,0,.70) 100%)",
        }}
      />

      {/* glows */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          width: 760,
          height: 760,
          right: -280,
          top: -340,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(245,215,110,.18) 0%, rgba(212,175,55,.12) 32%, transparent 70%)",
          filter: "blur(70px)",
          pointerEvents: "none",
        }}
      />
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          width: 660,
          height: 660,
          left: -320,
          bottom: -360,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(184,150,46,.14) 0%, rgba(212,175,55,.10) 35%, transparent 72%)",
          filter: "blur(84px)",
          pointerEvents: "none",
        }}
      />

      {/* grid sutil */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          opacity: 0.08,
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.18) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.18) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          maskImage: "radial-gradient(circle at 50% 20%, black 0%, transparent 65%)",
          WebkitMaskImage: "radial-gradient(circle at 50% 20%, black 0%, transparent 65%)",
        }}
      />

      <div
        style={{
          width: "100%",
          maxWidth: 1120,
          margin: "0 auto",
          position: "relative",
          zIndex: 2,
        }}
      >
        {/* header */}
        <div className="nd_t_reveal" style={{ textAlign: "center" }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              padding: "10px 14px",
              borderRadius: 999,
              border: "1px solid rgba(212,175,55,.25)",
              background: "linear-gradient(180deg, rgba(255,255,255,.06), rgba(255,255,255,.02))",
              boxShadow: "0 10px 30px rgba(0,0,0,.22), inset 0 0 0 1px rgba(255,255,255,.06)",
              marginBottom: 14,
            }}
          >
            <span
              style={{
                width: 10,
                height: 10,
                borderRadius: 999,
                background: "linear-gradient(180deg, #f5d76e, #d4af37, #b8962e)",
                boxShadow: "0 0 0 4px rgba(212,175,55,.18)",
              }}
            />
            <span
              style={{
                color: "rgba(245,215,110,.95)",
                fontWeight: 950,
                letterSpacing: ".10em",
                fontSize: 12,
                textTransform: "uppercase",
              }}
            >
              Transparência
            </span>
          </div>

          <h2
            style={{
              margin: 0,
              fontWeight: 950,
              letterSpacing: "-0.03em",
              lineHeight: 1.06,
              fontSize: "clamp(2.0rem, 3.6vw, 3.05rem)",
              color: "#f2f2f2",
            }}
          >
            Confira nosso{" "}
            <span
              style={{
                background: "linear-gradient(92deg, #f5d76e 0%, #d4af37 35%, #b8962e 75%, #f5d76e 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                filter: "drop-shadow(0 10px 30px rgba(212,175,55,.16))",
              }}
            >
              Relatório de Transparência
            </span>
          </h2>

          <p
            style={{
              margin: "12px auto 0",
              maxWidth: 820,
              color: "rgba(235,235,235,.76)",
              fontSize: "1.02rem",
              lineHeight: 1.85,
            }}
          >
            Clique no ano para abrir o PDF (visualização no site + opção de abrir em nova aba).
          </p>
        </div>

        {/* botões anos */}
        <div
          ref={yearsWrapRef}
          style={{
            marginTop: 26,
            display: "flex",
            gap: 14,
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          {DOCS.map((d) => (
            <button
              key={d.year}
              type="button"
              onClick={() => openPdf(d)}
              className="nd_year_btn"
              style={{
                border: "none",
                cursor: "pointer",
                padding: "14px 18px",
                borderRadius: 999,
                minWidth: 220,
                color: "rgba(245,215,110,.98)",
                fontWeight: 950,
                letterSpacing: ".08em",
                textTransform: "uppercase",
                background: "linear-gradient(180deg, rgba(10,10,10,.98), rgba(0,0,0,.92))",
                boxShadow: "0 18px 50px rgba(0,0,0,.45), inset 0 0 0 1px rgba(255,255,255,.08)",
                position: "relative",
                outline: "none",
              }}
            >
              <span
                aria-hidden="true"
                style={{
                  position: "absolute",
                  inset: 0,
                  borderRadius: 999,
                  pointerEvents: "none",
                  opacity: 0.65,
                  background: "radial-gradient(120px 80px at 30% 30%, rgba(245,215,110,.18), transparent 62%)",
                }}
              />
              {d.year}
            </button>
          ))}
        </div>

        {/* ✅ NOVO: fileira de 5 quadradinhos (preto & branco, premium) */}
        <div
          className="nd_metrics_row"
          style={{
            marginTop: 26,
            width: "100%",
            display: "grid",
            gridTemplateColumns: "repeat(5, minmax(0, 1fr))",
            gap: 16,
          }}
        >
          {METRICS.map((it, i) => (
            <div
              key={it.n}
              ref={(el) => (metricRefs.current[i] = el)}
              className="nd_sq"
              style={{
                borderRadius: 22,
                overflow: "hidden",
                position: "relative",
                border: "1px solid rgba(255,255,255,.12)",
                background: "linear-gradient(180deg, rgba(255,255,255,.06), rgba(255,255,255,.02))",
                boxShadow: "0 22px 60px rgba(0,0,0,.55), inset 0 0 0 1px rgba(255,255,255,.04)",
                minHeight: 250,
                display: "grid",
                placeItems: "center",
                padding: 18,
                textAlign: "center",
              }}
            >
              {/* ícone */}
              <div
                aria-hidden="true"
                style={{
                  width: 86,
                  height: 86,
                  borderRadius: 999,
                  display: "grid",
                  placeItems: "center",
                  border: "1px solid rgba(255,255,255,.14)",
                  background: "radial-gradient(circle at 30% 25%, rgba(255,255,255,.10), rgba(0,0,0,.55))",
                  boxShadow: "0 18px 40px rgba(0,0,0,.55), inset 0 0 0 1px rgba(255,255,255,.05)",
                  marginBottom: 16,
                  color: "rgba(255,255,255,.92)",
                }}
              >
                <div
                  style={{
                    width: 62,
                    height: 62,
                    borderRadius: 999,
                    display: "grid",
                    placeItems: "center",
                    background: "rgba(0,0,0,.55)",
                    border: "1px solid rgba(255,255,255,.12)",
                    color: "rgba(255,255,255,.92)",
                  }}
                >
                  <Icon name={it.icon} />
                </div>
              </div>

              {/* número */}
              <div
                style={{
                  fontWeight: 950,
                  letterSpacing: "-0.02em",
                  lineHeight: 1,
                  fontSize: "clamp(1.6rem, 2.2vw, 2.2rem)",
                  color: "rgba(255,255,255,.96)",
                  textShadow: "0 16px 40px rgba(0,0,0,.55)",
                }}
              >
                {it.n}
              </div>

              {/* texto */}
              <div
                style={{
                  marginTop: 10,
                  whiteSpace: "pre-line",
                  color: "rgba(235,235,235,.78)",
                  fontSize: 13.5,
                  lineHeight: 1.55,
                }}
              >
                {it.t}
              </div>

              {/* sweep */}
              <div
                aria-hidden="true"
                className="nd_sweep"
                style={{
                  position: "absolute",
                  inset: 0,
                  pointerEvents: "none",
                  background: "linear-gradient(120deg, transparent 0%, rgba(255,255,255,.10) 22%, transparent 42%)",
                  transform: "translateX(-85%)",
                  opacity: 0.55,
                }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* MODAL PDF */}
      {open && activeDoc && (
        <div
          role="dialog"
          aria-modal="true"
          className="nd_modal_wrap"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) setOpen(false);
          }}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            background: "rgba(0,0,0,.70)",
            backdropFilter: "blur(10px)",
            WebkitBackdropFilter: "blur(10px)",
            display: "grid",
            placeItems: "center",
            padding: 16,
            animation: "ndModalFade .18s ease-out both",
          }}
        >
          <div
            className="nd_modal_card"
            style={{
              width: "min(1080px, 96vw)",
              height: "min(78vh, 720px)",
              borderRadius: 22,
              overflow: "hidden",
              border: "1px solid rgba(212,175,55,.20)",
              background: "linear-gradient(180deg, rgba(255,255,255,.08), rgba(255,255,255,.03))",
              boxShadow: "0 40px 120px rgba(0,0,0,.65), inset 0 0 0 1px rgba(255,255,255,.06)",
              transform: "translateY(6px) scale(.99)",
              animation: "ndModalPop .22s ease-out both",
              display: "grid",
              gridTemplateRows: "auto 1fr",
            }}
          >
            <div
              style={{
                padding: "12px 12px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 12,
                borderBottom: "1px solid rgba(255,255,255,.10)",
                background: "linear-gradient(180deg, rgba(0,0,0,.30), rgba(0,0,0,.06))",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span
                  style={{
                    width: 10,
                    height: 10,
                    borderRadius: 999,
                    background: "linear-gradient(180deg, #f5d76e, #d4af37, #b8962e)",
                    boxShadow: "0 0 0 4px rgba(212,175,55,.14)",
                  }}
                />
                <div style={{ display: "grid", gap: 2 }}>
                  <div style={{ color: "rgba(245,245,245,.94)", fontWeight: 950, letterSpacing: ".02em" }}>
                    Relatório de Transparência — {activeDoc.year}
                  </div>
                  <div style={{ color: "rgba(235,235,235,.70)", fontSize: 12.5 }}>
                    Visualização do PDF dentro do site
                  </div>
                </div>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <a
                  href={activeDoc.pdf}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    textDecoration: "none",
                    padding: "10px 12px",
                    borderRadius: 999,
                    border: "1px solid rgba(255,255,255,.14)",
                    background: "rgba(0,0,0,.28)",
                    color: "rgba(245,215,110,.95)",
                    fontWeight: 950,
                    letterSpacing: ".06em",
                    textTransform: "uppercase",
                    fontSize: 12,
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 8,
                  }}
                >
                  Abrir em nova aba <span aria-hidden="true">↗</span>
                </a>

                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  style={{
                    border: "none",
                    cursor: "pointer",
                    padding: "10px 12px",
                    borderRadius: 999,
                    background: "linear-gradient(180deg, rgba(12,12,12,.98), rgba(0,0,0,.92))",
                    color: "rgba(245,245,245,.92)",
                    fontWeight: 950,
                    letterSpacing: ".06em",
                    textTransform: "uppercase",
                    fontSize: 12,
                    boxShadow: "0 18px 45px rgba(0,0,0,.45), inset 0 0 0 1px rgba(255,255,255,.10)",
                  }}
                >
                  Fechar
                </button>
              </div>
            </div>

            <div style={{ width: "100%", height: "100%", background: "rgba(0,0,0,.35)" }}>
              <iframe
                title={`Relatório ${activeDoc.year}`}
                src={activeDoc.pdf}
                style={{ width: "100%", height: "100%", border: "none", display: "block" }}
              />
            </div>
          </div>
        </div>
      )}

      <style>
        {`
          .nd_year_btn{
            transform: translateY(0);
            transition: transform .22s ease, filter .22s ease;
          }
          .nd_year_btn:hover{
            transform: translateY(-3px);
            filter: saturate(1.06);
          }
          .nd_year_btn:active{
            transform: translateY(-1px) scale(.99);
          }

          .nd_sq{
            transition: transform .25s ease, border-color .25s ease, filter .25s ease;
            will-change: transform;
          }
          .nd_sq:hover{
            transform: translateY(-6px) scale(1.01);
            border-color: rgba(255,255,255,.18);
            filter: saturate(1.06);
          }

          .nd_sweep{
            transition: opacity .35s ease, transform 1.1s ease;
          }
          .nd_sq:hover .nd_sweep{
            opacity: .8;
            transform: translateX(70%);
          }

          @keyframes ndModalFade{
            from{ opacity: 0; }
            to{ opacity: 1; }
          }
          @keyframes ndModalPop{
            from{ transform: translateY(14px) scale(.985); opacity: 0; }
            to{ transform: translateY(0) scale(1); opacity: 1; }
          }

          /* responsivo: 5 -> 3 -> 2 -> 1 */
          @media (max-width: 1100px){
            .nd_metrics_row{ grid-template-columns: repeat(3, minmax(0, 1fr)) !important; }
          }
          @media (max-width: 760px){
            .nd_metrics_row{ grid-template-columns: repeat(2, minmax(0, 1fr)) !important; }
          }
          @media (max-width: 520px){
            .nd_metrics_row{ grid-template-columns: 1fr !important; }
          }

          @media (prefers-reduced-motion: reduce){
            .nd_year_btn, .nd_sq{ transition: none !important; }
            .nd_sweep{ transition: none !important; }
            .nd_modal_wrap{ animation: none !important; }
            .nd_modal_card{ animation: none !important; }
          }
        `}
      </style>
    </section>
  );
}
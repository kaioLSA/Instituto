import { useEffect, useMemo, useRef, useState } from "react";

export default function NossoInstituto() {
  const wrapRef = useRef(null);

  // ✅ 4 fotos (troca pelos seus caminhos)
  const PHOTOS = useMemo(
    () => [
      {
        src: "/instituto1.webp",
        alt: "Atividade no Instituto",
        tag: "Cultura",
        title: "Arte que aproxima",
        desc: "Oficinas e vivências que fortalecem identidade e pertencimento.",
      },
      {
        src: "/instituto2.webp",
        alt: "Aula e capacitação",
        tag: "Educação",
        title: "Aprender pra crescer",
        desc: "Apoio, disciplina e incentivo para novos caminhos.",
      },
      {
        src: "/instituto3.webp",
        alt: "Treino e esporte",
        tag: "Esporte",
        title: "Energia e foco",
        desc: "Rotina e esporte como ferramenta de transformação.",
      },
      {
        src: "/instituto4.webp",
        alt: "Comunidade reunida",
        tag: "Comunidade",
        title: "Juntos de verdade",
        desc: "Um espaço seguro com oportunidades reais para todos.",
      },
    ],
    []
  );

  // ✅ carrossel
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);

  const next = () => setI((p) => (p + 1) % PHOTOS.length);
  const prev = () => setI((p) => (p - 1 + PHOTOS.length) % PHOTOS.length);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => next(), 5200);
    return () => clearInterval(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paused, i]);

  // ✅ reveal repetível
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => setShown(entry.isIntersecting),
      { threshold: 0.22 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  // ✅ drag (otimizado com refs + rAF)
  const trackRef = useRef(null);
  const drag = useRef({ down: false, x: 0, dx: 0, raf: 0 });

  const setTrackTransform = (val, withTransition = true) => {
    const tr = trackRef.current;
    if (!tr) return;
    tr.style.transition = withTransition
      ? "transform 650ms cubic-bezier(.2,.9,.2,1)"
      : "none";
    tr.style.transform = val;
  };

  const onDown = (clientX) => {
    drag.current.down = true;
    drag.current.x = clientX;
    drag.current.dx = 0;
    setPaused(true);
  };

  const onMove = (clientX) => {
    if (!drag.current.down) return;
    drag.current.dx = clientX - drag.current.x;

    cancelAnimationFrame(drag.current.raf);
    drag.current.raf = requestAnimationFrame(() => {
      setTrackTransform(`translateX(calc(${-i * 100}% + ${drag.current.dx}px))`, false);
    });
  };

  const onUp = () => {
    if (!drag.current.down) return;
    drag.current.down = false;

    const dx = drag.current.dx;
    const TH = 60;

    if (dx > TH) prev();
    else if (dx < -TH) next();

    // volta pro lugar (o useEffect de i também garante)
    setTrackTransform(`translateX(${-i * 100}%)`, true);

    setTimeout(() => setPaused(false), 1800);
  };

  useEffect(() => {
    setTrackTransform(`translateX(${-i * 100}%)`, true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [i]);

  return (
    <section
      id="nosso-instituto"
      ref={wrapRef}
      style={{
        position: "relative",
        overflow: "hidden",
        padding: "100px 20px",
        background: "#ffffff",
      }}
    >
      {/* glow sutil */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          width: 720,
          height: 720,
          right: -320,
          top: -380,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(245,215,110,.22) 0%, rgba(212,175,55,.14) 35%, transparent 70%)",
          filter: "blur(70px)",
          pointerEvents: "none",
          opacity: 0.9,
        }}
      />
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          width: 620,
          height: 620,
          left: -360,
          bottom: -380,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(184,150,46,.18) 0%, rgba(212,175,55,.10) 40%, transparent 72%)",
          filter: "blur(78px)",
          pointerEvents: "none",
          opacity: 0.8,
        }}
      />

      {/* grid sutil */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          opacity: 0.06,
          backgroundImage:
            "linear-gradient(rgba(0,0,0,.22) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,.22) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          maskImage: "radial-gradient(circle at 50% 25%, black 0%, transparent 65%)",
          WebkitMaskImage:
            "radial-gradient(circle at 50% 25%, black 0%, transparent 65%)",
        }}
      />

      <div
        className="ni_container"
        style={{
          width: "100%",
          maxWidth: 1120,
          margin: "0 auto",
          position: "relative",
          zIndex: 2,
        }}
      >
        {/* Header */}
        <div className={`ni_reveal ${shown ? "in" : "out"}`} style={{ marginBottom: 24 }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              padding: "10px 14px",
              borderRadius: 999,
              border: "1px solid rgba(212,175,55,.28)",
              background: "linear-gradient(180deg, rgba(0,0,0,.03), rgba(0,0,0,.01))",
              boxShadow: "0 12px 30px rgba(0,0,0,.08), inset 0 0 0 1px rgba(255,255,255,.55)",
              marginBottom: 14,
            }}
          >
            <span
              style={{
                width: 10,
                height: 10,
                borderRadius: 999,
                background: "linear-gradient(180deg, #f5d76e, #d4af37, #b8962e)",
                boxShadow: "0 0 0 4px rgba(212,175,55,.16)",
              }}
            />
            <span
              style={{
                color: "rgba(36,36,36,.92)",
                fontWeight: 950,
                letterSpacing: ".12em",
                fontSize: 12,
                textTransform: "uppercase",
              }}
            >
              Nosso Instituto
            </span>
          </div>

          <h2
            style={{
              margin: 0,
              fontWeight: 950,
              letterSpacing: "-0.03em",
              lineHeight: 1.05,
              fontSize: "clamp(2.1rem, 3.8vw, 3.2rem)",
              color: "#151515",
            }}
          >
            Um espaço de{" "}
            <span
              style={{
                background:
                  "linear-gradient(92deg, #f5d76e 0%, #d4af37 35%, #b8962e 75%, #f5d76e 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                filter: "drop-shadow(0 10px 24px rgba(212,175,55,.12))",
              }}
            >
              oportunidade
            </span>{" "}
            pra comunidade.
          </h2>

          <p
            style={{
              marginTop: 12,
              marginBottom: 0,
              maxWidth: 760,
              color: "rgba(20,20,20,.72)",
              fontSize: "1.02rem",
              lineHeight: 1.85,
            }}
          >
            Arraste para o lado ou use as setas para ver as fotos.
          </p>
        </div>

        {/* ✅ AQUI: altura alinhada (direita = mesma altura do carrossel) */}
        <div
          className={`ni_grid ${shown ? "in" : "out"}`}
          style={{
            display: "grid",
            gridTemplateColumns: "1.35fr 0.65fr",
            gap: 18,
            alignItems: "stretch",
          }}
        >
          {/* Carrossel (altura “controlada” pra casar com a direita) */}
          <div
            className="ni_carousel"
            style={{
              position: "relative",
              borderRadius: 26,
              overflow: "hidden",
              border: "1px solid rgba(0,0,0,.10)",
              background: "linear-gradient(180deg, rgba(0,0,0,.03), rgba(0,0,0,.01))",
              boxShadow: "0 34px 90px rgba(0,0,0,.14), 0 18px 46px rgba(212,175,55,.10)",
              height: 520, // ✅ controla a altura do bloco grande
            }}
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            <div
              ref={trackRef}
              className="ni_track"
              style={{
                display: "flex",
                width: `${PHOTOS.length * 100}%`,
                transform: `translateX(${-i * 100}%)`,
                transition: "transform 650ms cubic-bezier(.2,.9,.2,1)",
                cursor: drag.current.down ? "grabbing" : "grab",
                userSelect: "none",
                touchAction: "pan-y",
                height: "100%",
              }}
              onMouseDown={(e) => onDown(e.clientX)}
              onMouseMove={(e) => onMove(e.clientX)}
              onMouseUp={onUp}
              onMouseLeave={onUp}
              onTouchStart={(e) => onDown(e.touches[0].clientX)}
              onTouchMove={(e) => onMove(e.touches[0].clientX)}
              onTouchEnd={onUp}
            >
              {PHOTOS.map((p, idx) => (
                <div
                  key={idx}
                  style={{
                    width: "100%",
                    minWidth: "100%",
                    position: "relative",
                    height: "100%",
                    background: "rgba(0,0,0,.06)",
                  }}
                >
                  <img
                    src={p.src}
                    alt={p.alt}
                    draggable={false}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      display: "block",
                      transform: idx === i ? "scale(1.02)" : "scale(1)",
                      transition: "transform 800ms ease",
                      filter: "contrast(1.02) saturate(1.02)",
                    }}
                  />

                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      pointerEvents: "none",
                      background:
                        "linear-gradient(180deg, rgba(0,0,0,.05) 0%, rgba(0,0,0,.08) 30%, rgba(0,0,0,.72) 100%)",
                      opacity: 0.95,
                    }}
                  />

                  <div
                    style={{
                      position: "absolute",
                      left: 18,
                      right: 18,
                      bottom: 16,
                      display: "grid",
                      gap: 8,
                      color: "#fff",
                    }}
                  >
                    <div style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" }}>
                      <span
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: 8,
                          padding: "8px 10px",
                          borderRadius: 999,
                          border: "1px solid rgba(245,215,110,.28)",
                          background:
                            "linear-gradient(180deg, rgba(245,215,110,.18), rgba(212,175,55,.06))",
                          color: "rgba(245,215,110,.95)",
                          fontWeight: 950,
                          fontSize: 11,
                          letterSpacing: ".12em",
                          textTransform: "uppercase",
                          backdropFilter: "blur(10px)",
                          WebkitBackdropFilter: "blur(10px)",
                        }}
                      >
                        <span
                          style={{
                            width: 8,
                            height: 8,
                            borderRadius: 999,
                            background: "linear-gradient(180deg, #f5d76e, #d4af37, #b8962e)",
                            boxShadow: "0 0 0 4px rgba(212,175,55,.14)",
                          }}
                        />
                        {p.tag}
                      </span>

                      <span
                        style={{
                          color: "rgba(255,255,255,.86)",
                          fontWeight: 900,
                          fontSize: 12,
                          letterSpacing: ".10em",
                          textTransform: "uppercase",
                        }}
                      >
                        {String(idx + 1).padStart(2, "0")} / {String(PHOTOS.length).padStart(2, "0")}
                      </span>
                    </div>

                    <div
                      style={{
                        fontWeight: 950,
                        letterSpacing: "-0.02em",
                        fontSize: "clamp(1.25rem, 2.2vw, 1.7rem)",
                        lineHeight: 1.12,
                      }}
                    >
                      {p.title}
                    </div>

                    <div
                      style={{
                        color: "rgba(255,255,255,.78)",
                        lineHeight: 1.6,
                        fontSize: 14,
                        maxWidth: 720,
                      }}
                    >
                      {p.desc}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* setas */}
            <button
              onClick={() => {
                setPaused(true);
                prev();
                setTimeout(() => setPaused(false), 1200);
              }}
              aria-label="Anterior"
              className="ni_nav ni_prev"
              type="button"
              style={{
                position: "absolute",
                top: "50%",
                left: 14,
                transform: "translateY(-50%)",
                width: 44,
                height: 44,
                borderRadius: 999,
                border: "1px solid rgba(255,255,255,.20)",
                background: "rgba(0,0,0,.45)",
                color: "#fff",
                display: "grid",
                placeItems: "center",
                cursor: "pointer",
                backdropFilter: "blur(10px)",
                WebkitBackdropFilter: "blur(10px)",
                boxShadow: "0 18px 40px rgba(0,0,0,.25)",
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path
                  d="M15 18l-6-6 6-6"
                  stroke="rgba(245,215,110,.95)"
                  strokeWidth="2.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            <button
              onClick={() => {
                setPaused(true);
                next();
                setTimeout(() => setPaused(false), 1200);
              }}
              aria-label="Próximo"
              className="ni_nav ni_next"
              type="button"
              style={{
                position: "absolute",
                top: "50%",
                right: 14,
                transform: "translateY(-50%)",
                width: 44,
                height: 44,
                borderRadius: 999,
                border: "1px solid rgba(255,255,255,.20)",
                background: "rgba(0,0,0,.45)",
                color: "#fff",
                display: "grid",
                placeItems: "center",
                cursor: "pointer",
                backdropFilter: "blur(10px)",
                WebkitBackdropFilter: "blur(10px)",
                boxShadow: "0 18px 40px rgba(0,0,0,.25)",
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path
                  d="M9 6l6 6-6 6"
                  stroke="rgba(245,215,110,.95)"
                  strokeWidth="2.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            {/* dots */}
            <div
              style={{
                position: "absolute",
                left: 18,
                right: 18,
                bottom: 14,
                display: "flex",
                justifyContent: "center",
                gap: 10,
                pointerEvents: "auto",
              }}
            >
              {PHOTOS.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    setPaused(true);
                    setI(idx);
                    setTimeout(() => setPaused(false), 1200);
                  }}
                  aria-label={`Ir para foto ${idx + 1}`}
                  style={{
                    width: idx === i ? 26 : 10,
                    height: 10,
                    borderRadius: 999,
                    border: "1px solid rgba(255,255,255,.25)",
                    background:
                      idx === i
                        ? "linear-gradient(180deg, #f5d76e, #d4af37, #b8962e)"
                        : "rgba(255,255,255,.22)",
                    boxShadow: idx === i ? "0 10px 22px rgba(212,175,55,.18)" : "none",
                    transition: "width .28s ease, transform .28s ease, opacity .28s ease",
                    opacity: idx === i ? 1 : 0.65,
                    cursor: "pointer",
                  }}
                />
              ))}
            </div>

            {/* sweep */}
            <div
              aria-hidden="true"
              className="ni_sweep"
              style={{
                position: "absolute",
                inset: 0,
                pointerEvents: "none",
                background:
                  "linear-gradient(120deg, transparent 0%, rgba(255,255,255,.14) 22%, transparent 42%)",
                transform: "translateX(-85%)",
                opacity: 0.55,
              }}
            />
          </div>

          {/* ✅ Direita: mesma altura do carrossel (3 cards dividem a altura) */}
          <div
            className="ni_right"
            style={{
              height: 520, // ✅ igual ao carrossel
              display: "flex",
              flexDirection: "column",
              gap: 14,
            }}
          >
            {PHOTOS.map((p, idx) => {
              if (idx === i) return null;

              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    setPaused(true);
                    setI(idx);
                    setTimeout(() => setPaused(false), 1200);
                  }}
                  className="ni_mini"
                  style={{
                    flex: 1, // ✅ divide a altura entre os 3
                    border: "1px solid rgba(0,0,0,.10)",
                    borderRadius: 20,
                    overflow: "hidden",
                    background: "linear-gradient(180deg, rgba(0,0,0,.03), rgba(0,0,0,.01))",
                    boxShadow: "0 18px 50px rgba(0,0,0,.10)", // sombra fixa (não animar!)
                    cursor: "pointer",
                    padding: 0,
                    textAlign: "left",
                    transform: "translateZ(0)", // ✅ GPU
                    willChange: "transform",
                  }}
                >
                  <div
                    style={{
                      height: "100%",
                      display: "grid",
                      gridTemplateColumns: "110px 1fr",
                      gap: 12,
                      alignItems: "center",
                      padding: 14,
                    }}
                  >
                    <div
                      style={{
                        width: 110,
                        height: "100%",
                        maxHeight: 94,
                        borderRadius: 16,
                        overflow: "hidden",
                        border: "1px solid rgba(255,255,255,.65)",
                        background: "rgba(0,0,0,.06)",
                        flexShrink: 0,
                      }}
                    >
                      <img
                        src={p.src}
                        alt={p.alt}
                        draggable={false}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          display: "block",
                          transform: "scale(1.02)",
                        }}
                      />
                    </div>

                    <div style={{ display: "grid", gap: 6, minWidth: 0 }}>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          gap: 12,
                        }}
                      >
                        <span
                          style={{
                            color: "rgba(36,36,36,.88)",
                            fontWeight: 950,
                            letterSpacing: ".10em",
                            fontSize: 11,
                            textTransform: "uppercase",
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                          }}
                        >
                          {p.tag}
                        </span>
                        <span
                          style={{
                            color: "rgba(212,175,55,.95)",
                            fontWeight: 950,
                            fontSize: 12,
                            whiteSpace: "nowrap",
                          }}
                        >
                          Ver →
                        </span>
                      </div>

                      <div
                        style={{
                          color: "#141414",
                          fontWeight: 950,
                          letterSpacing: "-0.01em",
                          lineHeight: 1.15,
                          fontSize: 14,
                        }}
                      >
                        {p.title}
                      </div>

                      <div
                        style={{
                          color: "rgba(20,20,20,.68)",
                          fontSize: 12.8,
                          lineHeight: 1.55,
                          display: "-webkit-box",
                          WebkitLineClamp: 2, // ✅ não estoura
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                        }}
                      >
                        {p.desc}
                      </div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* faixa inferior */}
        <div
          className={`ni_reveal ${shown ? "in" : "out"}`}
          style={{
            marginTop: 18,
            display: "flex",
            justifyContent: "space-between",
            gap: 12,
            flexWrap: "wrap",
            alignItems: "center",
          }}
        >
          <div
            style={{
              color: "rgba(20,20,20,.70)",
              fontSize: 13,
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              border: "1px solid rgba(0,0,0,.08)",
              background: "linear-gradient(180deg, rgba(0,0,0,.02), rgba(0,0,0,.01))",
              padding: "10px 12px",
              borderRadius: 14,
              boxShadow: "0 14px 34px rgba(0,0,0,.08)",
            }}
          >
            <span
              style={{
                width: 10,
                height: 10,
                borderRadius: 999,
                background: "linear-gradient(180deg, #f5d76e, #d4af37, #b8962e)",
                boxShadow: "0 0 0 4px rgba(212,175,55,.12)",
              }}
            />
            Dica: arraste o carrossel (mouse/touch) para trocar as fotos.
          </div>

          <div
            style={{
              color: "rgba(20,20,20,.72)",
              fontWeight: 950,
              letterSpacing: ".06em",
              fontSize: 12,
              textTransform: "uppercase",
            }}
          >
            Instituto Nego Drama
          </div>
        </div>
      </div>

      <style>
        {`
          /* reveal repetível */
          .ni_reveal{
            transition: opacity .65s ease, transform .65s ease;
            will-change: opacity, transform;
          }
          .ni_reveal.out{ opacity: 0; transform: translateY(18px); }
          .ni_reveal.in { opacity: 1; transform: translateY(0); }

          .ni_grid{
            transition: opacity .65s ease, transform .65s ease;
            will-change: opacity, transform;
          }
          .ni_grid.out{ opacity: 0; transform: translateY(18px); }
          .ni_grid.in { opacity: 1; transform: translateY(0); }

          /* sweep */
          .ni_carousel:hover .ni_sweep{
            opacity: .75;
            transform: translateX(70%);
            transition: opacity .35s ease, transform 1.1s ease;
          }
          .ni_sweep{
            transition: opacity .35s ease, transform 1.1s ease;
          }

          /* ✅ Hover otimizado (sem travar): anima só transform */
          .ni_mini{
            transition: transform .18s ease, border-color .18s ease;
            will-change: transform;
          }
          .ni_mini:hover{
            transform: translate3d(0,-4px,0);
            border-color: rgba(212,175,55,.22);
          }

          /* hover nav */
          .ni_nav{
            transition: transform .18s ease, filter .18s ease, opacity .18s ease;
          }
          .ni_nav:hover{
            transform: translateY(-50%) scale(1.06);
            filter: saturate(1.08);
          }

          /* responsivo */
          @media (max-width: 980px){
            .ni_grid{
              grid-template-columns: 1fr !important;
            }
            .ni_carousel{
              height: 420px !important;
            }
            .ni_right{
              height: auto !important;
            }
            .ni_mini{
              flex: unset !important;
            }
          }
        `}
      </style>
    </section>
  );
}

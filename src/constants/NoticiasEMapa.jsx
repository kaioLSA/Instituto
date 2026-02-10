import { useEffect, useMemo, useRef, useState } from "react";

export default function NoticiasEMapa() {
  const wrapRef = useRef(null);
  const [shown, setShown] = useState(false);

  // parallax leve (igual vibe do resto)
  const [mx, setMx] = useState(0);
  const [my, setMy] = useState(0);

  const ADDRESS =
    "R. Jesuíno Antônio, 36 - Novo Osasco, Osasco - SP, 06045-080, Brasil";

  // ✅ link direto pro Google Maps (abrir fora)
  const mapsLink = useMemo(() => {
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
      ADDRESS
    )}`;
  }, []);

  // ✅ mapa escuro: embed + "darkmode=1" (quando o provedor respeita) + fallback
  const mapSrc = useMemo(() => {
    const q = encodeURIComponent(ADDRESS);
    // Alguns embeds respeitam darkmode=1; se não respeitar, ainda fica ok com moldura escura.
    return `https://www.google.com/maps?q=${q}&output=embed&z=16&hl=pt-BR&darkmode=1`;
  }, []);

  const NEWS = useMemo(
    () => [
      {
        img: "/n1.webp",
        tag: "Cultura",
        title: "Atividades que aproximam",
        desc: "Vivências e oficinas que fortalecem identidade, expressão e pertencimento.",
        date: "Atualizado recentemente",
      },
      {
        img: "/n2.webp",
        tag: "Esporte",
        title: "Energia e foco",
        desc: "Rotina, disciplina e suporte para transformar esforço em futuro.",
        date: "Esta semana",
      },
      {
        img: "/n3.webp",
        tag: "Comunidade",
        title: "Juntos de verdade",
        desc: "Um espaço seguro com oportunidades reais para jovens e famílias.",
        date: "Últimos dias",
      },
    ],
    []
  );

  // reveal repeateable
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      ([entry]) => setShown(entry.isIntersecting),
      { threshold: 0.18 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  // parallax do mouse
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;

    let raf = 0;
    const onMove = (e) => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width;
      const y = (e.clientY - r.top) / r.height;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        setMx((x - 0.5) * 2);
        setMy((y - 0.5) * 2);
      });
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  return (
    <section
      id="noticias"
      ref={wrapRef}
      style={{
        position: "relative",
        overflow: "hidden",
        padding: "96px 20px",
        background:
          "radial-gradient(1100px 700px at 20% 10%, #222 0%, #141414 55%, #0b0b0b 100%)",
      }}
    >
      {/* vinheta */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          background:
            "radial-gradient(circle at 50% 35%, transparent 0%, rgba(0,0,0,.35) 55%, rgba(0,0,0,.65) 100%)",
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
          background:
            "radial-gradient(circle, rgba(245,215,110,.20) 0%, rgba(212,175,55,.14) 30%, transparent 70%)",
          filter: "blur(72px)",
          pointerEvents: "none",
          transform: `translate(${mx * -12}px, ${my * -12}px)`,
          transition: "transform 120ms ease-out",
          opacity: 0.95,
        }}
      />
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          width: 620,
          height: 620,
          left: -300,
          bottom: -340,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(184,150,46,.16) 0%, rgba(212,175,55,.10) 35%, transparent 72%)",
          filter: "blur(78px)",
          pointerEvents: "none",
          transform: `translate(${mx * 14}px, ${my * 14}px)`,
          transition: "transform 120ms ease-out",
          opacity: 0.9,
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
          maskImage:
            "radial-gradient(circle at 50% 20%, black 0%, transparent 65%)",
          WebkitMaskImage:
            "radial-gradient(circle at 50% 20%, black 0%, transparent 65%)",
        }}
      />

      <div
        className="nm_container"
        style={{
          width: "100%",
          maxWidth: 1120,
          margin: "0 auto",
          position: "relative",
          zIndex: 2,
        }}
      >
        {/* Header */}
        <div className={`nm_reveal ${shown ? "in" : "out"}`}>
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
                "0 10px 30px rgba(0,0,0,.22), inset 0 0 0 1px rgba(255,255,255,.06)",
              marginBottom: 14,
            }}
          >
            <span
              style={{
                width: 10,
                height: 10,
                borderRadius: 999,
                background:
                  "linear-gradient(180deg, #f5d76e, #d4af37, #b8962e)",
                boxShadow: "0 0 0 4px rgba(212,175,55,.18)",
              }}
            />
            <span
              style={{
                color: "rgba(245,215,110,.95)",
                fontWeight: 950,
                letterSpacing: ".12em",
                fontSize: 12,
                textTransform: "uppercase",
              }}
            >
              Notícias • Onde estamos
            </span>
          </div>

          <h2
            style={{
              margin: 0,
              fontWeight: 950,
              letterSpacing: "-0.03em",
              lineHeight: 1.05,
              fontSize: "clamp(2.0rem, 3.6vw, 3.1rem)",
              color: "#f2f2f2",
            }}
          >
            Acompanhe as{" "}
            <span
              style={{
                background:
                  "linear-gradient(92deg, #f5d76e 0%, #d4af37 35%, #b8962e 75%, #f5d76e 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                filter: "drop-shadow(0 10px 30px rgba(212,175,55,.16))",
              }}
            >
              novidades
            </span>{" "}
            e veja onde a gente atua.
          </h2>

          <p
            style={{
              marginTop: 12,
              marginBottom: 0,
              maxWidth: 820,
              color: "rgba(235,235,235,.76)",
              fontSize: "1.02rem",
              lineHeight: 1.85,
            }}
          >
            Três destaques do Instituto e o nosso endereço para você visitar,
            apoiar e conhecer de perto o projeto.
          </p>
        </div>

        {/* Layout: Notícias + Mapa */}
        <div
          className={`nm_grid ${shown ? "in" : "out"}`}
          style={{
            marginTop: 22,
            display: "grid",
            gridTemplateColumns: "1.12fr .88fr",
            gap: 18,
            alignItems: "stretch",
          }}
        >
          {/* NOTÍCIAS */}
          <div
            className="nm_card"
            style={{
              borderRadius: 26,
              border: "1px solid rgba(212,175,55,.18)",
              background:
                "linear-gradient(180deg, rgba(255,255,255,.06), rgba(255,255,255,.02))",
              boxShadow:
                "0 26px 70px rgba(0,0,0,.48), inset 0 0 0 1px rgba(255,255,255,.05)",
              overflow: "hidden",
              position: "relative",
              padding: 18,
            }}
          >
            <div
              aria-hidden="true"
              style={{
                position: "absolute",
                inset: -2,
                background:
                  "radial-gradient(circle at 30% 15%, rgba(245,215,110,.16), transparent 55%), radial-gradient(circle at 70% 85%, rgba(212,175,55,.10), transparent 55%)",
                filter: "blur(18px)",
                pointerEvents: "none",
              }}
            />

            <div
              style={{
                position: "relative",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 12,
                marginBottom: 14,
              }}
            >
              <div style={{ display: "grid", gap: 4 }}>
                <span
                  style={{
                    color: "rgba(245,215,110,.95)",
                    fontWeight: 950,
                    letterSpacing: ".12em",
                    fontSize: 12,
                    textTransform: "uppercase",
                  }}
                >
                  Destaques
                </span>
                <span
                  style={{
                    color: "rgba(245,245,245,.92)",
                    fontSize: 18,
                    fontWeight: 900,
                  }}
                >
                  Notícias do Instituto
                </span>
              </div>

              <span
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: 999,
                  background:
                    "linear-gradient(180deg, #f5d76e, #d4af37, #b8962e)",
                  boxShadow: "0 0 0 4px rgba(212,175,55,.14)",
                }}
              />
            </div>

            <div
              className="nm_newsGrid"
              style={{
                position: "relative",
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: 14,
              }}
            >
              {NEWS.map((n, i) => (
                <article
                  key={i}
                  className="nm_newsCard"
                  style={{
                    borderRadius: 20,
                    border: "1px solid rgba(255,255,255,.10)",
                    background:
                      "linear-gradient(180deg, rgba(0,0,0,.10), rgba(0,0,0,.04))",
                    overflow: "hidden",
                    position: "relative",
                    transform: "translateZ(0)",
                    willChange: "transform",
                  }}
                >
                  <div
                    style={{
                      height: 142,
                      background: "rgba(0,0,0,.25)",
                      overflow: "hidden",
                      position: "relative",
                    }}
                  >
                    <img
                      src={n.img}
                      alt={n.title}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        display: "block",
                        transform: "scale(1.02)",
                      }}
                    />

                    <div
                      aria-hidden="true"
                      style={{
                        position: "absolute",
                        inset: 0,
                        background:
                          "linear-gradient(180deg, rgba(0,0,0,.10), rgba(0,0,0,.70))",
                        opacity: 0.9,
                      }}
                    />

                    <div
                      style={{
                        position: "absolute",
                        left: 10,
                        top: 10,
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 8,
                        padding: "8px 10px",
                        borderRadius: 999,
                        border: "1px solid rgba(255,255,255,.14)",
                        background: "rgba(0,0,0,.45)",
                        color: "rgba(245,215,110,.95)",
                        fontWeight: 900,
                        fontSize: 11,
                        letterSpacing: ".10em",
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
                          background:
                            "linear-gradient(180deg, #f5d76e, #d4af37, #b8962e)",
                          boxShadow: "0 0 0 4px rgba(212,175,55,.12)",
                        }}
                      />
                      {n.tag}
                    </div>
                  </div>

                  <div style={{ padding: "12px 12px 14px" }}>
                    <div
                      style={{
                        color: "rgba(245,245,245,.92)",
                        fontWeight: 950,
                        fontSize: 14,
                        lineHeight: 1.25,
                      }}
                    >
                      {n.title}
                    </div>

                    <p
                      style={{
                        margin: "8px 0 0",
                        color: "rgba(235,235,235,.74)",
                        fontSize: 13,
                        lineHeight: 1.6,
                      }}
                    >
                      {n.desc}
                    </p>

                    <div
                      style={{
                        marginTop: 10,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        gap: 10,
                        color: "rgba(235,235,235,.62)",
                        fontSize: 12,
                      }}
                    >
                      <span>{n.date}</span>

                      <span
                        style={{
                          color: "rgba(245,215,110,.92)",
                          fontWeight: 900,
                          letterSpacing: ".06em",
                          textTransform: "uppercase",
                          fontSize: 11,
                        }}
                      >
                        Ver →
                      </span>
                    </div>
                  </div>

                  <div
                    aria-hidden="true"
                    className="nm_sweep"
                    style={{
                      position: "absolute",
                      inset: 0,
                      pointerEvents: "none",
                      background:
                        "linear-gradient(120deg, transparent 0%, rgba(255,255,255,.10) 22%, transparent 42%)",
                      transform: "translateX(-85%)",
                      opacity: 0.55,
                    }}
                  />
                </article>
              ))}
            </div>
          </div>

          {/* MAPA */}
          <div
            className="nm_card"
            style={{
              borderRadius: 26,
              border: "1px solid rgba(212,175,55,.18)",
              background:
                "linear-gradient(180deg, rgba(255,255,255,.06), rgba(255,255,255,.02))",
              boxShadow:
                "0 26px 70px rgba(0,0,0,.48), inset 0 0 0 1px rgba(255,255,255,.05)",
              overflow: "hidden",
              position: "relative",
              padding: 18,
              display: "grid",
              gap: 12,
            }}
          >
            <div
              aria-hidden="true"
              style={{
                position: "absolute",
                inset: -2,
                background:
                  "radial-gradient(circle at 30% 15%, rgba(245,215,110,.14), transparent 55%), radial-gradient(circle at 70% 85%, rgba(212,175,55,.10), transparent 55%)",
                filter: "blur(18px)",
                pointerEvents: "none",
              }}
            />

            <div
              style={{
                position: "relative",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 12,
              }}
            >
              <div style={{ display: "grid", gap: 4 }}>
                <span
                  style={{
                    color: "rgba(245,215,110,.95)",
                    fontWeight: 950,
                    letterSpacing: ".12em",
                    fontSize: 12,
                    textTransform: "uppercase",
                  }}
                >
                  Onde estamos
                </span>
                <span
                  style={{
                    color: "rgba(245,245,245,.92)",
                    fontSize: 18,
                    fontWeight: 900,
                  }}
                >
                  Visite o Instituto
                </span>
              </div>

              <span
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: 999,
                  background:
                    "linear-gradient(180deg, #f5d76e, #d4af37, #b8962e)",
                  boxShadow: "0 0 0 4px rgba(212,175,55,.14)",
                }}
              />
            </div>

            <div
              style={{
                position: "relative",
                borderRadius: 22,
                border: "1px solid rgba(255,255,255,.12)",
                overflow: "hidden",
                background:
                  "linear-gradient(180deg, rgba(0,0,0,.14), rgba(0,0,0,.08))",
                boxShadow: "0 18px 44px rgba(0,0,0,.35)",
                height: 360,
              }}
            >
              {/* ✅ “Dark-ish” map: moldura escura + filtro leve */}
              <iframe
                title="Mapa do Instituto Nego Drama"
                src={mapSrc}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                style={{
                  width: "100%",
                  height: "100%",
                  border: 0,
                  display: "block",

                  /* nem todo embed fica escuro, então a gente “puxa” pro dark */
                  filter:
                    "invert(0.92) hue-rotate(180deg) saturate(0.9) contrast(1.05)",
                  transform: "translateZ(0)",
                }}
              />

              {/* vinheta por cima */}
              <div
                aria-hidden="true"
                style={{
                  position: "absolute",
                  inset: 0,
                  pointerEvents: "none",
                  background:
                    "radial-gradient(circle at 50% 35%, transparent 0%, rgba(0,0,0,.22) 55%, rgba(0,0,0,.55) 100%)",
                }}
              />
            </div>

            <div
              style={{
                position: "relative",
                padding: "12px 12px",
                borderRadius: 16,
                border: "1px solid rgba(255,255,255,.10)",
                background:
                  "linear-gradient(180deg, rgba(0,0,0,.10), rgba(0,0,0,.04))",
                color: "rgba(235,235,235,.74)",
                fontSize: 13,
                lineHeight: 1.6,
              }}
            >
              <b style={{ color: "rgba(245,245,245,.92)" }}>Endereço:</b>
              <br />
              {ADDRESS}
            </div>

            {/* ✅ BOTÃO: abre direto no Google Maps (visual igual ao resto) */}
            <a
              href={mapsLink}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                position: "relative",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 10,
                padding: "14px 16px",
                borderRadius: 999,
                border: "1px solid rgba(212,175,55,.22)",
                background:
                  "linear-gradient(180deg, rgba(255,255,255,.06), rgba(255,255,255,.02))",
                boxShadow:
                  "0 14px 44px rgba(0,0,0,.40), inset 0 0 0 1px rgba(255,255,255,.05)",
                color: "rgba(245,215,110,.95)",
                fontWeight: 950,
                letterSpacing: ".10em",
                fontSize: 12,
                textTransform: "uppercase",
                textDecoration: "none",
                willChange: "transform",
                transition: "transform .18s ease, border-color .18s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.borderColor = "rgba(245,215,110,.30)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.borderColor = "rgba(212,175,55,.22)";
              }}
            >
              Abrir no Google Maps →
            </a>

            <div
              aria-hidden="true"
              className="nm_sweep"
              style={{
                position: "absolute",
                inset: 0,
                pointerEvents: "none",
                background:
                  "linear-gradient(120deg, transparent 0%, rgba(255,255,255,.10) 22%, transparent 42%)",
                transform: "translateX(-85%)",
                opacity: 0.45,
              }}
            />
          </div>
        </div>
      </div>

      <style>
        {`
          .nm_reveal{
            transition: opacity .65s ease, transform .65s ease;
            will-change: opacity, transform;
          }
          .nm_reveal.out{ opacity: 0; transform: translateY(18px); }
          .nm_reveal.in { opacity: 1; transform: translateY(0); }

          .nm_grid{
            transition: opacity .65s ease, transform .65s ease;
            will-change: opacity, transform;
          }
          .nm_grid.out{ opacity: 0; transform: translateY(18px); }
          .nm_grid.in { opacity: 1; transform: translateY(0); }

          /* hover premium sem travar */
          .nm_card{
            transform: translateZ(0);
            will-change: transform;
            transition: transform .2s ease, border-color .2s ease;
          }
          .nm_card:hover{
            transform: translate3d(0,-4px,0);
            border-color: rgba(245,215,110,.30);
          }

          /* cards das news */
          .nm_newsCard{
            transition: transform .22s ease, border-color .22s ease, filter .22s ease;
          }
          .nm_newsCard:hover{
            transform: translate3d(0,-4px,0);
            border-color: rgba(245,215,110,.22);
            filter: saturate(1.04);
          }

          /* sweep */
          .nm_newsCard:hover .nm_sweep,
          .nm_card:hover .nm_sweep{
            opacity: .75;
            transform: translateX(70%);
            transition: opacity .35s ease, transform 1.1s ease;
          }
          .nm_sweep{
            transition: opacity .35s ease, transform 1.1s ease;
          }

          @media (max-width: 1060px){
            .nm_grid{
              grid-template-columns: 1fr !important;
            }
            .nm_newsGrid{
              grid-template-columns: 1fr !important;
            }
          }
        `}
      </style>
    </section>
  );
}

import { useEffect, useMemo, useRef, useState } from "react";

export default function Colaboradores() {
  const wrapRef = useRef(null);
  const [shown, setShown] = useState(false);

  const LOGOS = useMemo(
    () => [
      { src: "/c1.webp", alt: "Colaborador 1" },
      { src: "/c2.webp", alt: "Colaborador 2" },
      { src: "/c3.webp", alt: "Colaborador 3" },
      { src: "/c4.webp", alt: "Colaborador 4" },
      { src: "/c5.webp", alt: "Colaborador 5" }, // 👈 você escreveu c5.web, assumi c5.webp
      { src: "/c6.png", alt: "Colaborador 6" },
    ],
    []
  );

  // reveal repeateable
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      ([entry]) => setShown(entry.isIntersecting),
      { threshold: 0.16 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      id="colaboradores"
      ref={wrapRef}
      style={{
        position: "relative",
        overflow: "hidden",
        padding: "92px 20px",
        background: "#f4f3f0", // branco suave (combina com teu dourado)
      }}
    >
      {/* textura / grid bem leve (pra não ficar “chapado”) */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          opacity: 0.35,
          backgroundImage:
            "radial-gradient(circle at 25% 20%, rgba(212,175,55,.14), transparent 45%), radial-gradient(circle at 75% 70%, rgba(245,215,110,.12), transparent 50%)",
          filter: "blur(14px)",
        }}
      />
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          opacity: 0.22,
          backgroundImage:
            "linear-gradient(rgba(0,0,0,.06) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,.06) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          maskImage:
            "radial-gradient(circle at 50% 35%, black 0%, transparent 70%)",
          WebkitMaskImage:
            "radial-gradient(circle at 50% 35%, black 0%, transparent 70%)",
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
        <div className={`cb_reveal ${shown ? "in" : "out"}`}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              padding: "10px 14px",
              borderRadius: 999,
              border: "1px solid rgba(212,175,55,.22)",
              background:
                "linear-gradient(180deg, rgba(255,255,255,.88), rgba(255,255,255,.62))",
              boxShadow:
                "0 16px 42px rgba(0,0,0,.10), inset 0 0 0 1px rgba(255,255,255,.55)",
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
                color: "rgba(146,110,18,.92)",
                fontWeight: 950,
                letterSpacing: ".12em",
                fontSize: 12,
                textTransform: "uppercase",
              }}
            >
              Colaboradores
            </span>
          </div>

          <h2
            style={{
              margin: 0,
              fontWeight: 950,
              letterSpacing: "-0.03em",
              lineHeight: 1.05,
              fontSize: "clamp(2.1rem, 3.4vw, 3.1rem)",
              color: "#121212",
            }}
          >
            Quem caminha{" "}
            <span
              style={{
                background:
                  "linear-gradient(92deg, #b8962e 0%, #d4af37 35%, #f5d76e 70%, #b8962e 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                filter: "drop-shadow(0 10px 22px rgba(212,175,55,.18))",
              }}
            >
              com a gente
            </span>
            .
          </h2>

          <p
            style={{
              marginTop: 12,
              marginBottom: 0,
              maxWidth: 820,
              color: "rgba(20,20,20,.70)",
              fontSize: "1.02rem",
              lineHeight: 1.85,
            }}
          >
            Parcerias que fortalecem o Instituto e ampliam oportunidades reais
            para a comunidade.
          </p>
        </div>

        {/* grid logos */}
        <div
          className={`cb_grid ${shown ? "in" : "out"}`}
          style={{
            marginTop: 26,
            display: "grid",
            gridTemplateColumns: "repeat(6, 1fr)",
            gap: 14,
            alignItems: "stretch",
          }}
        >
          {LOGOS.map((l, idx) => (
            <div
              key={idx}
              className="cb_logoCard"
              style={{
                position: "relative",
                borderRadius: 22,
                border: "1px solid rgba(0,0,0,.08)",
                background:
                  "linear-gradient(180deg, rgba(255,255,255,.90), rgba(255,255,255,.72))",
                boxShadow:
                  "0 18px 44px rgba(0,0,0,.10), inset 0 0 0 1px rgba(255,255,255,.6)",
                overflow: "hidden",
                display: "grid",
                placeItems: "center",
                padding: "18px 14px",
                minHeight: 96,
                transform: "translateZ(0)",
                willChange: "transform",
              }}
              title={l.alt}
            >
              {/* glow sutil no card */}
              <div
                aria-hidden="true"
                style={{
                  position: "absolute",
                  inset: -2,
                  background:
                    "radial-gradient(circle at 30% 20%, rgba(212,175,55,.16), transparent 55%), radial-gradient(circle at 70% 90%, rgba(245,215,110,.12), transparent 60%)",
                  filter: "blur(14px)",
                  opacity: 0.55,
                  pointerEvents: "none",
                }}
              />

              <img
                src={l.src}
                alt={l.alt}
                loading="lazy"
                style={{
                  width: "100%",
                  maxWidth: 160,
                  height: 46,
                  objectFit: "contain",
                  opacity: 0.82,
                  filter: "grayscale(1) contrast(1.05)",
                  transition: "opacity .22s ease, filter .22s ease, transform .22s ease",
                  transform: "translateY(0)",
                }}
                className="cb_logoImg"
              />

              {/* sweep */}
              <div
                aria-hidden="true"
                className="cb_sweep"
                style={{
                  position: "absolute",
                  inset: 0,
                  pointerEvents: "none",
                  background:
                    "linear-gradient(120deg, transparent 0%, rgba(255,255,255,.55) 22%, transparent 44%)",
                  transform: "translateX(-90%)",
                  opacity: 0.0,
                }}
              />
            </div>
          ))}
        </div>
      </div>

      <style>
        {`
          .cb_reveal{
            transition: opacity .65s ease, transform .65s ease;
            will-change: opacity, transform;
          }
          .cb_reveal.out{ opacity: 0; transform: translateY(16px); }
          .cb_reveal.in { opacity: 1; transform: translateY(0); }

          .cb_grid{
            transition: opacity .65s ease, transform .65s ease;
            will-change: opacity, transform;
          }
          .cb_grid.out{ opacity: 0; transform: translateY(16px); }
          .cb_grid.in { opacity: 1; transform: translateY(0); }

          .cb_logoCard{
            transition: transform .20s ease, border-color .20s ease, box-shadow .20s ease;
          }
          .cb_logoCard:hover{
            transform: translate3d(0,-4px,0);
            border-color: rgba(212,175,55,.28);
            box-shadow: 0 22px 60px rgba(0,0,0,.12), inset 0 0 0 1px rgba(255,255,255,.7);
          }

          .cb_logoCard:hover .cb_logoImg{
            opacity: 1;
            filter: grayscale(0) contrast(1.02);
            transform: translateY(-1px);
          }

          .cb_logoCard:hover .cb_sweep{
            opacity: .85;
            transform: translateX(80%);
            transition: opacity .35s ease, transform 1.1s ease;
          }
          .cb_sweep{
            transition: opacity .35s ease, transform 1.1s ease;
          }

          @media (max-width: 1100px){
            .cb_grid{ grid-template-columns: repeat(3, 1fr) !important; }
          }
          @media (max-width: 620px){
            .cb_grid{ grid-template-columns: repeat(2, 1fr) !important; }
          }
        `}
      </style>
    </section>
  );
}

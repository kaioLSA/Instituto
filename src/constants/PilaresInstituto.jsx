import { useEffect, useRef, useState } from "react";

export default function PilaresInstituto() {
  const ref = useRef(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      ([entry]) => setShow(entry.isIntersecting),
      { threshold: 0.16 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const items = [
    {
      title: "ESPORTE",
      desc: "Com projetos gratuitos para jovens e adultos",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path
            d="M12 21a9 9 0 1 0-9-9"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
          />
          <path
            d="M7 12c2-1 3-2 5-5 2 3 3 4 5 5-2 1-3 2-5 5-2-3-3-4-5-5Z"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
    {
      title: "CULTURA",
      desc: "Promovendo o acesso à cultura aos nossos jovens",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path
            d="M4 19V7a2 2 0 0 1 2-2h12v14"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
          />
          <path
            d="M6 21h12a2 2 0 0 0 2-2V7"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
          />
          <path
            d="M8 9h7"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
          />
        </svg>
      ),
    },
    {
      title: "EDUCAÇÃO",
      desc: "Cursos gratuitos e com certificado",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path
            d="M3 7l9-4 9 4-9 4-9-4Z"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinejoin="round"
          />
          <path
            d="M21 10v6"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
          />
          <path
            d="M5 11v6c0 2 3 4 7 4s7-2 7-4v-6"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
    {
      title: "PROFISSÃO",
      desc: "Ingressando nossos alunos no mercado de trabalho",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path
            d="M9 6V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v1"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
          />
          <path
            d="M4 8h16v10a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3V8Z"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinejoin="round"
          />
          <path
            d="M4 12h16"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
          />
        </svg>
      ),
    },
  ];

  return (
    <section
      id="pilares"
      ref={ref}
      style={{
        position: "relative",
        overflow: "hidden",
        background: "#ffffff",
        padding: "92px 18px 92px",
      }}
    >
      {/* Separador leve */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: 0,
          left: "50%",
          transform: "translateX(-50%)",
          width: "min(1100px, 92%)",
          height: 1,
          background:
            "linear-gradient(90deg, transparent, rgba(212,175,55,.45), transparent)",
          opacity: 0.95,
          pointerEvents: "none",
        }}
      />

      {/* brilho leve */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: -120,
          left: "50%",
          transform: "translateX(-50%)",
          width: 900,
          height: 300,
          background:
            "radial-gradient(circle at 50% 50%, rgba(245,215,110,.14), transparent 70%)",
          filter: "blur(45px)",
          pointerEvents: "none",
        }}
      />

      <div style={{ maxWidth: 1140, margin: "0 auto" }}>
        {/* Head */}
        <div
          style={{
            textAlign: "center",
            marginBottom: 30,
            transform: show ? "translateY(0)" : "translateY(14px)",
            opacity: show ? 1 : 0,
            transition: "transform 650ms ease, opacity 650ms ease",
          }}
        >
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              padding: "9px 12px",
              borderRadius: 999,
              border: "1px solid rgba(212,175,55,.28)",
              background:
                "linear-gradient(180deg, rgba(255,255,255,.92), rgba(255,255,255,.72))",
              boxShadow: "0 16px 46px rgba(0,0,0,.08)",
            }}
          >
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
            <span
              style={{
                fontSize: 12,
                fontWeight: 900,
                letterSpacing: ".18em",
                textTransform: "uppercase",
                color: "rgba(0,0,0,.78)",
              }}
            >
              Nossos pilares
            </span>
          </div>

          <h2
            style={{
              margin: "16px 0 10px",
              fontWeight: 1000,
              letterSpacing: "-0.03em",
              fontSize: "clamp(1.9rem, 3.4vw, 2.8rem)",
              lineHeight: 1.08,
              color: "#121212",
            }}
          >
            O que sustenta o{" "}
            <span
              style={{
                background:
                  "linear-gradient(90deg, #f5d76e, #d4af37, #b8962e)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Instituto
            </span>
          </h2>

          <p
            style={{
              margin: "0 auto",
              maxWidth: 720,
              color: "rgba(0,0,0,.66)",
              lineHeight: 1.7,
              fontSize: 15.5,
            }}
          >
            Quatro frentes que criam oportunidades, pertencimento e futuro real
            para jovens e famílias.
          </p>
        </div>

        {/* Cards */}
        <div
          className="pilares-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
            gap: 18,
            alignItems: "stretch",
          }}
        >
          {items.map((it, idx) => (
            <article
              key={it.title}
              className="nd_pillar"
              style={{
                position: "relative",
                overflow: "hidden",
                borderRadius: 26,
                padding: "22px 20px 18px",
                background:
                  "linear-gradient(180deg, rgba(255,255,255,.96), rgba(250,250,250,.88))",
                border: "1px solid rgba(0,0,0,.08)",
                boxShadow:
                  "0 26px 90px rgba(0,0,0,.10), inset 0 0 0 1px rgba(255,255,255,.55)",
                opacity: show ? 1 : 0,
                transform: show ? "translateY(0)" : "translateY(16px)",
                transition:
                  "transform 520ms cubic-bezier(.2,.9,.2,1), opacity 520ms ease, box-shadow 220ms ease, border-color 220ms ease",
                transitionDelay: `${idx * 70}ms`,
                willChange: "transform",
                transformStyle: "preserve-3d",
              }}
            >
              <div
                aria-hidden="true"
                style={{
                  position: "absolute",
                  inset: -2,
                  background:
                    "radial-gradient(circle at 20% 10%, rgba(245,215,110,.22), transparent 55%), radial-gradient(circle at 85% 85%, rgba(212,175,55,.10), transparent 58%)",
                  filter: "blur(12px)",
                  pointerEvents: "none",
                  opacity: 0.85,
                  willChange: "opacity",
                }}
              />

              <div className="nd_card_shine" aria-hidden="true" />

              <div
                style={{
                  position: "relative",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 10,
                  padding: "10px 12px",
                  borderRadius: 999,
                  border: "1px solid rgba(212,175,55,.26)",
                  background:
                    "linear-gradient(135deg, rgba(245,215,110,.20), rgba(212,175,55,.08))",
                  color: "#b8962e",
                  boxShadow: "0 14px 30px rgba(212,175,55,.10)",
                }}
              >
                <span style={{ display: "grid", placeItems: "center" }}>
                  {it.icon}
                </span>
                <span
                  style={{
                    fontSize: 12,
                    fontWeight: 1000,
                    letterSpacing: ".18em",
                    color: "rgba(0,0,0,.68)",
                    textTransform: "uppercase",
                  }}
                >
                  Pilar
                </span>
              </div>

              <h3
                style={{
                  position: "relative",
                  margin: "14px 0 8px",
                  fontSize: 22,
                  fontWeight: 1000,
                  letterSpacing: ".06em",
                  textTransform: "uppercase",
                  color: "#d4af37",
                }}
              >
                {it.title}
              </h3>

              <p
                style={{
                  position: "relative",
                  margin: 0,
                  color: "rgba(0,0,0,.76)",
                  lineHeight: 1.55,
                  fontSize: 15,
                }}
              >
                {it.desc}
              </p>

              <div
                aria-hidden="true"
                style={{
                  position: "absolute",
                  right: -60,
                  top: -60,
                  width: 150,
                  height: 150,
                  borderRadius: "50%",
                  background:
                    "radial-gradient(circle, rgba(245,215,110,.22), transparent 65%)",
                  filter: "blur(10px)",
                  pointerEvents: "none",
                }}
              />
            </article>
          ))}
        </div>
      </div>

      <style>
        {`
          .nd_pillar{
            backface-visibility: hidden;
            transform: translateZ(0);
          }
          .nd_pillar:hover{
            transform: translateY(-8px) translateZ(0) !important;
            border-color: rgba(212,175,55,.28) !important;
            box-shadow: 0 38px 110px rgba(0,0,0,.14), inset 0 0 0 1px rgba(255,255,255,.55) !important;
          }

          .nd_card_shine{
            position:absolute;
            inset:0;
            border-radius: inherit;
            pointer-events:none;
            background: linear-gradient(110deg,
              transparent 0%,
              rgba(255,255,255,.52) 20%,
              transparent 40%
            );
            opacity: 0;
            transform: translateX(-140%);
            will-change: transform, opacity;
          }

          .nd_pillar:hover .nd_card_shine{
            opacity: .42;
            animation: nd_card_shimmer 650ms cubic-bezier(.2,.9,.2,1);
          }

          @keyframes nd_card_shimmer{
            from { transform: translateX(-140%); }
            to   { transform: translateX(220%); }
          }

          @media (max-width: 980px){
            .pilares-grid{
              grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
            }
          }
          @media (max-width: 560px){
            #pilares{
              padding: 84px 16px 82px !important;
            }
            .pilares-grid{
              grid-template-columns: 1fr !important;
            }
          }
        `}
      </style>
    </section>
  );
}

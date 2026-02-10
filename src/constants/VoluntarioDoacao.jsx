import { useEffect, useRef, useState } from "react";

export default function VoluntarioDoacao() {
  const wrapRef = useRef(null);
  const [shown, setShown] = useState(false);

  // ✅ form state
  const [nome, setNome] = useState("");
  const [numero, setNumero] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [sent, setSent] = useState(false);

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

  const onSubmit = (e) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 2500);
    setNome("");
    setNumero("");
    setMensagem("");
  };

  const copy = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch {}
  };

  return (
    <section
      id="voluntario"
      ref={wrapRef}
      style={{
        position: "relative",
        overflow: "hidden",
        padding: "100px 20px",
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
          width: 740,
          height: 740,
          right: -260,
          top: -320,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(245,215,110,.20) 0%, rgba(212,175,55,.14) 30%, transparent 70%)",
          filter: "blur(70px)",
          pointerEvents: "none",
          opacity: 0.95,
        }}
      />
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          width: 620,
          height: 620,
          left: -280,
          bottom: -320,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(184,150,46,.16) 0%, rgba(212,175,55,.10) 35%, transparent 72%)",
          filter: "blur(78px)",
          pointerEvents: "none",
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
        style={{
          width: "100%",
          maxWidth: 1120,
          margin: "0 auto",
          position: "relative",
          zIndex: 2,
        }}
      >
        {/* header */}
        <div
          className={`vd_reveal ${shown ? "in" : "out"}`}
          style={{ marginBottom: 22 }}
        >
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
              Seja um voluntário • Faça parte do projeto
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
            Sua presença e sua ajuda{" "}
            <span
              style={{
                background:
                  "linear-gradient(92deg, #f5d76e 0%, #d4af37 35%, #b8962e 75%, #f5d76e 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                filter: "drop-shadow(0 10px 30px rgba(212,175,55,.16))",
              }}
            >
              mudam histórias.
            </span>
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
            Agora que você já conhece o nosso projeto, chegou a hora de você também
            impactar vidas. Precisamos da sua ajuda para continuar essa missão.
            Doe e faça a diferença!
          </p>
        </div>

        {/* layout 2 colunas */}
        <div
          className={`vd_grid ${shown ? "in" : "out"}`}
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 18,
            alignItems: "stretch",
          }}
        >
          {/* ================== ESQUERDA: DOAÇÃO / PIX ================== */}
          <div
            className="vd_card vd_pix"
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

              /* ✅ estrutura para: topo fixo, conteúdo no meio, copiar no rodapé */
              display: "flex",
              flexDirection: "column",
              height: "100%",
              gap: 14,
            }}
          >
            {/* brilho interno */}
            <div
              aria-hidden="true"
              style={{
                position: "absolute",
                inset: -2,
                background:
                  "radial-gradient(circle at 30% 15%, rgba(245,215,110,.18), transparent 55%), radial-gradient(circle at 70% 85%, rgba(212,175,55,.12), transparent 55%)",
                filter: "blur(18px)",
                pointerEvents: "none",
              }}
            />

            {/* ✅ TOPO */}
            <div
              className="vd_pix_head"
              style={{
                position: "relative",
                display: "grid",
                gridTemplateColumns: "1fr auto",
                alignItems: "center",
                gap: 10,
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
                  Doação
                </span>
                <span
                  style={{
                    color: "rgba(245,245,245,.92)",
                    fontSize: 18,
                    fontWeight: 900,
                  }}
                >
                  PIX (QR Code)
                </span>
              </div>

              <span
                className="vd_doe_tag"
                style={{
                  border: "1px solid rgba(212,175,55,.28)",
                  background:
                    "linear-gradient(180deg, rgba(245,215,110,.16), rgba(212,175,55,.06))",
                  color: "rgba(245,215,110,.95)",
                  fontWeight: 950,
                  padding: "10px 12px",
                  borderRadius: 14,
                  fontSize: 12,
                  letterSpacing: ".06em",
                  textTransform: "uppercase",
                  whiteSpace: "nowrap",
                  justifySelf: "end",
                }}
              >
                Doe agora →
              </span>
            </div>

            {/* ✅ MEIO */}
            <div
              style={{
                position: "relative",
                display: "grid",
                gap: 14,
                flex: 1,
              }}
            >
              <div
                className="vd_pix_body"
                style={{
                  display: "grid",
                  gridTemplateColumns: "260px 1fr",
                  gap: 16,
                  alignItems: "center",
                }}
              >
                <div
                  className="vd_pix_qr"
                  style={{
                    borderRadius: 22,
                    border: "1px solid rgba(255,255,255,.12)",
                    background:
                      "linear-gradient(180deg, rgba(0,0,0,.12), rgba(0,0,0,.04))",
                    boxShadow: "0 18px 44px rgba(0,0,0,.35)",
                    overflow: "hidden",
                    padding: 14,
                    display: "grid",
                    placeItems: "center",
                  }}
                >
                  <img
                    src="/qr.webp"
                    alt="QR Code PIX para doação"
                    style={{
                      width: "100%",
                      maxWidth: 220,
                      height: "auto",
                      display: "block",
                      borderRadius: 14,
                    }}
                  />
                </div>

                <div style={{ display: "grid", gap: 10 }}>
                  <div
                    style={{
                      color: "rgba(235,235,235,.78)",
                      lineHeight: 1.7,
                      fontSize: 14,
                    }}
                  >
                    <b style={{ color: "rgba(245,245,245,.92)" }}>
                      ASSOCIAÇÃO NEGO DRAMA DESENVOLVE OZ BRASIL
                    </b>
                  </div>

                  <div
                    style={{
                      display: "grid",
                      gap: 8,
                      color: "rgba(235,235,235,.74)",
                      fontSize: 13.5,
                      lineHeight: 1.6,
                    }}
                  >
                    <div>
                      <span
                        style={{
                          color: "rgba(245,215,110,.92)",
                          fontWeight: 900,
                        }}
                      >
                        CNPJ:
                      </span>{" "}
                      52.841.761/0001-70
                    </div>
                    <div>
                      <span
                        style={{
                          color: "rgba(245,215,110,.92)",
                          fontWeight: 900,
                        }}
                      >
                        BANCO:
                      </span>{" "}
                      CAIXA ECONÔMICA
                    </div>
                    <div>
                      <span
                        style={{
                          color: "rgba(245,215,110,.92)",
                          fontWeight: 900,
                        }}
                      >
                        AGÊNCIA:
                      </span>{" "}
                      1608
                    </div>
                    <div>
                      <span
                        style={{
                          color: "rgba(245,215,110,.92)",
                          fontWeight: 900,
                        }}
                      >
                        C/C:
                      </span>{" "}
                      00001487 – 0
                    </div>
                  </div>

                  <div
                    style={{
                      marginTop: 4,
                      padding: "12px 12px",
                      borderRadius: 16,
                      border: "1px solid rgba(255,255,255,.10)",
                      background:
                        "linear-gradient(180deg, rgba(0,0,0,.10), rgba(0,0,0,.04))",
                      color: "rgba(235,235,235,.72)",
                      fontSize: 13,
                      lineHeight: 1.6,
                    }}
                  >
                    Se preferir, você pode transferir com os dados acima. Qualquer valor
                    ajuda a manter as atividades do Instituto.
                  </div>
                </div>
              </div>
            </div>

            {/* ✅ RODAPÉ */}
            <div
              className="vd_pix_footer"
              style={{
                position: "relative",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 12,
                padding: "10px 12px",
                borderRadius: 16,
                border: "1px solid rgba(255,255,255,.10)",
                background:
                  "linear-gradient(180deg, rgba(0,0,0,.10), rgba(0,0,0,.04))",
              }}
            >
              <div style={{ display: "grid", gap: 2 }}>
                <span
                  style={{
                    color: "rgba(245,215,110,.92)",
                    fontWeight: 950,
                    letterSpacing: ".10em",
                    fontSize: 11,
                    textTransform: "uppercase",
                  }}
                >
                  Copiar dados rápidos
                </span>
                <span style={{ color: "rgba(235,235,235,.72)", fontSize: 13 }}>
                  CNPJ e banco para transferência
                </span>
              </div>

              <div className="vd_pix_chips" style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                <button
                  type="button"
                  onClick={() => copy("52.841.761/0001-70")}
                  className="vd_chip"
                >
                  Copiar CNPJ
                </button>
                <button
                  type="button"
                  onClick={() =>
                    copy("CAIXA ECONÔMICA • Agência 1608 • C/C 00001487-0")
                  }
                  className="vd_chip"
                >
                  Copiar Banco
                </button>
              </div>
            </div>

            {/* sweep */}
            <div
              aria-hidden="true"
              className="vd_sweep"
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
          </div>

          {/* ================== DIREITA: FORM ================== */}
          <form
            onSubmit={onSubmit}
            className="vd_card vd_form"
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
              gap: 14,
            }}
          >
            {/* brilho interno */}
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

            <div style={{ position: "relative", display: "grid", gap: 10 }}>
              <div
                style={{
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
                    Voluntariado
                  </span>
                  <span
                    style={{
                      color: "rgba(245,245,245,.92)",
                      fontSize: 18,
                      fontWeight: 900,
                    }}
                  >
                    Faça parte do Projeto
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
                  color: "rgba(235,235,235,.74)",
                  fontSize: 13.5,
                  lineHeight: 1.6,
                }}
              >
                Preencha os dados e envie uma mensagem. A gente retorna pelo número
                informado.
              </div>
            </div>

            <div style={{ position: "relative", display: "grid", gap: 12 }}>
              <Field
                label="Nome"
                value={nome}
                setValue={setNome}
                placeholder="Seu nome completo"
              />
              <Field
                label="Número"
                value={numero}
                setValue={setNumero}
                placeholder="(11) 9xxxx-xxxx"
                inputMode="tel"
              />
              <Field
                label="Mensagem"
                value={mensagem}
                setValue={setMensagem}
                placeholder="Como você gostaria de ajudar?"
                multiline
              />

              <button
                type="submit"
                className="vd_btn"
                style={{
                  marginTop: 2,
                  border: "none",
                  cursor: "pointer",
                  padding: "14px 16px",
                  borderRadius: 16,
                  fontWeight: 950,
                  letterSpacing: ".06em",
                  textTransform: "uppercase",
                  background:
                    "linear-gradient(135deg, #f5d76e 0%, #d4af37 40%, #b8962e 100%)",
                  color: "#141414",
                  boxShadow:
                    "0 18px 50px rgba(212,175,55,.20), 0 10px 24px rgba(0,0,0,.35), inset 0 0 0 1px rgba(255,255,255,.22)",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 10,
                  transform: "translateZ(0)",
                  willChange: "transform",
                }}
              >
                Enviar mensagem
                <span
                  aria-hidden="true"
                  style={{
                    width: 28,
                    height: 28,
                    borderRadius: 999,
                    display: "grid",
                    placeItems: "center",
                    background: "rgba(0,0,0,.18)",
                    boxShadow: "inset 0 0 0 1px rgba(255,255,255,.20)",
                  }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M5 12h12M13 6l6 6-6 6"
                      stroke="rgba(0,0,0,.75)"
                      strokeWidth="2.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                <span className="vd_shimmer" aria-hidden="true" />
              </button>

              {sent && (
                <div
                  style={{
                    borderRadius: 16,
                    border: "1px solid rgba(245,215,110,.25)",
                    background:
                      "linear-gradient(180deg, rgba(245,215,110,.12), rgba(212,175,55,.05))",
                    color: "rgba(245,215,110,.95)",
                    fontWeight: 900,
                    padding: "12px 12px",
                    fontSize: 13,
                  }}
                >
                  ✅ Enviado! Em breve a gente retorna 🙌
                </div>
              )}
            </div>

            {/* sweep */}
            <div
              aria-hidden="true"
              className="vd_sweep"
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
          </form>
        </div>
      </div>

      <style>
        {`
          .vd_reveal{
            transition: opacity .65s ease, transform .65s ease;
            will-change: opacity, transform;
          }
          .vd_reveal.out{ opacity: 0; transform: translateY(18px); }
          .vd_reveal.in { opacity: 1; transform: translateY(0); }

          .vd_grid{
            transition: opacity .65s ease, transform .65s ease;
            will-change: opacity, transform;
          }
          .vd_grid.out{ opacity: 0; transform: translateY(18px); }
          .vd_grid.in { opacity: 1; transform: translateY(0); }

          /* hover do card sem travar */
          .vd_card{
            transform: translateZ(0);
            will-change: transform;
            transition: transform .2s ease, border-color .2s ease;
          }
          .vd_card:hover{
            transform: translate3d(0,-4px,0);
            border-color: rgba(245,215,110,.30);
          }

          /* sweep */
          .vd_card:hover .vd_sweep{
            opacity: .75;
            transform: translateX(70%);
            transition: opacity .35s ease, transform 1.1s ease;
          }
          .vd_sweep{
            transition: opacity .35s ease, transform 1.1s ease;
          }

          /* btn hover */
          .vd_btn{
            position: relative;
            overflow: hidden;
            transition: transform .18s ease, filter .18s ease;
          }
          .vd_btn:hover{
            transform: translate3d(0,-2px,0);
            filter: saturate(1.06);
          }

          .vd_shimmer{
            position: absolute;
            inset: 0;
            border-radius: inherit;
            pointer-events: none;
            background: linear-gradient(
              120deg,
              transparent 42%,
              rgba(255,255,255,.75) 50%,
              transparent 58%
            );
            transform: translateX(-140%) skewX(-20deg);
            opacity: .55;
            mix-blend-mode: soft-light;
            animation: vd_btn_shimmer 2.3s ease-in-out infinite;
          }
          @keyframes vd_btn_shimmer{
            0%   { transform: translateX(-140%) skewX(-20deg); opacity: 0; }
            12%  { opacity: .55; }
            55%  { transform: translateX(140%) skewX(-20deg); opacity: .55; }
            56%  { opacity: 0; }
            100% { transform: translateX(140%) skewX(-20deg); opacity: 0; }
          }

          /* chips (copiar) */
          .vd_chip{
            border: 1px solid rgba(255,255,255,.12);
            background: rgba(0,0,0,.22);
            color: rgba(245,245,245,.85);
            font-weight: 900;
            padding: 10px 12px;
            border-radius: 14px;
            cursor: pointer;
            transition: transform .18s ease, border-color .18s ease, filter .18s ease;
            letter-spacing: .06em;
            text-transform: uppercase;
            font-size: 11px;
          }
          .vd_chip:hover{
            transform: translate3d(0,-2px,0);
            border-color: rgba(245,215,110,.22);
            filter: saturate(1.06);
          }

          /* responsivo base */
          @media (max-width: 980px){
            .vd_grid{
              grid-template-columns: 1fr !important;
            }
          }

          /* ✅ MOBILE: arruma o CARD DO PIX sem mexer no desktop */
          @media (max-width: 560px){
            .vd_pix{ padding: 16px !important; }

            .vd_pix_head{
              grid-template-columns: 1fr !important;
              gap: 10px !important;
            }
            .vd_doe_tag{
              justify-self: start !important;
              width: fit-content;
            }

            .vd_pix_body{
              grid-template-columns: 1fr !important;
              gap: 12px !important;
              align-items: start !important;
            }

            .vd_pix_qr{
              padding: 12px !important;
            }
            .vd_pix_qr img{
              max-width: 280px !important;
              width: 100% !important;
            }

            .vd_pix_footer{
              flex-direction: column !important;
              align-items: stretch !important;
              gap: 10px !important;
            }
            .vd_pix_chips{
              width: 100% !important;
              display: grid !important;
              grid-template-columns: 1fr !important;
              gap: 8px !important;
            }
            .vd_pix_chips .vd_chip{
              width: 100% !important;
            }
          }
        `}
      </style>
    </section>
  );
}

function Field({
  label,
  value,
  setValue,
  placeholder,
  inputMode,
  multiline = false,
}) {
  return (
    <label style={{ display: "grid", gap: 8 }}>
      <span
        style={{
          color: "rgba(245,215,110,.92)",
          fontWeight: 950,
          letterSpacing: ".10em",
          fontSize: 11,
          textTransform: "uppercase",
        }}
      >
        {label}
      </span>

      {multiline ? (
        <textarea
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={placeholder}
          rows={5}
          className="vd_input"
          style={{
            width: "100%",
            borderRadius: 16,
            border: "1px solid rgba(255,255,255,.12)",
            background:
              "linear-gradient(180deg, rgba(0,0,0,.16), rgba(0,0,0,.08))",
            color: "rgba(245,245,245,.92)",
            padding: "12px 12px",
            outline: "none",
            resize: "vertical",
            lineHeight: 1.5,
            boxShadow: "inset 0 0 0 1px rgba(255,255,255,.04)",
          }}
        />
      ) : (
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={placeholder}
          inputMode={inputMode}
          className="vd_input"
          style={{
            width: "100%",
            borderRadius: 16,
            border: "1px solid rgba(255,255,255,.12)",
            background:
              "linear-gradient(180deg, rgba(0,0,0,.16), rgba(0,0,0,.08))",
            color: "rgba(245,245,245,.92)",
            padding: "12px 12px",
            outline: "none",
            boxShadow: "inset 0 0 0 1px rgba(255,255,255,.04)",
          }}
        />
      )}
    </label>
  );
}

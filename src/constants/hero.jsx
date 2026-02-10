import { useEffect, useRef, useState } from "react";

export default function HeroInstitutoNegoDrama() {
  const wrapRef = useRef(null);

  // ✅ (pra descer a página um pouco)
  const PAGE_TOP_PADDING = 132;

  // ✅ refs/estados do vídeo (som, pause fora de alcance, 1º play só ao desmutar)
  const videoRef = useRef(null);
  const [isMuted, setIsMuted] = useState(true); // começa mutado
  const [hasUserStarted, setHasUserStarted] = useState(false); // só inicia após clique (desmutar)
  const [inView, setInView] = useState(true);

  // ✅ pausar automaticamente quando sair do alcance (fora da tela)
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    const obs = new IntersectionObserver(
      ([entry]) => {
        const visible = entry.isIntersecting && entry.intersectionRatio > 0.25;
        setInView(visible);

        if (!visible) {
          try {
            v.pause();
          } catch {}
        } else {
          if (hasUserStarted) {
            const tryPlay = async () => {
              try {
                await v.play();
              } catch {}
            };
            tryPlay();
          }
        }
      },
      { threshold: [0, 0.25, 0.5, 0.75, 1] }
    );

    obs.observe(v);
    return () => obs.disconnect();
  }, [hasUserStarted]);

  // ✅ garantir que o elemento de vídeo receba o mute correto
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = isMuted;
    v.volume = isMuted ? 0 : 1;
  }, [isMuted]);

  const toggleMute = async () => {
    const v = videoRef.current;
    if (!v) return;

    // 1ª vez: ao clicar, desmuta e inicia
    if (!hasUserStarted) {
      setHasUserStarted(true);
      setIsMuted(false);

      // dá play só se estiver no alcance
      if (inView) {
        try {
          v.muted = false;
          v.volume = 1;
          await v.play();
        } catch {}
      }
      return;
    }

    // depois disso: só alterna mute/desmute
    setIsMuted((prev) => !prev);

    if (inView) {
      try {
        await v.play();
      } catch {}
    }
  };

  // ✅ clique no vídeo também alterna mute/desmute
  const handleVideoClick = () => {
    toggleMute();
  };

  const goDonate = () => {
    const el = document.getElementById("doar");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section
      id="home"
      ref={wrapRef}
      className="nd-hero"
      style={{
        position: "relative",
        minHeight: "100vh",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        // ✅ desktop igual; mobile ajusta via CSS (sem mexer no desktop)
        padding: `${PAGE_TOP_PADDING}px 20px 72px`,
        background:
          "radial-gradient(1200px 700px at 15% 10%, #2a2a2a 0%, #151515 55%, #0b0b0b 100%)",
      }}
    >
      {/* Vinheta */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(circle at 50% 40%, transparent 0%, rgba(0,0,0,.35) 60%, rgba(0,0,0,.65) 100%)",
          pointerEvents: "none",
        }}
      />

      {/* Glow dourado (✅ sem parallax do mouse) */}
      <div
        style={{
          position: "absolute",
          width: 680,
          height: 680,
          right: -220,
          top: -260,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(245,215,110,.22) 0%, rgba(212,175,55,.18) 30%, transparent 68%)",
          filter: "blur(60px)",
          pointerEvents: "none",
          transform: "translate(0px, 0px)",
        }}
      />

      {/* Glow secundário (✅ sem parallax do mouse) */}
      <div
        style={{
          position: "absolute",
          width: 540,
          height: 540,
          left: -220,
          bottom: -260,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(184,150,46,.18) 0%, rgba(212,175,55,.12) 35%, transparent 70%)",
          filter: "blur(70px)",
          pointerEvents: "none",
          transform: "translate(0px, 0px)",
        }}
      />

      {/* Grid sutil */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          opacity: 0.08,
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.18) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.18) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          maskImage:
            "radial-gradient(circle at 50% 35%, black 0%, transparent 65%)",
          WebkitMaskImage:
            "radial-gradient(circle at 50% 35%, black 0%, transparent 65%)",
        }}
      />

      {/* ======= CONTEÚDO ======= */}
      <div
        className="hero-grid"
        style={{
          width: "100%",
          maxWidth: 1120,
          display: "grid",
          gridTemplateColumns: "1.15fr 0.85fr",
          gap: 28,
          alignItems: "center",
          zIndex: 2,
        }}
      >
        {/* ESQUERDA */}
        <div className="nd-left" style={{ animation: "nd_fadeUp 900ms ease-out both" }}>
          {/* Badge */}
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
                boxShadow: "0 0 0 4px rgba(212,175,55,.18)",
              }}
            />
            <span
              style={{
                color: "rgba(245,215,110,.95)",
                fontWeight: 700,
                letterSpacing: ".02em",
                fontSize: 13,
                textTransform: "uppercase",
              }}
            >
              Instituto Nego Drama • Cultura • Educação • Esporte
            </span>
          </div>

          {/* Título */}
          <h1
            className="nd-title"
            style={{
              margin: 0,
              fontWeight: 900,
              letterSpacing: "-0.03em",
              lineHeight: 1.02,
              fontSize: "clamp(2.6rem, 5vw, 4.35rem)",
            }}
          >
            <span
              style={{
                background:
                  "linear-gradient(92deg, #f5d76e 0%, #d4af37 35%, #b8962e 75%, #f5d76e 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                filter: "drop-shadow(0 10px 30px rgba(212,175,55,.18))",
              }}
            >
              Transformar vidas
            </span>
            <br />
            <span style={{ color: "#f2f2f2" }}>
              começa com uma{" "}
              <span
                style={{
                  color: "rgba(245,215,110,.92)",
                  textShadow: "0 0 34px rgba(212,175,55,.25)",
                }}
              >
                escolha.
              </span>
            </span>
          </h1>

          {/* Texto */}
          <p
            className="nd-desc"
            style={{
              marginTop: 18,
              marginBottom: 28,
              maxWidth: 650,
              color: "rgba(235,235,235,.78)",
              fontSize: "1.05rem",
              lineHeight: 1.85,
            }}
          >
            A Organização Nego Drama transforma vidas na comunidade, capacitando
            jovens e suas famílias. Oferecendo oportunidades através da{" "}
            <span style={{ color: "rgba(245,215,110,.95)", fontWeight: 700 }}>
              cultura
            </span>
            , da{" "}
            <span style={{ color: "rgba(245,215,110,.95)", fontWeight: 700 }}>
              educação
            </span>{" "}
            e do{" "}
            <span style={{ color: "rgba(245,215,110,.95)", fontWeight: 700 }}>
              esporte
            </span>
            . Proporcionando uma nova profissão e dignidade. Juntos, podemos
            desarmar jovens e criar um futuro melhor. Precisamos da sua ajuda
            para continuar essa missão. Doe e faça a diferença!
          </p>

          {/* CTAs (mesmo tamanho) */}
          <div
            className="nd-ctas"
            style={{
              display: "flex",
              gap: 14,
              flexWrap: "wrap",
              alignItems: "center",
            }}
          >
            {/* DOAR (amarelo) */}
            <button
              onClick={goDonate}
              className="nd_btn nd_btn_primary"
              style={{
                minWidth: 270,
              }}
            >
              <span className="nd_icon" aria-hidden="true">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 21s-7-4.35-9.5-8.2C.4 9.1 2.6 6 6 6c1.9 0 3.3 1 4 2.05C10.7 7 12.1 6 14 6c3.4 0 5.6 3.1 3.5 6.8C19 16.65 12 21 12 21Z"
                    fill="rgba(0,0,0,.75)"
                  />
                </svg>
              </span>

              <span className="nd_btn_text">
                <span className="nd_btn_kicker">Apoie a missão</span>
                <span className="nd_btn_main">DOAR AGORA</span>
              </span>

              {/* ✅ shimmer do botão (continua) */}
              <span className="nd_shimmer" aria-hidden="true" />
              <span className="nd_glow" aria-hidden="true" />
            </button>

            {/* Secundário (mesmo tamanho) */}
            <a
              href="#objetivos"
              className="nd_btn nd_btn_secondary"
              style={{
                minWidth: 270,
                textDecoration: "none",
              }}
            >
              <span className="nd_icon" aria-hidden="true">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 2l2.2 6.6H21l-5.4 3.9L17.8 20 12 15.9 6.2 20l2.2-7.5L3 8.6h6.8L12 2z"
                    fill="rgba(245,215,110,.95)"
                  />
                </svg>
              </span>

              <span className="nd_btn_text">
                <span className="nd_btn_kicker">Saiba mais</span>
                <span className="nd_btn_main">VER OBJETIVOS</span>
              </span>
            </a>
          </div>
        </div>

        {/* DIREITA (vídeo vertical) */}
        <div
          className="nd-right"
          style={{
            display: "flex",
            justifyContent: "center",
            animation: "nd_fadeUp 1000ms ease-out 120ms both",
          }}
        >
          <div
            className="nd-video-card"
            style={{
              width: "100%",
              maxWidth: 360,
              borderRadius: 26,
              border: "1px solid rgba(212,175,55,.22)",
              background:
                "linear-gradient(180deg, rgba(255,255,255,.06), rgba(255,255,255,.02))",
              boxShadow:
                "0 30px 80px rgba(0,0,0,.45), inset 0 0 0 1px rgba(255,255,255,.06)",
              overflow: "hidden",
              position: "relative",
            }}
          >
            {/* topo com label */}
            <div
              style={{
                padding: "12px 14px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 10,
                borderBottom: "1px solid rgba(255,255,255,.08)",
                background:
                  "linear-gradient(180deg, rgba(0,0,0,.10), rgba(0,0,0,.02))",
              }}
            >
              <span
                style={{
                  color: "rgba(245,215,110,.92)",
                  fontWeight: 900,
                  fontSize: 12,
                  letterSpacing: ".12em",
                  textTransform: "uppercase",
                }}
              >
                Como ?
              </span>
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

            {/* vídeo vertical (em pé) */}
            <div
              style={{
                aspectRatio: "9 / 16",
                width: "100%",
                background: "rgba(0,0,0,.35)",
                position: "relative",
              }}
            >
              <video
                ref={videoRef}
                onClick={handleVideoClick}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  cursor: "pointer",
                }}
                src="/videoi1.mp4"
                muted={isMuted}
                loop
                playsInline
                preload="metadata"
                controls={false}
              />

              {/* botão mute/desmute */}
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  toggleMute();
                }}
                title={isMuted ? "Ativar som" : "Silenciar"}
                className="nd-audio-btn"
                style={{
                  position: "absolute",
                  top: 12,
                  right: 12,
                  borderRadius: 999,
                  border: "1px solid rgba(255,255,255,.16)",
                  background: "rgba(0,0,0,.45)",
                  color: "rgba(245,245,245,.92)",
                  padding: "10px 12px",
                  cursor: "pointer",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  fontWeight: 900,
                  letterSpacing: ".02em",
                  backdropFilter: "blur(10px)",
                  WebkitBackdropFilter: "blur(10px)",
                  boxShadow: "0 14px 28px rgba(0,0,0,.35)",
                }}
              >
                {isMuted ? (
                  <>
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M11 5L6 9H3v6h3l5 4V5Z"
                        fill="rgba(245,245,245,.92)"
                      />
                      <path
                        d="M16 9l5 6M21 9l-5 6"
                        stroke="rgba(245,215,110,.95)"
                        strokeWidth="2.2"
                        strokeLinecap="round"
                      />
                    </svg>
                    <span style={{ fontSize: 12 }}>Som</span>
                  </>
                ) : (
                  <>
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M11 5L6 9H3v6h3l5 4V5Z"
                        fill="rgba(245,245,245,.92)"
                      />
                      <path
                        d="M16 8c1.4 1.2 2 2.5 2 4s-.6 2.8-2 4"
                        stroke="rgba(245,215,110,.95)"
                        strokeWidth="2.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M18.5 5.5c2.4 2 3.5 4 3.5 6.5s-1.1 4.5-3.5 6.5"
                        stroke="rgba(245,215,110,.7)"
                        strokeWidth="2.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <span style={{ fontSize: 12 }}>Mute</span>
                  </>
                )}
              </button>

              {!hasUserStarted && (
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    display: "grid",
                    placeItems: "center",
                    pointerEvents: "none",
                    background:
                      "radial-gradient(circle at 50% 55%, rgba(0,0,0,.15) 0%, rgba(0,0,0,.55) 70%)",
                  }}
                >
                  <div
                    style={{
                      padding: "10px 12px",
                      borderRadius: 14,
                      border: "1px solid rgba(255,255,255,.14)",
                      background:
                        "linear-gradient(180deg, rgba(255,255,255,.08), rgba(255,255,255,.03))",
                      color: "rgba(245,245,245,.92)",
                      fontWeight: 900,
                      fontSize: 12,
                      letterSpacing: ".06em",
                      textTransform: "uppercase",
                      boxShadow: "0 18px 38px rgba(0,0,0,.40)",
                    }}
                  >
                    Clique para ativar o som
                  </div>
                </div>
              )}
            </div>

            {/* brilho passando no card do vídeo (SEM animação) */}
            <div
              aria-hidden="true"
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
        </div>
      </div>

      <style>
        {`
          @keyframes nd_fadeUp {
            from { opacity: 0; transform: translateY(18px); }
            to   { opacity: 1; transform: translateY(0); }
          }

          /* (o ObjectivesCard usa isso; mantendo) */
          @keyframes nd_sweep{
            0%   { transform: translateX(-85%); opacity: 0; }
            18%  { opacity: .55; }
            55%  { transform: translateX(85%); opacity: .55; }
            56%  { opacity: 0; }
            100% { transform: translateX(85%); opacity: 0; }
          }

          /* ===== Botões (padronizados) ===== */
          .nd_btn{
            position: relative;
            border: none;
            cursor: pointer;
            padding: 14px 18px;
            border-radius: 999px;
            font-weight: 900;
            letter-spacing: .02em;
            display: inline-flex;
            align-items: center;
            gap: 12px;
            justify-content: center;
            overflow: hidden;
            transform: translateY(0);
            transition: transform .22s ease, box-shadow .22s ease, filter .22s ease, border-color .22s ease;
            user-select: none;
            -webkit-tap-highlight-color: transparent;
          }
          .nd_btn:hover{ transform: translateY(-3px); }

          .nd_btn_primary{
            color: #141414;
            background: linear-gradient(135deg, #f5d76e 0%, #d4af37 40%, #b8962e 100%);
            box-shadow: 0 18px 50px rgba(212,175,55,.22), 0 10px 24px rgba(0,0,0,.35), inset 0 0 0 1px rgba(255,255,255,.22);
          }
          .nd_btn_primary:hover{
            filter: saturate(1.08);
            box-shadow: 0 24px 70px rgba(212,175,55,.30), 0 12px 28px rgba(0,0,0,.45), inset 0 0 0 1px rgba(255,255,255,.24);
          }

          .nd_btn_secondary{
            color: rgba(245,245,245,.92);
            border: 1px solid rgba(255,255,255,.14);
            background: linear-gradient(180deg, rgba(255,255,255,.06), rgba(255,255,255,.02));
            box-shadow: 0 12px 28px rgba(0,0,0,.30), inset 0 0 0 1px rgba(255,255,255,.04);
          }
          .nd_btn_secondary:hover{
            border-color: rgba(212,175,55,.22);
          }

          .nd_icon{
            width: 42px;
            height: 42px;
            border-radius: 999px;
            display: grid;
            place-items: center;
            background: linear-gradient(180deg, rgba(0,0,0,.15), rgba(0,0,0,.28));
            box-shadow: inset 0 0 0 1px rgba(255,255,255,.18), 0 10px 18px rgba(0,0,0,.25);
          }
          .nd_btn_text{
            display: grid;
            text-align: left;
            gap: 2px;
            line-height: 1.1;
          }
          .nd_btn_kicker{
            font-size: 12px;
            opacity: .85;
            font-weight: 900;
          }
          .nd_btn_main{
            font-size: 15px;
            font-weight: 1000;
            letter-spacing: .04em;
          }

          /* shimmer do botão (continua) */
          .nd_shimmer{
            position: absolute;
            inset: 0;
            border-radius: inherit;
            pointer-events: none;
            background: linear-gradient(
              120deg,
              transparent 42%,
              rgba(255,255,255,.72) 50%,
              transparent 58%
            );
            transform: translateX(-140%) skewX(-20deg);
            opacity: .55;
            mix-blend-mode: soft-light;
            will-change: transform, opacity;
            animation: nd_btn_shimmer 2.1s ease-in-out infinite;
          }

          @keyframes nd_btn_shimmer{
            0%   { transform: translateX(-140%) skewX(-20deg); opacity: 0; }
            12%  { opacity: .55; }
            55%  { transform: translateX(140%) skewX(-20deg); opacity: .55; }
            56%  { opacity: 0; }
            100% { transform: translateX(140%) skewX(-20deg); opacity: 0; }
          }

          .nd_glow{
            position: absolute;
            inset: 0;
            border-radius: inherit;
            pointer-events: none;
            background: radial-gradient(circle at 28% 18%,
              rgba(245,215,110,.40),
              rgba(212,175,55,.10) 42%,
              transparent 72%
            );
            filter: blur(12px);
            opacity: .70;
            animation: nd_pulse 2.8s ease-in-out infinite;
          }

          @keyframes nd_pulse{
            0%, 100% { opacity: .55; transform: scale(1); }
            50%      { opacity: .85; transform: scale(1.02); }
          }

          /* ===== Mobile polish (sem alterar desktop) ===== */
          @media (max-width: 980px){
            .nd-hero{
              /* mais confortável no mobile */
              padding: 112px 16px 56px !important;
            }

            .hero-grid{
              grid-template-columns: 1fr !important;
              gap: 22px !important;
            }

            .nd-left{
              /* melhora leitura e espaçamento no mobile sem mexer no desktop */
              text-align: left;
            }

            .nd-title{
              font-size: clamp(2.15rem, 7.2vw, 3.1rem) !important;
              line-height: 1.03 !important;
            }

            .nd-desc{
              font-size: 1rem !important;
              line-height: 1.75 !important;
              margin-bottom: 22px !important;
            }

            .nd-ctas{
              gap: 12px !important;
            }

            .nd_btn{
              width: 100%;
              min-width: 0 !important;
              justify-content: flex-start;
              padding: 14px 16px;
            }

            .nd_icon{
              width: 40px;
              height: 40px;
            }

            .nd-video-card{
              max-width: 420px !important;
            }

            .nd-audio-btn{
              padding: 10px 11px !important;
            }
          }

          @media (max-width: 420px){
            .nd-hero{
              padding: 104px 14px 52px !important;
            }
            .nd_btn_main{ font-size: 14px; }
            .nd_btn_kicker{ font-size: 11px; }
          }

          /* acessibilidade */
          @media (prefers-reduced-motion: reduce){
            .nd_shimmer, .nd_glow, .nd_btn, .nd-left, .nd-right{
              animation: none !important;
              transition: none !important;
            }
            .nd_btn:hover{ transform: none !important; }
          }
        `}
      </style>
    </section>
  );
}

/* ======= CARD GUARDADO (pra usar depois) ======= */
export function ObjectivesCard() {
  const items = [
    "Capacitar jovens e famílias com oportunidades reais.",
    "Oferecer caminhos através da cultura, educação e esporte.",
    "Criar profissão, dignidade e pertencimento.",
    "Desarmar jovens com perspectiva e futuro.",
  ];

  return (
    <div
      style={{
        width: "100%",
        maxWidth: 420,
        borderRadius: 26,
        padding: 18,
        border: "1px solid rgba(212,175,55,.22)",
        background:
          "linear-gradient(180deg, rgba(255,255,255,.06), rgba(255,255,255,.02))",
        boxShadow:
          "0 30px 80px rgba(0,0,0,.45), inset 0 0 0 1px rgba(255,255,255,.06)",
        overflow: "hidden",
        position: "relative",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: -2,
          background:
            "radial-gradient(circle at 30% 15%, rgba(245,215,110,.18), transparent 55%), radial-gradient(circle at 70% 85%, rgba(212,175,55,.12), transparent 55%)",
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
              fontWeight: 900,
              letterSpacing: ".02em",
              fontSize: 14,
              textTransform: "uppercase",
            }}
          >
            Objetivos do Instituto
          </span>
          <span
            style={{
              color: "rgba(245,245,245,.9)",
              fontSize: 18,
              fontWeight: 800,
            }}
          >
            Um futuro melhor, junto com você.
          </span>
        </div>

        <div
          style={{
            width: 44,
            height: 44,
            borderRadius: 14,
            display: "grid",
            placeItems: "center",
            background:
              "linear-gradient(135deg, rgba(245,215,110,.20), rgba(212,175,55,.10))",
            border: "1px solid rgba(212,175,55,.25)",
            boxShadow: "0 16px 40px rgba(212,175,55,.14)",
          }}
        >
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 2l2.2 6.6H21l-5.4 3.9L17.8 20 12 15.9 6.2 20l2.2-7.5L3 8.6h6.8L12 2z"
              fill="rgba(245,215,110,.95)"
            />
          </svg>
        </div>
      </div>

      <div style={{ position: "relative", display: "grid", gap: 10 }}>
        {items.map((t, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              gap: 10,
              alignItems: "flex-start",
              padding: "12px 12px",
              borderRadius: 16,
              border: "1px solid rgba(255,255,255,.10)",
              background:
                "linear-gradient(180deg, rgba(0,0,0,.10), rgba(0,0,0,.04))",
            }}
          >
            <span
              style={{
                width: 22,
                height: 22,
                borderRadius: 999,
                display: "grid",
                placeItems: "center",
                marginTop: 2,
                background:
                  "linear-gradient(135deg, #f5d76e, #d4af37, #b8962e)",
                boxShadow: "0 10px 18px rgba(212,175,55,.18)",
              }}
            >
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M20 6L9 17l-5-5"
                  stroke="#141414"
                  strokeWidth="2.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>

            <span style={{ color: "rgba(240,240,240,.86)", lineHeight: 1.5 }}>
              {t}
            </span>
          </div>
        ))}
      </div>

      <div
        style={{
          position: "relative",
          marginTop: 14,
          paddingTop: 12,
          borderTop: "1px solid rgba(255,255,255,.10)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 12,
          flexWrap: "wrap",
        }}
      >
        <span style={{ color: "rgba(235,235,235,.72)", fontSize: 13 }}>
          Precisamos da sua ajuda para continuar essa missão.
        </span>
        <span
          style={{
            border: "1px solid rgba(212,175,55,.28)",
            background:
              "linear-gradient(180deg, rgba(245,215,110,.16), rgba(212,175,55,.06))",
            color: "rgba(245,215,110,.95)",
            fontWeight: 900,
            padding: "10px 12px",
            borderRadius: 14,
          }}
        >
          Doar agora →
        </span>
      </div>

      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          background:
            "linear-gradient(120deg, transparent 0%, rgba(255,255,255,.10) 20%, transparent 40%)",
          transform: "translateX(-80%)",
          animation: "nd_sweep 3.6s ease-in-out infinite",
          opacity: 0.55,
        }}
      />
    </div>
  );
}

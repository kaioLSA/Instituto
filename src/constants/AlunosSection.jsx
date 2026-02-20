import { useEffect, useMemo, useRef, useState } from "react";

export default function AlunosSection() {
  const wrapRef = useRef(null);

  // ✅ qual card está "ativo" (único que pode tocar)
  const [active, setActive] = useState(0);

  // ✅ pause por card (clicou no mesmo ativo = pausa/retoma)
  const [paused, setPaused] = useState([false, true, true]); // agora são 3 cards

  // ✅ refs dos vídeos
  const vrefs = useRef([]);

  // ✅ refs espelho (evita bug de stale state em observer)
  const activeRef = useRef(active);
  const pausedRef = useRef(paused);

  useEffect(() => {
    activeRef.current = active;
  }, [active]);

  useEffect(() => {
    pausedRef.current = paused;
  }, [paused]);

  // ✅ agora só Aluno 02, 03 e 04
  const ALUNOS = useMemo(
    () => [
      {
        nome: "Aluno 02",
        tag: "Educação",
        desc: "Foco no aprendizado e evolução constante.",
        srcMov: "/aluno2.mov",
        srcMp4: "/aluno2.mp4",
      },
      {
        nome: "Aluno 03",
        tag: "Esporte",
        desc: "Força, rotina e energia pra vencer desafios.",
        srcMov: "/aluno3.mov",
        srcMp4: "/aluno3.mp4",
      },
      {
        nome: "Aluno 04",
        tag: "Transformação",
        desc: "Uma nova perspectiva e um futuro diferente.",
        srcMov: "/aluno4.mov",
        srcMp4: "/aluno4.mp4",
      },
    ],
    []
  );

  // ✅ um só tocando, os outros param e VOLTAM pro começo
  const applyActivePlayback = async (nextActive, resetActiveToStart = false) => {
    const pArr = pausedRef.current;
    const total = ALUNOS.length;

    for (let i = 0; i < total; i++) {
      const v = vrefs.current[i];
      if (!v) continue;

      if (i === nextActive) {
        try {
          v.loop = true;
          v.playsInline = true;

          if (resetActiveToStart) {
            try {
              v.currentTime = 0;
            } catch {}
          }

          // se esse ativo NÃO está pausado, toca; senão, mantém parado no frame atual
          if (!pArr[i]) {
            await v.play();
          } else {
            v.pause();
          }
        } catch {}
      } else {
        try {
          v.pause();
          v.currentTime = 0; // ✅ volta pro começo quando sai do ativo
        } catch {}
      }
    }
  };

  // ✅ clique no card:
  // - se clicou no ativo: pausa/retoma
  // - se clicou em outro: troca ativo, volta do começo e toca (loop)
  const onCardClick = async (idx) => {
    const v = vrefs.current[idx];
    if (!v) return;

    // clicou no mesmo ativo: toggle pause/play
    if (activeRef.current === idx) {
      const nextPaused = !pausedRef.current[idx];

      setPaused((prev) => {
        const next = [...prev];
        next[idx] = nextPaused;
        return next;
      });

      try {
        if (nextPaused) v.pause();
        else await v.play();
      } catch {}
      return;
    }

    // clicou em outro: ele vira ativo, sempre começa do começo e tocando
    setActive(idx);

    // define: novo ativo tocando, todos os outros pausados
    setPaused(() => {
      const next = new Array(ALUNOS.length).fill(true);
      next[idx] = false; // ✅ novo ativo toca
      return next;
    });

    try {
      v.currentTime = 0;
    } catch {}

    await applyActivePlayback(idx, true);
  };

  // ✅ quando active/paused mudam, garante consistência do ativo
  useEffect(() => {
    const idx = active;
    const v = vrefs.current[idx];
    if (!v) return;

    try {
      if (paused[idx]) v.pause();
      else v.play().catch(() => {});
    } catch {}
  }, [active, paused]);

  // ✅ pausa tudo fora do viewport; ao voltar, retoma só se o ativo não estiver pausado
  useEffect(() => {
    const section = wrapRef.current;
    if (!section) return;

    const obs = new IntersectionObserver(
      ([entry]) => {
        const visible = entry.isIntersecting && entry.intersectionRatio > 0.2;

        if (!visible) {
          vrefs.current.forEach((v) => {
            try {
              v?.pause();
            } catch {}
          });
        } else {
          const idx = activeRef.current;
          applyActivePlayback(idx, false);
        }
      },
      { threshold: [0, 0.2, 0.4, 0.7, 1] }
    );

    obs.observe(section);
    return () => obs.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ✅ fallback mov -> mp4 por card
  const onVideoError = (idx) => {
    const v = vrefs.current[idx];
    if (!v) return;

    const cur = v.getAttribute("data-src") || "";
    if (cur.endsWith(".mov")) {
      const mp4 = ALUNOS[idx].srcMp4;
      v.setAttribute("data-src", mp4);
      v.src = mp4;
      v.load();

      // se era o ativo: começa do começo; toca apenas se não estiver pausado
      if (activeRef.current === idx) {
        try {
          v.currentTime = 0;
        } catch {}
        if (!pausedRef.current[idx]) v.play().catch(() => {});
      }
    }
  };

  return (
    <section
      id="alunos"
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
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          background:
            "radial-gradient(circle at 50% 35%, transparent 0%, rgba(0,0,0,.35) 55%, rgba(0,0,0,.65) 100%)",
        }}
      />

      {/* glows (✅ mantidos, ❌ sem seguir o mouse) */}
      <div
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
        }}
      />
      <div
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
        }}
      />

      {/* grid sutil */}
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
            "radial-gradient(circle at 50% 20%, black 0%, transparent 65%)",
          WebkitMaskImage:
            "radial-gradient(circle at 50% 20%, black 0%, transparent 65%)",
        }}
      />

      <div
        className="nd_container"
        style={{
          width: "100%",
          maxWidth: 1120,
          margin: "0 auto",
          position: "relative",
          zIndex: 2,
        }}
      >
        {/* header */}
        <div className="nd_reveal nd_reveal_1" style={{ marginBottom: 22 }}>
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
                fontWeight: 900,
                letterSpacing: ".08em",
                fontSize: 12,
                textTransform: "uppercase",
              }}
            >
              Alunos • Histórias reais
            </span>
          </div>

          <h2
            style={{
              margin: 0,
              fontWeight: 950,
              letterSpacing: "-0.03em",
              lineHeight: 1.05,
              fontSize: "clamp(2.0rem, 3.6vw, 3.0rem)",
              color: "#f2f2f2",
            }}
          >
            Conheça quem está{" "}
            <span
              style={{
                background:
                  "linear-gradient(92deg, #f5d76e 0%, #d4af37 35%, #b8962e 75%, #f5d76e 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                filter: "drop-shadow(0 10px 30px rgba(212,175,55,.16))",
              }}
            >
              transformando
            </span>{" "}
            a própria história.
          </h2>

          <p
            style={{
              marginTop: 12,
              marginBottom: 0,
              maxWidth: 760,
              color: "rgba(235,235,235,.76)",
              fontSize: "1.02rem",
              lineHeight: 1.85,
            }}
          >
            Clique em um aluno para assistir em loop. Ao trocar, o anterior para
            e volta do começo. Se clicar de novo no mesmo vídeo, você{" "}
            <span style={{ color: "rgba(245,215,110,.95)", fontWeight: 900 }}>
              pausa/retoma
            </span>
            .
          </p>
        </div>

        {/* grid vídeos */}
        <div
          className="nd_grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)", // ✅ agora 3 colunas
            gap: 18,
            marginTop: 22,
          }}
        >
          {ALUNOS.map((a, idx) => {
            const isActive = active === idx;
            const isPaused = paused[idx];

            return (
              <button
                key={idx}
                className={`nd_card nd_reveal nd_reveal_${idx + 2} ${
                  isActive ? "is-active" : ""
                }`}
                onClick={() => onCardClick(idx)}
                type="button"
                style={{
                  textAlign: "left",
                  padding: 0,
                  border: "none",
                  background: "transparent",
                  cursor: "pointer",
                  outline: "none",
                }}
              >
                <div
                  style={{
                    borderRadius: 24,
                    border: isActive
                      ? "1px solid rgba(245,215,110,.35)"
                      : "1px solid rgba(212,175,55,.18)",
                    background:
                      "linear-gradient(180deg, rgba(255,255,255,.06), rgba(255,255,255,.02))",
                    boxShadow: isActive
                      ? "0 34px 90px rgba(0,0,0,.55), 0 18px 46px rgba(212,175,55,.16), inset 0 0 0 1px rgba(255,255,255,.06)"
                      : "0 26px 70px rgba(0,0,0,.48), inset 0 0 0 1px rgba(255,255,255,.05)",
                    overflow: "hidden",
                    position: "relative",
                  }}
                >
                  {/* topo */}
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
                    <div style={{ display: "grid", gap: 2 }}>
                      <span
                        style={{
                          color: "rgba(245,215,110,.92)",
                          fontWeight: 950,
                          fontSize: 12,
                          letterSpacing: ".14em",
                          textTransform: "uppercase",
                        }}
                      >
                        {a.tag}
                      </span>
                      <span
                        style={{
                          color: "rgba(245,245,245,.92)",
                          fontWeight: 900,
                          fontSize: 13,
                          letterSpacing: ".02em",
                        }}
                      >
                        {a.nome}
                      </span>
                    </div>

                    <span
                      className={`nd_pill ${isActive ? "on" : ""}`}
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 8,
                        padding: "8px 10px",
                        borderRadius: 999,
                        border: isActive
                          ? "1px solid rgba(245,215,110,.28)"
                          : "1px solid rgba(255,255,255,.12)",
                        background: isActive
                          ? "linear-gradient(180deg, rgba(245,215,110,.18), rgba(212,175,55,.06))"
                          : "rgba(0,0,0,.25)",
                        color: isActive
                          ? "rgba(245,215,110,.95)"
                          : "rgba(245,245,245,.78)",
                        fontWeight: 950,
                        fontSize: 11,
                        letterSpacing: ".06em",
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
                          background: isActive
                            ? "linear-gradient(180deg, #f5d76e, #d4af37, #b8962e)"
                            : "rgba(255,255,255,.35)",
                          boxShadow: isActive
                            ? "0 0 0 4px rgba(212,175,55,.14)"
                            : "none",
                        }}
                      />
                      {isActive ? (isPaused ? "PAUSADO" : "TOCANDO") : "CLIQUE"}
                    </span>
                  </div>

                  {/* vídeo */}
                  <div
                    style={{
                      aspectRatio: "9 / 16",
                      width: "100%",
                      position: "relative",
                      background: "rgba(0,0,0,.35)",
                    }}
                  >
                    <video
                      ref={(el) => (vrefs.current[idx] = el)}
                      data-src={a.srcMov}
                      src={a.srcMov}
                      playsInline
                      preload="metadata"
                      loop
                      controls={false}
                      onError={() => onVideoError(idx)}
                      onCanPlay={() => {
                        const v = vrefs.current[idx];
                        if (!v) return;

                        // se não é o ativo, deixa travado no começo
                        if (idx !== activeRef.current) {
                          try {
                            v.pause();
                            v.currentTime = 0;
                          } catch {}
                        } else {
                          // é o ativo: toca somente se não estiver pausado
                          if (!pausedRef.current[idx]) v.play().catch(() => {});
                          else v.pause();
                        }
                      }}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        display: "block",
                        filter: isActive
                          ? "saturate(1.05) contrast(1.02)"
                          : "saturate(.95) contrast(.98)",
                        transform: isActive ? "scale(1.01)" : "scale(1)",
                        transition:
                          "transform .35s ease, filter .35s ease, opacity .35s ease",
                        opacity: 0.98,
                      }}
                    />

                    {/* overlay */}
                    <div
                      aria-hidden="true"
                      style={{
                        position: "absolute",
                        inset: 0,
                        pointerEvents: "none",
                        background: isActive
                          ? "linear-gradient(180deg, rgba(0,0,0,.18), rgba(0,0,0,.58))"
                          : "linear-gradient(180deg, rgba(0,0,0,.10), rgba(0,0,0,.62))",
                        opacity: isActive ? 0.55 : 0.78,
                        transition: "opacity .28s ease",
                      }}
                    />

                    {/* badge central */}
                    <div
                      style={{
                        position: "absolute",
                        inset: 0,
                        display: "grid",
                        placeItems: "center",
                        pointerEvents: "none",
                      }}
                    >
                      <div
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: 10,
                          padding: "10px 12px",
                          borderRadius: 14,
                          border: isActive
                            ? "1px solid rgba(245,215,110,.22)"
                            : "1px solid rgba(255,255,255,.14)",
                          background: isActive
                            ? "linear-gradient(180deg, rgba(245,215,110,.14), rgba(212,175,55,.06))"
                            : "linear-gradient(180deg, rgba(255,255,255,.08), rgba(255,255,255,.03))",
                          color: isActive
                            ? "rgba(245,215,110,.95)"
                            : "rgba(245,245,245,.92)",
                          fontWeight: 950,
                          fontSize: 12,
                          letterSpacing: ".06em",
                          textTransform: "uppercase",
                          boxShadow: "0 18px 38px rgba(0,0,0,.40)",
                          opacity: isActive ? 0 : 1,
                          transition: "opacity .25s ease",
                        }}
                      >
                        <span
                          style={{
                            width: 34,
                            height: 34,
                            borderRadius: 999,
                            display: "grid",
                            placeItems: "center",
                            background: "rgba(0,0,0,.28)",
                            border: "1px solid rgba(255,255,255,.16)",
                            backdropFilter: "blur(10px)",
                            WebkitBackdropFilter: "blur(10px)",
                          }}
                        >
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M9 18V6l10 6-10 6Z"
                              fill="rgba(245,245,245,.92)"
                            />
                          </svg>
                        </span>
                        Clique para assistir
                      </div>
                    </div>

                    {/* indicador canto */}
                    <div
                      style={{
                        position: "absolute",
                        bottom: 12,
                        left: 12,
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 8,
                        padding: "9px 10px",
                        borderRadius: 999,
                        border: "1px solid rgba(255,255,255,.14)",
                        background: "rgba(0,0,0,.42)",
                        color: "rgba(245,245,245,.92)",
                        fontWeight: 900,
                        fontSize: 11,
                        letterSpacing: ".06em",
                        textTransform: "uppercase",
                        backdropFilter: "blur(10px)",
                        WebkitBackdropFilter: "blur(10px)",
                        pointerEvents: "none",
                      }}
                    >
                      {isActive ? (
                        <>
                          <span
                            style={{
                              width: 8,
                              height: 8,
                              borderRadius: 999,
                              background:
                                "linear-gradient(180deg, #f5d76e, #d4af37, #b8962e)",
                              boxShadow: "0 0 0 4px rgba(212,175,55,.14)",
                            }}
                          />
                          {isPaused ? "PAUSADO" : "LOOP"}
                        </>
                      ) : (
                        <>
                          <span
                            style={{
                              width: 8,
                              height: 8,
                              borderRadius: 999,
                              background: "rgba(255,255,255,.35)",
                            }}
                          />
                          PARADO
                        </>
                      )}
                    </div>
                  </div>

                  {/* texto */}
                  <div style={{ padding: "14px 14px 16px" }}>
                    <p
                      style={{
                        margin: 0,
                        color: "rgba(235,235,235,.78)",
                        lineHeight: 1.65,
                        fontSize: 13.5,
                      }}
                    >
                      {a.desc}
                    </p>
                  </div>

                  {/* sweep brilho */}
                  <div
                    aria-hidden="true"
                    className="nd_sweep"
                    style={{
                      position: "absolute",
                      inset: 0,
                      pointerEvents: "none",
                      background:
                        "linear-gradient(120deg, transparent 0%, rgba(255,255,255,.10) 22%, transparent 42%)",
                      transform: "translateX(-85%)",
                      opacity: isActive ? 0.75 : 0.5,
                    }}
                  />
                </div>
              </button>
            );
          })}
        </div>

        {/* hint */}
        <div
          className="nd_reveal nd_reveal_6"
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
              color: "rgba(235,235,235,.70)",
              fontSize: 13,
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              border: "1px solid rgba(255,255,255,.10)",
              background:
                "linear-gradient(180deg, rgba(255,255,255,.05), rgba(255,255,255,.02))",
              padding: "10px 12px",
              borderRadius: 14,
              boxShadow: "0 14px 34px rgba(0,0,0,.25)",
            }}
          >
            <span
              style={{
                width: 10,
                height: 10,
                borderRadius: 999,
                background: "rgba(245,215,110,.65)",
                boxShadow: "0 0 0 4px rgba(212,175,55,.12)",
              }}
            />
            Dica: clicar no mesmo vídeo pausa/retoma. Ao trocar, o anterior volta pro
            começo.
          </div>

          <div
            style={{
              color: "rgba(245,215,110,.92)",
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
          .nd_reveal{
            opacity: 0;
            transform: translateY(18px);
            animation: nd_fadeUp 900ms ease-out both;
          }
          .nd_reveal_1{ animation-delay: 80ms; }
          .nd_reveal_2{ animation-delay: 120ms; }
          .nd_reveal_3{ animation-delay: 180ms; }
          .nd_reveal_4{ animation-delay: 240ms; }
          .nd_reveal_5{ animation-delay: 300ms; }
          .nd_reveal_6{ animation-delay: 360ms; }

          @keyframes nd_fadeUp {
            from { opacity: 0; transform: translateY(18px); }
            to   { opacity: 1; transform: translateY(0); }
          }

          .nd_card .nd_sweep{
            transition: opacity .35s ease, transform 1.1s ease;
          }
          .nd_card:hover .nd_sweep{
            opacity: .75;
            transform: translateX(70%);
          }

          .nd_card > div{
            transition: transform .25s ease, box-shadow .25s ease, border-color .25s ease, filter .25s ease;
          }
          .nd_card:hover > div{
            transform: translateY(-4px);
            filter: saturate(1.04);
          }
          .nd_card.is-active > div{
            transform: translateY(-4px);
          }

          .nd_pill.on span:first-child{
            animation: nd_dot 1.4s ease-in-out infinite;
          }
          @keyframes nd_dot{
            0%,100%{ transform: scale(1); opacity: 1; }
            50%{ transform: scale(1.25); opacity: .75; }
          }

          /* ✅ com 3 cards fica lindo no desktop; cai pra 2 e depois 1 */
          @media (max-width: 1060px){
            .nd_grid{ grid-template-columns: repeat(2, 1fr) !important; }
          }
          @media (max-width: 560px){
            .nd_grid{ grid-template-columns: 1fr !important; }
            .nd_container{ max-width: 520px !important; }
          }

          @media (prefers-reduced-motion: reduce){
            .nd_reveal{ animation: none !important; opacity: 1 !important; transform: none !important; }
            .nd_card .nd_sweep{ transition: none !important; }
            .nd_card > div{ transition: none !important; }
            .nd_pill.on span:first-child{ animation: none !important; }
          }
        `}
      </style>
    </section>
  );
}
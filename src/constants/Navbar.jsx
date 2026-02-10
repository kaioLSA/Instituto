import React, { useEffect, useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  // ✅ ids das seções
  const navLinks = [
    { label: "Quem Somos", id: "Quem Somos" },
    { label: "Projetos", id: "Projetos" },
    { label: "Inscrições", id: "Inscrições" },
    { label: "Doações", id: "Doações" },
    { label: "Nóticia", id: "Nóticia" },
  ];

  // ✅ scroll suave (sem mexer no visual)
  const scrollToId = (id) => {
    const el = document.getElementById(id);
    if (!el) return;

    const navbarHeight = 120; // mantém igual seu padrão
    const top =
      el.getBoundingClientRect().top + window.pageYOffset - navbarHeight;

    window.scrollTo({ top, behavior: "smooth" });
  };

  useEffect(() => {
    const fix = () => {
      const el = document.querySelector(".navbar-glass-layer");
      if (!el) return;

      // força repaint/composição
      el.style.backdropFilter = "blur(26px)";
      el.style.webkitBackdropFilter = "blur(26px)";

      el.classList.remove("bf-fix");
      void el.offsetHeight; // reflow
      el.classList.add("bf-fix");
    };

    fix();

    // 🔥 depois que as animações acabam (onde geralmente o blur “morre”)
    const t1 = setTimeout(fix, 100);
    const t2 = setTimeout(fix, 900);
    const t3 = setTimeout(fix, 1700);

    window.addEventListener("pageshow", fix);
    window.addEventListener("resize", fix);
    window.addEventListener("scroll", fix, { passive: true }); // ajuda MUITO no desktop

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      window.removeEventListener("pageshow", fix);
      window.removeEventListener("resize", fix);
      window.removeEventListener("scroll", fix);
    };
  }, []);

  return (
    <>
      <style>{`
        html, body { background: #000; }

        /* ================= WRAPPER (AGORA NAVBAR NORMAL NO TOPO) ================= */
        .navbar-wrapper {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          z-index: 2000;

          /* antes era centralizado e com pointer-events none */
          pointer-events: none;
          transform: translate3d(0, 0, 0);
        }

        .navbar-wrapper.hide {
          opacity: 0;
          pointer-events: none;
        }

        /* ================= NAVBAR (RETANGULAR / OPACA) ================= */
        .navbar-glass {
          pointer-events: all;

          width: 100%;
          max-width: none;

          /* ✅ retângulo, sem pontas arredondadas */
          border-radius: 0;

          position: relative;
          overflow: hidden;

          isolation: isolate;
          contain: paint;
          transform: translateZ(0);

          /* ✅ separa do conteúdo (pra “flutuar” mesmo em fundo branco) */
          box-shadow:
            0 18px 55px rgba(0,0,0,.55),
            0 1px 0 rgba(255,255,255,.06);
        }

        /* ✅ camada do fundo (não transparente demais) */
        .navbar-glass-layer {
          position: absolute;
          inset: 0;

          border-radius: 0;

          /* ✅ fundo escuro sólido (pra não sumir no branco) */
          background: rgba(10, 10, 10, 0.92);

          /* pode manter blur, mas agora a cor base é escura e firme */
          backdrop-filter: blur(18px);
          -webkit-backdrop-filter: blur(18px);

          /* contorno premium */
          border-bottom: 1px solid rgba(255,255,255,0.10);

          /* ✅ dourado no brilho */
          box-shadow: inset 0 -1px 0 rgba(212, 175, 55, 0.20);

          /* leve textura */
          background-image:
            radial-gradient(circle at 25% 10%, rgba(245,215,110,0.10), transparent 45%),
            radial-gradient(circle at 80% 120%, rgba(212,175,55,0.10), transparent 55%);

          will-change: backdrop-filter, transform;
          transform: translateZ(0);
        }

        .navbar-glass-layer::before{
          content:"";
          position:absolute;
          inset:0;
          pointer-events:none;

          /* highlights sutis */
          background: linear-gradient(
            90deg,
            rgba(255,255,255,0.04),
            transparent 25%,
            transparent 75%,
            rgba(255,255,255,0.04)
          );
          opacity: .65;
        }

        /* ✅ hack extra: quando bf-fix existe, força camada */
        .navbar-glass-layer.bf-fix { filter: none; }

        /* ================= CONTEÚDO (ACIMA DO FUNDO) ================= */
        .navbar-inner {
          position: relative;
          z-index: 2;

          display: flex;
          align-items: center;
          justify-content: space-between;

          /* ✅ padding padrão de navbar normal */
          padding: 14px 28px;

          /* mantém tua animação */
          opacity: 0;
          animation: glassSlideIn 1.5s ease-out forwards;
          will-change: transform, opacity;

          /* ✅ largura bonita sem “pílula” */
          max-width: 1180px;
          margin: 0 auto;
        }

        @keyframes glassSlideIn {
          from { transform: translate3d(0,-12px,0); opacity: 0; }
          to { transform: translate3d(0,0,0); opacity: 1; }
        }

        /* ================= LOGO ================= */
        .nav-logo img { height: 54px; }
        .logo-mobile { display: none; }

        /* ================= MENU DESKTOP ================= */
        .nav-menu {
          display: flex;
          gap: 34px;
          list-style: none;
          margin: 0;
          padding: 0;
          top: 0; /* antes tava -100px */
        }

        .nav-item {
          font-size: 15px;
          font-weight: 600;
          color: rgba(255,255,255,.92);
          cursor: pointer;
          position: relative;
        }

        .nav-item::after {
          content: "";
          position: absolute;
          bottom: -10px;
          left: 50%;
          width: 0;
          height: 2px;
          background: linear-gradient(90deg, #b8962e, #f5d76e, #b8962e);
          transition: 0.25s;
        }

        .nav-item:hover::after { width: 100%; left: 0; }
        .nav-item:hover { color: rgba(245,215,110,.95); }

        /* ================= BOTÃO ================= */
        .contact-button {
          position: relative;
          height: 44px;
          padding: 0 30px;
          border-radius: 12px; /* ✅ mais “navbar normal” (não pill) */
          border: 1px solid rgba(255,255,255,0.10);
          font-size: 15px;
          font-weight: 700;
          color: #101010;

          background: linear-gradient(135deg, #b8962e, #f5d76e, #b8962e);

          cursor: pointer;
          overflow: hidden;
          transform-origin: center;
          transition: transform 0.22s ease, box-shadow .22s ease;
          will-change: transform;
          box-shadow: 0 14px 40px rgba(0,0,0,.35);
        }

        .contact-button::after {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(
            120deg,
            transparent 35%,
            rgba(255, 255, 255, 0.55) 50%,
            transparent 65%
          );
          transform: translateX(-120%) skewX(-20deg);
          pointer-events: none;
        }

        .contact-button:hover::after { animation: shine 0.9s ease forwards; }

        @keyframes shine {
          to { transform: translateX(120%) skewX(-20deg); }
        }

        @media (min-width: 901px) {
          .contact-button:hover {
            transform: translateY(-2px);
            box-shadow: 0 18px 56px rgba(0,0,0,.55);
          }
        }

        /* ================= HAMBURGER ================= */
        .hamburger {
          display: none;
          flex-direction: column;
          gap: 6px;
          cursor: pointer;
        }

        .hamburger span {
          width: 24px;
          height: 2px;
          background: rgba(255,255,255,.92);
        }

        .mobile-menu { display: none; }

        /* ================= MOBILE ================= */
        @media (max-width: 900px) {
          .nav-menu, .button-wrapper { display: none; }
          .hamburger { display: flex; }
          .logo-desktop { display: none; }
          .logo-mobile { display: block; height: 32px; }

          .navbar-wrapper.hide { visibility: hidden; }

          .mobile-menu {
            display: flex;
            position: fixed;
            inset: 0;
            background: rgba(0,0,0,0.88);
            backdrop-filter: blur(24px);
            -webkit-backdrop-filter: blur(24px);
            flex-direction: column;
            align-items: center;
            justify-content: center;
            gap: 32px;
            transform: translateX(100%);
            transition: 0.4s ease;
            z-index: 2000;
          }

          .mobile-menu.open { transform: translateX(0); }

          .mobile-close {
            position: absolute;
            top: 22px;
            right: 22px;
            font-size: 34px;
            color: white;
            cursor: pointer;
          }

          .mobile-nav li {
            font-size: 22px;
            color: white;
            margin-bottom: 10px;
            line-height: 1.8;
            cursor: pointer;
            transition: 0.25s;
            text-align: center;
            width: 100%;
          }

          .mobile-nav li:hover { color: #f5d76e; }

          .mobile-cta::after { animation: shine 2.2s ease infinite; }
        }
      `}</style>

      {/* ===== NAVBAR DESKTOP / MOBILE TOPO ===== */}
      <header className={`navbar-wrapper ${open ? "hide" : ""}`}>
        <nav className="navbar-glass">
          {/* camada estática do blur */}
          <div className="navbar-glass-layer bf-fix" />

          <div className="navbar-inner">
            {/* LOGO */}
            <div
              className="nav-logo"
              onClick={() => scrollToId("hero")}
              style={{ cursor: "pointer" }}
            >
              <img src="/logo.png" alt="Logo Desktop" className="logo-desktop" />
              <img src="/logo2.png" alt="Logo Mobile" className="logo-mobile" />
            </div>

            {/* MENU DESKTOP */}
            <ul className="nav-menu">
              {navLinks.map((l) => (
                <li
                  key={l.id}
                  className="nav-item"
                  onClick={() => scrollToId(l.id)}
                >
                  {l.label}
                </li>
              ))}
            </ul>

            {/* BOTÃO DESKTOP */}
            <div className="button-wrapper">
              <button
                className="contact-button"
                onClick={() => scrollToId("contato")}
                type="button"
              >
                Fale Conosco !
              </button>
            </div>

            {/* HAMBURGUER MOBILE */}
            <div className="hamburger" onClick={() => setOpen(true)}>
              <span />
              <span />
              <span />
            </div>
          </div>
        </nav>
      </header>

      {/* ===== MENU MOBILE ===== */}
      <div className={`mobile-menu ${open ? "open" : ""}`}>
        <div className="mobile-close" onClick={() => setOpen(false)}>
          ✕
        </div>

        <ul className="mobile-nav">
          {navLinks.map((l) => (
            <li
              key={l.id}
              onClick={() => {
                setOpen(false);
                // espera o menu começar a fechar pra não “travar” a sensação
                setTimeout(() => scrollToId(l.id), 80);
              }}
            >
              {l.label}
            </li>
          ))}
        </ul>

        <button
          className="contact-button mobile-cta"
          onClick={() => {
            setOpen(false);
            setTimeout(() => scrollToId("contato"), 80);
          }}
          type="button"
        >
          Fale Conosco !
        </button>
      </div>
    </>
  );
}

import { FaWhatsapp, FaInstagram, FaFacebookF, FaYoutube } from "react-icons/fa";
import { FaEnvelope, FaPhoneAlt } from "react-icons/fa";

export default function Footer() {
  return (
    <footer
      style={{
        position: "relative",
        background: "#0b0b0b",
        color: "rgba(235,235,235,.82)",
        padding: "64px 20px 42px",
        overflow: "hidden",
      }}
    >
      {/* glow sutil */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          background:
            "radial-gradient(circle at 20% 10%, rgba(212,175,55,.18), transparent 45%), radial-gradient(circle at 80% 90%, rgba(245,215,110,.12), transparent 55%)",
          opacity: 0.35,
        }}
      />

      <div
        className="ft_grid"
        style={{
          maxWidth: 1120,
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          gap: 28,
          alignItems: "start",
          position: "relative",
          zIndex: 2,
        }}
      >
        {/* ESQUERDA */}
        <div className="ft_left" style={{ display: "grid", gap: 14 }}>
          <img
            src="/logo01.png"
            alt="Instituto Nego Drama"
            style={{
              width: 160,
              objectFit: "contain",
            }}
          />

          <span
            className="ft_rights"
            style={{
              fontSize: 13,
              color: "rgba(235,235,235,.55)",
              lineHeight: 1.6,
            }}
          >
            Todos os direitos reservados © 2026
          </span>
        </div>

        {/* CENTRO */}
        <div
          className="ft_center"
          style={{
            display: "grid",
            gap: 12,
            textAlign: "center",
            justifyItems: "center",
          }}
        >
          <span
            className="ft_title"
            style={{
              fontWeight: 950,
              letterSpacing: ".12em",
              fontSize: 12,
              textTransform: "uppercase",
              color: "rgba(245,215,110,.95)",
            }}
          >
            Entre em contato
          </span>

          {/* EMAIL */}
          <div
            className="ft_line ft_email"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              fontSize: 14,
            }}
          >
            <FaEnvelope style={{ color: "rgba(245,215,110,.95)" }} />
            <span className="ft_email_txt">Contato@associacaonegodrama.com.br</span>
          </div>

          {/* TELEFONE */}
          <div
            className="ft_line"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              fontSize: 14,
            }}
          >
            <FaPhoneAlt style={{ color: "rgba(245,215,110,.95)" }} />
            <span>5197-0198</span>
          </div>

          {/* WHATS */}
          <div
            className="ft_line"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              fontSize: 14,
            }}
          >
            <FaWhatsapp style={{ color: "rgba(245,215,110,.95)" }} />
            <span>95224-1426</span>
          </div>
        </div>

        {/* DIREITA */}
        <div
          className="ft_right"
          style={{
            display: "grid",
            gap: 14,
            justifyItems: "center",
            textAlign: "center",
          }}
        >
          <span
            className="ft_title"
            style={{
              fontWeight: 950,
              letterSpacing: ".12em",
              fontSize: 12,
              textTransform: "uppercase",
              color: "rgba(245,215,110,.95)",
            }}
          >
            Redes sociais
          </span>

          <div
            className="ft_social"
            style={{
              display: "flex",
              gap: 14,
              justifyContent: "center",
            }}
          >
            {[
              { icon: <FaWhatsapp />, label: "WhatsApp", link: "#" },
              { icon: <FaInstagram />, label: "Instagram", link: "#" },
              { icon: <FaFacebookF />, label: "Facebook", link: "#" },
              { icon: <FaYoutube />, label: "YouTube", link: "#" },
            ].map((item, i) => (
              <a
                key={i}
                href={item.link}
                aria-label={item.label}
                target="_blank"
                rel="noopener noreferrer"
                className="ft_icon"
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 999,
                  display: "grid",
                  placeItems: "center",
                  background:
                    "linear-gradient(180deg, rgba(255,255,255,.06), rgba(255,255,255,.02))",
                  border: "1px solid rgba(212,175,55,.28)",
                  color: "rgba(245,215,110,.95)",
                  fontSize: 18,
                  transition:
                    "transform .18s ease, box-shadow .18s ease, border-color .18s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-3px)";
                  e.currentTarget.style.boxShadow =
                    "0 14px 40px rgba(0,0,0,.55)";
                  e.currentTarget.style.borderColor = "rgba(245,215,110,.45)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "none";
                  e.currentTarget.style.borderColor = "rgba(212,175,55,.28)";
                }}
              >
                {item.icon}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* linha final */}
      <div
        style={{
          marginTop: 42,
          height: 1,
          background:
            "linear-gradient(90deg, transparent, rgba(212,175,55,.35), transparent)",
          opacity: 0.6,
        }}
      />

      <style>{`
        /* ✅ MOBILE BONITO: 2 colunas (sem esmagar), mantendo vibe do desktop */
        @media (max-width: 820px){
          .ft_grid{
            grid-template-columns: 1fr 1fr !important;
            gap: 18px !important;
            align-items: start !important;
          }

          /* esquerda fica como “assinatura” */
          .ft_left img{
            width: 132px !important;
          }
          .ft_rights{
            font-size: 12px !important;
            line-height: 1.5 !important;
          }

          /* centro vira bloco principal do contato (alinhado à esquerda no mobile) */
          .ft_center{
            text-align: left !important;
            justify-items: start !important;
            gap: 10px !important;
          }
          .ft_center .ft_title{
            font-size: 11px !important;
            letter-spacing: .10em !important;
          }
          .ft_line{
            font-size: 13px !important;
            gap: 8px !important;
          }

          /* email quebra bonitinho (sem ellipsis) */
          .ft_email{
            align-items: flex-start !important;
          }
          .ft_email_txt{
            white-space: normal;
            word-break: break-word;
            overflow-wrap: anywhere;
            max-width: 100%;
            line-height: 1.35;
          }

          /* redes sociais vai pra “baixo” da coluna direita (sem virar 3a coluna feia) */
          .ft_right{
            grid-column: 2 / 3 !important;
            justify-items: end !important;
            text-align: right !important;
            gap: 10px !important;
          }
          .ft_right .ft_title{
            font-size: 11px !important;
            letter-spacing: .10em !important;
          }
          .ft_social{
            gap: 10px !important;
            justify-content: flex-end !important;
            flex-wrap: wrap;
          }
          .ft_icon{
            width: 38px !important;
            height: 38px !important;
            font-size: 16px !important;
          }
        }

        /* ✅ mobile bem pequeno: empilha “contato” e “redes” com respiro, sem ficar torto */
        @media (max-width: 520px){
          .ft_grid{
            grid-template-columns: 1fr !important;
            gap: 18px !important;
          }

          .ft_left{
            justify-items: center;
            text-align: center;
            gap: 10px !important;
          }

          .ft_center{
            justify-items: center !important;
            text-align: center !important;
          }

          .ft_right{
            grid-column: auto !important;
            justify-items: center !important;
            text-align: center !important;
          }

          .ft_social{
            justify-content: center !important;
          }
        }
      `}</style>
    </footer>
  );
}

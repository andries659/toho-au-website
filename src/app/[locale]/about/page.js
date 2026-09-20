"use client";

import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { useEffect, useRef, useState } from "react";
import { useLocale } from "../../components/LocaleProvider";
import { FaBullseye, FaUsers, FaGithub } from "react-icons/fa";

function FadeSection({ children, delay = 0 }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

// TODO: add the rest of the team here — name, role, and (optionally) a github link.
const TEAM = [
  {
    name: "Lime",
    role: "Creator & Mod Author",
    github: "https://github.com/Limeau",
  },
  {
    name: "Andries",
    role: "Website Developer & Head Of Development",
    github: "https://github.com/andries659",
  },
];

export default function AboutPage() {
  const { t } = useLocale();

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;700;800&family=Space+Mono:wght@400;700&display=swap');

        .tor-about-page {
          min-height: 100vh;
          background: #080b14;
          color: #f0eeff;
          font-family: 'Syne', sans-serif;
          overflow-x: hidden;
          position: relative;
        }

        /* ── Stars ── */
        .tor-about-stars { position: fixed; inset: 0; pointer-events: none; z-index: 0; overflow: hidden; }
        .tor-about-star {
          position: absolute;
          border-radius: 50%;
          background: white;
          animation: torAboutTwinkle var(--d, 3s) ease-in-out infinite var(--delay, 0s);
          opacity: var(--op, 0.4);
        }
        @keyframes torAboutTwinkle {
          0%, 100% { opacity: var(--op); }
          50% { opacity: calc(var(--op) * 0.2); }
        }

        /* ── Nebulae ── */
        .tor-about-nebula { position: fixed; border-radius: 50%; pointer-events: none; z-index: 0; }
        .tor-about-nb1 { width: 650px; height: 650px; background: rgba(120,70,255,0.1); filter: blur(90px); top: -220px; right: -120px; }
        .tor-about-nb2 { width: 500px; height: 500px; background: rgba(255,70,150,0.07); filter: blur(80px); bottom: 5%; left: -150px; }
        .tor-about-nb3 { width: 380px; height: 380px; background: rgba(60,180,255,0.06); filter: blur(70px); top: 45%; left: 55%; }

        /* ── Layout ── */
        .tor-about-main {
          position: relative;
          z-index: 1;
          max-width: 780px;
          margin: 0 auto;
          padding: 120px 24px 64px;
          display: flex;
          flex-direction: column;
          gap: 40px;
        }

        /* ── Hero ── */
        .tor-about-hero { text-align: center; }
        .tor-about-eyebrow {
          display: inline-block;
          font-family: 'Space Mono', monospace;
          font-size: 11px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #a07bff;
          border: 1px solid rgba(160,123,255,0.3);
          padding: 5px 14px;
          border-radius: 100px;
          margin-bottom: 24px;
        }
        .tor-about-title {
          font-size: clamp(32px, 6vw, 56px);
          font-weight: 800;
          line-height: 1.05;
          letter-spacing: -0.02em;
          margin: 0 0 16px;
        }
        .tor-about-gradient-text {
          background: linear-gradient(135deg, #a07bff 0%, #ff6eb4 50%, #ffe066 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-size: 200% 200%;
          animation: torAboutGrad 6s ease infinite;
        }
        @keyframes torAboutGrad {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .tor-about-sub {
          margin: 0 auto;
          max-width: 460px;
          font-size: 14px;
          color: rgba(240,238,255,0.45);
          line-height: 1.8;
          font-family: 'Space Mono', monospace;
        }

        /* ── Panel ── */
        .tor-about-panel {
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 20px;
          padding: 32px;
          transition: border-color 0.3s;
        }
        .tor-about-panel:hover { border-color: rgba(160,123,255,0.3); }

        .tor-about-section-label {
          display: flex;
          align-items: center;
          gap: 14px;
          margin-bottom: 20px;
        }
        .tor-about-section-icon {
          width: 38px; height: 38px;
          border-radius: 10px;
          display: flex; align-items: center; justify-content: center;
          font-size: 17px;
          flex-shrink: 0;
          background: rgba(160,123,255,0.12);
          color: #a07bff;
        }
        .tor-about-section-label h2 {
          font-size: 22px;
          font-weight: 800;
          letter-spacing: -0.01em;
          color: #f0eeff;
        }
        .tor-about-section-sub {
          margin: -8px 0 24px;
          font-size: 12.5px;
          font-family: 'Space Mono', monospace;
          color: rgba(240,238,255,0.45);
          line-height: 1.7;
        }

        .tor-about-mission-body {
          font-size: 13.5px;
          color: rgba(240,238,255,0.6);
          font-family: 'Space Mono', monospace;
          line-height: 1.9;
        }

        /* ── Team ── */
        .tor-about-team-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 14px;
        }
        .tor-about-team-card {
          padding: 22px;
          background: rgba(255,255,255,0.025);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 14px;
          text-align: center;
          transition:
            border-color 0.3s ease,
            background 0.3s ease,
            transform 0.3s ease;
        }
        .tor-about-team-card:hover {
          border-color: rgba(160,123,255,0.25);
          background: rgba(255,255,255,0.04);
          transform: translateY(-2px);
        }
        .tor-about-team-avatar {
          width: 56px;
          height: 56px;
          margin: 0 auto 14px;
          border-radius: 50%;
          background: linear-gradient(135deg, #a07bff, #ff6eb4);
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'Syne', sans-serif;
          font-weight: 800;
          font-size: 20px;
          color: #080b14;
        }
        .tor-about-team-name {
          font-size: 15px;
          font-weight: 800;
          color: #f0eeff;
          margin-bottom: 4px;
        }
        .tor-about-team-role {
          font-size: 11px;
          font-family: 'Space Mono', monospace;
          color: rgba(240,238,255,0.45);
          letter-spacing: 0.04em;
          text-transform: uppercase;
          margin-bottom: 12px;
        }
        .tor-about-team-link {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-family: 'Space Mono', monospace;
          font-size: 11px;
          color: #a07bff;
          text-decoration: none;
        }
        .tor-about-team-link:hover { text-decoration: underline; }

        @media (max-width: 600px) {
          .tor-about-main { padding: 96px 16px 48px; gap: 32px; }
          .tor-about-panel { padding: 24px 18px; }
        }
      `}</style>

      <div className="tor-about-page">
        <div className="tor-about-stars" id="tor-about-stars" />

        <div className="tor-about-nebula tor-about-nb1" />
        <div className="tor-about-nebula tor-about-nb2" />
        <div className="tor-about-nebula tor-about-nb3" />

        <Navbar />

        <main className="tor-about-main">

          <FadeSection delay={0}>
            <section className="tor-about-hero">
              <div className="tor-about-eyebrow">{t.about.eyebrow}</div>
              <h1 className="tor-about-title">
                {t.about.titleLine1}{" "}
                <span className="tor-about-gradient-text">{t.about.titleLine2}</span>
              </h1>
              <p className="tor-about-sub">{t.about.subtitle}</p>
            </section>
          </FadeSection>

          <FadeSection delay={120}>
            <section className="tor-about-panel">
              <div className="tor-about-section-label">
                <div className="tor-about-section-icon"><FaBullseye /></div>
                <h2>{t.about.missionTitle}</h2>
              </div>
              <p className="tor-about-mission-body">{t.about.missionBody}</p>
            </section>
          </FadeSection>

          <FadeSection delay={240}>
            <section className="tor-about-panel">
              <div className="tor-about-section-label">
                <div className="tor-about-section-icon"><FaUsers /></div>
                <h2>{t.about.teamTitle}</h2>
              </div>
              <p className="tor-about-section-sub">{t.about.teamSubtitle}</p>
              <div className="tor-about-team-grid">
                {TEAM.map((member) => (
                  <div key={member.name} className="tor-about-team-card">
                    <div className="tor-about-team-avatar">
                      {member.name.charAt(0)}
                    </div>
                    <div className="tor-about-team-name">{member.name}</div>
                    <div className="tor-about-team-role">{member.role}</div>
                    {member.github && (
                      <a
                        href={member.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="tor-about-team-link"
                      >
                        <FaGithub />
                        GitHub
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </section>
          </FadeSection>

        </main>

        <Footer />
      </div>

      <script
        dangerouslySetInnerHTML={{
          __html: `
            (function() {
              var el = document.getElementById('tor-about-stars');
              if (!el) return;
              for (var i = 0; i < 130; i++) {
                var s = document.createElement('div');
                s.className = 'tor-about-star';
                var size = Math.random() * 2 + 0.5;
                s.style.cssText = 'left:'+Math.random()*100+'%;top:'+Math.random()*100+'%;width:'+size+'px;height:'+size+'px;--d:'+(2+Math.random()*4)+'s;--delay:-'+(Math.random()*5)+'s;--op:'+(0.15+Math.random()*0.55)+';';
                el.appendChild(s);
              }
            })();
          `,
        }}
      />
    </>
  );
}

"use client";

import Link from "next/link";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { useEffect, useRef, useState } from "react";
import { FaCheckCircle, FaCog, FaExternalLinkAlt, FaCode, FaDownload } from "react-icons/fa";

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

const PROJ = [
  {
    title: "RemongUs",
    desc: "A mod which reconnects you to another lobby when you disconnect.",
    author: "Lime",
    icon: "red",
    download: "https://github.com/Limeau/RemongUs/releases/latest",
    body: (
      <>
        RemongUs automatically attempts to reconnect you to another lobby when
        you get disconnected from your current game. It's a small quality-of-life
        mod designed to make unexpected disconnects a little less painful.
      </>
    ),
  },
  {
    title: "BeanNinja",
    desc: 'A silly mod which lets you "kill" the beans on the main menu.',
    author: "Lime",
    icon: "blurple",
    download: "https://github.com/Limeau/BeanNinja/releases/latest",
    body: (
      <>
        BeanNinja is a completely unserious mod that lets you interact with the
        beans on the Among Us main menu in a rather violent way. There's no
        deeper purpose — it's just there for fun.
      </>
    ),
  },
];

export default function InstallationGuidePage() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;700;800&family=Space+Mono:wght@400;700&display=swap');

        .tor-install-page {
          min-height: 100vh;
          background: #080b14;
          color: #f0eeff;
          font-family: 'Syne', sans-serif;
          overflow-x: hidden;
          position: relative;
        }

        /* ── Stars ── */
        .tor-install-stars { position: fixed; inset: 0; pointer-events: none; z-index: 0; overflow: hidden; }
        .tor-install-star {
          position: absolute;
          border-radius: 50%;
          background: white;
          animation: torInstallTwinkle var(--d, 3s) ease-in-out infinite var(--delay, 0s);
          opacity: var(--op, 0.4);
        }
        @keyframes torInstallTwinkle {
          0%, 100% { opacity: var(--op); }
          50% { opacity: calc(var(--op) * 0.2); }
        }

        /* ── Nebulae ── */
        .tor-install-nebula { position: fixed; border-radius: 50%; pointer-events: none; z-index: 0; }
        .tor-install-nb1 { width: 650px; height: 650px; background: rgba(120,70,255,0.1); filter: blur(90px); top: -220px; right: -120px; }
        .tor-install-nb2 { width: 500px; height: 500px; background: rgba(255,70,150,0.07); filter: blur(80px); bottom: 5%; left: -150px; }
        .tor-install-nb3 { width: 380px; height: 380px; background: rgba(60,180,255,0.06); filter: blur(70px); top: 45%; left: 55%; }

        /* ── Layout ── */
        .tor-install-main {
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
        .tor-install-hero { text-align: center; }
        .tor-install-eyebrow {
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
        .tor-install-title {
          font-size: clamp(32px, 6vw, 56px);
          font-weight: 800;
          line-height: 1.05;
          letter-spacing: -0.02em;
          margin: 0 0 16px;
        }
        .tor-install-gradient-text {
          background: linear-gradient(135deg, #a07bff 0%, #ff6eb4 50%, #ffe066 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-size: 200% 200%;
          animation: torInstallGrad 6s ease infinite;
        }
        @keyframes torInstallGrad {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .tor-install-sub {
          margin: 0 auto;
          max-width: 460px;
          font-size: 14px;
          color: rgba(240,238,255,0.45);
          line-height: 1.8;
          font-family: 'Space Mono', monospace;
        }

        /* ── Panel (matches homepage) ── */
        .tor-install-panel {
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 20px;
          padding: 32px;
          transition: border-color 0.3s;
        }
        .tor-install-panel:hover { border-color: rgba(160,123,255,0.3); }

        .tor-install-section-label {
          display: flex;
          align-items: center;
          gap: 14px;
          margin-bottom: 24px;
        }
        .tor-install-section-icon {
          width: 38px; height: 38px;
          border-radius: 10px;
          display: flex; align-items: center; justify-content: center;
          font-size: 17px;
          flex-shrink: 0;
        }
        .tor-install-icon-blurple { background: rgba(88, 101, 242, 0.12); color: #5865f2; }
        .tor-install-icon-red { background: rgba(255, 78, 78, 0.12); color: #ff4e4e; }
        .tor-install-section-label h2 {
          font-size: 22px;
          font-weight: 800;
          letter-spacing: -0.01em;
          color: #f0eeff;
        }

        /* ── Compat ── */
        .tor-install-compat-list { display: flex; flex-direction: column; gap: 10px; }
        .tor-install-compat-item {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 13px 16px;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 12px;
        }
        .tor-install-dot {
          width: 8px; height: 8px;
          border-radius: 50%;
          flex-shrink: 0;
        }
        .tor-install-dot-green { background: #4fffb0; box-shadow: 0 0 8px #4fffb0; }
        .tor-install-dot-red   { background: #ff5f5f; box-shadow: 0 0 8px #ff5f5f; }
        .tor-install-compat-text {
          font-family: 'Space Mono', monospace;
          font-size: 13px;
          color: rgba(240,238,255,0.55);
        }
        .tor-install-compat-text strong { color: #f0eeff; font-weight: 700; }

        /* ── Projects ── */
		.tor-install-projects {
		  display: flex;
		  flex-direction: column;
		  gap: 14px;
		}

		.tor-install-project {
		  padding: 22px;
		  background: rgba(255,255,255,0.025);
		  border: 1px solid rgba(255,255,255,0.07);
		  border-radius: 14px;
		  transition:
			border-color 0.3s ease,
			background 0.3s ease,
			transform 0.3s ease;
		}

		.tor-install-project:hover {
		  border-color: rgba(160,123,255,0.25);
		  background: rgba(255,255,255,0.04);
		  transform: translateY(-2px);
		}

		.tor-install-project-header {
		  display: flex;
		  align-items: flex-start;
		  gap: 14px;
		}

		.tor-install-project-icon {
		  width: 38px;
		  height: 38px;
		  border-radius: 10px;
		  display: flex;
		  align-items: center;
		  justify-content: center;
		  font-size: 16px;
		  flex-shrink: 0;
		}

		.tor-install-project-icon-red {
		  background: rgba(255, 78, 78, 0.12);
		  color: #ff4e4e;
		}

		.tor-install-project-icon-blurple {
		  background: rgba(88, 101, 242, 0.12);
		  color: #5865f2;
		}

		.tor-install-project-info {
		  min-width: 0;
		  flex: 1;
		}

		.tor-install-project-title {
		  font-size: 17px;
		  font-weight: 800;
		  color: #f0eeff;
		  margin-bottom: 4px;
		}

		.tor-install-project-desc {
		  font-size: 12px;
		  color: rgba(240,238,255,0.45);
		  font-family: 'Space Mono', monospace;
		  line-height: 1.5;
		}

		.tor-install-project-author {
		  display: inline-flex;
		  align-items: center;
		  gap: 6px;
		  margin-top: 10px;
		  font-family: 'Space Mono', monospace;
		  font-size: 11px;
		  color: rgba(240,238,255,0.4);
		}

		.tor-install-project-author strong {
		  color: #a07bff;
		  font-weight: 700;
		}

		.tor-install-project-body {
		  margin-top: 18px;
		  padding-top: 18px;
		  border-top: 1px solid rgba(255,255,255,0.06);
		  font-size: 12.5px;
		  color: rgba(240,238,255,0.6);
		  font-family: 'Space Mono', monospace;
		  line-height: 1.85;
		}
		
		.tor-install-download {
		  display: inline-flex;
		  align-items: center;
		  gap: 8px;
		  padding: 9px 14px;
		  border-radius: 9px;
		  background: rgba(160,123,255,0.12);
		  border: 1px solid rgba(160,123,255,0.25);
		  color: #a07bff;
		  font-family: 'Space Mono', monospace;
		  font-size: 11px;
		  font-weight: 700;
		  text-decoration: none;
		  white-space: nowrap;
		  transition:
			background 0.2s ease,
			border-color 0.2s ease,
			transform 0.2s ease;
		}

		.tor-install-download:hover {
		  background: rgba(160,123,255,0.2);
		  border-color: rgba(160,123,255,0.45);
		  transform: translateY(-1px);
		}

		.tor-install-download svg {
		  font-size: 10px;
		}

        @media (max-width: 600px) {
          .tor-install-main { padding: 96px 16px 48px; gap: 32px; }
          .tor-install-panel { padding: 24px 18px; }
        }
		
		@media (max-width: 600px) {
		  .tor-install-project-header {
			display: grid;
			grid-template-columns: 38px 1fr;
			gap: 14px;
			align-items: start;
		  }

		  .tor-install-project-info {
			min-width: 0;
		  }

		  .tor-install-download {
			grid-column: 2;
			justify-self: start;
			margin-left: 0;
			margin-top: 2px;
		  }
		}
      `}</style>

      <div className="tor-install-page">
        <div className="tor-install-stars" id="tor-install-stars" />

        <div className="tor-install-nebula tor-install-nb1" />
        <div className="tor-install-nebula tor-install-nb2" />
        <div className="tor-install-nebula tor-install-nb3" />

        <Navbar />

        <main className="tor-install-main">

          <FadeSection delay={0}>
            <section className="tor-install-hero">
              <div className="tor-install-eyebrow">Extras</div>
              <h1 className="tor-install-title">
                Extra <span className="tor-install-gradient-text">Projects</span>
              </h1>
              <p className="tor-install-sub">
                These are just other mods, made by Lime, which are just there for fun.
              </p>
            </section>
          </FadeSection>

          <FadeSection delay={120}>
            <section className="tor-install-panel">
              <div className="tor-install-section-label">
                <div className="tor-install-section-icon tor-install-icon-blurple"><FaCog /></div>
                <h2>Projects</h2>
              </div>
              <div className="tor-install-projects">
			  {PROJ.map((project) => (
				<article key={project.title} className="tor-install-project">
				  <div className="tor-install-project-header">
					<div
					  className={`tor-install-project-icon tor-install-project-icon-${project.icon}`}
					>
					  <FaCode />
					</div>

					<div className="tor-install-project-info">
					  <div className="tor-install-project-title">
						{project.title}
					  </div>

					  <div className="tor-install-project-desc">
						{project.desc}
					  </div>

					  <div className="tor-install-project-author">
						<FaCode />
						Coded by <strong>{project.author}</strong>
					  </div>
					</div>

					<a
					  href={project.download}
					  target="_blank"
					  rel="noopener noreferrer"
					  className="tor-install-download"
					>
					  <FaDownload />
					  Download
					</a>
				  </div>

				  <div className="tor-install-project-body">
					{project.body}
				  </div>
				</article>
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
              var el = document.getElementById('tor-install-stars');
              if (!el) return;
              for (var i = 0; i < 130; i++) {
                var s = document.createElement('div');
                s.className = 'tor-install-star';
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
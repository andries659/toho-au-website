"use client";

import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { FaLightbulb, FaInfoCircle } from "react-icons/fa";
import HiddenComputer from "../components/HiddenComputer";

export default function Roles() {
  const roles = [
    {
      name: "Coroner",
      description: "Freeze bodies to make them stay.",
      icon: <img src="/icons/Crewmate/Coroner.png" alt="Coroner" width="42" height="42" />,
      badges: ["Crewmate", "v1.0.0"],
      video: "",
      extra: "If you freeze a body, the body will stay forever, but can only be reported once as well.",
      imgs: []
    },
    {
      name: "Sealer",
      description: "You can seal vents.",
      icon: <img src="/icons/Crewmate/Sealer.png" alt="Sealer" width="42" height="42" />,
      badges: ["Crewmate", "v1.0.0"],
      video: "",
      extra: "You are able to seal vents, which prevents them from being used.",
      imgs: []
    },
    {
      name: "Medic",
      description: "Revive dead players.",
      icon: <img src="/icons/Crewmate/Medic.png" alt="Medic" width="42" height="42" />,
      badges: ["Crewmate", "v1.0.0"],
      video: "",
      extra: "You have the ability to revive dead players.",
      imgs: []
    },
    {
      name: "Sheriff",
      description: "Shoot the Impostor.",
      icon: <img src="/icons/Crewmate/Sheriff.png" alt="Sheriff" width="42" height="42" />,
      badges: ["Crewmate", "v1.0.0"],
      video: "",
      extra: "You can shoot any player, to guess if they are the Impostor. If you shoot the Impostor, you live. But if you shoot a Crewmate, you die.",
      imgs: []
    },
    {
      name: "Gambler",
      description: "Guess the roles of others.",
      icon: <img src="/icons/Crewmate/Gambler.png" alt="Gambler" width="42" height="42" />,
      badges: ["Crewmate", "v1.0.0"],
      video: "",
      extra: "You can guess the roles of others. When you are correct, the role is revealed, if you are wrong, you die.",
      imgs: []
    },
    {
      name: "Teleporter",
      description: "Teleport across the map.",
      icon: <img src="/icons/Crewmate/Teleporter.png" alt="Teleporter" width="42" height="42" />,
      badges: ["Crewmate", "v1.1.0"],
      video: "",
      extra: "",
      tips: "Using it well and timing it well, you can also catch Impostors in the act of killing!",
      imgs: [
        { src: "/screenshots/teleporter-1.png", label: "", type: "screenshot" },
        { src: "/screenshots/teleporter-2.png", label: "", type: "screenshot" }
      ]
    },
    {
      name: "Burrower",
      description: "Can dig vents around the map.",
      icon: <img src="/icons/Impostor/Burrower.png" alt="Burrower" width="42" height="42" />,
      badges: ["Impostor", "v1.0.0"],
      video: "",
      extra: "You are able to dig vents anywhere on the map.",
      imgs: []
    },
    {
      name: "Janitor",
      description: "Can drag & hide bodies.",
      icon: <img src="/icons/Impostor/Janitor.png" alt="Janitor" width="42" height="42" />,
      badges: ["Impostor", "v1.0.0"],
      video: "",
      extra: "You are able to drag around bodies around the map, and hide them in vents.",
      imgs: []
    },
    {
      name: "Hitman",
      description: "Can slow time down and kill.",
      icon: <img src="/icons/Impostor/Hitman.png" alt="Hitman" width="42" height="42" />,
      badges: ["Impostor", "v1.0.0"],
      video: "",
      extra: "You are able to slow down the time and pick your targets.",
      imgs: []
    },
    {
      name: "Surgeon",
      description: "Poison the crew to win.",
      icon: <img src="/icons/Impostor/Surgeon.png" alt="Surgeon" width="42" height="42" />,
      badges: ["Impostor", "v1.0.0"],
      video: "",
      extra: "You are able to inject players and kill them, and if you disect the body, it's unreportable.",
      imgs: []
    },
    {
      name: "Swapshifter",
      description: "Switch people around.",
      icon: <img src="/icons/Impostor/Swapshifter.png" alt="Swapshifter" width="42" height="42" />,
      badges: ["Impostor", "v1.0.0"],
      video: "",
      extra: "You are able to choose people to make them switch places, it also works with you.",
      imgs: []
    },
    {
      name: "Silencer",
      description: "Silence players so they can not speak in the next meeting.",
      icon: <img src="/icons/Impostor/Silencer.png" alt="Silencer" width="42" height="42" />,
      badges: ["Impostor", "v2.0-f"],
      video: "",
      extra: "Silence players, which makes it unable for them to talk during a meeting.",
      imgs: []
    },
    {
      name: "Poltergeist",
      description: "Curse players to stop them from winning.",
      icon: <img src="/icons/Impostor/Poltergeist.png" alt="Poltergeist" width="42" height="42" />,
      badges: ["Impostor", "v2.1-r"],
      video: "",
      extra: "",
      imgs: []
    },
    {
      name: "Traitor",
      description: (
        <>
          Act like an <span style={{ color: "#ff5f5f", fontWeight: 700 }}>Impostor</span>, to betray the <span style={{ color: "#ff5f5f", fontWeight: 700 }}>Impostor(s)</span>.
        </>
      ),
      icon: <img src="/icons/Neutral/Traitor.png" alt="Traitor" width="42" height="42" />,
      badges: ["Neutral", "v1.0.0"],
      video: "",
      extra: "This role has no ability button or anything. A 'Target' tag will be added to the Impostor the Traitor has to vote off to win.",
      tips: "Do not try to vote out the Impostor, since it could make you the next target.\nThink like an Impostor.",
      imgs: [{ src: "/screenshots/traitor.png", label: "", type: "screenshot" }]
    },
    {
      name: "Executioner",
      description: "Vote out the target to win the game.",
      icon: <img src="/icons/Neutral/Executioner.png" alt="Executioner" width="42" height="42" />,
      badges: ["Neutral", "v1.1.0"],
      video: "",
      extra: "This role has no ability button or anything. A 'Target' tag will be added to a random player the Executioner has to vote off to win.",
      tips: "Do not try to vote out your target too obviously, since it could make you the next target.\nThink like an Impostor.",
      imgs: [{ src: "/screenshots/exe.png", label: "", type: "screenshot" }]
    },
    {
      name: "Neutral Killer",
      description: "Kill players as a Neutral role to win alone.",
      icon: <img src="/icons/Neutral/NeutralKiller.png" alt="Neutral Killer" width="42" height="42" />,
      badges: ["Neutral", "v1.1.1"],
      video: "",
      extra: "",
      tips: "When trying to kill, kill like a normal Impostor would. Don't rush anything.\nAlso, if you kill and get caught, and get voted out, YOU'LL LOSE.",
      imgs: [
        { src: "/screenshots/nk-1.png", label: "", type: "screenshot" },
        { src: "/screenshots/nk-2.png", label: "", type: "screenshot" }
      ]
    },
    {
      name: "Jester",
      description: "Must fool the crew.",
      icon: <img src="/icons/Neutral/Jester.png" alt="Jester" width="42" height="42" />,
      badges: ["Neutral", "v1.0.0"],
      video: "",
      extra: "Act suspicious to get ejected and win.",
      imgs: []
    },
    {
      name: "Reaper",
      description: "Collect the souls.",
      icon: <img src="/icons/Neutral/Reaper.png" alt="Reaper" width="42" height="42" />,
      badges: ["Neutral", "v1.0.0"],
      video: "",
      extra: "Go around the map and collect souls from dead bodies.",
      imgs: []
    },
    {
      name: "Survivor",
      description: "Survive till the end.",
      icon: <img src="/icons/Neutral/Survivor.png" alt="Survivor" width="42" height="42" />,
      badges: ["Neutral", "v2.1-r"],
      video: "",
      extra: "",
      imgs: []
    },
    {
      name: "Tavern Keeper",
      description: "Role Block players to stop them from using abilities.",
      icon: <img src="/icons/Coven/TavernKeeper.png" alt="Tavern Keeper" width="42" height="42" />,
      badges: ["Coven", "v2.0-r"],
      video: "",
      extra: "This role cannot win (so far). It can stop Impostors, Crewmates, or Neutrals from using their abilities for a set period of time.",
      tips: "Try to stop the Impostors from winning. Take a wild guess, and remove the abilities from your target for a set period of time.",
      imgs: []
    },
  ];

  const modifiers = [
    {
      name: "Flash",
      description: "Moves faster than everyone else.",
      icon: <img src="/icons/Universal/Flash.png" alt="Flash" width="42" height="42" />,
      badges: ["Universal Modifier", "v1.0.0"],
      video: "/videos/flash.mp4",
      extra: "You're just a bit faster than the average player.",
      tips: "Even though the video is above the icon, it has no screenshots at all.",
      imgs: []
    },
    {
      name: "VIP",
      description: "A modifier that makes you look fancy.",
      icon: <img src="/icons/Universal/VIP.png" alt="VIP" width="42" height="42" />,
      badges: ["Universal Modifier", "v1.0.0"],
      video: "",
      extra: "You're just there to brag how cool you look.",
      imgs: [{ src: "/screenshots/vip.png", label: "", type: "screenshot" }]
    },
    {
      name: "Bait",
      description: "Your killer self reports when they kill you.",
      icon: <img src="/icons/Crewmate-Mod/Bait.png" alt="Bait" width="42" height="42" />,
      badges: ["Crewmate Modifier", "v1.1.1"],
      video: "",
      extra: "There is not really a use, but the use is that your killer self reports when they kill you.",
      imgs: []
    },
    {
      name: "Torch",
      description: "Sees clearly in the dark.",
      icon: <img src="/icons/Crewmate-Mod/Torch.png" alt="Torch" width="42" height="42" />,
      badges: ["Crewmate Modifier", "v1.1.1"],
      video: "",
      extra: "You're given access to a torch to see when lights are down.",
      imgs: [{ src: "/screenshots/torch.png", label: "", type: "screenshot" }]
    },
    {
      name: "Burst",
      description: "Explodes when killed.",
      icon: <img src="/icons/Crewmate-Mod/Burst.png" alt="Burst" width="42" height="42" />,
      badges: ["Crewmate Modifier", "v2.0-r"],
      video: "",
      extra: "When you get killed, you explode. Killing other players in a radius set by the host.",
      imgs: [{ src: "/screenshots/burst.png", label: "", type: "screenshot" }]
    },
    {
      name: "Mayor",
      description: "You get extra votes.",
      icon: <img src="/icons/Crewmate-Mod/Mayor.png" alt="Mayor" width="42" height="42" />,
      badges: ["Crewmate Modifier", "v2.0-r"],
      video: "",
      extra: "You get extra votes in meetings.",
      imgs: []
    },
  ];

  // Badge style map — uses inline CSS to stay consistent with the tor- theme
  const badgeStyles = {
    Crewmate:             { color: "#93c5fd", background: "rgba(59,130,246,0.15)", border: "rgba(59,130,246,0.3)" },
    Impostor:             { color: "#fca5a5", background: "rgba(239,68,68,0.15)",  border: "rgba(239,68,68,0.3)" },
    Neutral:              { color: "#fde68a", background: "rgba(234,179,8,0.15)",  border: "rgba(234,179,8,0.3)" },
    Coven:                { color: "#d8b4fe", background: "rgba(168,85,247,0.15)", border: "rgba(168,85,247,0.3)" },
    "Universal Modifier": { color: "#86efac", background: "rgba(34,197,94,0.15)", border: "rgba(34,197,94,0.3)" },
    "Crewmate Modifier":  { color: "#7dd3fc", background: "rgba(14,165,233,0.15)", border: "rgba(14,165,233,0.3)" },
	"Coven Modifier":     { color: "#e9d5ff", background: "rgba(196,181,253,0.15)", border: "rgba(196,181,253,0.3)" },
  };

  const versionStyles = {
    "-a":  { color: "#fdba74", background: "rgba(249,115,22,0.15)",  border: "rgba(249,115,22,0.3)" },
    "-b":  { color: "#fde68a", background: "rgba(234,179,8,0.15)",   border: "rgba(234,179,8,0.3)" },
    "-rc": { color: "#d8b4fe", background: "rgba(168,85,247,0.15)",  border: "rgba(168,85,247,0.3)" },
    "-r":  { color: "#86efac", background: "rgba(34,197,94,0.15)",   border: "rgba(34,197,94,0.3)" },
    "-d":  { color: "#cbd5e1", background: "rgba(100,116,139,0.15)", border: "rgba(100,116,139,0.3)" },
    "-t":  { color: "#93c5fd", background: "rgba(59,130,246,0.15)",  border: "rgba(59,130,246,0.3)" },
    "-h":  { color: "#fca5a5", background: "rgba(239,68,68,0.15)",   border: "rgba(239,68,68,0.3)" },
    "-p":  { color: "#a5b4fc", background: "rgba(99,102,241,0.15)",  border: "rgba(99,102,241,0.3)" },
    "-u":  { color: "#67e8f9", background: "rgba(6,182,212,0.15)",   border: "rgba(6,182,212,0.3)" },
    "-f":  { color: "#f9a8d4", background: "rgba(236,72,153,0.15)",  border: "rgba(236,72,153,0.3)" },
    "-o":  { color: "#5eead4", background: "rgba(20,184,166,0.15)",  border: "rgba(20,184,166,0.3)" },
    default: { color: "#a5b4fc", background: "rgba(99,102,241,0.15)", border: "rgba(99,102,241,0.3)" },
  };

  function getBadgeStyle(badge) {
    if (badgeStyles[badge]) return badgeStyles[badge];
    const suffix = Object.keys(versionStyles).find(s => s !== "default" && badge.endsWith(s));
    return versionStyles[suffix] || versionStyles.default;
  }

  function ItemCard({ item }) {
    const [open, setOpen] = useState(false);
    const [modalimg, setModalimg] = useState(null);

    return (
      <>
        <div className="tor-role-card">
          {/* Card header */}
          <div className="tor-role-header">
            <div className="tor-role-icon">{item.icon}</div>
            <div className="tor-role-meta">
              <h2 className="tor-role-name">{item.name}</h2>
              <div className="tor-badge-row">
                {item.badges.map((badge, i) => {
                  const s = getBadgeStyle(badge);
                  return (
                    <span key={i} className="tor-badge" style={{ color: s.color, background: s.background, borderColor: s.border }}>
                      {badge}
                    </span>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="tor-role-desc">
            <FaInfoCircle style={{ color: "#4eb8ff", flexShrink: 0, marginTop: 2 }} />
            <span>{item.description}</span>
          </div>

          {/* Expand toggle */}
          <button className={`tor-expand-btn${open ? " open" : ""}`} onClick={() => setOpen(!open)}>
            {open ? "Show Less" : "Show More"}
            <span className="tor-expand-arrow">{open ? "▲" : "▼"}</span>
          </button>

          {/* Expandable body */}
          <div className={`tor-expand-body${open ? " open" : ""}`}>
            <div className="tor-expand-inner">
              {item.extra && <p className="tor-extra-text">{item.extra}</p>}

              {item.tips && (
                <div className="tor-tips-box">
                  <FaLightbulb style={{ color: "#ffe066", fontSize: 15, flexShrink: 0, marginTop: 2 }} />
                  <p className="tor-tips-text">{item.tips}</p>
                </div>
              )}

              {item.video && (
                <video className="tor-video" controls src={item.video} />
              )}

              {item.imgs && item.imgs.length > 0 && (
                <div className="tor-imgs-row">
                  {item.imgs.map((img, i) => (
                    <div key={i} className={`tor-img-wrap${img.type === "button" ? " tor-img-btn-wrap" : ""}`}>
                      {img.type === "button" ? (
                        <img src={img.src} alt={img.label || ""} className="tor-ability-btn-img" />
                      ) : (
                        <button type="button" className="tor-screenshot-btn" onClick={() => setModalimg(img.src)}>
                          <img src={img.src} alt={img.label || ""} className="tor-screenshot-img" />
                        </button>
                      )}
                      {img.label && <span className="tor-img-label">{img.label}</span>}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Image lightbox */}
        {modalimg && (
          <div className="tor-lightbox" onClick={() => setModalimg(null)}>
            <div className="tor-lightbox-inner" onClick={e => e.stopPropagation()}>
              <button className="tor-lightbox-close" onClick={() => setModalimg(null)}>✕</button>
              <img src={modalimg} alt="Expanded view" className="tor-lightbox-img" />
            </div>
          </div>
        )}
      </>
    );
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;700;800&family=Space+Mono:wght@400;700&display=swap');

        .tor-roles-page {
          min-height: 100vh;
          background: #080b14;
          color: #f0eeff;
          font-family: 'Syne', sans-serif;
          position: relative;
          overflow-x: hidden;
        }

        /* Nebulae */
        .tor-nb1 { position: fixed; width: 600px; height: 600px; background: rgba(120,70,255,0.09); filter: blur(90px); border-radius: 50%; top: -200px; right: -100px; pointer-events: none; z-index: 0; }
        .tor-nb2 { position: fixed; width: 450px; height: 450px; background: rgba(255,70,150,0.06); filter: blur(80px); border-radius: 50%; bottom: 10%; left: -130px; pointer-events: none; z-index: 0; }

        .tor-roles-main {
          position: relative;
          z-index: 1;
          max-width: 960px;
          margin: 0 auto;
          padding: 100px 24px 64px;
        }

        /* Page title */
        .tor-page-title {
          text-align: center;
          margin-bottom: 56px;
        }
        .tor-page-eyebrow {
          display: inline-block;
          font-family: 'Space Mono', monospace;
          font-size: 11px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #a07bff;
          border: 1px solid rgba(160,123,255,0.3);
          padding: 5px 14px;
          border-radius: 100px;
          margin-bottom: 16px;
        }
        .tor-page-h1 {
          font-size: clamp(32px, 6vw, 56px);
          font-weight: 800;
          letter-spacing: -0.02em;
          background: linear-gradient(135deg, #a07bff, #ff6eb4, #ffe066);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        /* Section heading */
        .tor-section-heading {
          display: flex;
          align-items: center;
          gap: 14px;
          margin-bottom: 20px;
        }
        .tor-section-line {
          flex: 1;
          height: 1px;
          background: rgba(255,255,255,0.07);
        }
        .tor-section-title {
          font-size: 13px;
          font-family: 'Space Mono', monospace;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: rgba(240,238,255,0.4);
        }

        /* Grid */
        .tor-roles-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 14px;
          margin-bottom: 56px;
        }

        /* Role card */
        .tor-role-card {
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 16px;
          padding: 20px;
          display: flex;
          flex-direction: column;
          gap: 12px;
          transition: border-color 0.25s, transform 0.2s;
        }
        .tor-role-card:hover {
          border-color: rgba(160,123,255,0.28);
          transform: translateY(-2px);
        }

        .tor-role-header {
          display: flex;
          align-items: center;
          gap: 14px;
        }
        .tor-role-icon {
          width: 48px;
          height: 48px;
          border-radius: 12px;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.08);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          overflow: hidden;
        }
        .tor-role-meta { flex: 1; min-width: 0; }
        .tor-role-name {
          font-size: 16px;
          font-weight: 800;
          color: #f0eeff;
          letter-spacing: -0.01em;
          margin-bottom: 6px;
        }
        .tor-badge-row {
          display: flex;
          flex-wrap: wrap;
          gap: 5px;
        }
        .tor-badge {
          font-family: 'Space Mono', monospace;
          font-size: 10px;
          letter-spacing: 0.06em;
          padding: 2px 8px;
          border-radius: 100px;
          border: 1px solid;
          white-space: nowrap;
        }

        /* Description */
        .tor-role-desc {
          display: flex;
          align-items: flex-start;
          gap: 8px;
          font-size: 13px;
          color: rgba(240,238,255,0.65);
          font-family: 'Space Mono', monospace;
          line-height: 1.6;
          padding: 10px 12px;
          background: rgba(255,255,255,0.03);
          border-radius: 10px;
          border: 1px solid rgba(255,255,255,0.06);
        }

        /* Expand button */
        .tor-expand-btn {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
          padding: 9px 14px;
          border-radius: 10px;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          color: rgba(240,238,255,0.5);
          font-family: 'Space Mono', monospace;
          font-size: 11px;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          cursor: pointer;
          transition: background 0.2s, color 0.2s, border-color 0.2s;
        }
        .tor-expand-btn:hover,
        .tor-expand-btn.open {
          background: rgba(160,123,255,0.08);
          border-color: rgba(160,123,255,0.25);
          color: #a07bff;
        }
        .tor-expand-arrow { font-size: 9px; }

        /* Expandable area */
        .tor-expand-body {
          overflow: hidden;
          max-height: 0;
          opacity: 0;
          transition: max-height 0.35s ease, opacity 0.3s ease;
        }
        .tor-expand-body.open {
          max-height: 1200px;
          opacity: 1;
        }
        .tor-expand-inner {
          display: flex;
          flex-direction: column;
          gap: 12px;
          padding-top: 4px;
        }

        .tor-extra-text {
          font-family: 'Space Mono', monospace;
          font-size: 12px;
          color: rgba(240,238,255,0.6);
          line-height: 1.7;
          padding: 12px 14px;
          background: rgba(255,255,255,0.03);
          border-radius: 10px;
          border-left: 2px solid rgba(160,123,255,0.4);
        }

        .tor-tips-box {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          padding: 12px 14px;
          background: rgba(255,224,102,0.07);
          border: 1px solid rgba(255,224,102,0.2);
          border-radius: 10px;
        }
        .tor-tips-text {
          font-family: 'Space Mono', monospace;
          font-size: 12px;
          color: rgba(253,230,138,0.85);
          line-height: 1.7;
          white-space: pre-line;
        }

        .tor-video {
          width: 100%;
          border-radius: 10px;
          border: 1px solid rgba(255,255,255,0.08);
        }

        .tor-imgs-row {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          justify-content: center;
        }
        .tor-img-wrap { display: flex; flex-direction: column; align-items: center; width: 100%; }
        .tor-img-btn-wrap { width: auto; }
        .tor-ability-btn-img { width: 64px; height: 64px; object-fit: contain; border-radius: 8px; }
        .tor-screenshot-btn { border: none; background: none; cursor: pointer; width: 100%; }
        .tor-screenshot-img {
          width: 100%;
          max-width: 400px;
          height: auto;
          border-radius: 10px;
          border: 1px solid rgba(255,255,255,0.08);
          transition: border-color 0.2s;
        }
        .tor-screenshot-img:hover { border-color: rgba(160,123,255,0.4); }
        .tor-img-label {
          margin-top: 4px;
          font-family: 'Space Mono', monospace;
          font-size: 11px;
          color: rgba(240,238,255,0.35);
        }

        /* Lightbox */
        .tor-lightbox {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.85);
          backdrop-filter: blur(8px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 300;
          padding: 20px;
          animation: torFadeIn 0.2s ease;
        }
        @keyframes torFadeIn { from { opacity: 0; } to { opacity: 1; } }
        .tor-lightbox-inner {
          position: relative;
          max-width: 860px;
          width: 100%;
        }
        .tor-lightbox-close {
          position: absolute;
          top: -14px;
          right: -14px;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: rgba(255,255,255,0.1);
          border: 1px solid rgba(255,255,255,0.15);
          color: #f0eeff;
          font-size: 14px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background 0.2s;
          z-index: 1;
        }
        .tor-lightbox-close:hover { background: rgba(255,95,95,0.3); }
        .tor-lightbox-img {
          width: 100%;
          height: auto;
          border-radius: 14px;
          border: 1px solid rgba(255,255,255,0.1);
        }

        @media (max-width: 600px) {
          .tor-roles-main { padding: 88px 14px 48px; }
          .tor-roles-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      <div className="tor-roles-page">
        <div className="tor-nb1" />
        <div className="tor-nb2" />

        <Navbar />

        <main className="tor-roles-main">
          {/* Page title */}
          <div className="tor-page-title">
            <div className="tor-page-eyebrow">TOR-W : L</div>
            <h1 className="tor-page-h1">Roles & Modifiers</h1>
			<HiddenComputer id="roles" />
          </div>

          {/* Roles */}
          {roles.length > 0 && (
            <section>
              <div className="tor-section-heading">
                <div className="tor-section-line" />
                <span className="tor-section-title">Roles</span>
                <div className="tor-section-line" />
              </div>
              <div className="tor-roles-grid">
                {roles.map(item => <ItemCard key={item.name} item={item} />)}
              </div>
            </section>
          )}

          {/* Modifiers */}
          <section>
            <div className="tor-section-heading">
              <div className="tor-section-line" />
              <span className="tor-section-title">Modifiers</span>
              <div className="tor-section-line" />
            </div>
            <div className="tor-roles-grid">
              {modifiers.map(item => <ItemCard key={item.name} item={item} />)}
            </div>
          </section>

          <Footer />
        </main>
      </div>
    </>
  );
}
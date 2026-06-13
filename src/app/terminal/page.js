"use client";
import "./terminal.css";
import { useState } from "react";
import { archiveFiles } from "../../data/archiveFiles";

export default function Terminal() {
  const [input, setInput] = useState("");

  const [history, setHistory] = useState([
    "BOOTING TORWL SECURE ARCHIVE...",
    "",
    "[OK] Archive Core",
    "[OK] Recovery Engine",
    "[OK] Encryption System",
    "[OK] File Registry",
    "",
    "WARNING: UNAUTHORIZED ACCESS",
    "",
    "9 FILES DETECTED",
    "",
    "TYPE HELP",
  ]);

  const pushLines = (lines) => {
    setHistory((prev) => [...prev, ...lines]);
  };

  const fakeDecrypt = async (file) => {
    pushLines([
      "",
      "DECRYPTION REQUEST RECEIVED",
      "",
      "ACCESSING FILE...",
    ]);

    await new Promise(r => setTimeout(r, 400));

    pushLines(["[██░░░░░░░░░░░░░░░░] 10%"]);

    await new Promise(r => setTimeout(r, 400));

    pushLines(["[██████░░░░░░░░░░░░] 30%"]);

    await new Promise(r => setTimeout(r, 500));

    pushLines(["[████████████░░░░░░] 60%"]);

    await new Promise(r => setTimeout(r, 600));

    pushLines(["[██████████████████] 100%"]);

    await new Promise(r => setTimeout(r, 300));

    const data = archiveFiles[file];

    if (!data) {
      pushLines([
        "",
        "ERROR",
        "FILE CORRUPTED",
      ]);

      return;
    }

    if (file.startsWith("role")) {
      pushLines([
        "",
        "FILE DECRYPTED",
        "────────────────────",
        `FACTION: ${data.faction}`,
        `THREAT LEVEL: ${data.threat}`,
        `RARITY: ${data.rarity}`,
        "",
        "CODENAME:",
        data.codename,
        "",
        "DESCRIPTION:",
        data.description,
      ]);
    }

    if (file.startsWith("gamemode")) {
      pushLines([
        "",
        "GAMEMODE FILE",
        "────────────────────",
        `STATUS: ${data.status}`,
        `PLAYERS: ${data.players}`,
        "",
        data.description,
      ]);
    }
  };

  const execute = async (command) => {
    const cmd = command.toLowerCase();

    if (cmd === "help") {
      pushLines([
        "",
        "AVAILABLE COMMANDS",
        "help",
        "scan",
        "dir",
        "status",
        "integrity",
        "logs",
        "clear",
        "decrypt <file>",
      ]);

      return;
    }

    if (cmd === "scan") {
      pushLines([
        "",
        "SCANNING ARCHIVE...",
        "",
        "[██████████████████] 100%",
        "",
        "FILES DETECTED: 9",
        "ROLE FILES: 7",
        "GAMEMODES: 2",
        "INTEGRITY: 92.4%",
        "",
        "WARNING:",
        "1 CORRUPTED ENTRY DETECTED",
      ]);

      return;
    }

    if (cmd === "dir") {
      pushLines([
        "",
        "role_01.trwl",
        "role_02.trwl",
        "role_03.trwl",
        "role_04.trwl",
        "role_05.trwl",
        "role_06.trwl",
        "role_07.trwl",
        "gamemode_01.trwl",
        "gamemode_02.trwl",
      ]);

      return;
    }

    if (cmd === "status") {
      pushLines([
        "",
        "ARCHIVE STATUS",
        "CONNECTION: STABLE",
        "SECURITY: PURPLE",
        "FILES: 9",
      ]);

      return;
    }

    if (cmd === "integrity") {
      pushLines([
        "",
        "VERIFYING...",
        "",
        "ARCHIVE INTEGRITY",
        "92.4%",
      ]);

      return;
    }

    if (cmd === "logs") {
      pushLines([
        "",
        "[REDACTED]",
        "[REDACTED]",
        "[REDACTED]",
        "",
        "LAST ENTRY:",
        "\"They found the terminal.\"",
      ]);

      return;
    }

    if (cmd === "future") {
      pushLines([
        "",
        "UPDATE STATUS",
        "",
        "NEW ROLES: 7",
        "NEW GAMEMODES: 2",
        "",
        "RELEASE: SOON™",
      ]);

      return;
    }

    if (cmd === "covenant") {
      pushLines([
        "",
        "ACCESSING RESTRICTED CHANNEL...",
        "",
        "\"The circle grows.\"",
        "",
        "SIGNAL LOST",
      ]);

      return;
    }

    if (cmd === "clear") {
      setHistory([]);
      return;
    }

    if (cmd.startsWith("decrypt ")) {
      const file = cmd
        .replace("decrypt ", "")
        .replace(".trwl", "");

      await fakeDecrypt(file);

      return;
    }

    pushLines([
      "",
      "ERROR",
      "UNKNOWN COMMAND",
    ]);
  };

  const submit = async (e) => {
    e.preventDefault();

    const command = input.trim();

    if (!command) return;

    pushLines([`> ${command}`]);

    setInput("");

    await execute(command);
  };

  return (
    <div className="terminal-page">
      <div className="terminal">
        <div className="terminal-header">
          <div className="dot red" />
          <div className="dot yellow" />
          <div className="dot green" />

          <div className="terminal-title">
            TORWL SECURE ARCHIVE
          </div>
        </div>

        <div className="terminal-body">
          {history.map((line, i) => (
            <div key={i} className="line">
              {line}
            </div>
          ))}

          <form
            className="input-row"
            onSubmit={submit}
          >
            <span>{">"}</span>

            <input
              autoFocus
              value={input}
              onChange={(e) =>
                setInput(e.target.value)
              }
            />
          </form>
        </div>
      </div>
    </div>
  );
}
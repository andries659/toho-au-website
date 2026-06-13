"use client";
import { useState, useRef, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { FaCogs, FaUsers, FaSkullCrossbones, FaMagic, FaClipboardList, FaUsersCog, FaSlidersH, FaCog, FaDownload } from "react-icons/fa";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fa1, fa2, fa3, fa4, fa5, faDesktop, faMobilePhone } from "@fortawesome/free-solid-svg-icons";
import HiddenComputer from "../components/HiddenComputer";

// ── Tab metadata ──────────────────────────────────────────────
const tabsMeta = [
  { id: "Options",                  label: "Options",          icon: FaCogs,           accent: "#4fffb0" },
  { id: "Modifier Settings",        label: "Modifiers",        icon: FaSlidersH,       accent: "#fdba74" },
  { id: "Crewmate Role Settings",   label: "Crewmate Roles",   icon: FaUsers,          accent: "#7dd3fc" },
  { id: "Impostor Role Settings",   label: "Impostor Roles",   icon: FaSkullCrossbones,accent: "#fca5a5" },
  { id: "Neutral Role Settings",    label: "Neutral Roles",    icon: FaMagic,          accent: "#fde68a" },
  { id: "Coven Role Settings",      label: "Coven Roles",      icon: FaClipboardList,  accent: "#d8b4fe" },
  { id: "Roles",                    label: "Role Settings",    icon: FaUsersCog,       accent: "#a07bff" },
];

// ── Section display names ─────────────────────────────────────
function SectionLabel({ sectionKey }) {
  const map = {
    "LaunchpadReloaded.Options.BattleRoyaleOptions":                    { icon: null,                              label: "Battle Royale Options" },
    "LaunchpadReloaded.Options.FunOptions":                             { icon: null,                              label: "Fun Options" },
    "LaunchpadReloaded.Options.GeneralOptions":                         { icon: null,                              label: "General Options" },
    "LaunchpadReloaded.Options.VotingOptions":                          { icon: null,                              label: "Voting Options" },
    "LaunchpadReloaded.Options.Modifiers.CrewmateModifierOptions":      { icon: null,                              label: "Crewmate Modifier Options" },
    "LaunchpadReloaded.Options.Modifiers.LpModifierOptions":            { icon: null,                              label: "LP Modifier Options" },
    "LaunchpadReloaded.Options.Modifiers.UniversalModifierOptions":     { icon: null,                              label: "Universal Modifier Options" },
    "LaunchpadReloaded.Options.Modifiers.Crewmate.BaitOptions":         { icon: "/icons/Crewmate-Mod/Bait.png",    label: "Bait Options" },
    "LaunchpadReloaded.Options.Modifiers.Crewmate.BurstOptions":        { icon: "/icons/Crewmate-Mod/Burst.png",   label: "Burst Options" },
    "LaunchpadReloaded.Options.Modifiers.Crewmate.MayorOptions":        { icon: "/icons/Crewmate-Mod/Mayor.png",   label: "Mayor Options" },
    "LaunchpadReloaded.Options.Modifiers.Crewmate.TorchOptions":        { icon: "/icons/Crewmate-Mod/Torch.png",   label: "Torch Options" },
    "LaunchpadReloaded.Options.Modifiers.Universal.FlashOptions":       { icon: "/icons/Universal/Flash.png",      label: "Flash Options" },
    "LaunchpadReloaded.Options.Modifiers.Universal.KingOptions":        { icon: "/icons/Universal/VIP.png",        label: "VIP Options" },
    "LaunchpadReloaded.Options.Roles.Coven.TavernKeeperOptions":        { icon: "/icons/Coven/TavernKeeper.png",   label: "Tavern Keeper Options" },
    "LaunchpadReloaded.Options.Roles.Crewmate.CoronerOptions":          { icon: "/icons/Crewmate/Coroner.png",     label: "Coroner Options" },
    "LaunchpadReloaded.Options.Roles.Crewmate.GamblerOptions":          { icon: "/icons/Crewmate/Gambler.png",     label: "Gambler Options" },
    "LaunchpadReloaded.Options.Roles.Crewmate.MedicOptions":            { icon: "/icons/Crewmate/Medic.png",       label: "Medic Options" },
    "LaunchpadReloaded.Options.Roles.Crewmate.SealerOptions":           { icon: "/icons/Crewmate/Sealer.png",      label: "Sealer Options" },
    "LaunchpadReloaded.Options.Roles.Crewmate.SheriffOptions":          { icon: "/icons/Crewmate/Sheriff.png",     label: "Sheriff Options" },
    "LaunchpadReloaded.Options.Roles.Crewmate.TeleporterOptions":       { icon: "/icons/Crewmate/Teleporter.png",  label: "Teleporter Options" },
    "LaunchpadReloaded.Options.Roles.Impostor.BurrowerOptions":         { icon: "/icons/Impostor/Burrower.png",    label: "Burrower Options" },
    "LaunchpadReloaded.Options.Roles.Impostor.SilencerOptions":         { icon: "/icons/Impostor/Silencer.png",    label: "Silencer Options" },
    "LaunchpadReloaded.Options.Roles.Impostor.HitmanOptions":           { icon: "/icons/Impostor/Hitman.png",      label: "Hitman Options" },
    "LaunchpadReloaded.Options.Roles.Impostor.JanitorOptions":          { icon: "/icons/Impostor/Janitor.png",     label: "Janitor Options" },
    "LaunchpadReloaded.Options.Roles.Impostor.SurgeonOptions":          { icon: "/icons/Impostor/Surgeon.png",     label: "Surgeon Options" },
    "LaunchpadReloaded.Options.Roles.Impostor.SwapshifterOptions":      { icon: "/icons/Impostor/Swapshifter.png", label: "Swapshifter Options" },
    "LaunchpadReloaded.Options.Roles.Impostor.ToxifierOptions":         { icon: "/icons/Impostor/Toxifier.png",    label: "Toxifier Options" },
    "LaunchpadReloaded.Options.Roles.Impostor.PoltergeistOptions":      { icon: "/icons/Impostor/Poltergeist.png", label: "Poltergeist Options" },
    "LaunchpadReloaded.Options.Roles.Neutral.ExecutionerOptions":       { icon: "/icons/Neutral/Executioner.png",  label: "Executioner Options" },
    "LaunchpadReloaded.Options.Roles.Neutral.JesterOptions":            { icon: "/icons/Neutral/Jester.png",       label: "Jester Options" },
    "LaunchpadReloaded.Options.Roles.Neutral.NeutralKillerOptions":     { icon: "/icons/Neutral/NeutralKiller.png",label: "Neutral Killer Options" },
    "LaunchpadReloaded.Options.Roles.Neutral.ReaperOptions":            { icon: "/icons/Neutral/Reaper.png",       label: "Reaper Options" },
    "LaunchpadReloaded.Options.Roles.Neutral.TraitorOptions":           { icon: "/icons/Neutral/Traitor.png",      label: "Traitor Options" },
    "LaunchpadReloaded.Options.Roles.Neutral.SurvivorOptions":          { icon: "/icons/Neutral/Survivor.png",     label: "Survivor Options" },
  };
  const entry = map[sectionKey];
  if (!entry) return <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 13 }}>{sectionKey}</span>;
  return (
    <span style={{ display: "flex", alignItems: "center", gap: 10 }}>
      {entry.icon
        ? <img src={entry.icon} alt="" width={24} height={24} style={{ borderRadius: 4 }} />
        : <FaCogs style={{ fontSize: 16, color: "rgba(240,238,255,0.5)" }} />
      }
      <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 15, color: "#f0eeff" }}>{entry.label}</span>
    </span>
  );
}

export default function ExportConfigPage() {
  const [sections, setSections] = useState({
    "LaunchpadReloaded.Options.BattleRoyaleOptions": [
      { id: "seekerCharacter", label: "Seeker Character", key: "SeekerCharacter", type: "boolean", value: true },
      { id: "showKnife",       label: "Show Knife",       key: "ShowKnife",       type: "boolean", value: true },
    ],
    "LaunchpadReloaded.Options.FunOptions": [
      { id: "friendlyFire", label: "Friendly Fire",   key: "FriendlyFire",  type: "boolean", value: false },
      { id: "uniqueColors", label: "Unique Colors",   key: "UniqueColors",  type: "boolean", value: true  },
      { id: "character",    label: "Character (idx)", key: "Character",     type: "int",     value: 0     },
    ],
    "LaunchpadReloaded.Options.GeneralOptions": [
      { id: "notepad",                  label: "Notepad Enabled",          key: "Notepad",                  type: "boolean", value: true  },
      { id: "banCheaters",              label: "Ban Cheaters",             key: "BanCheaters",              type: "boolean", value: true  },
      { id: "disableMeetingTeleport",   label: "Disable Meeting Teleport", key: "DisableMeetingTeleport",   type: "boolean", value: false },
    ],
    "LaunchpadReloaded.Options.Modifiers.Crewmate.BaitOptions": [
      { id: "baitAmount", label: "Bait Amount", key: "BaitAmount", type: "float", value: 1 },
    ],
    "LaunchpadReloaded.Options.Modifiers.Crewmate.BurstOptions": [
      { id: "burstAmount", label: "Burst Amount", key: "BurstAmount", type: "float", value: 1  },
      { id: "burstRadius", label: "Burst Radius", key: "BurstRadius", type: "float", value: 45 },
    ],
    "LaunchpadReloaded.Options.Modifiers.Crewmate.MayorOptions": [
      { id: "mayorAmount",      label: "Mayor Amount",       key: "MayorAmount",      type: "float",   value: 1    },
      { id: "extraVotes",       label: "Extra Votes",        key: "ExtraVotes",       type: "float",   value: 1    },
      { id: "allowVotingTwice", label: "Allow Voting Twice", key: "AllowVotingTwice", type: "boolean", value: true },
    ],
    "LaunchpadReloaded.Options.Modifiers.Crewmate.TorchOptions": [
      { id: "torchAmount",          label: "Torch Amount",         key: "TorchAmount",          type: "float",   value: 1    },
      { id: "useFlashlight",        label: "Use Flashlight",       key: "UseFlashlight",        type: "boolean", value: true },
      { id: "torchFlashlightSize",  label: "Torch Flashlight Size",key: "TorchFlashlightSize",  type: "float",   value: 0.25 },
    ],
    "LaunchpadReloaded.Options.Modifiers.Universal.FlashOptions": [
      { id: "flashAmount", label: "Flash Amount", key: "FlashAmount", type: "float", value: 1 },
    ],
    "LaunchpadReloaded.Options.Modifiers.Universal.KingOptions": [
      { id: "kingAmount", label: "VIP Amount", key: "KingAmount", type: "float", value: 1 },
    ],
    "LaunchpadReloaded.Options.Modifiers.CrewmateModifierOptions": [
      { id: "mayorChance", label: "Mayor Chance", key: "MayorChance", type: "float", value: 0 },
      { id: "torchChance", label: "Torch Chance", key: "TorchChance", type: "float", value: 0 },
      { id: "baitChance",  label: "Bait Chance",  key: "BaitChance",  type: "float", value: 0 },
      { id: "burstChance", label: "Burst Chance", key: "BurstChance", type: "float", value: 0 },
    ],
    "LaunchpadReloaded.Options.Modifiers.LpModifierOptions": [
      { id: "modifierLimit", label: "Modifier Limit", key: "ModifierLimit", type: "float", value: 1 },
    ],
    "LaunchpadReloaded.Options.Modifiers.UniversalModifierOptions": [
      { id: "flashChance", label: "Flash Chance", key: "FlashChance", type: "float", value: 0 },
      { id: "kingChance",  label: "King Chance",  key: "KingChance",  type: "float", value: 0 },
    ],
    "LaunchpadReloaded.Options.Roles.Coven.TavernKeeperOptions": [
      { id: "roleBlockCooldown", label: "Role Block Cooldown",  key: "RoleBlockCooldown",  type: "float", value: 20 },
      { id: "roleBlockUses",     label: "Role Block Uses",      key: "RoleBlockUses",      type: "float", value: 5  },
      { id: "roleBlockDuration", label: "Role Block Duration",  key: "RoleBlockDuration",  type: "float", value: 20 },
    ],
    "LaunchpadReloaded.Options.Roles.Crewmate.CoronerOptions": [
      { id: "freezeCooldown", label: "Freeze Cooldown", key: "FreezeCooldown", type: "float", value: 15 },
      { id: "freezeUses",     label: "Freeze Uses",     key: "FreezeUses",     type: "float", value: 0  },
    ],
    "LaunchpadReloaded.Options.Roles.Crewmate.GamblerOptions": [
      { id: "gambleCooldown", label: "Gamble Cooldown", key: "GambleCooldown", type: "float", value: 25 },
      { id: "gambleUses",     label: "Gamble Uses",     key: "GambleUses",     type: "float", value: 0  },
    ],
    "LaunchpadReloaded.Options.Roles.Crewmate.MedicOptions": [
      { id: "onlyAllowInMedbay", label: "Only Allow In Medbay", key: "OnlyAllowInMedbay", type: "boolean", value: false },
      { id: "dragBodies",        label: "Drag Bodies",          key: "DragBodies",        type: "boolean", value: false },
      { id: "maxRevives",        label: "Max Revives",          key: "MaxRevives",        type: "float",   value: 2    },
      { id: "reviveCooldown",    label: "Revive Cooldown",      key: "ReviveCooldown",    type: "float",   value: 20   },
    ],
    "LaunchpadReloaded.Options.Roles.Crewmate.SealerOptions": [
      { id: "sealVentCooldown", label: "Seal Vent Cooldown", key: "SealVentCooldown", type: "float",   value: 35   },
      { id: "sealVentUses",     label: "Seal Vent Uses",     key: "SealVentUses",     type: "float",   value: 3    },
      { id: "sealReveal",       label: "Seal Reveal",        key: "SealReveal",       type: "boolean", value: true },
    ],
    "LaunchpadReloaded.Options.Roles.Crewmate.SheriffOptions": [
      { id: "shotCooldown",        label: "Shot Cooldown",        key: "ShotCooldown",        type: "float",   value: 45    },
      { id: "shotsPerGame",        label: "Shots Per Game",       key: "ShotsPerGame",        type: "float",   value: 3     },
      { id: "shouldCrewmateDie",   label: "Should Crewmate Die",  key: "ShouldCrewmateDie",   type: "boolean", value: false },
    ],
    "LaunchpadReloaded.Options.Roles.Crewmate.TeleporterOptions": [
      { id: "teleportCooldown",       label: "Teleport Cooldown",      key: "TeleportCooldown", type: "float", value: 10 },
      { id: "teleportDuration",       label: "Teleport Duration",      key: "TeleportDuration", type: "float", value: 10 },
      { id: "teleportZoomDistance",   label: "Teleport Zoom Distance", key: "ZoomDistance",     type: "float", value: 6  },
      { id: "teleportUses",           label: "Teleport Uses",          key: "TeleportUses",     type: "float", value: 3  },
    ],
    "LaunchpadReloaded.Options.Roles.Impostor.BurrowerOptions": [
      { id: "ventDigCooldown", label: "Vent Dig Cooldown", key: "VentDigCooldown", type: "float", value: 35  },
      { id: "ventDigUses",     label: "Vent Dig Uses",     key: "VentDigUses",     type: "float", value: 0   },
      { id: "ventDist",        label: "Vent Distance",     key: "VentDist",        type: "float", value: 1.5 },
    ],
    "LaunchpadReloaded.Options.Roles.Impostor.SilencerOptions": [
      { id: "silenceCooldown", label: "Silence Cooldown", key: "SilenceCooldown", type: "float", value: 35 },
      { id: "silenceUses",     label: "Silence Uses",     key: "SilenceUses",     type: "float", value: 0  },
    ],
    "LaunchpadReloaded.Options.Roles.Impostor.HitmanOptions": [
      { id: "deadlockCooldown",  label: "Deadlock Cooldown",  key: "DeadlockCooldown",  type: "float", value: 40 },
      { id: "deadlockUses",      label: "Deadlock Uses",      key: "DeadlockUses",      type: "float", value: 3  },
      { id: "markLimit",         label: "Mark Limit",         key: "MarkLimit",         type: "float", value: 2  },
      { id: "deadlockDuration",  label: "Deadlock Duration",  key: "DeadlockDuration",  type: "float", value: 20 },
    ],
    "LaunchpadReloaded.Options.Roles.Impostor.JanitorOptions": [
      { id: "hideCooldown",        label: "Hide Cooldown",         key: "HideCooldown",        type: "float",   value: 5     },
      { id: "dragSpeed",           label: "Drag Speed",            key: "DragSpeed",           type: "float",   value: 1.75  },
      { id: "hideUses",            label: "Hide Uses",             key: "HideUses",            type: "float",   value: 3     },
      { id: "cleanInsteadOfHide",  label: "Clean Instead Of Hide", key: "CleanInsteadOfHide",  type: "boolean", value: false },
    ],
    "LaunchpadReloaded.Options.Roles.Impostor.SurgeonOptions": [
      { id: "injectCooldown",  label: "Inject Cooldown",  key: "InjectCooldown",  type: "float", value: 10 },
      { id: "injectUses",      label: "Inject Uses",      key: "InjectUses",      type: "float", value: 0  },
      { id: "dissectCooldown", label: "Dissect Cooldown", key: "DissectCooldown", type: "float", value: 35 },
      { id: "dissectUses",     label: "Dissect Uses",     key: "DissectUses",     type: "float", value: 0  },
      { id: "poisonDelay",     label: "Poison Delay",     key: "PoisonDelay",     type: "float", value: 10 },
    ],
    "LaunchpadReloaded.Options.Roles.Impostor.SwapshifterOptions": [
      { id: "swapCooldown",       label: "Swap Cooldown",       key: "SwapCooldown",       type: "float",   value: 30   },
      { id: "swapDuration",       label: "Swap Duration",       key: "SwapDuration",       type: "float",   value: 15   },
      { id: "swapUses",           label: "Swap Uses",           key: "SwapUses",           type: "float",   value: 3    },
      { id: "canSwapImpostors",   label: "Can Swap Impostors",  key: "CanSwapImpostors",   type: "boolean", value: true },
    ],
    "LaunchpadReloaded.Options.Roles.Impostor.ToxifierOptions": [
      { id: "toxifyCooldown",  label: "Toxify Cooldown",  key: "ToxifyCooldown",  type: "float", value: 10 },
      { id: "toxifiedDelay",   label: "Toxified Delay",   key: "ToxifiedDelay",   type: "float", value: 10 },
      { id: "toxifyUses",      label: "Toxify Uses",      key: "ToxifyUses",      type: "float", value: 0  },
    ],
    "LaunchpadReloaded.Options.Roles.Impostor.PoltergeistOptions": [
      { id: "curseCooldown",  label: "Curse Cooldown",  key: "CurseCooldown",  type: "float", value: 10 },
      { id: "curseDuration",  label: "Curse Duration",  key: "CurseDuration",  type: "float", value: 10 },
    ],
    "LaunchpadReloaded.Options.Roles.Neutral.ExecutionerOptions": [
      { id: "executionerCanCallMeeting",      label: "Can Call Meeting",      key: "CanCallMeeting",      type: "boolean", value: false },
      { id: "executionerTargetDeathNewRole",  label: "Target Death New Role", key: "TargetDeathNewRole",  type: "int",     value: 1     },
    ],
    "LaunchpadReloaded.Options.Roles.Neutral.JesterOptions": [
      { id: "jesterCanUseVents", label: "Can Use Vents", key: "CanUseVents", type: "boolean", value: true },
    ],
    "LaunchpadReloaded.Options.Roles.Neutral.NeutralKillerOptions": [
      { id: "neutralKillerCooldown",    label: "Neutral Kill Cooldown", key: "NeutralKillCooldown", type: "float",   value: 20   },
      { id: "neutralKillerCanUseVents", label: "Can Use Vents",         key: "CanUseVents",         type: "boolean", value: true },
    ],
    "LaunchpadReloaded.Options.Roles.Neutral.ReaperOptions": [
      { id: "soulCollections",  label: "Soul Collections",  key: "SoulCollections",  type: "float", value: 3  },
      { id: "collectCooldown",  label: "Collect Cooldown",  key: "CollectCooldown",  type: "float", value: 20 },
    ],
    "LaunchpadReloaded.Options.Roles.Neutral.TraitorOptions": [
      { id: "traitorCanCallMeeting",     label: "Can Call Meeting",      key: "CanCallMeeting",     type: "boolean", value: false },
      { id: "traitorTargetDeathNewRole", label: "Target Death New Role", key: "TargetDeathNewRole", type: "int",     value: 1     },
    ],
    "LaunchpadReloaded.Options.Roles.Neutral.SurvivorOptions": [
      { id: "vestCooldown",  label: "Vest Cooldown", key: "VestCooldown", type: "float", value: 25 },
      { id: "vestDuration",  label: "Vest Duration", key: "VestDuration", type: "float", value: 10 },
      { id: "maxVestUses",   label: "Max Vests",     key: "MaxVests",     type: "float", value: 10 },
    ],
    "LaunchpadReloaded.Options.VotingOptions": [
      { id: "votingType",                label: "Voting Type",                 key: "VotingType",                type: "int",     value: 0     },
      { id: "maxVotes",                  label: "Max Votes",                   key: "MaxVotes",                  type: "float",   value: 3     },
      { id: "allowVotingForSamePerson",  label: "Allow Voting For Same Person",key: "AllowVotingForSamePerson",  type: "boolean", value: false },
      { id: "allowConfirmingVotes",      label: "Allow Confirming Votes",      key: "AllowConfirmingVotes",      type: "boolean", value: false },
      { id: "hideVotingIcons",           label: "Hide Voting Icons",           key: "HideVotingIcons",           type: "boolean", value: false },
      { id: "showPercentages",           label: "Show Percentages",            key: "ShowPercentages",           type: "boolean", value: false },
    ],
    Roles: [
      { id: "numExecutioner",   label: "Num Executioner Role",   key: "Num LaunchpadReloaded.Roles.Neutral.ExecutionerRole",   type: "int", value: 1   },
      { id: "chanceExecutioner",label: "Chance Executioner Role",key: "Chance LaunchpadReloaded.Roles.Neutral.ExecutionerRole", type: "int", value: 100 },
      { id: "numJester",        label: "Num Jester Role",        key: "Num LaunchpadReloaded.Roles.Neutral.JesterRole",        type: "int", value: 1   },
      { id: "chanceJester",     label: "Chance Jester Role",     key: "Chance LaunchpadReloaded.Roles.Neutral.JesterRole",     type: "int", value: 100 },
      { id: "numNeutralKiller", label: "Num Neutral Killer Role",key: "Num LaunchpadReloaded.Roles.Neutral.NeutralKillerRole", type: "int", value: 1   },
      { id: "chanceNeutralKiller",label:"Chance Neutral Killer", key: "Chance LaunchpadReloaded.Roles.Neutral.NeutralKillerRole",type:"int", value: 100 },
      { id: "numReaper",        label: "Num Reaper Role",        key: "Num LaunchpadReloaded.Roles.Neutral.ReaperRole",        type: "int", value: 1   },
      { id: "chanceReaper",     label: "Chance Reaper Role",     key: "Chance LaunchpadReloaded.Roles.Neutral.ReaperRole",     type: "int", value: 100 },
      { id: "numTraitor",       label: "Num Traitor Role",       key: "Num LaunchpadReloaded.Roles.Neutral.TraitorRole",       type: "int", value: 1   },
      { id: "chanceTraitor",    label: "Chance Traitor Role",    key: "Chance LaunchpadReloaded.Roles.Neutral.TraitorRole",    type: "int", value: 100 },
      { id: "numSurvivor",      label: "Num Survivor Role",      key: "Num LaunchpadReloaded.Roles.Neutral.SurvivorRole",      type: "int", value: 1   },
      { id: "chanceSurvivor",   label: "Chance Survivor Role",   key: "Chance LaunchpadReloaded.Roles.Neutral.SurvivorRole",   type: "int", value: 100 },
      { id: "numBurrower",      label: "Num Burrower Role",      key: "Num LaunchpadReloaded.Roles.Impostor.BurrowerRole",     type: "int", value: 1   },
      { id: "chanceBurrower",   label: "Chance Burrower Role",   key: "Chance LaunchpadReloaded.Roles.Impostor.BurrowerRole",  type: "int", value: 100 },
      { id: "numHitman",        label: "Num Hitman Role",        key: "Num LaunchpadReloaded.Roles.Impostor.HitmanRole",       type: "int", value: 1   },
      { id: "chanceHitman",     label: "Chance Hitman Role",     key: "Chance LaunchpadReloaded.Roles.Impostor.HitmanRole",    type: "int", value: 100 },
      { id: "numJanitor",       label: "Num Janitor Role",       key: "Num LaunchpadReloaded.Roles.Impostor.JanitorRole",      type: "int", value: 1   },
      { id: "chanceJanitor",    label: "Chance Janitor Role",    key: "Chance LaunchpadReloaded.Roles.Impostor.JanitorRole",   type: "int", value: 100 },
      { id: "numSurgeon",       label: "Num Surgeon Role",       key: "Num LaunchpadReloaded.Roles.Impostor.SurgeonRole",      type: "int", value: 1   },
      { id: "chanceSurgeon",    label: "Chance Surgeon Role",    key: "Chance LaunchpadReloaded.Roles.Impostor.SurgeonRole",   type: "int", value: 100 },
      { id: "numSwapshifter",   label: "Num Swapshifter Role",   key: "Num LaunchpadReloaded.Roles.Impostor.SwapshifterRole",  type: "int", value: 1   },
      { id: "chanceSwapshifter",label: "Chance Swapshifter Role",key: "Chance LaunchpadReloaded.Roles.Impostor.SwapshifterRole",type:"int", value: 100 },
      { id: "numSilencer",      label: "Num Silencer Role",      key: "Num LaunchpadReloaded.Roles.Impostor.SilencerRole",     type: "int", value: 1   },
      { id: "chanceSilencer",   label: "Chance Silencer Role",   key: "Chance LaunchpadReloaded.Roles.Impostor.SilencerRole",  type: "int", value: 100 },
      { id: "numToxifier",      label: "Num Toxifier Role",      key: "Num LaunchpadReloaded.Roles.Impostor.ToxifierRole",     type: "int", value: 1   },
      { id: "chanceToxifier",   label: "Chance Toxifier Role",   key: "Chance LaunchpadReloaded.Roles.Impostor.ToxifierRole",  type: "int", value: 100 },
      { id: "numPoltergeist",   label: "Num Poltergeist Role",   key: "Num LaunchpadReloaded.Roles.Impostor.PoltergeistRole",  type: "int", value: 1   },
      { id: "chancePoltergeist",label: "Chance Poltergeist Role",key: "Chance LaunchpadReloaded.Roles.Impostor.PoltergeistRole",type:"int", value: 100 },
      { id: "numCoroner",       label: "Num Coroner Role",       key: "Num LaunchpadReloaded.Roles.Crewmate.CoronerRole",      type: "int", value: 1   },
      { id: "chanceCoroner",    label: "Chance Coroner Role",    key: "Chance LaunchpadReloaded.Roles.Crewmate.CoronerRole",   type: "int", value: 100 },
      { id: "numGambler",       label: "Num Gambler Role",       key: "Num LaunchpadReloaded.Roles.Crewmate.GamblerRole",      type: "int", value: 1   },
      { id: "chanceGambler",    label: "Chance Gambler Role",    key: "Chance LaunchpadReloaded.Roles.Crewmate.GamblerRole",   type: "int", value: 100 },
      { id: "numMedic",         label: "Num Medic Role",         key: "Num LaunchpadReloaded.Roles.Crewmate.MedicRole",        type: "int", value: 1   },
      { id: "chanceMedic",      label: "Chance Medic Role",      key: "Chance LaunchpadReloaded.Roles.Crewmate.MedicRole",     type: "int", value: 100 },
      { id: "numSealer",        label: "Num Sealer Role",        key: "Num LaunchpadReloaded.Roles.Crewmate.SealerRole",       type: "int", value: 1   },
      { id: "chanceSealer",     label: "Chance Sealer Role",     key: "Chance LaunchpadReloaded.Roles.Crewmate.SealerRole",    type: "int", value: 100 },
      { id: "numSheriff",       label: "Num Sheriff Role",       key: "Num LaunchpadReloaded.Roles.Crewmate.SheriffRole",      type: "int", value: 1   },
      { id: "chanceSheriff",    label: "Chance Sheriff Role",    key: "Chance LaunchpadReloaded.Roles.Crewmate.SheriffRole",   type: "int", value: 100 },
      { id: "numTeleporter",    label: "Num Teleporter Role",    key: "Num LaunchpadReloaded.Roles.Crewmate.TeleporterRole",   type: "int", value: 1   },
      { id: "chanceTeleporter", label: "Chance Teleporter Role", key: "Chance LaunchpadReloaded.Roles.Crewmate.TeleporterRole",type: "int", value: 100 },
      { id: "numTavernKeeper",  label: "Num TavernKeeper Role",  key: "Num LaunchpadReloaded.Roles.Coven.TavernKeeperRole",   type: "int", value: 1   },
      { id: "chanceTavernKeeper",label:"Chance TavernKeeper",    key: "Chance LaunchpadReloaded.Roles.Coven.TavernKeeperRole",type: "int", value: 100 },
    ],
  });

  const tabs = {
    Options: [
      "LaunchpadReloaded.Options.BattleRoyaleOptions",
      "LaunchpadReloaded.Options.FunOptions",
      "LaunchpadReloaded.Options.GeneralOptions",
      "LaunchpadReloaded.Options.VotingOptions",
      "LaunchpadReloaded.Options.Modifiers.CrewmateModifierOptions",
      "LaunchpadReloaded.Options.Modifiers.LpModifierOptions",
      "LaunchpadReloaded.Options.Modifiers.UniversalModifierOptions",
    ],
    "Modifier Settings": [
      "LaunchpadReloaded.Options.Modifiers.Crewmate.BaitOptions",
      "LaunchpadReloaded.Options.Modifiers.Crewmate.BurstOptions",
      "LaunchpadReloaded.Options.Modifiers.Crewmate.MayorOptions",
      "LaunchpadReloaded.Options.Modifiers.Crewmate.TorchOptions",
      "LaunchpadReloaded.Options.Modifiers.Universal.FlashOptions",
      "LaunchpadReloaded.Options.Modifiers.Universal.KingOptions",
    ],
    "Crewmate Role Settings": [
      "LaunchpadReloaded.Options.Roles.Crewmate.CoronerOptions",
      "LaunchpadReloaded.Options.Roles.Crewmate.GamblerOptions",
      "LaunchpadReloaded.Options.Roles.Crewmate.MedicOptions",
      "LaunchpadReloaded.Options.Roles.Crewmate.SealerOptions",
      "LaunchpadReloaded.Options.Roles.Crewmate.SheriffOptions",
      "LaunchpadReloaded.Options.Roles.Crewmate.TeleporterOptions",
    ],
    "Impostor Role Settings": [
      "LaunchpadReloaded.Options.Roles.Impostor.BurrowerOptions",
      "LaunchpadReloaded.Options.Roles.Impostor.SilencerOptions",
      "LaunchpadReloaded.Options.Roles.Impostor.HitmanOptions",
      "LaunchpadReloaded.Options.Roles.Impostor.JanitorOptions",
      "LaunchpadReloaded.Options.Roles.Impostor.SurgeonOptions",
      "LaunchpadReloaded.Options.Roles.Impostor.SwapshifterOptions",
      "LaunchpadReloaded.Options.Roles.Impostor.ToxifierOptions",
      "LaunchpadReloaded.Options.Roles.Impostor.PoltergeistOptions",
    ],
    "Neutral Role Settings": [
      "LaunchpadReloaded.Options.Roles.Neutral.ExecutionerOptions",
      "LaunchpadReloaded.Options.Roles.Neutral.JesterOptions",
      "LaunchpadReloaded.Options.Roles.Neutral.NeutralKillerOptions",
      "LaunchpadReloaded.Options.Roles.Neutral.ReaperOptions",
      "LaunchpadReloaded.Options.Roles.Neutral.TraitorOptions",
      "LaunchpadReloaded.Options.Roles.Neutral.SurvivorOptions",
    ],
    "Coven Role Settings": [
      "LaunchpadReloaded.Options.Roles.Coven.TavernKeeperOptions",
    ],
    Roles: ["Role"],
  };

  const [activeTab, setActiveTab] = useState("Options");
  const [collapsedSections, setCollapsedSections] = useState(() => {
    const s = {};
    Object.keys(sections).forEach(k => { s[k] = true; });
    s["RolesBlock"] = true;
    return s;
  });

  const contentRefs = useRef({});
  const [measuredHeights, setMeasuredHeights] = useState({});

  useEffect(() => {
    const newH = {};
    Object.keys(contentRefs.current).forEach(k => {
      const el = contentRefs.current[k];
      if (el) newH[k] = el.scrollHeight + 8;
    });
    setMeasuredHeights(prev => {
      const same = Object.keys(newH).every(k => prev[k] === newH[k]);
      return same ? prev : { ...prev, ...newH };
    });
  }, [sections, collapsedSections, activeTab]);

  const toggleCollapse = key => setCollapsedSections(prev => ({ ...prev, [key]: !prev[key] }));

  const updateItemValue = (sectionName, itemId, rawValue) => {
    setSections(prev => {
      const copy = JSON.parse(JSON.stringify(prev));
      const item = copy[sectionName]?.find(i => i.id === itemId);
      if (!item) return prev;
      if (item.type === "boolean") item.value = rawValue === true || rawValue === "true";
      else if (item.type === "int")   item.value = parseInt(rawValue, 10) || 0;
      else if (item.type === "float") item.value = parseFloat(rawValue) || 0;
      else item.value = rawValue;
      return copy;
    });
  };

  const exportConfig = () => {
    const lines = [];
    for (const [sectionName, itemList] of Object.entries(sections)) {
      lines.push(`[${sectionName}]`, "");
      for (const item of itemList) {
        lines.push(`${item.key} = ${item.type === "boolean" ? (item.value ? "true" : "false") : String(item.value)}`, "");
      }
    }
    const blob = new Blob([lines.join("\n")], { type: "text/plain;charset=utf-8" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "TORWModPreset.cfg";
    a.click();
    URL.revokeObjectURL(a.href);
  };

  const renderInput = (sectionName, item) => {
    if (item.type === "boolean") return (
      <select value={item.value ? "true" : "false"} onChange={e => updateItemValue(sectionName, item.id, e.target.value)} className="tor-input">
        <option value="true">True</option>
        <option value="false">False</option>
      </select>
    );
    return (
      <input type="number" step={item.type === "int" ? "1" : "any"} value={item.value}
        onChange={e => updateItemValue(sectionName, item.id, e.target.value)} className="tor-input" />
    );
  };

  const getSectionsForTab = tab => (tabs[tab] || []).filter(k => sections[k]);
  const activeAccent = tabsMeta.find(t => t.id === activeTab)?.accent || "#a07bff";

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;700;800&family=Space+Mono:wght@400;700&display=swap');

        .tor-options-page {
          min-height: 100vh;
          background: #080b14;
          color: #f0eeff;
          font-family: 'Syne', sans-serif;
          overflow-x: hidden;
          position: relative;
        }
        .tor-nb1 { position: fixed; width: 600px; height: 600px; background: rgba(120,70,255,0.09); filter: blur(90px); border-radius: 50%; top: -180px; right: -100px; pointer-events: none; z-index: 0; }
        .tor-nb2 { position: fixed; width: 440px; height: 440px; background: rgba(255,70,150,0.06); filter: blur(80px); border-radius: 50%; bottom: 8%; left: -120px; pointer-events: none; z-index: 0; }

        .tor-options-main {
          position: relative;
          z-index: 1;
          max-width: 960px;
          margin: 0 auto;
          padding: 100px 24px 64px;
          display: flex;
          flex-direction: column;
          gap: 40px;
        }

        /* Page title */
        .tor-page-title { text-align: center; }
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
          font-size: clamp(28px, 5vw, 48px);
          font-weight: 800;
          letter-spacing: -0.02em;
          background: linear-gradient(135deg, #a07bff, #ff6eb4, #ffe066);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        /* Tab bar */
        .tor-tab-bar {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          justify-content: center;
        }
        .tor-tab-btn {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          padding: 8px 16px;
          border-radius: 10px;
          border: 1px solid rgba(255,255,255,0.08);
          background: rgba(255,255,255,0.04);
          color: rgba(240,238,255,0.5);
          font-family: 'Space Mono', monospace;
          font-size: 11px;
          letter-spacing: 0.07em;
          text-transform: uppercase;
          cursor: pointer;
          transition: background 0.2s, border-color 0.2s, color 0.2s;
          white-space: nowrap;
        }
        .tor-tab-btn:hover { background: rgba(255,255,255,0.07); color: #f0eeff; }
        .tor-tab-btn.active {
          background: rgba(160,123,255,0.12);
          border-color: var(--tab-accent, rgba(160,123,255,0.4));
          color: var(--tab-accent, #a07bff);
        }

        /* Section accordion */
        .tor-section-list { display: flex; flex-direction: column; gap: 10px; }

        .tor-accordion {
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 14px;
          overflow: hidden;
          transition: border-color 0.2s;
        }
        .tor-accordion:hover { border-color: rgba(255,255,255,0.13); }

        .tor-accordion-header {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 14px 18px;
          background: rgba(255,255,255,0.04);
          border: none;
          cursor: pointer;
          gap: 12px;
          transition: background 0.2s;
        }
        .tor-accordion-header:hover { background: rgba(255,255,255,0.07); }
        .tor-accordion-header.open { background: rgba(255,255,255,0.06); border-bottom: 1px solid rgba(255,255,255,0.07); }

        .tor-accordion-arrow {
          font-size: 10px;
          color: rgba(240,238,255,0.35);
          transition: transform 0.3s;
          flex-shrink: 0;
        }
        .tor-accordion-header.open .tor-accordion-arrow { transform: rotate(180deg); }

        .tor-accordion-body {
          overflow: hidden;
          max-height: 0;
          transition: max-height 0.4s ease;
          background: rgba(0,0,0,0.2);
        }
        .tor-accordion-body.open { max-height: 2000px; }

        .tor-accordion-inner {
          padding: 16px 18px;
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        /* Config row */
        .tor-config-row {
          display: grid;
          grid-template-columns: 1fr auto;
          align-items: center;
          gap: 16px;
          padding: 10px 0;
          border-bottom: 1px solid rgba(255,255,255,0.05);
        }
        .tor-config-row:last-child { border-bottom: none; }
        .tor-config-label {
          font-size: 14px;
          font-weight: 700;
          color: #f0eeff;
          margin-bottom: 2px;
        }
        .tor-config-key {
          font-family: 'Space Mono', monospace;
          font-size: 10px;
          color: rgba(240,238,255,0.3);
          letter-spacing: 0.04em;
        }

        /* Input styles */
        .tor-input {
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.12);
          border-radius: 8px;
          padding: 7px 10px;
          color: #f0eeff;
          font-family: 'Space Mono', monospace;
          font-size: 12px;
          min-width: 80px;
          text-align: right;
          transition: border-color 0.2s, background 0.2s;
          outline: none;
        }
        .tor-input:focus {
          border-color: rgba(160,123,255,0.5);
          background: rgba(160,123,255,0.08);
        }
        select.tor-input { text-align: left; cursor: pointer; }

        /* Installation panel */
        .tor-panel {
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 20px;
          padding: 28px 32px;
          transition: border-color 0.3s;
        }
        .tor-panel:hover { border-color: rgba(160,123,255,0.25); }
        .tor-panel-header {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 24px;
        }
        .tor-panel-icon {
          width: 38px; height: 38px;
          border-radius: 10px;
          background: rgba(78,184,255,0.12);
          display: flex; align-items: center; justify-content: center;
          color: #4eb8ff;
          font-size: 17px;
          flex-shrink: 0;
        }
        .tor-panel-title {
          font-size: 22px;
          font-weight: 800;
          letter-spacing: -0.01em;
        }

        /* Install steps */
        .tor-install-platform {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 14px;
          font-weight: 700;
          color: #4eb8ff;
          margin-bottom: 12px;
          font-family: 'Space Mono', monospace;
          letter-spacing: 0.06em;
          text-transform: uppercase;
        }
        .tor-install-steps { display: flex; flex-direction: column; gap: 2px; margin-bottom: 24px; }
        .tor-install-step {
          display: flex;
          align-items: flex-start;
          gap: 14px;
          padding: 12px 0;
          border-bottom: 1px solid rgba(255,255,255,0.05);
          font-size: 13px;
          color: rgba(240,238,255,0.7);
          line-height: 1.6;
          font-family: 'Space Mono', monospace;
        }
        .tor-install-step:last-child { border-bottom: none; }
        .tor-step-num {
          width: 22px; height: 22px;
          border-radius: 50%;
          background: rgba(160,123,255,0.15);
          border: 1px solid rgba(160,123,255,0.3);
          display: flex; align-items: center; justify-content: center;
          font-size: 10px;
          font-weight: 700;
          color: #a07bff;
          flex-shrink: 0;
          margin-top: 1px;
        }
        .tor-code {
          display: inline;
          font-family: 'Space Mono', monospace;
          font-size: 11px;
          color: #a07bff;
          background: rgba(160,123,255,0.1);
          border: 1px solid rgba(160,123,255,0.2);
          padding: 1px 6px;
          border-radius: 4px;
        }
        .tor-link { color: #4eb8ff; text-decoration: underline; }
        .tor-link:hover { color: #7dd3fc; }

        /* Export button */
        .tor-export-row {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 16px;
          padding: 24px 0 0;
        }
        .tor-export-btn {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 13px 26px;
          border-radius: 12px;
          font-family: 'Syne', sans-serif;
          font-weight: 700;
          font-size: 15px;
          color: #fff;
          background: linear-gradient(135deg, #7c4dff, #e040fb, #ff6e40);
          background-size: 200% 200%;
          animation: torGrad 4s ease infinite;
          border: none;
          cursor: pointer;
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .tor-export-btn:hover {
          transform: scale(1.03);
          box-shadow: 0 0 28px rgba(160,123,255,0.4);
        }
        @keyframes torGrad {
          0%   { background-position: 0% 50%; }
          50%  { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .tor-export-hint {
          font-family: 'Space Mono', monospace;
          font-size: 12px;
          color: rgba(240,238,255,0.3);
          line-height: 1.6;
          max-width: 400px;
        }

        /* Section divider */
        .tor-section-heading {
          display: flex; align-items: center; gap: 14px; margin-bottom: 16px;
        }
        .tor-section-line { flex: 1; height: 1px; background: rgba(255,255,255,0.07); }
        .tor-section-title {
          font-family: 'Space Mono', monospace;
          font-size: 11px;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: rgba(240,238,255,0.35);
        }

        @media (max-width: 600px) {
          .tor-options-main { padding: 88px 14px 48px; gap: 28px; }
          .tor-panel { padding: 20px 16px; }
          .tor-config-row { grid-template-columns: 1fr; gap: 8px; }
          .tor-input { width: 100%; text-align: left; }
        }
      `}</style>

      <div className="tor-options-page">
        <div className="tor-nb1" /><div className="tor-nb2" />
        <Navbar />

        <main className="tor-options-main">

          {/* Title */}
          <div className="tor-page-title">
            <div className="tor-page-eyebrow">TOR-W : L</div>
            <h1 className="tor-page-h1">Config Builder</h1>
			<HiddenComputer id="options" />
          </div>

          {/* Tab bar */}
          <div className="tor-tab-bar">
            {tabsMeta.map(tab => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  className={`tor-tab-btn${activeTab === tab.id ? " active" : ""}`}
                  style={{ "--tab-accent": tab.accent }}
                  onClick={() => setActiveTab(tab.id)}
                >
                  <Icon style={{ fontSize: 13 }} />
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Section accordions */}
          <div className="tor-section-list">
            {getSectionsForTab(activeTab).map(sectionKey => {
              const isOpen = !collapsedSections[sectionKey];
              return (
                <div key={sectionKey} className="tor-accordion">
                  <button
                    className={`tor-accordion-header${isOpen ? " open" : ""}`}
                    onClick={() => toggleCollapse(sectionKey)}
                  >
                    <SectionLabel sectionKey={sectionKey} />
                    <span className="tor-accordion-arrow">▼</span>
                  </button>
                  <div className={`tor-accordion-body${isOpen ? " open" : ""}`}>
                    <div className="tor-accordion-inner">
                      {sections[sectionKey].map(item => (
                        <div key={item.id} className="tor-config-row">
                          <div>
                            <div className="tor-config-label">{item.label}</div>
                            <div className="tor-config-key">{item.key}</div>
                          </div>
                          <div>{renderInput(sectionKey, item)}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Roles special block */}
            {activeTab === "Roles" && (
              <div className="tor-accordion">
                <button
                  className={`tor-accordion-header${!collapsedSections["RolesBlock"] ? " open" : ""}`}
                  onClick={() => toggleCollapse("RolesBlock")}
                >
                  <span style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <FaCogs style={{ fontSize: 16, color: "rgba(240,238,255,0.5)" }} />
                    <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 15, color: "#f0eeff" }}>Roles (Num / Chance)</span>
                  </span>
                  <span className="tor-accordion-arrow">▼</span>
                </button>
                <div className={`tor-accordion-body${!collapsedSections["RolesBlock"] ? " open" : ""}`}>
                  <div
                    ref={el => (contentRefs.current["RolesBlock"] = el)}
                    className="tor-accordion-inner"
                  >
                    {sections.Roles.map(item => (
                      <div key={item.id} className="tor-config-row">
                        <div>
                          <div className="tor-config-label">{item.label}</div>
                          <div className="tor-config-key">{item.key}</div>
                        </div>
                        <div>
                          <input
                            type="number" step="1" value={item.value}
                            onChange={e => setSections(prev => {
                              const copy = JSON.parse(JSON.stringify(prev));
                              const idx = copy.Roles.findIndex(i => i.id === item.id);
                              copy.Roles[idx].value = parseInt(e.target.value, 10) || 0;
                              return copy;
                            })}
                            className="tor-input"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Installation */}
          <div className="tor-panel">
            <div className="tor-panel-header">
              <div className="tor-panel-icon"><FaCog /></div>
              <h2 className="tor-panel-title">Preset Config Installation</h2>
            </div>

            <p style={{ fontFamily: "'Space Mono', monospace", fontSize: 13, color: "rgba(240,238,255,0.55)", marginBottom: 24, lineHeight: 1.7 }}>
              Follow these steps to place your custom Preset Config:
            </p>

            {/* PC */}
            <div className="tor-install-platform">
              <FontAwesomeIcon icon={faDesktop} />
              PC
            </div>
            <div className="tor-install-steps">
              {[
                <>Locate <code className="tor-code">\AppData\LocalLow\Innersloth\Among Us\mira_presets</code> in your folder directory.</>,
                <>Look for the mod file for the Preset Config — in this case it is <code className="tor-code">angel.launchpad</code>.</>,
                <>Paste the downloaded Preset Config file into the <code className="tor-code">angel.launchpad</code> folder.</>,
                <>Boot up the game with the mod, navigate to the mod Presets tab, and select your newly added Preset.</>,
              ].map((step, i) => (
                <div key={i} className="tor-install-step">
                  <span className="tor-step-num">{i + 1}</span>
                  <span>{step}</span>
                </div>
              ))}
            </div>

            {/* Mobile */}
            <div className="tor-install-platform">
              <FontAwesomeIcon icon={faMobilePhone} />
              Mobile (Starlight)
            </div>
            <div className="tor-install-steps">
              {[
                <>Download the <a href="https://play.google.com/store/apps/details?id=com.marc.files" target="_blank" rel="noopener noreferrer" className="tor-link">Files App</a> from the Google Play Store.</>,
                <>Go to <code className="tor-code">Android → data → dev.allofus.starlight → files → mira_presets</code>.</>,
                <>Look for the mod file for the Preset Config — in this case it is <code className="tor-code">angel.launchpad</code>.</>,
                <>Paste the downloaded Preset Config file into the <code className="tor-code">angel.launchpad</code> folder.</>,
                <>Launch the mod from Starlight, go to the mod Presets tab, and select your newly added Preset.</>,
              ].map((step, i) => (
                <div key={i} className="tor-install-step">
                  <span className="tor-step-num">{i + 1}</span>
                  <span>{step}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Export */}
          <div className="tor-export-row">
            <button className="tor-export-btn" onClick={exportConfig}>
              <FaDownload style={{ fontSize: 15 }} />
              Export Config
            </button>
            <p className="tor-export-hint">
              Downloads all configured values (including defaults) as <code className="tor-code">TORWModPreset.cfg</code>.
            </p>
          </div>

          <Footer />
        </main>
      </div>
    </>
  );
}
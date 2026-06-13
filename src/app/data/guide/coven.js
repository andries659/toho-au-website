export const coven = {
  slug: "coven",
  name: "Coven",
  color: "#ce93d8",
  roles: [
    {
      slug: "tavernkeeper",
      name: "Tavern Keeper",
      alignment: "Coven Dominion",
      description:
        "Use your role block ability to stop players from using their ability.",
      abilities: ["Block players from using their abilities"],
      settings: [
        { key: "RoleBlockCooldown", label: "Role Block Cooldown (s)", type: "number", default: 20, min: 0, max: 60 },
        { key: "RoleBlockUses", label: "Max Role Block Uses", type: "number", default: 5, min: 0, max: 10 },
        { key: "RoleBlockDuration", label: "Role Block Duration (s)", type: "number", default: 20, min: 0, max: 60 },
      ],
    },
  ],
};

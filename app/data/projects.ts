export interface Project {
  id: string;
  title: string;
  summary: string;
  description: string;
  thumbnail: string;
  video: string;
  tags: string[];
  githubUrl: string;
  storeUrl: string;
  codeSnippets: { title: string; language: string; code: string }[];
  features: string[];
  links: { label: string; url: string }[];
}

export const projects: Project[] = [
  {
    id: "nicktoons-dice-of-destiny",
    title: "Nicktoons & The Dice of Destiny",
    summary: "Professional game released on multiple platforms with GAS and Local Multiplayer.",
    description: "Professional title where I acted as a Gameplay Programmer, developing combat systems for enemies and bosses using Gameplay Ability System (GAS) and C++. I was responsible for balancing the combat gameplay and creating data-driven tools that allowed Game Designers to iterate on combat dynamics independently. Released on Steam, PlayStation 5, Nintendo Switch, and Xbox.",
    thumbnail: import.meta.env.BASE_URL + "images/dice-thumb.jpg",
    video: "https://www.youtube.com/watch?v=v1CZ2Xyrda0",
    tags: ["C++", "GAS", "Multiplayer Local", "Action RPG", "Shipped Title"],
    githubUrl: "",
    storeUrl: "",
    codeSnippets: [],
    features: [
      "Enemy ability system with GAS",
      "Boss encounters with complex mechanics",
      "Data-driven tools for Game Designers",
      "Local co-op Multiplayer",
      "Released on 4 platforms"
    ],
    links: []
  },
  {
    id: "multiplayer-gas-showcase",
    title: "Multiplayer GAS Showcase",
    summary: "Project demonstrating advanced GAS integration with dedicated Multiplayer.",
    description: "Personal project demonstrating the full integration of the Gameplay Ability System with multiplayer networking. Includes ability replication, client-side prediction, synchronized gameplay tags, and replicated attribute sets. Scalable architecture designed to support dozens of concurrent players.",
    thumbnail: import.meta.env.BASE_URL + "images/projeto_02.jpg",
    video: "",
    tags: ["C++", "GAS", "Multiplayer", "Replicated", "AI"],
    githubUrl: "https://github.com/spikeleez/gas-aura-ue5",
    storeUrl: "",
    codeSnippets: [],
    features: [
      "Client-side prediction para abilities",
      "Attribute replication otimizada",
      "Gameplay Tags sincronizados",
      "Modular ability system architecture"
    ],
    links: []
  },
  {
    id: "behavior-tree-ai",
    title: "Advanced AI Behavior Trees",
    summary: "AI system with custom Behavior Trees and GAS integration.",
    description: "Artificial intelligence system developed with custom Behavior Trees, tasks, and decorators integrated into the Gameplay Ability System. Enemies make decisions based on Gameplay Tags and Attribute Set states, creating emergent and responsive behaviors relative to combat context.",
    thumbnail: import.meta.env.BASE_URL + "images/AIBehavior.jpeg",
    video: "",
    tags: ["C++", "Behavior Tree", "AI", "GAS", "EQS"],
    githubUrl: "",
    storeUrl: "",
    codeSnippets: [],
    features: [
      "Custom BT Tasks and Decorators in C++",
      "Integration with Gameplay Ability System",
      "Environment Query System (EQS)",
      "Contextual behavior based on Gameplay Tags"
    ],
    links: []
  },
  {
    id: "the-grid",
    title: "The Grid",
    summary: "A simple game created for educational purposes.",
    description: "Features a simple inventory, weapon, consumable, and interaction system. Created for study and 100% in blueprints.",
    thumbnail: import.meta.env.BASE_URL + "images/projeto_03.png",
    video: "",
    tags: ["Blueprints", "Inventory", "Gameplay Systems"],
    githubUrl: "",
    storeUrl: "",
    codeSnippets: [],
    features: [
      "Custom Inventory System",
      "Custom Interaction System",
      "Consumables System",
      "Custom Weapon System"
    ],
    links: []
  }
];

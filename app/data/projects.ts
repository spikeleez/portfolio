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
    summary: "Jogo profissional lançado em múltiplas plataformas com GAS e Multiplayer Local.",
    description: "Título profissional no qual atuei como Gameplay Programmer, desenvolvendo sistemas de combate para inimigos e bosses utilizando Gameplay Ability System (GAS) e C++. Fui responsável por calibrar a gameplay de combate e criar ferramentas data-driven que permitiram aos Game Designers iterar na dinâmica de combate de forma independente. Lançado na Steam, PlayStation 5, Nintendo Switch e Xbox.",
    thumbnail: import.meta.env.BASE_URL + "images/dice-thumb.jpg",
    video: "https://www.youtube.com/watch?v=v1CZ2Xyrda0",
    tags: ["C++", "GAS", "Multiplayer Local", "Action RPG", "Shipped Title"],
    githubUrl: "",
    storeUrl: "",
    codeSnippets: [],
    features: [
      "Sistema de habilidades de inimigos com GAS",
      "Boss encounters com mecânicas complexas",
      "Ferramentas data-driven para Game Designers",
      "Multiplayer Local co-op",
      "Lançado em 4 plataformas"
    ],
    links: []
  },
  {
    id: "multiplayer-gas-showcase",
    title: "Multiplayer GAS Showcase",
    summary: "Projeto demonstrando integração avançada de GAS com Multiplayer dedicado.",
    description: "Projeto pessoal demonstrando a integração completa do Gameplay Ability System com networking multiplayer. Inclui replicação de abilities, prediction client-side, gameplay tags sincronizados e attribute sets replicados. Arquitetura escalável projetada para suportar dezenas de jogadores simultâneos.",
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
    summary: "Sistema de IA com Behavior Trees customizadas e integração com GAS.",
    description: "Sistema de inteligência artificial desenvolvido com Behavior Trees customizadas, tasks e decorators próprios integrados ao Gameplay Ability System. Os inimigos tomam decisões baseadas em Gameplay Tags e estados do Attribute Set, criando comportamentos emergentes e responsivos ao contexto do combate.",
    thumbnail: import.meta.env.BASE_URL + "images/AIBehavior.jpeg",
    video: "",
    tags: ["C++", "Behavior Tree", "AI", "GAS", "EQS"],
    githubUrl: "",
    storeUrl: "",
    codeSnippets: [],
    features: [
      "Custom BT Tasks e Decorators em C++",
      "Integração com Gameplay Ability System",
      "Environment Query System (EQS)",
      "Comportamento contextual baseado em Gameplay Tags"
    ],
    links: []
  },
  {
    id: "the-grid",
    title: "The Grid",
    summary: "Jogo simples feito para estudo.",
    description: "Possui um inventário simples e sistemas de armas, consumíveis e interação. Feito para estudos e 100% em blueprints.",
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

export interface FabProduct {
  id: string;
  title: string;
  summary: string;
  documentation: string;
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

export const fabProducts: FabProduct[] = [
  {
    id: "gameplay-common-ui",
    title: "Gameplay Common UI",
    summary: "Modular & Cross-Platform UI Framework",
    documentation: "https://spikes-organization.gitbook.io/gameplay-common-ui",
    description: "A plug-and-play toolkit for creating interactive widgets for your games.",
    thumbnail: import.meta.env.BASE_URL + "images/gameplay-common-ui.jpg",
    video: "",
    tags: ["Cross-Platform", "User Interface", "Blueprints", "C++"],
    githubUrl: "",
    storeUrl: "https://www.fab.com/pt-br/listings/57409a78-7021-4d09-8b92-9d0fae94e4a5",
    codeSnippets: [],
    features: [
      "Written in C++",
      "Simple and Modular Async Blueprint Tasks",
      "Flexible UI integration"
    ],
    links: []
  }
];

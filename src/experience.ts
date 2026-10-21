import type { ExperienciaApi } from "./lib/api";

export type ArtItem =
  | { img: string; x: number; y: number; w: number; h: number; iw?: number; ih?: number; rot?: number }
  | { word: string; cx: number; cy: number; w: number; h: number };

export interface Diamond {
  src: string;
  x: number;
  y: number;
  /** Lado de la caja envolvente del rombo rotado -45°. */
  size: number;
}

export interface Experience {
  api: ExperienciaApi;
  nombre: string;
  /** Qué sigue tras el ID: terminar o pasar al paso propio de la experiencia (`Extra`). */
  siguiente: "fin" | "extra";
  diamonds: Diamond[];
  /** Coordenadas del escenario 1920×1080. Las imágenes se centran en su caja y se rotan `rot` grados. */
  art: ArtItem[];
}

export const experience: Experience = {
  api: "laser",
  nombre: "Láser Grafiti",
  siguiente: "extra",
  diamonds: [
    { src: "diamond-e", x: 1083.8, y: 53.5, size: 790.2 },
    { src: "diamond-e", x: 3, y: 53.5, size: 790.2 },
  ],
  art: [
    { img: "robot", x: 1287, y: 266, w: 348.3, h: 395.4, iw: 272.6, ih: 338.1, rot: 14.45 },
    { word: "Grafiti", cx: 1025.9, cy: 571.1, w: 809.7, h: 263.3 },
    { img: "laser", x: 397, y: 280, w: 180.7, h: 381, iw: 368.2, ih: 143.8, rot: 95.88 },
    { word: "Láser", cx: 803, cy: 398, w: 780, h: 264 },
    { img: "laser", x: 283, y: 309, w: 289, h: 394.2, iw: 368.2, ih: 143.8, rot: 64.34 },
  ],
};

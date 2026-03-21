export type Phase = {
  name: string;
  sky: string;
  band: string;
  horizon: string;
  horizonOp: number;
  sun: string;
  sunBorder: string;
  sunShadow: string;
  sunOp: number;
  sunBottom: string;
  rays: string;
  raysOp: number;
  cloud: string;
  cloudBorder: string;
  hill: string;
  flower: string;
  flowerHead: string;
  starOp: number;
  moonBottom: string;
  moonOp: number;
  labelColor: string;
};

export const phases: Phase[] = [
  {
    name: "DAWN",
    sky: "#1c1428", band: "#2a1a1a",
    horizon: "#ff4400", horizonOp: 0.7,
    sun: "#ff3000", sunBorder: "#b02000", sunShadow: "#801000", sunOp: 1, sunBottom: "6px",
    rays: "#ff6020", raysOp: 0.6,
    cloud: "#cc4420", cloudBorder: "#991000",
    hill: "#2a3018",
    flower: "#802820", flowerHead: "#ff5010",
    starOp: 0.9,
    moonBottom: "-60px", moonOp: 0,
    labelColor: "#ff8050",
  },
  {
    name: "SUNRISE",
    sky: "#e06830", band: "#c04818",
    horizon: "#ff8020", horizonOp: 1,
    sun: "#ff7820", sunBorder: "#c05000", sunShadow: "#903800", sunOp: 1, sunBottom: "100px",
    rays: "#ffaa40", raysOp: 1,
    cloud: "#ffaa60", cloudBorder: "#d07020",
    hill: "#507028",
    flower: "#c05838", flowerHead: "#ffaa30",
    starOp: 0,
    moonBottom: "-60px", moonOp: 0,
    labelColor: "#ff9030",
  },
  {
    name: "AFTERNOON",
    sky: "#fce8a0", band: "#d4e890",
    horizon: "#ffe850", horizonOp: 0.5,
    sun: "#fff080", sunBorder: "#e8d020", sunShadow: "#c0a810", sunOp: 1, sunBottom: "260px",
    rays: "#fff8b0", raysOp: 1,
    cloud: "#fff8e0", cloudBorder: "#e0d8a0",
    hill: "#a8c860",
    flower: "#e07850", flowerHead: "#ffe050",
    starOp: 0,
    moonBottom: "-60px", moonOp: 0,
    labelColor: "#a07010",
  },
  {
    name: "SUNSET",
    sky: "#e05820", band: "#c03808",
    horizon: "#ff6810", horizonOp: 1,
    sun: "#ff5010", sunBorder: "#c03000", sunShadow: "#901800", sunOp: 1, sunBottom: "80px",
    rays: "#ff8030", raysOp: 0.8,
    cloud: "#ff7030", cloudBorder: "#c04010",
    hill: "#486020",
    flower: "#c04828", flowerHead: "#ff7020",
    starOp: 0,
    moonBottom: "-60px", moonOp: 0,
    labelColor: "#ff6820",
  },
  {
    name: "NIGHT",
    sky: "#0c0c20", band: "#080c18",
    horizon: "#200818", horizonOp: 0.3,
    sun: "#ff2000", sunBorder: "#800000", sunShadow: "#400000", sunOp: 0, sunBottom: "-80px",
    rays: "#ff4000", raysOp: 0,
    cloud: "#181828", cloudBorder: "#101018",
    hill: "#182010",
    flower: "#601820", flowerHead: "#301010",
    starOp: 1,
    moonBottom: "180px", moonOp: 1,
    labelColor: "#8080c0",
  },
];

export function getPhase(score: number): Phase {
  const index = Math.floor(score / 250) % phases.length;
  return phases[index];
}
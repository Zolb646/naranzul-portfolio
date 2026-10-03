export type ImageAsset = {
  src: string;
  width: number;
  height: number;
  alt: string;
  credit: string;
  focalPoint?: string;
  mobileFocalPoint?: string;
};
export type Scene = "threshold" | "passage" | "light" | "detail";
export type StoryBlock =
  | { kind: "image"; scene: Scene; label: string; asset?: ImageAsset }
  | {
      kind: "pair";
      scene: Scene;
      label: string;
      detail: string;
      asset?: ImageAsset;
      contextAsset?: ImageAsset;
    }
  | { kind: "note"; title: string; text: string };
export type Project = {
  slug: string;
  title: string;
  number: string;
  theme: string;
  scene: Scene;
  placeholder: boolean;
  entry?: ImageAsset;
  metadata?: { year?: string; location?: string; area?: string; role?: string };
  story: StoryBlock[];
  next: string;
};
export const projects: Project[] = [
  {
    slug: "a-study-in-thresholds",
    title: "A study in thresholds",
    number: "01",
    theme: "Between one space and another",
    scene: "threshold",
    placeholder: true,
    next: "the-quiet-passage",
    story: [
      {
        kind: "image",
        scene: "threshold",
        label: "Establishing photograph required",
      },
      {
        kind: "note",
        title: "The opening",
        text: "[Designer’s note required: describe the original spatial constraint and the decision that changed the relationship between these rooms.]",
      },
      {
        kind: "pair",
        scene: "detail",
        label: "Material junction photograph required",
        detail: "Context photograph required",
      },
      {
        kind: "image",
        scene: "passage",
        label: "Room-to-room photograph required",
      },
      {
        kind: "note",
        title: "Light, at the edge",
        text: "[Designer’s note required: describe how daylight meets the surface, using the actual material and orientation.]",
      },
      {
        kind: "image",
        scene: "light",
        label: "Final spatial photograph required",
      },
    ],
  },
  {
    slug: "the-quiet-passage",
    title: "The quiet passage",
    number: "02",
    theme: "A pause between rooms",
    scene: "passage",
    placeholder: true,
    next: "where-light-settles",
    story: [
      {
        kind: "image",
        scene: "passage",
        label: "Establishing photograph required",
      },
      {
        kind: "note",
        title: "Moving through",
        text: "[Designer’s note required: explain the circulation and the relationship between open and enclosed spaces.]",
      },
      {
        kind: "pair",
        scene: "detail",
        label: "Construction detail photograph required",
        detail: "Circulation photograph required",
      },
      {
        kind: "image",
        scene: "threshold",
        label: "View through adjoining rooms required",
      },
    ],
  },
  {
    slug: "where-light-settles",
    title: "Where light settles",
    number: "03",
    theme: "Surface, shadow, stillness",
    scene: "light",
    placeholder: true,
    next: "a-study-in-thresholds",
    story: [
      {
        kind: "image",
        scene: "light",
        label: "Establishing photograph required",
      },
      {
        kind: "note",
        title: "A surface for light",
        text: "[Designer’s note required: explain the actual daylight conditions and the choice of surface finish.]",
      },
      {
        kind: "pair",
        scene: "detail",
        label: "Surface detail photograph required",
        detail: "Daylight photograph required",
      },
      {
        kind: "image",
        scene: "passage",
        label: "Final spatial photograph required",
      },
    ],
  },
];
export const practice = {
  name: "[Designer name]",
  email: null as string | null,
};
export const getProject = (slug: string) =>
  projects.find((project) => project.slug === slug);

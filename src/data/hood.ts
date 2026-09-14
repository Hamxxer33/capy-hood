export type Member = {
  id: string;
  name: string;
  role: string;
  src: string;
  quote: string;
  traits: { label: string; value: string }[];
};

export const HOOD: Member[] = [
  {
    id: "don",
    name: "The Don",
    role: "Founding vibe",
    src: "/hood/don.jpg",
    quote: "I don't chase. I sit.",
    traits: [
      { label: "Head", value: "Top hat" },
      { label: "Eyes", value: "Unbothered" },
      { label: "Mouth", value: "Cigarette" },
      { label: "Fit", value: "Mustard tee" },
    ],
  },
  {
    id: "professor",
    name: "The Professor",
    role: "Quiet brains",
    src: "/hood/professor.jpg",
    quote: "Read the room. Then leave it.",
    traits: [
      { label: "Head", value: "Orange visor" },
      { label: "Eyes", value: "Wire rims" },
      { label: "Mouth", value: "Buckteeth" },
      { label: "Fit", value: "Maroon plaid" },
    ],
  },
  {
    id: "storm",
    name: "Storm",
    role: "Weather report",
    src: "/hood/storm.jpg",
    quote: "Let it pour. I'm already wet.",
    traits: [
      { label: "Head", value: "Straw visor" },
      { label: "Eyes", value: "Laser cyan" },
      { label: "Mouth", value: "Easy grin" },
      { label: "Sky", value: "Rain" },
    ],
  },
  {
    id: "projection",
    name: "Projection",
    role: "Double vision",
    src: "/hood/projection.jpg",
    quote: "Two colors. One mood.",
    traits: [
      { label: "Head", value: "Green visor" },
      { label: "Eyes", value: "Red / cyan" },
      { label: "Mouth", value: "Grass blade" },
      { label: "Fit", value: "Safety vest" },
    ],
  },
  {
    id: "captain",
    name: "Captain",
    role: "One good eye",
    src: "/hood/captain.jpg",
    quote: "Lost the eye. Kept the vibe.",
    traits: [
      { label: "Head", value: "Lime visor" },
      { label: "Eyes", value: "Patch" },
      { label: "Mouth", value: "Soft smile" },
      { label: "Fit", value: "Forest plaid" },
    ],
  },
  {
    id: "bloom",
    name: "Bloom",
    role: "Pretty, still mean",
    src: "/hood/bloom.jpg",
    quote: "Pretty and mean is still pretty.",
    traits: [
      { label: "Head", value: "Knit beanie" },
      { label: "Eyes", value: "Unimpressed" },
      { label: "Mouth", value: "Goatee + flower" },
      { label: "Fit", value: "Navy sash" },
    ],
  },
  {
    id: "exhale",
    name: "Exhale",
    role: "Do not reply",
    src: "/hood/exhale.jpg",
    quote: "In. Out. Don't reply.",
    traits: [
      { label: "Head", value: "Maroon wrap" },
      { label: "Eyes", value: "Wide open" },
      { label: "Mouth", value: "Grin + smoke" },
      { label: "Fit", value: "White tee" },
    ],
  },
  {
    id: "sensei",
    name: "Sensei",
    role: "The practice",
    src: "/hood/sensei.jpg",
    quote: "The hood is a practice.",
    traits: [
      { label: "Head", value: "Knotted cap" },
      { label: "Eyes", value: "Round frames" },
      { label: "Mouth", value: "Knowing" },
      { label: "Fit", value: "Indigo sash" },
    ],
  },
  {
    id: "quiet",
    name: "Quiet",
    role: "Masked royalty",
    src: "/hood/quiet.jpg",
    quote: "You don't need to see it to know.",
    traits: [
      { label: "Head", value: "Spiked crown" },
      { label: "Eyes", value: "Soft" },
      { label: "Mouth", value: "Masked" },
      { label: "Fit", value: "White tee" },
    ],
  },
  {
    id: "afterhours",
    name: "After Hours",
    role: "The meadow never closed",
    src: "/hood/afterhours.jpg",
    quote: "The meadow never closed.",
    traits: [
      { label: "Head", value: "Green beanie" },
      { label: "Eyes", value: "Heavy lids" },
      { label: "Mouth", value: "Cigar" },
      { label: "Fit", value: "Maroon plaid" },
    ],
  },
  {
    id: "monday",
    name: "Monday",
    role: "Even capys have one",
    src: "/hood/monday.jpg",
    quote: "Even capys have a Monday.",
    traits: [
      { label: "Head", value: "Knit brim" },
      { label: "Eyes", value: "Sorry" },
      { label: "Mouth", value: "Frown" },
      { label: "Fit", value: "Mustard tee" },
    ],
  },
];

export const SUPPLY = 3000;
export const GDT_CAP = 300;
export const WL_CAP = 900;

export const STATS = [
  { label: "Supply", value: "3,000" },
  { label: "GDT", value: "300" },
  { label: "WL", value: "900" },
  { label: "Tokens", value: "0" },
] as const;

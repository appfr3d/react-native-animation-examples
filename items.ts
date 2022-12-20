import { useState } from "react";
export const items = [
  {
    id: "0",
    title: "📱 A new iPhone",
  },
  {
    id: "1",
    title: "🎮 PlayStation 5",
  },
  {
    id: "2",
    title: "🤖 A cool robot",
  },
  {
    id: "3",
    title: "👟 New shoes",
  },
  {
    id: "4",
    title: "❄️ Snowracer",
  },
];

export type ItemType = typeof items[number];

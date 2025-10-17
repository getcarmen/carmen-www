import { defineCollection, z } from "astro:content";

const cardsCollection = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    icon: z.string(),
  }),
});

export const collections = {
  cards: cardsCollection,
};

export interface Groups {
  id: number;
  title_ru: string;
  title_ua?: string | undefined;
  title_pl?: string | undefined;
  title_en?: string | undefined;
  description_ru?: string | undefined;
  description_ua?: string | undefined;
  description_pl?: string | undefined;
  description_en?: string | undefined;
  price_range?: string | undefined;
  posts_id: number[];
  created_at: Date;
  category: "private" | "business";
}

export type Categories = "private" | "business";

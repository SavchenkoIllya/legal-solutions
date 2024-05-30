interface Post {
  id: number;
  author_id: number;
  title_ru: string;
  title_en: string;
  title_pl: string;
  title_ua: string;
  description_ru: string;
  description_en: string;
  description_pl: string;
  description_ua: string;
  created_at: Date;
  updated_at: Date;
  is_published: boolean;
}

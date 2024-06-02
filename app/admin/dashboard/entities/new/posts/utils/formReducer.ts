const DEFAULT_CONTENT = "";

export enum FormActionsTypes {
  "SET_DESCRIPTION_RU",
  "SET_DESCRIPTION_UA",
  "SET_DESCRIPTION_EN",
  "SET_DESCRIPTION_PL",
  "SET_IS_PUBLISHED",
  "SET_SEO_RU",
  "SET_SEO_UA",
  "SET_SEO_EN",
  "SET_SEO_PL",
}

interface FormAction {
  type: FormActionsTypes;
  payload?: string;
}

interface IFormState {
  description_ru: string | undefined;
  description_ua: string | undefined;
  description_en: string | undefined;
  description_pl: string | undefined;
  is_published: boolean;
  seo_ru: string | undefined;
  seo_ua: string | undefined;
  seo_en: string | undefined;
  seo_pl: string | undefined;
}

export const initialFormState: IFormState = {
  description_ru: DEFAULT_CONTENT,
  description_ua: DEFAULT_CONTENT,
  description_en: DEFAULT_CONTENT,
  description_pl: DEFAULT_CONTENT,
  is_published: true,
  seo_ru: DEFAULT_CONTENT,
  seo_ua: DEFAULT_CONTENT,
  seo_en: DEFAULT_CONTENT,
  seo_pl: DEFAULT_CONTENT,
};

export function formReducer(state: IFormState, action: FormAction): IFormState {
  const { type, payload } = action;
  switch (type) {
    case FormActionsTypes.SET_DESCRIPTION_RU: {
      return {
        ...state,
        description_ru: payload,
      };
    }
    case FormActionsTypes.SET_DESCRIPTION_UA: {
      return {
        ...state,
        description_ua: payload,
      };
    }
    case FormActionsTypes.SET_DESCRIPTION_EN: {
      return {
        ...state,
        description_en: payload,
      };
    }
    case FormActionsTypes.SET_DESCRIPTION_PL: {
      return {
        ...state,
        description_pl: payload,
      };
    }
    case FormActionsTypes.SET_IS_PUBLISHED: {
      return {
        ...state,
        is_published: !state.is_published,
      };
    }
    case FormActionsTypes.SET_SEO_RU: {
      return { ...state, seo_ru: payload };
    }
    case FormActionsTypes.SET_SEO_UA: {
      return { ...state, seo_ua: payload };
    }
    case FormActionsTypes.SET_SEO_EN: {
      return { ...state, seo_en: payload };
    }
    case FormActionsTypes.SET_SEO_PL: {
      return { ...state, seo_pl: payload };
    }
    default:
      return state;
  }
}

export enum ELanguage {
    EN = "en",
    FI = "fi",
    DE = "de",
    SV = "sv",
}

export const SUPPORTED_LANGUAGES = [
    ELanguage.EN,
    ELanguage.FI,
    ELanguage.DE,
    ELanguage.SV,
] as const;

export const isSupportedLanguage = (language: string | null | undefined): language is ELanguage => {
    return SUPPORTED_LANGUAGES.includes(language as ELanguage);
};

export interface TranslatedWord {
    data: {
        translations: Translation[]
    };
}

interface Translation {
    translatedText: string;
}
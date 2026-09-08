// src/services/TranslationService.ts

interface TranslationResponse {
  responseData: {
    translatedText: string;
    match?: number;
  };
  quotaFinished?: boolean;
  responseStatus?: number;
  responseDetails?: string;
}

export class TranslationService {
  private static instance: TranslationService;
  private cache: Map<string, string> = new Map();
  private currentLanguage: string = 'English';

  private constructor() {}

  public static getInstance(): TranslationService {
    if (!TranslationService.instance) {
      TranslationService.instance = new TranslationService();
    }
    return TranslationService.instance;
  }

  // Add this method
  setLanguage(lang: string): void {
    this.currentLanguage = lang;
    this.clearCache(); // Clear cache when language changes
  }

  getLanguage(): string {
    return this.currentLanguage;
  }

  async translate(text: string, targetLang: string): Promise<string> {
    // Return original text if English
    if (targetLang === 'English') return text;

    // Determine source and target language codes
    const sourceLang = 'en';
    let targetCode = 'ms'; // Default to Malay

    if (targetLang === 'Chinese') {
      targetCode = 'zh';
    } else if (targetLang === 'Malay' || targetLang === 'Bahasa Malaysia') {
      targetCode = 'ms';
    } else {
      return text;
    }

    // Check cache
    const cacheKey = `${sourceLang}|${targetCode}|${text}`;
    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey)!;
    }

    try {
      // MyMemory API endpoint
      const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${sourceLang}|${targetCode}`;

      const response = await fetch(url);
      const data: TranslationResponse = await response.json();

      if (data.responseStatus !== 200) {
        throw new Error(data.responseDetails || 'Translation failed');
      }

      const translatedText = data.responseData.translatedText;

      // Cache the result
      this.cache.set(cacheKey, translatedText);

      return translatedText;
    } catch (error) {
      console.error('Translation error:', error);
      return text; // Fallback to original text
    }
  }

  async translateBatch(texts: string[], targetLang: string): Promise<string[]> {
    // Translate multiple texts in parallel
    const promises = texts.map(text => this.translate(text, targetLang));
    return Promise.all(promises);
  }

  clearCache(): void {
    this.cache.clear();
  }
}

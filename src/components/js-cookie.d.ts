declare module 'js-cookie' {
    const Cookies: CookiesStatic;
    export = Cookies;
  
    interface CookiesStatic {
      get(name: string): string | undefined;
      set(name: string, value: string | undefined, options?: CookieAttributes): void;
      remove(name: string, options?: CookieAttributes): void;
      withAttributes(attributes: CookieAttributes): CookiesStatic;
    }
  
    interface CookieAttributes {
      expires?: number | Date;
      path?: string;
      domain?: string;
      secure?: boolean;
    }
  }
  
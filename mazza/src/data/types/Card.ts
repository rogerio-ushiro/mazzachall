export interface Card {
    id: string;
    name: string;
    supertype: string;
    subtypes: string[];
    types: string[];
    images: {
        small: string;
        large: string;
    };
}
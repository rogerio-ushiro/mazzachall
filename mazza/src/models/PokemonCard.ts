interface PokemonCard {
    id: string;
    name: string;
    supertype: string;
    subtypes: string[];
    hp: string;
    types: string[];
    evolvesFrom: string;
    attacks: Attack[];
    weaknesses: Weakness[];
    resistances: Resistance[];
    retreatCost: string[];
    convertedRetreatCost: number;
    set: SetDetails;
    number: string;
    artist: string;
    rarity: string;
    flavorText: string;
    nationalPokedexNumbers: number[];
    legalities: { [key: string]: string };
    images: {
        small: string;
        large: string;
    };
    tcgplayer: TcgPlayer;
    cardmarket: CardMarket;
}
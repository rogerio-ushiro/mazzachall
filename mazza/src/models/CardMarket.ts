import { CardMarketPrices } from "./CardMarketPrices";

export interface CardMarket {
    url: string;
    updatedAt: string;
    prices: CardMarketPrices;
}

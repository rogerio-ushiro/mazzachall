import { TcgPlayerPrices } from "./TcgPlayerPrices";

export interface TcgPlayer {
    url: string;
    updatedAt: string;
    prices: {
        holofoil: TcgPlayerPrices;
        reverseHolofoil: TcgPlayerPrices;
    };
}

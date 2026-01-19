import { DC } from "../constants";

import { Quotes } from "./quotes";

export const Alpha = {
    displayName: "Alpha",
    possessiveName: "Alpha's",
    quotes: Quotes.alpha,
    symbol: "α",
    get isUnlocked() {
        return ImaginaryUpgrade(30).isBought;
    }
};
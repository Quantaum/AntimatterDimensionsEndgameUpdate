import { DC } from "../../constants";

import { Quotes } from "../quotes";

export const ALPHA_STAGES = {
    INFINITY: 1,
    ETERNITY: 2,
    REALITY: 3,
    COMPLETED: 4
};

export const Alpha = {
    displayName: "Alpha",
    possessiveName: "Alpha's",
    quotes: Quotes.alpha,
    symbol: "α",
    get isUnlocked() {
        return ImaginaryUpgrade(30).isBought;
    },
    get celestial() {
        return player.celestials.alpha;
    },
    initializeRun() {
        clearCelestialRuns();
        this.celestial.run = true;
        this.quotes.realityEnter.show();
    },
    completeRun() {
        player.celestials.alpha.completed = true;
        this.quotes.alphaDefeated.show();
    },
    get isCompleted() {
        return player.celestials.alpha.completed;
    },
    get isRunning() {
        return player.celestials.alpha.run;
    },
    get currentStage() {
        if (!EffarigUnlock.infinity.isUnlocked) {
            return ALPHA_STAGES.INFINITY;
        }
        if (!EffarigUnlock.eternity.isUnlocked) {
            return ALPHA_STAGES.ETERNITY;
        }
        if (!EffarigUnlock.reality.isUnlocked) {
            return ALPHA_STAGES.REALITY;
        }
        return ALPHA_STAGES.COMPLETED;
    },
    get currentStageName() {
        switch (this.currentStage) {
            case ALPHA_STAGES.INFINITY:
                return "Infinity";
            case ALPHA_STAGES.ETERNITY:
                return "Eternity";
            case ALPHA_STAGES.REALITY:
            default:
                return "Reality";
        }
    },
}

EventHub.logic.on(GAME_EVENT.TAB_CHANGED, () => {
    if (Tab.celestials.alpha.isOpen) Alpha.quotes.initial.show();
});
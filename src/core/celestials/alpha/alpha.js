import { DC } from "../../constants";

import { Quotes } from "../quotes";

import { ALPHA_STAGES } from "./alpha-stages";

import { ALPHA_MILESTONES } from "./alpha-milestones";

const disabledMechanicUnlocks = {
    achievements: () => ({}),
    IPMults: () => ({}),
    EPMults: () => ({}),
    galaxies: () => ({}),
    InfinitiedMults: () => ({}),
    infinitiedGen: () => ({}),
    eternityGain: () => ({}),
    eternityMults: () => ({}),
    studies: () => ({}),
    EPgen: () => ({}),
    autoec: () => ({}),
    replicantiIntervalMult: () => ({}),
    tpMults: () => ({}),
    glyphs: () => !PelleRifts.vacuum.milestones[0].canBeApplied,
    V: () => ({}),
    singularity: () => ({}),
    alchemy: () => ({}),
    achievementMult: () => ({}),
    blackhole: () => ({}),
    effarig: () => ({}),
    imaginaryUpgrades: () => ({}),
    glyphsac: () => ({}),
    antimatterDimAutobuyer1: false,
    antimatterDimAutobuyer2: false,
    antimatterDimAutobuyer3: false,
    antimatterDimAutobuyer4: false,
    antimatterDimAutobuyer5: false,
    antimatterDimAutobuyer6: false,
    antimatterDimAutobuyer7: false,
    antimatterDimAutobuyer8: false,
    tickspeedAutobuyer: false,
    dimBoostAutobuyer: false,
    galaxyAutobuyer: false,
    timeTheoremAutobuyer: () => ({}),
    rupg10: () => ({}),
    dtMults: () => ({}),
    chargedInfinityUpgrades: () => ({}),
    alteration: () => ({}),
    timeTheorems: () => ({})
};

export const Alpha = {
    displayName: "Alpha",
    possessiveName: "Alpha's",
    quotes: Quotes.alpha,
    symbol: "α",
    resetAlpha: true,
    get isUnlocked() {
        return ImaginaryUpgrade(30).isBought;
    },
    get celestial() {
        return player.celestials.alpha;
    },
    initializeRun() {
        player.celestials.alpha.resetAlpha = false;
        player.celestials.alpha.run = true;
        clearCelestialRuns();
        player.reality.automator.state.repeat = false;
        player.reality.automator.state.forceRestart = false;
        if (BlackHoles.arePaused) BlackHoles.togglePause();
        respecTimeStudies(true);
        Currency.infinityPoints.reset();
        Currency.eternityPoints.reset();
        Currency.antimatter.reset();
        player.IPMultPurchases = 0;
        Autobuyer.bigCrunch.mode = AUTO_CRUNCH_MODE.AMOUNT;
        disChargeAll();
        clearCelestialRuns();
        Alpha.quotes.realityEnter.show();
        CelestialDimensions.resetAmount();
        player.records.thisEndgame.peakGameSpeed = DC.D1;
        player.celestials.enslaved.stored = DC.D0;
        player.celestials.alpha.resetAlpha = true;
        player.infinities = DC.D0;
        player.eternities = DC.D0;
        player.infinityUpgrades.clear();
        player.infinityRebuyables = [0, 0, 0];
        player.eternityUpgrades.clear();
        player.eternityRebuyables = [0, 0, 0, 0, 0];
        player.dimensionBoosts = 0;
        player.galaxies = 0;
        player.break = false;
        Replicanti.reset();
    },
    completeRun() {
        player.celestials.alpha.completed = true;
        this.quotes.alphaDefeated.show();
        player.celestials.alpha.run = false;
    },
    get isCompleted() {
        return player.celestials.alpha.completed;
    },
    get currentStage() {
        const layer = Number(player.celestials.alpha.alphaLayer || 0);
        if (layer <= 0) return ALPHA_STAGES["4TH_DIMBOOST"];
        if (layer >= ALPHA_STAGES.COMPLETED) return ALPHA_STAGES.COMPLETED;
        return layer;
    },
    get isRunning() {
        return player.celestials.alpha.run;
    },
    get currentStageName() {
        const names = [
            null,
            "Fourth Dimboost",
            "Fifth Dimboost",
            "Galaxy",
            "Infinity",
            "C12",
            "Break Infinity",
            "5e11 IP",
            "All BIUs",
            "All ICs",
            "Replicanti",
            "8th ID",
            "Eternity",
            "TS61",
            "4th TD",
            "3rd EU",
            "115 TT",
            "First EC",
            "First EC Full",
            "TS181",
            "EC10",
            "TS192",
            "Unlock EC11",
            "Complete EC11",
            "Dilation",
            "Eternity while Dilated",
            "Generate TT",
            "8th TD",
            "Reality",
            "Completed"
        ];
        return names[this.currentStage] || "Unknown";
    },

    isDisabled(mechanic) {
        if (!this.isRunning) return false;

        if (!mechanic) return true;
        if (!disabledMechanicUnlocks[mechanic]) {
            // eslint-disable-next-line
            console.error(`Mechanic ${mechanic} isn't present in the disabledMechanicUnlocks!`);
            return true;
        }

        const upgrade = disabledMechanicUnlocks[mechanic]();

        if (typeof upgrade === "boolean") {
            return upgrade;
        }

        return Boolean(!upgrade.canBeApplied);
    },
    get disabledAchievements() {
        let remainingAchs = [37, 54, 55, 65, 74, 76, 78, 81, 85, 87, 91, 92, 93, 95, 102, 103, 104, 111, 113, 116, 117, 118, 125, 131, 132, 133, 134, 137, 141, 142, 143, 156, 164, 178, 183, 187, 193, 194];
        return remainingAchs;
    },
    get disabledRUPGs() {
        let remainingRUs = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 19, 20, 22, 23, 24];
        return remainingRUs;
    },

    get uselessPerks() {
        let remainingPerks = [0, 10, 12, 13, 14, 15, 16, 17, 30, 31, 40, 41, 42, 43, 44, 45, 46, 51, 52, 53, 54, 55, 56, 57, 60, 61, 62, 70, 71, 72, 73, 80, 81, 82, 83, 100, 101, 102, 103, 104, 105, 106, 107, 201, 202, 203, 204];
        return remainingPerks;
    },
    get cel() {
        return player.celestials.alpha;
    },
}

EventHub.logic.on(GAME_EVENT.TAB_CHANGED, () => {
    if (Tab.celestials.alpha.isOpen) Alpha.quotes.initial.show();
});
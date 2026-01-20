import { DC } from "../../constants";

import { Quotes } from "../quotes";

export const ALPHA_STAGES = {
    FOURTH_DIMBOOST: 1,
    FIFTH_DIMBOOST: 2,
    GALAXY: 3,
    INFINITY: 4,
    C12: 5,
    BREAK_INFINITY: 6,
    FIVE_ELEVEN_IP: 7,
    ALL_BIUS: 8,
    ALL_ICS: 9,
    REPLICANTI: 10,
    EIGHTH_ID: 11,
    ETERNITY: 12,
    TS61: 13,
    FOURTH_TD: 14,
    THIRD_EU: 15,
    ONEHUNDREDFIFTEEN_TT: 16,
    FIRST_EC: 17,
    FIRST_EC_FULL: 18,
    TS181: 19,
    EC10: 20,
    TS192: 21,
    UNLOCK_EC11: 22,
    COMPLETE_EC11: 23,
    DILATION: 24,
    ETERNITY_WHILE_DILATED: 25,
    GENERATE_TT: 26,
    EIGHTH_TD: 27,
    REALITY: 28,
    COMPLETED: 29
};

// Map stage -> quote key
const ALPHA_STAGE_QUOTE = {
    1: 'dimBoost4',
    2: 'dimBoost5',
    3: 'galaxyUnlock',
    4: 'infinity',
    5: 'c12Complete',
    6: 'breakInfinity',
    7: 'ipUpgrade5e11',
    8: 'allBreakUpgrades',
    9: 'infinityChallengesComplete',
    10: 'replicantiUnlock',
    11: 'infinity8Unlock',
    12: 'eternity',
    13: 'ts61Purchase',
    14: 'timeDimension4',
    15: 'eternityUpgrade3',
    16: 'theorems115',
    17: 'eternityChallenge1',
    18: 'eternityChallenge5',
    19: 'ts181Purchase',
    20: 'eternityChallenge10',
    21: 'replicantiUncap',
    22: 'eternityChallenge11Unlock',
    23: 'eternityChallenge11Complete',
    24: 'timeDilation',
    25: 'eternityDilated',
    26: 'theoremGeneration',
    27: 'timeDimension8',
    29: 'alphaDefeated'
};

// Per-stage requirement checks. Return true when requirement met and player should advance.
const ALPHA_STAGE_REQUIREMENTS = {
    1: () => player.dimensionBoosts?.gte?.(4),
    2: () => player.dimensionBoosts?.gte?.(5),
    3: () => player.galaxies?.gte?.(1),
    4: () => Currency.infinities?.gt?.(0),
    5: () => typeof EternityChallenge === 'function' && EternityChallenge(12).completions > 0,
    6: () => Boolean(player.break),
    7: () => Currency.infinityPoints?.value?.gte?.(5e11),
    8: () => {
        try { return Object.values(BreakInfinityUpgrade).every(u => u.isBought); } catch (e) { return false; }
    },
    9: () => false, // placeholder: define specific condition for "All ICs"
    10: () => typeof Replicanti !== 'undefined' && Replicanti.isUnlocked,
    11: () => Currency.infinityPower?.value?.gt?.(1),
    12: () => Currency.eternityPoints?.value?.gt?.(0),
    13: () => typeof TimeStudy === 'function' && TimeStudy(61).isBought,
    14: () => (player.timeDimensions && player.timeDimensions[4] && player.timeDimensions[4].amount?.gt?.(0)) || (typeof TimeStudy === 'function' && TimeStudy(4)?.isBought),
    15: () => (typeof EternityUpgrade === 'function' && EternityUpgrade.fromId?.(3)?.isBought) || false,
    16: () => Currency.timeTheorems?.max?.gte?.(115) || Currency.timeTheorems?.value?.gte?.(115),
    17: () => EternityChallenge(1).completions > 0,
    18: () => EternityChallenge(5).completions > 0,
    19: () => typeof TimeStudy === 'function' && TimeStudy(181).isBought,
    20: () => EternityChallenge(10).completions > 0,
    21: () => typeof Replicanti !== 'undefined' && (Replicanti.cap?.gt?.(Decimal.MAX_VALUE) || Replicanti.isUncapped),
    22: () => EternityChallenge(11).completions > 0,
    23: () => EternityChallenge(11).completions > 0 && EternityChallenge(11).isCompleted,
    24: () => player.dilation?.active === true,
    25: () => Currency.eternities?.value?.gt?.(0),
    26: () => Currency.timeTheorems?.value?.gt?.(0),
    27: () => (player.timeDimensions && player.timeDimensions[8] && player.timeDimensions[8].amount?.gt?.(0)),
    28: () => false,
    29: () => Boolean(player.celestials?.alpha?.completed),
};

Alpha.checkStageRequirements = function () {
    try {
        const stage = this.currentStage;
        const check = ALPHA_STAGE_REQUIREMENTS[stage];
        if (typeof check !== 'function') return false;
        if (!check()) return false;
        // show quote if present
        const q = ALPHA_STAGE_QUOTE[stage];
        if (q && this.quotes[q]) this.quotes[q].show();
        this.exitAndAdvanceStage();
        return true;
    } catch (e) {
        // swallow errors to avoid breaking game loop
        console.error(e);
        return false;
    }
};

// Hook into common events that can advance stages
EventHub.logic.on(GAME_EVENT.BIG_CRUNCH_BEFORE, () => { if (Alpha.isRunning) Alpha.checkStageRequirements(); });
EventHub.logic.on(GAME_EVENT.ETERNITY_RESET_BEFORE, () => { if (Alpha.isRunning) Alpha.checkStageRequirements(); });
EventHub.logic.on(GAME_EVENT.REALITY_RESET_BEFORE, () => { if (Alpha.isRunning) Alpha.checkStageRequirements(); });
EventHub.logic.on(GAME_EVENT.GAME_TICK_AFTER, () => { if (Alpha.isRunning) Alpha.checkStageRequirements(); });

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
        player.celestials.alpha.run = true;
        player.celestials.alpha.darkened = true;
        this.quotes.realityEnter.show();
    },
    completeRun() {
        player.celestials.alpha.completed = true;
        this.quotes.alphaDefeated.show();
        player.celestials.alpha.darkened = true;
    },
    get isCompleted() {
        return player.celestials.alpha.completed;
    },
    get isRunning() {
        return player.celestials.alpha.run;
    },
    get currentStage() {
        const layer = Number(player.celestials.alpha.alphaLayer || 0);
        if (layer <= 0) return ALPHA_STAGES["4TH_DIMBOOST"];
        if (layer >= ALPHA_STAGES.COMPLETED) return ALPHA_STAGES.COMPLETED;
        return layer;
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
    // Advance alpha stage by one (clamped). Does not perform a reality reset.
    advanceStage() {
        const next = Math.min(ALPHA_STAGES.COMPLETED, this.currentStage + 1);
        player.celestials.alpha.alphaLayer = next;
        EventHub.dispatch?.(GAME_EVENT.ALPHA_STAGE_ADVANCED, next);
        Modal.message.show(`You advanced to ${this.currentStageName}.`, {}, 2);
        return next;
    },

    // If currently running Alpha, exit the reality (perform a reality reset) and advance the stage.
    // If not running, simply advance the stage.
    exitAndAdvanceStage() {
        const next = Math.min(ALPHA_STAGES.COMPLETED, this.currentStage + 1);
        player.celestials.alpha.alphaLayer = next;
        if (this.isRunning) {
            // This will perform the reality reset and clear the run flag.
            beginProcessReality(getRealityProps(true));
        } else {
            EventHub.dispatch?.(GAME_EVENT.ALPHA_STAGE_ADVANCED, next);
            Modal.message.show(`You advanced to ${this.currentStageName}.`, {}, 2);
        }
        return next;
    },

    // Convenience: check a boolean condition and exit/advance if true.
    checkAndAdvanceIf(condition) {
        if (condition) return this.exitAndAdvanceStage();
        return false;
    },
    isDisabled(mechanic) {
        if (!this.isDarkened) return false;

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
    get isDarkened() {
        return player.celestials.alpha.darkened;
    },
    get disabledAchievements() {
        let remainingAchs = [];
        remainingAchs.push(37);
        remainingAchs.push(54);
        remainingAchs.push(55);
        remainingAchs.push(65);
        remainingAchs.push(74);
        remainingAchs.push(76);
        remainingAchs.push(78);
        remainingAchs.push(81);
        remainingAchs.push(85);
        remainingAchs.push(87);
        remainingAchs.push(91);
        remainingAchs.push(92);
        remainingAchs.push(93);
        remainingAchs.push(95);
        remainingAchs.push(102);
        remainingAchs.push(103);
        remainingAchs.push(104);
        remainingAchs.push(111);
        remainingAchs.push(113);
        remainingAchs.push(116);
        remainingAchs.push(117);
        remainingAchs.push(118);
        remainingAchs.push(125);
        remainingAchs.push(131);
        remainingAchs.push(132);
        remainingAchs.push(133);
        remainingAchs.push(134);
        remainingAchs.push(137);
        remainingAchs.push(141);
        remainingAchs.push(142);
        remainingAchs.push(143);
        remainingAchs.push(156);
        remainingAchs.push(164);
        return remainingAchs;
    },
    get disabledRUPGs() {
        let remainingRUs = [];
        if (!PelleRealityUpgrade.temporalAmplifier.isBought) remainingRUs.push(1);
        if (!PelleRealityUpgrade.replicativeAmplifier.isBought) remainingRUs.push(2);
        if (!PelleRealityUpgrade.eternalAmplifier.isBought) remainingRUs.push(3);
        if (!PelleRealityUpgrade.superluminalAmplifier.isBought) remainingRUs.push(4);
        if (!PelleRealityUpgrade.boundlessAmplifier.isBought) remainingRUs.push(5);
        if (!PelleRealityUpgrade.cosmicallyDuplicate.isBought) remainingRUs.push(6);
        if (!PelleRealityUpgrade.innumerablyConstruct.isBought) remainingRUs.push(7);
        if (!PelleRealityUpgrade.paradoxicallyAttain.isBought) remainingRUs.push(8);
        if (!PelleRealityUpgrade.linguisticallyExpand.isBought) remainingRUs.push(9);
        if (!PelleRealityUpgrade.existentiallyProlong.isBought) remainingRUs.push(10);
        if (!PelleRealityUpgrade.boundlessFlow.isBought) remainingRUs.push(11);
        if (!PelleRealityUpgrade.knowingExistence.isBought) remainingRUs.push(12);
        if (!PelleRealityUpgrade.telemechanicalProcess.isBought) remainingRUs.push(13);
        if (!PelleRealityUpgrade.eternalFlow.isBought) remainingRUs.push(14);
        if (!PelleRealityUpgrade.paradoxicalForever.isBought) remainingRUs.push(15);
        if (!PelleRealityUpgrade.scourToEmpower.isBought) remainingRUs.push(19);
        if (!PelleRealityUpgrade.parityOfSingularity.isBought) remainingRUs.push(20);
        if (!PelleRealityUpgrade.temporalTranscendence.isBought) remainingRUs.push(22);
        if (!PelleRealityUpgrade.replicativeRapidity.isBought) remainingRUs.push(23);
        if (!PelleRealityUpgrade.syntheticSymbolism.isBought) remainingRUs.push(24);
        return remainingRUs;
    },

    get uselessPerks() {
        let remainingPerks = [0, 10, 12, 13, 14, 15, 16, 17, 30, 31, 40, 41, 42, 43, 44, 45, 46, 51, 52, 53, 54, 55, 56, 57, 60, 61, 62, 70, 71, 72, 73, 80, 81, 82, 83, 100, 101, 102, 103, 104, 105, 106, 107, 201, 202, 203, 204];
        return remainingPerks;
    },
}

EventHub.logic.on(GAME_EVENT.TAB_CHANGED, () => {
    if (Tab.celestials.alpha.isOpen) Alpha.quotes.initial.show();
});
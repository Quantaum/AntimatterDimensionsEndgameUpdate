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
        let remainingPerks = [];
        remainingPerks.push(10);
        remainingPerks.push(12);
        remainingPerks.push(13);
        remainingPerks.push(14);
        remainingPerks.push(15);
        remainingPerks.push(16);
        remainingPerks.push(17);
        remainingPerks.push(30);
        remainingPerks.push(40);
        remainingPerks.push(41);
        remainingPerks.push(42);
        remainingPerks.push(43);
        remainingPerks.push(44);
        remainingPerks.push(45);
        remainingPerks.push(46);
        remainingPerks.push(51);
        remainingPerks.push(52);
        remainingPerks.push(53);
        remainingPerks.push(60);
        remainingPerks.push(61);
        remainingPerks.push(62);
        remainingPerks.push(80);
        remainingPerks.push(81);
        remainingPerks.push(82);
        remainingPerks.push(83);
        remainingPerks.push(100);
        remainingPerks.push(103);
        remainingPerks.push(104);
        remainingPerks.push(105);
        remainingPerks.push(106);
        remainingPerks.push(201);
        remainingPerks.push(202);
        remainingPerks.push(203);
        remainingPerks.push(204);
        return remainingPerks;
    },
}

EventHub.logic.on(GAME_EVENT.TAB_CHANGED, () => {
    if (Tab.celestials.alpha.isOpen) Alpha.quotes.initial.show();
});
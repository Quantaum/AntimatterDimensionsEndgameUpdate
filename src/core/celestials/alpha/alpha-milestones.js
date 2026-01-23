import { DimBoost } from "../../dimboost";
import { EternityChallenges } from "../../eternity-challenge";
import { isRealityAvailable } from "../../reality";
import { ALPHA_STAGES } from "./alpha-stages";

export const ALPHA_MILESTONES = [
    {
        id: 0,
        name: "Fourth Dimboost",
        symbol: "∞",
        nerf: `Dimboost multiplier is square-rooted`,
        buff: `Dimboost multiplier is squared`,
        condition: () => Alpha.isRunning && DimBoost.purchasedBoosts.gte(4),
        isCompleted: () => Alpha.currentStage > ALPHA_STAGES.FOURTH_DIMBOOST
    },
    {
        id: 1,
        name: "Fifth Dimboost",
        symbol: "∞",
        nerf: `Dimboost threshold is doubled`,
        buff: `Dimboost threshold base is decreased by 1`,
        condition: () => Alpha.isRunning && DimBoost.purchasedBoosts.gte(5),
        isCompleted: () => Alpha.currentStage > ALPHA_STAGES.FIFTH_DIMBOOST
    },
    {
        id: 2,
        name: "Galaxy",
        symbol: "∞",
        nerf: `After first Galaxy, all Galaxy strength is multiplied by log(log(Tickspeed)+1)*10%, cap at 100%`,
        buff: `Galaxies are more effective: (+log(log(AM))%, cap at +308.25%)`,
        condition: () => Alpha.isRunning && player.galaxies.gte(1),
        isCompleted: () => Alpha.currentStage > ALPHA_STAGES.GALAXY
    },
    {
        id: 3,
        name: "Infinity",
        symbol: "∞",
        nerf: `The costs of all Infinity Upgrades are squared`,
        buff: `Gain more IP based on effective Tesseracts (IP is raised to the power of 1+(Tesseracts/100))`,
        condition: () => Alpha.isRunning && Currency.infinities.gte(1),
        isCompleted: () => Alpha.currentStage > ALPHA_STAGES.INFINITY
    },
    {
        id: 4,
        name: "Complete Challenge 12",
        symbol: "∞",
        nerf: `Cost scaling for Big Crunch Autobuyer triple instead of double per purchase`,
        buff: `Charged Infinity Upgrades are 10% more effective`,
        condition: () => Alpha.isRunning && NormalChallenge(12).isCompleted,
        isCompleted: () => Alpha.currentStage > ALPHA_STAGES.C12
    },
    {
        id: 5,
        name: "Break Infinity",
        symbol: "∞",
        nerf: `Break Infinity Upgrades are 1000x more expensive, Dimension/Tickspeed cost scaling starts at x20 instead of x10`,
        buff: `Decrease Post-Infinity Dimension/Tickspeed cost scaling by 0.1`,
        condition: () => Alpha.isRunning && player.break === true,
        isCompleted: () => Alpha.currentStage > ALPHA_STAGES.BREAK_INFINITY
    },
    {
        id: 6,
        name: "Purchase the 5e11 IP Upgrade",
        symbol: "∞",
        nerf: `Distant Galaxy Cost Scaling starts at 0 Galaxies (you basically get trapped in EC5 without the Dimboost scaling)`,
        buff: `The starting number of Galaxies for Distant/Remote Galaxy Scaling is doubled`,
        condition: () => Alpha.isRunning && BreakInfinityUpgrade.galaxyBoost.isBought,
        isCompleted: () => Alpha.currentStage > ALPHA_STAGES.IP_511
    },
    {
        id: 7,
        name: "Purchase All Break Infinity Upgrades",
        symbol: "∞",
        nerf: `All Infinity Dimensions except the 8th are capped at 10 purchases each`,
        buff: `Decrease Post-Infinity Dimension/Tickspeed cost scaling by another 0.1`,
        condition: () => Alpha.isRunning && BreakInfinityUpgrade.all
            .every(upgrade => (upgrade.isCapped === undefined ? upgrade.isBought : upgrade.isCapped)),
        isCompleted: () => Alpha.currentStage > ALPHA_STAGES.ALL_BIUS
    },
    {
        id: 8,
        name: "Complete All Infinity Challenges",
        symbol: "∞",
        nerf: `IP gain is divided by 1.8^(log(pending IP)-140)`,
        buff: `All Infinity Dimension multipliers are raised to the power of 1.1, and convert all Infinity Dimensions to Continuum`,
        condition: () => Alpha.isRunning && player.challenge.infinity.completedBits === 510,
        isCompleted: () => Alpha.currentStage > ALPHA_STAGES.ALL_ICS
    },
    {
        id: 9,
        name: "Unlock Replicanti",
        symbol: "∞",
        nerf: `Replicanti interval purchases multiply the interval by 0.95 instead of 0.9`,
        buff: `Replicanti Speed is squared`,
        condition: () => Alpha.isRunning && player.replicanti.unl === true,
        isCompleted: () => Alpha.currentStage > ALPHA_STAGES.REPLICANTI
    },
    {
        id: 10,
        name: "Unlock the Eighth Infinity Dimension",
        symbol: "∞",
        nerf: `Until 1.8e308 IP, IP gain is raised to the power of 1-((log(pending IP)-280)/100)`,
        buff: `The 8th Infinity Dimension's multiplier is raised to the power of 1.25`,
        condition: () => Alpha.isRunning && player.dimensions.infinity[7].isUnlocked === true,
        isCompleted: () => Alpha.currentStage > ALPHA_STAGES.EIGHTH_ID
    },
    {
        id: 11,
        name: "Eternity",
        symbol: "∞",
        nerf: `The Time Dimension per-purchase multiplier is x2 instead of x4`,
        buff: `The nerf 'Any 8th Time Dimensions purchased above 100M will not further increase the multiplier' is permanently disabled`,
        condition: () => Alpha.isRunning && Currency.eternities.gte(1),
        isCompleted: () => Alpha.currentStage > ALPHA_STAGES.ETERNITY
    },
    {
        id: 12,
        name: "Purchase Time Study 61",
        symbol: "∞",
        nerf: `Time Theorem costs are squared (AM costs multiply by e40000, IP costs multiply by e200, EP costs multiply by 4)`,
        buff: `Gain more EP based on current IP (EP is multiplied by 10^(log(IP)/1000))`,
        condition: () => Alpha.isRunning && TimeStudy(61).isBought,
        isCompleted: () => Alpha.currentStage > ALPHA_STAGES.TS61
    },
    {
        id: 13,
        name: "Purchase the Fourth Time Dimension",
        symbol: "∞",
        nerf: `The multiplier of your highest Time Dimension will always be 1`,
        buff: `The Time Dimension per-purchase multiplier is x10 instead of x4`,
        condition: () => Alpha.isRunning && TimeDimension(4).bought >= 1,
        isCompleted: () => Alpha.currentStage > ALPHA_STAGES.FOURTH_TD
    },
    {
        id: 14,
        name: "Purchase the Third Eternity Upgrade",
        symbol: "∞",
        nerf: `All Infinity Dimension multipliers are raised to the power of 0.9`,
        buff: `The 1st Infinity Dimension's multiplier is raised to the power of 1.5`,
        condition: () => Alpha.isRunning && EternityUpgrade.idMultICRecords.isBought,
        isCompleted: () => Alpha.currentStage > ALPHA_STAGES.THIRD_EU
    },
    {
        id: 15,
        name: "Get 115 Time Theorems",
        symbol: "∞",
        nerf: `While inside an Eternity Challenge, IP gain is raised to the power of 0.75`,
        buff: `EC1 can be completed up to 1000 times outside the Nameless Ones' Reality`,
        condition: () => Alpha.isRunning && Currency.timeTheorems.gte(115),
        isCompleted: () => Alpha.currentStage > ALPHA_STAGES.TT_115
    },
    {
        id: 16,
        name: "Complete any Eternity Challenge Once",
        symbol: "∞",
        nerf: `While inside an Eternity Challenge, IP gain is raised to the power of 0.65 instead of 0.75`,
        buff: `All Time Dimension multipliers are raised to the power of 1.1, and convert all Time Dimensions to Continuum`,
        condition: () => Alpha.isRunning && EternityChallenges.all.some(c => c.completions > 0),
        isCompleted: () => Alpha.currentStage > ALPHA_STAGES.FIRST_EC
    },
    {
        id: 17,
        name: "Complete any Eternity Challenge Five Times",
        symbol: "∞",
        nerf: `While inside an Eternity Challenge, IP gain is raised to the power of 0.55 instead of 0.65`,
        buff: `All Time Dimension multipliers are raised to the power of 1.2 instead of 1.1`,
        condition: () => Alpha.isRunning && EternityChallenges.all.some(c => c.completions >= 5),
        isCompleted: () => Alpha.currentStage > ALPHA_STAGES.FIRST_EC_FULL
    },
    {
        id: 18,
        name: "Time Study 181",
        symbol: "∞",
        nerf: `All Antimatter Dimension multipliers are raised to the power of 0.9`,
        buff: `All Antimatter Dimension multipliers are raised to the power of 1.1`,
        condition: () => Alpha.isRunning && TimeStudy(181).isBought,
        isCompleted: () => Alpha.currentStage > ALPHA_STAGES.TS181
    },
    {
        id: 19,
        name: "Complete Eternity Challenge 10 Once",
        symbol: "∞",
        nerf: `Raise Eternity Point gain to the power of 0.9`,
        buff: `Raise Infinity gain to the power of 1.5`,
        condition: () => Alpha.isRunning && EternityChallenge(10).completions > 0,
        isCompleted: () => Alpha.currentStage > ALPHA_STAGES.EC10
    },
    {
        id: 20,
        name: "Time Study 192",
        symbol: "∞",
        nerf: `Increase the Post-Infinity Replicanti scaling from x1.2 to x1.5 per 1.8e308 Replicanti`,
        buff: `Square-root the Post-Infinity Replicanti scaling`,
        condition: () => Alpha.isRunning && TimeStudy(192).isBought,
        isCompleted: () => Alpha.currentStage > ALPHA_STAGES.TS192
    },
    {
        id: 21,
        name: "Unlock Eternity Challenge 11",
        symbol: "∞",
        nerf: `EC11 will grant no reward unless it is bulk completed for all 5 completions`,
        buff: `Decrease the Post-Infinity Tickspeed cost scaling by 0.05`,
        condition: () => Alpha.isRunning && EternityChallenge(11).isUnlocked,
        isCompleted: () => Alpha.currentStage > ALPHA_STAGES.UNLOCK_EC11
    },
    {
        id: 22,
        name: "Complete Eternity Challenge 11",
        symbol: "∞",
        nerf: `The Dilation Time Study costs 12900 Time Theorems instead of 5000`,
        buff: `Decrease the Post-Infinity Tickspeed cost scaling by another 0.05`,
        condition: () => Alpha.isRunning && EternityChallenge(11).completions > 0,
        isCompleted: () => Alpha.currentStage > ALPHA_STAGES.COMPLETE_EC11
    },
    {
        id: 23,
        name: "Enter Dilation",
        symbol: "∞",
        nerf: `Dilation raises Dimensions and Tickspeed exponents to the power of 0.7 instead of 0.75 (before additional reductions)`,
        buff: `Dilation raises Dimensions and Tickspeed exponents to the power of 0.8 instead of 0.75 (before additional reductions)`,
        condition: () => Alpha.isRunning && player.dilation.active,
        isCompleted: () => Alpha.currentStage > ALPHA_STAGES.DILATION
    },
    {
        id: 24,
        name: "Eternity while Dilated",
        symbol: "∞",
        nerf: `Dilation raises Dimensions and Tickspeed exponents to the power of 0.65 instead of 0.75 (before additional reductions) for further Dilation runs`,
        buff: `Tachyon Particle gain is raised to the power of 1.4`,
        condition: () => Alpha.isRunning && player.dilation.lastEP.gt(0),
        isCompleted: () => Alpha.currentStage > ALPHA_STAGES.ETERNITY_WHILE_DILATED
    },
    {
        id: 25,
        name: "Begin Time Theorem Generation",
        symbol: "∞",
        nerf: `Time Theorem Generation is multiplied by log(TP)%, cap at 100%`,
        buff: `Time Theorem Generation is squared`,
        condition: () => Alpha.isRunning && DilationUpgrade.ttGenerator.isBought,
        isCompleted: () => Alpha.currentStage > ALPHA_STAGES.GENERATE_TT
    },
    {
        id: 26,
        name: "Unlock the Eighth Time Dimension",
        symbol: "∞",
        nerf: `Raise EP gain to the power of 1-((log(pending EP)-3350)/1000)`,
        buff: `The 8th Time Dimension's multiplier is squared`,
        condition: () => Alpha.isRunning && TimeDimension(8).isUnlocked,
        isCompleted: () => Alpha.currentStage > ALPHA_STAGES.EIGHTH_TD
    },
    {
        id: 27,
        name: "Reality",
        symbol: "∞",
        nerf: `None`,
        buff: `Remove almost all hardcaps`,
        condition: () => Alpha.isRunning && isRealityAvailable(),
        isCompleted: () => Alpha.currentStage > ALPHA_STAGES.REALITY
    }
];

export const AlphaMilestones = {
    all: ALPHA_MILESTONES,

    get nextMilestoneGroup() {
        return this.all
            .filter(m => !m.isCompleted())
            .slice(0, 6);
    }
};
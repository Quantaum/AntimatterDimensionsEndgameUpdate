export const alpha = {
    unlocks: {
        run: {
            id: 0,
            price: 1e100,
            description: "Unlock Alpha's Reality.",
            onUnlock: () => Alpha.quotes.initial.show(),
        }
    }
};

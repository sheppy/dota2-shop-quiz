export function start(state) {
    let round = state.get("round");
    let items = round.get("items");

    round = round.merge({
        number: round.get("number") + 1,
        item: items.first(),
        items: items.skip(1)
    });

    return state.set("round", round);
}

export function start(state) {
    let round = state.get("round");
    let items = round.get("items");

    round = round
        .set("number", round.get("number") + 1)
        .set("item", items.first())
        .set("items", items.shift());

    return state.set("round", round);
}

import _ from "lodash";
import {List, Map} from "immutable";

import * as Score from "./score";

export const NUMBER_OF_COMPONENTS = 8;


/**
 * Default recipe item
 */
export const recipeItem = Map({
    img: "recipe_lg.png",
    dname: "Recipe",
    name: "recipe",
    desc: "A recipe to build the desired item.",
    cost: 0,
    lore: "A recipe is always necessary to craft the most mighty of objects.",
    recipe: 1
});


function getRandomComponent(components) {
    return components.get(_.random(components.size - 1));
}


/**
 * @param {Map} item
 * @param {List} items
 * @param {List} components
 * @returns {List}
 */
function getComponentChoices(item, items, components) {
    let choices = item.get("components", List())
        .toSeq()
        .filter(component => component !== "recipe")
        .toList()
        .setSize(NUMBER_OF_COMPONENTS - 1)
        .map(choice => choice ? choice : getRandomComponent(components));

    return List(_.shuffle(choices.toArray()))
        .reduce(function (components, itemName) {
            // Get actual items for componentChoices
            var item = items.find(i => i.get("name") === itemName);

            if (item) {
                return components.push(item);
            }

            return components;
        }, List())
        .push(recipeItem);  // Always add recipe as last item
}


/**
 * Check if the guessed items are correct.
 *
 * @param {Map} state
 * @param {List} guesses
 * @param {List} components
 * @returns {Map}
 */
function checkItems(state, guesses, components) {
    // Detect if we have added all of the item guesses
    if (guesses.size !== components.size) {
        return state;
    }

    // Check if correct result
    let allGuessesCorrect = components.every(component => guesses.find((guess) => guess.get("name") === component));

    if (allGuessesCorrect) {
        // Start new round
        return start(Score.correct(state));
    }

    return Score.incorrect(state);
}


/**
 * Start the round
 *
 * @param {Map} state
 * @returns {Map}
 */
export function start(state) {
    let items = state.get("items");
    let components = state.get("components");
    let round = state.get("round");
    let roundItems = round.get("items");

    let item = roundItems.first();

    // TODO: Detect when run out of items
    return state.mergeIn(["round"], {
        number: round.get("number", 0) + 1,
        item: item,
        items: roundItems.skip(1),
        choices: getComponentChoices(item, items, components),
        guesses: List()
    });
}

/**
 * Add an item to the guesses
 *
 * @param {Map} state
 * @param {number} index
 * @returns {Map}
 */
export function addItem(state, index) {
    const components = state.getIn(["round", "item", "components"]);
    const choice = state.getIn(["round", "choices", index]).set("selected", index);

    // Can't select a choice that is already selected
    if (state.hasIn(["round", "choices", index, "selected"])) {
        // TODO: This should remove
        return state;
    }

    // Can't add more items
    if (state.getIn(["round", "guesses"]).size === components.size) {
        return state;
    }

    const nextState = state
        .updateIn(["round", "guesses"], guesses => guesses.push(choice))
        .setIn(["round", "choices", index], choice);

    const guesses = nextState.getIn(["round", "guesses"]);

    return checkItems(nextState, guesses, components);
}



/**
 * Remove an item from the guesses
 *
 * @param {Map} state
 * @param {number} index
 * @returns {Map}
 */
export function removeItem(state, index) {
    const item = state.getIn(["round", "guesses", index]);
    const originalIndex = item.get("selected");

    const choice = state.getIn(["round", "choices", originalIndex]);

    return state
        .updateIn(["round", "guesses"], guesses => guesses.delete(guesses.indexOf(item)))
        .updateIn(["round", "choices"], choices => choices.set(originalIndex, choice.delete("selected")));
}


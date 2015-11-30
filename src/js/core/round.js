import _ from "lodash";
import {List, Map} from "immutable";

export const NUMBER_OF_COMPONENTS = 8;


/**
 * Default recipe item
 */
export const recipeItem = Map({
    img: "recipe_lg.png",
    localized_name: "Recipe",
    name: "item_recipe",
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
            var item = items.find(i => i.get("name") === "item_" + itemName);

            if (item) {
                return components.push(item);
            }

            return components;
        }, List())
        .push(recipeItem);  // Always add recipe as last item
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
 * @param {Map} item
 * @returns {Map}
 */
export function addItem(state, item) {
    const nextState = state.updateIn(["round", "guesses"], (guesses) => guesses.push(item));

    const guesses = nextState.getIn(["round", "guesses"]);
    const components = nextState.getIn(["round", "item", "components"]);

    // Detect if we have added all of the item guesses
    if (guesses.size === components.size) {
        // Check if correct result
        let allGuessesCorrect = components.every(component => guesses.find((guess) => guess.get("name") === "item_" + component));

        if (allGuessesCorrect) {
            // Start new round
            return start(nextState);
        }
    }

    return nextState;
}



/**
 * Remove an item from the guesses
 *
 * @param {Map} state
 * @param {Map} item
 * @returns {Map}
 */
export function removeItem(state, item) {
    return state.updateIn(["round", "guesses"], (guesses) => guesses.delete(guesses.indexOf(item)));
}


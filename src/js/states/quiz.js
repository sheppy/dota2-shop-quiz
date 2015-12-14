import _ from "lodash";
import {List, Map} from "immutable";


function getBuildableItems(items) {
    // Get only the items that have components
    return items.filter(item => item.get("components"));
}

function getComponentItems(items) {
    return items
        .reduce(function (components, item) {
            // Get all the components as a single array
            if (item.get("components")) {
                return components.concat(item.get("components"));
            }
            return components;
        }, List())
        // TODO: Remove duplicates
        .filter(component => component !== "recipe");  // Remove recipes
}

function shuffleItems(items) {
    return List(_.shuffle(items.toArray()));
}

function getInitialRound(buildable) {
    return Map({
        item: Map(),
        items: shuffleItems(buildable),
        number: 0,
        guesses: List()
    });
}

function getInitialScore() {
    return Map({
        guessesLeft: 3,
        points: 0,
        streak: 0
    });
}

export function initialise(state, items) {
    const buildable = getBuildableItems(items);

    return state.merge({
        loading: false,
        loaded: true,
        buildable: buildable,
        items: items,
        components: getComponentItems(items),
        round: getInitialRound(buildable),
        score: getInitialScore()
    });
}

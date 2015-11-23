import _ from "lodash";
import {List, Map} from "immutable";

const REGEX_RECIPE_NAME = /^recipe(_.+)$/;


function getBuildableItems(items) {
    // Get only the items that are created
    return items.toSeq()
        .filter(item => item.get("created"))
        .map(function (item) {
            // Change all component recipes to be called recipe
            if (item.has("components")) {
                return item.set("components", item.get("components").map(componentName => componentName.replace(REGEX_RECIPE_NAME, "recipe")));
            }

            return item;
        })
        .toList();
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
        .filter(component => !component.match(REGEX_RECIPE_NAME));  // Remove recipes
}

export function initialise(state, items) {
    const buildable = getBuildableItems(items);
    const components = getComponentItems(items);

    return state.merge({ buildable, components });
}

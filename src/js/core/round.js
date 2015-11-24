import _ from "lodash";
import {List, Map} from "immutable";


function getComponentChoices() {
    return List();
    //round.choices = _.chain(round.choices)
    //    .shuffle()
    //    .reduce(function (components, itemName) {
    //        // Get actual items for componentChoices
    //        var item = _.findWhere(this.items, { name: "item_" + itemName });
    //        if (item) {
    //            components.push(item);
    //        }
    //        return components;
    //    }, [], this)
    //    .value();
    //
    //
    //// Always add recipe as last item
    //round.choices.push(this.recipeItem);
}

export function start(state) {
    let round = state.get("round");
    let items = round.get("items");

    round = round.merge({
        number: round.get("number") + 1,
        item: items.first(),
        items: items.skip(1),
        choices: getComponentChoices(state.get("components"))
    });

    return state.set("round", round);
}

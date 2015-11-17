import _ from "lodash";

function Quiz(items) {
    this.items = items;
    this.recipeItem = {
        img: "recipe_lg.png",
        localized_name: "Recipe",
        name: "recipe",
        recipe: 1,
        secret_shop: 0,
        side_shop: 0
    };

    // The item pool used in the round
    this.roundItems = [];

    // Possible items for the quiz item
    this.possibleItems = this.getPossibleItems();

    // Possible components to make
    this.possibleComponents = this.getPossibleComponents();
}

Quiz.prototype.getPossibleItems = function () {
    return _.chain(this.items)
        .filter(function (item) {
            // Only items that are created
            return item.created;
        }).each(function (item) {
            // Change all component recipes to be called recipe
            if (item.components) {
                _.each(item.components, function (component, n) {
                    item.components[n] = component.replace(/^recipe(_.+)$/, "recipe");
                });
            }
        })
        .value();
};

Quiz.prototype.getPossibleComponents = function () {
    return _.chain(this.items)
        .reduce(function (components, item) {
            // Get all the components as a single array
            if (item.components) {
                return components.concat(item.components);
            }
            return components;
        }, [])
        .remove(function (component) {
            // Remove recipes
            return !component.match(/^recipe(_.+)$/);
        })
        .uniq()
        .value();
};

// Initialize the quiz
Quiz.prototype.start = function () {
    // Randomize the item pool
    this.roundItems = _.shuffle(this.possibleItems);
};

Quiz.prototype.getRandomComponent = function () {
    return this.possibleComponents[_.random(this.possibleComponents.length - 1)];
};

Quiz.prototype.initRound = function () {
    var NUM_COMPONENTS = 8;
    var round  = {};

    // Get the item to make
    round.item = this.roundItems.shift();

    // Randomly choose some components
    round.choices = _.chain(round.item.components)
        .clone()
        .remove(function (component) {
            return component !== "recipe";
        })
        .value();

    while (round.choices.length < NUM_COMPONENTS) {
        round.choices.push(this.getRandomComponent());
    }

    round.choices = _.chain(round.choices)
        .shuffle()
        .reduce(function (components, itemName) {
            // Get actual items for componentChoices
            var item = _.findWhere(this.items, {name: "item_" + itemName});
            if (item) {
                components.push(item);
            }
            return components;
        }, [], this)
        .value();


    // Always add recipe as last item
    round.choices.push(this.recipeItem);

    // Set up guesses
    round.guesses = [];
    _.each(round.item.components, function () {
        round.guesses.push({
            item: false
        });
    });

    return round;
};

module.exports = Quiz;


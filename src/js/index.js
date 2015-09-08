var _ = require("lodash");
var swig = require("swig");

var items = require("../../dist/items.json");

var itemTemplate = require("../template/partial/item.html");

// Possible items for the quiz item
var possibleItems = _.chain(items)
    .filter(function(item) {
        // Only items that are created
        return item.created;
    }).each(function(item) {
        // Change all component recipes to be called recipe
        if (item.components) {
            _.each(item.components, function(component, n) {
                item.components[n] = component.replace(/^recipe(_.+)$/, "recipe");
            });
        }
    })
    .value();

// Find a recipe item
var recipeItem = _.chain(items)
    .find(function (item) {
        return item.name.match(/^item_recipe(_.+)$/);
    })
    .tap(function (item) {
        item.name = "recipe";
        item.localized_name = "Recipe";
        delete item.cost;
        delete item.id;
    })
    .value();

// Possible components to make
var possibleComponents = _.chain(items)
    .reduce(function(components, item) {
        // Get all the components as a single array
        if (item.components) {
            return components.concat(item.components);
        }
        return components;
    }, [])
    .remove(function(component) {
        // Remove recipes
        return !component.match(/^recipe(_.+)$/);
    })
    .uniq()
    .value();


console.log("Total Items: ", items.length);
console.log("Possible Buildable Items:", possibleItems.length);
console.log("Possible Components:", possibleComponents.length);



// Round to pick item
var roundItems = _.shuffle(possibleItems);
var itemToMake = roundItems[0];

// Randomly choose some components
var componentChoices = _.chain(itemToMake.components)
    .clone()
    .remove(function (component) {
        return component !== "recipe";
    })
    .value();
var numComponents = 8;

console.log("initial choices", componentChoices);

while (componentChoices.length < numComponents) {
    var item = possibleComponents[_.random(possibleComponents.length - 1)];
    componentChoices.push(item);
}

componentChoices = _.chain(componentChoices)
    .shuffle()
    .reduce(function (components, itemName) {
        // Get actual items for componentChoices
        var item = _.findWhere(items, {name: "item_" + itemName});
        if (item) {
            components.push(item);
        }
        return components;
    }, [])
    .value();


// Always add recipe
componentChoices.push(recipeItem);

console.log("Make Item: ", roundItems[0].localized_name);
console.log("Components: ", roundItems[0].components);
console.log("Choices: ", componentChoices);

// Render the item
var html = swig.render(itemTemplate, {
    locals: {
        item: roundItems[0]
    }
});

document.querySelector("#main").innerHTML = html;

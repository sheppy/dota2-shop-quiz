var _ = require("lodash");
var swig = require("swig");

var items = require("../../dist/items.json");

var itemTemplate = require("../template/partial/item.html");

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

var possibleComponents = _.chain(items)
    .reduce(function(components, item) {
        // Get all the components as a single array
        if (item.components) {
            return components.concat(item.components);
        }
        return components;
    }, [])
    .reduce(function(components, component) {
        components.push(component.replace(/^recipe(_.+)$/, "recipe"));
        return components;
    }, [])
    .uniq()
    .value();


console.log("Total Items: ", items.length);
console.log("Possible Buildable Items:", possibleItems.length);
console.log("Possible Components:", possibleComponents.length);



// Round to pick item
var roundItems = _.shuffle(possibleItems);
var itemToMake = roundItems[0];

// Randomly choose some components
var componentChoices = _.clone(itemToMake.components);
var numComponents = 6;

while (componentChoices.length < numComponents) {
    componentChoices.push(possibleComponents[_.random(possibleComponents.length - 1)]);
}

componentChoices = _.shuffle(componentChoices);

console.log("Make Item: ", roundItems[0].localized_name);
console.log("Components: ", roundItems[0].components);
console.log("Choices: ", componentChoices);

// Render the item
var html = swig.render(itemTemplate, {
    locals: {item: roundItems[0]}
});

document.querySelector("#main").innerHTML = html;

var _ = require("lodash");

var items = require("../../dist/items.json");

var possibleItems = _.filter(items, function(item) {
    return item.created;
});

var possibleComponents = _.reduce(items, function(components, item) {
    if (item.components) {
        return _.uniq(components.concat(item.components));
    }
    return components;
}, []);


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

var _ = require("lodash");
var swig = require("swig");

var Quiz = require("./Quiz");

var items = require("../../dist/items.json");

var itemTemplate = require("../template/partial/item.html");


// Create the quiz
var quiz = new Quiz(items);

console.log("Total Items: ", items.length);
console.log("Possible Buildable Items:", quiz.possibleItems.length);
console.log("Possible Components:", quiz.possibleComponents.length);

quiz.start();

var round = quiz.initRound();

console.log("Make Item: ", round.item.localized_name);
console.log("Components: ", round.item.components);
console.log("Choices: ", round.choices);

// Render the item
var html = swig.render(itemTemplate, {
    locals: round
});

document.querySelector("#main").innerHTML = html;

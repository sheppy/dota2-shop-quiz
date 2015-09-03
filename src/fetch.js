var Promise = require("bluebird");
var request = Promise.promisify(require("request"));
var fs = require("fs");
var _ = require("lodash");

var writeFile = Promise.promisify(fs.writeFile);

var API_KEY = fs.readFileSync("API.key", "UTF-8").replace(/\s/gm, "");

var api1Request = request({
    url: "https://api.steampowered.com/IEconDOTA2_570/GetGameItems/V001/",
    qs: {
        key: API_KEY,
        language: "en"
    }
}).then(function(data) {
    return JSON.parse(data[0].body).result.items;
});

var api2Request = request({
    url: "http://www.dota2.com/jsfeed/heropediadata",
    qs: {
        feeds: "itemdata",
        l: "english"
    }
}).then(function (data) {
    return JSON.parse(data[0].body).itemdata;
});

Promise.all([api1Request, api2Request]).spread(function(items, itemData) {
    return _.each(items, function (item) {
        var found = _.findWhere(itemData, { id: item.id });

        // Fix recipe images
        if (!found && item.recipe) {
            found = {
                img: "recipe_lg.png"
            };
        }

        _.extend(item, found);
    });
}).then(function (items) {
    // Check if there is a recipe needed as a component
    return _.each(items, function(item) {
        // Check it does not already have
        var hasRecipe = !!_.find(item.components, function (i) {
            return ~i.indexOf("recipe");
        });

        if (!hasRecipe) {
            var nameToFind = item.name.replace(/^item_/, "item_recipe_");

            var recipe = _.result(_.findWhere(items, { name: nameToFind }), "name");
            if (recipe) {
                item.components.push(recipe.replace(/^item_/, ""));
            }
        }

        // TODO: Remove:
        // recipe_ward_dispenser
    });
}).then(function (items) {
    console.log("Saved " + items.length + " items");
    fs.writeFileSync("dist/items.json", JSON.stringify(items));
    return items;
}).then(function(items) {
    console.log("Fetching images...");

    var promises = _.chain(items)
        .uniq("img")
        .sortBy("img")
        .map(function(item) {
            return request({
                url: "http://cdn.dota2.com/apps/dota2/images/items/" + item.img,
                encoding: "binary"
            }).then(function(data) {
                console.log(" Saving image: " + item.localized_name + " > " + item.img);
                return writeFile("dist/img/" + item.img, data[0].body, "binary");
            });
        }).value();

    return Promise.all(promises);
}).then(function () {
    console.log("-= FINISHED =-");
});

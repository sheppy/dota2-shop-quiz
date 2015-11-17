import fs from "fs";
import _ from "lodash";
import Promise from "bluebird";
import request from "request";
import API from "./api";

const writeFile = Promise.promisify(fs.writeFile);
const FAKE_RECIPES = [
    //"recipe_ward_dispenser",
    //"recipe_arcane_boots"
];

class Items {
    get(API_KEY) {
        return API.getItems(API_KEY);
    }

    fixRecipes(items) {
        // Check if there is a recipe needed as a component
        return _.each(items, function (item) {
            // Check it does not already have a recipe
            var hasRecipe = !!_.find(item.components, function (i) {
                return ~i.indexOf("recipe");
            });

            // See if there is a recipe if it does not already have one
            if (!hasRecipe) {
                var nameToFind = item.name.replace(/^item_/, "item_recipe_");

                var recipe = _.findWhere(items, { name: nameToFind });
                if (recipe && recipe.name && recipe.cost) {
                    item.components.push(recipe.name.replace(/^item_/, ""));
                }
            }

            // Remove odd unused recipes
            _.remove(item.components, function (name) {
                return ~FAKE_RECIPES.indexOf(name);
            });
        });
    }

    saveJson(items) {
        console.log("Saved " + items.length + " items");
        return writeFile("dist/items.json", JSON.stringify(items)).then(function () {
            return items;
        });
    }

    saveImages(items) {
        let promises = _.map(Items._getUniqueImages(items), function (item) {
            return API.getImage(item).then(imageData => Items._saveImage(item, imageData))
        });

        return Promise.all(promises);
    }

    static _getUniqueImages(items) {
        return _.chain(items).uniq("img").sortBy("img").value();
    }

    static _saveImage(item, imageData) {
        console.log(" Saving image: " + item.localized_name + " > " + item.img);
        return writeFile("dist/img/" + item.img, imageData, "binary");
    }
}

export default new Items();

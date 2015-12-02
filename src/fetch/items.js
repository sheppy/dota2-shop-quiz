import fs from "fs";
import _ from "lodash";
import Promise from "bluebird";
import request from "request";
import API from "./api";

const writeFile = Promise.promisify(fs.writeFile);

const INVALID_ITEMS = [
    "diffusal_blade_2", "aegis", "cheese", "courier", "flying_courier", "tpscroll",
    "ward_dispenser", "ward_observer", "ward_sentry",
    "bottle", "necronomicon_2", "necronomicon_3", "dagon_2", "dagon_3", "dagon_4", "dagon_5",
    "halloween_candy_corn", "present", "mystery_arrow", "mystery_hook", "mystery_missile",
    "mystery_toss", "mystery_vacuum", "winter_cake", "winter_coco", "winter_cookie",
    "winter_greevil_chewy", "winter_greevil_garbage", "winter_greevil_treat", "winter_ham",
    "winter_kringle", "winter_mushroom", "winter_skates", "winter_stocking", "winter_band",
    "greevil_whistle", "greevil_whistle_toggle", "halloween_rapier"
];


class Items {
    get() {
        return API.getItems();
    }

    addNames(items) {
        return _.each(items, (item) => {
            item.name = item.img.replace("_lg.png", "");
        });
    }

    removeInvalid(items) {
        return _.chain(items)
            // Remove invalid items from the list
            .reject((item) => ~INVALID_ITEMS.indexOf(item.name))
            // Remove components that do not exist as items
            .each((item) => {
                _.remove(item.components, component => !_.find(items, (i) => i.name === component));
            })
            .value();
    }

    addRecipes(items) {
        return _.each(items, function (item) {
            if (!item.components) {
                return;
            }

            // Reduce the cost by the individual component costs
            let cost = _.reduce(item.components, function (total, component) {
                let comp = _.find(items, (i) => i.name === component);
                if (!comp) {
                    return total;
                }
                return total - comp.cost;
            }, item.cost);

            // If there is a price remaining it must be for a recipe
            if (cost) {
                item.components.push("recipe");
            }
        });
    }

    trimItemData(items) {
        return _.each(items, function (item) {
            delete item.id;
            delete item.qual;
            delete item.notes;
            delete item.mc;
            delete item.cd;
            delete item.cost;
            delete item.created;
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
        console.log(" Saving image: " + item.dname + " > " + item.img);
        return writeFile("dist/img/" + item.img, imageData, "binary");
    }
}

export default new Items();

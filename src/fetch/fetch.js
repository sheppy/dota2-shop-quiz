import fs from "fs";
import _ from "lodash";
import Promise from "bluebird";
import Items from "./items";


const API_KEY = fs.readFileSync("API.key", "UTF-8").replace(/\s/gm, "");


Items.get(API_KEY)
    .then(Items.fixRecipes)
    .then(Items.trimItemData)
    .then(Items.saveJson)
    .then(Items.saveImages)
    .then(function () {
        console.log("-= FINISHED =-");
    });

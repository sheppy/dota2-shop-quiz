var Promise = require("bluebird");
var request = Promise.promisify(require("request"));
var fs = require("fs");
var _ = require("lodash");

var API_KEY = fs.readFileSync("API.key", "UTF-8").replace(/\s/gm, "");

var api1Request = request({
    url: "https://api.steampowered.com/IEconDOTA2_570/GetGameItems/V001/",
    qs: {
        key: API_KEY,
        language: "en"
    }
}).then(function(response) {
    return JSON.parse(response[0].body).result.items;
});

var api2Request = request({
    url: "http://www.dota2.com/jsfeed/heropediadata",
    qs: {
        feeds: "itemdata",
        l: "english"
    }
}).then(function (response) {
    return JSON.parse(response[0].body).itemdata;
});

Promise.all([api1Request, api2Request]).spread(function(items, itemData) {
    return _.each(items, function (item) {
        _.extend(item, _.findWhere(itemData, { id: item.id }));
    });
}).then(function (items) {
    console.log("Saved " + items.length + " items");
    fs.writeFileSync("dist/items.json", JSON.stringify(items));
});

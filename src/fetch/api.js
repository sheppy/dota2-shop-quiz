import fs from "fs";
import _ from "lodash";
import Promise from "bluebird";
import request from "request";

const requestAPI = Promise.promisify(request);


class API {
    getItems(API_KEY) {
        return Promise
            .all([this._getGameItems(API_KEY), this._getHeropediaData()])
            .spread(this._mergeApiData);
    }

    getImage(item) {
        return requestAPI({
            url: "http://cdn.dota2.com/apps/dota2/images/items/" + item.img,
            encoding: "binary"
        }).then(data => data[0].body);
    }

    _mergeApiData(gameItems, heropediaItems) {
        return _.each(gameItems, function (item) {
            let found = _.findWhere(heropediaItems, { id: item.id });

            // Fix recipe images
            if (!found && item.recipe) {
                found = {
                    img: "recipe_lg.png"
                };
            }

            _.extend(item, found);
        });
    }

    _getGameItems(API_KEY) {
        return requestAPI({
            url: "https://api.steampowered.com/IEconDOTA2_570/GetGameItems/V001/",
            qs: {
                key: API_KEY,
                language: "en"
            }
        }).then(data => JSON.parse(data[0].body).result.items);
    }

    _getHeropediaData() {
        return requestAPI({
            url: "http://www.dota2.com/jsfeed/heropediadata",
            qs: {
                feeds: "itemdata",
                l: "english"
            }
        }).then(data => JSON.parse(data[0].body).itemdata);
    }
}

export default new API();

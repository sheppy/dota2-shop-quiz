import Promise from "bluebird";
import request from "request";

const requestAPI = Promise.promisify(request);


class API {
    getItems() {
        return this._getHeropediaData();
    }

    getImage(item) {
        return requestAPI({
            url: "http://cdn.dota2.com/apps/dota2/images/items/" + item.img,
            encoding: "binary"
        }).then(data => data[0].body);
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

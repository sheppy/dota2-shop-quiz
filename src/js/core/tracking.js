import _ from "lodash";


export function init() {
    // Only run in production
    if (typeof IS_PROD === "undefined" || !IS_PROD) {
        return;
    }

    (function(i,s,o,g,r,a,m){i["GoogleAnalyticsObject"]=r;i[r]=i[r]||function(){
    (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
    m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
    })(window,document,"script","//www.google-analytics.com/analytics.js","ga");

    ga("create", "UA-71955286-1", "auto");
    ga("send", "pageview");
}

export function event(opts) {
    opts = _.assign({ hitType: "event" }, opts);

    if (typeof IS_PROD === "undefined" || !IS_PROD) {
        console.info("Track Event", opts);
        return;
    }

    ga("send", opts);
}

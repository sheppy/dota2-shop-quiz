import Items from "./items";


Items.get()
    .then(Items.addNames)
    .then(Items.removeInvalid)
    .then(Items.addRecipes)
    .then(Items.trimItemData)
    .then(Items.saveJson)
    //.then(Items.saveImages)
    .then(function () {
        console.log("-= FINISHED =-");
    })
    .catch(function (err) {
        console.error("-= ERROR =-");
        console.error(err);
    });

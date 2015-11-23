import chai from "chai";
import chaiImmutable from "chai-immutable";
import sinon from "sinon";
import sinonChai from "sinon-chai";


chai.should();
chai.use(chaiImmutable);
chai.use(sinonChai);


import {List, Map} from "immutable";
import * as Quiz from "../src/js/core/quiz";


describe("Quiz", () => {
    describe("initialise", () => {
        it("sets the buildable items", () => {
            const state = Map();
            const item1 = {
                name: "Item 1",
                created: true
            };
            const item2 = {
                name: "Item 2",
                created: false
            };
            const nextState = Quiz.initialise(state, List.of(Map(item1), Map(item2)));

            nextState.get("buildable").should.equal(List.of(Map(item1)));
        });

        it("fixes buildable items recipes to be called recipe", () => {
            const state = Map();
            const item1 = {
                name: "Item 1",
                created: true,
                components: List.of("recipe_test")
            };
            const item2 = {
                name: "Item 2",
                created: false
            };
            const nextState = Quiz.initialise(state, List.of(Map(item1), Map(item2)));

            nextState.get("buildable").should.equal(List.of(Map({
                name: "Item 1",
                created: true,
                components: List.of("recipe")
            })));
        });

        it("sets the available component items", () => {
            const state = Map();
            const item1 = {
                name: "Item 1",
                created: true,
                components: [
                    "Item 2",
                    "Item 3"
                ]
            };
            const item2 = {
                name: "Item 2",
                created: false
            };
            const nextState = Quiz.initialise(state, List.of(Map(item1), Map(item2)));

            nextState.get("components").should.equal(List.of("Item 2", "Item 3"));
        });

        it("removes recipes from available components", () => {

            const state = Map();
            const item1 = {
                name: "Item 1",
                created: true,
                components: [
                    "Item 2",
                    "Item 3",
                    "recipe_test"
                ]
            };
            const nextState = Quiz.initialise(state, List.of(Map(item1)));

            nextState.get("components").should.equal(List.of("Item 2", "Item 3"));
        });

        it.skip("initialises the round", () => {});

        it.skip("initialises the score", () => {});
    });


    describe.skip("start", () => {
        // it starts the round
    });
});


/*

 export function shuffleItems(state) {
 let items = state.get("items").toArray();
 items = _.shuffle(items);
 return state.set("items", List(items));
 }


 describe("shuffleItems", () => {
 it("changes the item order", () => {
 const items = List.of("Item 1", "Item 2", "Item 3", "Item 4", "Item 5", "Item 6", "Item 7");
 const state = Map({
 items: items
 });
 const nextState = Quiz.shuffleItems(state);

 nextState.get("items").should.have.size(7);
 nextState.get("items").should.include("Item 1");
 nextState.get("items").should.include("Item 2");
 nextState.get("items").should.include("Item 3");
 nextState.get("items").should.include("Item 4");
 nextState.get("items").should.include("Item 5");
 nextState.get("items").should.include("Item 6");
 nextState.get("items").should.include("Item 7");

 nextState.should.not.equal(Map({
 items: items
 }));
 });
 });

 */



// EXAMPLE
const intialState = {
    buildable: [],
    components: [],

    round: {
        item: {},
        items: []
    },

    score: {
        guessesLeft: 3,
        score: 0,
        row: 0
    }
};

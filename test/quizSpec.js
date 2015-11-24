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
        const item1 = Map({
            name: "Item 1",
            created: true,
            components: List.of("Item 2", "Item 3")
        });
        const item2 = Map({
            name: "Item 2",
            created: false
        });
        const item3 = Map({
            name: "Item 3",
            created: true,
            components: List.of("recipe_test")
        });
        const item4 = Map({
            name: "Item 4",
            created: true,
            components: List.of("Item 2", "recipe_test", "Item 3")
        });
        const item5 = Map({ name: "Item 5", created: true });
        const item6 = Map({ name: "Item 6", created: true });
        const item7 = Map({ name: "Item 7", created: true });
        const item8 = Map({ name: "Item 8", created: true });
        const item9 = Map({ name: "Item 9", created: true });


        it("sets the buildable items", () => {
            const state = Map();
            const nextState = Quiz.initialise(state, List.of(item1, item2));

            nextState.get("buildable").should.equal(List.of(item1));
        });

        it("fixes buildable items recipes to be called recipe", () => {
            const state = Map();
            const nextState = Quiz.initialise(state, List.of(item2, item3));

            nextState.get("buildable").should.equal(List.of(Map({
                name: "Item 3",
                created: true,
                components: List.of("recipe")
            })));
        });

        it("sets the available component items", () => {
            const state = Map();
            const nextState = Quiz.initialise(state, List.of(item1, item2));

            nextState.get("components").should.equal(List.of("Item 2", "Item 3"));
        });

        it("removes recipes from available components", () => {
            const state = Map();
            const nextState = Quiz.initialise(state, List.of(item4));

            nextState.get("components").should.equal(List.of("Item 2", "Item 3"));
        });

        it("initialises the round item", () => {
            const state = Map();
            const nextState = Quiz.initialise(state, List());
            const round = nextState.get("round");

            round.get("item").should.be.instanceof(Map);
            round.get("item").should.have.size(0);
        });

        it("initialises the round items", () => {
            const state = Map();
            const nextState = Quiz.initialise(state, List.of(item1, item2, item5, item6, item7, item8, item9));
            const round = nextState.get("round");

            round.get("items").should.have.size(6);
            round.get("items").should.include(item1);
            round.get("items").should.include(item5);
            round.get("items").should.include(item6);
            round.get("items").should.include(item7);
            round.get("items").should.include(item8);
            round.get("items").should.include(item9);

            round.get("items").should.not.equal(List.of(item1, item5, item6, item7, item8, item9));
        });

        it("initialises the score", () => {
            const state = Map();
            const nextState = Quiz.initialise(state, List());
            const score = nextState.get("score");

            score.get("guessesLeft").should.equal(3);
            score.get("score").should.equal(0);
            score.get("row").should.equal(0);
        });
    });
});



// EXAMPLE
const intialState = {
    buildable: [],
    components: [],

    round: {
        item: {},
        items: [],
        guesses: []
    },

    score: {
        guessesLeft: 3,
        score: 0,
        row: 0
    }
};

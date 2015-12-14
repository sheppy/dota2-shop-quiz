import chai from "chai";
import chaiImmutable from "chai-immutable";
import sinon from "sinon";
import sinonChai from "sinon-chai";


chai.should();
chai.use(chaiImmutable);
chai.use(sinonChai);


import {List, Map} from "immutable";
import * as Quiz from "../src/js/states/quiz";


describe("Quiz", () => {
    describe("initialise", () => {
        const item1 = Map({
            name: "item_1",
            components: List.of("item_2", "item_3")
        });
        const item2 = Map({
            name: "item_2"
        });
        const item3 = Map({
            name: "item_3",
            components: List.of("recipe")
        });
        const item4 = Map({
            name: "item_4",
            components: List.of("item_2", "recipe", "item_3")
        });
        const item5 = Map({ name: "item_5", created: true, components: List() });
        const item6 = Map({ name: "item_6", created: true, components: List() });
        const item7 = Map({ name: "item_7", created: true, components: List() });
        const item8 = Map({ name: "item_8", created: true, components: List() });
        const item9 = Map({ name: "item_9", created: true, components: List() });


        it("sets the buildable items", () => {
            const state = Map();
            const nextState = Quiz.initialise(state, List.of(item1, item2));

            nextState.get("buildable").should.equal(List.of(item1));
        });

        it("sets the available component items", () => {
            const state = Map();
            const nextState = Quiz.initialise(state, List.of(item1, item2));

            nextState.get("components").should.equal(List.of("item_2", "item_3"));
        });

        it("removes recipes from available components", () => {
            const state = Map();
            const nextState = Quiz.initialise(state, List.of(item4));

            nextState.get("components").should.equal(List.of("item_2", "item_3"));
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
            score.get("points").should.equal(0);
            score.get("streak").should.equal(0);
        });
    });
});



// EXAMPLE
const intialState = {
    buildable: [],
    components: [],

    round: {
        number: 1,
        item: {},
        items: [],
        choices: [],
        guesses: []
    },

    score: {
        guessesLeft: 3,
        score: 0,
        row: 0
    }
};

import chai from "chai";
import chaiImmutable from "chai-immutable";
import sinon from "sinon";
import sinonChai from "sinon-chai";


chai.should();
chai.use(chaiImmutable);
chai.use(sinonChai);


import {List, Map} from "immutable";
import * as Round from "../src/js/core/round";


describe("Round", () => {
    const components = List.of("Item 1", "Item 2", "Item 3", "Item 4", "Item 5", "Item 6", "Item 7", "Item 8", "Item 9");

    const item1 = Map({ name: "item_Item 1" });
    const item2 = Map({ name: "item_Item 2" });
    const item3 = Map({ name: "item_Item 3" });
    const item4 = Map({ name: "item_Item 4" });
    const item5 = Map({ name: "item_Item 5" });
    const item6 = Map({ name: "item_Item 6" });
    const item7 = Map({ name: "item_Item 7" });
    const item8 = Map({ name: "item_Item 8" });
    const item9 = Map({ name: "item_Item 9" });

    const items = List.of(item1, item2, item3, item4, item5, item6, item7, item8, item9);

    describe("start", () => {
        it("increases the round number", () => {
            const round = Map({ number: 0, items: List.of(item1, item2, item3) });
            const state = Map({ items, components, round });
            const nextState = Round.start(state);
            const nextRound = nextState.get("round");

            nextRound.get("number").should.be.truthy;
            nextRound.get("number").should.equal(1);
        });

        it("gets the next item to guess", () => {
            const round = Map({ number: 0, items: List.of(item1, item2, item3) });
            const state = Map({ items, components, round });
            const nextState = Round.start(state);
            const nextRound = nextState.get("round");

            nextRound.get("item").should.be.truthy;
            nextRound.get("item").should.equal(item1);
        });

        it("replaces the last item to guess", () => {
            const round = Map({ number: 1, item: "Item 1", items: List.of(item2, item3, item4) });
            const state = Map({ items, components, round });
            const nextState = Round.start(state);
            const nextRound = nextState.get("round");

            nextRound.get("item").should.equal(item2);
        });

        it("generates some item choices", () => {
            const round = Map({
                number: 0,
                items: List.of(item1, item2, item3)
            });

            const state = Map({ items, components, round });
            const nextState = Round.start(state);
            const choices = nextState.get("round").get("choices");

            choices.should.be.truthy;
            choices.should.have.size(Round.NUMBER_OF_COMPONENTS);
            choices.should.contain(Round.recipeItem);
        });

        it("generates some item choices including the real ones", () => {
            const round = Map({
                number: 0,
                items: List.of(item1.merge({ components: List.of("Item 2", "Item 3") }), item2, item3)
            });

            const state = Map({ items, components, round });
            const nextState = Round.start(state);
            const choices = nextState.get("round").get("choices");

            choices.should.be.truthy;
            choices.should.have.size(Round.NUMBER_OF_COMPONENTS);
            choices.should.contain(item2);
            choices.should.contain(item3);
        });
    });

    describe("addItem", () => {
        it("adds an item to the guesses", () => {
            const round = Map({ guesses: List() });
            const state = Map({ round });

            const nextState = Round.addItem(state, item1);
            const nextRound = nextState.get("round");
            const guesses = nextRound.get("guesses");

            guesses.should.have.size(1);
        });

        it("adds another item to the guesses", () => {
            const round = Map({ guesses: List(item2) });
            const state = Map({ round });

            const nextState = Round.addItem(state, item2);
            const nextRound = nextState.get("round");
            const guesses = nextRound.get("guesses");

            guesses.should.have.size(2);
        });
    });

    describe.skip("removeItem", () => {

    });
});

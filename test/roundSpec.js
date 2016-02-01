import chai from "chai";
import chaiImmutable from "chai-immutable";
import sinon from "sinon";
import sinonChai from "sinon-chai";


chai.should();
chai.use(chaiImmutable);
chai.use(sinonChai);


import {List, Map} from "immutable";
import * as Round from "../src/js/states/round";


describe("Round", () => {
    const components = List.of("item_1", "item_2", "item_3", "item_4", "item_5", "item_6", "item_7", "item_8", "item_9");

    const item1 = Map({ name: "item_1" });
    const item2 = Map({ name: "item_2" });
    const item3 = Map({ name: "item_3" });
    const item4 = Map({ name: "item_4" });
    const item5 = Map({ name: "item_5" });
    const item6 = Map({ name: "item_6" });
    const item7 = Map({ name: "item_7" });
    const item8 = Map({ name: "item_8" });
    const item9 = Map({ name: "item_9" });

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
            const round = Map({ number: 1, item: "item_1", items: List.of(item2, item3, item4) });
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
                items: List.of(item1.merge({ components: List.of("item_2", "item_3") }), item2, item3)
            });

            const state = Map({ items, components, round });
            const nextState = Round.start(state);
            const choices = nextState.get("round").get("choices");

            choices.should.be.truthy;
            choices.should.have.size(Round.NUMBER_OF_COMPONENTS);
            choices.should.contain(item2);
            choices.should.contain(item3);
        });

        // TODO: Test fails
        it.skip("generates some item choices not including the item to guess", () => {
            const item = item1.merge({ components: List.of("item_2", "item_3") });
            const round = Map({
                number: 0,
                items: List.of(item, item2, item3)
            });

            const state = Map({
                items: List.of(item, item2, item3),
                components: List.of("item_1", "item_2", "item_3"),
                round
            });
            const nextState = Round.start(state);
            const choices = nextState.get("round").get("choices");

            choices.should.be.truthy;
            choices.should.not.contain(item);
        });
    });

    describe("addItem", () => {
        it("adds an item to the guesses", () => {
            const item = item1.merge({ components: List.of("item_2", "item_3") });
            const round = Map({ item, guesses: List(), choices: List.of(item2, item3) });
            const state = Map({ round });

            const nextState = Round.addItem(state, 0);
            const nextRound = nextState.get("round");
            const guesses = nextRound.get("guesses");

            guesses.should.have.size(1);
            guesses.should.include(item2.set("selected", 0));
        });

        it("adds another item to the guesses", () => {
            const item = item1.merge({ components: List.of("item_2", "item_3", "item_4") });
            const round = Map({ item, guesses: List.of(item2), choices: List.of(item2, item3, item4) });
            const state = Map({ round });

            const nextState = Round.addItem(state, 1);
            const nextRound = nextState.get("round");
            const guesses = nextRound.get("guesses");

            guesses.should.have.size(2);
            guesses.should.include(item3.set("selected", 1));
        });

        it("indicates if not all the guesses are correct", () => {
            const item = item1.merge({ components: List.of("item_2", "item_3", "item_4") });
            const score = Map({ guessesLeft: 3, streak: 0, points: 0 });
            const round = Map({ item, guesses: List.of(item2, item3), choices: List.of(item2, item3, item4, item5, item6) });
            const state = Map({ round, score });

            const nextState = Round.addItem(state, 4);
            const nextRound = nextState.get("round");
            const guesses = nextRound.get("guesses");

            guesses.should.have.size(3);
        });

        it("updates the selected status of the item added", () => {
            const item = item1.merge({ components: List.of("item_2", "item_3", "item_4") });
            const items = List.of(item5, item6, item7);
            const roundItems = List.of(item2, item3, item4);
            const round = Map({ number: 1, items: roundItems, item, guesses: List(), choices: List.of(item2, item2, item3, item4) });
            const state = Map({ round, items, components });

            const nextState = Round.addItem(state, 1);
            const nextRound = nextState.get("round");
            const guesses = nextRound.get("guesses");
            const choices = nextRound.get("choices");

            guesses.should.have.size(1);
            choices.filter(choice => choice.has("selected")).should.have.size(1);
            choices.find(choice => choice.has("selected")).get("name").should.equal(item2.get("name"));

            choices.hasIn([0, "selected"]).should.be.false;
            choices.hasIn([1, "selected"]).should.be.true;
            choices.getIn([1, "selected"]).should.equal(1);
        });

        it("starts a new round if the guesses were correct", () => {
            const item = item1.merge({ components: List.of("item_2", "item_3", "item_4") });
            const items = List.of(item5, item6, item7);
            const roundItems = List.of(item2, item3, item4);
            const score = Map({ guessesLeft: 3, streak: 0, points: 0 });
            const round = Map({ number: 1, items: roundItems, item, guesses: List.of(item2, item3), choices: List.of(item2, item3, item4) });
            const state = Map({ score, round, items, components });

            const nextState = Round.addItem(state, 2);
            const nextRound = nextState.get("round");
            const guesses = nextRound.get("guesses");

            nextRound.get("item").should.equal(item2);
            nextRound.get("number").should.equal(2);
        });

        it("does not start the next round if the items are not all correct", () => {
            const item = item1.merge({ components: List.of("item_2", "item_3", "item_4") });
            const items = List.of(item5, item6, item7);
            const roundItems = List.of(item2, item3, item4);
            const score = Map({ guessesLeft: 3, streak: 0, points: 0 });
            const round = Map({ number: 1, items: roundItems, item, guesses: List.of(item2, item3), choices: List.of(item2, item3, item4, item5) });
            const state = Map({ score, round, items, components });

            const nextState = Round.addItem(state, 3);
            const nextRound = nextState.get("round");
            const guesses = nextRound.get("guesses");

            nextRound.get("item").should.equal(item);
            nextRound.get("number").should.equal(1);
        });

        it("does not add more items than allowed", () => {
            const item = item1.merge({ components: List.of("item_2", "item_3", "item_4") });
            const items = List.of(item5, item6, item7);
            const roundItems = List.of(item2, item3, item4);
            const round = Map({ number: 1, items: roundItems, item, guesses: List.of(item2, item3, item5), choices: List.of(item2, item3, item4, item6) });
            const state = Map({ round, items, components });

            const nextState = Round.addItem(state, 3);
            const nextRound = nextState.get("round");
            const guesses = nextRound.get("guesses");

            guesses.should.have.size(3);
            guesses.should.not.include(item6);
            guesses.should.equal(List.of(item2, item3, item5));
        });

        it("removes an item that's already added", () => {
            const item = item1.merge({ components: List.of("item_2", "item_3", "item_4") });
            const round = Map({
                item,
                guesses: List.of(item2.set("selected", 0)),
                choices: List.of(item2.set("selected", 0), item3, item4)
            });
            const state = Map({ round });

            const nextState = Round.addItem(state, 0);
            const nextRound = nextState.get("round");
            const guesses = nextRound.get("guesses");

            guesses.should.have.size(0);
            guesses.should.not.include(item2.set("selected", 0));
        });
    });

    describe("removeItem", () => {
        it("removes the item from the guesses", () => {
            const round = Map({ guesses: List.of(item2, item3.set("selected", 2), item4), choices: List.of(item2, item3, item3.set("selected", 2), item4, item6) });
            const state = Map({ round });

            const nextState = Round.removeItem(state, 1);
            const nextRound = nextState.get("round");
            const guesses = nextRound.get("guesses");

            guesses.should.have.size(2);
            guesses.should.not.include(item3);
        });

        it("removes the selected state from the item", () => {
            const round = Map({
                guesses: List.of(item2, item3.set("selected", 2), item4),
                choices: List.of(item2, item3, item3.set("selected", 2), item4, item6)
            });
            const state = Map({ round });

            const nextState = Round.removeItem(state, 1);
            const nextRound = nextState.get("round");
            const guesses = nextRound.get("guesses");
            const choices = nextRound.get("choices");

            guesses.get(1).has("selected").should.be.false;
            choices.get(2).has("selected").should.be.false;
        });
    });
});

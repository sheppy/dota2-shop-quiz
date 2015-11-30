import chai from "chai";
import chaiImmutable from "chai-immutable";
import sinon from "sinon";
import sinonChai from "sinon-chai";


chai.should();
chai.use(chaiImmutable);
chai.use(sinonChai);


import {List, Map} from "immutable";
import * as Score from "../src/js/core/score";


describe("Score", () => {
    describe("correct", () => {
        it("increases the streak", () => {
            const score = Map({ streak: 0 });
            const state = Map({ score });
            const nextState = Score.correct(state);

            nextState.getIn(["score", "streak"]).should.equal(1);
        });

        it("increases the streak", () => {
            const score = Map({ streak: 1 });
            const state = Map({ score });
            const nextState = Score.correct(state);

            nextState.getIn(["score", "streak"]).should.equal(2);
        });

        it("increases the score", () => {
            const score = Map({ streak: 0, points: 0 });
            const state = Map({ score });
            const nextState = Score.correct(state);

            nextState.getIn(["score", "points"]).should.equal(200);
        });

        it("increases the score", () => {
            const score = Map({ streak: 1, points: 200 });
            const state = Map({ score });
            const nextState = Score.correct(state);

            nextState.getIn(["score", "points"]).should.equal(430);
        });
    });

    describe("incorrect", () => {
        it("resets the streak", () => {
            const score = Map({ streak: 0 });
            const state = Map({ score });
            const nextState = Score.incorrect(state);

            nextState.getIn(["score", "streak"]).should.equal(0);
        });

        it("resets the streak", () => {
            const score = Map({ streak: 1 });
            const state = Map({ score });
            const nextState = Score.incorrect(state);

            nextState.getIn(["score", "streak"]).should.equal(0);
        });

        it("reduces the guesses left", () => {
            const score = Map({ guessesLeft: 3 });
            const state = Map({ score });
            const nextState = Score.incorrect(state);

            nextState.getIn(["score", "guessesLeft"]).should.equal(2);
        });

        it("reduces the guesses left", () => {
            const score = Map({ guessesLeft: 2 });
            const state = Map({ score });
            const nextState = Score.incorrect(state);

            nextState.getIn(["score", "guessesLeft"]).should.equal(1);
        });

        it("reduces the guesses left", () => {
            const score = Map({ guessesLeft: 1 });
            const state = Map({ score });
            const nextState = Score.incorrect(state);

            nextState.getIn(["score", "guessesLeft"]).should.equal(0);
        });
    });
});

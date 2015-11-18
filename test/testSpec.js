import chai from "chai";
import chaiImmutable from "chai-immutable";
import sinon from "sinon";
import sinonChai from "sinon-chai";


chai.should();
chai.use(chaiImmutable);
chai.use(sinonChai);

describe("immutability", () => {
    describe("a number", () => {
        function increment(currentState) {
            return currentState + 1;
        }

        it("is immutable", () => {
            let state = 42;
            let nextState = increment(state);

            nextState.should.equal(43);
            state.should.equal(42);
        });
    });
});

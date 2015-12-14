import _ from "lodash";
import {List, Map} from "immutable";


const BASE_SCORE_BONUS = 200;
const STREAK_BONUS = 0.15;
const comboNames = [
    'Correct!',
    'Well done!',
    'Answering Spree!',
    'Dominating!',
    'Mega Answer!',
    'Unstoppable!',
    'Wicked Sick',
    'Monster Answer!',
    'Godlike!',
    'Beyond Godlike!'
];

const incorrectText = [
    "Incorrect",
    "Sorry",
    "Nope",
    "Wrong",
    "Try Again",
    "Uh uh",
    "Oops",
    "False"
];

export function correct(state) {
    return state.updateIn(["score"], (score) => {
        let streak = score.get("streak");
        let points = score.get("points");

        return score.merge({
            streak: streak + 1,
            points: points + BASE_SCORE_BONUS + Math.round(BASE_SCORE_BONUS * streak * STREAK_BONUS)
        });
    });
}

export function incorrect(state) {
    return state.updateIn(["score"], (score) => {
        let guessesLeft = score.get("guessesLeft");

        // TODO: End when no guesses left!
        return score.merge({
            streak: 0,
            guessesLeft: guessesLeft - 1
        });
    });
}


// Guesses left:
// https://dribbble.com/shots/911194-Profile-dropdown-menu

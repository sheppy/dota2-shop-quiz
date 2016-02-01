export function message(state, message) {
    return state.mergeIn(["flash"], {
        message
    });
}

export function clear(state) {
    return state.mergeIn(["flash"], {
        message: false
    });
}

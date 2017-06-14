export function counter (state = 0, action) {
    switch (action.type) {
        case 'INCREMENT':
            console.log(state+1, action)
            return state + 1
        case 'DECREMENT':
            console.log(state-1, action)
            return state - 1
        default:
            return state
    }
}

export function counter2 (state = 0, action) {
    switch (action.type) {
        case 'INCREMENT2':
            console.log(state+1, action)
            return state + 1
        case 'DECREMENT2':
            console.log(state-1, action)
            return state - 1
        default:
            return state
    }
}
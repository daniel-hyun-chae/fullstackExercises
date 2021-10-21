const reducer = (state="", action) => {
    switch (action.type) {
        case "SETFILTER":
            return action.data.filter
        default: return state
    }
}

export const setFilterAction = (filter) => {
    return {
        type: "SETFILTER",
        data: {
            filter
        }
    }
}

export default reducer
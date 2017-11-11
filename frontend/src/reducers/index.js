import { ADD_POST, DELETE_POST, EDIT_POST, GET_CATEGORIES} from "../actions/index";

const initiaState = {
    categories: [],
};

//Set category
function categories (state = [], action) {
    if(action.type === GET_CATEGORIES){
        return action.categories;
    } else {
        return state;
    }
}

function posts (state, action)  {
    const { id, timestamp, title, body, author, category, voteScore, deleted } = action;
    switch (action.type) {
        case ADD_POST:
            return {};
        case DELETE_POST:
            return {};
        case EDIT_POST:
            return {};
        default:
            return state;
    }
}
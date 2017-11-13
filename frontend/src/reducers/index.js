import {
    sortingTypes,
    ADD_POST,
    DELETE_POST,
    EDIT_POST,
    GET_CATEGORIES,
    RECEIVE_ALL_COMMENTS,
    INSERT_POST,
    INSERT_COMMENT,
    CHANGE_SORTING_ORDER
} from "../actions/index";

const initiaState = {
    categories: [],
    sortOrder: sortingTypes.MOST_RECENT,
    posts: {},
    comments: {},
    allPosts: [],
    postsByCategory: {}
};

//Set category
function categories (state = [], action) {
    if(action.type === GET_CATEGORIES){
        return action.categories;
    } else {
        return state;
    }
}

//Sort posts
function sortOrder(state = initiaState.sortOrder, action) {
    switch (action.type) {
        case CHANGE_SORTING_ORDER:
            return action.sortOrder;
        default:
            return state;
    }
}

//Posts reducer
function posts (state = initiaState.posts, action)  {
    const { parentId, postId, post } = action;
    switch (action.type) {
        case RECEIVE_ALL_POSTS:
            const posts = action.dataObj;
            return {
                ...posts
            };

        case RECEIVE_ALL_COMMENTS:
            const comments = action.dataArray;
            return {
                ...state,
                [parentId]: {
                    ...state[parentId],
                    comments: [...comments]
                }
            };

        case INSERT_POST:
            return {
                ...state,
                [postId]: {
                    ...post,
                    comments: []
                }
            };

        case INSERT_COMMENT:
            return {
                ...state,
                [parentId]: {
                    ...state[parentId],
                    comments: [...state[parentId].comments, action.commentId]
                }
            };

        default:
            return state;
    }
}
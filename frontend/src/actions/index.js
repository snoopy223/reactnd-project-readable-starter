import {
    getCategories,
    getPosts,
    getComments
} from "../utils/ReadableAPI";

export const GET_CATEGORIES = 'GET_CATEGORIES';
export const ADD_POST = "ADD_POST";
export const EDIT_POST = "EDIT_POST";
export const DELETE_POST = "DELETE_POST";
export const RECEIVE_ALL_COMMENTS = "RECEIVE_ALL_COMMENTS";

export const sortingTypes = {
    MOST_RECENT: 'MOST_RECENT',
    LEAST_RECENT: 'LEAST_RECENT',
    HIGHEST_POINTS: 'HIGHEST_POINTS',
    LOWEST_POINTS: 'LOWEST_POINTS'
};

export function fetchAllPosts() {
    return function(dispatch) {
        return getCategories()
            .then(data => dispatch(retrieveCategories(data)))
            .then(() => getPosts())
            .then(data => dispatch(receiveAllPosts(data)))
            .then(data =>
                data.allPosts.map(postItem =>
                    getComments(postItem).then(data =>
                        dispatch(receiveAllComments(data, postItem)))))

    }
}

export function receiveAllComments (data, parentId) {
    let dataObj = {};
    for (let i = 0; i < data.length; i ++) {
        dataObj[data[i].id] = data[i];
    }
    let dataArray = data.map(item => item.id);
    return {
        type: RECEIVE_ALL_COMMENTS,
        dataObj,
        dataArray,
        parentId
    }
}

export function receiveAllPosts(data) {
    let dataObj = {};
    for (let i = 0; i < data.length; i++) {
        dataObj[data[i].id] = data[i];
        dataObj[data[i].id].comments = [];
    }
}

export function retrieveCategories (data) {
    const categories = data.categories.map(category => category.name);
    return {
        type: GET_CATEGORIES,
        categories
    }
}

export function addPost ({ id, timestamp, title, body, author, category, voteScore, deleted}) {
    return {
        type: ADD_POST,
        id, author, timestamp, title, body, category, voteScore, deleted,
    }
}

export function editPost ({ id, timestamp, title, body, author, category, voteScore, deleted}) {
    return {
        type: EDIT_POST,
        id, author, timestamp, title, body, category, voteScore, deleted,
    }
}

export function deletePost ({ id, category }) {
    return {
        type: DELETE_POST,
        id, category,
    }
}
import {
    getCategories,
    getPosts,
    getComments,
    addToPosts,
    getSinglePost,
    addToComments,
    getSingleComment
} from "../utils/ReadableAPI";

import generateUUID from '../utils/generateID';

export const GET_CATEGORIES = 'GET_CATEGORIES';
export const ADD_POST = "ADD_POST";
export const EDIT_POST = "EDIT_POST";
export const DELETE_POST = "DELETE_POST";
export const RECEIVE_ALL_COMMENTS = "RECEIVE_ALL_COMMENTS";
export const INSERT_POST = "INSERT_POST";
export const INSERT_COMMENT = "INSERT_COMMENT";

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

export function addPostToServer (post) {
    return function(dispatch){
        const id = generateUUID();
        const timestamp = Date.now();
        return addToPosts({ ...post, id, timestamp}).then(() =>
          getSinglePost(id).then(data => dispatch(insertPost(data)))
        )
    }
}

export function insertPost(data) {
    const postId = data.id;
    const post = data;
    return {
        type: INSERT_POST,
        postId,
        post
    };
}

export function insertComment(data) {
    const parentId = data.parentId;
    const commentId = data.id;
    const comment = data;
    return {
        type: INSERT_COMMENT,
        parentId,
        commentId,
        comment
    }
}

export function addCommentToServer(comment) {
    return  dispatch => {
        const id = generateUUID();
        const timestamp = Date.now();
        return addToComments({
            ...comment,
            id,
            timestamp
        }).then(() =>
            getSingleComment(id).then(data => dispatch(insertComment(data)))
        )
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
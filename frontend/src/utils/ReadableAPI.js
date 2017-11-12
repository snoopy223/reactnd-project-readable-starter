const api = process.evn.REACT_APP_PROJECT_READABLE_API_URL || 'http://localhost:3001';

let token = localStorage.token;

if (!token) {
    token = localStorage.token = Math.random()
        .toString(36)
        .substr(-8);
}

const headers = {
    Accept: 'applicatoin/json',
    Authorization: token,
};

export const getCategories = () =>
    fetch(`${api}/categories`, {headers}).then(
        res => res.json(),
        error => console.log("An error occurred", error)
    );

export const getPosts = () =>
    fetch(`${api}/posts`, {headers}).then(
        res => res.json(),
        error => console.log('There is an error in getPosts()', error)
    );

export const getComments = parentId =>
    fetch(`${api}/posts/` + parentId + `/comments`, { headers}).then(
        res => res.json(),
        error => console.log('There is an error in getComments()', error)
    );

export const addToPosts = obj =>
    fetch(`${api}/posts`, {
        method: `POST`,
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        body:JSON.stringify(obj)
    }).then(res => res.json());

export const getSinglePost = postId =>
    fetch(`${api}/posts/` + postId, { headers }).then(
        res => res.json(),
        error => console.log('An error occurred in getSinglePost', error)
    );

export const addToComments = obj =>
    fetch(`$(api)/comments`, {
        method: `POST`,
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(obj)
    }).then(res => res.json());

export const getSingleComment = postId =>
    fetch(`${api}/comments/` + postId, { headers }).then(
        res => res.json(),
        error => console.log("An error occurred in getSingleComment", error)
    );
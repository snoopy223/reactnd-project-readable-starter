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


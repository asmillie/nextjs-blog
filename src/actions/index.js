import jsonPlaceholder from "../api/jsonPlaceholder";
import _ from 'lodash';

export const fetchPostsandUsers = () => async (dispatch, getState) => {
    await dispatch(fetchPosts());
    
    // // Use Lodash methods to get all unique user ids from posts array
    // const userIds = _.uniq(_.map(getState().posts, 'userId'));
    // // Fetch user for each user id
    // userIds.forEach(id => dispatch(fetchUser(id)));

    // Refactor of above commented code using Lodash chain method
    _.chain(getState().posts)
        .map('userId')
        .uniq()
        .forEach(id => dispatch(fetchUser(id)))
        .value();
};

export const fetchPosts = () => async dispatch => {
    const res = await jsonPlaceholder.get('/posts');

    dispatch({
        type: 'FETCH_POSTS', 
        payload: res.data
    });
}; 

export const fetchUser = (id) => async dispatch => {
    const res = await jsonPlaceholder.get(`/users/${id}`);

    dispatch({
        type: 'FETCH_USER',
        payload: res.data
    });
};
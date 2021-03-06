
import axios from 'axios';
import * as actionTypes from './actionTypes';


export const fetchUser = () => {
    return async (dispatch) => {
        const res = await axios.get('/api/current_user');

        dispatch({
            type: actionTypes.FETCH_USER,
            payload: res.data
        })

    }

}
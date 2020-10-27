import { ActionTypes, Action } from './types'
import * as api from 'api/apiFunctions'
import { Dispatch } from 'react';


export const loadData = (id: string) => async (dispatch: Dispatch<Action>) => {
    dispatch(setHasError(false))
    dispatch(setIsLoading(true))
    try {
        const response = await api.getPost(id);
        dispatch({
            type: ActionTypes.SET_DATA,
            payload: { data: response.data },
        });
    } catch (err) {
          dispatch(setHasError(true));
    } finally {
          dispatch(setIsLoading(false));
    }
};


export const setIsLoading = (isLoading: boolean) => {
    return {
        type: ActionTypes.SET_LOADING,
        payload: { isLoading }
    }
}

export const setHasError = (hasError: boolean) => {
    return {
        type: ActionTypes.SET_HAS_ERROR,
        payload: { hasError }
    }
}
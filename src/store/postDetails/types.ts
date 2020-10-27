import {Post} from 'types/post'

export enum ActionTypes {
    SET_DATA = 'postDetails/setData',
    SET_LOADING = 'postDetails/setLoading',
    SET_HAS_ERROR = 'postDetails/setHasError'
}

export interface PostDetailsState {
    isLoading: boolean,
    hasError : boolean,
    data : Post
}

export interface Action {
    type: ActionTypes;
    payload: Partial<PostDetailsState>;
}
  
import {Comment} from 'types/comment'

export enum ActionTypes {
    SET_DATA = 'comments/setData',
    SET_LOADING = 'comments/setLoading',
    SET_HAS_ERROR = 'comments/setHasError'
}

export interface CommentsState {
    isLoading: boolean,
    hasError : boolean,
    data : Comment[]
}

export interface Action {
    type: ActionTypes;
    payload: Partial<CommentsState>;
}
  
import { combineReducers } from "redux";
import posts from "./posts/reducer";
import { PostsState } from "./posts/types";
import postDetails from "./postDetails/reducer";
import { PostDetailsState } from "./postDetails/types";
import comments from "./comments/reducer";
import { CommentsState } from "./comments/types";
import user from "./user/reducer";
import { UserState } from "./user/types";

export interface AppState {
  posts: PostsState;
  postDetails: PostDetailsState;
  comments: CommentsState;
  user: UserState;
}

const rootReducer = combineReducers<any>({
  posts,
  postDetails,
  comments,
  user,
});

export default rootReducer;

import React from "react";
import { Switch, Route } from "react-router-dom";
import Posts from "components/modules/posts/posts";
import PostDetails from "components/modules/postDetails/postDetails";
import ScreenChallenges from "components/screens/challenges/challenges";
import ScreenChallengeDetails from "components/screens/challengeDetails/challengeDetails";
import ScreenProfile from "components/screens/profile/profile";

const Routes = () => {
  return (
    <Switch>
      <Route exact path="/challenges" component={ScreenChallenges} />
      <Route exact path="/challenges/:id" component={ScreenChallengeDetails} />
      <Route exact path="/profile" component={ScreenProfile} />
      <Route exact path="/posts" component={Posts} />
      <Route
        exact
        path="/posts/:postId"
        render={(props) => <PostDetails {...props} />}
      />
    </Switch>
  );
};

export default Routes;

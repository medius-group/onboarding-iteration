import React, { PureComponent } from 'react';
import { Switch, Route } from 'react-router-dom';
import Welcome from 'containers/Main/Welcome/Welcome';
import WelcomeSetting from 'containers/Main/Welcome/WelcomeSetting';
import WelcomeFinish from 'containers/Main/Welcome/WelcomeFinish';
import Main from 'containers/Main';

class RoutesContainer extends PureComponent {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={Welcome} />
        <Route exact path="/setting" component={WelcomeSetting} />
        <Route exact path="/finish" component={WelcomeFinish} />
        <Route exact path="/main" component={Main} />
      </Switch>
    );
  }
}

export default RoutesContainer;

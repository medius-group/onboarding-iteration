import React, { PureComponent } from 'react';
import { Switch, Route } from 'react-router-dom';
import Welcome from 'containers/Main/Welcome/Welcome';

class RoutesContainer extends PureComponent {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={Welcome} />
      </Switch>
    );
  }
}

export default RoutesContainer;

import React, { PureComponent } from 'react';
import { Switch, Route } from 'react-router-dom';
import MainLayout from 'containers/Layout/MainLayout';
import WelcomeBack from 'containers/Main/WelcomeBack/WelcomeBack';

class Main extends PureComponent {
  render() {
    return (
      <MainLayout isShowNavbar isVisibleSearch>
        <Switch>
          <Route exact path="/main" component={WelcomeBack} />
        </Switch>
      </MainLayout>
    );
  }
}

export default Main;

import React, { PureComponent } from 'react';
import { Switch, Route } from 'react-router-dom';
import MainLayout from 'containers/Layout/MainLayout';
import WelcomeBack from 'containers/Main/WelcomeBack/WelcomeBack';
import PostingFinance from 'containers/Main/WorkFlow/PostingFinance';

class Main extends PureComponent {
  render() {
    return (
      <MainLayout isShowNavbar isMenu>
        <Switch>
          <Route exact path="/welcomeback" component={WelcomeBack} />
          <Route exact path="/workflow/finance" component={PostingFinance} />
        </Switch>
      </MainLayout>
    );
  }
}

export default Main;

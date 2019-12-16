import { hot } from 'react-hot-loader/root';
import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { IntlProvider, addLocaleData } from 'react-intl';
import en from 'react-intl/locale-data/en';
import enMessages from 'lang/en';
import { store } from 'core';
import RoutesContainer from 'containers/RoutesContainer/RoutesContainer';

import 'assets/styles/App.scss';

addLocaleData([...en]);
const initialLang = 'en';

const messages = {
  en: enMessages
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lang: initialLang
    };
  }

  render() {
    const { lang } = this.state;
    const message = messages[lang];
    return (
      <IntlProvider locale={lang} messages={message}>
        <Provider store={store}>
          <Router>
            <Switch>
              <Route path="/" component={RoutesContainer} />
            </Switch>
          </Router>
        </Provider>
      </IntlProvider>
    );
  }
}

export default hot(App);

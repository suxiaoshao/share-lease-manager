import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { MyThemeProvider } from './components/myTheme';
import HomePage from './views/homePage';
import Goods from './views/goods';
import Orders from './views/orders';

function App(): JSX.Element {
  return (
    <Router>
      <MyThemeProvider>
        <Switch>
          <Route path={'/'} exact>
            <HomePage />
          </Route>
          <Route path={'/goods'} exact>
            <Goods />
          </Route>
          <Route path={'/orders'} exact>
            <Orders />
          </Route>
        </Switch>
      </MyThemeProvider>
    </Router>
  );
}

export default App;

import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { MyThemeProvider } from './components/myTheme';
import HomePage from './views/homePage';
import Goods from './views/goods';
import Orders from './views/orders';
import Shops from './views/shops';
import Users from './views/users';

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
          <Route path={'/shops'} exact>
            <Shops />
          </Route>
          <Route path={'/users'} exact>
            <Users />
          </Route>
        </Switch>
      </MyThemeProvider>
    </Router>
  );
}

export default App;

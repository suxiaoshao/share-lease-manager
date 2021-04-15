import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { MyThemeProvider } from './components/myTheme';
import HomePage from './views/homePage';
import GoodSetting from './views/goodsSetting';
import Orders from './views/orders';
import GoodInfo from './views/goodInfo';

function App(): JSX.Element {
  return (
    <Router>
      <MyThemeProvider>
        <Switch>
          <Route path={'/'} exact>
            <HomePage />
          </Route>
          <Route path={'/goods'} exact>
            <GoodSetting />
          </Route>
          <Route path={'/good/:gid'} exact>
            <GoodInfo />
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

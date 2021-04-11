import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { MyThemeProvider } from './components/myTheme';
import HomePage from './views/homePage';

function App(): JSX.Element {
  return (
    <Router>
      <MyThemeProvider>
        <Switch>
          <Route path={'/'} exact>
            <HomePage />
          </Route>
        </Switch>
      </MyThemeProvider>
    </Router>
  );
}

export default App;

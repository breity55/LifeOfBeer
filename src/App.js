import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import Header from './components/header';
import AddBrewery from './components/add-brewery';
import AddBeer from './components/add-beer';

class App extends Component {
  render() {
    return (
      <div className="app">
        <Header />
        <main className='app-main-container'>
          <Switch>
            <Route path='/Brewery/Add' component={AddBrewery} />
            <Route path='/Beer/Add' component={AddBeer} />
          </Switch>
        </main>
      </div>
    );
  }
}

export default App;

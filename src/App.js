import React, { Component } from 'react';
import { connect } from 'react-redux';
import logo from './logo.svg';
import './reset.css';
import './App.css';
import Introduction from './steps/Introduction';
import Play from './steps/Play';
import { Route } from 'react-router';
import { ConnectedRouter, push } from 'react-router-redux';
import history from './history';
import {store} from './store';
import random from './random';

class App extends Component {


  constructor(props) {
    super(props)

    // create treatment!
    if (!props.treatment) {
      const t = random.bool() ? 'a' : 'b';
      store.dispatch({type: 'ASSIGN_TREATMENT', treatment: t })
    }
  }

  render() {

    // don't render app without a treatment.
    if (!this.props.treatment) return null

    return (
      <ConnectedRouter history={history}>
        <div className="App">
          <Route exact path="/" render={(rp) => <Introduction {...rp} {...this.props} /> }/>
          <Route exact path="/play" render={(rp) => <Play {...rp} {...this.props} /> }/>
        </div>
      </ConnectedRouter>
    );
  }
}

const mapStateToProps = state => {
  return {
    ...state
  }
};

export default connect(mapStateToProps)(App);

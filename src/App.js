import React, { Component } from 'react';
import { connect } from 'react-redux';
import logo from './logo.svg';
import './reset.css';
import './App.css';
import Introduction from './steps/Introduction';
import Question from './steps/Question';
import Play from './steps/Play';
import { Route } from 'react-router';
import { ConnectedRouter, push } from 'react-router-redux';
import history from './history';
import {store} from './store';
import random from './random';
import {assignTreatment} from './actions';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faSpinner from '@fortawesome/fontawesome-free-solid/faSpinner';

class App extends Component {

  constructor(props) {
    super(props)

    // create treatment!
    if (!props.treatment) {
      store.dispatch(assignTreatment())
    }
  }

  render() {

    // don't render app without a treatment.
    if (!this.props.treatment) return <div className="main-spinner"> <FontAwesomeIcon spin size="2x" icon={faSpinner} /> </div>

    return (
      <ConnectedRouter history={history}>
        <div className="App">
          <Route exact path="/" render={(rp) => <Introduction {...rp} {...this.props} /> }/>
          <Route exact path="/play" render={(rp) => <Play {...rp} {...this.props} /> }/>
          <Route exact path="/question" render={(rp) => <Question {...rp} {...this.props} /> }/>
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

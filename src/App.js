import React, { Component } from 'react';
import { connect } from 'react-redux';
import logo from './logo.svg';
import './reset.css';
import './App.css';
import Introduction from './steps/Introduction';
import Question from './steps/Question';
import Play from './steps/Play';
import BoxTypes from './steps/BoxTypes';
import TheRub from './steps/TheRub';
import { Route } from 'react-router';
import {disablePair} from './utils';
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
    const playRound = this.props.boxes.length - 1

    // don't render app without a treatment.
    if (!this.props.treatment) return <div className="main-spinner"> <FontAwesomeIcon spin size="4x" icon={faSpinner} /> </div>

    return (
      <ConnectedRouter history={history}>
        <div className="App">
          <Route exact path="/" render={(rp) => <Introduction {...rp} {...this.props} /> }/>
          <Route exact path="/play" render={(rp) => <Play {...rp} {...this.props} round={playRound} button={true} /> }/>
          <Route exact path="/question" render={(rp) => <Question {...rp} {...this.props} /> }/>
          <Route exact path="/boxtypes" render={(rp) => <BoxTypes {...rp} {...this.props} /> }/>
          <Route exact path="/therub" render={(rp) => <TheRub {...rp} {...this.props} /> }/>
        </div>
      </ConnectedRouter>
    );
  }
}

const mapStateToProps = state => {
  return {
    ...state,
    boxes: state.boxes.map(g => disablePair(g, state.transitioning))
  }
};

export default connect(mapStateToProps)(App);

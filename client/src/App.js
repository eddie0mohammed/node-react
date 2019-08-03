import React from 'react';
import {Switch, Route} from 'react-router-dom';
import {connect } from 'react-redux';


import Header from './components/Header';
import * as actionCreators from './actions/actionCreators';
import Landing from './components/Landing';
import Surveys from './components/Surveys';

class App extends React.Component {
  
  componentDidMount(){
    this.props.fetchUser();
  } 

  render(){
    return (
      <div className="container">
        {/* <a href="/auth/google">Sign in with Google</a> */}
        <Header />
        <Switch>
          
          <Route exact path="/" component={Landing}/>
          <Route exact path="/surveys" component={Surveys}/>
        </Switch>

      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUser: () => dispatch(actionCreators.fetchUser()),
  }
}

export default connect(null, mapDispatchToProps)(App);

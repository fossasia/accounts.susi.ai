import React, { Component } from 'react';
import Cookies from 'universal-cookie';

const cookies = new Cookies();
export default ChildComponent => {
  class ComposedComponent extends Component {
    componentDidMount() {
      this.shouldNavigateAway();
    }
    componentDidUpdate() {
      this.shouldNavigateAway();
    }
    shouldNavigateAway() {
      const isLoggedIn = !!cookies.get('loggedIn');
      if (!isLoggedIn) {
        this.props.history.push('/');
      }
    }
    render() {
      return <ChildComponent {...this.props} />;
    }
  }

  return ComposedComponent;
};

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import 'antd/dist/antd.css';
export default class App extends Component {

  static propTypes = {
    children: PropTypes.node,
  };

  static defaultProps = {
    children: '',
  };

  render() {
    return (
      <div className="home-app">
        {this.props.children}
      </div>
    );
  }
}

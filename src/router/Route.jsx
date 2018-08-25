import React, { Component } from 'react'

export default class Route extends Component {
  render() {
        console.log('window.location.pathname:'+ window.location.pathname);
        console.log('this.props.path' + this.props.path);
        if (window.location.pathname == this.props.path) {
            let Component = this.props.component;
            return <Component/>
        }
        return null;
  }
}

import React from 'react';
import './box.less';
import {hot} from 'react-hot-loader'

class Hello extends React.Component{
  handleClick(){
    console.log(window.location.pathname);
    console.log(window.history);
    history.pushState({patha:'/hello'},null,'/hello');
}

  render() {
    return (
      <div>
        <div onClick={this.handleClick}>
          Hello!!!
        </div>
        <a href='#/aaa'>
        a??</a>
      </div>
    )
  }
}
  
export default hot(module)(Hello);
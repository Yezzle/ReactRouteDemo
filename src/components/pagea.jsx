import React from 'react';
import './box.less';

class PageA extends React.Component{

    handleClick(){
        console.log(window.location.pathname);
        history.pushState({path:'AageA'},null,'/PageA');
    }

  render() {
    return (
      <div onClick={this.handleClick}>
        PageAAAA
      </div>
    )
  }
}
  
export default PageA;
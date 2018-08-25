import React, { Component } from 'react';
import Hello from './Hello';
import Pagea from './pagea';
import {hot} from 'react-hot-loader';
import Route from '../router/Route'

class Content extends Component {
    constructor(props){
        super(props);
        this.handleClick.bind(this);
    }

    handleClick(key){
        switch (key) {
            case '1':
                history.pushState({path:'/Hello'},null,'/hello');
                console.log('去hello')
                this.setState({});
                break;
            case '2':
                history.pushState({path:'/pageA'},null,'/pageA');
                console.log('去pageA')
                this.setState({});
                break;
            default:
                break;
        }
    }
    render() {
        return (
            <div>
                <div style={{background:'#f5eebb',display:'inline-block'}} >
                    <span onClick={()=>this.handleClick('1')}>组件1</span>
                    <span onClick={()=>this.handleClick('2')}>组件2</span>
                </div>
                <Route path='/hello' component={Hello}/>
                <Route path='/pageA' component={Pagea}/>
            </div>
        );
    }
}

export default hot(module)(Content);

// export default Content;

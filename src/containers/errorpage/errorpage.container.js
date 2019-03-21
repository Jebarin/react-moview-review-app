import React, {Component} from 'react';
import {Link} from 'react-router-dom';

export default class ErrorPageComponent extends Component{

    render(){
        return (
            <>
                <div>Oh No Error!</div>  
                <Link to='/'>go to home</Link>
            </>
        )
    }
}
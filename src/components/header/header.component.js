import React, {Component} from 'react'; 
import {Link} from 'react-router-dom';
import {doLogout} from './header.helper';
import './header.css';

export default class HeaderComponent extends Component{
    
    render(){
        return (
            <>
                <header> 
                    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
                        <div className="container">
                            <button className="navbar-toggler" type="button"  >
                                <span className="navbar-toggler-icon"></span>
                            </button>
                            <div className="collapse navbar-collapse"> 
                                <img className="navbar-brand header-logo" src="/images/movie-icon.png" alt="Logo"></img>
                                <h4 className="header-title">Movie Reviewer</h4>
                                <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
                                    <li className="nav-item">
                                        <Link to="/dashboard" className="nav-link">Dashboard</Link> 
                                    </li>
                                    <li className="nav-item"> 
                                        <Link to="/dashboard/explore" className="nav-link">Explore</Link> 
                                    </li>
                                    <li className="nav-item"> 
                                        <Link to="/dashboard/settings" className="nav-link">Settings</Link> 
                                    </li> 
                                    <li className="nav-item"> 
                                        <a href="javascript:void(0)" className="nav-link" onClick={()=>doLogout()}>Logout</a> 
                                    </li>
                                </ul> 
                            </div>
                        </div>
                    </nav>
                </header>  
            </>
        )
    }
}
import React, {Component} from 'react'; 
import LoginComponent from '../login/login.component';
import RegisterComponent from '../register/register.component';
import './homepage.css';

export default class HomePageComponent extends Component{ 

    constructor(props){
        super(props);

        //default state
        this.state = {
            activeTab : 'login' 
        } 
    }

    handleTabChange(_tab){
        //switch tabs
        if( this.state.activeTab !== _tab){
            this.setState({activeTab: _tab}); 
        } 
    }

    render(){  

        return (
            <div className="homepage-bg">
                <div className="row">
                    <div className="col-md-8 loginform-left">
                        <img src="images/movie-icon.png" alt="movie icon"/>
                        <h3>Movie Reviewer</h3>
                        <p>Review movies from a wide range of collection, Keep track of reviewed movies, manage settings and much more... </p>
                    </div>
                     
                    <div className="col-md-4 loginform-right">
                        <div className="row">
                            <div className="col-md-12 nav-container p-0">
                                <ul className="nav nav-justified"  >
                                    <li className={`nav-item ${this.state.activeTab === 'login' ? 'active' :''}`} onClick={()=>this.handleTabChange('login')}>  Login </li>
                                    <li className={`nav-item ${this.state.activeTab === 'register' ? 'active' :''}`}  onClick={()=>this.handleTabChange('register')}> Register </li>
                                </ul>
                            </div>
                        </div> 
                        <div className="tab-content" > 
                            <div className="tab-pane fade show active" > 
                                {this.state.activeTab  === 'login' ? <LoginComponent /> : <RegisterComponent /> }
                            </div>
                        </div>
                    </div> 
                          
                </div>

            </div>
        )
    }
}
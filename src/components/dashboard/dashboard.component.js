import React, {Component} from 'react'; 
import {Link} from 'react-router-dom'; 
import HeaderComponent from '../header/header.component';
import CardViewComponent from '../card_view/card_view.component';
import {getRatings} from './dashboard.helper';
import './dashboard.css';

export default class DashboardComponent extends Component{

    constructor(props){
        super(props);

        this.state = { 
            reviewList : []
        }
    }

    componentDidMount(){
        //pull all the ratings
        getRatings((data)=>{ 
            this.setState({reviewList:data});
        });
    }
    
    render(){ 
        return (
            <>
                <HeaderComponent /> 
                <div className="container">
                    <h3 className="page-title">Dashboard</h3>
                    {this.state.reviewList.length >0 ?
                        <div className="row">
                            {this.state.reviewList.map((item)=>{
                                return <div className="col-12 col-md-6 col-lg-6 col-xl-4 mb-4" key={item.imdbID}>
                                        <CardViewComponent {...item} />
                                    </div> 
                            })} 
                        </div> 
                        :
                        (<div className="no_results">No results to Display! <br/> Start Exploring largest collection of Movies <Link to="/dashboard/explore">Click Here</Link> </div>)
                    }
                </div> 
            </>
        )
    }
}
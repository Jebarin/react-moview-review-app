import React, {Component} from 'react'; 
import {Link} from 'react-router-dom'; 
import {getCategory} from './card_view.helper';
import './card_view.css';

export default class CardViewComponent extends Component{

    render(){
        return (
            <div className="card" >
                <img className="card-img-top" src={this.props.Poster !=="N/A" ? this.props.Poster  : '/images/default_icon.png'} alt="Poster" />
                <div className="card-body">
                    <h5 className="card-title">{this.props.Title}</h5>
                    <p className="card-text">Year : {this.props.Year}</p>
                    <p className="card-text">Type : {this.props.Type}</p> 
                    {this.props.imdbRating && <p className="card-text">imdbRating : {this.props.imdbRating}</p>}
                    {this.props.usrRating && <p className="card-text">Your Rating : {this.props.usrRating}</p>}
                    {this.props.usrCategory && <p className="card-text">Category : {getCategory(this.props.usrCategory)}</p>}  
                    {this.props.addLink && <Link to={`/dashboard/rating/${this.props.imdbID}`} className="btn btn-primary">View Details</Link> }
                </div>
            </div>
        )
    }
}

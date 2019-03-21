import React, {Component} from 'react'; 
import {Link} from 'react-router-dom'; 
import HeaderComponent from '../header/header.component'; 
import {getMovieData, saveReview} from './rating.helper';
import './rating.css';

export default class RatingComponent extends Component{

    constructor(props){
        super(props); 

        this.state = {
            movieData : null,
            serverErr: null,
            usrRating: 6, //default
            usrCategory: 'very', //default
            isSuccess: false
        }
    }

    componentDidMount(){
        //get the movie data from server
        getMovieData(this.props.match.params.id, this.handleMovieData.bind(this));
    }

    handleMovieData(data){
        let _movieData = null;  
        let _errMsg = null;
        if(data && data.Error){
            _errMsg =  data.Error;
        }
        else{
            _movieData = data;
        }
        this.setState({movieData: _movieData, serverErr:_errMsg})
    }

    handleRangeInput(e){
        this.setState({usrRating:e.target.value}); 
    }

    handleRecommendationInput(val){
        this.setState({usrCategory:val}); 
    }

    handleSubmitReview(){
        saveReview(this.state, ()=>{ 
            this.setState({isSuccess:true});
        });
    }
 
    render(){

        const state = this.state;

        return (
            <>
                <HeaderComponent />  
                <div className="container">  
                    {state.serverErr && 
                        <>
                            <br/>
                            <div className="alert alert-danger">
                                <strong>Error!</strong> {state.serverErr}
                            </div>
                        </>
                    }
                    {state.movieData &&
                        <>
                            <h3 className="page-title"> 
                                <Link to={`/dashboard/explore/`}  >{`< Back`}</Link> 
                                &nbsp;Review Movie :: {state.movieData.Title}
                            </h3> 
                            <div className="card">
                                <div className="row ">
                                    <div className="col-md-4">
                                        <img src={state.movieData.Poster !=="N/A" ? state.movieData.Poster  : '/images/default_icon.png'}  className="w-100" alt="Poster Main"/>
                                    </div>
                                    <div className="col-md-8 px-3">
                                        <div className="card-block px-3 pb-5">
                                            <h4 className="card-title pt-5">Title : {state.movieData.Title}</h4>  
                                            <p className="card-text"><b>Actors:</b> {state.movieData.Actors}</p>
                                            <p className="card-text"><b>Awards:</b> {state.movieData.Awards}</p>
                                            <p className="card-text"><b>BoxOffice:</b> {state.movieData.BoxOffice}</p>
                                            <p className="card-text"><b>Country:</b> {state.movieData.Country}</p>
                                            <p className="card-text"><b>DVD:</b> {state.movieData.DVD}</p>
                                            <p className="card-text"><b>Director:</b> {state.movieData.Director}</p>
                                            <p className="card-text"><b>Genre:</b> {state.movieData.Genre}</p>
                                            <p className="card-text"><b>Language:</b> {state.movieData.Language}</p>
                                            <p className="card-text"><b>Metascore:</b> {state.movieData.Metascore}</p>
                                            <p className="card-text"><b>Plot:</b> {state.movieData.Plot}</p>
                                            <p className="card-text"><b>Production:</b> {state.movieData.Production}</p>
                                            <p className="card-text"><b>Rated:</b> {state.movieData.Rated}</p>
                                            <p className="card-text"><b>Released:</b> {state.movieData.Released}</p>
                                            <p className="card-text"><b>Response:</b> {state.movieData.Response}</p>
                                            <p className="card-text"><b>Runtime:</b> {state.movieData.Runtime}</p> 
                                            <p className="card-text"><b>Type:</b> {state.movieData.Type}</p>
                                            <p className="card-text"><b>Website:</b> {state.movieData.Website}</p>
                                            <p className="card-text"><b>Writer:</b> {state.movieData.Writer}</p>
                                            <p className="card-text"><b>Year:</b> {state.movieData.Year}</p>
                                            <p className="card-text"><b>imdbID:</b> {state.movieData.imdbID}</p>
                                            <p className="card-text"><b>imdbRating:</b> {state.movieData.imdbRating}</p>
                                            <p className="card-text"><b>imdbVotes:</b> {state.movieData.imdbVotes}</p>
                                        </div>
                                        <ul className="list-group list-group-flush">
                                            <li className="list-group-item">
                                                <div className="row">
                                                    <div className="col-md-6">User Rating:</div>
                                                    <div className="col-md-6"> 
                                                         <div className="range-slider">
                                                            <input className="range-slider__range" type="range" value={state.usrRating}  min="1" max="10" onChange={(e)=>this.handleRangeInput(e)}/>
                                                            <span className="range-slider__value">{state.usrRating}</span>
                                                        </div>  
                                                    </div> 
                                                </div>
                                                
                                            </li>
                                            <li className="list-group-item">
                                                <div className="row">
                                                    <div className="col-md-6">How likely you are
    to recommend the movie:</div>
                                                    <div className="col-md-6 tags-container"> 
                                                        <span className={state.usrCategory === "less" ? "active" : ""} onClick={()=>this.handleRecommendationInput('less')}>Less</span>
                                                        <span  className={state.usrCategory === "very" ? "active" : ""} onClick={()=>this.handleRecommendationInput('very')}>Very</span>
                                                        <span  className={state.usrCategory === "extrem" ? "active" : ""} onClick={()=>this.handleRecommendationInput('extrem')}>Extremely Likely</span>
                                                    </div> 
                                                </div>
                                            </li> 
                                            <li className="list-group-item">
                                                <div className="form-group">
                                                    <center><input type="button" className="customBtn "  value="Save"   onClick={()=>this.handleSubmitReview()} /></center> 
                                                    {state.isSuccess && 
                                                        <>
                                                            <br/>
                                                            <div className="alert alert-success">
                                                                <strong>Success!</strong> Ratings Updated Successfully!
                                                            </div>
                                                        </>
                                                    }
                                                </div> 
                                            </li>
                                        </ul>
                                    </div> 
                                </div>
                            </div> 
                        </>
                    }
                </div> 
            </>
        )
    }
}




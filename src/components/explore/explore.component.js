import React, {Component} from 'react'; 
import HeaderComponent from '../header/header.component';
import CardViewComponent from '../card_view/card_view.component';
import PaginationComponent from '../pagination/pagination.component';
import {searchMovies} from './explore.helper';
import './explore.css';

export default class ExploreComponent extends Component{

    constructor(props){
        super(props);

        this.state = {
            searchterm: '',
            movieList : [],
            totalResults: 0,
            isFormErr: false,
            searchErr: null
        } 

    }
 

    handleSearch(e){
 
        //read the given input
        const movName = e.target.value.trim(); 
        const keyCode = e.which || e.keyCode;

        if (keyCode === 13) { 
            if(movName !==""){
                this.setState({searchterm:movName });
                searchMovies(movName, 1, this.handleSearchResults.bind(this));
            }else{
                this.setState({isFormErr:true});
            } 
        }
        else{   
            //reset the error flag
            if(this.state.isFormErr||this.state.searchErr){
                this.setState({isFormErr:false, searchErr:null});
            }
        }
    } 

    handleSearchResults(results){ 

        let _movList = []; 
        let _totalResults = 0;
        let errMsg = null;
        if(results && results.Search && results.Search.length){
            //found results!
            _movList =  results.Search;
            _totalResults = parseInt(results.totalResults);
        }
        else if(results && results.Error){
            //show api error
            errMsg = results.Error;
        } 

        this.setState({movieList: _movList, totalResults: _totalResults, searchErr: errMsg});
    }

    handleSort(e){
         
        const val = e.target.value;
        if(!val) return;

        let _movList= this.state.movieList;
        switch(val){
            case 'asc':
                _movList = _movList.sort((a,b)=>parseInt(a.Year.split('-')[0]) - parseInt(b.Year.split('-')[0])); 
            break;
            case 'desc':
                _movList = _movList.sort((a,b)=>parseInt(b.Year.split('-')[0]) - parseInt(a.Year.split('-')[0]));
            break;
            default:
        }

        this.setState({movieList: _movList}); 
    } 

    handlePagination(_newPage){ 
        searchMovies(this.state.searchterm, _newPage, this.handleSearchResults.bind(this));
    }

    render(){ 
        return (
            <>
                <HeaderComponent />  
                <div className="container">
                    <h3 className="page-title">Explore Movies</h3>

                    <div className="mov-search-box"> 
                        <div className="form-group">
                            <label>Search for a Movie</label>
                            <input type="text" className={`form-control ${this.state.isFormErr ? 'shake-input' : ''}`}  placeholder="eg Avatar" onKeyUp={(e)=>this.handleSearch(e)} /> 
                        </div> 
                    </div>
                    
                    {this.state.movieList.length >0 &&
                        <div className="search-results-box">
                            <div className="row mb-4">
                                <div className="col-12 col-md-5 col-xl-6 align-self-center">
                                    <p className="mb-0">{this.state.totalResults} Movie(s) Matching</p>
                                </div>
                                <div className="col-12 col-md-7 col-xl-6 text-right ">  
                                    <div className="d-inline-block   mt-3 mt-md-0 sort">  
                                        <select className="form-control border-0 pl-4 pr-4" onChange={(e)=>this.handleSort(e)}>
                                            <option value="">----Sort By----</option>
                                            <option value="asc">Year Asc</option>
                                            <option value="desc">Year Desc</option> 
                                        </select> 
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                {this.state.movieList.map((item)=>{
                                    return <div className="col-12 col-md-6 col-lg-6 col-xl-4 mb-4" key={item.imdbID}>
                                            <CardViewComponent {...item} addLink={true} />
                                        </div> 
                                })} 
                            </div> 
                            <PaginationComponent 
                                totalItems={this.state.totalResults} 
                                onChange={this.handlePagination.bind(this)}
                            />
                        </div>
                    }
                    {this.state.searchErr ? 
                        (<div className="no_results error_msg_block">Error :: {this.state.searchErr}</div>) 
                        : !this.state.movieList.length  && 
                        (<div className="no_results">No results to Display! <br/> Start typing a movie name and hit the enter button...</div>)
                    }
                </div> 
            </>
        )
    }
}




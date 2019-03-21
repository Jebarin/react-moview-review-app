import React, {Component} from 'react';
import './pagination.css';

export default class PaginationComponent extends Component{

    constructor(props){
        super(props);

        //items limit per page
        this.itemsPerPage = 10;
        //pagination calculations
        this.initPageVariables(this.props);
       
        //default state values
        this.state = { 
            currentPage: 1,
            pages: this.calculatePages(1)
        }  
    }
    
    shouldComponentUpdate(nextProps, nextState){  
        //allow updating the component only if items added/removed or page changed
        //this will avoid unwanted calling calls to render function
        if(this.state.currentPage !== nextState.currentPage || this.props.totalItems !== nextProps.totalItems){ 
            return true;
        }
        return false;
    } 

    componentWillReceiveProps(newProps){  
        //Before updating pagination make sure there is a change in items 
        if(this.props.totalItems !== newProps.totalItems){ 
            //refresh the pagination
            this.initPageVariables(newProps); 
            const _page = this.totalPages !==0 &&  this.totalPages < this.state.currentPage ? this.totalPages  : this.state.currentPage;
            this.setState({pages: this.calculatePages(_page)});
        } 
    }

    initPageVariables(_props){
        //get the count of total items
        this.totalItems = _props.totalItems;
        //calculate total page size
        this.totalPages = Math.ceil(this.totalItems/this.itemsPerPage);  
    }

    calculatePages(_cp){
        /**
         * This function calculates the page numbers dynamically
         * @variable {number} btnLimit - Manage the number of buttons to display in UI
         * @variable {number} buffer - Manages the adjacent limit
         * @variable {array} _pages - List of page numbers
         */
        const btnLimit = 5;
        const buffer = 2;
        let _pages = []; 
        [...Array(this.totalPages).keys()].map((i)=>{ 
            //The page starts with 1 so make to increment i value
            const _page = i+1; 
            if(_pages.length < btnLimit && ( _page >= _cp-buffer ||  _page+btnLimit > this.totalPages) ){
                _pages.push(_page); 
            }
            return true;
        },this);
        return _pages; 
    }

    loadPage(type,_newPage){      
        //lod the next/prev page
        let currPage = this.state.currentPage;
        if(type === 'prev'){
            currPage = currPage-1;
        }
        else if(type === 'next'){
            currPage = currPage+1;
        }
        else{
            currPage = _newPage;
        }
        this.setState({currentPage: currPage});
        this.props.onChange(currPage);
    }  

    render (){   
        return ( 
            <div className="paginationContainer">
                {this.totalItems >2 && 
                    <ul className="pagination">
                        <li className={`page-item ${this.state.currentPage === 1 ? "disabled" : ""}`}>
                            <a className="page-link " href="javascript:void(0)" aria-label="Previous" onClick={()=>this.state.currentPage > 1 && this.loadPage('prev')}>
                                <span aria-hidden="true">&laquo;</span>
                                <span className="sr-only">Previous</span>
                            </a>
                        </li>
                        {this.state.pages.map((i)=>{
                            return (
                                <li className={`page-item ${this.state.currentPage === i ? "active" : ""}`} key={i}><a className="page-link" href="javascript:void(0)" onClick={()=>this.loadPage('new',i)}>{i}</a></li>
                            )
                        },this) } 
                        <li className={`page-item ${this.state.currentPage === this.totalPages ? "disabled" : ""}`}>
                            <a className="page-link" href="javascript:void(0)" aria-label="Next" onClick={()=>this.state.currentPage < this.totalPages && this.loadPage('next')}>
                                <span aria-hidden="true">&raquo;</span>
                                <span className="sr-only">Next</span>
                            </a>
                        </li>
                    </ul> 
                }
            </div>
        )
    }
} 
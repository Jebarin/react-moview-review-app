import {config} from '../../config/config';
import {storage} from '../../utils/storage';

export function getMovieData(id, _cbFun){

    const reqUrl = config.omdbapi_url+'?apikey='+config.omdbapi_key+'&i='+id;
    fetch(reqUrl)
    .then(function(response) {
        return response.json();
    })
    .then(function(myJson) {  
        _cbFun && _cbFun(myJson);
    });

}

export function saveReview(inputObj, _cbFun){
    //read existing ratings
    let ratings = storage.get('ratings') || [];
    const _index = getImdbIndex(ratings, inputObj.movieData.imdbID); 
    if(_index !==-1){
        ratings.splice(_index,1);
    } 
    ratings.push({
        'Title': inputObj.movieData.Title,
        'Year' : inputObj.movieData.Year,
        'Type' : inputObj.movieData.Type, 
        'Poster': inputObj.movieData.Poster,
        'imdbRating': inputObj.movieData.imdbRating,
        'usrRating': inputObj.usrRating, 
        'usrCategory':inputObj.usrCategory,
        'imdbID': inputObj.movieData.imdbID
    }); 
    storage.set('ratings', JSON.stringify(ratings));
    _cbFun && _cbFun();
}

function getImdbIndex(arr, value){
    return arr.findIndex(function(el) { 
        return el.imdbID === value;
    }); 
}
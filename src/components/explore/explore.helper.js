import {config} from '../../config/config';

export function searchMovies(val, pageNo, _cbFun){

    const reqUrl = config.omdbapi_url+'?apikey='+config.omdbapi_key+'&s='+val+'&page='+pageNo;
    fetch(reqUrl)
    .then(function(response) {
        return response.json();
    })
    .then(function(myJson) {  
        _cbFun && _cbFun(myJson);
    });

}
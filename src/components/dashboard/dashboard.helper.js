import {storage} from '../../utils/storage';
 
export function getRatings(_cbFun){
    //read existing ratings
    const ratings = storage.get('ratings') || [];
    _cbFun && _cbFun(ratings); 
} 
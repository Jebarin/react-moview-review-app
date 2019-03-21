import {storage} from './storage';

export function isLoggedIn(){
    return storage.get('isLoggedIn') === true ? true : false;
}
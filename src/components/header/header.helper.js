import {storage} from '../../utils/storage';

export function doLogout(){
    storage.set('isLoggedIn', false);
    window.location.href = '';
}
import FormValidator from '../../utils/form_validator';
import {storage} from '../../utils/storage';

export function formValidator(){ 
    const  validationRules = { 
        "email" : {
            field: "Email",
            rules: ["notEmpty","email","length_min","length_max"],
            args: {min: 3, max: 50}
        },
        "pwd" : {
            field: "Password",
            rules: ["notEmpty","password","length_min","length_max"],
            args: {min: 6, max: 50}
        }
    }
    return new FormValidator(validationRules);  
} 

export function doLogin(formData, _cb){

    //read profile data from localStorage
    let profData =  storage.get('profile');
    //base64 decode the data
    try{
        profData = JSON.parse(atob(profData));
    }
    catch(e){
        console.error('error in decoding profile data '+e);
    }
    
    //validate username and password
    if(profData && profData.email === formData.email && profData.pwd === formData.pwd){
        storage.set('isLoggedIn', true);
        _cb && _cb(true);
    }
    _cb && _cb(false); 
}
import FormValidator from '../../utils/form_validator';
import {storage} from '../../utils/storage';

export function formValidator(){ 
    const  validationRules = { 
        "name" : {
            field: "Name",
            rules: ["notEmpty","alphabets","length_min","length_max"],
            args: {min: 2, max: 50}
        },
        "email" : {
            field: "Email",
            rules: ["notEmpty","email","length_min","length_max"],
            args: {min: 3, max: 50}
        },
        "pwd" : {
            field: "Password",
            rules: ["notEmpty","password","length_min","length_max"],
            args: {min: 6, max: 50}
        }, 
        "cpwd" : {
            field: "Confirm Password",
            rules: ["notEmpty", "equal_to"],
            args: {field: "pwd"}
        },  
        "ph_num" : {
            field: "Contact Number",
            rules: ["notEmpty","length_min","length_max","phoneNumber"],
            args: {min: 10, max: 12}
        },
        "addr" : {
            field: "Address",
            rules: ["notEmpty","length_min","length_max"],
            args: {min: 6, max: 50}
        }
    }
    return new FormValidator(validationRules);  
}

export function doRegister(formData, _cb){
    //base64 encode the data
    const encodedProfData = btoa(JSON.stringify(formData));
    //save the profile data in localStorage
    storage.set('profile', encodedProfData);
    //set the login status flag
    storage.set('isLoggedIn', true);
    _cb && _cb();
}
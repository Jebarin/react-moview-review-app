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

export function updateProfile(formData, _cb){
    //base64 encode the data
    const encodedProfData = btoa(JSON.stringify(formData));
    //save the profile data in localStorage
    storage.set('profile', encodedProfData); 
    _cb && _cb();
}

export function getProfileData(_cbFun){
    let profileData = storage.get('profile');
    profileData = JSON.parse(atob(profileData));
    _cbFun &&  _cbFun(profileData);
}
class FormValidator{

    constructor(validations){  
        this.validations = validations; 
        this.failures = 0;
    }

    validationMsgs(){
        return {
            email: "Please enter a valid email in format. e.g:-name@domain.com", 
            password: ".\-#@$! are the only special characters allowed in ${field}", 
            alphabets: "Only alphabets are allowed in ${field}", 
            alphaNumeric: "Only alphabets and numbers are allowed in ${field}", 
            numeric: "Only numbers allowed in ${field} ", 
            notEmpty: "${field} cannot be empty!", 
            length_min: "Minimum min ${min} chars required for ${field} ",
            length_max: "Only max ${max} chars allowed for ${field} ",
            length_eql: "${field} field must contains ${eql} chars",
            phoneNumber: "${field} must be number.",
            equal_to: "${eql_to} and ${field} must match"
        }
    }
    validators(){
        return {
            email: function(val){
                if (!this.notEmpty(val))  return false;
                return /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i.test(val);  
            },

            password: function(val){
                if (!this.notEmpty(val)) return false;
                return /^[a-zA-Z0-9.\-#@$!]+$/.test(val);
            },

            phoneNumber: function(val){ 
                if (!this.notEmpty(val)) return false;
                return /^(\+|\d)[0-9]{7,16}$/.test(val);
            },
            
            alphabets: function(val){
                if (!this.notEmpty(val)) return false;
                return /^[a-zA-Z]+$/.test(val);
            },

            alphaNumeric: function(val){
                if (!this.notEmpty(val)) return false;
                return /^[a-zA-Z0-9]+$/.test(val);
            },

            numeric: function(val){
                if (!this.notEmpty(val)) return false;
                return /^[0-9]+$/.test(val);
            },

            notEmpty: function(val){
                return (typeof val != 'undefined' && val) ? true : false;
            },

            length_min: function(val, arg){
                if (!this.notEmpty(val)) return false; 

                if(arg && arg.min ){
                    return val.length >= arg.min;
                }

                return true;
            },

            length_max: function(val, arg){
                if (!this.notEmpty(val)) return false;
   
                if(arg &&  arg.max ){
                    return val.length <= arg.max;
                } 
                return true;
            },

            length_eql: function(val, arg){
                if (!this.notEmpty(val)) return false;
   
                if(arg &&  arg.eql ){
                    return val.length == arg.eql;
                } 
                return true;
            },

            equal_to: function(val, arg, valObj){
                if (!this.notEmpty(val)) return false;

                if(valObj && arg.field && valObj[arg.field] && valObj[arg.field].value !== val){
                    return false;
                }

                return true;
            }
        }
    }

    _validate(inputObj, val){  
        let _rules = inputObj.rules;
        if(!_rules) return;

        let _validators = this.validators();
        let _valMsgs = this.validationMsgs();
        for(let i=0; i<= _rules.length; i++){
            let  item = _rules[i]; 
            if(_validators[item]){
               let res =  _validators[item](val, inputObj.args, this.validations); 
               inputObj.value = val;
               inputObj.isValid = res;
               inputObj.error_msg = "";
               if(!res){
                    this.failures++;
                    inputObj["error_msg"] = inputObj.custom_msg ? inputObj.custom_msg : (_valMsgs[item] ? this.formatErrMsg(_valMsgs[item], inputObj)  : "Invalid value entered for "+ inputObj.field);
                    break;
                    
               }
            } 
        }
    }

    formatErrMsg(msg, input){
        return  msg.replace('${field}',input.field)
                .replace('${min}', input.args && input.args.min)
                .replace('${max}', input.args && input.args.max)
                .replace('${eql}', input.args && input.args.eql)
                .replace('${eql_to}', input.args && input.args.field && this.validations[input.args.field].field); 
    }

    validate(field, _state){
        let _slef = this;
        _slef.failures = 0;
        let valObj = _slef.validations[field]; 
        if(valObj){
            _slef._validate(valObj, _state);
        }
        else{
            for(let item in this.validations  ){
                if(_state && _state.hasOwnProperty(item)){
                    _slef._validate( this.validations[item], _state[item]);
                }
            } 
        }

        return this.validations;
    } 

    isValid(){ 
        return (this.failures ==0 ) ? true : false;
    }

    resetErrors(){ 
        let valObj = this.validations;
        for(let item in valObj  ){
            if(item){
                delete valObj[item].error_msg;
                delete valObj[item].isValid;
                delete valObj[item].value;
            }
        }
        this.failures = 0;
    }
}
export default FormValidator;
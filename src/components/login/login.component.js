import React, {Component} from 'react';  
import  {formValidator, doLogin} from './login.helper';

export default class LoginComponent extends Component{

    constructor(props){
        super(props);

        //default state
        this.state = { 
            formFields: {
                email: '',
                pwd : ''
            },
            isformErr: false
        }

        //init form validator
        this.validator = formValidator();  
    } 

    handleInputChange(elem){    
        //perform form validations on input change
        if(this.validator.validations[elem.name]){
            this.validator.validate(elem.name, elem.value);
        } 

        //update the value in state obj
        let _formData = this.state.formFields;
        _formData[elem.name] = elem.value;
        this.setState({formFields: _formData, isformErr: false});   
    }

    handleFormSubmit(){  
        //validate and submit the form 
        this.validator.validate(null, this.state.formFields);
        if(!this.validator.isValid()){   
            this.forceUpdate();
        } 
        else{ 
            doLogin(this.state.formFields, (loginStatus)=>{
                if(loginStatus){
                    //redirect if login success
                    window.location.href = 'dashboard';
                }
                else{
                    this.setState({isformErr: true});
                } 
            });
        } 
    }  

    render(){

        const state = this.state;
        const validation = this.validator.validations;  
  
        return (  
            <div className="row login-form">
                <div className="col-md-12">
                    {state.isformErr && 
                        <div className="alert alert-danger">
                            <strong>Error!</strong> Invalid email address or password
                        </div>
                    }
                    <div className="form-group">
                        <input type="email" className="form-control" placeholder="E-mail *" name="email" value={state.formFields.email} onChange={(e)=>{  this.handleInputChange(e.target)}}  />
                        <small className="error_msg_block">{validation.email.error_msg}</small>
                    </div> 
                    <div className="form-group">
                        <input type="password" className="form-control" placeholder="Password *" name="pwd" value={state.formFields.pwd} onChange={(e)=>{  this.handleInputChange(e.target)}}  />
                        <small className="error_msg_block">{validation.pwd.error_msg}</small>
                    </div> 
                    <div className="form-group">
                        <center><input type="button" className="customBtn "  value="Login"   onClick={()=>this.handleFormSubmit()} /></center> 
                    </div> 
                </div> 
            </div> 
        )
    }
}
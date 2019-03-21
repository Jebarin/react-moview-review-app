import React, {Component} from 'react';   
import  {formValidator, doRegister} from './register.helper';

export default class RegisterComponent extends Component{

    constructor(props){
        super(props);

        //default state
        this.state = { 
            formFields: {
                name: '',
                email: '',
                pwd : '',
                ph_num: '',
                addr: '',
                cpwd:'' 
            },
            isRegSuccess: false
        }

        //init form validations
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
        this.setState(_formData);   
    }

    handleFormSubmit(){   
        //validate and submit form
        this.validator.validate(null, this.state.formFields);
        if(!this.validator.isValid()){   
            this.forceUpdate();
        } 
        else{ 
            doRegister(this.state.formFields, ()=>{
                this.setState({isRegSuccess: true});
                setTimeout(function(){
                    //redirect on registration success
                    window.location.href = 'dashboard';
                }, 2000); 
            });
        } 
    }  

    render(){

        const state = this.state;
        const validation = this.validator.validations;  
  
        return ( 
            <div className="row register-form">
                <div className="col-md-12">
                    <div className="form-group">
                        <input type="text" className="form-control" placeholder="Name *" name="name" value={state.formFields.name} onChange={(e)=>{  this.handleInputChange(e.target)}}   />
                        <small className="error_msg_block">{validation.name.error_msg}</small>
                    </div>
                    <div className="form-group">
                        <input type="email" className="form-control" placeholder="E-mail *" name="email" value={state.formFields.email} onChange={(e)=>{  this.handleInputChange(e.target)}}   />
                        <small className="error_msg_block">{validation.email.error_msg}</small>
                    </div>
                    <div className="form-group">
                        <input type="tel" className="form-control" placeholder="Contact No *" name="ph_num" value={state.formFields.ph_num} onChange={(e)=>{  this.handleInputChange(e.target)}}  />
                        <small className="error_msg_block">{validation.ph_num.error_msg}</small>
                    </div>
                    <div className="form-group">
                        <textarea   className="form-control" placeholder="Address *" name="addr" value={state.formFields.addr} onChange={(e)=>{  this.handleInputChange(e.target)}}  ></textarea>
                        <small className="error_msg_block">{validation.addr.error_msg}</small>
                    </div>
                    <div className="form-group">
                        <input type="password" className="form-control" placeholder="Password *" name="pwd" value={state.formFields.pwd} onChange={(e)=>{  this.handleInputChange(e.target)}} />
                        <small className="error_msg_block">{validation.pwd.error_msg}</small>
                    </div>
                    <div className="form-group">
                        <input type="password" className="form-control"  placeholder="Confirm Password *" name="cpwd" value={state.formFields.cpwd} onChange={(e)=>{  this.handleInputChange(e.target)}}  />
                        <small className="error_msg_block">{validation.cpwd.error_msg}</small>
                    </div> 
                    <div className="form-group">
                        <center><input type="button" className="customBtn "  value="Register"  onClick={()=>this.handleFormSubmit()}/></center> 
                    </div> 
                </div> 

                {state.isRegSuccess && 
                <div className="alert alert-success">
                    <strong>Success!</strong> Your Account Created Successfully. We will redirect you to Dashboard.
                </div>
                }

            </div>
        )
    }
}
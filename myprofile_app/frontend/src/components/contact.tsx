import React, {Component, SyntheticEvent} from 'react';
import {Link} from "react-router-dom";

import axios from 'axios';
import * as Icon from 'react-feather';
import IndexHoc from "./index"
import TextareaAutosize from 'react-autosize-textarea';


interface State {
	form:object,
    errors:object,
    submitting:boolean,
    formHasErrors:boolean,
}

class ContactContainer extends Component<State> {
    private isFullyMounted: boolean = false;

    static defaultProps: object = {
       
    };

    readonly state: State = {
    	form   : {name:'', email:'', message:''},
        errors : {},
        submitting :false,
        formHasErrors : false,
    };

    static getDerivedStateFromError(){

    }

    componentWillUnmount() {
        this.isFullyMounted = false; 
        this.setState = (state,callback)=>{
        return;
    };
       
    };
    
    componentDidMount() {
        //console.log(this.props)
        this.isFullyMounted = true;       
    }


    handleChange = (e:SyntheticEvent) => {
        e.preventDefault();
        let {form} = this.state;
        form[e.target['name']] = e.target['value'];
        this.setState({form})
    }

    setFormErrors =(errors:object)=>{
        this.setState({...errors})
    }

    handleSubmit =(e)=>{
       
        e.preventDefault()
        e.stopPropagation()
        
        let {form} = this.state;
        let validatedForm = this.validateForm(form)
        
        if (validatedForm['formHasErrors']) {
            let errors = this.setFormErrors(validatedForm)
            return
        };
        
        
       // this.isFullyMounted && this.setState({submitting:true})
        axios.post('/send/message/', form)
        .then(response => {
            console.log(response) 
            let data = response.data
            this.setState({submitting:false})
        })
        .catch(error => {
            
            if (error.response) {
                console.log(error.response)  

            }else if(error.request){
                console.log(error.request)  
            }
            this.setState({submitting:false})
        })
        
    }

    validateForm(form?:object){
        if (!this.isFullyMounted) return;

        if (!form) form = this.state.form;
            
        let errors:object = {};
        let formHasErrors = false;
        
        for (let key in form) {
            if(/^ *$/.test(form[key])){
                
                let errorKey  = key.charAt(0).toUpperCase() + key.slice(1);
                errors[key]   = errorKey + ' cannot be empty.';
                formHasErrors = true
                
            }
        }

        let validatedForm:object = {formHasErrors, errors}
        return validatedForm
    }

    getTextAreaProps(){
        let {form} = this.state;
        
        return {
           value       : form['message'],
           onChange    : this.handleChange,
           name        : "message",
           className   : "textarea-field",
           placeholder : '',
        }
    }

    render() {
    	let props = {
            textAreaProps : this.getTextAreaProps(),
            handleChange  : this.handleChange.bind(this),
            handleSubmit  : this.handleSubmit.bind(this),
            validateForm  : this.validateForm.bind(this),
            ...this.props,
            ...this.state
        }

    	return(
    		<ContactContents {...props}/>
    	)
    }
}

export default IndexHoc(ContactContainer);




const ContactContents:React.FC<{styles?:React.CSSProperties}>  = props => {
    
    return (
        <div style={props.styles} id="app-contents" className="app-contents">
            <div className="contents-header">
                <div className="">
                    <ul className='contents-title'>
                        <li className=''>Contact</li>
                    </ul>

                </div>
            </div>
           
            <div className="contents-box">
                <div className="contact-box">
                    <ContactForm {...props}/>
                    <ContactInfo {...props}/>
                </div>
            </div>
        </div>
    )
}



const ContactForm  = props => {
    let {submitting, validateForm} = props
    let validatedForm = validateForm()
    let formHasErrors = validatedForm && validatedForm['formHasErrors']
    let submitBtnStyles = submitting || !formHasErrors && {'opacity':1} || {};

    return(
        <form onSubmit={props.handleSubmit} className="contact-form">
                     
            <div className="form-contents">
                <ul className="contact-title">
                    <li>Contact <span>Form</span></li>
                </ul>

                <div className="input-box">
                    <div>
                    <button type="button" className="input-icon-btn">
                        <Icon.User className="" size={25} color={'gray'}/>
                    </button>
                    </div>
                    <input
                        type="text"
                        placeholder="" 
                        className="contact-input"
                        name="name"
                        value={props.form?.name}
                        onChange={props.handleChange}
                    />
                    <span className="floating-label">Full Name</span>
                </div>
            

                <div className="input-box">
                    <div>
                    <button type="button" className="input-icon-btn">
                        <Icon.Mail className="" size={25} color={'gray'} />
                    </button>
                    </div>
                    <input
                        type="text"
                        placeholder="" 
                        className="contact-input"
                        name="email"
                        value={props.form?.email}
                        onChange={props.handleChange}
                    />
                    <span className="floating-label">Email Address</span>
                </div>
        
                <div className="input-box">
                    <div>
                        <button type="button" className="input-icon-btn">
                            <Icon.MessageCircle className="" size={20} color={'gray'}/>
                        </button>
                    </div>
                    <TextareaAutosize {...props.textAreaProps} rows={2}/>
                    <span className="floating-label">Message for Me</span>
                </div>

                <div className="message-submit-box">
                    <button type="submit"
                        style={submitBtnStyles} 
                        disabled={submitting || formHasErrors}
                        
                        className="btn message-submit-btn">
                        Send Mesage
                    </button>
                </div> 
            </div> 
        </form>
    )
}


export const ContactInfo = props => {

    return(
        <div className="contact-info-box">
            <ul className="contact-title">
                <li>Get in <span>touch</span></li>
            </ul>
            <div className="direct-contact-box">
                <div className="contact-info">
                    <ul>
                        <button type="button" className="contact-icon-btn">
                            <Icon.Phone 
                                className="" 
                                size={20}
                                color={'#558FF0'}
                            />
                        </button>
                    </ul>
                    <ul>
                        <li className="">+27 67 101 6124</li>
                    </ul>
                </div>

                <div className="contact-info">
                    <ul>
                        <button type="button" className="contact-icon-btn">
                            <Icon.Mail 
                                className="" 
                                size={20}
                                color={'#558FF0'}
                            />
                        </button>
                    </ul>
                    <ul>
                        <li className="">silassibaloy@gmail.com</li>
                    </ul>
                </div>
            </div>
            <div className="social-contact-box">
                <ul className="social-connect-title">
                    <li>
                        Feeling social? Find me on these online spaces too!
                    </li>
                </ul>
                <div className="social-connect-btn-box">
                    <ul className="social-connect-btns">
                        <li className="">    
                            <a href="https://twitter.com/SilasiBaloyi"
                               type="button"
                               target="_blank"
                               className="twitter-link">
                                <Icon.Twitter 
                                    className="social-icon" 
                                    size={25}
                                    color={'#C45E06'}
                                />
                            </a>
                        </li>

                        <li className="">      
                            <a href="https://github.com/silasseB"
                               type="button"
                               target="_blank"
                               className="twitter-link">
                                <Icon.GitHub 
                                    className="social-icon" 
                                    size={25}
                                    color={'#C45E06'}
                                />
                            </a>                          
                        </li>
                        <li className="">    
                            <a href="https://www.linkedin.com/in/silasi-valoi/"
                               type="button"
                               target="_blank"
                               className="twitter-link">
                                <Icon.Linkedin 
                                    className="social-icon" 
                                    size={25}
                                    color={'#C45E06'}
                                />
                            </a>                                    
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}




/*
<div className="section-title-box">
                <ul className='contact-form-description'>
                    <li>
                        Dropping a line to say g’day, ask for my resume
                        or see if we can build something amazing together?
                        I’d love to hear from you! Use the form below. 
                    </li>
                </ul>
            </div>
*/
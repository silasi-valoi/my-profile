import React, {Component} from 'react';
import axios from 'axios';
import IndexHoc from "./index"
import ProfilePicture from 'media/silas-dev.jpg'


interface Props {
    profile:object;
    home:object;
    
}

interface State {
    home?:object;
    profile?:object;
    className?:string;
};

class Home extends Component<Props, State> {
     private isFullyMounted: boolean = false;

    static defaultProps: object = {
       
    };

    readonly state: State = {
             
    };

    public get isMounted() {
        return this.isFullyMounted;
    } 

    public set isMounted(value:boolean) {
        this.isFullyMounted = value;
    }

    constructor(props) {
        super(props);
       
    };
  

    // static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    //  return  dispatch => action.handleError(error);
    // }

    componentDidCatch(error, info) {
        // You can also log the error to an error reporting service
        console.log(error, info);
    }
  

    componentWillUnmount() {
        this.isMounted = false;
    };
    
    componentDidMount() {
        this.isMounted = true;
        this.getProfileContents()
    };
   
   
    getProfileContents(){
        
        axios.get('/index/')
        .then(response => {
            console.log(response) 
            let data = response.data
            if (data) {
                let home = data.home[0]
                let profile = data.profile[0]
               
                this.setState({profile, home})  
            }
            
        })
        .catch(error => {
            console.log(error)  
        })
    }
        
    render() {
        let props = {...this.props, ...this.state};

        return (
            <HomePageTemplate {...props}/>
        );
    };
};

export default IndexHoc(Home);



const HomePageTemplate:React.FC<{profile?:object, styles?:object}>  = props => {
    let {profile, styles} = props;
    
    return(
        <div style={styles} id="app-contents" className="app-contents">
            <div className="contents-header">
                <div className="about-profile-pic-box">
                    <div className="profile-pic-box">
                        <img src={ProfilePicture}
                             alt=""
                             loading="lazy" 
                            className="profile-pic"/> 
                    </div>
                </div>
                <div className="contents-header-2">
                    <div className="full-name-box">
                        <ul className="full-name">
                            <li>Silasi V</li>
                        </ul>
                        <ul className="profile-title">
                            <li>FullStack Web Developer</li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="contents-box">
                <div id="about-contents" className="about-contents">
                    <div className="about-text-box">
                       <ul className="about-title">
                           <li>About <span>Me</span></li>
                       </ul> 
                        <ul className="about-text">
                            <li>
                                Versatile self-taught Web Application Developer with 4 years handling 
                                full-stack development duties for clients. Acquainted with dominant 
                                programming languages, protocols, and platforms needed to launch successful 
                                web applications. Adept at creating software that simultaneously pleases users,
                                marketers and security personnel.
                            </li>
                        </ul>
                    </div>

                    <div className="credentials-box">
                        <ul className="credentials-contents">
                            <li>Age</li><li>30++</li>
                        </ul>
                        
                        <ul className="credentials-contents">
                            <li>Residence</li> <li>South Africa</li>
                        </ul>
                        <ul className="credentials-contents">
                            <li>Email</li>
                            <li className="text-highlight">silassibaloy@gmail.com</li>
                        </ul>
                        <ul className="credentials-contents">
                            <li>Freelance</li> <li>Available</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}



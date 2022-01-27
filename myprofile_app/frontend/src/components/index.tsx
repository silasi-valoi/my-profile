import React, {Component, ReactEventHandler} from 'react';
import axios from 'axios';
import { MatchMediaHOC } from 'react-match-media';
import {history} from '../App';
import {NavBarTemplate} from 'templates/navigation-bars'

export const TabStyles:React.CSSProperties = {
    borderBottom:'2px solid #F505C6',
    opacity:0.60,
};

const SlideFromRight:object = {
        transition : {
            property : 'all',
            duration : 300,
            timingfunction : 'cubic-bezier(0.25, 0.5, 0.5, 0.9)'
        },
        begin : {
           'transform': 'translateX(35%)',
           'opacity': 0
        },
        end : {
           'transform': 'translateX(0)',
           'opacity': 1
        },
        hidden : {
            diplay:'block'
        }
};
let transition:object = SlideFromRight['transition'];

let transition_style:object = {
        'transition': transition['property']+' '
        +(transition['duration'] / 1000) + 's'+' '+transition['timingfunction']
    };


type Props = {
    tabStyles?:object;
    styles?:React.CSSProperties;
    changeRouter?: (url:string, state?:object)=> void;
};

interface State {
    home?:object;
    profile?:object;
    className?:string;
    pageContents?:object;
    Contents?:any;
    effect:object;
    changing?:boolean;
    tabStyles?:object;
}

export function IndexHoc(Component) {
    
	return class Index extends Component<State, Props> {
    	private isFullyMounted: boolean = false;

    	static defaultProps: object = {
       
    	};

    	readonly state: State = {
            effect:SlideFromRight,
            changing:false,
        };

        public get isMounted() {
            return this.isFullyMounted;
        }; 

        public set isMounted(value:boolean) {
            this.isFullyMounted = value;
        }

        constructor(props:any) {
            super(props);
        };


        componentDidCatch(error, info) {
            // You can also log the error to an error reporting service
            //console.log(error, info);
        }
   
        matchMediaSize(mediaSize:string): boolean{
            let size = `(${mediaSize})`;
            return window.matchMedia(size).matches;
        }

        componentWillUnmount() {
            this.isMounted = false;
            document.removeEventListener('scroll', this.handlePageScroll) 
        };
    
        componentDidMount() {
            this.isMounted = true;
            document.addEventListener('scroll', this.handlePageScroll)
            //window.onpopstate = (event) => {
            //    console.log(this.props, 'is poping')
            //}

            this.setTabStyles()
                        
            if (this.matchMediaSize("max-width : 980px")) {
                this.setState({className:'fixed-top'})   
            }
        };

        setTabStyles():void {
            let pathName = this.props.location.pathname 

            switch (pathName) {
                case '/':
                    this.UpdateStyleTab('homeTab')
                    break;
            
                case '/skills/':
                    // code...
                    this.UpdateStyleTab('skillsTab')
                    break;

                case '/portfolio/':
                    // code...
                    this.UpdateStyleTab('portfolioTab')
                    break;

                case '/contact/':
                    // code...
                    this.UpdateStyleTab('contactTab')
                    break;
                default:
                    break
            };
        };

        UpdateStyleTab(key:string):void {
            let tabStyles:object = {};
            tabStyles[key] = TabStyles
            this.setState({tabStyles})
        };
   
        toggleMenu():void {
            let hamburger = document.getElementById("hamburger")
            if (hamburger) hamburger['checked'] = false;
        };
   

        changeRouter(url:string, state?:object):void {
            this.toggleMenu()
            let currentUrl:string = this.props.match.url;
      
            if (currentUrl === url) {
                return;
            }

            this.setState({changing:true});
            setTimeout(()=> history.push(url, state), 500);
        };


    handlePageScroll =(e)=>{
        if (this.matchMediaSize("max-width:980px")) {
           return this.setState({className:'fixed-top'})
        }

        let documentBody = document.body;
        let clientBody = documentBody.getBoundingClientRect()
        let Elem    = document.getElementById('app-container');
        let client = Elem?.getBoundingClientRect()
     
        if (window.scrollY !== 0) {
            if (!this.state.className) {
                this.setState({className:'fixed-top on-scroll'})
            }

        }else {
            this.setState({className:''})
        }
    }   
    
    getProps(){
        let {effect, changing} = this.state;
        
        let styles =  Object.assign({},
                         effect['transition'],
                         changing? effect['begin']:effect['end']);
        return {
            styles,
            changeRouter    : this.changeRouter.bind(this),
            ...this.props,
            ...this.state,
    
        };
    };

    render() {
        let props = this.getProps();
        let {effect} = props;
        let styles =  Object.assign({}, effect?.transition,effect?.end);
          
        return (
            <div id="app-container" className="app-container">
                <NavBarTemplate {...props}/>
                <Component {...props}/>
                <FooterTemplate/>
            </div>
        );
    };
};
};

export default IndexHoc;




const FooterTemplate:React.FC = () =>{
    return(
        <div className="copyright-box">
            <ul className="copyright-text">
                <span className='copyright-symbol'>&#169;</span>
                <li>
                    2020 | Designed & coded by Silasi Valoi
                </li>
            </ul>
        </div>
    )
}
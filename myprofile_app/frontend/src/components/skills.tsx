import React, {Component} from 'react';
import IndexHoc from "./index"
import DevIcon from "devicon-react-svg";


interface Props {
    profile:object;
    home:object;
    
}

interface State {
	pageContents?:object;
    Contents?:any;
}

class SkillsContainer extends Component<Props, State> {
    private isFullyMounted: boolean = false;

    static defaultProps: object = {
       
    };

    readonly state: State = {
    	       
    };

    componentWillUnmount() {
       
    };
    
    componentDidMount() {

    }

    render() {
    	let props = {...this.props, ...this.state}
    	return(
    		<SkillsTemplate {...props}/>
           
    	)
    }
}

export default IndexHoc(SkillsContainer);


 const devIconStyle:React.CSSProperties = {
        fill: "thistle",
        width: "50px",
    };

const SkillsTemplate  = props => {


    return(
        <div style={props.styles} id="app-contents" className="app-contents">
            <div className="contents-header">
                <div className="">
                    <ul className='contents-title'>
                        <li className=''>Tools & Skills</li>
                    </ul>
                </div>
            </div>

            <div className="contents-box">
                <div className="tools-contents">
                    <ul className='description-text'>
                        <li className=''>
                           These are tools I'm skilled on and use
                           to develop systems with .     
                        </li>
                    </ul>
                    <ToolsIcons {...props}/>
                </div>
            </div>
        </div>
    )

}

const ToolsIcons:React.FC   = props => {
    return(
        <div className="tools-and-skills-icons">
            <ul className="skill">
                <DevIcon icon="python" style={devIconStyle}/>
                <li className="icon-name">
                    Python
                </li>
            </ul>
            <ul className="skill">
                <DevIcon icon="mysql" style={devIconStyle}/>
                <li className="icon-name">
                    Mysql
                </li>
            </ul>

            <ul className="skill">
                <DevIcon icon="linux" style={devIconStyle}/>
                <li className="icon-name">
                    Linux
                </li>
            </ul>

            <ul className="skill">
                <DevIcon icon="javascript" style={devIconStyle}/>
                <li className="icon-name">
                    JavaScript
                </li>
            </ul>
            <ul className="skill">
                <DevIcon icon="django" style={devIconStyle}/>
                <li className="icon-name">
                    Django
                </li>
            </ul>

            <ul className="skill">
                <DevIcon icon="react" style={devIconStyle}/>
                <li className="icon-name">
                    React
                </li>
            </ul>
                   
            <ul className="skill">
                <DevIcon icon="webpack" style={devIconStyle}/>
                <li className="icon-name">
                    Webpack
                </li>
            </ul>

            <ul className="skill">
                <DevIcon icon="html5" style={devIconStyle}/>
                <li className="icon-name">
                    HTML5
                </li>
            </ul>

            <ul className="skill">
                <DevIcon icon="css3" style={devIconStyle}/>
                <li className="icon-name">
                    CSS3
                </li>
            </ul>

            <ul className="skill">
                <DevIcon icon="bootstrap" style={devIconStyle}/>
                <li className="icon-name">
                    Bootstrap
                </li>
            </ul>

            <ul className="skill">
                <DevIcon icon="jquery" style={devIconStyle}/>
                <li className="icon-name">
                    JQuery
                </li>
            </ul>
            <ul className="skill">
                <DevIcon icon="git" style={devIconStyle}/>
                <li className="icon-name">
                    git
                </li>
            </ul>
                  
            <ul className="skill">
                <DevIcon icon="github" style={devIconStyle}/>
                <li className="icon-name">
                    Github
                </li>
            </ul>
        </div>
    )
}
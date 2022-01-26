import React, {Component} from 'react';
import IndexHoc from './index';
import * as wiplayitMockSmall from 'media/wiplayit-mock-small.png';
import * as wiplayitMockBig from 'media/wiplayit-mock-big.png';


class PortfolioContainer extends Component {
    private isFullyMounted: boolean = false;

    static defaultProps: object = {
       
    };

    componentWillUnmount() {
       
    };
    
    componentDidMount() {
    }

    render() {
    	let props = {...this.props, ...this.state}
    	return(
    		<PortfolioTemplate {...props}/>
    	)
    }
}

export default IndexHoc(PortfolioContainer);

const PortfolioTemplate:React.FC<{styles?:object}>   = props => {
    //console.log(props)

    return(
        <div style={props.styles} id="app-contents" className="app-contents">
            <div className="contents-header">
                <div className="">
                    <ul className='contents-title'>
                        <li className=''>Portfolio</li>
                    </ul>
                </div>
            </div>
            <div id="contents-box" className="contents-box">
                <div className="contents">
                    <ul className="section-title-box">
                        <li className="section-description">
                            A Selection Of Stuff I've Built
                        </li>
                    </ul>
                    <div className="portfolio-contents">
                        <div className="desktop-item-box">
                            <div className="portfolio-item-desktop">
                                <img 
                                    alt=""
                                    src={wiplayitMockBig} 
                                    className="img-big"/>
                            </div>
                        </div>

                        <div className="portfolio-item-mobile">

                            <img 
                                alt=""
                                src={wiplayitMockSmall} 
                                className="img-small"/>
                        </div>
                        <div className="portfolio-details">
                            <div className="portfolio-details-items">
                                <ul className="details-title">
                                    <li>Soccer Lovers Social Network</li>
                                </ul>

                                <ul className="details-text">
                                    <li>Social Network for football lovers. 
                                        The platform aim to connect fans and professinals
                                        to share information by asking 
                                        <span> Questions</span> and <span>Answers </span> 
                                        about anything concerning football. 
                                    </li>
                                </ul>
                                <ul className="portfolio-links">
                                    <li className="">    
                                        <a href="https://baloyi.pythonanywhere.com"
                                           type="button"
                                           target="_blank"
                                           className="twitter-link">
                                           View It Here
                                        </a>
                                    </li>
                                    <li className="">    
                                    <a 
                                        href="https://github.com/silasseB/wiplay-it-project"
                                           type="button"
                                           target="_blank"
                                           className="twitter-link">
                                           View Github Rep
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}
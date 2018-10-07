import React,{Component} from 'react';
import ReactDOM from 'react-dom';

import './index.css'
import PlayStoreImage from './Images/playstore.png'
import AppStoreImage from './Images/appstore.png'
import PowerImage from './Images/electricity.png'

class App extends Component {
    render() {
        return(
            <React.Fragment>
                <div className='content'>
                    <img src={PowerImage} alt='appstore' width='200px'/>
                    <h1>May Power Ga?</h1>
                </div>
                
                <div className='store'>
                    <h3>AVAILABLE ON</h3>
                    <img src={PlayStoreImage} alt='playstore' onClick={() => alert('heloo')} />
                    <img src={AppStoreImage} alt='appstore'/>
                </div> 
            </React.Fragment>
         
        )
    }
}

ReactDOM.render(<App />, document.getElementById('root'));


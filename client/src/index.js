import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import './index.css'
import PlayStoreImage from './Images/playstore.png'
import AppStoreImage from './Images/appstore.png'
import PowerImage from './Images/electricity.png'
import 'antd/dist/antd.css'
import { Card, Icon, Avatar } from 'antd';

const { Meta } = Card;

class App extends Component {
    render() {
        return (
            <React.Fragment>
                <div style={{display: 'flex', textAlign: 'center', flexDirection: 'column'}}>
                    <div style={{flex: 1, display: 'flex', flexDirection: 'row'}}>

                        <div style={{flex: 1,  color: '#fff',background: '#000',}}>
                        <img src={PowerImage} width = '200'/>
                        <strong>May Power Ga?</strong>
                        <p> An Ecosystem of hassle-power Power Outage Management</p>
                        </div>
                        <div style={{flex: 1, background: '#fff', color: 'gray'}}>
                        <h1><Icon type="compass" theme="twoTone" /> Outage Locator</h1>
                        
                        <input type="text" placeholder='search location'/>
                        </div>
                    </div>
                    <div style={{flex: 1, background: '', borderTop: '1px solid #555'}}>
                    <h1><Icon type="download" theme="outlined" /> Download the App (23MB)</h1>
                    <strong><a href="http://g.co">com.valinotech.maypowerga.apk</a></strong>
                    </div>

                
                </div>
            </React.Fragment>

        )
    }
}

ReactDOM.render(<App />, document.getElementById('root'));


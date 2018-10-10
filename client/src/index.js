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
                <Card
                    style={{ width: 300 }}
                    cover={<img alt="example" src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png" />}
                    actions={[<Icon type="setting" />, <Icon type="edit" />, <Icon type="ellipsis" />]}
                >
                    <Meta
                        avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                        title="Card title"
                        description="This is the description"
                    />
                </Card>
            </React.Fragment>

        )
    }
}

ReactDOM.render(<App />, document.getElementById('root'));


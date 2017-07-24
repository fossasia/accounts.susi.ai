import React, { Component } from 'react';
import { Menu, Icon } from 'antd';
import {Link} from 'react-router-dom';

const styles={
    sidebar: {
        display: 'flex',
        alignItems : 'center',
        flexDirection: 'column',
        width: '240px',
        background: '#37474F',
        zIndex: 10
    },
    logo: {
        width: '150px',
        padding: '20px'
    }
}


export default class Sidebar extends Component {
    state={
        theme: 'dark',
        current: '1',
    }

    handleClick=(e)=>{
        console.log('click ', e);
        this.setState({
            current: e.key,
        });
    }
    render() {
        return (
            <div style={styles.sidebar}>
                <Link to="/">
                    <img style={styles.logo} src={'../images/susi-white.png'}  alt=""/>
                </Link>

                <Menu
                    theme={this.state.theme}
                    onClick={this.handleClick}
                    style={{ width: 240 , backgroundColor:'#607D8B'}}
                    defaultOpenKeys={['sub1']}
                    selectedKeys={[this.state.current]}
                    mode="inline"
                >
                    <Menu.Item key="Client 1">
                        <Icon type="client" />
                        Client 1
                        <Link to="/client"></Link>
                    </Menu.Item>

                </Menu>
            </div>
        );
    }
}

import React, { Component, useState } from 'react';
import ReactDOM from 'react-dom';
import BasicDashboard from './Dashboard/Basic/index.js';
import IgDashboard from './Dashboard/ig.js';
import styles from './Dashboard/Basic/index.css';

import LoginHOC from 'react-facebook-login-hoc'

const configureLoginProps = {
    scope: 'public_profile',
    xfbml: false,
    cookie: false,
    version: 8.0,
    language: 'en_US',
    appId: '1079944885546437'
}
class FacebookBtn extends Component {
    constructor(props) {
        super(props)
        this.status = this.props.fb.status
        this.login = this.props.fb.login
        this.logout = this.props.fb.logout
        this.state = {
            isFBLogIn: false
        }
    }

    getStatus(response) {
        if (response.authResponse) {
            this.responseApi.call(this, response.authResponse)
            this.setState({ isFBLogIn: true })
            ReactDOM.render(
                <div>
                    <BasicDashboard/>
                    <IgDashboard />
                    <script><link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta.2/css/bootstrap.min.css" integrity="sha384-PsH8R72JQ3SOdhVi3uxftmaW6Vc51MKb0q5P2rRUpPvrszuE4W1povHYgTpBfshb" crossOrigin="anonymous"></link></script>
                </div>, document.getElementById('fb')
            )
        }
    }
    responseApi(res) {
        console.log('token:', res.accessToken)
    }
    checkLoginState() {
        this.status(this.getStatus.bind(this))
    };
    loginFacebook() {
        this.login(this.getStatus.bind(this));
    }
    logoutFacebook() {
        this.setState({ isFBLogIn: false })
        this.logout();
        ReactDOM.render(
            <div></div>, document.getElementById('fb')
        )
    }
    render() {
        return (
            <div>
                <button style={{"background-color": "#4267B2", "color": "white", "padding":"10px"}} onClick={this.state.isFBLogIn ? this.logoutFacebook.bind(this) : this.loginFacebook.bind(this)}><i class="fa fa-facebook"></i> &nbsp; {this.state.isFBLogIn ? 'Facebook Logout' : 'Facebook Login'}</button>
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
            </div>
        );
    }
}

export default LoginHOC(configureLoginProps)(FacebookBtn);


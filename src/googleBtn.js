import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import DashBoard from './Dashboard/dashboard.js';

const CLIENT_ID = '';
var called = false;

class GoogleBtn extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLogined: false,
            accessToken: ''
        };

        this.login = this.login.bind(this);
        this.handleLoginFailure = this.handleLoginFailure.bind(this);
        this.logout = this.logout.bind(this);
        this.handleLogoutFailure = this.handleLogoutFailure.bind(this);
    }

    login(response) {
        ReactDOM.render(
            <>
                <DashBoard />
            </>,
            document.getElementById('google')
        )
        called = true;
        this.setState(state => ({
            isLogined: true
        }));
    }

    logout(response) {
        ReactDOM.render(
            <></>, document.getElementById('google')
        )
        this.setState(state => ({
            isLogined: false,
        }));
    }

    handleLoginFailure(response) {
        alert('Failed to log in')
    }

    handleLogoutFailure(response) {
        alert('Failed to log out')
    }

    render() {
        return (
            <>
            <div>
                    {this.state.isLogined ?
                        <GoogleLogout
                            clientId={CLIENT_ID}
                            buttonText='Logout'
                            onLogoutSuccess={this.logout}
                            onFailure={this.handleLogoutFailure}
                        >
                        </GoogleLogout> : <GoogleLogin
                            clientId={CLIENT_ID}
                            buttonText='Connect FinKAB.com Analytics'
                            onSuccess={called == false ? this.login : ''}
                            onFailure={this.handleLoginFailure}
                            cookiePolicy={'single_host_origin'}
                            responseType='code,token'
                        ></GoogleLogin>
                    }
                    {this.state.accessToken ? <h5>Your Access Token: <br /><br /> {this.state.accessToken}</h5> : null}
                    </div>
                <div><script><link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta.2/css/bootstrap.min.css" integrity="sha384-PsH8R72JQ3SOdhVi3uxftmaW6Vc51MKb0q5P2rRUpPvrszuE4W1povHYgTpBfshb" crossOrigin="anonymous"></link></script></div>
            </>
        )
    }
}

export default GoogleBtn;
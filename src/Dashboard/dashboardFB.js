import React, { useState, Component } from "react";
import BasicDashboard from './Basic/index.js';
import FacebookLogin from 'react-facebook-login';

const DashboardFB = () => {

    const [isFacebookSignedIn, setIsFacebookSignedIn] = useState(false);

    const signIn = () => {
        setIsFacebookSignedIn(true);
    }

    return (

        <div>
            {!isFacebookSignedIn ? (
                <>
                    <FacebookLogin
                        appId={process.env.FACEBOOK_APP_ID}
                        fields="name,email,picture"
                        icon="fa-facebook"
                        callback={signIn}
                        disableMobileRedirect={true}
                    />
                </>
            ) : <BasicDashboard />
            }

            <script><link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta.2/css/bootstrap.min.css" integrity="sha384-PsH8R72JQ3SOdhVi3uxftmaW6Vc51MKb0q5P2rRUpPvrszuE4W1povHYgTpBfshb" crossorigin="anonymous"></link></script>
        </div>
    )
}

export default DashboardFB;
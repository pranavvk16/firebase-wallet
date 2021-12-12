import React from 'react'
import Carousel from 'react-material-ui-carousel'
import { Paper, Typography } from '@mui/material'
import "../App.css";
import { GoogleLogin } from 'react-google-login';

function LandingPage() {
    var items = [
        {
            name: "Wallet",
            description: "A Digital Wallet for the Modern World"
        },
        {
            name: "Expense Tracker",
            description: "Track all your expenses at on place"
        },
        {
            name: "Todo",
            description: "Track all your todo at on place"
        }
    ]
    function Item(props) {
        return (
            <Paper width={100}>
                <div className="paper">
                    <div className="paperinndercontainer">
                        <Typography ml={1} variant="h1">{props.item.name}</Typography>
                        <Typography ml={1} variant="h2">{props.item.description}</Typography>
                    </div>
                </div>
            </Paper >
        )
    }
    return (
        <div className="landingpage">
            <div className="carousel">
                <Carousel indicators={false}>
                    {
                        items.map((item, i) => <Item key={i} item={item} />)
                    }
                </Carousel>
            </div>
            <div className="google_auth">
                <GoogleLogin
                    clientId="658977310896-knrl3gka66fldh83dao2rhgbblmd4un9.apps.googleusercontent.com"
                    buttonText="Login with Google"
                    // onSuccess={responseGoogle}
                    // onFailure={responseGoogle}
                    cookiePolicy={'single_host_origin'}
                />,

            </div>
        </div>
    )
}

export default LandingPage

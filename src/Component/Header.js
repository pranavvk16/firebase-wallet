import React from 'react'

function Header(props) {
    return (
        <div className="header">
            <div className="username">User1</div>
            <div className="balance">
                Balance : <span>{props.balance}</span>
            </div>
        </div>
    )
}

export default Header

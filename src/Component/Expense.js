import React from 'react'
import { Input, Button } from "@mui/material";

function Expense(props) {
    return (
        <div className="expenses">
          <div className="container">
            <span className="date">
              {props.date.getDate()}/{props.date.getMonth()}
            </span>
            <br />
            Details
            <Input
              placeholder="Movies,Outting..."
              id="textinputs"
              onChange={(e) => props.gettext(e.target.value)}
              type="text"
            />
            ₹
            <Input
              id="expenseinput"
              onChange={(e) => props.getmoney(e.target.value)}
              type="number"
            />
            <Button onClick={props.adddata} variant="contained">
              Add
            </Button>
            <hr />
          </div>
        </div>
    )
}

export default Expense

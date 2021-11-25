import { useState } from "react";
import "./App.css";
import Calendar from "react-calendar";
import { Input, Button } from "@mui/material";
import { db } from "./firebase";

function App() {
  const [balance, setbalance] = useState(5000);

  const [text, gettext] = useState(""); //todo and the expences
  const [money, getmoney] = useState(0);

  const [data, getdata] = useState([]); //database

  const [date, onChange] = useState(new Date());

  const [key, getkey] = useState("");

  const [wholedata, getwholedata] = useState([]);
  //adding todo and the expences to the database and update the balance

  function adddata() {
    getdata([...data, { money, text }]);
    getkey(JSON.stringify(date).slice(1, 11));
    setbalance((prev) => prev - money);
    getwholedata([...wholedata, { key: data }]);
  }

  console.log(db);
  console.log(data);
  console.log(wholedata);
  console.log(key);
  return (
    <div className="App">
      <div className="header">
        <div className="username">User1</div>
        <div className="balance">
          Balance : <span>{balance}</span>
        </div>
      </div>
      <div className="content">
        <div className="calander">
          <Calendar onChange={onChange} value={date} minDetail="month" />
        </div>
        <div className="expenses">
          <div className="container">
            <span className="date">
              {date.getDate()}/{date.getMonth()}
            </span>
            <br />
            Details
            <Input
              placeholder="Movies,Outting..."
              id="textinputs"
              onChange={(e) => gettext(e.target.value)}
              type="text"
            />
            ₹
            <Input
              id="expenseinput"
              onChange={(e) => getmoney(e.target.value)}
              type="number"
            />
            <Button onClick={adddata} variant="contained">
              Add
            </Button>
            <hr />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

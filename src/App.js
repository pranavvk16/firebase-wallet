import { useState } from "react";
import "./App.css";
import Calendar from "react-calendar";
import { db } from "./firebase";
import Header from "./Component/Header";
import Expense from "./Component/Expense";


function App() {
  const [balance, setbalance] = useState(5000);

  const [text, gettext] = useState(""); //todo and the expences
  const [money, getmoney] = useState(0);

  const [data, getdata] = useState([]); //database

  const [date, onChange] = useState(new Date());

  // const [key, getkey] = useState("");

  //adding todo and the expences to the database and update the balance

  function adddata() {
    getdata([...data, { money, text }]);
    // getkey(JSON.stringify(date).slice(1, 11));
    setbalance((prev) => prev - money);
    // getwholedata([...wholedata, { key: data }]);
  }

  // console.log(db);
  console.log(data);  
  console.log(date);
  // console.log(key);
  return (
    <div className="App">
      <Header balance={balance}/>
      <div className="content">
        <div className="calander">
          <Calendar onChange={onChange} value={date} minDetail="month" />
        </div>
        <Expense data={data} adddata={adddata} getmoney={getmoney} gettext={gettext} date={date}/>
      </div>
    </div>
  );
}

export default App;

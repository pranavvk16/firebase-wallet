import { useState, useEffect } from "react";
import "./App.css";
import Calendar from "react-calendar";
import Header from "./Component/Header";
import Expense from "./Component/Expense";
import { onchangeDate, getDateString } from "./firebaseFunction";
function App() {
  const [date, setDate] = useState(new Date());
  const currDate = new Date();

  // useEffect(() => {
  //   const dataColRef = doc(db, "data", getDateString(date));
  //   getDoc(dataColRef).then((doc) => {
  //     if (doc.data() === undefined) {
  //       setDoc(doc(collection(db, "data"), getDateString(date), "TODO"), {
  //         titile: "Movie",
  //       });
  //     } else {
  //       console.log(doc.data(), doc.id, "present");
  //     }
  //   });
  // }, [date]);

  //pranav work
  const [balance, setbalance] = useState(5000);

  const [text, gettext] = useState(""); //todo and the expences
  const [money, getmoney] = useState(0);

  const [data, getdata] = useState([]); //database

  const [key, getkey] = useState("");

  //adding todo and the expences to the database and update the balance

  function adddata() {
    getdata([...data, { money, text }]);
    getkey(JSON.stringify(date).slice(1, 11));
    setbalance((prev) => prev - money);
    // getwholedata([...wholedata, { key: data }]);
  }

  // console.log(db);
  // console.log(data);
  // console.log(wholedata);
  // console.log(key);
  return (
    <div className="App">
      <Header balance={balance} />
      <div className="content">
        <div className="calander">
          <Calendar
            onChange={(date) => onchangeDate(date)}
            value={date}
            minDetail="month"
          />
        </div>
        <Expense
          adddata={adddata}
          getmoney={getmoney}
          gettext={gettext}
          date={date}
        />
      </div>
    </div>
  );
}

export default App;

import { useState, useEffect } from "react";
import Calendar from "react-calendar";
import Header from "./Component/Header";
import Expense from "./Component/Expense";
import { db } from "./firebase";
import {
  doc,
  getDoc,
  getDocs,
  setDoc,
  collection,
  addDoc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import "./App.css";

function App() {
  const [todayDate, setTodayDate] = useState({ date: new Date(), flag: true });
  const [data, setData] = useState([]);
  const [newTask, setNewTask] = useState({ task: "", expense: 0 });
  const { date, flag } = todayDate;

  const colRef = collection(db, "data");

  const onChangeDate = (date) => {
    const newDate = { date: date, flag: getFlag(date) };
    setTodayDate(newDate);
  };

  const getFlag = (date) => {
    if (
      date.getFullYear() >= new Date().getFullYear() &&
      date.getMonth() + 1 >= new Date().getMonth() + 1 &&
      date.getDate() >= new Date().getDate()
    ) {
      return true;
    } else {
      return false;
    }
  };

  const getDateString = (date) => {
    return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
  };

  useEffect(() => {
    getDocs(collection(colRef, getDateString(date), "TODO")).then(
      (snapshot) => {
        if (snapshot.empty) {
          setDoc(doc(colRef, getDateString(date)), {});
          setData([]);
        } else {
          const newArr = [];
          snapshot.forEach((docu) => {
            const { task, expense } = docu.data();
            newArr.push({ task: task, expense: expense, id: docu.id });
          });
          setData(newArr);
        }
      }
    );
  }, [todayDate]);

  const updateDataChange = () => {
    getDocs(collection(colRef, getDateString(date), "TODO")).then(
      (snapshot) => {
        const newArr = [];
        snapshot.forEach((docu) => {
          const { task, expense } = docu.data();
          newArr.push({ task: task, expense: expense, id: docu.id });
        });
        setData(newArr);
      }
    );
  };

  //form handel submit
  const onHandelSubmit = (event) => {
    event.preventDefault();
    const { task, expense } = newTask;
    if (task !== "") {
      addDoc(collection(colRef, getDateString(date), "TODO"), newTask).then(
        () => {
          updateDataChange();
          setNewTask({ task: "", expense: 0 });
          event.target.reset();
        }
      );
    } else {
      alert("task must be filled!");
    }
  };
  //from input change
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setNewTask({ ...newTask, [name]: value });
  };

  //update TODO
  const updateTask = (id, keyValue) => {
    updateDoc(doc(colRef, getDateString(date), "TODO", id), {
      task: "imran",
      expense: 1000,
    }).then(() => {
      updateDataChange();
    });
  };
  //delete TODO
  const deleteTask = (id) => {
    deleteDoc(doc(colRef, getDateString(date), "TODO", id)).then(() => {
      updateDataChange();
    });
  };

  return (
    <div className="App">
      <Header data={data} />
      <div className="content">
        <div className="calander">
          <Calendar
            title="Calander"
            onChange={(date) => onChangeDate(date)}
            value={date}
            minDetail="month"
          />
        </div>
        <Expense
          flag={flag}
          date={date}
          data={data}
          onHandelSubmit={onHandelSubmit}
          handleChange={handleChange}
          newTask={newTask}
          deleteTask={deleteTask}
          updateTask={updateTask}
        />
      </div>
    </div>
  );
}

export default App;

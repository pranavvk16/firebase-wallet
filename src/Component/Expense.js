import { React, useState } from "react";
import { Input, Button } from "@mui/material";
import Popup from "./Popup";
// import { Picker, MonthBox } from 'react-month-picker'

function Expense({
  date,
  data,
  onHandelSubmit,
  handleChange,
  flag,
  deleteTask,
  updateTask,
}) {
  const dataPresent = () => {
    if (data.length > 0) {
      return true;
    } else {
      return false;
    }
  };

  const [isOpen, setIsOpen] = useState(false);

  const togglePopup = () => {
    setIsOpen(!isOpen);
  }
  return (
    <div className="expenses">
      <div className="container">
        <span className="date">
          Expenses on- <i >{date.getDate()}/{date.getMonth() + 1}</i>
        </span>
        <br />
        <form onSubmit={(event) => onHandelSubmit(event)}>
          <Input
            placeholder="Movies,Outting..."
            id="task"
            type="text"
            name="task"
            onChange={handleChange}
          />
          ₹
          <Input
            id="expense"
            type="number"
            name="expense"
            onChange={handleChange}
          />
          <Button sx={{m:2}} variant="contained" type="Submit" disabled={!flag}>
            Add
          </Button>
        </form>
        {/* <input
          type="button"
          value="Click to Open Popup"
          onClick={togglePopup}
        />{isOpen && <Popup
          handleClose={togglePopup}
        />} */}
        <hr />
        <div className="expense-list">
          {/*displaying the list of todo */}
          {dataPresent() &&
            data.map((curr) => {
              const { task, expense, id } = curr;
              return (
                <div key={id}>
                  <span>{task}</span> :<span>{expense}</span>:
                  <Button
                    padding={12}
                    variant="contained"
                    onClick={() => updateTask(id, {})}
                  >
                    update
                  </Button>
                  :
                  <Button
                    padding={12}
                    variant="contained"
                    onClick={() => deleteTask(id)}
                    disabled={!flag}
                  >
                    remove
                  </Button>
                  <br />
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}

export default Expense;

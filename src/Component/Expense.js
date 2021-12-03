import React from "react";
import { Input, Button } from "@mui/material";

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
  return (
    <div className="expenses">
      <div className="container">
        <span className="date">
          {date.getDate()}/{date.getMonth() + 1}
        </span>
        <br />
        Details
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
          <Button variant="contained" type="Submit" disabled={!flag}>
            Add
          </Button>
        </form>
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
                    variant="contained"
                    onClick={() => updateTask(id, {})}
                  >
                    update
                  </Button>
                  :
                  <Button
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

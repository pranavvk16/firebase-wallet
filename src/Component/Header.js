import React from "react";

function Header({ data }) {
  return (
    <div className="header">
      <div className="username">User</div>
      <div className="balance">
        Balance :{" "}
        <span>
          {data.length > 0
            ? data.reduce((acc, curr) => {
                return (acc = acc + Number(curr.expense));
              }, 0)
            : 0}
        </span>
      </div>
    </div>
  );
}

export default Header;

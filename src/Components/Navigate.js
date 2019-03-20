import React from "react";

export default Wrapped => {
  return path => {
    return ({ history, ...props }) => {
      const navigate = () => {
        console.log("go");
        history.push(path);
      };
      return (
        <div className="container" tabIndex="0" onKeyPress={navigate}>
          <Wrapped {...props} />
        </div>
      );
    };
  };
};

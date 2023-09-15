import React from "react";

const Loader = (props) => {
  const { children } = props;
  return (
    <React.Fragment>
      {props.isLoaded && <React.Fragment>{children}</React.Fragment>}
      {!props.isLoaded && <div className="loader"></div>}
    </React.Fragment>
  );
};

export default Loader;

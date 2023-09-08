import React from "react";

const DateTime = (props) => {
  const { value } = props;
  const date = new Date(value);
  const [year, month, day, hours, minutes, seconds] = [
    date.getFullYear(),
    ("0" + (date.getMonth() + 1)).slice(-2),
    date.getDate(),
    date.getHours(),
    date.getMinutes(),
    date.getSeconds(),
  ];
  return (
    <React.Fragment>{`${day}.${month}.${year} ${hours}:${minutes}:${seconds}`}</React.Fragment>
  );
};

export default DateTime;

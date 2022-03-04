import React from "react";
import { useEffect } from "react";
import swal from "sweetalert";
export default function WithdrawConfirmation(props) {
  useEffect(() => {
    swal({
      title: "Good job!",
      text: "You clicked the button!",
      icon: "success",
      button: "Aww yiss!",
    });
  });
  return <div></div>;
}

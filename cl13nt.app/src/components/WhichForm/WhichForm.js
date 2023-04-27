import React from "react";
import { EarlyDepartureForm } from "../EarlyDepartureForm/EarlyDepartureForm";
import { DepartureForm } from "../DepartureForm/DepartureForm";
import { ArrivalForm } from "../ArrivalForm/ArrivalForm";

const WhichForm = (props) => {
  var now = new Date();
  var before = new Date().setHours(12, 0, 0, 0);
  var beforeEvening = new Date().setHours(18, 0, 0, 0);
  beforeEvening = new Date(beforeEvening);
  before = new Date(before);
  return now > before ? (
    now < beforeEvening ? (
      <EarlyDepartureForm />
    ) : (
      <DepartureForm />
    )
  ) : (
    <ArrivalForm />
  );
};

export { WhichForm };

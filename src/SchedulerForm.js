import React from "react";
import { SchedulerForm } from "@progress/kendo-react-scheduler";
import CustomForm from "./CustomForm";
import { CustomDialog } from "./CustomDialog";

export const FormWithCustomEditor = (props) => {
  const requiredValidator = React.useCallback(
    (value) =>
      value === undefined || value === null || value === ""
        ? "Field is required."
        : undefined,
    []
  );

  //   const formValidator = (_dataItem, formValueGetter) => {
  //     let result = {};
  //     result.Patient = [requiredValidator(formValueGetter("Patient"))]
  //       .filter(Boolean)
  //       .reduce((current, acc) => current || acc, "");
  //     result.Treatment = [requiredValidator(formValueGetter("Treatment"))]
  //       .filter(Boolean)
  //       .reduce((current, acc) => current || acc, "");
  //     return result;
  //   };

  return (
    <SchedulerForm
      {...props}
      editor={CustomForm}
      dialog={CustomDialog}
      //   validator={formValidator}
    />
  );
};

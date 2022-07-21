//https://www.telerik.com/kendo-react-ui/components/scheduler/customization/form/editor/

import React, { useState } from "react";
import { Dialog } from "@progress/kendo-react-dialogs";
import {
  Form,
  Field,
  FormElement,
  FieldWrapper,
} from "@progress/kendo-react-form";
import { Input, NumericTextBox, Checkbox } from "@progress/kendo-react-inputs";
import { DropDownList } from "@progress/kendo-react-dropdowns";
import { Error, Label } from "@progress/kendo-react-labels";
import { Popup } from "@progress/kendo-react-popup"; //yet to implement
import { Menu, MenuItem } from "@progress/kendo-react-layout"; //yet to implement
import { DateTimePicker } from "@progress/kendo-react-dateinputs";

//min number validation functions for form
const minValueValidator = (value) =>
  value >= 0 ? "" : "The value must be 0 or higher";

const NonNegativeNumericInput = (fieldRenderProps) => {
  const { validationMessage, visited, ...others } = fieldRenderProps;
  return (
    <div>
      <NumericTextBox {...others} />
      {visited && validationMessage && <Error>{validationMessage}</Error>}
    </div>
  );
};

//email validation for form
const emailRegex = new RegExp(/\S+@\S+\.\S+/);

const emailValidator = (value) =>
  emailRegex.test(value) ? "" : "Please enter a valid email.";

const EmailInput = (fieldRenderProps) => {
  const { validationMessage, visited, ...others } = fieldRenderProps;
  return (
    <div>
      <Input {...others} />
      {visited && validationMessage && <Error>{validationMessage}</Error>}
    </div>
  );
};

const NonScheduler = (props) => {
  //handle submit for data fetch of this custom form
  const handleSubmit = (event) => {
    props.onClose();
    console.log(event);
    props.getUpdatedData(event, props.onClose);
  };

  console.log("NonScheduler");
  console.log(props);
  return (
    <Dialog title={"Create"} onClose={props.onClose} width={1000} height={550}>
      <Form
        onSubmit={handleSubmit}
        initialValues={props.dataItem}
        render={(formRenderProps) => (
          <FormElement>
            <div className="row">
              <div className="col-10">
                <fieldset>
                  <div className="mb-2">
                    <Field
                      name={"HouseNumber"}
                      component={Input}
                      label={"House Number"}
                    />
                  </div>
                  <div className="row mb-2">
                    <div className="col-6">
                      <Field name={"Title"} component={Input} label={"Title"} />
                    </div>
                    <div className="col-3">
                      <Field
                        name={"SeasonNumber"}
                        component={NumericTextBox}
                        label={"Season Number"}
                        validator={minValueValidator}
                      />
                    </div>
                    <div className="col-3">
                      <Field
                        name={"EpisodeNo"}
                        component={NumericTextBox}
                        label={"Episode No"}
                        validator={minValueValidator}
                      />
                    </div>
                  </div>
                  <div className="mb-2">
                    <Field
                      name={"EpisodeTitle"}
                      component={Input}
                      label={"Episode Title"}
                    />
                  </div>
                  <div className="row mb-2">
                    <div className="col-6">
                      <Field
                        name={"CategoryType"}
                        component={Input}
                        label={"Category Type"}
                      />
                    </div>
                    <div className="col-6">
                      <Field name={"Genre"} component={Input} label={"Genre"} />
                    </div>
                  </div>
                  <div className="row mb-2">
                    <div className="col-3">
                      <Field
                        name={"Exhibition"}
                        component={NumericTextBox}
                        label={"Exhibition#"}
                      />
                    </div>
                    <div className="col-3">
                      <Field
                        name={"Repeat"}
                        component={NumericTextBox}
                        label={"Repeat#"}
                      />
                    </div>
                    <div className="col-6">
                      <Field
                        name={"Channel"}
                        component={DropDownList}
                        label={"Channel"}
                      />
                    </div>
                  </div>
                  <div className="row mb-2">
                    <div className="col-6">
                      <Field
                        name={"SlotDateTime"}
                        component={DateTimePicker}
                        placeholder={""}
                        label={"Slot Date Time"}
                      />
                    </div>
                    <div className="col-6">
                      <Field
                        name={"ActualStart"}
                        component={Input}
                        label={"Actual Start"}
                      />
                    </div>
                  </div>
                  <div className="row mb-2">
                    <div className="col-6" style={{ marginTop: "23px" }}>
                      <Field
                        name={"Locked"}
                        component={Checkbox}
                        label={"Locked"}
                      />
                    </div>
                    <div className="col-6">
                      <Field
                        name={"NominalStart"}
                        component={Input}
                        label={"Nominal Start"}
                      />
                    </div>
                  </div>
                  <div className="row mb-2">
                    <div className="col-4">
                      <Field name={"Deal"} component={Input} label={"Deal"} />
                    </div>
                    <div className="col-4">
                      <Field
                        name={"Actual"}
                        component={Input}
                        label={"Actual"}
                      />
                    </div>
                    <div className="col-4">
                      <Field
                        name={"Segment"}
                        component={DropDownList}
                        label={"Segment "}
                      />
                    </div>
                  </div>
                </fieldset>
              </div>
              <div className=" col-2">
                <button
                  type={"submit"}
                  className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-primary col-12"
                  disabled={!formRenderProps.allowSubmit}
                >
                  Save
                </button>
                <button
                  style={{ marginTop: "5px" }}
                  className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-base col-12"
                  onClick={() => {
                    props.onClose();
                  }}
                >
                  Cancel
                </button>
                <button
                  style={{ marginTop: "30px" }}
                  type={"submit"}
                  className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-base col-12"
                  disabled={!formRenderProps.allowSubmit}
                >
                  History
                </button>
                <button
                  style={{ marginTop: "5px" }}
                  type={"submit"}
                  className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-base col-12"
                  //   onClick={props.cancelEdit}
                >
                  Edit Media
                </button>
                <button
                  style={{ marginTop: "5px" }}
                  type={"submit"}
                  className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-base col-12"
                  disabled={!formRenderProps.allowSubmit}
                >
                  Black Out
                </button>
                <button
                  style={{ marginTop: "5px" }}
                  type={"submit"}
                  className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-base col-12"
                  //   onClick={props.cancelEdit}
                >
                  Recursive
                </button>
              </div>
            </div>
          </FormElement>
        )}
      />
    </Dialog>
  );
};

export default NonScheduler;

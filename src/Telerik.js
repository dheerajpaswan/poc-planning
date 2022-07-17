// https://www.telerik.com/kendo-react-ui/components/scheduler/customization/items/ -- to color the appointmnets
// import { SchedulerItem, SchedulerViewItem, SchedulerEditItem } from '@progress/kendo-react-scheduler';
// using scheduler item

//for recurrence query
//https://www.telerik.com/kendo-react-ui/components/scheduler/recurring/

import React from "react";
import {
  Scheduler,
  WeekView,
  MonthView,
  DayView,
  SchedulerItem,
} from "@progress/kendo-react-scheduler";
import { guid } from "@progress/kendo-react-common";
import { Grid, GridColumn } from "@progress/kendo-react-grid";
//tooltip
import { Tooltip, Popover } from "@progress/kendo-react-tooltip";

import gridData, { customModelFields, GetData } from "./data.js";
import axios from "axios";
import moment from "moment";
import { FormWithCustomEditor } from "./SchedulerForm.js";
import NonScheduler, { entityToSet } from "./NonSchedulerCustomForm.js";
//custom item to color appointments
const CustomItem = (props) => {
  let time = 9;
  return (
    <SchedulerItem
      {...props}
      style={{
        ...props.style,
        backgroundColor: time >= 10 ? "pink" : "blue",
      }}
    />
  );
};

const Telerik = () => {
  const MyScheduler = React.createRef();
  const [data, setData] = React.useState([]);
  const [dragTitle, setDragTitle] = React.useState("");
  const [dragItem, setDragItem] = React.useState("");

  // console.log(data);
  //to formate date like this format "2000-03-22 12:22:11"
  const datetimeFormat = (date) => {
    let converted = moment(date).format("YYYY-MM-DD hh:mm:ss");
    return converted;
  };

  const randomInt = (min, max) =>
    Math.floor(Math.random() * (max - min + 1)) + min;

  const handleDropItem = (e) => {
    let start = e.target.getAttribute("data-slot-start");
    let end = e.target.getAttribute("data-slot-end");

    let startDate = new Date(parseInt(start));
    let endDate = new Date(parseInt(end));

    if (dragItem.title) {
      let entity = {
        SID: randomInt(1, 1000), //if passing SID = 0 --> Encountered two children with the same key, `0:0:0`
        Title: dragItem.title,
        OwnerID: randomInt(1, 2),
        Description: dragItem.description,
        StartTimezone: null,
        Start: startDate,
        End: endDate,
        EndTimezone: null,
        RecurrenceRule: null,
        RecurrenceID: randomInt(1, 2),
        RecurrenceException: null,
        isAllDay: false, //hardcoded for data now
      };
      //data to send in form on open ---> entity
      setData([entity, ...data]);
      console.log([entity, ...data]);
    } else {
      console.log("Loading");
    }

    //validation for the drag n drop SID===0 then created on table when click on save and on cancel

    // let entity = {
    //   Title: dragItem.title,
    //   OwnerID: randomInt(1, 2),
    //   Description: dragItem.description,
    //   StartTimezone: null,
    //   Start: datetimeFormat(startDate),
    //   End: datetimeFormat(endDate),
    //   EndTimezone: null,
    //   RecurrenceRule: null,
    //   RecurrenceID: randomInt(1, 2),
    //   RecurrenceException: null,
    //   isAllDay: false, //hardcoded for data now
    // };

    //-- to save the data on drop
    // if (dragItem.title) {
    //   console.log(dragItem.title);
    //   console.log(entity);
    //   onSaveOrUpdate(entity);
    // }
  };

  React.useEffect(() => {
    let schedulerElement = MyScheduler.current.element;
    schedulerElement.addEventListener("drop", handleDropItem);
    schedulerElement.addEventListener("dragover", (e) => e.preventDefault());
  });

  const toGetData = (data) => {
    setData(data);
  };

  const onSaveOrUpdate = (item) => {
    fetch("http://142.93.214.96:9090/data/Planner/", {
      method: "POST",
      body: JSON.stringify({
        data: item,
      }),
      accept: "application/json",
      headers: { "Content-Type": "application/json" },
    }).then((response) => response.json());
  };

  const onDelete = async (id) => {
    await axios.delete(`http://142.93.214.96:9090/data/Planner/${id}`);
    console.log("Done");
  };

  //saving data from custom form
  // onSaveOrUpdate(entityToSet.entity);
  console.log(entityToSet);

  const handleDataChange = React.useCallback(
    ({ created, updated, deleted }) => {
      setData((old) =>
        old
          .filter(
            (item) =>
              deleted.find((current) => current.SID === item.SID) === undefined
          )
          .map(
            (item) =>
              updated.find((current) => current.SID === item.SID) || item
          )
          .concat(created.map((item) => ({ ...item, SID: guid() })))
      );

      //TODO: condition to apply
      console.log(created);
      console.log(updated);
      console.log(deleted);

      // to save the data in database
      // if (created.length === 1) {
      //   created.map((item) => {
      //     let entity = {
      //       Start: datetimeFormat(item.Start),
      //       Title: item.Title,
      //       Description: item.Description,
      //       End: datetimeFormat(item.End),
      //       OwnerID: randomInt(1, 2), //random for now
      //       StartTimezone: " ",
      //       EndTimezone: " ",
      //       RecurrenceRule: " ",
      //       RecurrenceID: randomInt(1, 2),
      //       RecurrenceException: " ",
      //       isAllDay: item.isAllDay ? 1 : 0,
      //     };
      //     console.log(entity);
      //     onSaveOrUpdate(entity);
      //   });
      // }

      // if (updated.length === 1) {
      //   updated.map((item) => {
      //     onSaveOrUpdate({
      //       ...item,
      //       SID: 0,
      //       Start: datetimeFormat(item.Start),
      //       Title: item.Title,
      //       Description: item.Description,
      //       End: datetimeFormat(item.End),
      //       OwnerID: randomInt(1, 2), //random for now
      //       StartTimezone: " ",
      //       EndTimezone: " ",
      //       RecurrenceRule: " ",
      //       RecurrenceID: randomInt(1, 2),
      //       RecurrenceException: " ",
      //       isAllDay: item.isAllDay ? 1 : 0,
      //     });
      //   });
      // }

      // //to delete appointment form UI and Table
      // if (deleted.length === 1) {
      //   deleted.map((item) => {
      //     onDelete(item.SID);
      //   });
      // }
    },
    [setData]
  );
  const GridRowRender = (tr, props) => {
    const trProps = {
      draggable: true,
      onDragStart: (e) => {
        setDragItem(props.dataItem);
      },
    };
    return React.cloneElement(tr, { ...trProps }, tr.props.children);
  };
  return (
    <div className="row">
      <div className="col-8">
        <Scheduler
          item={CustomItem}
          //---custom form for the scheduler using scheduler form
          // form={FormWithCustomEditor}
          //---direct binded form without using scheudler form component
          form={NonScheduler}
          data={data}
          modelFields={customModelFields}
          onDataChange={handleDataChange}
          defaultDate={new Date()}
          ref={MyScheduler}
          editable={true}
        >
          <DayView />
          <WeekView />
          <MonthView />
        </Scheduler>
      </div>
      <GetData toGetData={toGetData} />
      <div className="col-4">
        <Grid data={gridData} rowRender={GridRowRender}>
          <GridColumn field="taskID" />
          <GridColumn field="title" />
          <GridColumn field="description" />
        </Grid>
      </div>
    </div>
  );
};

export default Telerik;

import { useEffect } from "react";

const data = [
  {
    taskID: 1,
    ownerId: 1,
    title: "Fast and furious 6",
    description: "Movie",
  },
  {
    taskID: 2,
    ownerId: 3,
    title: "The Internship",
    description: "Web Series",
  },
  {
    taskID: 3,
    ownerId: 2,
    title: "The Perks of Being a Wallflower",
    description: "Web Series",
  },
  {
    taskID: 4,
    ownerId: 1,
    title: "The Help",
    description: "Web Series",
  },
  {
    taskID: 5,
    ownerId: 2,
    title: "Now You See Me",
    description: "Movie",
  },
];

export const customModelFields = {
  id: "SID",
  title: "Title",
  description: "Description",
  start: "Start",
  end: "End",
  recurrenceRule: "RecurrenceRule",
  recurrenceId: "RecurrenceID",
  recurrenceExceptions: "RecurrenceException",
};

const parseAdjust = (eventDate) => {
  const date = new Date(eventDate);
  return date;
};

export const GetData = (props) => {
  const init = {
    method: "GET",
    accept: "application/json",
    headers: {},
  };

  useEffect(() => {
    fetch("http://142.93.214.96:9090/data/Planner/", init)
      .then((response) => response.json())
      .then((json) => {
        let data = json.data.map((dataItem) => ({
          SID: parseInt(dataItem.SID),
          Start: parseAdjust(dataItem.Start),
          StartTimezone: dataItem.StartTimezone,
          End: parseAdjust(dataItem.End),
          EndTimezone: dataItem.EndTimezone,
          isAllDay: false,
          Title: dataItem.Title,
          Description: dataItem.Description,
          RecurrenceRule: dataItem.RecurrenceRule,
          RecurrenceID: dataItem.RecurrenceID,
          RecurrenceException: dataItem.RecurrenceException,
        }));
        props.toGetData(data);
      });
  }, []);
};

export default data;

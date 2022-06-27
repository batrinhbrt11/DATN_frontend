import React, { useEffect, useState } from "react";
import { Details, TableContainer, TableHeader } from "../Styled";
import Paper from "@mui/material/Paper";
import {
  ViewState,
  EditingState,
  IntegratedEditing,
} from "@devexpress/dx-react-scheduler";
import {
  Scheduler,
  WeekView,
  Appointments,
  Toolbar,
  ViewSwitcher,
  MonthView,
  DayView,
  AppointmentForm,
  AppointmentTooltip,
  ConfirmationDialog,
} from "@devexpress/dx-react-scheduler-material-ui";
import "./style.css";
const appointments = [
  {
    startDate: "2018-11-01T09:45",
    endDate: "2018-11-01T11:00",
    title: "Meeting 2",
  },
  {
    startDate: "2018-11-01T09:45",
    endDate: "2018-11-01T11:00",
    title: "Meeting 2",
  },
  {
    startDate: "2018-11-01T12:00",
    endDate: "2018-11-01T13:30",
    title: "Go to a gym",
    notes: "sadasdasd",
  },
];

export default function () {
  const [data, setData] = useState(appointments);
  const [currentViewName, setCurrentViewName] = useState("work-week");
  const commitChanges = ({ added, changed, deleted }) => {
    if (added) {
      console.log(added);
      const startingAddedId =
        data.length > 0 ? data[data.length - 1].id + 1 : 0;
      console.log(added);
      setData([...data, { id: startingAddedId, ...added }]);
    }
    if (changed) {
      setData(
        data.map((appointment) =>
          changed[appointment.id]
            ? { ...appointment, ...changed[appointment.id] }
            : appointment
        )
      );
    }
    if (deleted !== undefined) {
      setData(data.filter((appointment) => appointment.id !== deleted));
    }
  };
  return (
    <TableContainer>
      <TableHeader>
        <h2>Apointment</h2>
      </TableHeader>
      <Paper>
        <Scheduler data={data} height={1000} sx={{ fontSize: "3.5rem" }}>
          <ViewState
            defaultCurrentDate="2018-11-01"
            currentViewName={currentViewName}
            onCurrentViewNameChange={setCurrentViewName}
          />
          <EditingState onCommitChanges={commitChanges} />
          <IntegratedEditing />
          <WeekView startDayHour={8} endDayHour={18} />
          <WeekView
            name="work-week"
            displayName="Work Week"
            excludedDays={[0, 6]}
            startDayHour={8}
            endDayHour={18}
          />
          <MonthView />
          <DayView startDayHour={8} endDayHour={18} />
          <ConfirmationDialog style={{ width: "1000px" }} />
          <Toolbar />
          <ViewSwitcher />
          <Appointments />
          <AppointmentTooltip showOpenButton showDeleteButton />
          <AppointmentForm />
        </Scheduler>
      </Paper>
    </TableContainer>
  );
}

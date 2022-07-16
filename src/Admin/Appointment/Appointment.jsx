import React, { useEffect } from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Fade from "@mui/material/Fade";
import { useState } from "react";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import {
  add,
  eachDayOfInterval,
  endOfMonth,
  format,
  getDay,
  isEqual,
  isSameDay,
  isSameMonth,
  isToday,
  parse,
  parseISO,
  startOfToday,
} from "date-fns";
import { TableContainer, TableHeader } from "../Styled";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
} from "@mui/material";
import "./style.css";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteAppointment, getAllAppointment } from "../../redux/appointmentSlice";
import formatDate from "../../lib/formatDate";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
export default function Appointment() {
  let today = startOfToday();
  let [selectedDay, setSelectedDay] = useState(today);
  let [currentMonth, setCurrentMonth] = useState(format(today, "MMM-yyyy"));
  let firstDayCurrentMonth = parse(currentMonth, "MMM-yyyy", new Date());

  let days = eachDayOfInterval({
    start: firstDayCurrentMonth,
    end: endOfMonth(firstDayCurrentMonth),
  });

  function previousMonth() {
    let firstDayNextMonth = add(firstDayCurrentMonth, { months: -1 });
    setCurrentMonth(format(firstDayNextMonth, "MMM-yyyy"));
  }

  function nextMonth() {
    let firstDayNextMonth = add(firstDayCurrentMonth, { months: 1 });
    setCurrentMonth(format(firstDayNextMonth, "MMM-yyyy"));
  }

  const selectedDayMeetings = () => {
    setSelectedMeeting(
      appointment.filter((meeting) =>
        isSameDay(parseISO(meeting.date), selectedDay)
      )
    );
  };
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const data = useSelector((state) => state.appointments);
  const [appointment, setAppointment] = useState(data.appointments);
  const [selectedMeeting, setSelectedMeeting] = useState([]);
  useEffect(() => {
    dispatch(getAllAppointment());
  }, [dispatch]);

  useEffect(() => {
    setAppointment(data.appointments);
    selectedDayMeetings();
  }, [data,dispatch]);
  useEffect(() => {
    selectedDayMeetings();
  }, [selectedDay]);
  return (
    <TableContainer>
      <TableHeader>
        <h2>Appointment</h2>
        <Button
          variant="contained"
          className="edit-btn"
          sx={{ fontSize: "2rem" }}
          onClick={() => navigate("/admin/appointment/add")}
        >
          Add
        </Button>
      </TableHeader>
      <div style={{ minHeight: "400px" }}>
        <div className="max-w-full px-4 mx-auto sm:px-7 md:max-w-full md:px-6">
          <div className="md:grid md:grid-cols-2 md:divide-x md:divide-gray-200">
            <div className="md:pr-14">
              <div className="flex items-center">
                <h2 className="flex-auto font-semibold text-gray-900">
                  {format(firstDayCurrentMonth, "MMMM yyyy")}
                </h2>
                <button
                  type="button"
                  onClick={previousMonth}
                  className="-my-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
                >
                  <span className="sr-only">Previous month</span>
                  <ChevronLeftIcon
                    className="w-5 h-5"
                    aria-hidden="true"
                    sx={{ color: "black" }}
                  />
                </button>
                <button
                  onClick={nextMonth}
                  type="button"
                  className="-my-1.5 -mr-1.5 ml-2 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
                >
                  <span className="sr-only">Next month</span>
                  <ChevronRightIcon
                    className="w-5 h-5"
                    aria-hidden="true"
                    sx={{ color: "black" }}
                  />
                </button>
              </div>
              <div className="grid grid-cols-7 mt-10 text-xs leading-6 text-center text-gray-500">
                <div>S</div>
                <div>M</div>
                <div>T</div>
                <div>W</div>
                <div>T</div>
                <div>F</div>
                <div>S</div>
              </div>
              <div className="grid grid-cols-7 mt-2 text-sm">
                {days.map((day, dayIdx) => (
                  <div
                    key={day.toString()}
                    className={classNames(
                      dayIdx === 0 && colStartClasses[getDay(day)],
                      "py-1.5"
                    )}
                  >
                    <button
                      type="button"
                      onClick={() => setSelectedDay(day)}
                      className={classNames(
                        isEqual(day, selectedDay) && "text-white",
                        !isEqual(day, selectedDay) &&
                          isToday(day) &&
                          "text-red-500",
                        !isEqual(day, selectedDay) &&
                          !isToday(day) &&
                          isSameMonth(day, firstDayCurrentMonth) &&
                          "text-gray-900",
                        !isEqual(day, selectedDay) &&
                          !isToday(day) &&
                          !isSameMonth(day, firstDayCurrentMonth) &&
                          "text-gray-400",
                        isEqual(day, selectedDay) &&
                          isToday(day) &&
                          "bg-red-500",
                        isEqual(day, selectedDay) &&
                          !isToday(day) &&
                          "bg-gray-900",
                        !isEqual(day, selectedDay) && "hover:bg-gray-200",
                        (isEqual(day, selectedDay) || isToday(day)) &&
                          "font-semibold",
                        "mx-auto flex h-8 w-8 items-center justify-center rounded-full"
                      )}
                    >
                      <time dateTime={format(day, "yyyy-MM-dd")}>
                        {format(day, "d")}
                      </time>
                    </button>

                    <div className="w-1 h-1 mx-auto mt-1">
                      {appointment.some((meeting) =>
                        isSameDay(parseISO(meeting.date), day)
                      ) && (
                        <div className="w-1 h-1 rounded-full bg-sky-500"></div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <section className="mt-12 md:mt-0 md:pl-14">
              <h2 className="font-semibold text-gray-900">
                Schedule for{" "}
                <time dateTime={format(selectedDay, "yyyy-MM-dd")}>
                  {format(selectedDay, "MMM dd, yyy")}
                </time>
              </h2>
              <ol className="mt-4 space-y-1 text-sm leading-6 text-gray-500">
                {selectedMeeting.length > 0 ? (
                  selectedMeeting.map((meeting) => (
                    <Meeting meeting={meeting} key={meeting._id} />
                  ))
                ) : (
                  <p>No meetings for today.</p>
                )}
              </ol>
            </section>
          </div>
        </div>
      </div>
    </TableContainer>
  );
}

function Meeting({ meeting }) {
  let startDateTime = parseISO(meeting.date);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const dispatch = useDispatch();
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const [openDeleteBox, setopenDeleteBox] = useState(false);
  const handleOpenDelete = () => {

    setopenDeleteBox(true);
  };

  const handleCloseDelete = () => {
    setopenDeleteBox(false);
  };
  const handleDelete =  async () => {
    await dispatch(deleteAppointment(meeting._id))
    window.location.reload()
    setopenDeleteBox(false);
  };

  const [openInfo, setOpenInfo] = useState(false);

  const handleOpenInfo = () => {
    setOpenInfo(true);
  };

  const handleCloseInfo = () => {
    setOpenInfo(false);
  };
  return (
    <li className="flex items-center px-4 py-2 space-x-4 group rounded-xl focus-within:bg-gray-100 hover:bg-gray-100">
      <div className="flex-auto">
        <p className="text-gray-900">
          Customer : {meeting.customer.name || meeting.customerName}
        </p>
        <p className="mt-0.5 meeting-info">
          <time dateTime={meeting.startDatetime}>
            {format(startDateTime, "h:mm a")}
          </time>
        </p>
      </div>
      <div>
        <IconButton
          aria-label="more"
          id="long-button"
          aria-controls={open ? "long-menu" : undefined}
          aria-expanded={open ? "true" : undefined}
          aria-haspopup="true"
          onClick={handleClick}
        >
          <MoreVertIcon sx={{ color: "black" }} />
        </IconButton>
        <Menu
          id="fade-menu"
          MenuListProps={{
            "aria-labelledby": "fade-button",
          }}
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          TransitionComponent={Fade}
        >
          <MenuItem onClick={handleOpenInfo}>Show</MenuItem>
          <MenuItem onClick={handleOpenDelete}>Delete</MenuItem>
        </Menu>
        <Dialog
          open={openDeleteBox}
          onClose={handleCloseDelete}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle
            id="alert-dialog-title"
            sx={{ fontSize: "2.5rem", color: "rgb(222, 64, 33) !important" }}
          >
            {"Allert "}
          </DialogTitle>
          <DialogContent>
            <DialogContentText
              id="alert-dialog-description"
              sx={{ fontSize: "2.5rem",textAlign:"center" }}
            >
              Do you want to remove this record ?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDelete}>Disagree</Button>
            <Button onClick={handleDelete} autoFocus>
              Agree
            </Button>
          </DialogActions>
        </Dialog>

        <Dialog
          open={openInfo}
          onClose={handleCloseInfo}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          className="dialogBox"
        >
          <DialogTitle
            id="alert-dialog-title"
            sx={{ fontSize: "2.5rem", color: "rgb(222, 64, 33) !important" }}
          >
            Appointment Information
          </DialogTitle>
          <DialogContent className="history-modal-content" >
            <div>
              <p>
                <span>Customer Name: </span>{" "}
                <span style={priceStyle}>
                  {meeting.customer.name || meeting.customerName}
                </span>
              </p>
              <p>
                <span>Phone Number: </span>{" "}
                <span style={priceStyle}>
                  {meeting.customer.phoneNumber || meeting.phoneNumber}
                </span>
              </p>
              <p>
                <span>Staff Name: </span>{" "}
                <span style={priceStyle}>{meeting.staff.name}</span>
              </p>
              <p>
                <span>Service Name: </span>{" "}
                <span style={priceStyle}>{meeting.appointmentType.name}</span>
              </p>
              <p>
                <span>Time: </span>{" "}
                <span style={priceStyle}>
                  {formatDate(new Date(meeting.date))}{" "}
                  {format(startDateTime, "h:mm a")}
                </span>
              </p>
            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseInfo}>Disagree</Button>
            <Button onClick={handleCloseInfo} autoFocus>
              Agree
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </li>
  );
}
let colStartClasses = [
  "",
  "col-start-2",
  "col-start-3",
  "col-start-4",
  "col-start-5",
  "col-start-6",
  "col-start-7",
];

const priceStyle = {
  float: "right",
  color: "grey",
};

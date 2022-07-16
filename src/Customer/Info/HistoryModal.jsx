import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { format, parseISO } from 'date-fns';
import "./style.css";
import formatDate from "../../lib/formatDate";
const priceStyle = {
  float: "right",
  color: "grey",
};
export default function HistoryModal({ open, setOpen,history }) {
  const handleClose = () => setOpen(false);
  let startDateTime = parseISO(history.date);
  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle
          id="alert-dialog-title"
          sx={{ color: "rgb(249, 163, 146)" }}
        >
          {"Services"}
        </DialogTitle>
        <DialogContent className="history-modal-content">
        <div>
              <p>
                <span>Customer Name: </span>{" "}
                <span style={priceStyle}>
                  {history.customer.name || history.customerName}
                </span>
              </p>
              <p>
                <span>Phone Number: </span>{" "}
                <span style={priceStyle}>
                  {history.customer.phoneNumber || history.phoneNumber}
                </span>
              </p>
              <p>
                <span>Staff Name: </span>{" "}
                <span style={priceStyle}>{history.staff.name}</span>
              </p>
              <p>
                <span>Service Name: </span>{" "}
                <span style={priceStyle}>{history.appointmentType.name}</span>
              </p>
              <p>
                <span>Time: </span>{" "}
                <span style={priceStyle}>
                  {formatDate(new Date(history.date))}{" "}
                  {format(startDateTime, "h:mm a")}
                </span>
              </p>
            </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} sx={{ color: "rgb(249, 163, 146)" }}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

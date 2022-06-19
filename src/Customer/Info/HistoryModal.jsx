import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import "./style.css";
const priceStyle = {
  float: "right",
  color: "grey",
};
export default function HistoryModal({ open, setOpen }) {
  const handleClose = () => setOpen(false);
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
              <span>Product 1</span> <span style={priceStyle}>$15</span>
            </p>
            <p>
              <span>Product 2</span> <span style={priceStyle}>$5</span>
            </p>
            <p>
              <span>Product 3</span> <span style={priceStyle}>$8</span>
            </p>
            <p>
              <span>Product 4</span> <span style={priceStyle}>$2</span>
            </p>
            <hr />
            <span>
              Total <span style={priceStyle}>$30</span>
            </span>
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

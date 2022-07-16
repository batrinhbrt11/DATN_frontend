import { IconButton } from '@mui/material'
import React, { useState } from 'react'
import { CardContent, ItemCard } from '../ShareStyled'
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import HistoryModal from './HistoryModal';
import formatDate from '../../lib/formatDate';
import { format, parseISO } from 'date-fns';
export default function ItemHis({history}) {
    let startDateTime = parseISO(history.date);
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
  return (
    <>    <ItemCard>
    <CardContent>
      <span
        style={{
          fontWeight: 700,
          marginBottom: "10px",
          fontSize: "1.5rem",
        }}
      >
        Service:{" "}
        <span
          style={{
            fontWeight: 500,
            fontSize: "1.5rem",
            textAlign: "right",
          }}
        >
          {history.appointmentType.name}
        </span>
      </span>
      <br />
      <span
        style={{
          fontWeight: 700,
          marginBottom: "10px",
          fontSize: "1.5rem",
        }}
      >
        Date:{" "}
        <span
          style={{
            fontWeight: 500,
            fontSize: "1.5rem",
            fontStyle: "italic",
            textAlign: "right",
          }}
        >
            {formatDate(new Date(history.date))}{" "}
            {format(startDateTime, "h:mm a")}
        </span>
      </span>
    </CardContent>
    <IconButton aria-label="delete" size="large" onClick={handleOpen}>
      <RemoveRedEyeIcon fontSize="inherit" />
    </IconButton>
    

  </ItemCard>
          <HistoryModal open={open} setOpen={setOpen} history={history}/>
    </>

  )
}

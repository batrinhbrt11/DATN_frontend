import React, { useState } from "react";
import {
  CardContent,
  Content,
  ContentContainer,
  ItemCard,
} from "../ShareStyled";
import "./style.css";
import IconButton from "@mui/material/IconButton";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import HistoryModal from "./HistoryModal";
export default function History() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  return (
    <div>
      <div className="info-title">
        <h3 style={{ fontWeight: "900" }}>Your History</h3>
      </div>
      <ContentContainer>
        <Content>
          <ItemCard>
            <CardContent>
              <span
                style={{
                  fontWeight: 700,
                  marginBottom: "10px",
                  fontSize: "1.5rem",
                }}
              >
                Pay:{" "}
                <span
                  style={{
                    fontWeight: 500,
                    fontSize: "1.5rem",
                    textAlign: "right",
                  }}
                >
                  200000
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
                  20/11/2020
                </span>
              </span>
            </CardContent>
            <IconButton aria-label="delete" size="large" onClick={handleOpen}>
              <RemoveRedEyeIcon fontSize="inherit" />
            </IconButton>
          </ItemCard>
        </Content>

        <HistoryModal open={open} setOpen={setOpen} />
      </ContentContainer>
    </div>
  );
}

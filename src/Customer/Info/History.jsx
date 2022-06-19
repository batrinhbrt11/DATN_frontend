import React, { useState } from "react";
import { ContentContainer } from "../ShareStyled";
import "./style.css";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import styled from "styled-components";
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
        <Stack spacing={2}>
          <Pagination count={10} shape="rounded" sx={{ fontSize: "1.5rem" }} />
        </Stack>
        <HistoryModal open={open} setOpen={setOpen} />
      </ContentContainer>
    </div>
  );
}
const Content = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin: 20px 0 5px 0;

  @media (max-width: 584px) {
    max-height: 280px;
    overflow-y: scroll;
    &::-webkit-scrollbar {
      width: 5px;
    }
  }
`;
const ItemCard = styled.div`
  margin-bottom: 15px;
  width: calc(100% / 2 - 20px);
  color: #fff;
  background-color: #f9a392;
  padding: 25px 30px;
  border-radius: 5px;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.15);
  display: flex;
  justify-content: space-between;
  @media (max-width: 584px) {
    margin-bottom: 15px;
    width: 100%;
  }
`;
const CardContent = styled.div``;

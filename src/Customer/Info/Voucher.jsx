import React, { useState } from "react";
import {
  CardContent,
  Content,
  ContentContainer,
  ItemCard,
} from "../ShareStyled";
import "./style.css";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

import HistoryModal from "./HistoryModal";
import CloseIcon from "@mui/icons-material/Close";
import CheckIcon from "@mui/icons-material/Check";
import { useSelector } from "react-redux";
import { selectUserId } from "../../redux/infoSlice";
import { useEffect } from "react";
import { getVoucherOfCustomer } from "../Logon/api";
import formatDate from "../../lib/formatDate";
export default function Voucher() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const id = useSelector(selectUserId);
  const [data, setData] = useState([]);
  const getData = async () => {
    const res = await getVoucherOfCustomer(id);
    console.log(res)
    setData(res.vouchers)
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <div>
      <div className="info-title">
        <h3 style={{ fontWeight: "900" }}>Your Voucher</h3>
      </div>
      <ContentContainer>
        <Content>
          {data?.map(d => (
            <ItemCard>
              <CardContent>
                <span
                  style={{
                    fontWeight: 700,
                    marginBottom: "10px",
                    fontSize: "1.5rem",
                  }}
                >
                  Voucher Code:{" "}
                  <span
                    style={{
                      fontWeight: 500,
                      fontSize: "1.5rem",
                      textAlign: "right",
                    }}
                  >
                    {d.voucherCode}
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
                  Voucher Name:{" "}
                  <span
                    style={{
                      fontWeight: 500,
                      fontSize: "1.5rem",
                      fontStyle: "italic",
                      textAlign: "right",
                    }}
                  >
                    {d.voucherName}
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
                  Expiration date:{" "}
                  <span
                    style={{
                      fontWeight: 500,
                      fontSize: "1.5rem",
                      fontStyle: "italic",
                      textAlign: "right",
                    }}
                  >
                    {formatDate(new Date(d.dueDate))}
                  </span>
                </span>
              </CardContent>
              {d.isUsed ?   <CloseIcon fontSize="large" style={{ color: "#f10000" }} /> :  <CheckIcon fontSize="large" style={{ color: "#3bf100" }} />}
            </ItemCard>
          ))}

       

        </Content>
        <HistoryModal open={open} setOpen={setOpen} />
      </ContentContainer>
    </div>
  );
}

import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { ButtonBox, TableContainer, TableHeader } from "../Styled";
import { FormContainer, InputBox } from "../Styled";
import { useNavigate, useParams } from "react-router-dom";
import { getCustomerVoucher, getInfoCustomer } from "./api";
import formatDate from "../../lib/formatDate";
import VoucherTable from "../Voucher/VoucherTable";
export default function ShowCustomer() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [customer, setCustomer] = useState({});
  const [data,setData]= useState([])
  const getCustomer = async () => {
    const res = await getInfoCustomer(id);
    setCustomer(res);
  };
  const getListVoucher = async()=>{
    const res = await getCustomerVoucher(id)
    console.log(res)
    setData(res)
  }
  useEffect(() => {
    getCustomer();
    getListVoucher()
  }, [id]);

  

  return (
    <TableContainer>
      <TableHeader>
        <h2>Customer's Information</h2>
        <Button
          variant="contained"
          className="edit-btn"
          sx={{ fontSize: "2rem" }}
          onClick={() => navigate(`/admin/customers/${id}/edit`)}
        >
          Edit
        </Button>
      </TableHeader>

      {customer && (
        <FormContainer>
          <InputBox>
            <span>Full Name</span>
            <input type="text" defaultValue={customer.name} disabled />
          </InputBox>
          <InputBox>
            <span>Email</span>
            <input type="text" defaultValue={customer.email} disabled />
          </InputBox>
          <InputBox>
            <span>Phone Number</span>
            <input type="text" defaultValue={customer.phoneNumber} disabled />
          </InputBox>
          <InputBox>
            <span>Birthday</span>
            <input
              type="date"
              value={formatDate(new Date(customer.birth))}
              disabled
            />
          </InputBox>
          <InputBox></InputBox>
          <ButtonBox>
            <button>Give a Voucher</button>
          </ButtonBox>
        </FormContainer>
      )}


      <VoucherTable data={data} user={true}/>
    </TableContainer>
  );
}

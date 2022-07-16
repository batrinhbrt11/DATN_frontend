import {
  Autocomplete,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { TableContainer, TableHeader } from "../Styled";
import { FormContainer, InputBox } from "../Styled";
import { useNavigate, useParams } from "react-router-dom";
import {
  deleteVoucherOfCustomer,
  getCustomerVoucher,
  getInfoCustomer,
  giveVoucherForCustomer,
} from "./api";
import formatDate from "../../lib/formatDate";
import VoucherTable from "../Voucher/VoucherTable";
import { useDispatch, useSelector } from "react-redux";
import { getAllVoucher } from "../../redux/VoucherSlice";
export default function ShowCustomer() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [customer, setCustomer] = useState({});
  const [data, setData] = useState([]);
  const [addVouchers, setAddVouchers] = useState([]);
  const listVoucher = useSelector((state) => state.vouchers);
  const dispatch = useDispatch();
  const [vouchers, setVouchers] = useState(listVoucher.vouchers);
  const getCustomer = async () => {
    const res = await getInfoCustomer(id);
    setCustomer(res);
  };
  const getListVoucher = async () => {
    const res = await getCustomerVoucher(id);
    setData(res);
  };
  useEffect(() => {
    dispatch(getAllVoucher());
  }, [dispatch]);
  useEffect(() => {
    getCustomer();
    getListVoucher();
  }, [id]);

  useEffect(() => {
    setVouchers(listVoucher.vouchers);
  }, [listVoucher]);

  const [openDialog, setOpenDialog] = useState(false);

  const handleClickOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };
  const deleteVoucher = async (id) => {
    const res = await deleteVoucherOfCustomer(id);
    if (res === 200) {
      setData([...data.filter((d) => d.voucherCustomerId !== id)]);
    }
  };
  const handleAddVoucher = () => {
    addVouchers.map((v) => giveVoucherForCustomer(v._id, id));
    setOpenDialog(false);
    window.location.reload();
  };
  return (
    <TableContainer>
      <TableHeader>
        <h2>Customer's Information</h2>
        <div>
          <Button
            variant="contained"
            className="edit-btn"
            sx={{ fontSize: "2rem", marginRight: "20px" }}
            onClick={handleClickOpenDialog}
          >
            Gift
          </Button>
          <Button
            variant="contained"
            className="edit-btn"
            sx={{ fontSize: "2rem" }}
            onClick={() => navigate(`/admin/customers/${id}/edit`)}
          >
            Edit
          </Button>
        </div>
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
        </FormContainer>
      )}

      {data?.length > 0 && (
        <VoucherTable
          data={data}
          user={true}
          deleteVoucherOfCustomer={deleteVoucher}
        />
      )}

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle
          sx={{ fontSize: "2.5rem", color: "rgb(222, 64, 33) !important" }}
        >
          Add Voucher
        </DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ fontSize: "2.5rem" ,textAlign:"center" }}>
            Give vouchers for This Customer
          </DialogContentText>
          <Autocomplete
            multiple
            limitTags={2}
            id="multiple-limit-tags"
            options={vouchers}
            getOptionLabel={(option) => option.voucherName}
            defaultValue={[]}
            renderInput={(params) => (
              <TextField {...params} label="Vouchers" placeholder="Voucher" />
            )}
            isOptionEqualToValue={(option, value) => option._id === value._id}
            onChange={(event, value) => setAddVouchers(value)}
            sx={{ width: "500px" }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleAddVoucher}>Give</Button>
        </DialogActions>
      </Dialog>
    </TableContainer>
  );
}

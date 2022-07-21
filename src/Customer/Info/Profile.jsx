import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import EditIcon from "@mui/icons-material/Edit";
import "./style.css";
import styled from "styled-components";
import { ContentContainer } from "../ShareStyled";
import formatDate from "../../lib/formatDate";
import { useDispatch, useSelector } from "react-redux";
import { editInfo, getInfo } from "../../redux/infoSlice";
import { useForm } from "react-hook-form";
import { changeAccountPassword } from "../Logon/api";
export default function Profile() {
  const [edit, setEdit] = useState(false);
  const info = useSelector((state) => state.info.info);
  const [user, setUser] = useState(info);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getInfo());
  }, [dispatch]);
  useEffect(() => {
    setUser(info);
  }, [info]);
  return (
    <div>
      <div className="info-title">
        <h3 style={{ fontWeight: "900" }}>Your Information </h3>
          <Button
          variant="contained"
          endIcon={<EditIcon />}
          className="edit-btn"
          onClick={() => setEdit(!edit)}
          sx={{ fontSize: "1.5rem", padding: "10px",marginRight:"10px" }}
        >
          Edit
        </Button> 
      
        
     
      </div>
      {edit ? <EditInfo user={user} /> : <Information user={user} />}
    </div>
  );
}

function EditInfo({ user }) {
  const dispatch = useDispatch();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const updateInfo = async (data) => {
    await dispatch(editInfo({ userId: user._id, data: data }));
  };
  return (
    <ContentContainer>
      <Title>Edit your Profile    </Title>
      <InfoForm onSubmit={handleSubmit(updateInfo)}>
        <UserDetails>
          <InputBox>
            <span>Email</span>
            <input type="text" defaultValue={user.email} disabled />
          </InputBox>
          <InputBox>
            <span>Name</span>
            <input
              type="text"
              defaultValue={user.name}
              required
              {...register("name", {
                required: "Name is not empty",
              })}
            />
            <p>{errors.name?.message}</p>
          </InputBox>

          <InputBox>
            <span>Phone Number</span>
            <input
              type="text"
              defaultValue={user.phoneNumber}
              required
              {...register("phoneNumber", {
                required: "Phone Number is not empty",
                pattern: {
                  value: /((09|03|07|08|05)+([0-9]{8})\b)/g,
                  message: "Phone Number format is incorrect",
                },
              })}
            />
            <p>{errors.phoneNumber?.message}</p>
          </InputBox>
          <InputBox>
            <span>Birthday</span>
            <input
              type="date"
              defaultValue={user.birth && formatDate(new Date(user.birth))}
              required
              {...register("birth", {
                required: "Birthday is not empty",
              })}
            />
            <p>{errors.birth?.message}</p>
          </InputBox>
          <InputBox>
            <br></br>
            <input type="submit" value="Update" />
          </InputBox>
        </UserDetails>
      </InfoForm>
    </ContentContainer>
  );
}
function Information({ user }) {
  const [change,setChange] = useState(false);
  
  return (
    <ContentContainer >
      <Title>Your Profile <Button
          variant="contained"
          endIcon={<EditIcon />}
          className="edit-btn"
          onClick={()=>setChange(!change)}
          sx={{ fontSize: "1.5rem", padding: "10px" }}
        >
          Change password
        </Button></Title>
      <InfoForm disabled>
        <UserDetails>
          <InputBox>
            <span>Email</span>
            <input type="text" defaultValue={user.email} disabled />
          </InputBox>
          <InputBox>
            <span>Name</span>
            <input type="text" defaultValue={user.name} disabled />
          </InputBox>
          <InputBox>
            <span>Phone Number</span>
            <input type="text" defaultValue={user.phoneNumber} disabled />
          </InputBox>
          <InputBox>
            <span>Birthday</span>
            <input
              type="text"
              defaultValue={formatDate(new Date(user.birth))}
              disabled
            />
          </InputBox>
        </UserDetails>
        
      </InfoForm>
      {
        change &&     <ChangePassword />
      }
    </ContentContainer>
  );
}

function ChangePassword() {
  const {
    register,
    formState: { errors },
    reset,
    handleSubmit,
  } = useForm();
  const [error,setError] = useState({status:"",msg:""});
  const changePassword = async (data)=>{
    if(data.newPassword !== data.reNewPassword){
      return setError({status:"error" ,msg: "Enter Renew Password is the same New password"})
    }
    const res= await changeAccountPassword(data)
    if(res === true){
      reset({
        password:"",
        newPassword:"",
        reNewPassword:""
      }
      )
      return setError({status:"success",msg:"Changing password successful"})
  
    }else{
      return setError({status:"error",msg:"Wrong Password!"})
    }
    
  }
  return (
    <div>
      <Title>Change password
      </Title>
      <InfoForm onSubmit={handleSubmit(changePassword )}>
        {
         ( error && error.status ==="error" ) && (<p style={{color:"red"}}>{error.msg}</p>)      
        }
              {
         ( error && error.status ==="success" ) && (<p style={{color:"#10bf10"}}>{error.msg}</p>)      
        }
        <UserDetails>
        <InputBox>
            <span>Old password</span>
            <input type="password"
          placeholder="Password"
          {...register("password", {
            required: "Password is not empty",
            minLength: {
              value: 6,
              message: "A minimum password length greater than 6",
            },
          })} />
            <p>{errors.password?.message}</p>
          </InputBox>
          <InputBox>
            <span>New password</span>
            <input type="password"
          placeholder="Password"
          {...register("newPassword", {
            required: "Password is not empty",
            minLength: {
              value: 6,
              message: "A minimum password length greater than 6",
            },
          })} />
              <p>{errors.newPassword?.message}</p>
          </InputBox>
          <InputBox>
            <span>Renew password</span>
            <input type="password"
          placeholder="Password"
          {...register("reNewPassword", {
            required: "Password is not empty",
            minLength: {
              value: 6,
              message: "A minimum password length greater than 6",
            },
          })} />
           <p>{errors.reNewPassword?.message}</p>
          </InputBox>
          <InputBox>
            <br></br>
            <input type="submit" value="Change" />
          </InputBox>
        </UserDetails>
      </InfoForm>
      </div>
  );
}


const InfoForm = styled.form``;
const UserDetails = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin: 20px 0 12px 0;
  @media (max-width: 584px) {
    max-height: 290px;
    overflow-y: scroll;
    &::-webkit-scrollbar {
      width: 5px;
    }
  }
`;
const InputBox = styled.div`
  margin-bottom: 15px;
  width: calc(100% / 2 - 20px);
  & span {
    display: block;
    font-weight: 500;
    margin-bottom: 5px;
  }
  & p {
    font-size: 1.5rem;
    color: #df0029d9;
  }
  & input {
    height: 45px;
    width: 100%;
    outline: none;
    font-size: 16px;
    border-radius: 5px;
    padding-left: 15px;
    border: 1px solid #ccc;
    border-bottom-width: 2px;
    transition: all 0.3s ease;
    &:focus,
    &:valid {
      border-color: #f9a392;
    }
  }
  & input[type="submit"] {
    border-radius: 5px;
    border: none;
    color: #fff;
    font-size: 18px;
    font-weight: 500;
    letter-spacing: 1px;
    cursor: pointer;
    transition: all 0.3s ease;
    background: #f9a392;
  }
  @media (max-width: 584px) {
    margin-bottom: 15px;
    width: 100%;
  }
`;
const Title = styled.h3`
  color: #f9a392;
  font-weight: 700;
`;

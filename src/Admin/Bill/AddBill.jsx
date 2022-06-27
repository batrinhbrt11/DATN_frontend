import React, { useEffect, useState } from "react";
import {
  FormContainer,
  InputBox,
  SelectBox,
  TableContainer,
  TableHeader,
} from "../Styled";
import Multiselect from "multiselect-react-dropdown";
export default function AddBill() {
  const [data, setData] = useState([
    {
      name: "Group 1",
      cost: 10,
    },
    {
      name: "Group 2",
      cost: 20,
    },
    {
      name: "Group 3",
      cost: 30,
    },
    {
      name: "Group 4",
      cost: 40,
    },
    {
      name: "Group 5",
      cost: 50,
    },
    {
      name: "Group 6",
      cost: 60,
    },
    {
      name: "Group 7",
      cost: 70,
    },
  ]);
  const [selectedValue, setSelectedValue] = useState([]);
  useEffect(() => {
    console.log(selectedValue);
  }, [selectedValue]);
  return (
    <TableContainer>
      <TableHeader>
        <h2>Add Bill</h2>
      </TableHeader>
      <div>
        <FormContainer>
          <InputBox>
            <span>Phone number</span>
            <input type="text" placeholder="Enter your name" />
          </InputBox>
          <InputBox>
            <span>Full name</span>
            <input type="text" placeholder="Enter your name" />
          </InputBox>
          <SelectBox>
            <span>Services</span>
            <Multiselect
              displayValue="name"
              onKeyPressFn={function noRefCheck() {}}
              onRemove={function noRefCheck() {}}
              onSearch={function noRefCheck() {}}
              onSelect={(event, value) => {
                setSelectedValue([...selectedValue, value]);
              }}
              options={data}
              style={{
                chips: {
                  background: "#f9a392",
                },
              }}
            />
            <div style={{ marginTop: "10px" }}>
              <span>
                {selectedValue &&
                  selectedValue.map((item) => (
                    <div key={item.name}>
                      <p>
                        <span>{item.name}</span>
                        <span style={priceStyle}>{item.cost}</span>
                      </p>
                    </div>
                  ))}

                <hr />
                <span>
                  Total{" "}
                  <span style={priceStyle}>
                    {selectedValue.reduce(function (
                      previousValue,
                      currentValue
                    ) {
                      return previousValue + currentValue.cost;
                    },
                    0)}
                  </span>
                </span>
              </span>
            </div>
          </SelectBox>

          <InputBox></InputBox>
          <InputBox>
            <input type="submit" value="Save" />
          </InputBox>
        </FormContainer>
      </div>
    </TableContainer>
  );
}
const priceStyle = {
  float: "right",
  color: "grey",
};

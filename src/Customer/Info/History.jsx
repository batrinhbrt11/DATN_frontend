import React, { useEffect, useState } from "react";
import { Content, ContentContainer } from "../ShareStyled";
import "./style.css";
import { getHistoryOfCustomer } from "../Logon/api";
import ItemHis from "./ItemHis";
export default function History() {
  const [data, setData] = useState([]);
  const getData = async () => {
    const res = await getHistoryOfCustomer();
    setData(res);
    console.log(res);
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <div>
      <div className="info-title">
        <h3 style={{ fontWeight: "900" }}>Your History</h3>
      </div>
      <ContentContainer>
        <Content>
          {data?.map((d) => (
            <ItemHis key= {d._id} history={d} />
          ))}
        </Content>
      </ContentContainer>
    </div>
  );
}

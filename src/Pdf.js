import React, { useState } from "react";
import axios from "axios";
import { jsPDF } from "jspdf";
import "jspdf-autotable";

const Pdf = () => {
  const [dat, setDat] = useState([]);
  const getDataHandler = async () => {
    const { data } = await axios.get(
      "https://jsonplaceholder.typicode.com/users"
    );
    console.log(data);
    console.log();
    setDat(data);
  };

  const createHeaders =  (keys) => {
    const result = []
    keys?.map(key =>{
        result.push({
            id: key,
            name: key,
            prompt:key
        });
    })
   return result
  }
  const exportPdf = () => {
    const headers =  createHeaders([
        'id',
        'name',
        'email'
    ])
    const doc = new jsPDF({ orientation: "landscape" });
    // this aproach is valied while exporting whole table data
    // doc.autoTable({
    //   html: "#my-table",
    // });

    //custmised
    const tableData = dat?.map((row) => ({
        ...row,
        id: row?.id.toString(),
        name:row?.name.toString(),
        email: row?.email.toString(),

    }))

    doc.table(1, 1, tableData, headers,{ autoSize: true} )

    doc.save("data.pdf");
  };
  return (
    <>
      <h1>Hello CodeSandbox</h1>
      <button onClick={getDataHandler}>Fetch Data</button>

      {dat?.length ? (
        <>
          <button
            className="btn btn-primary float-end m-2 p-2"
            onClick={exportPdf}
          >
            Export
          </button>
          <table className="table-success " id="my-table">
            <thead className="table-warning  ">
              <tr className="table-warning ">
                <th scope="col">id</th>
                <th scope="col">name</th>
                <th scope="col">username</th>
                <th scope="col">email</th>
                <th scope="col">address</th>
              </tr>
            </thead>
            <tbody>
              {dat?.map((item, index) => (
                <tr key={index}>
                  <td>{item.id}</td>
                  <td>{item.name}</td>
                  <td>{item.username}</td>
                  <td>{item.email}</td>
                  <td>{item.address.city}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      ) : (
        " fetch to get data"
      )}
    </>
  );
};

export default Pdf;

import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Nav from "./Nav";

const Viewproductlot = () => {
  const nav = useNavigate();
  const [data, setData] = useState([]);
  const [value, setvalue] = useState([]);
  console.log(window.localStorage.getItem("address"));
  useEffect(() => {
    axios
      .post("http://localhost:5000/food/viewproductlot", {
        address: window.localStorage.getItem("address"),
      })
      .then((response) => {
        setData(response.data);
        setvalue(response.data);
      });
  }, []);
  const viewproductlot = (e) => {
    nav("/updateproductlot", { state: e });
  };
  const deletec = (e) => {
    axios
      .post("http://localhost:5000/food/deleteproductlot", { id: e })
      .then((response) => {
        axios
          .post("http://localhost:5000/food/viewproductlot")
          .then((response) => {
            setData(response.data);
            setvalue(response.data);
          });
      });
  };
  const searchdata = (e) => {
    const r = [];

    for (var k of value) {
      var v = 0;

      for (var n of k) {
        n = "" + n;
        if (n.toLowerCase().indexOf(e) !== -1) {
          v = 1;
          break;
        }
      }
      if (v === 1) {
        r.push(k);
      }
    }
    setData(r);
  };

  return (
    <div className="row">
      <div className="col-2">
        <Nav />
      </div>
      <div className="col-10" style={{ width: "80%" }}>
        <h3>productlot</h3>
        <input
          type="search"
          onChange={(e) => searchdata(e.target.value)}
          className="form-select"
          placeholder="Search"
        />
        <div className="table-responsive">
          <table className="table table-bordered" id="table_id">
            <thead>
              <tr>
                <th>productid</th>
                <th>productname</th>
                <th>owners</th>
                <th>seedid</th>
              </tr>
            </thead>
            <tbody>
              {data.map((d) => {
                return (
                  <tr key={d[0]}>
                    <td>{d[0]}</td>
                    <td>{d[1]}</td>
                    <td>{window.localStorage.getItem("address")}</td>
                    <td>{d[3]}</td>
                    {window.localStorage.getItem("role") === "Retailer" ? (
                      <button className="btn btn-primary" onClick={()=>{
                        axios
                        .post("http://localhost:5000/food/generateqr", {
                          productid:d[0],
                        })
                        .then((response) => {
                            alert("qr generated success")
                        });
                      }}>Generate Qr</button>
                    ) : (
                      ""
                    )}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
export default Viewproductlot;

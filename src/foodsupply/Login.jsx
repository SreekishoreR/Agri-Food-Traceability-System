import axios from "axios";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

const Login = () => {
  const [companyname, setcompanyname] = useState("");
  const [pass, setpass] = useState("");
  const [person, setperson] = useState();
  const nav = useNavigate();

  const submitdata = () => {
    console.log([companyname, pass]);
    if (companyname !== "" && pass !== "") {
      if (companyname === "admin" && pass === "1212") {
        window.localStorage.setItem("role", "admin");
        nav("/admin");
      } else {
        const value = {
          name: companyname,
          pass: pass,
          person: person,
        };
        axios.post("http://localhost:5000/food/login", value).then((res) => {
          if (res.data !== null) {
            console.log(res.data);
            window.localStorage.setItem("address", res.data[0]);
            window.localStorage.setItem("privatekey", res.data[1]);
            window.localStorage.setItem("role", res.data[2]);
            console.log(res.data[2]);
            if (person === "Supplier") {
              window.localStorage.setItem("id", res.data[0]);
              nav("/viewseed");
            } else if (person === "Farmer") {
              window.localStorage.setItem("id", res.data[0]);
              nav("/viewseed");
            } else if (person === "Grain_Elevator") {
              window.localStorage.setItem("id", res.data[0]);
              nav("/viewproductlot");
            } else if (person === "Grain_Process") {
              window.localStorage.setItem("id", res.data[0]);
              nav("/viewproductlot");
            } else if (person === "Distributer") {
              window.localStorage.setItem("id", res.data[0]);
              nav("/viewproductlot");
            } else if (person === "Retailer") {
              window.localStorage.setItem("id", res.data[0]);
              nav("/viewproductlot");
            }
          } else {
            alert("Fill all details");
          }
        });
      }
    } else {
      alert("kindly fill all data");
    }
  };

  return (
    <div
      className="d-flex align-items-center justify-content-center vh-100"
      style={{
        backgroundImage:
          "url('https://repository-images.githubusercontent.com/237794964/a3d29a80-4614-11ea-83d6-f81fca3b6d69')",
        backgroundSize: "cover",
      }}
    >
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div
              className="card shadow-lg"
              style={{ backgroundColor: "blue", color: "white" }}
            >
              <NavLink to="/search">
                <button className="btn btn-danger">Search Product</button>
              </NavLink>
              <div className="card-body">
                <h5 className="card-title text-center mb-4">Login</h5>
                <form>
                  <div className="mb-3">
                    <label htmlFor="blockchainAddress" className="form-label">
                      Block chain address
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="blockchainAddress"
                      onChange={(e) => setcompanyname(e.target.value)}
                      value={companyname}
                      placeholder="Enter Block chain address"
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="privateKey" className="form-label">
                      Private Key
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      id="privateKey"
                      onChange={(e) => setpass(e.target.value)}
                      value={pass}
                      placeholder="Enter privatekey"
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="userType" className="form-label">
                      User Type
                    </label>
                    <select
                      className="form-select"
                      id="userType"
                      onChange={(e) => setperson(e.target.value)}
                      value={person}
                    >
                      <option selected disabled>
                        Select User
                      </option>
                      <option>Farmer</option>
                      <option>Supplier</option>
                      <option>Grain_Elevator</option>
                      <option>Grain_Process</option>
                      <option>Distributer</option>
                      <option>Retailer</option>
                    </select>
                  </div>
                  <button
                    type="button"
                    className="btn btn-primary w-100"
                    onClick={submitdata}
                  >
                    Login
                  </button>
                </form>
                <p className="text-center mt-3">
                  Don't have an account?{" "}
                  <NavLink to="/Register">Register</NavLink>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

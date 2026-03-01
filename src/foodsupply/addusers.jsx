import axios from "axios";
import { useState } from "react";
import { NavLink } from "react-router-dom";
const Addusers = () => {
  const [fname, setfname] = useState("");
  const [mobile, setmobile] = useState("");
  const [blockchainaddress, setblockchainaddress] = useState("");
  const [privatekey, setprivatekey] = useState("");
  const [role, setrole] = useState();
  const submitdata = () => {
    const value = {
      fname: fname,
      mobile: mobile,
      blockchainaddress: blockchainaddress,
      privatekey: privatekey,
      role: role,
    };
    axios.post("http://localhost:5000/food/insertusers", value).then((res) => {
      alert("success");
      setfname("");
      setmobile("");
      setblockchainaddress("");
      setprivatekey("");
      setrole();
    });
  };
  return (
    <div>
      <h1>Add users</h1>
      <div className="form-floating mb-3 mt-3">
        <input
          type="text"
          className="form-control"
          onChange={(e) => setfname(e.target.value)}
          value={fname}
          placeholder="Enter fname"
        />
        <label htmlFor="fname">fname</label>
      </div>

      <div className="form-floating mb-3 mt-3">
        <input
          type="text"
          className="form-control"
          onChange={(e) => setmobile(e.target.value)}
          value={mobile}
          placeholder="Enter mobile"
        />
        <label htmlFor="mobile">mobile</label>
      </div>

      <div className="form-floating mb-3 mt-3">
        <input
          type="text"
          className="form-control"
          onChange={(e) => setblockchainaddress(e.target.value)}
          value={blockchainaddress}
          placeholder="Enter blockchainaddress"
        />
        <label htmlFor="blockchainaddress">blockchainaddress</label>
      </div>

      <div className="form-floating mb-3 mt-3">
        <input
          type="text"
          className="form-control"
          onChange={(e) => setprivatekey(e.target.value)}
          value={privatekey}
          placeholder="Enter privatekey"
        />
        <label htmlFor="privatekey">privatekey</label>
      </div>

      <div className="form-outline mb-3">
        <select
          id="form3Example4"
          className="form-control form-control-lg"
          onChange={(e) => setrole(e.target.value)}
          value={role}
        >
          <option selected disabled>
            Select User
          </option>
          <option>Farmer</option>
          <option>Supplier</option>
          <option>Grain_Elevator </option>
          <option>Grain_Process </option>
          <option>Distributer</option>
          <option>Retailer</option>
        </select>
      </div>

      <input
        type="submit"
        className="btn btn-primary"
        onClick={submitdata}
        style={{ width: "100%" }}
      />
      <NavLink to="/">Login</NavLink>
    </div>
  );
};
export default Addusers;

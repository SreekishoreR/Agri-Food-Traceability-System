import axios from "axios";
import { useState } from "react";
import Nav from "./Nav";
const Addseed = () => {
  const [seedname, setseedname] = useState("");
  const [growthtime, setgrowthtime] = useState("");
  const [ownerid, setownerid] = useState(
    window.localStorage.getItem("address")
  );
  const submitdata = () => {
    const value = {
      seedname: seedname,
      growthtime: growthtime,
      ownerid: ownerid,
      privatekey: window.localStorage.getItem("privatekey"),
    };
    axios.post("http://localhost:5000/food/insertseed", value).then((res) => {
      alert("success");
      setseedname("");
      setgrowthtime("");
    });
  };
  return (
    <div className="row">
      <div className="col-2">
        <Nav />
      </div>
      <div className="col-10" style={{ width: "80%" }}>
        <Nav />
        <h1>Add seed</h1>
        <div className="form-floating mb-3 mt-3">
          <input
            type="text"
            className="form-control"
            onChange={(e) => setseedname(e.target.value)}
            value={seedname}
            placeholder="Enter seedname"
          />
          <label htmlFor="seedname">seedname</label>
        </div>

        <div className="form-floating mb-3 mt-3">
          <input
            type="text"
            className="form-control"
            onChange={(e) => setgrowthtime(e.target.value)}
            value={growthtime}
            placeholder="Enter growthtime"
          />
          <label htmlFor="growthtime">Growthtime in days</label>
        </div>

        <div className="form-floating mb-3 mt-3">
          <input
            type="text"
            className="form-control"
            onChange={(e) => setownerid(e.target.value)}
            value={ownerid}
            placeholder="Enter ownerid"
            readOnly
          />
          <label htmlFor="ownerid">ownerid</label>
        </div>

        <input
          type="submit"
          className="btn btn-primary"
          onClick={submitdata}
          style={{ width: "100%" }}
        />
      </div>
    </div>
  );
};
export default Addseed;

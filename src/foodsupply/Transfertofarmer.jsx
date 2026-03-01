import axios from "axios";
import { useEffect, useState } from "react";
import Nav from "./Nav";
import Fileupload from "./Fileupload";
const Transfertofarmer = () => {
  const [seedname, setseedname] = useState("");
  const [growthtime, setgrowthtime] = useState("");
  const [ownerid, setownerid] = useState(
    window.localStorage.getItem("address")
  );
  const [data, setdata] = useState([]);
  const [value, setvalue] = useState([]);

  useEffect(() => {
    axios.post("http://localhost:5000/food/viewusers").then((response) => {
      var k = response.data.filter((x) => {
        return x[5] === "Farmer";
      });
      setdata(k);
    });
    axios
      .post("http://localhost:5000/food/viewseed", {
        address: window.localStorage.getItem("address"),
      })
      .then((response) => {
        setvalue(response.data);
      });
  }, []);
  const [file, setfile] = useState("");
  console.log(data);
  const submitdata = () => {
    const value = {
      seedname: seedname,
      growthtime: growthtime,
      ownerid: ownerid,
      privatekey: window.localStorage.getItem("privatekey"),
      file: file,
    };
    console.log(value);
    axios.post("http://localhost:5000/food/transferseed", value).then((res) => {
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
        <h1>Transfer seed</h1>
        <div className="form-floating mb-3 mt-3">
          <input
            list="browsers"
            name="browser"
            id="browser"
            className="form-control"
            onChange={(e) => setseedname(e.target.value)}
            value={seedname}
          />
          <datalist id="browsers">
            {data.map((d) => {
              return (
                <option>{d[0] + "-" + d[1] + "-" + d[3] + "-" + d[4]}</option>
              );
            })}
          </datalist>
          <label htmlFor="seedname">select farmer name</label>
        </div>

        <div className="form-floating mb-3 mt-3">
          <input
            list="browsers1"
            name="browser1"
            id="browser1"
            className="form-control"
            onChange={(e) => setgrowthtime(e.target.value)}
            value={growthtime}
          />
          <datalist id="browsers1">
            {value.map((d) => {
              return <option>{d[0] + "-" + d[1] + "-" + d[3]}</option>;
            })}
          </datalist>
          <label htmlFor="seedname">select Your crop</label>
        </div>

        <input
          type="submit"
          className="btn btn-primary"
          onClick={submitdata}
          style={{ width: "100%" }}
        />
        <Fileupload setfile={setfile} />
      </div>
    </div>
  );
};
export default Transfertofarmer;

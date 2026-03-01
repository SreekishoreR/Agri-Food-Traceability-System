
import axios from "axios";
import { useState } from "react";
import { useLocation,useNavigate  } from "react-router-dom";
const Updateseed = () => {
var rx=0;
const {state}=useLocation();
const nav = useNavigate();
const [seedid, setseedid] = useState(state[rx++]);
const [seedname, setseedname] = useState(state[rx++]);
const [growthtime, setgrowthtime] = useState(state[rx++]);
const [ownerid, setownerid] = useState(state[rx++]);
const submitdata = () => {
 const value={seedid:seedid,seedname:seedname,growthtime:growthtime,ownerid:ownerid};
axios.post("http://localhost:5000/food/updateseed", value).then
    (response=>{
      nav('/viewseed')
    })};
return (
<div>
    <h1>Add seed</h1>
        <div className="form-floating mb-3 mt-3">
          <input
            type="text"
            className="form-control"
            onChange={(e) => setseedid(e.target.value)}
            value={seedid}
            placeholder="Enter seedid"
          />
          <label htmlFor="seedid">seedid</label>
        </div>

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
          <label htmlFor="growthtime">growthtime</label>
        </div>

        <div className="form-floating mb-3 mt-3">
          <input
            type="text"
            className="form-control"
            onChange={(e) => setownerid(e.target.value)}
            value={ownerid}
            placeholder="Enter ownerid"
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
)
}
export default Updateseed;

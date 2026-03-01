
import axios from "axios";
import { useState } from "react";
import { useLocation,useNavigate  } from "react-router-dom";
const Updateusers = () => {
var rx=0;
const {state}=useLocation();
const nav = useNavigate();
const [uid, setuid] = useState(state[rx++]);
const [fname, setfname] = useState(state[rx++]);
const [mobile, setmobile] = useState(state[rx++]);
const [blockchainaddress, setblockchainaddress] = useState(state[rx++]);
const [privatekey, setprivatekey] = useState(state[rx++]);
const [role, setrole] = useState(state[rx++]);
const submitdata = () => {
 const value={uid:uid,fname:fname,mobile:mobile,blockchainaddress:blockchainaddress,privatekey:privatekey,role:role};
axios.post("http://localhost:5000/food/updateusers", value).then
    (response=>{
      nav('/viewusers')
    })};
return (
<div>
    <h1>Add users</h1>
        <div className="form-floating mb-3 mt-3">
          <input
            type="text"
            className="form-control"
            onChange={(e) => setuid(e.target.value)}
            value={uid}
            placeholder="Enter uid"
          />
          <label htmlFor="uid">uid</label>
        </div>

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

        <div className="form-floating mb-3 mt-3">
          <input
            type="text"
            className="form-control"
            onChange={(e) => setrole(e.target.value)}
            value={role}
            placeholder="Enter role"
          />
          <label htmlFor="role">role</label>
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
export default Updateusers;


import axios from "axios";
import { useState } from "react";
import { useLocation,useNavigate  } from "react-router-dom";
const Updatetransaction = () => {
var rx=0;
const {state}=useLocation();
const nav = useNavigate();
const [tid, settid] = useState(state[rx++]);
const [prod_id, setprod_id] = useState(state[rx++]);
const [fromid, setfromid] = useState(state[rx++]);
const [toid, settoid] = useState(state[rx++]);
const [transactiondate, settransactiondate] = useState(state[rx++]);
const [transaddress, settransaddress] = useState(state[rx++]);
const [remark, setremark] = useState(state[rx++]);
const submitdata = () => {
 const value={tid:tid,prod_id:prod_id,fromid:fromid,toid:toid,transactiondate:transactiondate,transaddress:transaddress,remark:remark};
axios.post("http://localhost:5000/food/updatetransaction", value).then
    (response=>{
      nav('/viewtransaction')
    })};
return (
<div>
    <h1>Add transaction</h1>
        <div className="form-floating mb-3 mt-3">
          <input
            type="text"
            className="form-control"
            onChange={(e) => settid(e.target.value)}
            value={tid}
            placeholder="Enter tid"
          />
          <label htmlFor="tid">tid</label>
        </div>

        <div className="form-floating mb-3 mt-3">
          <input
            type="text"
            className="form-control"
            onChange={(e) => setprod_id(e.target.value)}
            value={prod_id}
            placeholder="Enter prod_id"
          />
          <label htmlFor="prod_id">prod_id</label>
        </div>

        <div className="form-floating mb-3 mt-3">
          <input
            type="text"
            className="form-control"
            onChange={(e) => setfromid(e.target.value)}
            value={fromid}
            placeholder="Enter fromid"
          />
          <label htmlFor="fromid">fromid</label>
        </div>

        <div className="form-floating mb-3 mt-3">
          <input
            type="text"
            className="form-control"
            onChange={(e) => settoid(e.target.value)}
            value={toid}
            placeholder="Enter toid"
          />
          <label htmlFor="toid">toid</label>
        </div>

        <div className="form-floating mb-3 mt-3">
          <input
            type="text"
            className="form-control"
            onChange={(e) => settransactiondate(e.target.value)}
            value={transactiondate}
            placeholder="Enter transactiondate"
          />
          <label htmlFor="transactiondate">transactiondate</label>
        </div>

        <div className="form-floating mb-3 mt-3">
          <input
            type="text"
            className="form-control"
            onChange={(e) => settransaddress(e.target.value)}
            value={transaddress}
            placeholder="Enter transaddress"
          />
          <label htmlFor="transaddress">transaddress</label>
        </div>

        <div className="form-floating mb-3 mt-3">
          <input
            type="text"
            className="form-control"
            onChange={(e) => setremark(e.target.value)}
            value={remark}
            placeholder="Enter remark"
          />
          <label htmlFor="remark">remark</label>
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
export default Updatetransaction;

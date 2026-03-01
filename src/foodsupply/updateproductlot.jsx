
import axios from "axios";
import { useState } from "react";
import { useLocation,useNavigate  } from "react-router-dom";
const Updateproductlot = () => {
var rx=0;
const {state}=useLocation();
const nav = useNavigate();
const [productid, setproductid] = useState(state[rx++]);
const [productname, setproductname] = useState(state[rx++]);
const [owners, setowners] = useState(state[rx++]);
const [seedid, setseedid] = useState(state[rx++]);
const submitdata = () => {
 const value={productid:productid,productname:productname,owners:owners,seedid:seedid};
axios.post("http://localhost:5000/food/updateproductlot", value).then
    (response=>{
      nav('/viewproductlot')
    })};
return (
<div>
    <h1>Add productlot</h1>
        <div className="form-floating mb-3 mt-3">
          <input
            type="text"
            className="form-control"
            onChange={(e) => setproductid(e.target.value)}
            value={productid}
            placeholder="Enter productid"
          />
          <label htmlFor="productid">productid</label>
        </div>

        <div className="form-floating mb-3 mt-3">
          <input
            type="text"
            className="form-control"
            onChange={(e) => setproductname(e.target.value)}
            value={productname}
            placeholder="Enter productname"
          />
          <label htmlFor="productname">productname</label>
        </div>

        <div className="form-floating mb-3 mt-3">
          <input
            type="text"
            className="form-control"
            onChange={(e) => setowners(e.target.value)}
            value={owners}
            placeholder="Enter owners"
          />
          <label htmlFor="owners">owners</label>
        </div>

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

 <input
          type="submit"
          className="btn btn-primary"
          onClick={submitdata}
          style={{ width: "100%" }}
        />
</div>
)
}
export default Updateproductlot;


import axios from "axios";
import { useState } from "react";
const Addproductlot = () => {
const [productname, setproductname] = useState('');
const [owners, setowners] = useState('');
const [seedid, setseedid] = useState('');
const submitdata = () => {
 const value={productname:productname,owners:owners,seedid:seedid};
axios.post("http://localhost:5000/food/insertproductlot", value).then(res=>{
alert("success")
setproductname('');
setowners('');
setseedid('');
})};
return (
<div>
    <h1>Add productlot</h1>
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
export default Addproductlot;

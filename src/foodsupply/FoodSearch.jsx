import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const FoodSearch = () => {
  const { id } = useParams();
  const [data, setdata] = useState([]);
  const [value, setvalue] = useState([]);
  useEffect(() => {
    axios.post("http://localhost:5000/food/viewusers").then((response) => {
        var e={}
      for (var x of response.data)
      {
        
         e[x[0]]=x[3]
      }
    setdata(e);
    });
    axios
      .post("http://localhost:5000/food/viewhistory", {
        productid:id
      })
      .then((response) => {
     
        setvalue(response.data);
      });
  }, []);
  
console.log(data)
  return (
    <div >
      <div>
        <h2>Product Detail Page</h2>
        <p>Product ID: {id}</p>
        {/* Fetch product details based on the received ID */}
        <div className="table-responsive">
          <table className="table table-bordered" id="table_id">
            <thead>
              <tr>
                
                <th>Product id</th>
                <th>fromid</th>
                <th>toid</th>
                <th>date</th>
                <th>transacation</th>
                <th>remark</th>
                <th>File</th>
                <th>Hash</th>
              </tr>
            </thead>
            <tbody>
              {value.map((d) => {
                return (
                  <tr key={d[0]}>
                    
                    <td>{d[1]}</td>
                    <td>{data[d[2]]}</td>
                    <td>{data[d[3]]}</td>
                    <td>{d[4]}</td>
                    <td>{d[5]}</td>
                    <td>{d[6]}</td>
                    <td>{d[7]}</td>
                    <td>{d[8]}</td>
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

export default FoodSearch;

import { NavLink, useNavigate } from "react-router-dom";

import "./SideNav.css";
const Nav = () => {
  const nav = useNavigate();
  console.log(window.localStorage.getItem("role"));
  const check = () => {
    if (window.localStorage.getItem("role") === "Supplier") {
      return (
        <>
          <NavLink activeClassName="active" to="/addseed">
            Create Seed
          </NavLink>

          <NavLink activeClassName="active" to="/viewseed">
            View Seed
          </NavLink>

          <NavLink activeClassName="active" to="/viewseedhistory">
            View Seed history
          </NavLink>

          <NavLink activeClassName="active" to="/transfertofarmer">
            Transfer seed
          </NavLink>
        </>
      );
    } else if (window.localStorage.getItem("role") === "admin") {
      return (
        <NavLink activeClassName="active" to="/viewfarmer">
          View Farmer
        </NavLink>
      );
    } else if (window.localStorage.getItem("role") === "Farmer") {
      return (
        <>
          <NavLink activeClassName="active" to="/viewseed">
            View Seed
          </NavLink>

          <NavLink activeClassName="active" to="/viewseedhistory">
            View history
          </NavLink>

          <NavLink activeClassName="active" to="/convertproduct">
            Convert Seed
          </NavLink>

          <NavLink activeClassName="active" to="/viewproductlot">
            View Product
          </NavLink>

          <NavLink activeClassName="active" to="/transfertograinelevator">
            Transfertograinelevator
          </NavLink>
        </>
      );
    } else if (window.localStorage.getItem("role") === "Grain_Elevator") {
      return (
        <>
          <NavLink activeClassName="active" to="/viewseedhistory">
            View history
          </NavLink>

          <NavLink activeClassName="active" to="/viewproductlot">
            View Product
          </NavLink>

          <NavLink activeClassName="active" to="/transfertograinprocesser">
            Transfertograinprocessor
          </NavLink>
        </>
      );
    } else if (window.localStorage.getItem("role") === "Grain_Process") {
      return (
        <>
          <NavLink activeClassName="active" to="/viewseedhistory">
            View history
          </NavLink>

          <NavLink activeClassName="active" to="/viewproductlot">
            View Product
          </NavLink>

          <NavLink activeClassName="active" to="/transfertodis">
            Transfertodistributor
          </NavLink>
        </>
      );
    } else if (window.localStorage.getItem("role") === "Distributer") {
      return (
        <>
          <NavLink activeClassName="active" to="/viewseedhistory">
            View history
          </NavLink>

          <NavLink activeClassName="active" to="/viewproductlot">
            View Product
          </NavLink>

          <NavLink activeClassName="active" to="/transfertoret">
            TransfertoRetailer
          </NavLink>
        </>
      );
    } else if (window.localStorage.getItem("role") === "Retailer") {
      return (
        <>
          <NavLink activeClassName="active" to="/viewseedhistory">
            View history
          </NavLink>

          <NavLink activeClassName="active" to="/viewproductlot">
            View Product
          </NavLink>
        </>
      );
    }
  };
  return (
    <>
      <div className="sidebar">
        {check()}

        <p
          activeClassName="active"
          style={{
            textAlign: "left",
            color: "white",
            marginLeft: "10%",
            cursor: "pointer",
          }}
          onClick={() => {
            window.localStorage.clear();
            nav("/");
          }}
        >
          {window.localStorage.getItem("role")}
        </p>
      </div>
    </>
  );
};

export default Nav;

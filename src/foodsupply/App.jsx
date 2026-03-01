import { Route, Routes } from "react-router-dom";
import Updateproductlot from "./updateproductlot";
import Viewproductlot from "./viewproductlot";
import Addproductlot from "./addproductlot";
import Updateseed from "./updateseed";
import Viewseed from "./viewseed";
import Addseed from "./addseed";
import Updatetransaction from "./updatetransaction";
import Viewtransaction from "./viewtransaction";
import Addtransaction from "./addtransaction";
import Updateusers from "./updateusers";
import Viewusers from "./viewusers";
import Addusers from "./addusers";
import Login from "./Login";
import Viewseedhistory from "./viewseedhistory";
import Transfertofarmer from "./Transfertofarmer";
import Convertseed from "./Convertseed";
import TransfertoGrainelevator from "./TransfertoGrainelevator";
import TransfertoGrainprocessor from "./TransfertoGrainprocessor";
import TransfertoDistrubutor from "./TransfertoDistrubutor";
import TransfertoRetailer from "./TransfertoRetailer";
import UploadQRPage from "./Searchproduct";
import FoodSearch from "./FoodSearch";


const App = () => {
  return (
    <>
      <Routes>
      <Route path="/updateproductlot" element={<Updateproductlot/>} />
         <Route path="/viewproductlot" element={<Viewproductlot/>} />
         <Route path="/addproductlot" element={<Addproductlot/>} />

         
         
         <Route path="/updateseed" element={<Updateseed/>} />
         <Route path="/viewseed" element={<Viewseed/>} />
         <Route path="/viewseedhistory" element={<Viewseedhistory/>} />
         <Route path="/addseed" element={<Addseed/>} />

         
         
         <Route path="/updatetransaction" element={<Updatetransaction/>} />
         <Route path="/viewtransaction" element={<Viewtransaction/>} />
         <Route path="/addtransaction" element={<Addtransaction/>} />

         
         
         <Route path="/updateusers" element={<Updateusers/>} />
         <Route path="/admin" element={<Viewusers/>} />
         <Route path="/addusers" element={<Addusers/>} />



        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Addusers/>} />
        <Route path="/transfertofarmer" element={<Transfertofarmer/>} />
        <Route path="/transfertograinelevator" element={<TransfertoGrainelevator/>} />
        <Route path="/transfertograinprocesser" element={<TransfertoGrainprocessor/>} />

        <Route path="/transfertodis" element={<TransfertoDistrubutor/>} />
        <Route path="/transfertoret" element={<TransfertoRetailer/>} />
        <Route path="/convertproduct" element={<Convertseed/>} />
        <Route path="/search" element={<UploadQRPage/>} />
        <Route path="/foodsearch/:id" element={<FoodSearch/>} />
        
      </Routes>
    </>
  );
};

export default App;

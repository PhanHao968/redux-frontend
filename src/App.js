import React from 'react';
// import { Counter } from './features/counter/Counter';
import './App.css';
import NavBar from "./components/NavBar";
import { BrowserRouter as Router, Route, Link, NavLink,Routes } from "react-router-dom";
import ProductsTable from "./components/ProductTables";
import AddProducts from "./components/AddProducts";
import UpdateProduct from "./components/UpdateProduct";
import TrashTables from "./components/TrashTables";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCwA2bo9b2iOJVBSMRmMjyoTzFTH1Qc5vo",
  authDomain: "testreact-eb532.firebaseapp.com",
  projectId: "testreact-eb532",
  storageBucket: "testreact-eb532.appspot.com",
  messagingSenderId: "723599091990",
  appId: "1:723599091990:web:55aab3b71c198ca7804837",
  measurementId: "G-XBPV85PKM2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

function App() {
    return (
        <div >
            <Router >
                <NavBar />
                <div className="row">
                      <div className="col-sm-10 col-xm-12 mx-auto mt-4 mb-4">
                              <Routes>
                                  <Route path="/" element={<ProductsTable/>} />
                                  <Route path="/addproduct" element={<AddProducts/>} />
                                  <Route path="/trashsim" element={<TrashTables/>} />
                                  <Route path="/updateproduct" element={<UpdateProduct/>} />
                              </Routes>
                      </div>
                  </div>
            </Router>
        </div>
    );
}

export default App;

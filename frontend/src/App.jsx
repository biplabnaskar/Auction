import React from "react";
import CustomNavbar from "./components/Navbar/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import TeamTable from "./components/TeamTable/TeamTable";

const App = () => {
  return (
    <div className="app">
      <CustomNavbar />
      <TeamTable />
    </div>
  );
};

export default App;

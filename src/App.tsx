import React, { useState } from "react";
import UserComponent from "./components/UserComponent";
import ElectricityDataComponent from "./components/ElectricityDataComponent";
import HomeComponent from "./components/HomeComponent";
import InvoiceComponent from "./components/InvoiceComponent";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBolt } from "@fortawesome/free-solid-svg-icons";
import "./App.css";

enum Menu {
  Home = "Home",
  Users = "Users",
  Indexes = "Indexes",
  Invoices = "Invoices",
}

function App() {
  const [selectedMenu, setSelectedMenu] = useState(Menu.Home);

  const handleMenuClick = (menu: Menu) => {
    setSelectedMenu(menu);
  };

  let componentToRender;
  if (selectedMenu === Menu.Home) {
    componentToRender = <HomeComponent />; // Render the HomeComponent
  } else if (selectedMenu === Menu.Users) {
    componentToRender = <UserComponent />;
  } else if (selectedMenu === Menu.Indexes) {
    componentToRender = <ElectricityDataComponent />;
  } else if (selectedMenu === Menu.Invoices) {
    componentToRender = <InvoiceComponent />;
  }

  return (
    <div
      className={`App ${selectedMenu === Menu.Home ? "dark-background" : ""}`}
    >
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <a className="navbar-brand" href="#">
            <FontAwesomeIcon icon={faBolt} className="logo" />
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto">
              <li className="nav-item">
                <button
                  className={`nav-link btn ${
                    selectedMenu === Menu.Home ? "active" : ""
                  }`}
                  onClick={() => handleMenuClick(Menu.Home)}
                >
                  Home
                </button>
              </li>
              <li className="nav-item">
                <button
                  className={`nav-link btn ${
                    selectedMenu === Menu.Users ? "active" : ""
                  }`}
                  onClick={() => handleMenuClick(Menu.Users)}
                >
                  Users
                </button>
              </li>
              <li className="nav-item">
                <button
                  className={`nav-link btn ${
                    selectedMenu === Menu.Indexes ? "active" : ""
                  }`}
                  onClick={() => handleMenuClick(Menu.Indexes)}
                >
                  Indexes
                </button>
              </li>
              <li className="nav-item">
                <button
                  className={`nav-link btn ${
                    selectedMenu === Menu.Invoices ? "active" : ""
                  }`}
                  onClick={() => handleMenuClick(Menu.Invoices)}
                >
                  Invoices
                </button>
              </li>
            </ul>
            <ul className="navbar-nav">
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  id="navbarDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Account
                </a>
                <ul
                  className="dropdown-menu dropdown-menu-end"
                  aria-labelledby="navbarDropdown"
                >
                  <li>
                    <a className="dropdown-item" href="#">
                      Profile
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Logout
                    </a>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <h1 className="header">{selectedMenu}</h1>
      {componentToRender}
    </div>
  );
}

export default App;

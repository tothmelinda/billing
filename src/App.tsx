import React, { useState, useEffect } from "react";
import axios from "axios";
import LoginComponent from "./components/LoginComponent";
import UserComponent from "./components/UserComponent";
import ElectricityDataComponent from "./components/ElectricityDataComponent";
import HomeComponent from "./components/HomeComponent";
import InvoiceComponent from "./components/InvoiceComponent";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBolt } from "@fortawesome/free-solid-svg-icons";
import "./App.css";
import Cookies from "js-cookie";

enum Menu {
  Home = "Home",
  Users = "Users",
  Indexes = "Indexes",
  Invoices = "Invoices",
}

const App: React.FC = () => {
  const [selectedMenu, setSelectedMenu] = useState<Menu | null>(null);
  const [loggedIn, setLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    setLoggedIn(isLoggedIn);

    // Set the token as default header for all axios requests if logged in
    const token = Cookies.get("token");
    if (isLoggedIn && token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
  }, []);

  const handleMenuClick = (menu: Menu) => {
    setSelectedMenu(menu);
  };

  const handleLogin = async (token: string) => {
    setLoggedIn(true);
    localStorage.setItem("isLoggedIn", "true");
    Cookies.set("token", token);
    const bearerToken = `Bearer ${token}`;
    axios.defaults.headers.common["Authorization"] = bearerToken;

    try {
      // Check if the token is valid by making a request to a protected endpoint
      await axios.get("/users");

      // If the request succeeds, redirect to the application
      setSelectedMenu(Menu.Home);
    } catch (error) {
      // If the request fails, handle the error (e.g., display an error message)
      console.error("Error:", error);
      // Handle the error appropriately (e.g., display an error message)
    }
  };

  const handleLogout = () => {
    setLoggedIn(false);
    localStorage.setItem("isLoggedIn", "false");
    Cookies.remove("token");
    setSelectedMenu(Menu.Home);
    delete axios.defaults.headers.common["Authorization"];
  };

  let componentToRender: React.ReactNode;
  if (loggedIn) {
    if (selectedMenu === Menu.Home) {
      componentToRender = <HomeComponent />;
    } else if (selectedMenu === Menu.Users) {
      componentToRender = <UserComponent />;
    } else if (selectedMenu === Menu.Indexes) {
      componentToRender = <ElectricityDataComponent />;
    } else if (selectedMenu === Menu.Invoices) {
      componentToRender = <InvoiceComponent />;
    } else {
      componentToRender = null;
    }
  } else {
    componentToRender = <LoginComponent onLogin={handleLogin} />;
  }

  return (
    <div
      className={`App ${
        loggedIn && selectedMenu === Menu.Home ? "dark-background" : ""
      }`}
    >
      {!loggedIn && (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <div className="container">
            <a className="navbar-brand" href="#">
              <FontAwesomeIcon icon={faBolt} className="logo" />
            </a>
          </div>
        </nav>
      )}
      {loggedIn && (
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
                <li className="nav-item">
                  <button className="nav-link btn" onClick={handleLogout}>
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      )}
      {loggedIn && selectedMenu !== null && (
        <h1 className="header">{selectedMenu}</h1>
      )}
      {componentToRender}
    </div>
  );
};

export default App;

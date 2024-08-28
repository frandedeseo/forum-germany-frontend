import React, { useState } from "react";
import NavbarTop from "./NavbarTop";
import Grid from "@mui/material/Grid";
import SearchBar from "./SearchBar";
import Link from "next/link";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="relative">
      <div className={`navbar ${menuOpen ? "open" : ""}`}>
        <div className="fixed top-0 left-0 w-full flex items-center justify-between p-4">
          <div className="flex items-start" style={{ justifyContent: "space-between", width: "100%" }}>
            <div className="menu-icon hover-button" onClick={handleMenuToggle} style={{ zIndex: 50, cursor: "pointer" }}>
              <svg
                color="white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="0.5"
                stroke="currentColor"
                className="size-10"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 9h16.5m-16.5 6.75h16.5" />
              </svg>
            </div>
            <div style={{ zIndex: 50 }}>
              <Link className="nav-title absolute left-1/2 transform -translate-x-1/2" style={{ zIndex: 50 }} href="/">
                <p
                  className={
                    menuOpen
                      ? "nav-title absolute left-1/2 transform -translate-x-1/2 appear-menu-closed disappear"
                      : "nav-title absolute left-1/2 transform -translate-x-1/2 appear-menu-closed"
                  }
                  style={{
                    top: 6,
                    width: "230px",
                    textAlign: "center",
                    fontSize: 20,
                    zIndex: 50,
                  }}
                >
                  Inteligencia Artificial
                </p>
              </Link>
            </div>
          </div>

          <div className={`nav-links ${menuOpen ? "show" : ""}`}>
            <Grid item sx={{ width: "80vw" }}>
              <NavbarTop content={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]} />
            </Grid>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;

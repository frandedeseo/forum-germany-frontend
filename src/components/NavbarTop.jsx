import { Button, Grid } from "@mui/material";
import React, { useState } from "react";
import NavbarElementTop from "./NavbarElementTop";

const NavbarTop = ({ content }) => {
  return (
    <Grid container spacing={8} justifyContent="space-between">
      {content.map((item, index) => (
        <NavbarElementTop item={item} />
      ))}
    </Grid>
  );
};

export default NavbarTop;

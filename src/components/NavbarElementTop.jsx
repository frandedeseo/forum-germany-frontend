import { Grid } from "@mui/material";

const NavbarElementTop = ({ item }) => {
  return (
    <Grid
      item
      xs={true}
      className="flex items-center justify-center "
      sx={{
        zIndex: 100000,
      }}
    >
      <a
        style={{
          color: "white",
          fontSize: 16,
          zIndex: 100000,
          minWidth: 80,
          textDecoration: "none",
        }}
        className="hover-button"
        href={`/semana?weekNumber=${item.toString()}`}
      >
        {"Semana " + item}
      </a>
    </Grid>
  );
};

export default NavbarElementTop;

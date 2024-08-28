import NavbarTop from "@/components/NavbarTop";
import { Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { data } from "@/data/data";
import Header from "@/components/Header";

export default function Home() {
  const extractData = (all_data) => {
    return all_data.map(({ bucket_name, folders, nr, subject, tags, content_snipet }) => ({
      bucket_name,
      folders,
      nr,
      subject,
      tags,
      content_snipet,
    }));
  };

  useEffect(() => {
    if (data?.result?.feed) {
      console.log("executing");
      const json = extractData(data.result.feed);
      console.log(JSON.stringify(json));
    }
  }, [data]);

  return (
    <div className="bg-cover bg-center h-screen">
      <div className="relative h-full">
        <Header />
        <Grid container direction="column" justifyContent="flex-start" alignItems="center" sx={{ height: "100vh" }}>
          <Grid item sx={{ width: "80vw", marginTop: "40vh" }}>
            <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", zIndex: -10 }}>
              <video preload="metadata" src={"/videos/deepMind.mp4"} autoPlay loop muted />
            </div>
            <p style={{ fontSize: 32, textAlign: "center" }}>Foro de Consultas</p>
          </Grid>
        </Grid>
      </div>

      <div className="overlay" />
    </div>
  );
}

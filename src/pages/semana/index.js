import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { CssBaseline, Container, Typography, Box, Card, CardContent, Chip, Grid, CircularProgress } from "@mui/material";
import "@fontsource/inter";
import Header from "@/components/Header";
import NestedPostViewer from "@/components/NestedPostViewer";
import { week1, week2, week3, week4, week5, week6, week7, week8, week9, week10, week11, week12, week13, week14, week15 } from "@/data/data";
import { useRouter } from "next/router";
import DOMPurify from "dompurify";
import { Search } from "lucide-react";
import SearchBar from "@/components/SearchBar";
import NestedPostViewerError from "@/components/NestedPostViewerError";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#90caf9",
    },
    background: {
      default: "#121212",
      paper: "#1e1e1e",
    },
  },
  typography: {
    fontFamily: "Inter, Arial, sans-serif",
  },
});

function replaceRedirectUrls(obj) {
  if (typeof obj === "object" && obj !== null) {
    if (Array.isArray(obj)) {
      return obj.map(replaceRedirectUrls);
    } else {
      return Object.keys(obj).reduce((acc, key) => {
        acc[key] = replaceRedirectUrls(obj[key]);
        return acc;
      }, {});
    }
  }

  if (typeof obj === "string") {
    return obj.replace(/\/redirect/g, "https://piazza.com/redirect");
  }

  return obj;
}

const fetchItemData = async (nr) => {
  const response = await fetch(`https://forum-germany-backend.vercel.app/post/${nr}`);
  if (!response.ok) {
    if (response.status === 404) {
      return "Item not found";
    }
    throw new Error("Error fetching data");
  }
  const data = await response.json();
  return replaceRedirectUrls(data);
};

export default function Week() {
  const router = useRouter();
  const { weekNumber } = router.query; // Get week number from URL
  const [selectedItem, setSelectedItem] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    if (weekNumber) {
      const weekData = getWeekData(weekNumber);
      setFilteredData(weekData || []);
    }
  }, [weekNumber]);

  const handleItemClick = async (nr) => {
    setLoading(true);
    setError(null);
    try {
      const fullItem = await fetchItemData(nr);
      console.log("Full item data:", fullItem);
      if (fullItem == "Item not found") {
        setError("Item not found");
      } else {
        setSelectedItem(fullItem);
      }
    } catch (error) {
      console.error("Error fetching item data:", error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const getWeekData = (weekNumber) => {
    switch (parseInt(weekNumber)) {
      case 1:
        return week1;
      case 2:
        return week2;
      case 3:
        return week3;
      case 4:
        return week4;
      case 5:
        return week5;
      case 6:
        return week6;
      case 7:
        return week7;
      case 8:
        return week8;
      case 9:
        return week9;
      case 10:
        return week10;
      case 11:
        return week11;
      case 12:
        return week12;
      case 13:
        return week13;
      case 14:
        return week14;
      case 15:
        return week15;
      default:
        return [];
    }
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Header />
      <SearchBar fetchItemData={fetchItemData} setSelectedItem={setSelectedItem} setError={setError} />
      <Container maxWidth="xl">
        <Grid container spacing={2} sx={{ height: "100vh", pt: 10 }}>
          <Grid item xs={12} md={5}>
            <Box
              sx={{
                height: "calc(100vh - 100px)",
                overflowY: "auto",
                pr: 2,
                "&::-webkit-scrollbar": {
                  width: "2px",
                },
                "&::-webkit-scrollbar-thumb": {
                  backgroundColor: "#333", // Black color
                  borderRadius: "4px",
                },
                "&::-webkit-scrollbar-thumb:hover": {
                  backgroundColor: "#333", // Slightly lighter black on hover
                },
                "&::-webkit-scrollbar-track": {
                  backgroundColor: "transparent",
                },
                "scrollbar-width": "thin", // For Firefox
                "scrollbar-color": "#000 transparent", // Thumb and track colors for Firefox
              }}
            >
              {filteredData.map((item, index) => (
                <Card
                  key={index}
                  sx={{
                    mb: 2,
                    cursor: "pointer",
                    opacity: 0.9,
                    "&:hover": { opacity: 1 },
                  }}
                  onClick={() => handleItemClick(item.nr)}
                >
                  <CardContent>
                    <Box display="flex" justifyContent="space-between" alignItems="center">
                      <Typography variant="h6" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(item.subject || "") }} />
                      <Typography variant="h4" color="primary">
                        {item.nr}
                      </Typography>
                    </Box>
                    <Typography variant="subtitle2" color="textSecondary">
                      {item.bucket_name}
                    </Typography>
                    <Box sx={{ mt: 1 }}>
                      {item.folders.map((folder, idx) => (
                        <Chip key={idx} label={folder} size="small" sx={{ mr: 1, mb: 1 }} />
                      ))}
                    </Box>
                    <Box sx={{ mt: 1 }}>
                      {item.tags.map((tag, idx) => (
                        <Chip key={idx} label={tag} size="small" color="primary" sx={{ mr: 1, mb: 1 }} />
                      ))}
                    </Box>
                    <Typography
                      variant="body2"
                      sx={{ mt: 2 }}
                      dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(`${item.content_snipet}...` || "") }}
                    />
                  </CardContent>
                </Card>
              ))}
            </Box>
          </Grid>
          <Grid item xs={12} md={7}>
            <Box sx={{ height: "100%", pl: 2 }}>
              {loading ? (
                <Box display="flex" justifyContent="center" alignItems="center" height="40vh">
                  <CircularProgress />
                </Box>
              ) : error ? (
                <NestedPostViewerError error={"No se ha encontrado un posteo con ese ID"} />
              ) : selectedItem ? (
                <NestedPostViewer selectedItem={selectedItem} />
              ) : (
                <Typography />
              )}
            </Box>
          </Grid>
        </Grid>
        <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", zIndex: -10 }}>
          <video preload="metadata" src={"/videos/deepMind.mp4"} autoPlay loop muted />
        </div>
        <div className="overlay" />
      </Container>
    </ThemeProvider>
  );
}

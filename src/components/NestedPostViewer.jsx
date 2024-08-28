import React, { useEffect } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { CssBaseline, Container, Typography, Box, Card, CardContent, Chip, Divider } from "@mui/material";
import DOMPurify from "dompurify";

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

const Comment = ({ data, depth }) => {
  const latestHistory = data.history && data.history.length > 0 ? data.history[0] : data;
  const subject = latestHistory.subject || "";

  return (
    <Box sx={{ ml: depth * 2, mb: 2, width: `calc(100% - ${depth * 16}px)` }}>
      <Card variant="outlined">
        <CardContent>
          <Typography variant="h6" gutterBottom dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(subject || "") }} />

          <Typography variant="caption" display="block" gutterBottom>
            Posted on: {new Date(latestHistory.created).toLocaleString()}
          </Typography>
          <Typography variant="body2" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(latestHistory.content || "") }} />
          {data.children && data.children.length > 0 && (
            <Box sx={{ mt: 2 }}>
              {data.children.map((child, index) => (
                <Comment key={index} data={child} depth={depth + 1} />
              ))}
            </Box>
          )}
        </CardContent>
      </Card>
    </Box>
  );
};

export default function NestedPostViewer({ selectedItem }) {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      {selectedItem.history && (
        <Container maxWidth="lg">
          <Card sx={{ mb: 4 }}>
            <CardContent>
              <Typography variant="h4" gutterBottom>
                {selectedItem.history[0].subject}
              </Typography>
              <Box sx={{ mb: 2 }}>
                {selectedItem.tags.map((tag, index) => (
                  <Chip key={index} label={tag} size="small" color="primary" sx={{ mr: 1, mb: 1 }} />
                ))}
              </Box>
              <Typography variant="caption" display="block" gutterBottom>
                Posted on: {new Date(selectedItem.history[0].created).toLocaleString()}
              </Typography>
              <Typography variant="body1" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(selectedItem.history[0].content) }} />
            </CardContent>
          </Card>
          <Divider sx={{ mb: 4 }} />
          <Typography variant="h5" gutterBottom>
            Responses
          </Typography>
          {selectedItem.children.map((child, index) => (
            <Comment key={index} data={child} depth={0} />
          ))}
        </Container>
      )}
    </ThemeProvider>
  );
}

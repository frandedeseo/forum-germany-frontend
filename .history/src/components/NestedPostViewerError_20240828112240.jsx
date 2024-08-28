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

export default function NestedPostViewerError({ error }) {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      {error && (
        <Container maxWidth="lg">
          <Card sx={{ mb: 4 }}>
            <CardContent>
              <Typography variant="h4" gutterBottom>
                {error}
              </Typography>
            </CardContent>
          </Card>
        </Container>
      )}
    </ThemeProvider>
  );
}

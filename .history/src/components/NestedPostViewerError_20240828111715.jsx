export default function NestedPostViewer({ error }) {
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

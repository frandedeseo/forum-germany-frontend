export default function NestedPostViewer({ selectedItem }) {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      {selectedItem.history && (
        <Container maxWidth="lg">
          <Card sx={{ mb: 4 }}>
            <CardContent>
              <Typography variant="h4" gutterBottom dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(selectedItem.history[0].subject) }} />
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

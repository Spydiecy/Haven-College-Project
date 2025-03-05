const app = require('./app');

const PORT = process.env.PORT || 8080;

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`http://localhost:${PORT}`);
});

// Handle server errors
process.on('unhandledRejection', (err) => {
  console.log('UNHANDLED REJECTION!');
  console.log(err.name, err.message);
  process.exit(1);
});
const hbs = require("hbs");

// Helper untuk mendapatkan tahun dari tanggal
hbs.registerHelper("getYear", function (date) {
  const d = new Date(date);
  return d.getFullYear();
});

// Helper untuk menghitung durasi dalam bulan
hbs.registerHelper("calculateDuration", function (startDate, endDate) {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const durationMonths = Math.ceil((end - start) / (1000 * 60 * 60 * 24 * 30));
  return durationMonths;
});

// Helper to format date to "dd MMM yyyy"
hbs.registerHelper("formatDate", function (date) {
  const options = { year: "numeric", month: "short", day: "numeric" };
  return new Date(date).toLocaleDateString("id-ID", options);
});

// Registering the 'eq' helper to compare values
hbs.registerHelper("eq", function (a, b) {
  return a === b; // This checks if 'a' is strictly equal to 'b'
});

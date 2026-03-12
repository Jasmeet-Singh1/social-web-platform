const express = require('express');
const connectDB = require('./config/db.js');
const path = require('path');
const fs = require('fs');
const cors = require('cors');

const app = express();

// Connect Database
connectDB();

// CORS (for separate frontend deployment)
const allowedOrigins = (process.env.CORS_ORIGINS || '')
  .split(',')
  .map((s) => s.trim())
  .filter(Boolean);

app.use(
  cors({
    origin: (origin, cb) => {
      // allow non-browser requests (curl, server-to-server) with no origin
      if (!origin) return cb(null, true);
      if (allowedOrigins.length === 0) return cb(null, true);
      if (allowedOrigins.includes(origin)) return cb(null, true);
      return cb(new Error(`CORS blocked for origin: ${origin}`));
    },
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'x-auth-token'],
    optionsSuccessStatus: 204
  })
);

//Init middleware
app.use(express.json({ extended: false }));

//define routes
app.get('/api/health', (req, res) =>
  res.json({ ok: true, env: process.env.NODE_ENV || 'development' })
);
app.use('/api/users', require('./routes/api/users.js'));
app.use('/api/auth', require('./routes/api/auth.js'));
app.use('/api/profile', require('./routes/api/profile.js'));
app.use('/api/posts', require('./routes/api/posts.js'));

// Serve static assets in production only when client/build exists
const clientBuild = path.join(__dirname, 'client', 'build');
if (process.env.NODE_ENV === 'production' && fs.existsSync(clientBuild)) {
  app.use(express.static(clientBuild));
  app.get('*', (req, res) => {
    res.sendFile(path.join(clientBuild, 'index.html'));
  });
} else if (process.env.NODE_ENV === 'production') {
  app.get('/', (req, res) => res.json({ msg: 'DevConnector API' }));
  app.get('/favicon.ico', (req, res) => res.status(204).end());
  app.get('/favicon.png', (req, res) => res.status(204).end());
}

// Local dev server (Vercel will import the app instead)
if (require.main === module) {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
}

module.exports = app;

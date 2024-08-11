import session from 'express-session';

const sessionMiddleware = session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // Set secure to true if using HTTPS
});

export default async (req, res) => {
  sessionMiddleware(req, res, () => {
    req.session.destroy(err => {
      if (err) {
        return res.status(500).json({ error: 'Failed to clear session' });
      }

      res.status(200).json({ message: 'Session cleared' });
    });
  });
};

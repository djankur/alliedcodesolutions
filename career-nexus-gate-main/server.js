import express from 'express';
import { promises as dns } from 'dns';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json()); // Replaces body-parser

async function verifyEmailDomain(email) {
  if (typeof email !== 'string' || !email.includes('@')) return false;

  const domain = email.split('@')[1];
  try {
    const addresses = await dns.resolveMx(domain);
    return addresses && addresses.length > 0;
  } catch {
    return false;
  }
}

app.post('/api/verify-domain', async (req, res) => {
  try {
    const { email } = req.body;
    const isValid = await verifyEmailDomain(email);
    res.json({ valid: isValid });
  } catch (err) {
    console.error(err);
    res.status(500).json({ valid: false, error: 'Server error' });
  }
});

app.listen(5000, () => console.log('Server running on http://localhost:5000'));

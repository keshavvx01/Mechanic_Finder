import { createServer } from 'node:http';
import { app } from './src/app.js';

const port = Number(process.env.PORT || 3001);

createServer(app).listen(port, () => {
  console.log(`Mechanic Finder API listening on http://localhost:${port}`);
});

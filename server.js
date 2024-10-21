import jsonServer from 'json-server';
import auth from 'json-server-auth';
import cors from 'cors';
import jwt from 'jsonwebtoken'

const app = jsonServer.create();
const router = jsonServer.router('db.json');

import { readFile } from 'fs/promises';
const db = JSON.parse(
  await readFile(
    new URL('./db.json', import.meta.url)
  )
);

// /!\ Bind the router db to the app
app.db = router.db;

const rules = auth.rewriter({
  // Permission rules
  users: 600,
  books: 640,
});

// Fix missing roles check on json-server-auth lib
function checkRolePermision(req, res, next) {
  if (req.method === 'GET') {
    next();
    return;
  }

  const [scheme, token] = req.headers.authorization.split(' ');

  try {
    jwt.verify(token, 'json-server-auth-123456');
    // Add claims to request
    const claims = jwt.decode(token);

    // Go through users and check if user is admin if yes continue
    for (let user of db.users) {
      if (String(user.id) === claims.sub && user.type === 'admin') {
        next();
        return;
      }
    }

    throw Error('User is not authorized for this')
  } catch (error) {
    res.status(401).jsonp(error.message);
  }
}

app.use(cors());

// You must apply the auth middleware before the router
app.use(rules);
app.use(auth);
app.use(checkRolePermision);
app.use(router);

// Start the server
app.listen(3000, () => {
  console.log('JSON Server with Auth and Books data is running on port 3000');
});

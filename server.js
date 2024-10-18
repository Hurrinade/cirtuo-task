import jsonServer from 'json-server';
import auth from 'json-server-auth';
import cors from 'cors';

const app = jsonServer.create()
const router = jsonServer.router('db.json')

// /!\ Bind the router db to the app
app.db = router.db

const rules = auth.rewriter({
  // Permission rules
  users: 600,
  books: 640,
})

app.use(cors());

// You must apply the auth middleware before the router
app.use(rules)
app.use(auth)
app.use(router)

// Start the server
app.listen(3000, () => {
  console.log('JSON Server with Auth and Books data is running on port 3000');
});

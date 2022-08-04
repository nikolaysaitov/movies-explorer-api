const router = require('express').Router();
const auth = require('../middlewares/auth');
const signinRouter = require('./signin');
const signupRouter = require('./signup');
const usersRouter = require('./users');
const moviesRouter = require('./movies');

router
  .use('/', signinRouter)
  .use('/', signupRouter)
  .use(auth)
  .use('/', usersRouter)
  .use('/', moviesRouter);

module.exports = router;

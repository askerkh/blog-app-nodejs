const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
require('dotenv').config();

const methodOverride = require('method-override');

const postRoutes = require('./routes/post-routes');
const postApiRoutes = require('./routes/api-post-routes')

const createPath = require('./helpers/create-path');

const app = express();

app.set('view engine', 'ejs');



mongoose.set('strictQuery', true);

mongoose
  .connect(process.env.MONGO_URL, {})
  .then(_ => console.log('Connected to db'))
  .catch(err => console.log('Error of database', err));


app.listen(process.env.PORT, (error) => {
  error ? console.log(`Error`) : console.log(`Listening port ${process.env.PORT}`);
})

app.use(postApiRoutes)

app.use(methodOverride('_method'))

app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));

app.use(express.static('styles'));

app.use(express.urlencoded({ extended: false }));

app.use(postRoutes)

app.get('/', (_, res) => {
  const title = 'Home';
  res.render(createPath('index'), { title });
});

app.get('/home', (_, res) => {
  res.redirect('/');
});

app.get('/aboutus', (_, res) => {
  const title = 'About us';
  res.render(createPath('about-us'), { title });
});


app.use((_, res) => {
  const title = 'Error';
  res
    .status(404)
    .render(createPath('error'), { title })
});

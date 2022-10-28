var express = require('express');
var app = express();
var path = require('path');
var cors = require('cors');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var dotenv = require('dotenv');
dotenv.config();
var { sequelize } = require('./models');

var app = express();
app.set('port', 3005);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const corsOption = {
  origin: 'http://localhost:3000',
  credentials: true, // true로 하면 설정한 내용을 response 헤더에 추가 해줍니다.
};
app.use(cors(corsOption));

sequelize
  .sync({ force: false }) // force:true 일경우 테이블 전부 지우고 새로 설정~!
  .then(() => {
    console.log('데이터베이스 연결 성공');
  })
  .catch(err => {
    console.error(err);
  });

var usersRouter = require('./routes/users/users'); 
var postRouter = require('./routes/post/post');
var contractRouter = require('./routes/contract/contract');

// router
app.use('/users', usersRouter);
app.use('/post', postRouter);
app.use('/contract', contractRouter); 

// error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  return res.status(400).send('Something broke!');
});

app.use((req, res, next) => {
  return res.status(404).send("invailed path");
});

app.listen(app.get('port'), () => {
	console.log(`✅ Server running on http://localhost:${app.get('port')}`);
});

module.exports = app;

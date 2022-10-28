require('dotenv').config();
var env = process.env;

const development = {
	//env.MYSQL_USERNAME은 불러오고자 하는 데이터의 키값이므로 자유롭게 이름설정이 가능하다.
	username: env.MYSQL_USERNAME,
	password: env.MYSQL_PASSWORD,
	database: env.MYSQL_DATABASE,
	host: 'localhost',
	dialect: 'mysql',
};

const production = {
	username: env.MYSQL_USERNAME,
	password: env.MYSQL_PASSWORD,
	database: env.MYSQL_DATABASE,
	host: 'localhost',
	dialect: 'mysql',
};

const test = {
	username: env.MYSQL_USERNAME,
	password: env.MYSQL_PASSWORD,
	database: env.MYSQL_DATABASE_TEST,
	host: 'localhost',
	dialect: 'mysql',
};

module.exports = { development, production, test };

 

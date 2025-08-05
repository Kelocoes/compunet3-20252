require('dotenv').config({ path: '.env-dev'});
console.log(global.process.env.JAVA_HOME);


console.log("Mi api key", process.env.API_KEY);
console.log("Mi puero configurado:", process.env.PORT);
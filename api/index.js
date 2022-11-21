//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const server = require('./src/app.js');
const { conn } = require('./src/db.js');
const { PORT } = process.env
const { default: axios } = require('axios');
const { Country } = require('./src/db')


async function countriesLoaded(){

  try{

     //traigo de api
     const countriesApi = await axios.get('https://restcountries.com/v3.1/all') 
     //paso a BD
     countriesApi.data.forEach(c =>{

         Country.findOrCreate({
             where:{ id: c.cca3 },
             defaults:{
                     name: c.name.common,
                     image: c.flags.png,
                     continent: c.continents[0],
                     capital: c.capital? c.capital[0] : 'No Data',
                     subregion: c.subregion? c.subregion : 'No Data',
                     area: c.area,
                     population: c.population 
             }
         })
     }) 

  }catch(error){
    console.log('No se cargaron los datos a la BD')
  }

}




// Syncing all the models at once.
conn.sync({ force: false }).then( async function () {
  await countriesLoaded();   //busca datos de la api y carga a BD
  server.listen(3001, () => {   //3001
    console.log('%s listening at 3001'); // eslint-disable-line no-console
  });
});


/* // ASI ESTABA ANTES DE PONER LA FUNCION DE CARGAR PAISES EN DB
conn.sync({ force: true }).then(() => {
  server.listen(3001, () => {
    console.log('%s listening at 3001'); // eslint-disable-line no-console
  });
}); */


//FUNCION HECHA CON PROMESAS (AXIOS)  (sacar el async y el await en linea 60 y 61)
/* function countriesLoaded(){

  try{

     //traigo de api
     return axios.get('https://restcountries.com/v3.1/all') 
     //paso a BD
     .then(response => response.data.forEach(c =>{

      Country.findOrCreate({
          where:{ id: c.cca3 },
          defaults:{
                  name: c.name.common,
                  image: c.flags.png,
                  continent: c.continents[0],
                  capital: c.capital? c.capital[0] : 'No Data',
                  subregion: c.subregion? c.subregion : 'No Data',
                  area: c.area,
                  population: c.population 
          }
      })
  }) )

  }catch(error){
    console.log('No se cargaron los datos a la BD')
  }

}  */
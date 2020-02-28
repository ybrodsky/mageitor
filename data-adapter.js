const fs = require('fs');

/**
 * Trabajando con archivos locales porque no tenemos base de datos
 * Funciones para obtener aulas o materias (o lo que haya adentro del archivo)
 */

const get = (key) => {
  // lee el archivo y devuelve el key (ej "aulas")
  const file = fs.readFileSync(`${process.cwd()}/data.json`).toString();
  const json = JSON.parse(file);

  return json[key];
};

const set = (key, data) => {
  // lee el archivo y sobreescribe el key (ej "aulas")
  const file = fs.readFileSync(`${process.cwd()}/data.json`).toString();
  const json = JSON.parse(file);

  json[key] = data;

  fs.writeFile(`${process.cwd()}/data.json`, JSON.stringify(json), (e) => {
    console.log(e);
  });
}

module.exports = { get, set };

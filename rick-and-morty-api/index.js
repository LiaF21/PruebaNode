import "dotenv/config";

const URL = process.env.API_URL;

async function getPersonajesRickandMorty() {
  const respuesta = await fetch(URL);

  if (!respuesta.ok) {
    throw new Error(`error con la api: ${respuesta.status}`);
  }

  const datos = await respuesta.json();
  return datos;
}

getPersonajesRickandMorty()
  .then((datos) => {
    console.log(`personajes de rick and morty: ${datos.info.count}`);
    console.log(datos.results[0]);
  })
  .catch((error) => {
    console.error("Algo salió mal:", error.message);
  });

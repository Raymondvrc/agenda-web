"use strict";
let send = document.getElementById("form");

const cargarDatos = async () => {
  try {
    const response = await fetch("http://www.raydelto.org/agenda.php", {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error(
        `Error al obtener datos. Código de estado: ${response.status}`
      );
    }

    const data = await response.json();

    const fragmentoDatos = new DocumentFragment();

    const divDatosRespuesta = document.getElementById("agenda");
    divDatosRespuesta.textContent = "";
    for (const key in data) {
      const p = document.createElement("p");
      p.textContent = `${key}: Nombre Completo: ${data[key].nombre} ${data[key].apellido}, Telefono: ${data[key].telefono}`;
      fragmentoDatos.appendChild(p);
    }

    divDatosRespuesta.appendChild(fragmentoDatos);

    document.body.appendChild(divDatosRespuesta);
  } catch (error) {
    console.error("Error al obtener y mostrar los datos:", error.message);
  }
};

send.addEventListener("submit", async (e) => {
  let data = {
    nombre: document.getElementById("nombre").value,
    apellido: document.getElementById("apellido").value,
    telefono: document.getElementById("telefono").value,
  };
  e.preventDefault();

  await fetch("http://www.raydelto.org/agenda.php", {
    method: "POST",
    body: JSON.stringify(data),
  })
    .then((response) => response.text())
    .then((data) => {
      console.log("Respuesta del servidor:", data);
    })
    .catch((error) => console.error("Error al enviar la solicitud:", error));

  cargarDatos();
});

document.addEventListener("DOMContentLoaded", function () {
  cargarDatos();
});

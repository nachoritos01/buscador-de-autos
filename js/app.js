console.log(autos);
//Variables
const selects = {
  marca: document.querySelector("#marca"),
  year: document.querySelector("#year"),
  minimo: document.querySelector("#minimo"),
  maximo: document.querySelector("#maximo"),
  puertas: document.querySelector("#puertas"),
  transmision: document.querySelector("#transmision"),
  color: document.querySelector("#color"),
};
//Programacion funcional, no modifican el arreglo original

//Contenedor para los resultados

const resultado = document.querySelector("#resultado");

const max = new Date().getFullYear();
const min = max - 10;
//Generar un objeto de busqueda

const datosBusqueda = {
  modelo: "",
  year: "",
  puertas: "",
  transmision: "",
  precio: "",
  color: "",
  marca: "",
};

//Eventos
document.addEventListener("DOMContentLoaded", () => {
  mostrarAutos(autos); // muestra los automoviles al cargar

  //lllenar select

  llenarSElect();
});

//Event listener para los select

function createSelects() {
  for (const iterator in selects) {
    selects[iterator].addEventListener("change", (e) => {
      datosBusqueda[iterator] = e.target.value;
      filtrarAuto(iterator);
    });
  }
}

createSelects();

/* marca.addEventListener("change", (e) => {
  datosBusqueda.marca = e.target.value;
}); */

function mostrarAutos(autos) {
  autos.forEach((auto) => {
    const { marca, modelo, year, puertas, transmision, precio, color } = auto;
    const autoHtml = document.createElement("p");

    autoHtml.textContent = `
            
        marca - ${marca}
        modelo - ${modelo}
        year - ${year}
        puertas - ${puertas}
        transmision - ${transmision}
        precio - ${precio}
        color - ${color}

        `;

    resultado.appendChild(autoHtml);
  });
}

//Limpiarhtmnl

function limpiarHtml() {
  while (resultado.firstChild) {
    resultado.removeChild(resultado.firstChild);
  }
}

function llenarSElect() {
  for (let i = max; i >= min; i--) {
    const opcion = document.createElement("option");
    opcion.value = i;
    opcion.textContent = i;

    year.appendChild(opcion);
  }
}

function filtrarAuto(select) {
  //Funcion de lato nivel, funciones que toman otra funcion como parametro
  const resultado = autos
    .filter(filtrarMarca)
    .filter(filtrarYear)
    .filter(filtrarMinimo)
    .filter(filtrarMaximo)
    .filter(filtrarPuertas)
    .filter(filtrarTrasmision)
    .filter(filtrarColor);

  limpiarHtml();
  if (resultado.length) {
      mostrarAutos(resultado);
      
  } else {
      noResultado();
  }
}

function noResultado() {

    limpiarHtml();

    const noResultado = document.createElement('div');
    noResultado.classList.add('alerta', 'error');
    noResultado.textContent = 'No hay Resultados, intenta con otros terminos de busqueda';

    resultado.appendChild(noResultado);

}
function filtrarMarca(auto) {
  const { marca } = datosBusqueda;
  if (marca) {
    return auto.marca === marca;
  }
  return auto;
}
function filtrarYear(auto) {
  const { year } = datosBusqueda;
  if (year) {
    return auto.year === parseInt(year);
  }
  return auto;
}

function filtrarMinimo(auto) {
  const { minimo } = datosBusqueda;
  if (minimo) {
    return auto.precio >= minimo;
  }
  return auto;
}
function filtrarMaximo(auto) {
  const { maximo } = datosBusqueda;
  if (maximo) {
    return auto.precio <= maximo;
  }
  return auto;
}
function filtrarPuertas(auto) {
  const { puertas } = datosBusqueda;
  if (puertas) {
    return auto.puertas === parseInt(puertas);
  }
  return auto;
}
function filtrarTrasmision(auto) {
  const { transmision } = datosBusqueda;
  if (transmision) {
    return auto.transmision === transmision;
  }
  return auto;
}
function filtrarColor(auto) {
  const { color } = datosBusqueda;
  if (color) {
    return auto.color === color;
  }
  return auto;
}



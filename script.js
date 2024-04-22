// Obtener referencia al tutorial y botones
const tutorial = document.getElementById('tutorial');
const siguienteBtn = document.getElementById('siguienteBtn');
const omitirBtn = document.getElementById('omitirBtn');

// Definir los mensajes del tutorial
const mensajes = [
    "Bienvenido al Generador de Paletas de Colores. Aquí puedes crear paletas de colores armoniosas para tus proyectos.",
    "Selecciona un color base utilizando el selector de color en la parte superior de la página.",
    "Ajusta la saturación y luminosidad del color utilizando los controles deslizantes debajo del selector de color.",
    "¡Explora los colores generados en la paleta central! Haz clic derecho en cualquier color para copiar su código hexadecimal.",
    "¡Diviértete creando tu paleta de colores perfecta!"
];

// Función para mostrar el mensaje actual del tutorial
let indiceMensaje = 0;
function mostrarMensaje() {
    tutorial.innerHTML = `
        <h2>Paso ${indiceMensaje + 1}</h2>
        <p>${mensajes[indiceMensaje]}</p>
        <button id="siguienteBtn">Siguiente</button>
        <button id="omitirBtn">Omitir</button>
    `;
    // Obtener referencia a los botones después de recrearlos
    const siguienteBtn = document.getElementById('siguienteBtn');
    const omitirBtn = document.getElementById('omitirBtn');

    // Agregar evento de clic al botón siguiente
    siguienteBtn.addEventListener('click', siguientePaso);

    // Agregar evento de clic al botón omitir
    omitirBtn.addEventListener('click', omitirTutorial);
}

// Función para avanzar al siguiente paso del tutorial
function siguientePaso() {
    indiceMensaje++;
    if (indiceMensaje < mensajes.length) {
        mostrarMensaje();
    } else {
        // Ocultar el tutorial al llegar al final
        tutorial.style.display = 'none';
    }
}

// Función para omitir el tutorial
function omitirTutorial() {
    // Ocultar el tutorial al hacer clic en omitir
    tutorial.style.display = 'none';
}

// Función para generar paleta de colores
function generarPaleta() {
    // Obtener los valores de los controles (colores base, saturación, luminosidad, etc.)
    const colorBase = document.getElementById('colorBase').value;
    const saturacion = document.getElementById('saturacion').value;
    const luminosidad = document.getElementById('luminosidad').value;

    // Convertir los valores de saturación y luminosidad a números
    const saturacionNum = parseFloat(saturacion);
    const luminosidadNum = parseFloat(luminosidad);

    // Mostrar valores de saturación y luminosidad en la consola para depuración
    console.log('Saturación:', saturacionNum);
    console.log('Luminosidad:', luminosidadNum);

    // Generar la paleta de colores utilizando Chroma.js
    const baseColor = chroma(colorBase);
    const palette = [
        baseColor.darken(2).desaturate(saturacionNum).set('hsl.l', luminosidadNum),
        baseColor.desaturate(saturacionNum).set('hsl.l', luminosidadNum),
        baseColor.set('hsl.l', luminosidadNum),
        baseColor.saturate(saturacionNum).set('hsl.l', luminosidadNum),
        baseColor.brighten(2).saturate(saturacionNum).set('hsl.l', luminosidadNum)
    ];

    // Mostrar la paleta de colores en la página
    mostrarPaleta(palette);
}

// Función para manejar el cambio en los controles de saturación y luminosidad
function handleControlsChange() {
    // Generar la paleta de colores cuando se modifica cualquier control
    generarPaleta();
}

// Función para manejar el cambio en el control de color base
function handleColorBaseChange() {
    // Generar la paleta de colores cuando se cambia el color base
    generarPaleta();
}

// Función para mostrar la paleta de colores en la página
function mostrarPaleta(palette) {
    const paletteContainer = document.querySelector('.palette');

    // Limpiar cualquier paleta previamente mostrada
    paletteContainer.innerHTML = '';

    // Recorrer la paleta de colores y crear una caja de color para cada uno
    palette.forEach(color => {
        const colorBox = document.createElement('div');
        colorBox.style.backgroundColor = color;
        colorBox.classList.add('color-box');

        // Agregar evento de clic derecho para copiar el color al portapapeles
        colorBox.addEventListener('contextmenu', function(event) {
            event.preventDefault(); // Evitar que aparezca el menú contextual del navegador

            // Copiar el color al portapapeles
            const colorHex = chroma(color).hex();
            navigator.clipboard.writeText(colorHex).then(function() {
                console.log('Color copiado al portapapeles:', colorHex);
            }, function(err) {
                console.error('Error al copiar color al portapapeles:', err);
            });
        });

        paletteContainer.appendChild(colorBox);
    });
}

// Llamar a la función para generar la paleta cuando la página se cargue completamente
// Obtener los controles de saturación y luminosidad dentro de la función generarPaleta
// Agregar un evento de cambio a los controles de saturación y luminosidad
window.onload = function() {
    const saturacionControl = document.getElementById('saturacion');
    const luminosidadControl = document.getElementById('luminosidad');
    const colorBaseControl = document.getElementById('colorBase');

    saturacionControl.addEventListener('change', handleControlsChange);
    luminosidadControl.addEventListener('change', handleControlsChange);
    colorBaseControl.addEventListener('change', handleColorBaseChange);

    generarPaleta();
    mostrarMensaje();
};

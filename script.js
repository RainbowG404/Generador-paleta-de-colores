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
};

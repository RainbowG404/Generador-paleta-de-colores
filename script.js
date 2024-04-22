// Función para generar paleta de colores
function generarPaleta() {
    // Obtener los valores de los controles (colores base, saturación, luminosidad, etc.)
    const colorBase = document.getElementById('colorBase').value;
    const saturacion = document.getElementById('saturacion').value;
    const luminosidad = document.getElementById('luminosidad').value;

    // Convertir los valores de saturación y luminosidad a números
    const saturacionNum = parseFloat(saturacion);
    const luminosidadNum = parseFloat(luminosidad);

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
        paletteContainer.appendChild(colorBox);
    });
}

// Llamar a la función para generar la paleta cuando la página se cargue completamente
window.onload = function () {
    generarPaleta();
};

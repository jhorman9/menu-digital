const fs = require('fs/promises');
const path = require('path');

async function getImages( dirPath ){ // dirPath es una ruta dentro de src ./src/ ...
    const formats = ['.png', '.gif', '.jpg', '.jpeg', '.webp', '.svg'];
    //Leer el directorio donde estan las imagenes
    // Obtenemos la ruta del directorio de las imagenes
    const imagesPath = path.join(__dirname, '..', dirPath);
    const images = await fs.readdir(imagesPath);
    const filtered = images.filter(img => formats.includes(path.extname(img)));
    return filtered.map(img => ( {
        filename: img,
        path: `${imagesPath}/${img}`,
        cid: img.split('.')[0],
    }))
};

module.exports = getImages;
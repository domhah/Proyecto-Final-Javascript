const sillones = [];

async function traerSillones () {
    try {
        const sillones_archivo = await fetch("./js/productos.json");
        const sillones_json = await sillones_archivo.json();
        sillones_json.forEach(element => {
            sillones.push(element);
        })
        mostrarSillones();
    }
    catch (error) {
        console.error("Surgió un error al intentar traer los productos solicitados", error);
    }
}


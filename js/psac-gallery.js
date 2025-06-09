const galleryImgs = [
    { src: "image/psac-articulos1.jpg", desc: "Modulo Articulos: Permitia la busqueda y carga de archivos de articulos inexistentes en los servidores de tienda." },
    { src: "image/psac-conteocajase1.jpg", desc: "Modulo Cajas: Entre variones opciones como mostrar seriales de equipos, version SO, tambien permitia verificar que cajas se encontraban operativas en tiemop real." },
    { src: "image/psac-dpfile1.jpg", desc: "Modulo Servicios: Entre variones opciones disponibles, se podia revisar si el archivo de promocion diario de la tienda, habia llegado completo y actualizado a las cajas." },
    { src: "image/psac-portada1.jpg", desc: "Pantalla de inicio: Evolucion de la propuesta del programa PSAC a version 2.2.5 que mostraba un interfaz mas estilizada y ordenada y con mas funcionalidades." },
    { src: "image/psac-servicios2.jpg", desc: "Modulo Servicios nuevo." },
    { src: "image/psac-articulo2.jpg", desc: "Modulo Articulos nuevo" }
];

function galleryShow(idx) {
    document.getElementById("mainGalleryImg").src = galleryImgs[idx].src;
    document.getElementById("mainGalleryImg").alt = "Imagen " + (idx+1);
    document.getElementById("psac-lightbox-img").src = galleryImgs[idx].src;
    document.getElementById("mainGalleryDesc").innerText = galleryImgs[idx].desc;
    for(let i=0;i<galleryImgs.length;i++) {
        document.getElementById("thumb"+i).classList.remove('active-thumb');
    }
    document.getElementById("thumb"+idx).classList.add('active-thumb');
}

// Siempre muestra la primera imagen al abrir el modal
document.getElementById('portfolio2Modal').addEventListener('show.bs.modal', function () {
    galleryShow(0);
});

// EXPANDED IMAGE (Lightbox) LOGIC
// NO LLAMES expandPSACImage() ni muestres el lightbox hasta que el usuario haga click
// Solo esta función debe mostrarlo:
window.expandPSACImage = function() {
    const img = document.getElementById("mainGalleryImg");
    const lightbox = document.getElementById("psac-lightbox");
    const lightboxImg = document.getElementById("psac-lightbox-img");
    lightboxImg.src = img.src;
    lightbox.style.display = "flex";
    setTimeout(() => { lightbox.focus(); }, 30);
}
window.closePSACImage = function() {
    document.getElementById("psac-lightbox").style.display = "none";
}
// Cerrar con escape
document.addEventListener('keydown', function(e) {
    const lightbox = document.getElementById("psac-lightbox");
    if (lightbox.style.display === "flex" && (e.key === "Escape" || e.key === "Esc")) {
        closePSACImage();
    }
});
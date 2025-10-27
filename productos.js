// Seleccionamos elementos
const productos = document.querySelectorAll('.producto');
const modal = document.getElementById('modal');
const cerrarModal = document.getElementById('cerrarModal');
const modalNombre = document.getElementById('modal-nombre');
const modalBeneficios = document.getElementById('modal-beneficios');
const modalCarrusel = document.querySelector('.modal-carrusel');
const btnComprar = document.getElementById('btn-comprar');

let currentIndex = 0; // índice imagen del carrusel
let imgsModal = [];
let currentProducto = 0; // índice del producto abierto

// Abrir modal con un producto específico
function abrirModalPorIndice(index) {
  const prod = productos[index];
  currentProducto = index;

  const nombre = prod.dataset.nombre;
  const beneficios = prod.dataset.beneficios.split(',').map(b => b.trim());
  const imgs = prod.dataset.img.split(',').map(i => i.trim());

  // Limpiar modal
  modalNombre.textContent = nombre;
  modalBeneficios.innerHTML = '';
  modalCarrusel.innerHTML = '';

  // Beneficios con scroll
  beneficios.forEach(b => {
    const li = document.createElement('li');
    li.textContent = b;
    modalBeneficios.appendChild(li);
  });

  // Crear imágenes del carrusel
  imgs.forEach((src, idx) => {
    const img = document.createElement('img');
    img.src = src;
    img.classList.add('modal-img-carrusel');
    if(idx === 0) img.classList.add('active');
    modalCarrusel.appendChild(img);
  });

  imgsModal = modalCarrusel.querySelectorAll('.modal-img-carrusel');
  currentIndex = 0;

  // Botones del carrusel
  if(imgsModal.length > 1){
    const prevImg = document.createElement('button');
    prevImg.textContent = '‹';
    prevImg.classList.add('modal-prev');
    const nextImg = document.createElement('button');
    nextImg.textContent = '›';
    nextImg.classList.add('modal-next');
    modalCarrusel.appendChild(prevImg);
    modalCarrusel.appendChild(nextImg);

    prevImg.onclick = () => cambiarImagen(-1);
    nextImg.onclick = () => cambiarImagen(1);
  }

 // Botones para cambiar producto
const prevProd = document.createElement('button');
prevProd.textContent = '⟨';
prevProd.classList.add('modal-prev-producto');

const nextProd = document.createElement('button');
nextProd.textContent = '⟩';
nextProd.classList.add('modal-next-producto');

// Añadir a modal-card, no al carrusel
modal.querySelector('.modal-card').appendChild(prevProd);
modal.querySelector('.modal-card').appendChild(nextProd);

prevProd.onclick = () => abrirModalPorIndice((currentProducto - 1 + productos.length) % productos.length);
nextProd.onclick = () => abrirModalPorIndice((currentProducto + 1) % productos.length);

  // Mostrar modal
  modal.style.display = 'flex';

  // Botón WhatsApp dinámico
  btnComprar.href = `https://wa.me/59163376556?text=Hola,%20quiero%20comprar%20${encodeURIComponent(nombre)}`;
}

// Cambiar imagen del carrusel
function cambiarImagen(direccion){
  imgsModal[currentIndex].classList.remove('active');
  currentIndex = (currentIndex + direccion + imgsModal.length) % imgsModal.length;
  imgsModal[currentIndex].classList.add('active');
}

// Abrir modal al hacer clic en producto
productos.forEach((prod, idx) => prod.addEventListener('click', () => abrirModalPorIndice(idx)));

// Cerrar modal
cerrarModal.addEventListener('click', () => modal.style.display = 'none');

// Cerrar modal clic fuera
window.addEventListener('click', e => {
  if(e.target === modal) modal.style.display = 'none';
});

// Cerrar modal con ESC
window.addEventListener('keydown', e => {
  if(e.key === 'Escape') modal.style.display = 'none';
});

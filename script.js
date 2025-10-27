// MENÚ RESPONSIVO
const navToggle = document.querySelector('.nav-toggle');
const mainNav = document.querySelector('.main-nav');

navToggle.addEventListener('click', () => {
  const expanded = navToggle.getAttribute('aria-expanded') === 'true' || false;
  navToggle.setAttribute('aria-expanded', !expanded);
  mainNav.classList.toggle('open');
});

// SLIDER
const slides = document.querySelectorAll('.slide');
const nextBtn = document.querySelector('.next');
const prevBtn = document.querySelector('.prev');
const dotsContainer = document.querySelector('.dots');

let currentSlide = 0;

// Crear dots
slides.forEach((_, index) => {
  const dot = document.createElement('button');
  if(index === 0) dot.classList.add('active');
  dot.addEventListener('click', () => {
    goToSlide(index);
  });
  dotsContainer.appendChild(dot);
});
const dots = dotsContainer.querySelectorAll('button');

function goToSlide(slideIndex) {
  slides.forEach(slide => slide.classList.remove('active'));
  dots.forEach(dot => dot.classList.remove('active'));
  slides[slideIndex].classList.add('active');
  dots[slideIndex].classList.add('active');
  currentSlide = slideIndex;
}

nextBtn.addEventListener('click', () => {
  let nextSlide = (currentSlide + 1) % slides.length;
  goToSlide(nextSlide);
});

prevBtn.addEventListener('click', () => {
  let prevSlide = (currentSlide - 1 + slides.length) % slides.length;
  goToSlide(prevSlide);
});

// AUTO SLIDER
setInterval(() => {
  let nextSlide = (currentSlide + 1) % slides.length;
  goToSlide(nextSlide);
}, 5000); // cambia cada 5 segundos







// Carrusel por producto
document.querySelectorAll('.producto').forEach(prod => {
  const imgs = prod.querySelectorAll('.carrusel img');
  let idx = 0;
  const next = prod.querySelector('.next');
  const prev = prod.querySelector('.prev');

  next.addEventListener('click', e => {
    e.stopPropagation();
    imgs[idx].classList.remove('active');
    idx = (idx + 1) % imgs.length;
    imgs[idx].classList.add('active');
  });

  prev.addEventListener('click', e => {
    e.stopPropagation();
    imgs[idx].classList.remove('active');
    idx = (idx - 1 + imgs.length) % imgs.length;
    imgs[idx].classList.add('active');
  });

  // Abrir modal
  prod.addEventListener('click', () => {
    const modal = document.getElementById('modal');
    const modalImg = document.getElementById('modal-img');
    const modalNombre = document.getElementById('modal-nombre');
    const modalBeneficios = document.getElementById('modal-beneficios');
    const btnComprar = document.getElementById('btn-comprar');

    modalImg.src = imgs[0].src;
    modalNombre.textContent = prod.dataset.nombre;

    modalBeneficios.innerHTML = '';
    const beneficios = prod.dataset.beneficios.split(',');
    beneficios.forEach(b => {
      const li = document.createElement('li');
      li.textContent = b.trim();
      modalBeneficios.appendChild(li);
    });

    btnComprar.href = `https://wa.me/59163376556?text=Hola,%20quiero%20comprar%20${encodeURIComponent(prod.dataset.nombre)}`;
    modal.style.display = 'flex';
  });
});

// Cerrar modal
document.getElementById('cerrarModal').addEventListener('click', () => {
  document.getElementById('modal').style.display = 'none';
});
window.addEventListener('click', e => {
  if(e.target.id === 'modal') document.getElementById('modal').style.display = 'none';
});

const secoes = document.querySelectorAll('section');
const observador = new IntersectionObserver((entradas) => {
    entradas.forEach((entrada) => {
        if (entrada.isIntersecting) {
            entrada.target.classList.add('visivel');
            observador.unobserve(entrada.target);
        }
    });
}, { threshold: 0.15});

secoes.forEach((secao) => {
    secao.classList.add('reveal');
    observador.observe(secao);
});
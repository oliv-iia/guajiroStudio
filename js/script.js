AOS.init({
      duration: 2000
    });

 //Para que std oucpe el tamaño de ro (de guajiro)
    function ajustarStd() {
    const ro = document.querySelector('.hero__ro');
    const std = document.querySelector('.hero__std');

    if (ro === null || std === null) {
    return;
    }

  std.style.fontSize = '100px';
  const ancho = std.offsetWidth;
  std.style.fontSize = (100 * ro.offsetWidth / ancho) + 'px';
}

document.fonts.ready.then(ajustarStd);
window.addEventListener('resize', ajustarStd);

document.fonts.ready.then(ajustarStd);
window.addEventListener('resize', ajustarStd);

//MARQUESINAS

function iniciarMarquesinas() {
  const VELOCIDAD = 60; // píxeles por segundo

  document.querySelectorAll('.marquesina__pista').forEach(pista => {
    const direccion = pista.dataset.direccion === '1' ? 1 : -1;
    const listaBase = pista.querySelector('ul');
    const anchoLista = listaBase.offsetWidth;
    if (anchoLista === 0) return;

    // Dejar solo la lista base y clonar hasta que UNA MITAD cubra la pantalla
    pista.querySelectorAll('ul').forEach((ul, i) => { if (i > 0) ul.remove(); });
    const porMitad = Math.ceil(window.innerWidth / anchoLista) + 1;
    const total = porMitad * 2; // siempre par
    for (let i = 1; i < total; i++) {
      pista.appendChild(listaBase.cloneNode(true));
    }

    const mitad = anchoLista * porMitad;
    let x = direccion === 1 ? -mitad : 0;
    let ultimo = null;
    let pausada = false;

    pista.addEventListener('mouseenter', () => (pausada = true));
    pista.addEventListener('mouseleave', () => (pausada = false));

    function paso(tiempo) {
      if (ultimo === null) ultimo = tiempo;
      const dt = (tiempo - ultimo) / 1000;
      ultimo = tiempo;

      if (!pausada) {
        x += direccion * VELOCIDAD * dt;
        if (direccion === -1 && x <= -mitad) x += mitad;
        if (direccion === 1 && x >= 0) x -= mitad;
        pista.style.transform = `translateX(${x}px)`;
      }
      requestAnimationFrame(paso);
    }

    requestAnimationFrame(paso);
  });
}

document.fonts.ready.then(iniciarMarquesinas);


// Acordeón de las cards
$(".card__mas").on("click", function () {

  var card = $(this).closest(".card");
  var detalle = card.find(".card__detalle");

  // Cerramos las demás
  $(".card__detalle").not(detalle).slideUp();
  $(".card__mas").not(this).removeClass("abierto").attr("aria-expanded", "false");

  // Abrimos o cerramos la actual
  detalle.slideToggle();
  $(this).toggleClass("abierto");
  $(this).attr("aria-expanded", $(this).hasClass("abierto"));

});

$(".card").eq(3).find(".card__detalle").show();
$(".card").eq(3).find(".card__mas").addClass("abierto").attr("aria-expanded", "true");



$(function () {
  $('.menu-mobile a').on('click', function () {
    $('#sideMenu').prop('checked', false);
  });
});

//Para que los videos play
const observadorVideos = new IntersectionObserver(entradas => {
  entradas.forEach(entrada => {
    if (entrada.isIntersecting) {
      entrada.target.play();
    } else {
      entrada.target.pause();
    }
  });
}, { threshold: 0.4 });

document.querySelectorAll('.evento__video').forEach(video => {
  observadorVideos.observe(video);
});

//AGENDA formulario
(function () {

    /* ---------- 1. SELECCIÓN DE ELEMENTOS ---------- */
    var formulario = document.querySelector('#formulario-agenda');
    if (formulario === null) return;

    var campoNombre = document.querySelector('#nombre');
    var campoTelefono = document.querySelector('#telefono');
    var campoCorreo = document.querySelector('#correo');
    var campoDescripcion = document.querySelector('#descripcion');
    var campoArtista = document.querySelector('#artista');
    var campoMayor = document.querySelector('#mayor');
    var etiquetaMayor = document.querySelector('#check-mayor');
    var mensaje = document.querySelector('#mensaje');


    /* ---------- 2. FUNCIONES DE AYUDA ---------- */
    function mostrarMensaje(texto, tipo) {
        mensaje.textContent = texto;
        mensaje.className = 'mensaje mensaje--' + tipo;   // "mensaje--error" o "mensaje--ok"
    }

    function borrarMensaje() {
        mensaje.textContent = '';
        mensaje.className = 'mensaje';
    }

    // Teléfono: entre 9 y 15 dígitos, con + opcional al principio. Se ignoran espacios y guiones
    function telefonoValido(texto) {
        var limpio = texto.replace(/[\s-]/g, '');
        return /^\+?[0-9]{9,15}$/.test(limpio);
    }

    // Correo: texto, @, texto, punto y texto
    function correoValido(texto) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(texto);
    }


    /* ---------- 3. QUITAR EL ERROR AL CORREGIR ---------- */
    var camposConError = [campoNombre, campoTelefono, campoCorreo];

    for (var i = 0; i < camposConError.length; i++) {
        camposConError[i].addEventListener('input', function () {
            this.classList.remove('is-error');
        });
    }

    campoMayor.addEventListener('change', function () {
        etiquetaMayor.classList.remove('is-error');
    });


    /* ---------- 4. ENVÍO DEL FORMULARIO ---------- */
    formulario.addEventListener('submit', function (evento) {
        evento.preventDefault();   // no recargar la página

        var nombre = campoNombre.value.trim();
        var telefono = campoTelefono.value.trim();
        var correo = campoCorreo.value.trim();
        var hayErrores = false;

        if (nombre === '') {
            campoNombre.classList.add('is-error');
            hayErrores = true;
        }

        if (!telefonoValido(telefono)) {
            campoTelefono.classList.add('is-error');
            hayErrores = true;
        }

        if (!correoValido(correo)) {
            campoCorreo.classList.add('is-error');
            hayErrores = true;
        }

        if (!campoMayor.checked) {
            etiquetaMayor.classList.add('is-error');
            hayErrores = true;
        }

        if (hayErrores) {
            mostrarMensaje('Revisa los campos marcados antes de enviar.', 'error');
            return;
        }

        // Todo correcto: aquí irá tu envío real (por ahora solo mostramos los datos)
        var datos = {
            nombre: nombre,
            telefono: telefono,
            correo: correo,
            descripcion: campoDescripcion.value.trim(),
            artista: campoArtista.value
        };
        console.log('Solicitud de cita:', datos);

        mostrarMensaje('¡Gracias, ' + nombre + '! Hemos recibido tu solicitud.', 'ok');

        // Formulario a cero
        formulario.reset();
    });

})();
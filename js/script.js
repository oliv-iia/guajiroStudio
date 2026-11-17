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


//ACCORDION
$(function () {
  function abrirCard($card) {
    $card.find('.card__detalle').stop(true, true).slideDown(300, function () {
      $card.addClass('is-open');
    });
    $card.find('.card__mas').attr('aria-expanded', 'true');
  }

  function cerrarCard($card) {
   
    $card.find('.card__detalle').stop(true, true).slideUp(300, function () {
      $card.removeClass('is-open');
    });
    $card.find('.card__mas').attr('aria-expanded', 'false');
  }

  $('.card__mas').on('click', function () {
    const $card = $(this).closest('.card');
    const estabaAbierta = $card.hasClass('is-open');

    $('.card.is-open').not($card).each(function () {
      cerrarCard($(this));
    });

    if (estabaAbierta) {
      cerrarCard($card);
    } else {
      abrirCard($card);
    }
  });
});



$(function () {
  $('.menu-mobile a').on('click', function () {
    $('#sideMenu').prop('checked', false);
  });
});
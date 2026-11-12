AOS.init({
      duration: 2000
    });
 //Para que std oucpe el tamaño de ro (de guajiro)
    function ajustarStd() {
    const ro = document.querySelector('.hero__ro');
    const std = document.querySelector('.hero__std');

    if (!ro || !std) return;

  std.style.fontSize = '100px';
  const ancho = std.offsetWidth;
  std.style.fontSize = (100 * ro.offsetWidth / ancho) + 'px';
}

document.fonts.ready.then(ajustarStd);
window.addEventListener('resize', ajustarStd);
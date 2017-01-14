Modal = {};
Modal._open = !1;
Modal._overlay = document.querySelector('#modal--overlay');
Modal.closeModal = function() {
  if(!Modal._open)
    return;
  Modal._open.classList.remove('modal--show');
  Modal._overlay.classList.remove('modal--overlay--show');
  Modal._open = !1;
};
[].slice.call(document.querySelectorAll('[modal-close]')).forEach(close => {
  close.addEventListener('click', Modal.closeModal);
});
Modal._overlay.addEventListener('click', Modal.closeModal);
[].slice.call(document.querySelectorAll('[modal-trigger]')).forEach(modalTrigger => {
  var modal = document.querySelector('#' + modalTrigger.getAttribute('modal-trigger'));

  modalTrigger.addEventListener('click', event => {
    modal.classList.add('modal--show');
    Modal._overlay.classList.add('modal--overlay--show');
    Modal._open = modal;
  });
});

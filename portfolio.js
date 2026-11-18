const dialog = document.querySelector('#sail-dialog');
const content = document.querySelector('#dialog-content');
document.querySelectorAll('[data-title]').forEach(trigger => {
  trigger.addEventListener('click', event => {
    event.preventDefault();
    document.querySelector('#dialog-title').textContent = trigger.dataset.title;
    content.replaceChildren();
    const template = trigger.dataset.template && document.getElementById(trigger.dataset.template);
    if (template) {
      content.append(template.content.cloneNode(true));
    } else {
      const paragraph = document.createElement('p');
      paragraph.textContent = trigger.hasAttribute('data-vision')
        ? document.querySelector('.lh-sign').dataset.copy
        : trigger.dataset.copy || 'This collection is being prepared. In the meantime, explore my projects or say hello — I’d love to connect.';
      content.append(paragraph);
    }
    dialog.showModal();
    document.body.classList.add('dialog-open');
  });
});
document.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
dialog.addEventListener('close', () => document.body.classList.remove('dialog-open'));
dialog.addEventListener('click', event => {
  const bounds = dialog.getBoundingClientRect();
  if (event.target === dialog && (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom)) dialog.close();
});

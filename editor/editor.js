function update() {
  const name = document.getElementById('name').value || 'Card Name';
  const desc = document.getElementById('description').value || 'Card description';
  const image = document.getElementById('image').value;
  const attack = document.getElementById('attack').value || 0;
  const defense = document.getElementById('defense').value || 0;

  document.getElementById('preview-name').textContent = name;
  document.getElementById('preview-desc').textContent = desc;
  document.getElementById('preview-atk').textContent = attack;
  document.getElementById('preview-def').textContent = defense;

  const img = document.getElementById('preview-image');
  const placeholder = document.querySelector('.preview-card__placeholder');
  if (image) {
    img.src = image;
    img.alt = name;
    img.style.display = 'block';
    if (placeholder) {
      placeholder.classList.add('is-hidden');
    }
  } else {
    img.style.display = 'none';
    if (placeholder) {
      placeholder.classList.remove('is-hidden');
    }
    img.removeAttribute('alt');
    img.removeAttribute('src');
  }
}

['name','description','image','attack','defense'].forEach(id => {
  document.getElementById(id).addEventListener('input', update);
});

update();

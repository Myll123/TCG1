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
  if (image) {
    img.src = image;
    img.style.display = 'block';
  } else {
    img.style.display = 'none';
  }
}

['name','description','image','attack','defense'].forEach(id => {
  document.getElementById(id).addEventListener('input', update);
});

update();

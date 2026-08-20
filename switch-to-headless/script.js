const header = document.querySelector('.site-header');
const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.main-nav');
const chips = [...document.querySelectorAll('.chip')];
const cards = [...document.querySelectorAll('.component-card')];
const searchInput = document.querySelector('#component-search');
const result = document.querySelector('#finder-result');
const emptyState = document.querySelector('#empty-state');

let activeFilter = 'all';

function setMenu(open) {
  menuToggle.classList.toggle('active', open);
  nav.classList.toggle('open', open);
  menuToggle.setAttribute('aria-expanded', String(open));
  document.body.classList.toggle('menu-open', open);
}

menuToggle.addEventListener('click', () => {
  setMenu(!nav.classList.contains('open'));
});

nav.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => setMenu(false));
});

window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 12);
});

function filterCards() {
  const term = searchInput.value.trim().toLowerCase();
  let visible = 0;

  cards.forEach(card => {
    const tags = card.dataset.tags.split(' ');
    const name = card.dataset.name.toLowerCase();
    const matchesFilter = activeFilter === 'all' || tags.includes(activeFilter);
    const matchesSearch = !term || name.includes(term) || card.textContent.toLowerCase().includes(term);
    const show = matchesFilter && matchesSearch;

    card.hidden = !show;
    if (show) visible += 1;
  });

  result.textContent = `${visible} passende${visible === 1 ? 'r' : ''} Bestandteil${visible === 1 ? '' : 'e'} gefunden`;
  emptyState.hidden = visible !== 0;
}

chips.forEach(chip => {
  chip.addEventListener('click', () => {
    activeFilter = chip.dataset.filter;
    chips.forEach(item => item.classList.toggle('active', item === chip));
    filterCards();
  });
});

searchInput.addEventListener('input', filterCards);

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(element => observer.observe(element));

filterCards();

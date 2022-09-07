import { getIcon } from '../../scripts/scripts.js';

/** @type {HTMLDivElement[]} */
let items;
let current = 0;

/**
 * @param {HTMLDivElement} div
 */
function templateItem(div, i) {
  return `<div class="carousel-item${i === 0 ? ' active' : ''}">${div.innerHTML}</div>`;
}

/**
 * @param {HTMLDivElement} div
 */
function setupButtons(block) {
  const prevBtn = block.querySelector('span.arrow.prev');
  const nextBtn = block.querySelector('span.arrow.next');

  const handler = (incr) => () => {
    const prevItem = items[current];
    current = current === items.length - 1 ? 0 : current + incr;
    items[current].classList.add('active');
    prevItem.classList.remove('active');
  };

  prevBtn.addEventListener('click', handler(-1));
  nextBtn.addEventListener('click', handler(1));
}

/**
 * @param {HTMLDivElement} block
 */
export default function decorate(block) {
  block.innerHTML = `
    <div>
      <span class="arrow prev">${getIcon('arrow-left')}</span>
      ${[...block.querySelectorAll(':scope > div > div')].map(templateItem).join('')}
      <span class="arrow next">${getIcon('arrow-right')}</span>
    </div>`;

  items = [...block.querySelectorAll('.carousel-item')];
  setupButtons(block);
}

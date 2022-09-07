import { createTag, getIconElement } from '../../scripts/scripts.js';

const LIMIT = 3;
const LENGTH_LIMIT = 240;
let moreVisible = false;

/**
 * @param {NodeListOf<HTMLDivElement>} divs
 */
function hideSome(divs, limit) {
  divs.forEach((div, i) => {
    if (i < limit) {
      return;
    }

    div.style.display = 'none';
  });
}

function showMore(divs, limit) {
  divs.forEach((div, i) => {
    if (typeof limit === 'number' && i > limit) {
      return;
    }

    div.style.display = 'unset';
  });
}

/**
 * @param {HTMLDivElement} block
 * @returns {NodeListOf<HTMLDivElement>}
 */
function getItems(block) {
  return block.querySelectorAll(':scope > div:not(.more-btn-container)');
}

/**
 * @param {HTMLDivElement} block
 */
export default function decorate(block) {
  getItems(block).forEach((item) => {
    const content = item.firstElementChild;
    const fullText = content.innerText;
    const location = item.lastElementChild;
    const name = location.previousElementSibling;
    const stars = createTag('div', { class: 'rating' });
    for (let i = 0; i < 5; i += 1) {
      const star = getIconElement('star');
      stars.append(star);
    }
    item.prepend(stars);

    item.classList.add('review');
    location.classList.add('location');
    name.classList.add('name');
    const wrapper = createTag('div', { class: 'meta' });
    location.remove();
    name.remove();
    wrapper.append(name);
    wrapper.append(location);
    item.append(wrapper);

    if (fullText.length > LENGTH_LIMIT) {
      const shortText = `${fullText.substring(0, LENGTH_LIMIT)}...`;
      content.innerText = shortText;
      let expanded = false;
      const moreContentBtn = createTag('span', { class: 'more-content-btn' });
      moreContentBtn.innerText = 'show more';
      content.nextElementSibling.replaceWith(moreContentBtn);
      item.addEventListener('click', () => {
        expanded = !expanded;
        if (expanded) {
          moreContentBtn.innerText = 'show less';
          content.innerText = fullText;
        } else {
          moreContentBtn.innerText = 'show more';
          content.innerText = shortText;
        }
      });
    }
  });

  const btnContainer = createTag('div', { class: 'more-btn-container' });
  const showBtn = createTag('a');
  showBtn.innerText = 'Show more reviews...';
  btnContainer.append(showBtn);

  block.append(btnContainer);
  hideSome(getItems(block), LIMIT);

  showBtn.addEventListener('click', () => {
    moreVisible = !moreVisible;
    block.setAttribute('aria-expanded', `${moreVisible}`);
    if (moreVisible) {
      showBtn.innerText = 'Show more reviews...';
      hideSome(getItems(block), LIMIT);
    } else {
      showBtn.innerText = 'Show less reviews...';
      showMore(getItems(block));
    }
  });
}

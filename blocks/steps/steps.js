/**
 * @param {HTMLDivElement} div
 * @returns {string}
 */
function templateCards(div) {
  const cards = [...div.querySelectorAll(':scope > div')];
  return `<div class="cards">${cards.map((c) => `<div class="card">${c.outerHTML}</div>`).join('\n')}</div>`;
}

/**
 * @param {HTMLDivElement[]} divs
 * @returns {string}
 */
function templateSteps(divs) {
  return `<div class="steps-list">${
    divs.map((d, i) => {
      if (i === 0) {
        const header = d.querySelector('h1,h2,h3,h4,h5,h6');
        if (header && header.innerText) {
          return `<span class="list-title">${header.outerHTML}</span>`;
        }
      }

      const numEl = d.querySelector(':scope > div');
      const number = numEl.innerText;
      numEl.remove();
      return `<div class="step">
        <span class="step-number">${number}</span>
        <span class="step-content">${d.innerText}</span>
      </div>`;
    }).join('\n')
  }</div>`;
}

/**
 * @param {HTMLDivElement} block
 */
export default function decorate(block) {
  const hasCards = block.classList.contains('cards');
  const stepsDivs = [...block.querySelectorAll(':scope > div')];

  let content = '';
  if (hasCards) {
    const cardsDiv = stepsDivs.shift();
    content += templateCards(cardsDiv);
  }

  block.innerHTML = `${content}${templateSteps(stepsDivs)}`;
}

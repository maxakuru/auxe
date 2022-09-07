export default function decorate(block) {
  const cols = [...block.firstElementChild.children];
  block.classList.add(`columns-${cols.length}-cols`);
  if (block.classList.contains('full')) {
    block.parentElement.parentElement.classList.add('full');
  }
}

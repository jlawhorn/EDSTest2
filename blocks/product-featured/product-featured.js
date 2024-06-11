import { createOptimizedPicture } from '../../scripts/aem.js';

export default function decorate(block) {
  const classPrefix = 'product-featured';
  const sectionWrapper = document.createElement('section');

  block.querySelectorAll('h1').forEach((title) => {
    title.classList.add(`${classPrefix}-title`);
    title.removeAttribute('id');
  });

  block.querySelectorAll('h2').forEach((description) => {
    description.classList.add(`${classPrefix}-description`);
    description.removeAttribute('id');
  });

  block.querySelectorAll('h3').forEach((price) => {
    price.classList.add(`${classPrefix}-price`);
    price.removeAttribute('id');
  });

  block.querySelectorAll('img').forEach((img) => {
    const pictureEl = img.closest('picture');
    const pictureLinkEl = pictureEl.closest('a');
    const pictureContainer = pictureEl.closest('p');
    const newPicture = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    const newPictureWrapper = document.createElement('div');
    newPictureWrapper.classList.add(`${classPrefix}-image-wrapper`);
    newPicture.classList.add(`${classPrefix}-image`);
    if (pictureLinkEl) {
      pictureLinkEl.classList.add(`${classPrefix}-link`);
      pictureLinkEl.replaceChildren(newPicture);
      newPictureWrapper.replaceChildren(pictureLinkEl);
    } else {
      newPictureWrapper.replaceChildren(newPicture);
    }
    pictureContainer.replaceWith(newPictureWrapper);
  });

  block.parentNode.insertBefore(sectionWrapper, block);
  sectionWrapper.appendChild(block);
}

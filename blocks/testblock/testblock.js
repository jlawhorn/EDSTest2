import { fetchIndex } from '../../scripts/scripts.js';
import { createOptimizedPicture } from '../../scripts/aem.js';

const componentName = 'testblock';

const CLASSES = {
  wrapper: `${componentName}-inner-container`,
  title: `${componentName}-title`,
  link: `${componentName}-link`,
  image: `${componentName}-image`,
  description: `${componentName}-description`,
  price: `${componentName}-price`,
};

const fetchData = async (url) => {
  try {
    return await fetchIndex(url);
  } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
};

const formatData = (data) => data.reduce((acc, { key, value }) => {
  acc[key] = value;
  return acc;
}, {});

const createMarkup = (data) => {
  const imageElement = createOptimizedPicture(data.imageUrl, data.title, false, [{ width: '750' }]);
  imageElement.classList.add(CLASSES.image);
  return (`
    <div class="${CLASSES.wrapper}">
        <h1 class="${CLASSES.title}">${data.title}</h1>
        <a href="${data.link}" title="${data.title}" class="${CLASSES.link}">
            ${imageElement.outerHTML}
        </a>
        <p class="${CLASSES.description}">${data.description}</p>
        <div class="${CLASSES.price} price">$${data.price}</div>
    </div>`
  );
};

const updateDOM = (block, markup) => {
  const sectionEl = document.createElement('section');
  sectionEl.innerHTML = markup;
  block.replaceChildren(sectionEl);
};

export default async function decorate(block) {
  const index = await fetchData('test/testblock');

  if (!index || !index.data) {
    console.error('No data available');
    return;
  }

  const formattedData = formatData(index.data);
  const markup = createMarkup(formattedData);
  updateDOM(block, markup);
}

const addLoader = () => {
  const searchContainer = document.querySelector('.loader');
  const loaderContainer = '<div class="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>';
  searchContainer.insertAdjacentHTML('beforeend', loaderContainer);
}

const removeLoader = () => {
  const loader = document.querySelector('.lds-spinner') || '';
  if (loader) {
    document.querySelector('.loader').innerHTML = '';
  }
}

export { addLoader, removeLoader };

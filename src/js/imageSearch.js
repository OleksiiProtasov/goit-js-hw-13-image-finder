import servise from './apiService';
import cardImeges from '../templates/templates.hbs';
import refs from './getRefs';
import * as basicLightbox from 'basiclightbox'

const regeneratorRuntime = require("regenerator-runtime");

refs.searchForm.addEventListener('submit', imageSearchInputHandler);
refs.loadMoreBtn.addEventListener('click', loadMoreBtnHandler);

function imageSearchInputHandler(e) {

  e.preventDefault();

  const form = e.currentTarget;
  const input = form.elements.query;

  clearListItems();

  servise.resetPage();
  servise.searchQuerry = input.value;

  servise.fetcArticles().then(hits => {
    const markup = buildListItemsTemplate(hits);
    iserListItems(markup);
  });
  input.value = '';
}

function loadMoreBtnHandler() {
  servise.fetcArticles().then(hits => {
    const markup = buildListItemsTemplate(hits);
    iserListItems(markup);
    this.scrollIntoView({behavior: 'smooth', block: 'end',});
  });
}

function iserListItems(items) {
  refs.gallery.insertAdjacentHTML('beforeend', items);
}

function buildListItemsTemplate(items) {
  return cardImeges(items);
}

function clearListItems() {
  refs.gallery.innerHTML = '';
}
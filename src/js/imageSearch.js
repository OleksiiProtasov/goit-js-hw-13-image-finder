import servise from './apiService';
import cardImeges from '../templates/templates.hbs';
import refs from './getRefs';
// import * as basicLightbox from 'basiclightbox'

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
  });
}

function iserListItems(items) {
  const oldSize = refs.gallery.children.length;
  refs.gallery.insertAdjacentHTML('beforeend', items);
  const count =  refs.gallery.children.length - oldSize;
  const element = refs.gallery.children[refs.gallery.children.length - count];
  console.log(refs.gallery.children.length, oldSize)
  if(element)
    element.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
}

function buildListItemsTemplate(items) {
  return cardImeges(items);
}

function clearListItems() {
  refs.gallery.innerHTML = '';
}
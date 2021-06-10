import servise from './apiService';
import cardImeges from '../templates/templates.hbs';
import refs from './getRefs';
import { alert, defaultModules } from '@pnotify/core';
import * as PNotifyMobile from '@pnotify/mobile';

defaultModules.set(PNotifyMobile, {});


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
  // notice();
}

function loadMoreBtnHandler() {
  servise.fetcArticles().then(hits => {
    const markup = buildListItemsTemplate(hits);
    iserListItems(markup);
  });
}

function iserListItems(items) {
  const oldValue = refs.gallery.children.length;
  refs.gallery.insertAdjacentHTML('beforeend', items);
  const count =  refs.gallery.children.length - oldValue;
  const element = refs.gallery.children[refs.gallery.children.length - count];
  // console.log(refs.gallery.children.length, oldValue)
  if(element)
    element.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
    
}

// function notice(){
//   alert({
//     text: 'Notice me, senpai!'
//   });
// }

function buildListItemsTemplate(items) {
  return cardImeges(items);
}

function clearListItems() {
  refs.gallery.innerHTML = '';
}
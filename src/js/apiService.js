
const BASE_URL = 'https://pixabay.com/api/';

export default {
  page: 1,
  query: '',
  async fetcArticles(query){
    const keyapi = '21935318-c1f2aed7e7c83eceedbf4cf2c';
    const requestparams = `?image_type=photo&orientation=horizontal&q=${this.query}&page=${this.page}&per_page=12&key=${keyapi}`;
    const res = await fetch(BASE_URL + requestparams);
    const parseRes = await res.json();
    this.incrementPage();
    return parseRes.hits;
  },
  get searchQuerry() {
    return this.query;
  },
  set searchQuerry(string) {
    this.query = string;
  },
  incrementPage() {
    this.page += 1;
  },
  resetPage() {
    this.page = 1;
  },
};

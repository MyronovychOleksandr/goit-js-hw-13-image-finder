import "@babel/polyfill"
import "./refs.js"

export default {
    apiKey: '18864645-939ea59db410a3043a30cf718',
    _query: '',
    page: 1,

    async toGetFetch() {
            let url = `https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${this.query}&page=${this.page}&per_page=12&key=${this.apiKey}`
            let response = await fetch(url);
            let result = await response.json() 
            console.log(result.hits);
            return result.hits;
        },

    get query() {
        return this._query
    },

    set query(value) {
        return this._query = value;
    },
    
    setPage() {
        return this.page += 1;
    }
}
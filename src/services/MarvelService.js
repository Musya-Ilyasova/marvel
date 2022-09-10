

class MarvelService {
  _apiBase = 'https://gateway.marvel.com:443/v1/public/'; // переменные начинающиеся через нижний лодаш говорят о том что это неизменяемая переменнная (неформальная договоренность между программистами)
  _apiKey = 'apikey=d81759a9997ed1ebda79147a02e63a54';
  getResource = async (url) => {
    let res = await fetch(url);
    if(!res.ok) {
      throw new Error(`Could not fetch ${url}, status: ${res.status}`);
    }
    return await res.json();
  }

  getAllCharacters = () => {
    return this.getResource(`${this._apiBase}characters?limit=9&offset=210&${this._apiKey}`);
  }

  getCharacter = (id) => {
    return this.getResource(`${this._apiBase}characters/${id}?${this._apiKey}`);
  }

}


export default MarvelService;

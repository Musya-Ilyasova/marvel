

class MarvelService {
  _apiBase = 'https://gateway.marvel.com:443/v1/public/'; // переменные начинающиеся через нижний лодаш говорят о том что это неизменяемая переменнная (неформальная договоренность между программистами)
  _apiKey = 'apikey=d81759a9997ed1ebda79147a02e63a54';
  _baseOffset = 210;
  
  getResource = async (url) => {
    let res = await fetch(url);
    if(!res.ok) {
      throw new Error(`Could not fetch ${url}, status: ${res.status}`);
    }
    return await res.json();
  }

  getAllCharacters = async (offset = this._baseOffset) => {
    const res = await this.getResource(`${this._apiBase}characters?limit=9&offset=${offset}&${this._apiKey}`);
    return res.data.results.map(this._transformCharacter);
  }

  getCharacter = async (id) => {
    const res = await this.getResource(`${this._apiBase}characters/${id}?${this._apiKey}`);
    return this._transformCharacter(res.data.results[0]);
  }

  _transformCharacter = (char) => {
    let checkDescription = "";
    if (!char.description) {
      checkDescription = 'This hero has no description';
    } else if (char.description.length > 224) {
      checkDescription = char.description.slice(0, 224) + '...';
    } else {
      checkDescription = char.description;
    };
    return {
      id: char.id,
      name: char.name,
      description: checkDescription,
      thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
      homepage: char.urls[0].url,
      wiki: char.urls[1].url,
      comics: char.comics.items
    }
  }

}


export default MarvelService;

import {useHttp} from '../hooks/http.hook';

const useMarvelService = () => {
  const {loading, request, error, clearError} = useHttp();
  const _apiBase = 'https://gateway.marvel.com:443/v1/public/'; // переменные начинающиеся через нижний лодаш говорят о том что это неизменяемая переменнная (неформальная договоренность между программистами)
  const _apiKey = 'apikey=d81759a9997ed1ebda79147a02e63a54';
  const _baseOffset = 210;

  const getAllCharacters = async (offset = _baseOffset) => {
    const res = await request(`${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`);
    return res.data.results.map(_transformCharacter);
  }

  const getAllComics = async (offset = _baseOffset) => {
    const res = await request(`${_apiBase}comics?limit=8&offset=${offset}&${_apiKey}`);
    return res.data.results.map(_transformComics);

  }

  const getCharacter = async (id) => {
    const res = await request(`${_apiBase}characters/${id}?${_apiKey}`);
    return _transformCharacter(res.data.results[0]);
  }

  const _transformCharacter = (char) => {
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

  const _transformComics = (char) => {
    return {
      id: char.id,
      title: char.title,
      description: char.description,
      thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
      homepage: char.urls[0].url,
      price: char.prices[0].price
    }
  }

  return {loading, error, getAllCharacters, getCharacter, getAllComics, clearError}
}


export default useMarvelService;

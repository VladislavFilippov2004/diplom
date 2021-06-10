const constants = {
  baseUrl: 'http://localhost:3000',
  moviesUrl: 'https://api.nomoreparties.co/beatfilm-movies',
  movieImageUrl: 'https://api.nomoreparties.co',
  widthModes: [
    {
      widthMode: '1280_plus',
      maxWidth: Infinity,
      minWidth: 1280,
      cssClassName: 'movies__cards_1280-plus',
      cardsInRow: 3,
      numberOfRows: 5,
      addCards: 3
    },
    {
      widthMode: '768_1280',
      maxWidth: 1280,
      minWidth: 768,
      cssClassName: 'movies__cards_768-1280',
      cardsInRow: 2,
      numberOfRows: 4,
      addCards: 2
    },
    {
      widthMode: '480_768',
      maxWidth: 768,
      minWidth: 480,
      cssClassName: 'movies__cards_480-768',
      cardsInRow: 2,
      numberOfRows: 4,
      addCards: 2
    },
    {
      widthMode: '320_480',
      maxWidth: 480,
      minWidth: 320,
      cssClassName: 'movies__cards_320-480',
      cardsInRow: 2,
      numberOfRows: 4,
      addCards: 2
    },
  ]
};

export default constants;

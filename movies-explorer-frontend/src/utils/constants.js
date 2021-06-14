const constants = {
  baseUrl: 'http://localhost:3000',
  moviesUrl: 'https://api.nomoreparties.co/beatfilm-movies',
  movieImageUrl: 'https://api.nomoreparties.co',
  widthModes: [
    {
      widthMode: '1280_plus',
      maxWidth: Infinity,
      minWidth: 1280,
      cssClassName: 'movies__cards',
      cardsInRow: 3,
      numberOfRows: 5,
      addCards: 3
    },
    {
      widthMode: '761_1280',
      maxWidth: 1280,
      minWidth: 761,
      cssClassName: 'movies__cards',
      cardsInRow: 2,
      numberOfRows: 4,
      addCards: 2
    },
    {
      widthMode: '480_760',
      maxWidth: 760,
      minWidth: 480,
      cssClassName: 'movies__cards',
      cardsInRow: 2,
      numberOfRows: 4,
      addCards: 2
    },
    {
      widthMode: '0_480',
      maxWidth: 480,
      minWidth: 0,
      cssClassName: 'movies__cards',
      cardsInRow: 1,
      numberOfRows: 5,
      addCards: 1
    },
  ],
  keysToCheck: ['duration', 'director', 'nameRU', 'nameEN', 'country',
   'year', 'trailerLink', 'image', 'id', 'description']
};

export default constants;

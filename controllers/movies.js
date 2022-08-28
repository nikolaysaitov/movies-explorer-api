const Movie = require('../models/movie');
const ValidError = require('../errors/validation_error_400');
const ForbiddenError = require('../errors/forbidden_403');
const NotFoundError = require('../errors/not-found-err_404');

// GET /cards — возвращает все карточки
// module.exports.getMovies = (req, res, next) => {
//   const owner = req.user._id;
//   Movie.find({ owner })
//     .then((movies) => res.send({
//       data: movies,
//     }))
//     .catch((err) => {
//       next(err);
//     });
// };
module.exports.getMovies = (req, res, next) => {
  const owner = req.user._id;
  Movie.find({ owner })
    .then((films) => res.send(films))
    .catch((err) => {
      next(err);
    });
};

// POST /cards — создаёт карточку
module.exports.createMovie = (req, res, next) => {
  const owner = req.user._id;
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
  } = req.body;
  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
    owner,
  })
    .then((film) => res.status(201).send(film))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new ValidError('Введены некорректные данные'));
      }
      return next(err);
    });
};

// DELETE /cards/:cardId — удаляет карточку по идентификатору
// module.exports.deleteMovie = (req, res, next) => {
//   Movie.findById(req.params._id)
//     .then((movie) => {
//       if (!movie) {
//         throw new NotFoundError('Фильм отсутствует');
//       }
//       if (movie.owner.toString() !== req.user._id) {
//         throw new ForbiddenError('Это чужой фильм, его нельзя удалить');
//       } else {
//         return movie.remove()
//           .then(() => res.send({
//             message: 'Фильм удален',
//           }));
//       }
//     }).catch(next);
// };
module.exports.deleteMovie = (req, res, next) => {
  Movie.findById(req.params._id)
    .then((film) => {
      if (!film) {
        throw new NotFoundError('Фильм отсутствует');
      }
      if (film.owner.toString() !== req.user._id) {
        throw new ForbiddenError('Это чужой фильм, его нельзя удалить');
      } else {
        return film.remove()
          .then(() => res.send({
            message: 'Фильм удален',
          }));
      }
    }).catch(next);
};

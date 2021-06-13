const headers = document.getElementsByTagName('header');

const btn = headers[0].getElementsByTagName('button')[0];

const modalSection = document.getElementById('add-modal');

const backdrop = document.getElementById('backdrop');

const cancelAddMovie = modalSection.querySelector('.btn--passive');

const confirmAddMovie = cancelAddMovie.nextElementSibling;

const userInputs = modalSection.querySelectorAll('input');

const movies = [];

const deleteMovieModal = document.getElementById('delete-modal');

// const deleteModalAction = deleteMovieModal.querySelector('.modal__content');

const entryTextSection = document.getElementById('entry-text');

const updateUI = () => {
  if (movies.length === 0) {
    entryTextSection.style.display = 'block';
  } else {
    entryTextSection.style.display = 'none';
  }
};

const deleteMovie = (movieId) => {
  let movieIndex = 0;
  for (const movie of movies) {
    if (movie.id === movieId) {
      break;
    }
    movieIndex++;
  }
  movies.splice(movieIndex, 1);
  const listRoot = document.getElementById('movie-list');
  listRoot.children[movieIndex].remove();
  removeModalAction();
  toggleBackdrop();
};

const closeMovieDeletionModal = () => {
  toggleBackdrop();
  deleteMovieModal.classList.remove('visible');
};

const cancelContentMovieModal = () => {
  contentSection[0].classList.add('invisible');
};

const getNewMovieElement = () => {
  return document.getElementsByClassName('movie-element')[0];
};

const removeModalAction = () => {
  deleteMovieModal.classList.remove('visible');
};

const deletMovieHandler = (movieId) => {
  deleteMovieModal.classList.add('visible');
  toggleBackdrop();
  const cancelDeletionButton = deleteMovieModal.querySelector('.btn--passive');
  const confirmDeletionButton = deleteMovieModal.querySelector('.btn--success');

  cancelDeletionButton.addEventListener('click', closeMovieDeletionModal);
  confirmDeletionButton.addEventListener(
    'click',
    deleteMovie.bind(null, movieId)
  );
  // deleteMovie(movieId);
};

const renderNewMovieElement = (id, title, imageUrl, rating) => {
  const newMoiveElement = document.createElement('li');
  newMoiveElement.className = 'movie-element';
  newMoiveElement.innerHTML = `
  <div class = "movie-element__image">
    <img src = "${imageUrl}" alt = "${title}"/>
  </div>
  <div class = "movie-element_info">
    <h2>${title}</h2>
    <p>${rating}/5 stars</p>
  </div>
  `;
  newMoiveElement.addEventListener('click', deletMovieHandler.bind(null, id));
  const listRoot = document.getElementById('movie-list');
  listRoot.append(newMoiveElement);
};

const toggleBackdrop = () => {
  backdrop.classList.toggle('visible');
  clearUsersInputs();
};

const closeMovieModal = () => {
  modalSection.classList.remove('visible');
};

const backdropClickHandler = () => {
  closeMovieModal();
  closeMovieDeletionModal();
};

const showMovieModal = () => {
  modalSection.classList.add('visible');
  toggleBackdrop();
};

const clearUsersInputs = () => {
  for (const userInput of userInputs) {
    userInput.value = '';
  }
};

const cancelAddMovieModal = () => {
  closeMovieModal();
  clearUsersInputs();
  toggleBackdrop();
};

const addMovieHandler = () => {
  const titleValue = userInputs[0].value;
  const imageUrlValue = userInputs[1].value;
  const ratinglValue = userInputs[2].value;

  if (
    titleValue.trim() === '' ||
    imageUrlValue.trim() === '' ||
    ratinglValue.trim() === '' ||
    +ratinglValue < 1 ||
    +ratinglValue > 5
  ) {
    alert('Please enter valid values (rating between 1 & 5)');
    return;
  }
  const newMoive = {
    id: Math.random().toString(),
    title: titleValue,
    image: imageUrlValue,
    rating: ratinglValue,
  };
  movies.push(newMoive);
  closeMovieModal();
  toggleBackdrop();
  clearUsersInputs();
  renderNewMovieElement(
    newMoive.id,
    newMoive.title,
    newMoive.image,
    newMoive.rating
  );
  updateUI();
};

btn.addEventListener('click', showMovieModal);
cancelAddMovie.addEventListener('click', cancelAddMovieModal);
backdrop.addEventListener('click', backdropClickHandler);
confirmAddMovie.addEventListener('click', addMovieHandler);

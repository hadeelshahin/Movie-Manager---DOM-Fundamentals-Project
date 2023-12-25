//const modalOverlay = document.querySelector('#add-modal')
//const modalOverlay=document.getElementById('add-modal');
const modalOverlay = document.body.children[1];
//const startAddButton=document.querySelector('header').lastElementChild;
const startAddButton = document.querySelector("header button");
//console.log(startAddButton);
//const backdrop=document.getElementById('backdrop');
const backdrop = document.body.children[0];
//console.log(backdrop);
const cancelButton = document.getElementById("cancel");
const confirmAddMovieButton = cancelButton.nextElementSibling;
// console.log(addButton);
// const caccelBuuton=addButton.previousElementSibling;
// console.log(caccelBuuton);
const userInputs = modalOverlay.querySelectorAll("input");
console.log(userInputs);
const Movies = [];
const entryTextSection = document.getElementById("entry-text");
console.log(entryTextSection);
const listRoot = document.getElementById("movie-list");
const deleteMovieModal = document.getElementById("delete-modal");
const cancelDeletionButton = deleteMovieModal.querySelector(".btn--passive");
console.log(cancelDeletionButton);
const confirmDeletionButton = deleteMovieModal.querySelector(".btn--danger");
console.log(confirmDeletionButton);

//HANDLERS:**************************************************************************************
const showMovieModal = () => {
  modalOverlay.classList.add("visible");
  toggleBackdropHandler();
};
const closeMovieModal = () => {
  modalOverlay.classList.remove("visible");
  toggleBackdropHandler;
};
const toggleBackdropHandler = () => {
  backdrop.classList.toggle("visible");
};
const backdropClickHandler = () => {
  closeMovieModal();
  cancelMovieDeletion();
};
const cancelButtonHandler = () => {
  closeMovieModal();
  toggleBackdropHandler();
  clearInputs();
};
// *********** tweak the code

const addMovieHandler = () => {
  const titleValue = userInputs[0].value;
  const imageURLValue = userInputs[1].value;
  const ratingValue = userInputs[2].value;
  //validation process
  if (
    titleValue.trim() === "" ||
    imageURLValue.trim() === "" ||
    ratingValue.trim() === "" ||
    parseInt(ratingValue) < 0 ||
    +ratingValue > 5
  ) {
    alert("Please enter valid values (rating between 1 and 5)");
    return;
  } else {
    closeMovieModal();
  }
  //after checking inputs
  const newMovie = {
    id: Math.random().toString(),
    title: titleValue,
    img: imageURLValue,
    rate: +ratingValue,
  };
  Movies.push(newMovie);
  console.log(Movies);
  closeMovieModal();
  toggleBackdropHandler();

  clearInputs();
  renderNewMovieElemnt(
    newMovie.id,
    newMovie.title,
    newMovie.img,
    newMovie.rate
  );
  updateUI();
};
const clearInputs = () => {
  // userInputs[0].value = "";
  // userInputs[1].value = "";
  // userInputs[2].value = "";
  // for (let i = 0; i < userInputs.length; i++) {
  //   userInputs[i].value = "";
  // }
  for (const userinput of userInputs) {
    userinput.value = "";
  }
};
const updateUI = () => {
  if (Movies.length === 0) {
    entryTextSection.style.display = "block";
  } else {
    entryTextSection.style.display = "none";
  }
};
const renderNewMovieElemnt = (id, title, imageUrl, rating) => {
  const newMovieElement = document.createElement("li"); //this create an empty list iteam
  newMovieElement.className = "movie-element"; // i added the style
  //to add the content in this empty list
  //adding structued HTML content
  newMovieElement.innerHTML = `
    <div class="movie-element__image">
       <img src="${imageUrl}" alt="${title}"  />
    </div> 
    <div class="movie-element__info">
       <h2>${title}</h2>
       <p>${rating}/5 stars</p>
    </div>
  `;
  newMovieElement.addEventListener("click", deleteMovieHandler.bind(null, id));
  listRoot.append(newMovieElement);
};

const deleteMovie = (movieId) => {
  let movieIndex = 0;
  for (const movie of Movies) {
    if (movie.id === movieId) {
      //if we got the right id ,, we just break
      break; //it will stop the nearset loop so
      //we exit of the loop to get the movie index to be deleted
    }

    movieIndex++;
  } // increment this counter after each iteration
  //use it to remove the movieElement from the unordered list
  Movies.splice(movieIndex, 1);
  //this is just a javascript
  //manipluate the DOM tree by :
  //listRoot.children[movieIndex].remove();
  // const listRoot = document.getElementById("movie-list");

  listRoot.children[movieIndex].remove();
  // listRoot.removeChild(listRoot.children[movieIndex]);
};

const deleteMovieHandler = (movieId) => {
  deleteMovieModal.classList.add("visible");
  toggleBackdropHandler();
  cancelDeletionButton.addEventListener("click", cancelMovieDeletion);
  confirmDeletionButton.addEventListener("click", () => {
    deleteMovie(movieId);
    cancelMovieDeletion();
  });
};

const cancelMovieDeletion = () => {
  toggleBackdropHandler();
  deleteMovieModal.classList.remove("visible");
};
//EVENST:*******************************************************************************************
startAddButton.addEventListener("click", showMovieModal);
backdrop.addEventListener("click", backdropClickHandler);
cancelButton.addEventListener("click", cancelButtonHandler);
confirmAddMovieButton.addEventListener("click", addMovieHandler);

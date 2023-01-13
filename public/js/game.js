function displayGameInfo(gameData) {
  let gameCardEl = document.querySelector(".gameCard");
  gameCardEl.style.display = "inline-block";
  let gameTitle = document.getElementById("game-title");
  let gameDescription = document.getElementById("game-description");
  let gameImage = document.getElementById("game-image");
  let gameReleased = document.getElementById("realeasedDate");
  
  gameTitle.textContent = gameData.title;
  gameDescription.textContent = gameData.game_description;
  gameImage.setAttribute("src", gameData.cover);
  gameReleased.textContent = gameData.release_date;
}

const searchForm = async (event) => {
  event.preventDefault();
  
  // Collect values from the login form
  let search = document.querySelector("#form-input").value.trim();
  // removes any spaces in the search string
  search = search.replace(/\s/g, '-');
  
  if (search) {
    const response = await fetch('/api/games', {
      method: "GET",
      body: JSON.stringify({ title: search }),
      headers: { "Content-Type": "application/json" },
    })
    displayGameInfo(response);
  }
};
  
const reviewForm = async (event) => {
  event.preventDefault();
  
  let routeParams = document.location.search.split('/');
  let gameID = routeParams[2];

  console.log("Inside reviewForm");
  // grab the rating || verify its filled in
  let ratingEl = document.getElementById("inputRating");
  let reviewContent = document.getElementById("userReview");
  let gameTitle = document.getElementById("game-title")
  
  // console.log(ratingEl.value);
  if (!ratingEl.value) {
    alert("Please fill in the rating.")
  }
  // text content || verify its filled in
  if (!reviewContent.value) {
    alert("Please fill in the review.")
  }
  // game slug || 
  gameTitle = gameTitle.textContent;
  if (!gameTitle) {
    alert("Please search the game you want to review.")
  }
  
  let gameReleased = document.getElementById("releasedDate");
  let gameDescription = document.getElementById("game-description");
  let gameImage = document.getElementById("game-image").getAttribute("src");
  
  gameDescription = gameDescription.textContent;
  gameReleased = gameReleased.textContent;
  
  
  console.log("gameId is: ", gameId);
  // 0 means it was passed from the api
  if (gameId == 0) {
    const response = await fetch('/api/games', {
      method: "POST",
      body: JSON.stringify({
        title: gameTitle,
        game_description: gameDescription,
        release_date: gameReleased,
        cover: gameImage,
      }),
      headers: { "Content-Type": "application/json" },
    })
    console.log("back from post");
  }
  let today = new Date();
  let dd = String(today.getDate()).padStart(2, '0');
  let mm = String(today.getMonth() + 1).padStart(2, '0');
  let yyyy = today.getFullYear();

  today = mm + '/' + dd + '/' + yyyy;

  const postReview = await fetch('/api/reviews', {
    method: "POST",
    body: JSON.stringify({
      review_body: reviewContent,
      review_date: today,
      game_id: gameID
    })
  })
  console.log(postReview);
  
}
  
document.querySelector(".searchForm").addEventListener("submit", searchForm);
document.getElementById("reviewForm").addEventListener("submit", reviewForm);
  
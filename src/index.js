// Your code here
// Define the base URL for the API
const apiBaseUrl = "http://localhost:3000";

// Function to update the movie details on the page
function updateMovieDetails(movie) {
  const posterElement = document.getElementById("poster");
  const titleElement = document.getElementById("title");
  const runtimeElement = document.getElementById("runtime");
  const descriptionElement = document.getElementById("film-info");
  const showtimeElement = document.getElementById("showtime");
  const ticketNumElement = document.getElementById("ticket-num");
  const buyTicketButton = document.getElementById("buy-ticket");
  const availableTickets = movie.capacity - movie.tickets_sold;

  posterElement.src = movie.poster;
  titleElement.textContent = movie.title;
  runtimeElement.textContent = `${movie.runtime} minutes`;
  descriptionElement.textContent = movie.description;
  showtimeElement.textContent = movie.showtime;
  ticketNumElement.textContent = `${availableTickets} remaining tickets`;

  // Update the Buy Ticket button's availability based on available tickets
  buyTicketButton.disabled = availableTickets === 0;

  // Add event listener to Buy Ticket button
  buyTicketButton.addEventListener("click", () => {
    if(availableTickets > 0) {
      ticketNumElement.textContent = `${availableTickets - 1} remaining tickets`;
    } else {
      buyTicketButton.disabled = availableTickets === 0;
    }
  });
}

// Function to fetch movie details by ID and update the page
function fetchAndDisplayMovieDetails(movieId) {
  fetch(`${apiBaseUrl}/films/${movieId}`)
    .then(response => response.json())
    .then(movie => updateMovieDetails(movie))
    .catch(error => console.error("Error fetching movie details:", error));
}

// Function to populate the movie menu
function populateMovieMenu(films) {
  const filmsList = document.getElementById("films");
  filmsList.innerHTML = ""; // Clear the placeholder li element

  films.forEach(movie => {
    const listItem = document.createElement("li");
    listItem.className = "film item";
    listItem.textContent = movie.title;
    listItem.addEventListener("click", () => fetchAndDisplayMovieDetails(movie.id));
    filmsList.appendChild(listItem);
  });
}

// Function to fetch all movies and populate the menu
function fetchAndPopulateMovies() {
  fetch(`${apiBaseUrl}/films`)
    .then(response => response.json())
    .then(films => populateMovieMenu(films))
    .catch(error => console.error("Error fetching movies:", error));
}

// Initialize the page by fetching movies and displaying the first movie details
fetchAndPopulateMovies();
fetchAndDisplayMovieDetails(1);

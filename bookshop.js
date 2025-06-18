const axios = require('axios');

// Base URL for the bookshop API (replace with your lab's API URL)
const API_URL = 'http://api.bookshop.com';

// Store token for authenticated requests (Tasks 8–9)
let authToken = null;

// Task 6: Register New User (POST /users/register)
async function registerUser(username, password) {
  try {
    const response = await axios.post(`${API_URL}/users/register`, {
      username,
      password,
    });
    console.log('User Registration:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error registering user:', error.response?.data || error.message);
    throw error;
  }
}

// Task 7: Login as a Registered User (POST /users/login)
async function loginUser(username, password) {
  try {
    const response = await axios.post(`${API_URL}/users/login`, {
      username,
      password,
    });
    authToken = response.data.token; // Store JWT token
    console.log('User Login:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error logging in:', error.response?.data || error.message);
    throw error;
  }
}

// Task 8: Add/Modify a Book Review (POST or PUT /books/:isbn/reviews)
async function addOrModifyReview(isbn, review, rating) {
  try {
    const response = await axios.post(
      `${API_URL}/books/${isbn}/reviews`,
      { review, rating },
      { headers: { Authorization: `Bearer ${authToken}` } }
    );
    console.log('Add/Modify Review:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error adding/modifying review:', error.response?.data || error.message);
    throw error;
  }
}

// Task 9: Delete Book Review (DELETE /books/:isbn/reviews/:reviewId)
async function deleteReview(isbn, reviewId) {
  try {
    const response = await axios.delete(`${API_URL}/books/${isbn}/reviews/${reviewId}`, {
      headers: { Authorization: `Bearer ${authToken}` },
    });
    console.log('Delete Review:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error deleting review:', error.response?.data || error.message);
    throw error;
  }
}

// Task 10: Get All Books – Using Async/Await
async function getAllBooks() {
  try {
    const response = await axios.get(`${API_URL}/books`);
    console.log('All Books:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching books:', error.response?.data || error.message);
    throw error;
  }
}

// Task 11: Search by ISBN – Using Promises
function getBookByISBN(isbn) {
  return axios
    .get(`${API_URL}/books/isbn/${isbn}`)
    .then((response) => {
      console.log(`Book with ISBN ${isbn}:`, response.data);
      return response.data;
    })
    .catch((error) => {
      console.error(`Error fetching book with ISBN ${isbn}:`, error.response?.data || error.message);
      throw error;
    });
}

// Task 12: Search by Author – Using Async/Await
async function getBooksByAuthor(author) {
  try {
    const response = await axios.get(`${API_URL}/books/author/${encodeURIComponent(author)}`);
    console.log(`Books by ${author}:`, response.data);
    return response.data;
  } catch (error) {
    console.error(`Error fetching books by ${author}:`, error.response?.data || error.message);
    throw error;
  }
}

// Task 13: Search by Title – Using Async/Await
async function getBooksByTitle(title) {
  try {
    const response = await axios.get(`${API_URL}/books/title/${encodeURIComponent(title)}`);
    console.log(`Books with title ${title}:`, response.data);
    return response.data;
  } catch (error) {
    console.error(`Error fetching books with title ${title}:`, error.response?.data || error.message);
    throw error;
  }
}

// Example Usage (replace with your test data)
(async () => {
  try {
    // Task 6: Register a new user
    await registerUser('testuser', 'password123');

    // Task 7: Login to get token
    await loginUser('testuser', 'password123');

    // Task 10: Get all books (for Task 1 screenshot)
    await getAllBooks();

    // Task 11: Search by ISBN
    await getBookByISBN('1234567890');

    // Task 12: Search by Author
    await getBooksByAuthor('J.K. Rowling');

    // Task 13: Search by Title
    await getBooksByTitle('Harry Potter');

    // Task 8: Add a review (requires login token)
    await addOrModifyReview('1234567890', 'Great book!', 5);

    // Task 9: Delete a review (replace 'reviewId' with actual ID from Task 8 response)
    await deleteReview('1234567890', 'reviewId');
  } catch (error) {
    console.error('Test failed:', error.message);
  }
})();

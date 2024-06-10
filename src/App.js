import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Component/Home'; // Adjust the path if necessary
import Bookshelf from './Component/Bookshelf'; // Adjust the path if necessary
import { BookshelfProvider } from './BookshelfContext';
import './index.css';
import { fetchData } from './data'; // Import the fetchData function

function App() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getBooks = async () => {
      try {
        const fetchedBooks = await fetchData();
        setBooks(fetchedBooks);
      } catch (error) {
        setError('Error fetching books');
        console.error('Error fetching books:', error);
      } finally {
        setLoading(false);
      }
    };

    getBooks();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <BookshelfProvider>
      <div className="App">
        <Router>
          <Routes>
            <Route exact path="/" element={<Home books={books} />} />
            <Route path="/bookshelf" element={<Bookshelf />} />
          </Routes>
        </Router>
      </div>
    </BookshelfProvider>
  );
}

export default App;

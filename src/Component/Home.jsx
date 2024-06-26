// Home.js
import React, { useState } from 'react';
import { useBookshelf } from '../BookshelfContext';
import BookCard from '../BookCard';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const colors = [
  'bg-red-200',
  'bg-blue-200',
  'bg-green-200',
  'bg-yellow-200',
  'bg-purple-200',
  'bg-pink-200',
  'bg-indigo-200',
  'bg-teal-200',
];

const Home = ({ books }) => {
  const [searchValue, setSearchValue] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const { addToBookshelf, bookshelf } = useBookshelf();
  const [currentPage, setCurrentPage] = useState(1);

  const handleAddToBookshelf = (book) => {
    const isBookInBookshelf = bookshelf.some((shelfBook) => shelfBook.id === book.id);
    if (!isBookInBookshelf) {
      addToBookshelf(book);
      // Store bookshelf in localStorage
      localStorage.setItem('bookshelf', JSON.stringify([...bookshelf, book]));
      toast.success("Book added to bookshelf");
      setTimeout(() => {
        window.location.reload();
      }, 1500); // Adjust the delay as needed
    } else {
      toast.info("Book is already in your bookshelf");
      setTimeout(() => {
        window.location.reload();
      }, 1500); // Adjust the delay as needed
    }
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchValue(value);
    if (value.trim() === '') {
      setSearchResults([]);
      return;
    }
    const filteredResults = books.filter((book) =>
      book.title.toLowerCase().includes(value.toLowerCase())
    );
    setSearchResults(filteredResults);
  };

  const booksToDisplay = searchValue.trim() === '' ? books : searchResults;
  const indexOfLastBook = currentPage * 10;
  const indexOfFirstBook = indexOfLastBook - 10;
  const currentBooks = booksToDisplay.slice(indexOfFirstBook, indexOfLastBook);

  const nextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const prevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <div className="max-w-6xl mx-auto mb-8 flex items-center">
        <input
          type="text"
          className="border border-gray-300 p-2 rounded-l-lg w-full"
          placeholder="Search books by title..."
          value={searchValue}
          onChange={handleSearchChange}
        />
        <Link to="/Bookshelf" className="bg-green-500 hover:bg-green-700 rounded-lg text-white font-bold ml-4 py-1 px-4">
          My Bookshelf
        </Link>
      </div>
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {currentBooks.map((book, index) => (
          <div key={book.id || index} className="relative">
            <BookCard book={book} colorClass={colors[index % colors.length]} />
            <button
              className="absolute bottom-0 left-0 ml-4 w-full py-1 rounded-b-lg text-sm font-semibold bg-green-500 text-white"
              onClick={() => handleAddToBookshelf(book)}
            >
              Add to my bookshelf
            </button>
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-4">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-l"
          onClick={prevPage}
          disabled={currentPage === 1}
        >
          Prev
        </button>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-r"
          onClick={nextPage}
          disabled={currentBooks.length < 10}
        >
          Next
        </button>
      </div>
      <div className="text-center mt-2">
        Page {currentPage} of {Math.ceil(booksToDisplay.length / 10)}
      </div>
      <ToastContainer />
    </div>
  );
};

export default Home;

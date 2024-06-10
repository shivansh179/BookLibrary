import React, { useEffect, useState } from 'react';
import BookCard from '../BookCard';
import { ToastContainer } from 'react-toast';

const Bookshelf = () => {
  const [bookshelf, setBookshelf] = useState([]);

  useEffect(() => {
    // Fetch bookshelf data from localStorage
    const storedBookshelf = JSON.parse(localStorage.getItem('bookshelf'));
    if (storedBookshelf) {
      setBookshelf(storedBookshelf);
    }
  }, []);

  const handleDeleteBookshelf = () => {
      // Clear bookshelf data from localStorage
      localStorage.removeItem('bookshelf');
      // Clear bookshelf state
      setBookshelf([]);
      };
      
     
  if (!bookshelf || bookshelf.length === 0) {
    return (
      <div className="p-8 bg-gray-100 min-h-screen">
        <h1 className="text-2xl font-bold mb-4">My Bookshelf</h1>
        <p>No books in the bookshelf</p>
      </div>
    );
  }

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
        
        
      <h1 className="text-2xl font-bold mb-4">My Bookshelf</h1>
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {bookshelf.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>
      <div className="flex justify-center mt-4">
        <button
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleDeleteBookshelf}
        >
          Delete Bookshelf
       
        </button>
      </div>
      <ToastContainer/>
       
    </div>
  );
};

export default Bookshelf;

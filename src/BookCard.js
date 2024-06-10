import React from 'react';

const BookCard = ({ book, colorClass }) => {
  return (
    <div className={`shadow-md rounded-lg p-4 m-4 w-full ${colorClass}`}>
      <h2 className="text-xl font-bold mb-2">{book.title || 'No Title Available'}</h2>
      <p className="text-gray-700">Editions: {book.edition_count}</p>
    </div>
  );
};

export default BookCard;

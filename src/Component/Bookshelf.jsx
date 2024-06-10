import React from 'react';
import { useBookshelf } from '../BookshelfContext';
import BookCard from '../BookCard';

const Bookshelf = () => {
  const { bookshelf } = useBookshelf();

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">My Bookshelf</h1>
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {bookshelf.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>
    </div>
  );
};

export default Bookshelf;

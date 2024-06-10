// BookshelfContext.js
import React, { createContext, useContext, useState } from 'react';

const BookshelfContext = createContext();

export const useBookshelf = () => useContext(BookshelfContext);

export const BookshelfProvider = ({ children }) => {
  const [bookshelf, setBookshelf] = useState([]);

  const addToBookshelf = (book) => {
    setBookshelf([...bookshelf, book]);
  };

  return (
    <BookshelfContext.Provider value={{ bookshelf, addToBookshelf }}>
      {children}
    </BookshelfContext.Provider>
  );
};

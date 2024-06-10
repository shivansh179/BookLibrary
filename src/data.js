// src/data.js
export const fetchData = async () => {
  const response = await fetch('https://openlibrary.org/search.json?q=the+lord+of+the+rings');
  const data = await response.json();
  return data.docs;
};

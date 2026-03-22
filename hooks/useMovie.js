import { useState, useEffect } from 'react';

const API_KEY = process.env.EXPO_PUBLIC_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY}`,
  },
};

export const useMovie = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchMovies(1, searchQuery);
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery]);

  useEffect(() => {
    if (page > 1) {
      fetchMovies(page, searchQuery);
    }
  }, [page]);

  const fetchMovies = async (currentPage, query) => {
    try {
      if (currentPage === 1) setLoading(true);
      else setLoadingMore(true);
      setError(null);

      const endpoint = query 
        ? `${BASE_URL}/search/movie?query=${encodeURIComponent(query)}&page=${currentPage}` : `${BASE_URL}/discover/movie?page=${currentPage}`;

      const response = await fetch(endpoint, options);
      
      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.status_message || 'Falha ao buscar filmes');
        }

      const json = await response.json();

      setData((prevData) => 
        currentPage === 1 ? json.results : [...prevData, ...json.results]
      );
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  const loadMore = () => {
    if (!loading && !loadingMore) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  const handleSearch = (text) => {
    setSearchQuery(text);
    setPage(1); 
  };

  return { data, loading, loadingMore, error, searchQuery, handleSearch, loadMore };
};
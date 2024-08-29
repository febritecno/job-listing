import React, { useState, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux';
import API from '../../axios.js';

const useJobs = (token, searchParams, currentPage) => {
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const fetchJobs = useCallback(async (page) => {
    setIsLoading(true);
    const response = await API.get(`api/recruitment/positions?page=${page}&${searchParams}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.data.length < 8) {
      setHasMore(false);
    }
    setJobs(prevJobs => [...prevJobs, ...response.data]);
    setIsLoading(false);
  }, [token, searchParams]);

  useEffect(() => {
    fetchJobs(currentPage);
  }, [currentPage, token, searchParams, fetchJobs]);

  return { jobs, isLoading, hasMore };
};

const Home = () => {
  const token = useSelector(state => state.auth.token);
  const params = new URLSearchParams(window.location.search);
  const [searchQuery, setSearchQuery] = useState(params.get('description') || '');
  const [searchLocation, setSearchLocation] = useState(params.get('location') || '');
  const [searchFullTime, setSearchFullTime] = useState(params.get('full_time') === 'true' || false);
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = () => {
    setCurrentPage(prevPage => prevPage + 1);
  };

  const handleSearchQueryChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchLocationChange = (event) => {
    setSearchLocation(event.target.value);
  };

  const handleSearchFullTimeChange = (event) => {
    setSearchFullTime(event.target.checked);
  };

  const handleSearch = () => {
    const params = [
      searchQuery && `description=${searchQuery}`,
      searchLocation && `location=${searchLocation}`,
      searchFullTime && `full_time=true`,
    ]
      .filter(Boolean)
      .join('&');
    window.location.search = `?${params}`;
  };

  const { jobs, isLoading, hasMore } = useJobs(token, new URLSearchParams(window.location.search).toString(), currentPage);

  const handleKeyDown = useCallback(
    event => {
      if (event.key === 'Enter') {
        handleSearch();
      }
    },
    [handleSearch]
  );

  return (
    <div className="min-h-screen py-10 bg-gray-100">
      <div className="max-w-4xl p-6 mx-auto bg-white rounded-md shadow-md">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchQueryChange}
            onKeyDown={handleKeyDown}
            placeholder="Filter by title or description"
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            value={searchLocation}
            onChange={handleSearchLocationChange}
            onKeyDown={handleKeyDown}
            placeholder="Filter by city, state, zip code or country"
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div className="flex items-center col-span-1 md:col-span-2">
            <input
              type="checkbox"
              id="full-time"
              checked={searchFullTime}
              onChange={handleSearchFullTimeChange}
              className="mr-2"
            />
            <label htmlFor="full-time" className="mr-auto">
              Full Time Only
            </label>
            <button onClick={handleSearch} className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600">
              Search
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-4xl p-6 mx-auto mt-6 bg-white rounded-md shadow-md">
        <h2 className="mb-4 text-xl font-semibold">Job List</h2>
        <div className="space-y-4">
          {jobs.map((job, index) => (
            <div key={index} className="flex items-center justify-between pb-4 border-b">
              <div>
                <Link to={`/job/${job.id}`} className="font-semibold text-blue-600 hover:underline">
                  {job.title}
                </Link>
                <p className="text-gray-600">
                  {job.company} – <span className="text-green-600">{job.type}</span>
                </p>
              </div>
              <p className="text-gray-500">
                {job.location} <span className="block text-sm">{job.posted}</span>
              </p>
            </div>
          ))}
          {isLoading && <div className="flex justify-center w-full py-4">Loading...</div>}
          {hasMore && !isLoading && (
            <div className="flex justify-center w-full py-4">
              <button onClick={handlePageChange} className="px-6 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600">
                Load More
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Home


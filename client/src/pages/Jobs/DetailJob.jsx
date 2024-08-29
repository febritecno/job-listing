import React, { useState, useEffect } from 'react';
import API from '../../axios.js';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const DetailJob = () => {
  const token = useSelector(state => state.auth.token);
  const [job, setJob] = useState(null);

  useEffect(() => {
    const fetchJob = async () => {
      const id = window.location.pathname.split('/').pop();
      const response = await API.get(`api/recruitment/position/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setJob(response.data);
    };

    fetchJob();
  }, [token]);


  const purifyHtml = (dirtyHtml) => {
    const element = document.createElement('div');
    element.innerHTML = dirtyHtml;
    element.querySelectorAll('*').forEach((node) => {
      node.removeAttribute('style');
    });
    element.querySelectorAll('img').forEach((node) => {
      node.setAttribute('style', 'max-width: 100%');
    });
    const links = element.querySelectorAll('a');
    links.forEach((link) => {
      link.setAttribute('style', 'color: blue');
    });
    const cleanHtml = element.innerHTML.replace(/\n/g, '<br>');
    return cleanHtml;
  };

  if (!job) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <div className="max-w-4xl mx-auto overflow-hidden bg-white rounded-lg shadow-md">
        <div className="p-6">
          <Link to="/" className="text-sm text-blue-500 hover:text-blue-700">&larr; Back</Link>
          <div className="mt-4">
            <p className="text-sm text-gray-600">{job.type} / {job.location}</p>
            <h1 className="mt-2 text-3xl font-bold text-gray-900">{job.title}</h1>
            <hr className="border-gray-300 mt-7 " />
          </div>
        </div>

        <div className="p-6">
          <div className="text-gray-700 list-disc list-inside">
            <p dangerouslySetInnerHTML={{ __html: purifyHtml(job.description) }} />
          </div>
        </div>

        <div className="flex items-start justify-between p-6 bg-gray-100">
          <div className="w-2/3 text-sm">
            <h3 className="mb-2 font-semibold text-gray-900">How to apply</h3>
            <p dangerouslySetInnerHTML={{ __html: purifyHtml(job.how_to_apply) }} />
            <div className="relative py-4">
              <p className="absolute bottom-0 left-0 px-2 py-1 text-xs text-gray-800 bg-white">{job.company}</p>
            </div>
          </div>
          <div className="relative">
            <img
              src={job.company_logo || 'https://via.placeholder.com/150'}
              className="object-cover w-24 h-24"
              onError={(e) => (e.target.src = 'https://via.placeholder.com/150')}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailJob;


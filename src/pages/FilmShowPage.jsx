import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { mockFetch } from '../utils/api';
import ReactPlayer from 'react-player/youtube';

export const FilmShowPage = () => {
  const { id } = useParams();
  const [filmDetails, setFilmDetails] = useState(null);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchFilmDetails = async () => {
      try {
        const details = await mockFetch(`/films/${id}`); // Загрузка данных о фильме
        setFilmDetails(details);
      } catch (err) {
        setError("Couldn't fetch film details");
      }
    };

    fetchFilmDetails();
  }, [id]);

  if (error) return <p>{error}</p>;
  if (!filmDetails) return <p>Loading...</p>;

  return (
    <div className="film-show_page">
      <h1 class="film-name">{filmDetails.title}</h1>
      <p class="film-description">{filmDetails.description}</p>

      <p class='trailer'>OFFICIAL TRAILER</p>
      <ReactPlayer 
      light
        url={filmDetails.video}
        width="50%"
        playing
      /> {/* Встраивание видео */}

      <a class="google-link" href={`https://www.google.com/search?q=${encodeURIComponent(filmDetails.title)}`} target="_blank" rel="noopener noreferrer">Search on Google</a> {/* Ссылка для поиска в Google */}
    </div>
  );
};
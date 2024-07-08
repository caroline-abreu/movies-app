"use cliente";

import { Movie } from "@/types/Movie";
import axios from "axios";
import { useEffect, useState } from "react";
import { MovieCard } from "./MovieCard";
import { Box, CircularProgress, Stack, Typography } from "@mui/material";
import { CustomPagination } from "./Pagination";
import { SearchBar } from "./SearchBar";

export function MovieList() {
  const [movies, setMovies] = useState<Movie[]>();
  const [filteredMovies, setFilteredMovies] = useState<Movie[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalMovies, setTotalMovies] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const moviesPerPage = 4;

  useEffect(() => {
    async function handleData() {
      try {
        setLoading(true);
        const { data } = await axios.get<Movie[]>(
          process.env.NEXT_PUBLIC_API_URL as string
        );

        setMovies(data);
        setFilteredMovies(data);
        setTotalMovies(data.length);

        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    }

    handleData();
  }, []);

  const handleSearch = (searchTerm: string) => {
    const filtered = movies?.filter((movie) =>
      movie.Title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (filtered) {
      setFilteredMovies(filtered);
      setTotalMovies(filtered.length);
    }
  };

  const indexOfLastMovie = currentPage * moviesPerPage;
  const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
  const currentMovies = filteredMovies?.slice(
    indexOfFirstMovie,
    indexOfLastMovie
  );

  return (
    <>
      {loading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        movies && (
          <Stack spacing={6}>
            <SearchBar onSearch={handleSearch} />
            {currentMovies.length ? (
              <Stack
                direction={{ sm: "column", md: "row", lg: "row" }}
                useFlexGap
                gap={8}
                alignItems={"center"}
                flexWrap={"wrap"}
              >
                {currentMovies.map((movie) => (
                  <MovieCard key={movie.imdbID} movie={movie} />
                ))}
              </Stack>
            ) : (
              <Typography variant="h2">No Movie Found!</Typography>
            )}
            <CustomPagination
              currentPage={currentPage}
              moviesPerPage={moviesPerPage}
              setCurrentPage={setCurrentPage}
              totalMovies={totalMovies}
            />
          </Stack>
        )
      )}
    </>
  );
}

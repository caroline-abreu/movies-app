"use client";

import { Movie } from "@/types/Movie";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Container,
  Typography,
  Grid,
  CircularProgress,
  Stack,
  CardActions,
  Button,
  Rating,
} from "@mui/material";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export interface RatedMovie {
  movie: Movie;
  rating: number;
}

export default function Reviews() {
  const router = useRouter();
  const [ratedMovies, setRatedMovies] = useState<RatedMovie[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchRatedMovies = async () => {
      setLoading(true);
      const allMoviesResponse = await axios.get<Movie[]>(
        process.env.NEXT_PUBLIC_API_URL as string
      );
      const allMovies = allMoviesResponse.data;

      const ratedMovies: RatedMovie[] = [];
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith("rating-")) {
          const movieId = key.split("rating-")[1];
          const movie = allMovies.find((m) => m.imdbID === movieId);
          const rating = localStorage.getItem(key);
          if (movie && rating) {
            ratedMovies.push({ movie, rating: Number(rating) });
          }
        }
      }
      setRatedMovies(ratedMovies);
      setLoading(false);
    };
    fetchRatedMovies();
  }, []);

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
      ) : ratedMovies.length ? (
        <Stack
          direction={{ sm: "column", md: "row", lg: "row" }}
          useFlexGap
          gap={8}
          alignItems={"center"}
          flexWrap={"wrap"}
        >
          {ratedMovies.map((movie) => (
            <Card key={movie.movie.imdbID} sx={{ minWidth: "340px" }}>
              <CardMedia
                sx={{ height: 340, objectFit: "scale-down" }}
                image={movie.movie.Poster}
                title={movie.movie.Title}
                component={"img"}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {movie.movie.Title}
                </Typography>
                <Rating
                  name="user-rating"
                  value={movie.rating}
                  size="large"
                  readOnly
                />
              </CardContent>
              <CardActions>
                <Button
                  size="small"
                  onClick={() => router.push(`/movies/${movie.movie.imdbID}`)}
                >
                  Ver Mais
                </Button>
              </CardActions>
            </Card>
          ))}
        </Stack>
      ) : (
        <Typography variant="h4">No Reviews Found!</Typography>
      )}
    </>
  );
}

"use client";

import { Movie } from "@/types/Movie";
import {
  Box,
  Button,
  Rating,
  Stack,
  SvgIcon,
  Tooltip,
  Typography,
  Paper,
  Divider,
  CircularProgress,
} from "@mui/material";
import axios from "axios";
import { format, parse } from "date-fns";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import StarIcon from "@mui/icons-material/Star";
import {
  FaFilm,
  FaGlobe,
  FaMoneyBillWave,
  FaPenNib,
  FaTrophy,
  FaUsers,
  FaUserTie,
} from "react-icons/fa";

export default function MovieDetail() {
  const params = useParams<{ id: string }>();
  const id = params.id;
  const [movie, setMovie] = useState<Movie>();
  const [loading, setLoading] = useState<boolean>(false);
  const [rating, setRating] = useState<number>(0);

  useEffect(() => {
    const savedRating = localStorage.getItem(`rating-${id}`);
    if (savedRating) {
      setRating(Number(savedRating));
    }
  }, [id]);

  useEffect(() => {
    const fetchMovie = async () => {
      setLoading(true);

      const response = await axios.get<Movie[]>(
        process.env.NEXT_PUBLIC_API_URL as string
      );
      const selectedMovie = response.data.find((movie) => movie.imdbID === id);
      setMovie(selectedMovie);

      setLoading(false);
    };
    fetchMovie();
  }, [id]);

  function formatDate(dateString: string) {
    const parsedDate = parse(dateString, "dd MMM yyyy", new Date());
    return format(parsedDate, "dd/MM/yyyy");
  }

  const ratingChanged = (newRating: number) => {
    setRating(newRating);

    localStorage.setItem(`rating-${id}`, String(newRating));
  };

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
        movie && (
          <>
            <Stack direction={"row"} p={4} spacing={4}>
              <Image
                src={movie.Poster}
                width={300}
                height={445}
                alt={movie.Title}
              />
              <Stack direction={"column"} spacing={2} flex={1}>
                <Typography variant="h3" component={"div"}>
                  {movie.Title}
                </Typography>
                <Stack spacing={2} direction={"row"} alignItems={"center"}>
                  <Typography variant="h6">
                    {formatDate(movie.Released)}
                  </Typography>
                  <Typography variant="h5" fontSize={"1.25rem"}>
                    {movie.Runtime}
                  </Typography>
                  <Box px={0.85} sx={{ border: "2px solid #9e9e9e" }}>
                    <Typography
                      textAlign={"center"}
                      fontWeight={"bold"}
                      variant="body2"
                      color={"#9e9e9e"}
                      lineHeight={1.2}
                    >
                      {movie.Rated}
                    </Typography>
                  </Box>
                </Stack>
                <Rating
                  name="user-rating"
                  value={rating}
                  size="large"
                  onChange={(event, newValue) =>
                    ratingChanged(newValue as number)
                  }
                />
                <Stack direction={"row"} spacing={2}>
                  <Tooltip title="IMDb">
                    <Button
                      variant="contained"
                      sx={{
                        cursor: "default",
                        backgroundColor: "#ffeb3b",
                        ":hover": { backgroundColor: "#ffeb3b" },
                      }}
                      startIcon={
                        <SvgIcon fontSize="large">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 448 512"
                          >
                            <path d="M400 32H48C21.5 32 0 53.5 0 80v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V80c0-26.5-21.5-48-48-48zM21.3 229.2H21c.1-.1 .2-.3 .3-.4zM97 319.8H64V192h33zm113.2 0h-28.7v-86.4l-11.6 86.4h-20.6l-12.2-84.5v84.5h-29V192h42.8c3.3 19.8 6 39.9 8.7 59.9l7.6-59.9h43zm11.4 0V192h24.6c17.6 0 44.7-1.6 49 20.9 1.7 7.6 1.4 16.3 1.4 24.4 0 88.5 11.1 82.6-75 82.5zm160.9-29.2c0 15.7-2.4 30.9-22.2 30.9-9 0-15.2-3-20.9-9.8l-1.9 8.1h-29.8V192h31.7v41.7c6-6.5 12-9.2 20.9-9.2 21.4 0 22.2 12.8 22.2 30.1zM265 229.9c0-9.7 1.6-16-10.3-16v83.7c12.2 .3 10.3-8.7 10.3-18.4zm85.5 26.1c0-5.4 1.1-12.7-6.2-12.7-6 0-4.9 8.9-4.9 12.7 0 .6-1.1 39.6 1.1 44.7 .8 1.6 2.2 2.4 3.8 2.4 7.8 0 6.2-9 6.2-14.4z" />
                          </svg>
                        </SvgIcon>
                      }
                    >
                      <Typography
                        variant="body1"
                        fontWeight={700}
                        marginRight={1}
                      >
                        {movie.imdbRating}
                      </Typography>
                      <Typography variant="body2">
                        ({movie.imdbVotes} votos)
                      </Typography>
                    </Button>
                  </Tooltip>
                  <Tooltip title="Metascore">
                    <Button
                      variant="contained"
                      sx={{
                        backgroundColor: "#8bc34a",
                        cursor: "default",
                        ":hover": { backgroundColor: "#8bc34a" },
                      }}
                      startIcon={<StarIcon />}
                    >
                      <Typography
                        variant="body1"
                        fontWeight={700}
                        marginRight={1}
                      >
                        {movie.Metascore}
                      </Typography>
                    </Button>
                  </Tooltip>
                </Stack>
                <Divider />
                <Typography variant="body1" mt={2} fontSize="1.2rem">
                  {movie.Plot}
                </Typography>
                <Divider />
                <Paper elevation={3} sx={{ p: 2 }}>
                  <Stack spacing={2}>
                    <Box display="flex" alignItems="center">
                      <FaFilm style={{ marginRight: "8px" }} />
                      <Typography variant="body2">
                        <strong>Genre:</strong> {movie.Genre}
                      </Typography>
                    </Box>
                    <Box display="flex" alignItems="center">
                      <FaUserTie style={{ marginRight: "8px" }} />
                      <Typography variant="body2">
                        <strong>Director</strong> {movie.Director}
                      </Typography>
                    </Box>
                    <Box display="flex" alignItems="center">
                      <FaPenNib style={{ marginRight: "8px" }} />
                      <Typography variant="body2">
                        <strong>Writer(s): </strong> {movie.Writer}
                      </Typography>
                    </Box>
                    <Box display="flex" alignItems="center">
                      <FaUsers style={{ marginRight: "8px" }} />
                      <Typography variant="body2">
                        <strong>Actors:</strong> {movie.Actors}
                      </Typography>
                    </Box>
                    <Box display="flex" alignItems="center">
                      <FaGlobe style={{ marginRight: "8px" }} />
                      <Typography variant="body2">
                        <strong>Language:</strong> {movie.Language}
                      </Typography>
                    </Box>
                    <Box display="flex" alignItems="center">
                      <FaTrophy style={{ marginRight: "8px" }} />
                      <Typography variant="body2">
                        <strong>Awards:</strong> {movie.Awards}
                      </Typography>
                    </Box>
                    <Box display="flex" alignItems="center">
                      <FaMoneyBillWave style={{ marginRight: "8px" }} />
                      <Typography variant="body2">
                        <strong>Box Office:</strong> {movie.BoxOffice}
                      </Typography>
                    </Box>
                  </Stack>
                </Paper>
              </Stack>
            </Stack>
          </>
        )
      )}
    </>
  );
}

"use client";

import { MovieList } from "@/components/MovieList";
import { Box } from "@mui/material";

export default function Home() {
  return (
    <Box sx={{ flexGrow: 1, bgcolor: "background.default", px: 4, py: 2 }}>
      <MovieList />
    </Box>
  );
}

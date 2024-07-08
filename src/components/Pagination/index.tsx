import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { ChangeEvent } from "react";

interface PaginationProps {
  totalMovies: number;
  moviesPerPage: number;
  currentPage: number;
  setCurrentPage: (page: number) => void;
}

export function CustomPagination({
  totalMovies,
  moviesPerPage,
  currentPage,
  setCurrentPage,
}: PaginationProps) {
  const pageCount = Math.ceil(totalMovies / moviesPerPage);

  const handleChange = (event: ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
  };

  return (
    <Stack spacing={2} alignItems="center">
      <Pagination
        size="large"
        showFirstButton
        showLastButton
        count={pageCount}
        page={currentPage}
        onChange={handleChange}
        color="primary"
        variant="outlined"
      />
    </Stack>
  );
}

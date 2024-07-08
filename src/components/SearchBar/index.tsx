import { ChangeEvent, useState } from "react";
import { IconButton, InputBase, Paper } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { Close } from "@mui/icons-material";

interface SearchBarProps {
  onSearch: (searchTerm: string) => void;
}

export function SearchBar({ onSearch }: SearchBarProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    onSearch(event.target.value);
  };

  const handleClearSearch = () => {
    setSearchTerm("");
    onSearch("");
  };

  return (
    <Paper
      component="form"
      sx={{
        p: "2px 4px",
        display: "flex",
        alignItems: "center",
        width: 400,
        borderRadius: "2rem",
      }}
    >
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Search Movies..."
        inputProps={{ "aria-label": "search google maps" }}
        value={searchTerm}
        onChange={handleSearchChange}
      />
      <IconButton
        disabled={searchTerm !== "" ? false : true}
        onClick={() => searchTerm !== "" && handleClearSearch()}
        sx={{ p: "1rem" }}
        aria-label="search"
      >
        {searchTerm === "" ? <SearchIcon /> : <Close />}
      </IconButton>
    </Paper>
  );
}

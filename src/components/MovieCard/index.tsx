import { Movie } from "@/types/Movie";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { useRouter } from "next/navigation";

interface MovieCardProps {
  movie: Movie;
}

export function MovieCard({ movie }: MovieCardProps) {
  const router = useRouter();

  return (
    <Card sx={{ minWidth: "340px" }}>
      <CardMedia
        sx={{ height: 340, objectFit: "scale-down" }}
        image={movie.Poster}
        title={movie.Title}
        component={"img"}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {movie.Title}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          size="small"
          onClick={() => router.push(`/movies/${movie.imdbID}`)}
        >
          Ver Mais
        </Button>
      </CardActions>
    </Card>
  );
}

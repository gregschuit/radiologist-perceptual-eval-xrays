import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

import { useNavigate } from "react-router-dom";

interface Props {
    taskLink: string;
    imageLink: string;
    title: string;
    description: string;
};

const TaskCard: React.FC<Props> = ({ taskLink, imageLink, title, description }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(taskLink);
  };
  return (
    <Card sx={{ maxWidth: 345 }} onClick={ handleClick } >
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={ imageLink }
          alt="task 1 demo"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            { title }
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ textDecoration: "none" }}>
            { description }
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default TaskCard;

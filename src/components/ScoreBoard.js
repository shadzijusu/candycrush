import classes from './ScoreBoard.module.css'
import Card from './ui/Card';
const ScoreBoard = ({ score }) => {
  return (
    <Card>
      <h1 >Score: {score}</h1>
    </Card>
  );
};
export default ScoreBoard;

const ScoreBoard = ({score}) => {
    return(
        <div className="score-board" 
        style={{float: 'right',
            color: '#f2f2f2',
            marginRight: '15px'
           }}>
            <h1>Score: {score}</h1>
          
        </div>
    )
}
export default ScoreBoard
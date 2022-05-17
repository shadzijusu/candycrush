import React from 'react';
import candycrush from '../images/candycrush.png'
import classes from './HomeComponent.module.css'
const HomeComponent = () => {
    return(
     <div>
         <h1 className={classes.h1}>Start playing Candy Crush - a legendary puzzle game loved my millions of players around the world.</h1>
        <h3 className={classes.h3}>Switch and match Candies in this tasty puzzle adventure!</h3>
        <img className={classes.img} src={candycrush} alt=""></img>
     </div>
    )
}
export default HomeComponent
import React from 'react';



const Rank = ({ name , counter }) =>{
    
    return(
        <div className="tc">
           <p className="f3 white">{`${name}, Your entries count is # ${counter}`} </p>
        </div>
    );
}
export default Rank;
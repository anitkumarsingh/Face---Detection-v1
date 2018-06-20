import React from 'react';
import './UserLinkInput.css';

const UserLink = (props) =>{
    return(
        <div className="tc">
            <p className="f3">{'The magic brain can detect you faces in picture. Give it a try'}</p>
                <div className="center">
                 <div className="pa4 br3 shadow-5 center form">
                        <input className=" f4 pa2 w-70 center  " type="text" onChange={props.changeHadler} />
                        <button className="w-30  grow f4 link ph3 pv2 dib white bg-light-purple button" onClick={props.submitHandeler}>Detect</button>
                    </div>
                </div>
        </div>
    );
}
export default UserLink;
import React from 'react';
import Navigation from '../Navigation/Navigation';
import Logo from '../Navigation/Logo/Logo';
import UserInfo from '../Navigation/UserLinkInput/UserLink';
import Rank from '../Navigation/Rank/Rank';
import Particles from 'react-particles-js';
import FaceDetection from '../Navigation/FaceRecongination/FaceDetection';
import SignIn from '..//Navigation/SignIn/SignIn';
// import SignIn from '../Navigation/Material UI/Login';
import Register from '../Navigation/Register/Register';
import Footer from '../Navigation/Footer/Footer';
import './App.css';


const initialState = {
    input: ' ',
    imageURL: ' ',
    box: { },
    route: SignIn,
    isSignedIn: false,
    userProfile: [
        {
          id:' ',
          name:' ',
          email:'  ',
          password: ' ',
          entries: 0,
          join: ' '
        }
    ]
}


class App extends React.Component {
    constructor(){
        super();
        this.state = initialState
    }
    loadUser = (data) =>{
        this.setState({userProfile :{ 
                id:data.id,
                name:data.name,
                email:data.email,
                entries: data.entries,
                join: data.joined
            } 
        })
    }
    

    faceCalculation = (data) =>{
        const clarifiaFace = (data.outputs[0].data.regions[0].region_info.bounding_box);
        const image = document.getElementById('imageTag');
        const width = Number(image.width);
        const height = Number(image.height);
        return {
            leftCol: clarifiaFace.left_col * width,
            topRow: clarifiaFace.top_row * height,
            rightCol: width - (clarifiaFace.right_col * width),
            bottomRow: height - (clarifiaFace.bottom_row * height)
        }
    }
    routeChangeHandler = (route) =>{
        if(route === 'SignOut'){
            this.setState(initialState)
        }
        else if(route === 'home'){
            this.setState({isSignedIn:true})
        }
        this.setState({route:route});
    }

    displayFaceBox = (box) =>{
     this.setState({box:box});
    }

    inputHandler = (event) =>{
       this.setState({input : event.target.value });
    }
    buttonChangeHandler = () =>{
    this.setState({imageURL: this.state.input});
      fetch('http://localhost:5000/imageURL', {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          input: this.state.input
        })
      })
      .then(response => response.json())
      .then(response => {
        if (response) {
          fetch('http://localhost:5000/image', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              id: this.state.userProfile.id
            })
          })
            .then(response => response.json())
            .then(count => {
              this.setState(Object.assign(this.state.userProfile, { entries: count}))
            })
            .catch(console.log)

        }
        this.displayFaceBox(this.faceCalculation(response))
      })
      .catch(err => console.log(err));
    }

    render(){
        return(
            <div>
                <Particles className="Particle"
                  params={{
                        particles: {
                            number:{
                                value:30,
                                density:{
                                    enable:true,
                                    value_area:150
                                }
                            }
                        }
                    }}
                />
               
               <Navigation isSignedIn ={this.state.isSignedIn} routeChange={this.routeChangeHandler}/>
               { this.state.route === 'home' ?
                <div>
                    <Logo/>
                    <Rank name={this.state.userProfile.name} counter={this.state.userProfile.entries}/>
                    <UserInfo changeHadler={this.inputHandler} submitHandeler={this.buttonChangeHandler}/>
                    <FaceDetection imageAddress={this.state.imageURL} box={this.state.box}/> 
                </div> : (
                    this.state.route === 'SignIn' ?  
                    <SignIn loadUser ={this.loadUser} routeChange={this.routeChangeHandler}/>:
                    <Register loadUser ={this.loadUser} routeChange={this.routeChangeHandler}/>
                    )
                    
                 }
                 { this.state.route !=='home' ? <Footer/>:null }
                 
            </div>
             );
    }  
}
export default App;

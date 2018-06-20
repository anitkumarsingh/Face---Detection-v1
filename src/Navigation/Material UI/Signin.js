import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';



const styles = theme => ({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    textField: {
      marginLeft: theme.spacing.unit,
      marginRight: theme.spacing.unit,
      width: 250,
    },
    menu: {
      width: 200,
    },
    button: {
      margin: theme.spacing.unit,
    },
    leftIcon: {
      marginRight: theme.spacing.unit,
    },
    rightIcon: {
      marginLeft: theme.spacing.unit,
    },
    iconSmall: {
      fontSize: 20,
    }
  });


class Signin extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            SignInEmail:' ',
            SignInPassword: ' '
        }
    }
    onSignInEmailChange = (event) =>{
     this.setState({SignInEmail:event.target.value})
    }

    onSignInPasswordChange = (event) =>{
        this.setState({SignInPassword:event.target.value})
       }
    onSubmitChange = () =>{
        fetch('http://localhost:5000/signin',{
            method: 'post',
            headers: {'Content-Type' : 'application/json'},
            body:JSON.stringify({
              email:this.state.SignInEmail,
              password:this.state.SignInPassword
            })

        })
        .then(response =>response.json())
        .then(user =>{
          if(user.id){
            this.props.loadUser(user);
            this.props.routeChange('home');
          } 
          else{
              document.getElementById('error_message').innerHTML = 'Wrong email or password. Please try it once again';
              document.getElementById('error_message').style.color = 'red';
          }
        })  
       
    }

    render(){
        const { routeChange } = this.props;
        const { classes } = this.props;
        return(
            <article className="br2 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l shadow-5 center">
                <main className="pa4 black-80 center">
                <div className={classes.container} noValidate autoComplete="off">
                    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                        <legend className="f2 fw6 ph0 mh0">Sign In</legend>
                        <TextField
                            id="name"
                            label="Email"
                            type="email"
                            className={classes.textField}
                            onChange={this.onSignInEmailChange}
                            margin="normal"
                          />
                            {/* <div className="mt3">
                                <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                                <input onChange = {this.onSignInEmailChange} className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address"  id="email-address"/>
                            </div> */}
                            <TextField
                                  id="password-input"
                                  label="Password"
                                  className={classes.textField}
                                  type="password"
                                  autoComplete="current-password"
                                  margin="normal"
                                  onChange = {this.onSignInPasswordChange}
                              />
{/*           
                                <div className="mv3">
                                    <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                                    <input onChange = {this.onSignInPasswordChange} className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password"  id="password"/>
                                </div> */}
                    </fieldset>
                                <Button variant="contained" 
                                  color="primary" className={classes.button} 
                                  type="submit" onClick={ this.onSubmitChange } >
                                    Sign In
                                  <Icon className={classes.rightIcon}>send</Icon>
                              </Button>
                                {/* <div className="">
                                    <input onClick={ this.onSubmitChange }
                                     className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                                     type="submit" 
                                     value="Sign in"/>
                                </div> */}
                                <div id="error_message"></div>
                                <div className="lh-copy mt3">
                                    <p onClick={() =>routeChange('Register')}  className="f6 link dim black db pointer">Register</p>
                                </div>
                               
                </div>
                </main>
                </article>
        );
       
    }       
}

TextField.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(Signin);

// class TextFields extends React.Component {
//     state = {
//       name: 'Cat in the Hat',
//       age: '',
//       multiline: 'Controlled',
//       currency: 'EUR',
//     };
  
//     handleChange = name => event => {
//       this.setState({
//         [name]: event.target.value,
//       });
//     };
  
//     render() {
//       const { classes } = this.props;
  
//       return (
//         <form className={classes.container} noValidate autoComplete="off">
//           <TextField
//             id="name"
//             label="Name"
//             className={classes.textField}
//             value={this.state.name}
//             onChange={this.handleChange('name')}
//             margin="normal"
//           />
          
//           <TextField
//             required
//             id="required"
//             label="Required"
//             defaultValue="Hello World"
//             className={classes.textField}
//             margin="normal"
//           />
          
//           <TextField
//             id="password-input"
//             label="Password"
//             className={classes.textField}
//             type="password"
//             autoComplete="current-password"
//             margin="normal"
//           />
          
         
         
          
//         </form>
//       );
//     }
//   }
  
//   TextFields.propTypes = {
//     classes: PropTypes.object.isRequired,
//   };
  
//   export default withStyles(styles)(TextFields);
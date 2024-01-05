import { Box, Button, Card, CardContent, Divider, FormControl, Grid, IconButton, InputAdornment, InputLabel, OutlinedInput, Paper, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { AccountCircle, Visibility, VisibilityOff } from '@mui/icons-material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import * as Yup from 'yup';
import { NavLink, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import Swal from 'sweetalert2';
import GoogleIcon from '@mui/icons-material/Google';


const SignupSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),

  email: Yup.string().email('Invalid email').required('Email is Required'),
  password: Yup.string()
  .required('Password is required')
  .matches(
    /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).*$/,
    'Password must contain at least one uppercase letter, one lowercase letter, and one number'
  ),
confirm: Yup.string()
  .oneOf([Yup.ref('password'), null], 'Passwords must match')
  .required('Confirm Password is required'),
});

const Signup = () => {
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowConfirmPassword = () => setShowConfirmPassword((showConfirm) => !showConfirm);
  
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const navigate = useNavigate();

  const signupform = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      confirm: '',
    },

    onSubmit: async (values, { resetForm }) => {
      console.log(values);
      
      const res = await fetch(`${import.meta.env.VITE_API_URL}/user/add`, {
        method: 'POST',
        body: JSON.stringify(values),
        headers: {
          'content-Type': 'application/json'
        }
      })
      console.log(res.status);
      if (res.status === 200) {
        Swal.fire({
          icon: 'success',
          title: 'Registered Successfully',
          text: 'Login to continue'
        })
        navigate('/main/login');
        resetForm();
      }
      else {  
        Swal.fire({
          icon: 'error', // error defaullt h yaha
          title: 'Error',
          text: 'Something went wrong!!'
        })
      }
      //send values to backend
    },
    validationSchema: SignupSchema
  });

  return (
    <div >
            {/* <Typography variant='h4' sx={{textAlign: 'center', mt: 2}}>Sign Up for Unmatched Benefits</Typography> */}

            <Paper sx={{boxShadow:0, mt: 14}}>
              <Grid container>
                <Grid item md={5} sx={{mx: 'auto'}}>

                  <Card sx={{
                    height: 560,
                    boxShadow: 5,
                    borderRadius: 3,
                    p: 4
                  }}>
                    <CardContent>
                    <form onSubmit={signupform.handleSubmit}>
                    <TextField 
                      id="name" onChange={signupform.handleChange} 
                      value={signupform.values.name} 
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="start" >
                            <AccountCircle />
                          </InputAdornment>
                        )
                      }}
                     required type="name" label="Name" variant='outlined' color='success'  fullWidth sx={{mt:2}}  helperText={signupform.touched.name && signupform.errors.name} error={signupform.touched.name && signupform.errors.name}/>

                      <TextField 
                      id="email" onChange={signupform.handleChange} 
                      value={signupform.values.email} 
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="start" >
                            <AccountCircle />
                          </InputAdornment>
                        )
                      }}
                      required type="email" label="Email Address" variant='outlined' color='success'  fullWidth sx={{mt:2}} helperText={signupform.touched.email && signupform.errors.email} error={signupform.touched.email && signupform.errors.email}/>
                      {/* <TextField 
                      id="password" onChange={signupform.handleChange} 
                      value={signupform.values.password}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="start" >
                            <VisibilityIcon />
                          </InputAdornment>
                        )
                      }}
                      required type="password" label="Password" variant='outlined' color='success'  fullWidth sx={{mt:2}} helperText={signupform.touched.password && signupform.errors.password}/> */}

                  <FormControl
                  required
                    error={
                      signupform.touched.password && signupform.errors.password
                    }
                    helperText={
                      signupform.touched.password && signupform.errors.password
                    }
                    variant="outlined"
                    color="success"
                    fullWidth
                    sx={{ mt: 2 }}
                  >
                    <InputLabel htmlFor="password">
                      Password
                    </InputLabel>
                    <OutlinedInput
                      id="password"
                      onChange={signupform.handleChange}
                      value={signupform.values.password}
                      type={showPassword ? "text" : "password"}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            // edge="end"
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      }
                      label="Password"
                    />
                  </FormControl>
                  <FormControl
                  required
                    error={
                      signupform.touched.confirm && signupform.errors.confirm
                    }
                    helperText={
                      signupform.touched.confirm && signupform.errors.confirm
                    }
                    variant="outlined"
                    color="success"
                    fullWidth
                    sx={{ mt: 2 }}
                  >
                    <InputLabel htmlFor="confirm">
                      Confirm password
                    </InputLabel>
                    <OutlinedInput
                      id="confirm"
                      onChange={signupform.handleChange}
                      value={signupform.values.confirm}
                      type={showConfirmPassword ? "text" : "password"}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle Confirm password visibility"
                            onClick={handleClickShowConfirmPassword}
                            onMouseDown={handleMouseDownPassword}
                            // edge="end"
                          >
                            {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      }
                      label="Confirm Password"
                    />
                  </FormControl>

                      {/* <TextField 
                      id="confirm" onChange={signupform.handleChange} 
                      value={signupform.values.confirm} 
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="start" >
                            <VisibilityIcon />
                          </InputAdornment>
                        )
                      }}
                      required type="password" label="Confirm Password" variant='outlined' color='success'  fullWidth sx={{mt:2}} helperText={signupform.touched.confirm && signupform.errors.confirm} /> */}
                      
                  <Box sx={{ textAlign: 'center' }}>
                  <Button type="submit" variant="contained" disableElevation sx={{ mt: 3, borderRadius: 5}} fullWidth color="success">
                    Sign up
                  </Button>
                  <Divider sx={{ mt: 2}} orientation="horizontal" variant="fullWidth" >or </Divider> 
                  <Button type="submit" variant="outlined" disableElevation sx={{ mt: 2, mb:1,borderRadius: 5, textTransform: 'none'}} fullWidth color="success">
                  <InputAdornment position="start" >
                        <GoogleIcon />
                      </InputAdornment>
                    Sign up with Google
                  </Button>
                  <p variant='h6' >Already Have an account?
                    <NavLink
                    to="/main/login" style={{ textDecoration: 'none' }}>Sign in</NavLink></p>
                </Box>
                      </form>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </Paper>
          </div>
  )
}
export default Signup;
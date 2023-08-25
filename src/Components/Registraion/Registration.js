import React from 'react'
import styles from './Registration.module.css';
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import axios from "axios";


export function Signin() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  let navigate = useNavigate();

  const onSubmit = async (data,event) => {
    event.preventDefault();
     
    console.log(data);
    try {
      const response = await axios.post('http://localhost:1000/signin', {email:data.email,password:data.password });
      const datafromresp = response.data;
      // Handle the successful sign-in here, e.g., set the user in state or redirect to another page
      console.log('Sign-in successful:', datafromresp);
      // alert(response.data.message);
     
      navigate('/odernow/2')
    } catch (error) {
      // Handle the sign-in error here, e.g., show an error message to the user
      console.error('Sign-in failed:', error);
      alert('Sign-in failed:'+error.message)
    }
    
  };


  return <>  <div className={styles.signupcontainer}>
    <h2>Sign In</h2>
    <form onSubmit={handleSubmit(onSubmit)} className={styles.formcontainer} >
      <div className={styles.formgroup}>
        <label htmlFor='name'>Email</label><br />
        <input type="text" placeholder='email id'{...register("email", { required: true, pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/ })} />
      </div>
      {errors.email?.type === "required" && <p className={styles.error}>Email is required</p>}
      {errors.email?.type === "pattern" && <p className={styles.error}>Entered email is wrong format</p>}


      <div className={styles.formgroup}>
        <label htmlFor='password'>Password</label><br />
        <input type="password" placeholder='********' {...register("password", { required: true, })} />
      </div>
      {errors.password?.type === "required" && <p className={styles.error}>password is required</p>}


      <div className={styles.signupbtn} >
        <button type="submit" >Sign In</button>
      </div>
      <p onClick={() => { navigate('/signup') }} style={{ color: '#b30086', cursor: 'pointer' }}>don't have an account. Sign Up</p>
    </form>
    <div style={{paddingBottom:'10%'}}>

    </div>
  </div>
  </>
}






















{/* <div className={styles.maincontainer}>
<h2>Sign Up</h2>
<form onSubmit={handleSubmit(onSubmit)} className={styles.signupcontainer}>
  <div className={styles.formgroup}>
    <label htmlFor="Name">Username</label>
    <input type="text" placeholder='user name' className={styles.formcontrol} {...register("name", { required: true, pattern: /[A-Za-z]/ })} />
  </div>
        {errors.name?.type === "required" && <p>name is required</p>}
        {errors.pattern?.type === "required" && <p>Enter the valid name</p>}

  <div className={styles.formgroup}>
    <label htmlFor='name'>Email</label><br />
    <input type="text" placeholder='email@gamil.com' className={styles.formcontrol} {...register("email", { required: true, pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/ })} />
  </div>
        {errors.email?.type === "required" && "Email is required"}
        {errors.email?.type === "pattern" && "Entered email is wrong format"}
   

  <div className={styles.formgroup}>
    <label htmlFor='phonenumber'>Cell Number</label>
    <input type="number" placeholder='+923*****' className={styles.formcontrol} {...register("number", {
      required: "Number is required",
      pattern: {
        value: /^[0-9]+$/,
        message: "Entered number is in wrong format",
      },
      minLength: {
        value: 11,
        message: "Number must be exactly 11 digits",
      },
      maxLength: {
        value: 11,
        message: "Number must be exactly 11 digits",
      },
    })} />
  </div>
        {errors.number && errors.number.message}
    

  <div className={styles.formgroup}>
    <label htmlFor='password'>Password</label>
    <input type="password" placeholder='********' {...register("password", { required: true, })} />
  </div>
        {errors.password?.type === "required" && "password is required"}
        {/* pattern: /^[a-zA-Z0-9!@#\$%\^\&*_=+-]{5,8}$/  {errors.password?.type === "pattern" && "Enter password 1 lowercase,1 Uppercase,Number,Sysmbol"} */}
   
//   <div className={styles.formgroup}>
//     <label htmlFor='address'>Address</label>
//     <input type="text" placeholder='house 1234 colony city' {...register("address", { required: true, pattern: /[A-Za-z]/ })} />
//   </div>
//         {errors.address?.type === "required" && "address is required"}
//         {errors.address?.type === "pattern" && "Provide Proper address"}
   

//   <button type="submit" className={styles.signupbtn}>Sign Up</button>
//   <p onClick={() => { navigate('/signin') }} style={{ color: '#b30086', cursor: 'pointer' }}>already have an account. Sign In</p>
// </form>
// </div> */}
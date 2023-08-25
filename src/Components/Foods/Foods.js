import styles from './inventory.module.css';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { useForm } from "react-hook-form";
import axios from 'axios';

const FoodDetailsPage = () => {
  const [foodData, setfooddata] = useState([]);
  // Gettinf food data from Data Base 
  useEffect(() => {
    axios
      .get('http://localhost:1000/getmealinfo')
      .then((response) => setfooddata(response.data))
      .catch((error) => console.error('Error fetching rooms:', error));
  }, []);
  let [popup, setpopup] = useState(false);
  let [daytochange, setdaytochange] = useState(null);

  function addMinutesToTime(timeString, minutesToAdd) {
    const [hoursStr, minutesStr] = timeString.split(':');
    let hours = parseInt(hoursStr, 10);
    let minutes = parseInt(minutesStr, 10);
    // Add the minutes
    minutes += minutesToAdd;
    // Handle the case when minutes exceed 59
    hours += Math.floor(minutes / 60);
    minutes %= 60;
    // Handle the case when hours exceed 23
    hours %= 24;
    // Format the result
    const newTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
    return newTime;
  }
  function changedata(index) {
    setdaytochange(index);
    setpopup(true);
  }
  const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = async (data) => {
    if(data.breakfast==""){
      data.breakfast=daytochange.breakfast;
    }
    if(data.breakfastStartTime==""){
      data.breakfastStartTime=daytochange.breakfastStartTime;
    }
    if(data.lunch==""){
      data.lunch=daytochange.lunch;
    }
    if(data.lunchStartTime==""){
      data.lunchStartTime=daytochange.lunchStartTime;
    }if(data.dinner==""){
      data.dinner=daytochange.dinner;
    }
    if(data.dinnerStartTime==""){
      data.dinnerStartTime=daytochange.dinnerStartTime;
    }
    const breakfastEndTime = addMinutesToTime(data.breakfastStartTime, 90);
    const lunchEndTime = addMinutesToTime(data.lunchStartTime, 90);
    const dinnerEndTime = addMinutesToTime(data.dinnerStartTime, 90);
    const day = daytochange.day;
    data = { ...data, breakfastEndTime, lunchEndTime, dinnerEndTime, day };
    // console.log(data);
    const mealIdToUpdate = daytochange._id; // Replace this with the actual room id you want to update
    // console.log(mealIdToUpdate);
    axios
      .put(`http://localhost:1000/updatemeal/${mealIdToUpdate}`, data)
      .then((response) => {
        console.log('Updated room:', response.data);
      })
      .catch((error) => {
        console.error('Error updating room:', error);
      });
    // updateObjectAtIndex(daytochange, data);
    setpopup(false)
    // console.log(breakfastEndTime);
    const index = foodData.findIndex((item) => item.day == data.day);
    console.log(index);
    let updatedfooddata=[...foodData];
    updatedfooddata[index]=data;
    console.log(updatedfooddata);
    setfooddata(updatedfooddata);
    console.log(foodData);
    // if (index >= 0 && index < foodData.length) {
    //   const updatedFoodData = [
    //     ...foodData.slice(0, index),
    //     data,
    //     ...foodData.slice(index + 1),
    //   ];
    //   setfooddata([...updatedFoodData]);
    // };

  }

    function chechktoclose(e) {
      if (e.target.className == "cart_popupoverlay__Mknfq") {
        setpopup(false);
      }
      else {
        return;
      }
    }


  return (
    <div className={styles.foodcontainer}>
      <div>
        <h2 className='font-semibold text-2xl text-indigo-500 mt-2 m'>Food Details for the Week</h2>
        <table className={styles.uppertable}>
          <thead>
            <tr>
              <th>Day</th>
              <th>Breakfast</th>
              <th className={styles.time}>Breakfast Time</th>
              <th>Lunch</th>
              <th className={styles.time}>Lunch Time</th>
              <th>Dinner</th>
              <th className={styles.time}>Dinner Time</th>
              <th className={styles.time}>Edit</th>
            </tr>
          </thead>
          <tbody>
            {foodData.map((dayData, index) => (
              <tr key={index} >
                <td>{dayData.day}</td>
                <td>{dayData.breakfast}</td>
                <td className={styles.time}>{dayData.breakfastStartTime} - {dayData.breakfastEndTime}</td>
                <td>{dayData.lunch}</td>
                <td className={styles.time}>{dayData.lunchStartTime} - {dayData.lunchEndTime}</td>
                <td>{dayData.dinner}</td>
                <td className={styles.time}>{dayData.dinnerStartTime} - {dayData.dinnerEndTime}</td>
                <td onClick={(e) => { changedata(dayData) }} className={styles.editicon} ><img src='edit-icon-image-12.jpg' /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {popup &&
        <div className={styles.popupoverlay} onClick={(e)=>{chechktoclose(e)}}>
          <div className={styles.popupcontainer}>
            <div className={styles.closebtn}>
              <img src='red-cross-mark.png' onClick={() => { setpopup(false) }} />
            </div>
            <label>Edit the Food Details for {daytochange.day}</label>
            <div className={styles.menuitem}>
              <p style={{ borderBottom: '3px double black' }}></p>
              <form onSubmit={handleSubmit(onSubmit)} style={{ backgroundImage: 'linear-gradient(to top,#8cc3b5, #4763be)' }} className={styles.formhere}>
                <div>
                  <label>Breakfast </label>
                  <input type='text' placeholder='Breakfast' {...register("breakfast")} />
                </div>
                <div>
                  <label>Breakfast time</label>
                  <input type='time' {...register("breakfastStartTime")} />
                </div>
                <div>
                  <label>Lunch </label>
                  <input type='text' placeholder='Lunch' {...register("lunch")} />
                </div>
                <div>
                  <label>Lunch time</label>
                  <input type='time' {...register("lunchStartTime")} />
                </div>
                <div>
                  <label>Dinner </label>
                  <input type='text' placeholder='Dinner' {...register("dinner")} />
                </div>
                <div>
                  <label>Dinner time</label>
                  <input type='time' {...register("dinnerStartTime")} />
                </div>
                <div className={styles.btncontainer}>
                  <button className={styles.button62} type='submit'>Change Now</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      }
    </div>
  );
};
export default FoodDetailsPage;






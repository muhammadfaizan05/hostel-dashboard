import React,{useEffect} from 'react';
import styles from './student.module.css';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios'

const Students = () => {
  let [studentData, setstudentData] = useState([]);
  let [onleave,setonleave]=useState([]);
  useEffect(() => {
    axios
      .get('http://localhost:1000/getstudents')
      .then((response) => setstudentData(response.data))
      .catch((error) => console.error('Error fetching rooms:', error));
    }, []);
    
    
  console.log(studentData);
  function savedatanow(data){
      axios
      .post('http://localhost:1000/studentsignup', data)
      .then((response) => {
        console.log('Data Saved :', response.data);
        // Handle the response data if needed
      })
      .catch((error) => {
        console.error('Error updating room:', error);
        // Handle errors if needed
      });
  }

  let [popup2, setpopup2] = useState(false);
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const onSubmit = async (data) => {
    console.log(data);
    setstudentData([...studentData, {...data,password:"abc"}]);
    savedatanow(data)
    reset();
  };

  return (
    <div>
      <h3 className='font-semibold text-2xl text-indigo-500 mt-2 mb-2'>Students Data Page</h3>
      <div className={styles.tablecontainer}>
      <table className={styles.uppertable}>
        <thead>
          <tr>
            <th className={styles.none}>#</th>
            <th>Name</th>
            <th>Father</th>
            <th>Age</th>
            <th>Collge</th>
            <th>Dept</th>
            <th>From</th>
            <th>Cnt.info</th>
            <th>Email</th>
            <th>Room Asked</th>
            <th>Check-in</th>
          </tr>
        </thead>
        <tbody>
          {studentData.map((single_student, index) => (
            <tr key={index} >
              <td>{index+1 }</td>
              <td >{single_student.name}</td>
              <td >{single_student.fathername}</td>
              <td >{single_student.studentAge}</td>
              <td>{single_student.university}</td>
              <td>{single_student.department}</td>
              <td>{single_student.studentAddress}</td>
              <td>{single_student.studentContact}</td>
              <td href={"mailto:"+single_student.email}>{single_student.email}</td>
              <td>{single_student.selectedRoomType}</td>
              <td>{new Date(single_student.startDate).toLocaleDateString()}</td>
              </tr>
          ))}
        </tbody>
      </table>
      </div>
      <button className={styles.button62} type='submit' onClick={() => { setpopup2(true) }}>Add New</button>
    
      {popup2 &&
        <div className={styles.popupoverlay} onClick={(e) => {
          if (e.target.className === "cart_popupoverlay__Mknfq") {
            setpopup2(false);
          }
        }}>
          <div className={styles.popupcontainer}>
            <div className={styles.closebtn}>
              <img src='red-cross-mark.png' onClick={() => { setpopup2(false) }} />
            </div>
            <h3>Add Details to add New Student</h3>
            <div className={styles.settingscontainer}>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                  <label htmlFor="name">Name</label>
                  <input type='text' placeholder='name' {...register("name", { required: true })} />
                </div>
                <div>
                  <label htmlFor="fathername">Father's Name</label>
                  <input type='text' placeholder='father name' {...register("fathername", { required: true })} />
                </div>
                <div>
                  <label htmlFor="University">University</label>
                  <input type='text' placeholder='University' {...register("university", { required: true })} />
                </div>
                <div>
                  <label htmlFor="department">Department</label>
                  <input type='text' placeholder='department' {...register("department", { required: true })} />
                </div>
                <div>
                  <label htmlFor="Address">Address of Student</label>
                  <input type='text' placeholder='Address' {...register("studentAddress", { required: true })} />
                </div>
                <div>
                  <label htmlFor="contactInformation">Student Contact number</label>
                  <input type='number' placeholder='contactInformation' {...register("studentContact", { required: true })} />
                </div>
                <div>
                  <label htmlFor="fathersContact">Father's Contact number</label>
                  <input type='number' placeholder='fathersContact' {...register("fathersContact", { required: true })} />
                </div>
                <div>
                  <label htmlFor="roomNumber">Add to room Type</label>
                  <input type='text' placeholder='room type' {...register("selectedRoomType", { required: true })} />
                </div>
                <div>
                  <label htmlFor="email">Email</label>
                  <input type='email' placeholder='email' {...register("email", { required: true })} />
                </div>
                <div>
                  <label htmlFor="date">Joining Date</label>
                  <input type='date' placeholder='email' {...register("startDate", { required: true })} />
                </div>

                <button className={styles.button62} type='submit'>Add Room</button>
              </form>
            </div>
          </div>

        </div>
      }
    </div>
  )
}

export default Students



// onClick={
//   async () => {
//     let resp = axios.post('http://localhost:1000/addstudent', single_student)
//     console.log(resp.data);
//   }
// }
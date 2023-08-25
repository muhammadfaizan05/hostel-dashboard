import React,{useEffect} from 'react';
import styles from '../Students/student.module.css';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios'

const GuestREquest = () => {
  let [guestdata, setguestdata] = useState([]);
  useEffect(() => {
    axios
      .get('http://localhost:1000/getguestrequest')
      .then((response) => setguestdata(response.data))
      .catch((error) => console.error('Error fetching rooms:', error));

    }, []);
    
    function updatestatus(index){
        guestdata[index].approvestatus=true;
        setguestdata([...guestdata]);
        // let Status=(!guestdata[index].approvestatus);
        // console.log(Status);
        let id=guestdata[index]._id;
        axios
        .put(`http://localhost:1000/updategetguestrequeststatus/${id}`, guestdata[index])
        .then((response) => {
          console.log('Updated Data:', response.data);
          // Handle the response data if needed
        })
        .catch((error) => {
          console.error('Error updating room:', error);
          // Handle errors if needed
        });
    }
  console.log(guestdata);
  function savedatanow(data){
      axios
      .post('http://localhost:1000/reqguestacc', data)
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
    setguestdata([...guestdata, {...data}]);
    let datatosend={...data,requestmakerid:'admin',approvestatus:true}
    savedatanow(datatosend)
    reset();
  };

  return (
    <div>
      <h3 className='font-semibold text-2xl text-indigo-500 mt-2 mb-2'>Guest Accomodation</h3>
      <p className='no-underline'>Click to approve:</p>
      <div className={styles.tablecontainer}>
      <table className={styles.uppertable}>
        <thead>
          <tr>
            <th className={styles.none}>#</th>
            <th>Name</th>
            <th>Relation to student</th>
            <th>Age</th>
            <th>Reason</th>
            <th>From</th>
            <th>Cnt.info</th>
            <th>Check-in</th>
            <th>Check-out</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {guestdata.map((singleguestdata, index) => (
            <tr key={index} class="hover:bg-indigo-700 hover:text-white hover:translate-x-2">
              <td>{index+1 }</td>
              <td >{singleguestdata.guestName}</td>
              <td >{singleguestdata.guestRelation}</td>
              <td >{singleguestdata.guestAge}</td>
              <td>{singleguestdata.reasonForStay}</td>
              <td>{singleguestdata.guestAddress}</td>
              <td>{singleguestdata.guestContact}</td>
              <td>{new Date(singleguestdata.startDate).toLocaleDateString()}</td>
              <td>{new Date(singleguestdata.endDate).toLocaleDateString()}</td>
              <td 
              style={{textAlign:'center',cursor:'pointer'}} 
                    onClick={()=>{updatestatus(index)}} 
                    className={singleguestdata.approvestatus ? 'text-green-800 font-bold' : 'text-red-600 font-bold'}> 
                    {singleguestdata.approvestatus ? 'Approved' : 'Pending'}</td>
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
                  <label htmlFor="guestname">Guest Name</label>
                  <input type='text' placeholder='guestname' {...register("guestName", { required: true })} />
                </div>
                <div>
                  <label htmlFor="Contact">Contact number</label>
                  <input type='number' placeholder='Contact' {...register("guestContact", { required: true })} />
                </div>
                <div>
                  <label htmlFor="relation">Relation</label>
                  <input type='text' placeholder='relation' {...register("guestRelation", { required: true })} />
                </div>
                <div>
                  <label htmlFor="age">Age of the Person</label>
                  <input type='text' placeholder='age' {...register("guestAge", { required: true })} />
                </div>
                <div>
                  <label htmlFor="reason">Purpose of Stay</label>
                  <input type='text' placeholder='reason' {...register("reasonForStay", { required: true })} />
                </div>
                <div>
                  <label htmlFor="Address">Address</label>
                  <input type='text' placeholder='Address' {...register("guestAddress", { required: true })} />
                </div>
                <div>
                  <label htmlFor="date">Joining Date</label>
                  <input type='date' placeholder='joining date' {...register("startDate", { required: true })} />
                </div>
                <div>
                  <label htmlFor="Chechoutdate">Check-out-date</label>
                  <input type='date' placeholder='Chechoutdate' {...register("endDate", { required: true })} />
                </div>             
                

                <button className={styles.button62} type='submit'>Add Now</button>
              </form>
            </div>
          </div>

        </div>
      }
    </div>
  )
}

export default GuestREquest


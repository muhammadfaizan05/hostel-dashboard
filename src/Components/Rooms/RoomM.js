import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './room.module.css';
import { useForm} from 'react-hook-form';

const RoomManagement = () => {

  let [roomdata, setroomdata] = useState([])

  useEffect(() => {
    axios
      .get('http://localhost:1000/getrooms')
      .then((response) => setroomdata(response.data))
      .catch((error) => console.error('Error fetching rooms:', error));
  }, []);

  function editfunction(room) {
    setpopup(true);
    setroomtoset(room);
  }
  // popup logics 
  let [popup, setpopup] = useState(false);
  let [roomtoset, setroomtoset] = useState();
  let [selectedsettting, setselectedsettting] = useState();
  let [addnewroom, setaddnewroom] = useState(false);

  function chechktoclose(e) {
    if (e.target.className == "cart_popupoverlay__Mknfq") {
      setpopup(false);
    }
    else {
      return;
    }
  }
  const handleStudentsChange = (event) => {
    const studentsArray = event.target.value.split('\n');
    setroomtoset((prevRoomData) => ({
      ...prevRoomData,
      students: studentsArray,
    }));
  };
  const handleAccessoriesChange = (event) => {
    const accessoriesarray = event.target.value.split('\n');
    setroomtoset((prevRoomData) => ({
      ...prevRoomData,
      accessories: accessoriesarray,
    }));
  };

  function saveroomtoset() {
    const index = roomdata.findIndex((item) => item.roomno === roomtoset.roomno);
    console.log(roomtoset);
    roomdata[index] = roomtoset;
    const roomIdToUpdate = roomtoset._id; // Replace this with the actual room id you want to update
    console.log(roomIdToUpdate);
    axios
      .put(`http://localhost:1000/updateroom/${roomIdToUpdate}`, roomtoset)
      .then((response) => {
        console.log('Updated room:', response.data);
        // Handle the response data if needed
      })
      .catch((error) => {
        console.error('Error updating room:', error);
        // Handle errors if needed
      });
    setroomdata([...roomdata]);
    console.log(roomdata);
    setpopup(false);
  }

  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    data.students = data.students.split("\n");
    data.accessories = data.accessories.split("\n");
    let roomno = roomdata.length + 1;
    data = { roomno, ...data }
    console.log(data); 
    reset();
    setroomdata([...roomdata, data]);
  };

  return (
      <div className="p-0  dark:border-gray-700">
      <h2 className='font-semibold text-2xl text-indigo-500 mt-2 mb-2'>Room Management</h2>
      <div className={styles.tablecontainer}>
        <table className={styles.roomtable}>
          <thead>
            <tr>
              <th>Room No.</th>
              <th>Type</th>
              <th>Total Space</th>
              <th>Cleaning</th>
              <th className={styles.none}>Accessories</th>
              <th className={styles.none}>students</th>
              <th>Edit</th>
            </tr>
          </thead>
          {roomdata.map((room) => {
            return <tr className={styles.returningrow}>
              <td>{room.roomno}</td>
              <td>{room.roomType}</td>
              <td>{room.totalspace}</td>
              <td>{room.lastcleaning}</td>
              <td className={styles.none}><ol className={styles.mapreturns}>{room.accessories.map((accessory) => { return <li>{accessory}</li> })}</ol></td>
              <td className={styles.none}><ol className={styles.mapreturns}>{room.students.map((accessory) => { return <li>{accessory}</li> })}</ol></td>
              <td className={styles.editicon} onClick={(e) => { editfunction(room) }}><img src='edit-icon-image-12.jpg' /></td>
            </tr>
          })}
        </table>
      </div>
      {popup &&
        <div className={styles.popupoverlay} onClick={(e) => { chechktoclose(e) }}>
          <div className={styles.popupcontainer}>
            <div className={styles.closebtn}>
              <img src='red-cross-mark.png' onClick={() => { setpopup(false) }} />
            </div>
            <label>Editing Room No. {roomtoset.roomno}</label>
            <div className={styles.settingscontainer}>
              <div className={styles.menuitem}>
                <h3>What would you like to change!</h3>
                <ol>
                  <li onClick={() => { setselectedsettting('type') }}>Change Type</li>
                  <li onClick={() => { setselectedsettting('capacity') }}>Change Capacity</li>
                  <li onClick={() => { setselectedsettting('totalspace') }}>Edit Total Space</li>
                  <li onClick={() => { setselectedsettting('cleaning') }}>Add Cleaning Detail</li>
                  <li onClick={() => { setselectedsettting('accessories') }}>Edit Accessories</li>
                  <li onClick={() => { setselectedsettting('students') }}>Change Students</li>
                </ol>
              </div>
              <div className={styles.settingtab}>
                <h3>Make the Changes here</h3>
                <span>{selectedsettting}</span>
                <p>("Changes would be saved as you type them, press the button when you have done all required changed")</p>
                <div>
                  {(selectedsettting === 'type') && <div className={styles.minidiv}>
                    <label>Whats the New Type for this Room</label>
                    <input type='text' name='roomType' onChange={(e) => {
                      const newdata = e.target.value;
                      setroomtoset((prevRoomData) => ({
                        ...prevRoomData,
                        roomType: newdata,
                      }));
                      // console.log(roomtoset);
                    }} />
                  </div>}
                  {(selectedsettting === 'capacity') && <div className={styles.minidiv}>
                    <label>Whats the Capacity of this room Now</label>
                    <input type='number' name='capacity' onChange={(e) => {
                      const newdata = e.target.value;
                      setroomtoset((prevRoomData) => ({
                        ...prevRoomData,
                        capacity: newdata,
                      }));
                      // console.log(roomtoset);
                    }} />
                  </div>}
                  {(selectedsettting === 'totalspace') && <div className={styles.minidiv}>
                    <label>Provide the total capacity</label>
                    <input type='number' name='totalspace' onChange={(e) => {
                      const newdata = e.target.value;
                      setroomtoset((prevRoomData) => ({
                        ...prevRoomData,
                        totalspace: newdata,
                      }));
                      // console.log(roomtoset);
                    }} />
                  </div>}
                  {(selectedsettting === 'cleaning') && <div className={styles.minidiv}>
                    <label>Cleaning Update</label>
                    <input type='text' name='lastcleaning' onChange={(e) => {
                      const newdata = e.target.value;
                      setroomtoset((prevRoomData) => ({
                        ...prevRoomData,
                        lastcleaning: newdata,
                      }));
                      // console.log(roomtoset);
                    }} />
                  </div>}
                  {(selectedsettting === 'accessories') && <div className={styles.minidiv}>
                    <label>Provide all  the Accessories</label>
                    <small>(each on sigle line)</small>
                    <textarea value={roomtoset.accessories.join('\n')} onChange={handleAccessoriesChange}></textarea>
                  </div>}
                  {(selectedsettting === 'students') && <div className={styles.minidiv}>
                    <label>Provide all  the Accessories</label>
                    <small>(each on sigle line)</small>
                    <textarea value={roomtoset.students.join('\n')} onChange={handleStudentsChange}></textarea>
                  </div>}
                  <button className={styles.button62} type='submit' onClick={saveroomtoset}>Done all</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      }

      <div className={styles.lowersectionrooms}>
        <button className={styles.button62} onClick={() => { if (addnewroom) { setaddnewroom(false) } else { setaddnewroom(true) } }}>Add New Room</button>
        {addnewroom && <div className={styles.addrommsection}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label htmlFor="roomType">Room Type</label>
              <input type='text' placeholder='roomType' {...register("roomType", { required: true })} />
            </div>

            <div>
              <label htmlFor="capacity">Capacity</label>
              <input type='number' name='capacity' {...register("capacity", { required: true })} />
            </div>

            <div>
              <label htmlFor="totalspace">Total Space</label>
              <input type='number' name='totalspace' {...register("totalspace", { required: true })} />
            </div>

            <div>
              <label htmlFor="accessories">Accessories</label>
              <textarea placeholder='what are the accessories'  {...register("accessories", { required: true })}></textarea>
            </div>
            <div>
              <label htmlFor="students">students</label>
              <textarea placeholder='what are the students' {...register("students", { required: true })}></textarea>
            </div>

            <div>
              <label htmlFor="lastcleaning">Last Cleaning</label>
              <input type='text' placeholder='lastcleaning' {...register("lastcleaning", { required: true })} />
            </div>

            <button className={styles.button62} type='submit'>Add Room</button>
          </form>

        </div>}
      </div>
    </div>
  );
};

export default RoomManagement;

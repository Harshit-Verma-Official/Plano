import './App.css';
import Calender from './Components/Calender';
import ViewsTabs from './Components/ViewsTabs/ViewsTabs';
import Dropdown from './Components/Dropdown/Dropdown';
import { useEffect, useState } from 'react';
import FloatingButton from './Components/FloatingButton/FloatingButton';
import ModalBox from './Components/ModalBox/ModalBox';
import TaskPanel from './Components/TaskPanel/TaskPanel';
import axios from './axios/axios';
import { useStateValue } from './StateProvider/StateProvider';
import { actionTypes } from './StateProvider/reducer';

function App() {
  const [{currentDate, teachers, currentTeacherId}, dispatch] = useStateValue();

  const [currentViewMode, setCurrentViewMode] = useState({month : true, week : false, day : false});
  const [newTask, setNewTask] = useState({task_name:'', task_date: currentDate, start_time: '00:00:00', end_time: '00:00:00'});
  const [showModal, setShowModal] = useState(false);

  // Fetch Teachers
  useEffect(() => {
    async function fetchData() {
      const request = await axios.get('/api/teachers');
      
      dispatch({
        type: actionTypes.FETCH_TEACHERS,
        teachers: request.data
      })

      return request;
    }
    fetchData();
  }, [])

  useEffect(() => {
    setNewTask({task_id: 0, task_name:'', task_date: currentDate, start_time: '00:00:00', end_time: '00:00:00'});
  }, [showModal])
  
  return (
      <div className="main">

        <div className="task_panel">
          <TaskPanel setShowModal={setShowModal} />
        </div>

        <div className="container">
          <div className="container_header">
            <Dropdown facultyList={teachers} />
            <ViewsTabs currentViewMode={currentViewMode} setCurrentViewMode={setCurrentViewMode} />
          </div>

          <Calender currentViewMode={currentViewMode} />

          <FloatingButton setShowModal={setShowModal} />
          <ModalBox task={{task_id: 0, teacher_id: currentTeacherId, task_date: currentDate}} showModal={showModal} setShowModal={setShowModal} newTask={newTask} setNewTask={setNewTask} />

        </div>

      </div>
  );
}

export default App;

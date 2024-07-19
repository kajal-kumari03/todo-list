import { useNavigate } from "react-router-dom";


const HomePage = () => {
    const navigate = useNavigate();

    const goToTasks = () => {
        navigate('/tasks');
      };
    
      const goToRegister = () => {
        navigate('/register');
      };
  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
    <h1>Welcome to the To-Do App</h1>
    <button
      onClick={goToTasks}
      style={{ margin: '10px', padding: '10px 20px', fontSize: '16px' }}
    >
      View Tasks
    </button>
    <button
      onClick={goToRegister}
      style={{ margin: '10px', padding: '10px 20px', fontSize: '16px' }}
    >
      Register
    </button>
  </div>
  )
}

export default HomePage

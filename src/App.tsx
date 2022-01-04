// import { useEffect } from 'react';
import { useEffect } from 'react';

import './App.css';
import { useLogin } from './services/Auth/auth.hooks';

function App() {
  const { mutateAsync } = useLogin();

  return (
    <div className='App'>
      <header className='App-header'></header>
      <button
        className='p-10'
        onClick={() =>
          mutateAsync({
            email: 'test111@email.com',
            password: 'test1234A!',
          })
        }
      >
        press
      </button>
    </div>
  );
}

export default App;

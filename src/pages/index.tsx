import { Header } from '../components';
import { useAuth } from '../context/AuthContext';

export default function Home() {
  const { user, login, logout } = useAuth();

  return (
    <div className='w-full px-4 py-4 bg-gray-900  h-screen'>
      <Header />

      <div className='w-full flex flex-col gap-4'></div>
      <h1>Teste autenticação</h1>
      <div>
        <button onClick={login}>Login</button>
        <button onClick={logout}>Logout</button>
      </div>
    </div>
  );
}

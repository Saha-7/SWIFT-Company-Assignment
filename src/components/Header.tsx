import { useNavigate } from 'react-router-dom';

interface HeaderProps {
  userName?: string;
}

const Header = ({ userName }: HeaderProps) => {
  const navigate = useNavigate();
  //const location = useLocation();
  //const isProfilePage = location.pathname === '/profile';

  return (
    <header className="bg-slate-900 text-white px-6 py-4 shadow-xl">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className=" font-bold px-3 py-1 rounded">
            <img className='invert' src='https://cdn.prod.website-files.com/6509887b9119507025235a5a/650ada40fd6cf3427547c9d8_Swift%20logo.svg' alt='logo'/>
          </div>
        </div>
        
        <div 
          className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition"
          onClick={() => navigate('/profile')}
        >
          <div className="w-10 h-10 bg-white text-slate-800 rounded-full flex items-center justify-center font-semibold">
            {userName ? userName.charAt(0).toUpperCase() : 'U'}
          </div>
          <span className="text-lg">{userName || 'User'}</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
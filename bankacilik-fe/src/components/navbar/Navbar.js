import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation,useNavigate  } from 'react-router-dom';
import { FaUserCircle } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux/slice/authSlice'; // logout action'ı ekleyin
import './Navbar.css'; // Eğer özel bir stil dosyanız varsa
import { toast, ToastContainer } from 'react-toastify'; // react-toastify ekleyin
import 'react-toastify/dist/ReactToastify.css';
const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const token = useSelector((state) => state.user.token);
  const dropdownRef = useRef(null); // Dropdown'un referansı

  const navItems = [
    { path: '/', label: 'Ana Sayfa' },
    { path: '/account', label: 'Hesap', },
    { path: '/transfer', label: 'Para Transferi', },
  
  ];

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    toast.success('Çıkış başarılı!', {
      onClose: () => navigate('/'), // Toast kapandıktan sonra ana sayfaya yönlendir
      autoClose: 600 // 1 saniye sonra toast kapanacak
    });
  
    dispatch(logout());
  
    
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownOpen(false);
    }
  };
  
  const handleNavigation = (path) => {
    if ((path === '/account' || path === '/transfer') && !token) {
      toast.error('Giriş yapmalısınız!', {
        onClose: () => navigate('/'), // Toast kapandıktan sonra ana sayfaya yönlendir
        autoClose: 200 // 1 saniye sonra toast kapanacak
      });
    } else {
      navigate(path); // Yönlendirme
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <nav className="bg-gray-50 border-gray-200 dark:bg-gray-900">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">X BANKASI</span>
        </a>
        <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse relative">
          <button
            type="button"
            className="flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
            id="user-menu-button"
            aria-expanded={isDropdownOpen}
            aria-haspopup="true"
            onClick={toggleDropdown}
          >
            <span className="sr-only">Open user menu</span>
            <FaUserCircle className="w-8 h-8 text-white" />
          </button>
          <div
            ref={dropdownRef}
            className={`z-50 ${isDropdownOpen ? 'block' : 'hidden'} absolute right-0 mt-2 w-48 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600`}
            id="user-dropdown"
          >
            <ul className="py-2" aria-labelledby="user-menu-button">
              {!token && (
                <>
                  <li>
                    <Link to="/login" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Giriş yap</Link>
                  </li>
                  <li>
                    <Link to="/register" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Kayıt ol</Link>
                  </li>
                </>
              )}
              {token && (
                <li>
                  <Link onClick={handleLogout} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Çıkış yap</Link>
                </li>
              )}
            </ul>
          </div>
          <button
            data-collapse-toggle="navbar-user"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-user"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
        </div>
        <div
          className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
          id="navbar-user"
        >
          <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            {navItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  onClick={() => handleNavigation(item.path)}
                  className={`block py-2 px-3 rounded md:p-0 ${ 
                    location.pathname === item.path
                      ? 'text-blue-700 dark:text-blue-500'
                      : 'text-gray-900 dark:text-white hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700'
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

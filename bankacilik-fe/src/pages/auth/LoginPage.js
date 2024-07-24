import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom'; // React Router'dan useNavigate kancasını import edin
import { signInUser } from '../../redux/slice/authSlice'; // Redux slice dosyanızın yolu
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LoginPage = () => {
  const [identityNumber, setIdentityNumber] = useState('');
  const [password, setPassword] = useState('');
  const [rememberPassword, setRememberPassword] = useState(false);
  const dispatch = useDispatch(); // Redux dispatch'i kullanmak için
  const navigate = useNavigate(); // useNavigate kancasını kullanarak navigate fonksiyonunu alın

  const handleLogin = async (event) => {
    event.preventDefault(); // Formun varsayılan davranışını engelle

    try {
      const resultAction = await dispatch(signInUser({ identityNumber, password }));

      // Thunk işleminin başarılı olup olmadığını kontrol et
      if (signInUser.fulfilled.match(resultAction)) {
        toast.success('Giriş başarılı!', {
          onClose: () => navigate('/'), // Toast kapandıktan sonra ana sayfaya yönlendir
          autoClose: 1000 // 1 saniye sonra toast kapanacak
        });
   
      } else {
        // Hata mesajını göster
        toast.error(resultAction.payload || 'Giriş başarısız!');
      }
    } catch (error) {
      // Hata durumunda kullanıcıya hata mesajı göster
      toast.error('Giriş başarısız! Lütfen bilgilerinizi kontrol edin.');
      console.error(error); // Hata detaylarını kontrol edin
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <ToastContainer />
      <div className="w-full max-w-md p-8 bg-white shadow-md rounded-lg">
        <h2 className="text-2xl font-semibold text-center mb-6">Giriş Yap</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label htmlFor="identityNumber" className="block text-sm font-medium text-gray-700 mb-1">
              TC Kimlik Numarası
            </label>
            <input
              type="text"
              id="identityNumber"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="12345678900"
              value={identityNumber}
              onChange={(e) => setIdentityNumber(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Şifre
            </label>
            <input
              type="password"
              id="password"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Şifre"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="flex items-center mb-6">
            <input
              type="checkbox"
              id="rememberPasswordCheck"
              checked={rememberPassword}
              onChange={() => setRememberPassword(!rememberPassword)}
              className="mr-2 h-4 w-4 text-blue-600 border-gray-300 rounded"
            />
            <label htmlFor="rememberPasswordCheck" className="text-sm text-gray-600">
              Şifreyi hatırla
            </label>
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Giriş Yap
          </button>
          <hr className="my-6" />
          <button
            type="button"
            className="w-full py-2 px-4 bg-red-500 text-white font-semibold rounded-lg shadow-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 mb-2"
          >
            Google ile Giriş Yap
          </button>
          <button
            type="button"
            className="w-full py-2 px-4 bg-blue-700 text-white font-semibold rounded-lg shadow-md hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Facebook ile Giriş Yap
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;

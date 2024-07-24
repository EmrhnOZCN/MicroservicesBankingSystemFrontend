import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { signUpUser } from '../../redux/slice/authSlice'; // Redux slice dosyanızın yolu
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [gender, setGender] = useState('');
  const [nationality, setNationality] = useState('');
  const [identityNumber, setIdentityNumber] = useState('');
  const [password, setPassword] = useState('');
  const [contactInformation, setContactInformation] = useState('');
  const [address, setAddress] = useState('');
  const [occupation, setOccupation] = useState('');
  const dispatch = useDispatch(); // Redux dispatch'i kullanmak için
  const navigate = useNavigate();
  const handleRegister = async (event) => {
    event.preventDefault(); // Formun varsayılan davranışını engelle

    try {
      // Kullanıcı kayıt işlemi için Redux thunk'ını çağır
      const resultAction = await dispatch(signUpUser({
        name,
        surname,
        birthdate,
        gender,
        nationality,
        identityNumber,
        password,
        contactInformation,
        address,
        occupation
      }));

      // Thunk işleminin başarılı olup olmadığını kontrol et
      if (signUpUser.fulfilled.match(resultAction)) {

        toast.success('Kayıt başarılı!', {
            onClose: () => navigate('/'), // Toast kapandıktan sonra ana sayfaya yönlendir
            autoClose: 1000 // 3 saniye sonra toast kapanacak
          });
    
      } else {
        // Hata mesajını göster
        toast.error(resultAction.payload || 'Kayıt başarısız!');
      }
    } catch (error) {
      // Hata durumunda kullanıcıya hata mesajı göster
      toast.error('Kayıt başarısız! Lütfen bilgilerinizi kontrol edin.');
      console.error(error); // Hata detaylarını kontrol edin
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <ToastContainer />
      <div className="w-full max-w-md p-8 bg-white shadow-md rounded-lg">
        <h2 className="text-2xl font-bold text-center mb-6">Kayıt Ol</h2>
        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Ad</label>
            <input
              type="text"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Soyad</label>
            <input
              type="text"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              value={surname}
              onChange={(e) => setSurname(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Doğum Tarihi</label>
            <input
              type="date"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              value={birthdate}
              onChange={(e) => setBirthdate(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Cinsiyet</label>
            <select
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              required
            >
              <option value="" disabled>Seçiniz</option>
              <option value="Male">Erkek</option>
              <option value="Female">Kadın</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Uyruk</label>
            <select
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              value={nationality}
              onChange={(e) => setNationality(e.target.value)}
              required
            >
              <option value="" disabled>Seçiniz</option>
              <option value="Türkiye Cumhuriyeti">Türkiye Cumhuriyeti</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Kimlik Numarası</label>
            <input
              type="text"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              value={identityNumber}
              onChange={(e) => setIdentityNumber(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Şifre</label>
            <input
              type="password"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">İletişim Bilgileri</label>
            <input
              type="text"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              value={contactInformation}
              onChange={(e) => setContactInformation(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Adres</label>
            <input
              type="text"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Meslek</label>
            <input
              type="text"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              value={occupation}
              onChange={(e) => setOccupation(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 bg-blue-500 text-white font-semibold rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Kayıt Ol
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;

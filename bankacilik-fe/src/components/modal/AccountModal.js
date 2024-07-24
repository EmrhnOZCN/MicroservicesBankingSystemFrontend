import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createAccount, fetchAccounts } from '../../redux/slice/accountSlice';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const accountTypes = ['Tasarruf', 'Vadesiz', 'Yatırım'];
const currencies = ['TL', 'USD', 'EUR'];

const AccountModal = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const authState = useSelector((state) => state.user);
  const { userId } = authState; // auth state'inden userId'yi al

  const [accountDetails, setAccountDetails] = useState({
    customerId: userId, // Kullanıcı ID'sini buradan al
    accountType: accountTypes[0],
    currency: currencies[0],
  });

  useEffect(() => {
    if (userId) {
      setAccountDetails((prevDetails) => ({
        ...prevDetails,
        customerId: userId,
      }));
    }
  }, [userId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAccountDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createAccount(accountDetails))
      .unwrap()
      .then(() => {
        toast.success('Hesabınız başarıyla oluşturuldu!');
        onClose();
        dispatch(fetchAccounts(userId)); // Yeni hesap oluşturulduktan sonra hesapları güncelle
      })
      .catch((error) => {
        toast.error('Hesap oluşturulurken bir hata oluştu.');
      });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="fixed inset-0 bg-gray-500 opacity-75" onClick={onClose}></div>
      <div className="bg-white rounded-lg shadow-lg p-6 relative">
        <button className="absolute top-2 right-2 text-gray-500" onClick={onClose}>
          &times;
        </button>
        <h2 className="text-2xl font-bold mb-4">Yeni Hesap Ekle</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="customerId">
              Müşteri ID
            </label>
            <input
              id="customerId"
              name="customerId"
              type="text"
              value={accountDetails.customerId}
              readOnly
              className="border border-gray-300 p-2 rounded w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="accountType">
              Hesap Türü
            </label>
            <select
              id="accountType"
              name="accountType"
              value={accountDetails.accountType}
              onChange={handleChange}
              className="border border-gray-300 p-2 rounded w-full"
              required
            >
              {accountTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="currency">
              Para Birimi
            </label>
            <select
              id="currency"
              name="currency"
              value={accountDetails.currency}
              onChange={handleChange}
              className="border border-gray-300 p-2 rounded w-full"
              required
            >
              {currencies.map((currency) => (
                <option key={currency} value={currency}>
                  {currency}
                </option>
              ))}
            </select>
          </div>
          <div className="flex justify-end">
            <button type="submit" className="bg-blue-500 text-white p-2 rounded">
              Kaydet
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AccountModal;

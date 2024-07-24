import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { transferMoney } from '../../redux/slice/transferSlice';
import { toast } from 'react-toastify'; // Toast fonksiyonunu içe aktarın

const TransferModal = ({ isOpen, onClose, accounts }) => {
  const [selectedFromAccount, setSelectedFromAccount] = useState('');
  const [selectedToAccount, setSelectedToAccount] = useState('');
  const [amount, setAmount] = useState('');
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.user); // Token'ı burada alın

  const handleFromAccountChange = (e) => {
    setSelectedFromAccount(e.target.value);
  };

  const handleToAccountChange = (e) => {
    setSelectedToAccount(e.target.value);
  };

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  const handleTransfer = async () => {
    try {
      await dispatch(transferMoney({
        fromAccount: selectedFromAccount,
        toAccount: selectedToAccount,
        amount
      })).unwrap();
      
      toast.success('Transfer başarılı!', {
        position: "bottom-right",
        autoClose: 2000, // 2 saniye sonra otomatik kapanacak
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      onClose(); // Başarıyla transfer gerçekleştiğinde modal'ı kapat
    } catch (error) {
      // Hata mesajını ayrıntılı olarak yazdır
      console.error("Transfer işlemi sırasında bir hata oluştu:", error);
      console.error("Hata mesajı:", error.message);
      console.error("Hata yanıtı:", error.response?.data);
      
      toast.error('Transfer işlemi sırasında bir hata oluştu.', {
        position: "bottom-right",
        autoClose: 2000, // 2 saniye sonra otomatik kapanacak
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      // Hata mesajını kullanıcıya gösterme işini burada yapabilirsiniz
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 py-6">
        <div className="fixed inset-0 bg-gray-500 opacity-75"></div>
        <div className="relative bg-white rounded-lg shadow-lg max-w-lg mx-auto">
          <div className="px-6 py-4">
            <h3 className="text-lg font-semibold text-gray-900">Hesap Seçin</h3>
            <div className="mt-4">
              <label htmlFor="from-account" className="block text-sm font-medium text-gray-700">Gönderen Hesap</label>
              <select
                id="from-account"
                value={selectedFromAccount}
                onChange={handleFromAccountChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                <option value="">Hesap Seçin</option>
                {accounts.map((account) => (
                  <option key={account.id} value={account.accountNumber}>
                    {account.accountNumber} - {account.balance} TL
                  </option>
                ))}
              </select>
            </div>
            <div className="mt-4">
              <label htmlFor="to-account" className="block text-sm font-medium text-gray-700">Alıcı Hesap</label>
              <input
                id="to-account"
                name="to-account"
                type="text"
                value={selectedToAccount}
                onChange={handleToAccountChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Alıcı Hesap"
              />
            </div>
            <div className="mt-4">
              <label htmlFor="amount" className="block text-sm font-medium text-gray-700">Tutar</label>
              <input
                id="amount"
                name="amount"
                type="number"
                value={amount}
                onChange={handleAmountChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Tutar"
              />
            </div>
          </div>
          <div className="px-6 py-4 flex justify-end space-x-4">
            <button
              onClick={handleTransfer}
              className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Transferi Gerçekleştir
            </button>
            <button
              onClick={onClose}
              className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-gray-700 bg-gray-200 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
              Kapat
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransferModal;

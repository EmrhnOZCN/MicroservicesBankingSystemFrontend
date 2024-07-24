import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAccounts, closeAccount } from '../../redux/slice/accountSlice';
import AccountModal from '../../components/modal/AccountModal';
import ConfirmationModal from '../../components/modal/ConfirmationModal'; // Yeni eklenen modal
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AccountPage = () => {
  const dispatch = useDispatch();
  const { accounts, loading, error } = useSelector((state) => state.account);
  const userId = useSelector((state) => state.user.userId); // Kullanıcı ID'sini al
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [accountToClose, setAccountToClose] = useState(null);
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);

  useEffect(() => {
    if (userId) {
      dispatch(fetchAccounts(userId)); // Kullanıcı ID'sini gönder
    }
  }, [dispatch, userId]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const handleOpenConfirmationModal = (accountId) => {
    setAccountToClose(accountId);
    setIsConfirmationModalOpen(true);
  };

  const handleCloseConfirmationModal = () => {
    setAccountToClose(null);
    setIsConfirmationModalOpen(false);
  };

  const handleConfirmCloseAccount = () => {
    if (accountToClose) {
      dispatch(closeAccount(accountToClose))
        .unwrap()
        .then(() => {
          toast.success('Hesap başarıyla kapatıldı!');
          handleCloseConfirmationModal();
        })
        .catch((error) => {
          toast.error('Hesap kapatılırken bir hata oluştu.');
          handleCloseConfirmationModal();
        });
    }
  };

  return (
    <div className="container mx-auto px-6 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Hesaplarım</h1>
        <button
          onClick={handleOpenModal}
          className="bg-blue-500 text-white p-2 rounded mr-7"
        >
          Yeni Hesap Ekle
        </button>
      </div>
      <div className="bg-white shadow-md rounded-lg p-6">
        {loading ? (
          <p className="text-gray-500">Yükleniyor...</p>
        ) : accounts.length > 0 ? (
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hesap Numarası</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Bakiye</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hesap Türü</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Oluşturulma Tarihi</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Aksiyon</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {accounts.map((account) => (
                <tr key={account.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{account.accountNumber}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{account.balance} TL</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{account.accountType}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(account.createdAt).toLocaleDateString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <button
                      onClick={() => handleOpenConfirmationModal(account.id)}
                      className="bg-red-500 text-white p-2 rounded"
                    >
                      Kapat
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-gray-500">Hesap bulunamadı.</p>
        )}
      </div>
      <AccountModal isOpen={isModalOpen} onClose={handleCloseModal} />
      <ConfirmationModal
        isOpen={isConfirmationModalOpen}
        onClose={handleCloseConfirmationModal}
        onConfirm={handleConfirmCloseAccount}
        message="Bu hesabı kapatmak istediğinizden emin misiniz?"
      />
    </div>
  );
};

export default AccountPage;

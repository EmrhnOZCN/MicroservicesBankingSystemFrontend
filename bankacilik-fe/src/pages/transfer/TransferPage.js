import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAccounts } from '../../redux/slice/accountSlice';
import { fetchTransfers } from '../../redux/slice/transferSlice';
import TransferModal from '../../components/modal/TransferModal';
import { toast } from 'react-toastify';

const TransferPage = () => {
  const dispatch = useDispatch();
  const { accounts, loading: accountsLoading, error: accountsError } = useSelector((state) => state.account);
  const { transfers, loading: transfersLoading, error: transfersError } = useSelector((state) => state.transfer);
  const userId = useSelector((state) => state.user.userId);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [allTransfers, setAllTransfers] = useState([]); // Tüm transferleri saklamak için

  useEffect(() => {
    if (userId) {
      dispatch(fetchAccounts(userId));
    }
  }, [dispatch, userId]);

  useEffect(() => {
    if (accounts.length > 0) {
      // Hesap numaralarını al
      const accountNumbers = accounts.map(account => account.accountNumber);

      // Her hesap numarası için transferleri getirin
      Promise.all(accountNumbers.map(accountNumber => 
        dispatch(fetchTransfers(accountNumber)).unwrap()
      ))
      .then((responses) => {
        // Gelen transferleri birleştir
        const combinedTransfers = responses.flat();
        setAllTransfers(combinedTransfers);
      })
      .catch(error => {
        console.error('Transferleri getirirken hata:', error);
      });
    }
  }, [dispatch, accounts]);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  // Tarih formatını güncelleme fonksiyonu
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('tr-TR') + ' ' + date.toLocaleTimeString('tr-TR');
  };

 

  return (
    <div className="container mx-auto px-6 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Para Transferi</h1>
        <button
          onClick={() => {
            handleOpenModal();
       
          }}
          className="bg-blue-600 text-white py-2 px-4 rounded-lg shadow hover:bg-blue-700 focus:outline-none"
        >
          Yeni Transfer
        </button>
      </div>
      {accountsLoading ? (
        <p className="text-gray-500">Hesaplar yükleniyor...</p>
      ) : accountsError ? (
        <p className="text-red-500">{accountsError}</p>
      ) : (
        <div className="bg-white shadow-md rounded-lg p-6 mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Hesaplarım</h2>
          <ul className="space-y-2">
            {accounts.map((account) => (
              <li key={account.id} className="text-gray-700">
                <div className="flex justify-between items-center">
                  <span>{account.accountNumber}</span>
                  <span>{account.balance} TL</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
      {transfersLoading ? (
        <p className="text-gray-500">Transfer geçmişi yükleniyor...</p>
      ) : transfersError ? (
        <p className="text-red-500">{transfersError}</p>
      ) : (
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Önceki Transferlerim</h2>
          <ul className="space-y-2">
            {allTransfers.map((transfer) => (
              <li key={transfer.id} className="text-gray-700">
                <div className="flex justify-between items-center">
                  <span>{formatDate(transfer.transferDate)}</span>
                  <span>{transfer.fromAccount} &rarr; {transfer.toAccount}</span>
                  <span>{transfer.amount} TL</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
      <TransferModal isOpen={isModalOpen} onClose={handleCloseModal} accounts={accounts} />
    </div>
  );
};

export default TransferPage;

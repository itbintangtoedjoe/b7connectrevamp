import axios from 'axios';

export async function getHistoryEO(nik, ongoing, fromDate, toDate) {
  const historyItems = [];
  const response = await axios.post(
    'https://portal.bintang7.com/ekspedisionline/pengiriman/get-history-user',
    {
      nik: nik,
    },
  );

  for (const key in response.data) {
    const historyObj = {
      ID: response.data[key].ID,
      CreationDate: response.data[key].CreationDate,
      ResiBarang: response.data[key].ResiBarang,
      NamaPengirim: response.data[key].NamaPengirim,
      NamaPenerima: response.data[key].NamaPenerima,
      Status: response.data[key].Status,
      DetailStatus: response.data[key].DetailStatus,
      JenisBarang: response.data[key].JenisBarang,
      Keterangan: response.data[key].Keterangan,
    };

    if (
      ongoing &&
      historyObj.Status !== 'Selesai' &&
      new Date(historyObj.CreationDate) >= new Date(fromDate) &&
      new Date(historyObj.CreationDate) <= new Date(toDate)
    ) {
      historyItems.push(historyObj);
    } else if (
      !ongoing &&
      historyObj.Status === 'Selesai' &&
      new Date(historyObj.CreationDate) >= new Date(fromDate) &&
      new Date(historyObj.CreationDate) <= new Date(toDate)
    ) {
      historyItems.push(historyObj);
    }
  }

  return historyItems;
}

export async function getHistoryDetailEO(id) {
  const historyDetailItems = [];
  const response = await axios.post(
    'https://portal.bintang7.com/ekspedisionline/pengiriman/get-timeline',
    {
      id: id,
    },
  );

  for (const key in response.data) {
    const historyDetailObj = {
      DetailStatus: response.data[key].DetailStatus,
      ID: response.data[key].ID,
      IDPengiriman: response.data[key].IDPengiriman,
      IDPetugas: response.data[key].IDPetugas,
      NamaPetugas: response.data[key].NamaPetugas,
      Status: response.data[key].Status,
      UpdatedOn: response.data[key].UpdatedOn,
      itemIndex: key,
    };

    historyDetailItems.push(historyDetailObj);
  }

  return historyDetailItems;
}

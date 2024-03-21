import axios from 'axios';

export async function getAllDocumentTARA(data, keyword) {
  const filteredResponse = data.filter(
    item =>
      item.Judul.toLowerCase().includes(keyword.toLowerCase()) ||
      item.Deskripsi.toLowerCase().includes(keyword.toLowerCase()) ||
      item.Keywords.toLowerCase().includes(keyword.toLowerCase()) ||
      item.Category.NamaKategori.toLowerCase().includes(
        keyword.toLowerCase(),
      ) ||
      item.Subcategory.NamaSubkategori.toLowerCase().includes(
        keyword.toLowerCase(),
      ),
  );

  if (keyword) {
    return filteredResponse;
  } else {
    return response.data;
  }
}

export async function getCategorizedDocumentTARA(id) {
  const response = await axios.get(
    'https://portal.bintang7.com/tara/documents/get-all-documents',
  );

  const filteredResponse = response.data.filter(
    item => item.Subcategory.Id === id,
  );

  return filteredResponse;
}

export async function getLatestDocumentTARA() {
  const response = await axios.get(
    'https://portal.bintang7.com/tara/documents/get-latest-documents',
  );
  return response.data;
}

export async function getCategoriesTARA() {
  const response = await axios.get(
    'https://portal.bintang7.com/tara/categories/get-all-categories',
  );
  return response.data;
}

export async function getSubcategoriesTARA(idKategori) {
  const response = await axios.get(
    'https://portal.bintang7.com/tara/categories/get-all-subcategories',
  );

  const filteredResponse = response.data.filter(
    item => item.Category.Id === idKategori,
  );

  return filteredResponse;
}

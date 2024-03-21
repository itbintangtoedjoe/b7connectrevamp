import 'react-native-get-random-values';
import CryptoJS from 'crypto-js';

export const generateRandomIV = () => {
  // Generate a random IV (Initialization Vector) return CryptoJS.lib.WordArray.random(16);
  return CryptoJS.lib.WordArray.random(16);
};

export const encrypt = (plainText, key, iv) => {
  // Convert the key to a WordArray
  const keywordArray = CryptoJS.enc.Utf8.parse(key);
  // Encrypt using AES CBC mode with PKCS7 padding
  const encrypted = CryptoJS.AES.encrypt(plainText, keywordArray, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });

  // Concatenate the IV and the encrypted data
  const encryptedData = iv
    .concat(encrypted.ciphertext)
    .toString(CryptoJS.enc.Base64);
  return encryptedData;
};

// export const decrypt = (encryptedData, key, iv) => {
//   // Convert the key to a WordArray
//   const keywordArray = CryptoJS.enc.Utf8.parse(key);
//   // Separate the IV and the encrypted data
//   const encryptedData = CryptoJS.enc.Base64.parse(encryptedData);
//   const encryptedDataBytes = CryptoJS.lib.WordArray.create(
//     encryptedData.words.slice(4),
//   );

//   // Decrypt using AES CBC mode with PKCS7 padding
//   const decrypted = CryptoJS.AES.decrypt(
//     {ciphertext: encryptedDataBytes},
//     keywordArray,
//     {
//       iv: iv,
//       mode: CryptoJS.mode.CBC,
//       padding: CryptoJS.pad.Pkcs7,
//     },
//   );

//   // Convert the decrypted data to a plaintext string
//   const decryptedData = decrypted.toString(CryptoJS.enc.Utf8);

//   return decryptedData;
// };

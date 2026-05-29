import CryptoJS from 'crypto-js';

const SECRET_KEY = `${import.meta.env.VITE_CRYPT_SECRET_KEY}` ;

if (!SECRET_KEY) {
  throw new Error('CRYPT_SECRET_KEY environment variable is not defined');
}


export const encryptData = (data) => {
  return CryptoJS.AES.encrypt(JSON.stringify(data), SECRET_KEY).toString();
};

export const decryptData = (ciphertext) => {
  const bytes = CryptoJS.AES.decrypt(ciphertext, SECRET_KEY);
  return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
};


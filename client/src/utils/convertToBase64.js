// reject처리
const convertToBase64 = file =>
  new Promise(resolve => {
    const reader = new FileReader();

    // file -> base64 string
    reader.readAsDataURL(file);

    reader.onload = () => {
      resolve(reader.result);
    };
  });

export default convertToBase64;

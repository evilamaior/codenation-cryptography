const fs = require('fs');
const axios = require('axios');
// const CryptoJS = require("crypto-js");
const { join } = require('path');
const request = require('request');

const getDataOnApi = () => {
  axios.get('https://api.codenation.dev/v1/challenge/dev-ps/generate-data?token=e45eae295159eccf2d4eba1e957791ff4fce31a1')
    .then(response => {
      // const messageDecode = cipherDecode(response.data.cifrado, response.data.numero_casas)
      // CryptoJS.SHA1(messageDecode).toString();
      fs.writeFile('answer.json', JSON.stringify(response.data), null, 2);      
        console.log(salved);
    })
    .catch(error => {
      throw error
      console.log(error);
    });
}


const cipherDecode = (text, key) => {
  let decodeArray = [];
  let cipher = "";
  let cipherCount = "";
  for (let i in text){ 
    decodeArray.push(text[i].charCodeAt());
    if (decodeArray[i] >= 65 && decodeArray[i] <= 90){
      cipherCount = ((decodeArray[i] - 65 - (key % 26) + 26) % 26) + 65;
      cipher += String.fromCharCode(cipherCount); 
    }
    else if (decodeArray[i] >= 97 && decodeArray[i] <= 122){
      let cipherCount = ((decodeArray[i] - 97 - (key % 26) + 26) % 26) + 97;
      cipher += String.fromCharCode(cipherCount).toLowerCase();
    } 
    else {
      cipher += String.fromCharCode(decodeArray[i]).toLowerCase();
    }
  }
  return cipher
}

getDataOnApi() 

const answer = fs.createReadStream(join(__dirname, 'answer.json'));
request(
  {
      method: 'POST',
      url: 'https://api.codenation.dev/v1/challenge/dev-ps/submit-solution?token=e45eae295159eccf2d4eba1e957791ff4fce31a1',
      headers: {
          'Content-Type': 'multipart/form-data'
      },
      formData: {
          answer: answer
      }
  }
);

function getDataOnApi() {
  fetch('https://api.codenation.dev/v1/challenge/dev-ps/generate-data?token=e45eae295159eccf2d4eba1e957791ff4fce31a1')
    .then(response => response.json())
    .then(myJson => { 
      console.log(myJson)
      const messageDecode = cipherDecode(myJson.cifrado, myJson.numero_casas)
      console.log(messageDecode)
    })
}

getDataOnApi() 

function cipherDecode(text, key){
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

cipherDecode();

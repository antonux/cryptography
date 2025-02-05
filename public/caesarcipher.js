function generateAlphabet() {
  return "abcdefghijklmnopqrstuvwxyz";
}

function CaesarCipherEncrypt() {
  let encrypted = "";
  let shift = parseInt(document.getElementById("shift").value);
  let plainTextEncrypt = document.getElementById("encryptText").value;
  let alphabet = generateAlphabet();
  for (let letter = 0; letter < plainTextEncrypt.length; letter++) {
    let found = false;
    for (let placement = 0; placement < alphabet.length; placement++) {
      if (plainTextEncrypt[letter].toLowerCase() === alphabet[placement]) {
        encrypted += alphabet[(placement + shift + 26) % 26];
        found = true;
        break;
      }
    }
    if (!found) {
      encrypted += plainTextEncrypt[letter];
    }
  }
  document.getElementById("encryptText").value = encrypted;
}

function CaesarCipherDecrypt() {
  let decrypted = "";
  let shift = parseInt(document.getElementById("shift").value);
  let plainTextEncrypt = document.getElementById("encryptText").value;
  let alphabet = generateAlphabet();
  for (let letter = 0; letter < plainTextEncrypt.length; letter++) {
    let found = false;
    for (let placement = 0; placement < alphabet.length; placement++) {
      if (plainTextEncrypt[letter].toLowerCase() === alphabet[placement]) {
        decrypted += alphabet[(placement - shift + 26) % 26];
        found = true;
        break;
      }
    }
    if (!found) {
      decrypted += plainTextEncrypt[letter];
    }
  }
  document.getElementById("decryptText").value = decrypted;
}
function generateStandardAlphabet() {
  return "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
}

function MonoalphabeticEncrypt() {
  let key = document.getElementById("substitution-key").value.toUpperCase();
  let plaintext = document.getElementById("encryptTextMC").value.toUpperCase();
  let standardAlphabet = generateStandardAlphabet();
  let encryptedText = "";

  if (new Set(key).size !== 26) {
    alert(
      "Input a 26-letter key."
    );
    return;
  }

  for (let char of plaintext) {
    let index = standardAlphabet.indexOf(char);
    encryptedText += index !== -1 ? key[index] : char;
  }

  document.getElementById("encryptTextMC").value = encryptedText;
}

function MonoalphabeticDecrypt() {
  let key = document.getElementById("substitution-key").value.toUpperCase();
  let ciphertext = document.getElementById("decryptTextMC").value.toUpperCase();
  let standardAlphabet = generateStandardAlphabet();
  let decryptedText = "";

  if (new Set(key).size !== 26) {
    alert(
      "Input a 26-letter key."
    );
    return;
  }

  for (let char of ciphertext) {
    let index = key.indexOf(char);
    decryptedText += index !== -1 ? standardAlphabet[index] : char;
  }

  document.getElementById("decryptTextMC").value = decryptedText;
}

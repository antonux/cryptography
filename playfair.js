// Function to generate the 5x5 key square from the given keyword
function generateKeyTable() {
  const keyword = document.getElementById("keyword").value;
  let key = keyword.toUpperCase().replace(/J/g, 'I'); // Replace 'J' with 'I'
  let keySquare = [];
  let seen = new Set();
  let alphabet = "ABCDEFGHIKLMNOPQRSTUVWXYZ"; // 'J' is merged with 'I'

  // Add letters from the keyword to the key square
  for (let char of key) {
    if (!seen.has(char) && alphabet.includes(char)) {
      keySquare.push(char);
      seen.add(char);
    }
  }

  // Fill remaining spaces with the rest of the alphabet
  for (let char of alphabet) {
    if (!seen.has(char)) {
      keySquare.push(char);
      seen.add(char);
    }
  }

  // Display the key square in the table
  let table = document.getElementById("key-square");
  table.innerHTML = "";
  let row;
  keySquare.forEach((letter, index) => {
    if (index % 5 === 0) {
      row = table.insertRow();
    }
    let cell = row.insertCell();
    cell.textContent = letter;
  });

  return keySquare;
}

// Function to prepare the text (making it even length and replacing duplicate letters)
function prepareText(text) {
  text = text.toUpperCase().replace(/J/g, 'I').replace(/[^A-Z]/g, ''); // Remove non-alphabetical characters and replace 'J' with 'I'
  let digraphs = [];

  for (let i = 0; i < text.length; i += 2) {
    let pair = text[i];
    if (i + 1 < text.length) {
      if (text[i] === text[i + 1]) {
        pair += 'X'; // If the same letter, add an 'X' in between
      } else {
        pair += text[i + 1];
      }
    } else {
      pair += 'X'; // If the last letter is alone, add an 'X'
    }
    digraphs.push(pair);
  }
  return digraphs;
}

// Function to search the position of letters in the key square
function findPosition(letter, keySquare) {
  const index = keySquare.indexOf(letter);
  return [Math.floor(index / 5), index % 5];
}

// Function to encrypt the text using Playfair Cipher
function encryptPlayfair() {
  const keyword = document.getElementById("keyword").value;
  const plaintext = document.getElementById("encryptTextPC").value;
  const keySquare = generateKeyTable();
  const digraphs = prepareText(plaintext);
  let ciphertext = '';

  digraphs.forEach(pair => {
    let [row1, col1] = findPosition(pair[0], keySquare);
    let [row2, col2] = findPosition(pair[1], keySquare);

    if (row1 === row2) {
      // Same row: move columns to the right
      ciphertext += keySquare[row1 * 5 + (col1 + 1) % 5];
      ciphertext += keySquare[row2 * 5 + (col2 + 1) % 5];
    } else if (col1 === col2) {
      // Same column: move rows down
      ciphertext += keySquare[((row1 + 1) % 5) * 5 + col1];
      ciphertext += keySquare[((row2 + 1) % 5) * 5 + col2];
    } else {
      // Rectangle: swap columns
      ciphertext += keySquare[row1 * 5 + col2];
      ciphertext += keySquare[row2 * 5 + col1];
    }
  });

  // Display the ciphertext
  document.getElementById("encryptTextPC").value = ciphertext;
}

// Function to decrypt the ciphertext using Playfair Cipher
function decryptPlayfair() {
  const keyword = document.getElementById("keyword").value;
  const ciphertext = document.getElementById("decryptTextPC").value;
  const keySquare = generateKeyTable();
  const digraphs = prepareText(ciphertext);
  let plaintext = '';

  digraphs.forEach(pair => {
    let [row1, col1] = findPosition(pair[0], keySquare);
    let [row2, col2] = findPosition(pair[1], keySquare);

    if (row1 === row2) {
      // Same row: move columns to the left
      plaintext += keySquare[row1 * 5 + (col1 - 1 + 5) % 5];
      plaintext += keySquare[row2 * 5 + (col2 - 1 + 5) % 5];
    } else if (col1 === col2) {
      // Same column: move rows up
      plaintext += keySquare[((row1 - 1 + 5) % 5) * 5 + col1];
      plaintext += keySquare[((row2 - 1 + 5) % 5) * 5 + col2];
    } else {
      // Rectangle: swap columns
      plaintext += keySquare[row1 * 5 + col2];
      plaintext += keySquare[row2 * 5 + col1];
    }
  });

  // Display the decrypted plaintext
  document.getElementById("decryptTextPC").value = plaintext;
}

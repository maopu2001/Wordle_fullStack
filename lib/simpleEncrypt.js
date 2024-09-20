const shift = process.env.ENCRYPT_SHIFT.charCodeAt(0) - 48;

export function encrypt(text) {
  const arr = text.toUpperCase().split('');
  let result = '';
  arr.map((c) => {
    result += String.fromCharCode(((c.charCodeAt(0) - 65 + shift) % 26) + 65);
  });
  return result;
}

export function decrypt(text) {
  const arr = text.toUpperCase().split('');
  let result = '';
  arr.map((c) => {
    result += String.fromCharCode(((c.charCodeAt(0) - 65 - shift) % 26) + 65);
  });
  return result;
}

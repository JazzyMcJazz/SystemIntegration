const s = "Hello World! This is a test of a long string that will be encoded and decoded.";

const encode = (s) => {
  return new TextEncoder().encode(s); // utf-8 encode
  // return btoa(s); // base64 encode
}

const decode = (s) => {
  return new TextDecoder().decode(s); // utf-8 decode
  // return atob(s); // base64 decode
}

const encoded = encode(s);
const decoded = decode(encoded);

console.log(encoded);
console.log(decoded);
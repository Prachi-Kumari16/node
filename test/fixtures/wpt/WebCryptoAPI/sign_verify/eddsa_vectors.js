// eddsa_vectors.js

// Data for testing Ed25519 and Ed448.

// The following function returns an array of test vectors
// for the subtleCrypto sign method.
//
// Each test vector has the following fields:
//     name - a unique name for this vector
//     publicKeyBuffer - an arrayBuffer with the key data
//     publicKeyFormat - "spki" "jwk"
//     publicKey - a CryptoKey object for the keyBuffer. INITIALLY null! You must fill this in first to use it!
//     privateKeyBuffer - an arrayBuffer with the key data
//     privateKeyFormat - "pkcs8" or "jwk"
//     privateKey - a CryptoKey object for the keyBuffer. INITIALLY null! You must fill this in first to use it!
//     algorithmName - the name of the AlgorithmIdentifier parameter to provide to sign
//     data - the text to sign
//     signature - the expected signature
function getTestVectors() {
  var pkcs8 = {
      "Ed25519": new Uint8Array([48, 46, 2, 1, 0, 48, 5, 6, 3, 43, 101, 112, 4, 34, 4, 32, 243, 200, 244, 196, 141, 248, 120, 20, 110, 140, 211, 191, 109, 244, 229, 14, 56, 155, 167, 7, 78, 21, 194, 53, 45, 205, 93, 48, 141, 76, 168, 31]),
      "Ed448": new Uint8Array([48, 71, 2, 1, 0, 48, 5, 6, 3, 43, 101, 113, 4, 59, 4, 57, 14, 255, 3, 69, 140, 40, 224, 23, 156, 82, 29, 227, 18, 201, 105, 183, 131, 67, 72, 236, 171, 153, 26, 96, 227, 178, 233, 167, 158, 76, 217, 228, 128, 239, 41, 23, 18, 210, 200, 61, 4, 114, 114, 213, 201, 244, 40, 102, 79, 105, 109, 38, 112, 69, 143, 29, 46]),
  };

  var spki = {
      "Ed25519": new Uint8Array([48, 42, 48, 5, 6, 3, 43, 101, 112, 3, 33, 0, 216, 225, 137, 99, 216, 9, 212, 135, 217, 84, 154, 204, 174, 198, 116, 46, 126, 235, 162, 77, 138, 13, 59, 20, 183, 227, 202, 234, 6, 137, 61, 204]),
      "Ed448": new Uint8Array([48, 67, 48, 5, 6, 3, 43, 101, 113, 3, 58, 0, 171, 75, 184, 133, 253, 125, 44, 90, 242, 78, 131, 113, 12, 255, 160, 199, 74, 87, 226, 116, 128, 29, 178, 5, 123, 11, 220, 94, 160, 50, 182, 254, 107, 199, 139, 128, 69, 54, 90, 235, 38, 232, 110, 31, 20, 253, 52, 157, 7, 196, 132, 149, 245, 164, 106, 90, 128]),
  };

  // data
  var data = new Uint8Array([43, 126, 208, 188, 119, 149, 105, 74, 180, 172, 211, 89, 3, 254, 140, 215, 216, 15, 106, 28, 134, 136, 166, 195, 65, 68, 9, 69, 117, 20, 161, 69, 120, 85, 187, 178, 25, 227, 10, 27, 238, 168, 254, 134, 144, 130, 217, 159, 200, 40, 47, 144, 80, 208, 36, 229, 158, 175, 7, 48, 186, 157, 183, 10]);

  // For verification tests.
  var signatures = {
      "Ed25519": new Uint8Array([61, 144, 222, 94, 87, 67, 223, 194, 130, 37, 191, 173, 179, 65, 177, 22, 203, 248, 163, 241, 206, 237, 191, 74, 220, 53, 14, 245, 211, 71, 24, 67, 164, 24, 97, 77, 203, 110, 97, 72, 98, 97, 76, 247, 175, 20, 150, 249, 52, 11, 60, 132, 78, 164, 220, 234, 177, 211, 209, 85, 235, 126, 204, 0]),
      "Ed448": new Uint8Array([118, 137, 126, 140, 80, 172, 107, 17, 50, 115, 92, 9, 197, 95, 80, 108, 1, 73, 210, 103, 124, 117, 102, 79, 139, 193, 11, 130, 111, 189, 157, 240, 160, 60, 217, 134, 188, 232, 51, 158, 100, 199, 209, 114, 14, 169, 54, 23, 132, 220, 115, 131, 119, 101, 172, 41, 128, 192, 218, 192, 129, 74, 139, 193, 135, 209, 201, 201, 7, 197, 220, 192, 121, 86, 248, 91, 112, 147, 15, 228, 45, 231, 100, 23, 114, 23, 203, 45, 82, 186, 183, 193, 222, 190, 12, 168, 156, 206, 203, 205, 99, 247, 2, 90, 42, 90, 87, 43, 157, 35, 176, 100, 47, 0]),
  }

  var vectors = [];
  ["Ed25519", "Ed448"].forEach(function(algorithmName) {
    var vector = {
      name: "EdDSA " + algorithmName,
      publicKeyBuffer: spki[algorithmName],
      publicKeyFormat: "spki",
      publicKey: null,
      privateKeyBuffer: pkcs8[algorithmName],
      privateKeyFormat: "pkcs8",
      privateKey: null,
      algorithmName: algorithmName,
      data: data,
      signature: signatures[algorithmName]
    };

    vectors.push(vector);
  });
  return vectors;
}

// https://eprint.iacr.org/2020/1244.pdf#table.caption.3
var kSmallOrderPoints = [
    // Canonical serializations
    [0x01, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00], // #0 - Order 1
    [0xEC, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0x7F], // #1 - Order 2
    [0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x80], // #2 - Order 4
    [0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00], // #3 - Order 4
    [0xC7, 0x17, 0x6A, 0x70, 0x3D, 0x4D, 0xD8, 0x4F, 0xBA, 0x3C, 0x0B, 0x76, 0x0D, 0x10, 0x67, 0x0F, 0x2A, 0x20, 0x53, 0xFA, 0x2C, 0x39, 0xCC, 0xC6, 0x4E, 0xC7, 0xFD, 0x77, 0x92, 0xAC, 0x03, 0x7A], // #4 - Order 8
    [0xC7, 0x17, 0x6A, 0x70, 0x3D, 0x4D, 0xD8, 0x4F, 0xBA, 0x3C, 0x0B, 0x76, 0x0D, 0x10, 0x67, 0x0F, 0x2A, 0x20, 0x53, 0xFA, 0x2C, 0x39, 0xCC, 0xC6, 0x4E, 0xC7, 0xFD, 0x77, 0x92, 0xAC, 0x03, 0xFA], // #5 - Order 8
    [0x26, 0xE8, 0x95, 0x8F, 0xC2, 0xB2, 0x27, 0xB0, 0x45, 0xC3, 0xF4, 0x89, 0xF2, 0xEF, 0x98, 0xF0, 0xD5, 0xDF, 0xAC, 0x05, 0xD3, 0xC6, 0x33, 0x39, 0xB1, 0x38, 0x02, 0x88, 0x6D, 0x53, 0xFC, 0x05], // #6 - Order 8
    [0x26, 0xE8, 0x95, 0x8F, 0xC2, 0xB2, 0x27, 0xB0, 0x45, 0xC3, 0xF4, 0x89, 0xF2, 0xEF, 0x98, 0xF0, 0xD5, 0xDF, 0xAC, 0x05, 0xD3, 0xC6, 0x33, 0x39, 0xB1, 0x38, 0x02, 0x88, 0x6D, 0x53, 0xFC, 0x85], // #7 - Order 8

    // Non-canonical serializatons
    [0x01, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x80], // #8  - Order 1
    [0xEC, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF], // #9  - Order 2
    [0xEE, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0x7F], // #10 - Order 1
    [0xEE, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF], // #11 - Order 1
    [0xED, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF], // #12 - Order 4
    [0xED, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0x7F], // #13 - Order 4
];


var pubKeys = [
    [0xc7, 0x17, 0x6a, 0x70, 0x3d, 0x4d, 0xd8, 0x4f, 0xba, 0x3c, 0x0b, 0x76, 0x0d, 0x10, 0x67, 0x0f, 0x2a, 0x20, 0x53, 0xfa, 0x2c, 0x39, 0xcc, 0xc6, 0x4e, 0xc7, 0xfd, 0x77, 0x92, 0xac, 0x03, 0xfa], // kSmallOrderPoints #5
    [0xf7, 0xba, 0xde, 0xc5, 0xb8, 0xab, 0xea, 0xf6, 0x99, 0x58, 0x39, 0x92, 0x21, 0x9b, 0x7b, 0x22, 0x3f, 0x1d, 0xf3, 0xfb, 0xbe, 0xa9, 0x19, 0x84, 0x4e, 0x3f, 0x7c, 0x55, 0x4a, 0x43, 0xdd, 0x43], // highest 32 bytes of case "1" signature
    [0xcd, 0xb2, 0x67, 0xce, 0x40, 0xc5, 0xcd, 0x45, 0x30, 0x6f, 0xa5, 0xd2, 0xf2, 0x97, 0x31, 0x45, 0x93, 0x87, 0xdb, 0xf9, 0xeb, 0x93, 0x3b, 0x7b, 0xd5, 0xae, 0xd9, 0xa7, 0x65, 0xb8, 0x8d, 0x4d],
    [0x44, 0x2a, 0xad, 0x9f, 0x08, 0x9a, 0xd9, 0xe1, 0x46, 0x47, 0xb1, 0xef, 0x90, 0x99, 0xa1, 0xff, 0x47, 0x98, 0xd7, 0x85, 0x89, 0xe6, 0x6f, 0x28, 0xec, 0xa6, 0x9c, 0x11, 0xf5, 0x82, 0xa6, 0x23],
    [0xec, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff], // kSmallOrderPoints #9
    [0xEC, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0x7F], // kSmallOrderPoints #1
]

// https://eprint.iacr.org/2020/1244.pdf
// signature = (R, S); public key A, h = SHA512(R||A||M )
// 8(SB) = 8R + 8(hA) => (1)
// SB = R + hA => (2)
var kSmallOrderTestCases = {
    "Ed25519": [
        {
            id: "0", // S = 0 | A's order = small | R's order = small | (1) = pass | (2) = pass
            message : Uint8Array.from([0x8c, 0x93, 0x25, 0x5d, 0x71, 0xdc, 0xab, 0x10, 0xe8, 0xf3, 0x79, 0xc2, 0x62, 0x00, 0xf3, 0xc7, 0xbd, 0x5f, 0x09, 0xd9, 0xbc, 0x30, 0x68, 0xd3, 0xef, 0x4e, 0xde, 0xb4, 0x85, 0x30, 0x22, 0xb6]),
            keyData : Uint8Array.from(pubKeys[0]),
            signature : Uint8Array.from([0xc7, 0x17, 0x6a, 0x70, 0x3d, 0x4d, 0xd8, 0x4f, 0xba, 0x3c, 0x0b, 0x76, 0x0d, 0x10, 0x67, 0x0f, 0x2a, 0x20, 0x53, 0xfa, 0x2c, 0x39, 0xcc, 0xc6, 0x4e, 0xc7, 0xfd, 0x77, 0x92, 0xac, 0x03, 0x7a, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00]),
            verified: false,  // small-order signature's R fail in the verification.
        },
        {
            id: "1", // 0 < S < L | A's order = small | R's order = mixed | (1) = pass | (2) = pass
            message : Uint8Array.from([0x9b, 0xd9, 0xf4, 0x4f, 0x4d, 0xcc, 0x75, 0xbd, 0x53, 0x1b, 0x56, 0xb2, 0xcd, 0x28, 0x0b, 0x0b, 0xb3, 0x8f, 0xc1, 0xcd, 0x6d, 0x12, 0x30, 0xe1, 0x48, 0x61, 0xd8, 0x61, 0xde, 0x09, 0x2e, 0x79]),
            keyData : Uint8Array.from(pubKeys[0]),
            signature : Uint8Array.from([0xf7, 0xba, 0xde, 0xc5, 0xb8, 0xab, 0xea, 0xf6, 0x99, 0x58, 0x39, 0x92, 0x21, 0x9b, 0x7b, 0x22, 0x3f, 0x1d, 0xf3, 0xfb, 0xbe, 0xa9, 0x19, 0x84, 0x4e, 0x3f, 0x7c, 0x55, 0x4a, 0x43, 0xdd, 0x43, 0xa5, 0xbb, 0x70, 0x47, 0x86, 0xbe, 0x79, 0xfc, 0x47, 0x6f, 0x91, 0xd3, 0xf3, 0xf8, 0x9b, 0x03, 0x98, 0x4d, 0x80, 0x68, 0xdc, 0xf1, 0xbb, 0x7d, 0xfc, 0x66, 0x37, 0xb4, 0x54, 0x50, 0xac, 0x04]),
            verified: false, // small-order key's data fail in the verification.
        },
        {
            id: "2", // 0 < S < L | A's order = mixed | R's order = small | (1) = pass | (2) = pass
            message : Uint8Array.from([0xae, 0xbf, 0x3f, 0x26, 0x01, 0xa0, 0xc8, 0xc5, 0xd3, 0x9c, 0xc7, 0xd8, 0x91, 0x16, 0x42, 0xf7, 0x40, 0xb7, 0x81, 0x68, 0x21, 0x8d, 0xa8, 0x47, 0x17, 0x72, 0xb3, 0x5f, 0x9d, 0x35, 0xb9, 0xab]),
            keyData : Uint8Array.from(pubKeys[1]),
            signature : Uint8Array.from([0xc7, 0x17, 0x6a, 0x70, 0x3d, 0x4d, 0xd8, 0x4f, 0xba, 0x3c, 0x0b, 0x76, 0x0d, 0x10, 0x67, 0x0f, 0x2a, 0x20, 0x53, 0xfa, 0x2c, 0x39, 0xcc, 0xc6, 0x4e, 0xc7, 0xfd, 0x77, 0x92, 0xac, 0x03, 0xfa, 0x8c, 0x4b, 0xd4, 0x5a, 0xec, 0xac, 0xa5, 0xb2, 0x4f, 0xb9, 0x7b, 0xc1, 0x0a, 0xc2, 0x7a, 0xc8, 0x75, 0x1a, 0x7d, 0xfe, 0x1b, 0xaf, 0xf8, 0xb9, 0x53, 0xec, 0x9f, 0x58, 0x33, 0xca, 0x26, 0x0e]),
            verified: false,  // small-order signature's R fail in the verification.
        },
        {
            id: "3", // 0 < S < L | A's order = mixed | R's order = mixed | (1) = pass | (2) = pass
            message : Uint8Array.from([0x9b, 0xd9, 0xf4, 0x4f, 0x4d, 0xcc, 0x75, 0xbd, 0x53, 0x1b, 0x56, 0xb2, 0xcd, 0x28, 0x0b, 0x0b, 0xb3, 0x8f, 0xc1, 0xcd, 0x6d, 0x12, 0x30, 0xe1, 0x48, 0x61, 0xd8, 0x61, 0xde, 0x09, 0x2e, 0x79]),
            keyData : Uint8Array.from(pubKeys[2]),
            signature : Uint8Array.from([0x90, 0x46, 0xa6, 0x47, 0x50, 0x44, 0x49, 0x38, 0xde, 0x19, 0xf2, 0x27, 0xbb, 0x80, 0x48, 0x5e, 0x92, 0xb8, 0x3f, 0xdb, 0x4b, 0x65, 0x06, 0xc1, 0x60, 0x48, 0x4c, 0x01, 0x6c, 0xc1, 0x85, 0x2f, 0x87, 0x90, 0x9e, 0x14, 0x42, 0x8a, 0x7a, 0x1d, 0x62, 0xe9, 0xf2, 0x2f, 0x3d, 0x3a, 0xd7, 0x80, 0x2d, 0xb0, 0x2e, 0xb2, 0xe6, 0x88, 0xb6, 0xc5, 0x2f, 0xcd, 0x66, 0x48, 0xa9, 0x8b, 0xd0, 0x09]),
            verified: true, // mixed-order points are not checked.
        },
        {
            id: "4", // 0 < S < L | A's order = mixed | R's order = mixed | (1) = pass | (2) = fail
            message : Uint8Array.from([0xe4, 0x7d, 0x62, 0xc6, 0x3f, 0x83, 0x0d, 0xc7, 0xa6, 0x85, 0x1a, 0x0b, 0x1f, 0x33, 0xae, 0x4b, 0xb2, 0xf5, 0x07, 0xfb, 0x6c, 0xff, 0xec, 0x40, 0x11, 0xea, 0xcc, 0xd5, 0x5b, 0x53, 0xf5, 0x6c]),
            keyData : Uint8Array.from(pubKeys[2]),
            signature : Uint8Array.from([0x16, 0x0a, 0x1c, 0xb0, 0xdc, 0x9c, 0x02, 0x58, 0xcd, 0x0a, 0x7d, 0x23, 0xe9, 0x4d, 0x8f, 0xa8, 0x78, 0xbc, 0xb1, 0x92, 0x5f, 0x2c, 0x64, 0x24, 0x6b, 0x2d, 0xee, 0x17, 0x96, 0xbe, 0xd5, 0x12, 0x5e, 0xc6, 0xbc, 0x98, 0x2a, 0x26, 0x9b, 0x72, 0x3e, 0x06, 0x68, 0xe5, 0x40, 0x91, 0x1a, 0x9a, 0x6a, 0x58, 0x92, 0x1d, 0x69, 0x25, 0xe4, 0x34, 0xab, 0x10, 0xaa, 0x79, 0x40, 0x55, 0x1a, 0x09]),
            verified: false, // expect a cofactorless verification algorithm.
        },
        {
            id: "5", // 0 < S < L | A's order = mixed | R's order = L | (1) = pass | (2) = fail
            message : Uint8Array.from([0xe4, 0x7d, 0x62, 0xc6, 0x3f, 0x83, 0x0d, 0xc7, 0xa6, 0x85, 0x1a, 0x0b, 0x1f, 0x33, 0xae, 0x4b, 0xb2, 0xf5, 0x07, 0xfb, 0x6c, 0xff, 0xec, 0x40, 0x11, 0xea, 0xcc, 0xd5, 0x5b, 0x53, 0xf5, 0x6c]),
            keyData : Uint8Array.from(pubKeys[2]),
            signature : Uint8Array.from([0x21, 0x12, 0x2a, 0x84, 0xe0, 0xb5, 0xfc, 0xa4, 0x05, 0x2f, 0x5b, 0x12, 0x35, 0xc8, 0x0a, 0x53, 0x78, 0x78, 0xb3, 0x8f, 0x31, 0x42, 0x35, 0x6b, 0x2c, 0x23, 0x84, 0xeb, 0xad, 0x46, 0x68, 0xb7, 0xe4, 0x0b, 0xc8, 0x36, 0xda, 0xc0, 0xf7, 0x10, 0x76, 0xf9, 0xab, 0xe3, 0xa5, 0x3f, 0x9c, 0x03, 0xc1, 0xce, 0xee, 0xdd, 0xb6, 0x58, 0xd0, 0x03, 0x04, 0x94, 0xac, 0xe5, 0x86, 0x68, 0x74, 0x05]),
            verified: false, // expect a cofactorless verification algorithm.
        },
        {
            id: "6", // S > L | A's order = L | R's order = L | (1) = pass | (2) = pass
            message : Uint8Array.from([0x85, 0xe2, 0x41, 0xa0, 0x7d, 0x14, 0x8b, 0x41, 0xe4, 0x7d, 0x62, 0xc6, 0x3f, 0x83, 0x0d, 0xc7, 0xa6, 0x85, 0x1a, 0x0b, 0x1f, 0x33, 0xae, 0x4b, 0xb2, 0xf5, 0x07, 0xfb, 0x6c, 0xff, 0xec, 0x40]),
            keyData : Uint8Array.from(pubKeys[3]),
            signature : Uint8Array.from([0xe9, 0x6f, 0x66, 0xbe, 0x97, 0x6d, 0x82, 0xe6, 0x01, 0x50, 0xba, 0xec, 0xff, 0x99, 0x06, 0x68, 0x4a, 0xeb, 0xb1, 0xef, 0x18, 0x1f, 0x67, 0xa7, 0x18, 0x9a, 0xc7, 0x8e, 0xa2, 0x3b, 0x6c, 0x0e, 0x54, 0x7f, 0x76, 0x90, 0xa0, 0xe2, 0xdd, 0xcd, 0x04, 0xd8, 0x7d, 0xbc, 0x34, 0x90, 0xdc, 0x19, 0xb3, 0xb3, 0x05, 0x2f, 0x7f, 0xf0, 0x53, 0x8c, 0xb6, 0x8a, 0xfb, 0x36, 0x9b, 0xa3, 0xa5, 0x14]),
            verified: false, // S out of bounds
        },
        {
            id: "7", // S >> L | A's order = L | R's order = L | (1) = pass | (2) = pass
            message : Uint8Array.from([0x85, 0xe2, 0x41, 0xa0, 0x7d, 0x14, 0x8b, 0x41, 0xe4, 0x7d, 0x62, 0xc6, 0x3f, 0x83, 0x0d, 0xc7, 0xa6, 0x85, 0x1a, 0x0b, 0x1f, 0x33, 0xae, 0x4b, 0xb2, 0xf5, 0x07, 0xfb, 0x6c, 0xff, 0xec, 0x40]),
            keyData : Uint8Array.from(pubKeys[3]),
            signature : Uint8Array.from([0x8c, 0xe5, 0xb9, 0x6c, 0x8f, 0x26, 0xd0, 0xab, 0x6c, 0x47, 0x95, 0x8c, 0x9e, 0x68, 0xb9, 0x37, 0x10, 0x4c, 0xd3, 0x6e, 0x13, 0xc3, 0x35, 0x66, 0xac, 0xd2, 0xfe, 0x8d, 0x38, 0xaa, 0x19, 0x42, 0x7e, 0x71, 0xf9, 0x8a, 0x47, 0x34, 0xe7, 0x4f, 0x2f, 0x13, 0xf0, 0x6f, 0x97, 0xc2, 0x0d, 0x58, 0xcc, 0x3f, 0x54, 0xb8, 0xbd, 0x0d, 0x27, 0x2f, 0x42, 0xb6, 0x95, 0xdd, 0x7e, 0x89, 0xa8, 0xc2, 0x02]),
            verified: false, // S out of bounds
        },
        {
            id: "8", // 0 < S < L | A's order = mixed | R's order = small (non-canonical) | (1) = ? | (2) = ? Implementations that reduce A before hashing will accept #8 and accept #9, and viceversa
            message : Uint8Array.from([0x9b, 0xed, 0xc2, 0x67, 0x42, 0x37, 0x25, 0xd4, 0x73, 0x88, 0x86, 0x31, 0xeb, 0xf4, 0x59, 0x88, 0xba, 0xd3, 0xdb, 0x83, 0x85, 0x1e, 0xe8, 0x5c, 0x85, 0xe2, 0x41, 0xa0, 0x7d, 0x14, 0x8b, 0x41]),
            keyData : Uint8Array.from(pubKeys[1]),
            signature : Uint8Array.from([0xec, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0x03, 0xbe, 0x96, 0x78, 0xac, 0x10, 0x2e, 0xdc, 0xd9, 0x2b, 0x02, 0x10, 0xbb, 0x34, 0xd7, 0x42, 0x8d, 0x12, 0xff, 0xc5, 0xdf, 0x5f, 0x37, 0xe3, 0x59, 0x94, 0x12, 0x66, 0xa4, 0xe3, 0x5f, 0x0f]),
            verified: false, // non-canonical point should fail in the verificaton (RFC8032)
        },
        {
            id: "9", // 0 < S < L | A's order = mixed | R's order = small (non-canonical) | (1) = ? | (2) = ?
            message : Uint8Array.from([0x9b, 0xed, 0xc2, 0x67, 0x42, 0x37, 0x25, 0xd4, 0x73, 0x88, 0x86, 0x31, 0xeb, 0xf4, 0x59, 0x88, 0xba, 0xd3, 0xdb, 0x83, 0x85, 0x1e, 0xe8, 0x5c, 0x85, 0xe2, 0x41, 0xa0, 0x7d, 0x14, 0x8b, 0x41]),
            keyData : Uint8Array.from(pubKeys[1]),
            signature : Uint8Array.from([0xec, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xca, 0x8c, 0x5b, 0x64, 0xcd, 0x20, 0x89, 0x82, 0xaa, 0x38, 0xd4, 0x93, 0x66, 0x21, 0xa4, 0x77, 0x5a, 0xa2, 0x33, 0xaa, 0x05, 0x05, 0x71, 0x1d, 0x8f, 0xdc, 0xfd, 0xaa, 0x94, 0x3d, 0x49, 0x08]),
            verified: false, // non-canonical point should fail in the verificaton (RFC8032)
        },
        {
            id: "10", // 0 < S < L | A's order = small (non-canonical) | R's order = mixed | (1) = ? | (2) = ? Implementations that reduce A before hashing will accept #10 and accept #11, and viceversa
            message : Uint8Array.from([0xe9, 0x6b, 0x70, 0x21, 0xeb, 0x39, 0xc1, 0xa1, 0x63, 0xb6, 0xda, 0x4e, 0x30, 0x93, 0xdc, 0xd3, 0xf2, 0x13, 0x87, 0xda, 0x4c, 0xc4, 0x57, 0x2b, 0xe5, 0x88, 0xfa, 0xfa, 0xe2, 0x3c, 0x15, 0x5b]),
            keyData : Uint8Array.from(pubKeys[4]),
            signature : Uint8Array.from([0xa9, 0xd5, 0x52, 0x60, 0xf7, 0x65, 0x26, 0x1e, 0xb9, 0xb8, 0x4e, 0x10, 0x6f, 0x66, 0x5e, 0x00, 0xb8, 0x67, 0x28, 0x7a, 0x76, 0x19, 0x90, 0xd7, 0x13, 0x59, 0x63, 0xee, 0x0a, 0x7d, 0x59, 0xdc, 0xa5, 0xbb, 0x70, 0x47, 0x86, 0xbe, 0x79, 0xfc, 0x47, 0x6f, 0x91, 0xd3, 0xf3, 0xf8, 0x9b, 0x03, 0x98, 0x4d, 0x80, 0x68, 0xdc, 0xf1, 0xbb, 0x7d, 0xfc, 0x66, 0x37, 0xb4, 0x54, 0x50, 0xac, 0x04]),
            verified: false, // non-canonical point should fail in the verificaton (RFC8032)
        },
        {
            id: "11", // 0 < S < L | A's order = small (non-canonical) | R's order = mixed | (1) = ? | (2) = ? Implementations that reduce A before hashing will accept #10 and accept #11, and viceversa
            message : Uint8Array.from([0x39, 0xa5, 0x91, 0xf5, 0x32, 0x1b, 0xbe, 0x07, 0xfd, 0x5a, 0x23, 0xdc, 0x2f, 0x39, 0xd0, 0x25, 0xd7, 0x45, 0x26, 0x61, 0x57, 0x46, 0x72, 0x7c, 0xee, 0xfd, 0x6e, 0x82, 0xae, 0x65, 0xc0, 0x6f]),
            keyData : Uint8Array.from(pubKeys[4]),
            signature : Uint8Array.from([0xa9, 0xd5, 0x52, 0x60, 0xf7, 0x65, 0x26, 0x1e, 0xb9, 0xb8, 0x4e, 0x10, 0x6f, 0x66, 0x5e, 0x00, 0xb8, 0x67, 0x28, 0x7a, 0x76, 0x19, 0x90, 0xd7, 0x13, 0x59, 0x63, 0xee, 0x0a, 0x7d, 0x59, 0xdc, 0xa5, 0xbb, 0x70, 0x47, 0x86, 0xbe, 0x79, 0xfc, 0x47, 0x6f, 0x91, 0xd3, 0xf3, 0xf8, 0x9b, 0x03, 0x98, 0x4d, 0x80, 0x68, 0xdc, 0xf1, 0xbb, 0x7d, 0xfc, 0x66, 0x37, 0xb4, 0x54, 0x50, 0xac, 0x04]),
            verified: false, // non-canonical point should fail in the verificaton (RFC8032)
        },
        // https://eprint.iacr.org/2020/1244.pdf#section.A.2
        // cases breaking non-repudiation
        {
            id: "12", // 0 < S < L | A's order = small | R's order = mixed | (1) = ? | (2) = ?
            message : Uint8Array.from([0x53, 0x65, 0x6e, 0x64, 0x20, 0x31, 0x30, 0x30, 0x20, 0x55, 0x53, 0x44, 0x20, 0x74, 0x6f, 0x20, 0x41, 0x6c, 0x69, 0x63, 0x65]),
            keyData : Uint8Array.from(pubKeys[5]),
            signature : Uint8Array.from([0xa9, 0xd5, 0x52, 0x60, 0xf7, 0x65, 0x26, 0x1e, 0xb9, 0xb8, 0x4e, 0x10, 0x6f, 0x66, 0x5e, 0x00, 0xb8, 0x67, 0x28, 0x7a, 0x76, 0x19, 0x90, 0xd7, 0x13, 0x59, 0x63, 0xee, 0x0a, 0x7d, 0x59, 0xdc, 0xa5, 0xbb, 0x70, 0x47, 0x86, 0xbe, 0x79, 0xfc, 0x47, 0x6f, 0x91, 0xd3, 0xf3, 0xf8, 0x9b, 0x03, 0x98, 0x4d, 0x80, 0x68, 0xdc, 0xf1, 0xbb, 0x7d, 0xfc, 0x66, 0x37, 0xb4, 0x54, 0x50, 0xac, 0x04]),
            verified: false,
        },
        {
            id: "13", // 0 < S < L | A's order = small | R's order = mixed | (1) = ? | (2) = ?
            message : Uint8Array.from([0x53, 0x65, 0x6e, 0x64, 0x20, 0x31, 0x30, 0x30, 0x30, 0x30, 0x30, 0x20, 0x55, 0x53, 0x44, 0x20, 0x74, 0x6f, 0x20, 0x41, 0x6c, 0x69, 0x63, 0x65]),
            keyData : Uint8Array.from(pubKeys[5]),
            signature : Uint8Array.from([0xa9, 0xd5, 0x52, 0x60, 0xf7, 0x65, 0x26, 0x1e, 0xb9, 0xb8, 0x4e, 0x10, 0x6f, 0x66, 0x5e, 0x00, 0xb8, 0x67, 0x28, 0x7a, 0x76, 0x19, 0x90, 0xd7, 0x13, 0x59, 0x63, 0xee, 0x0a, 0x7d, 0x59, 0xdc, 0xa5, 0xbb, 0x70, 0x47, 0x86, 0xbe, 0x79, 0xfc, 0x47, 0x6f, 0x91, 0xd3, 0xf3, 0xf8, 0x9b, 0x03, 0x98, 0x4d, 0x80, 0x68, 0xdc, 0xf1, 0xbb, 0x7d, 0xfc, 0x66, 0x37, 0xb4, 0x54, 0x50, 0xac, 0x04]),
            verified: false,
        }
    ]
};

import { Injectable } from '@angular/core';
import * as Forge from 'node-forge';
import * as CryptoJS from 'crypto-js';  

@Injectable({
  providedIn: 'root'
})
export class EncriptionService {

  constructor() { }

  encryptSymmetricKeyWithPublicKey(symmetricKey: String, publicKey: string) : string {
    const rsa = Forge.pki.publicKeyFromPem(publicKey);
    return btoa(rsa.encrypt(symmetricKey.toString()));
  }

  decryptSymmetricKeyWithMyPrivateKey(encriptedSymmetricKey: string, myPrivateKey: string) : string {
    const rsa = Forge.pki.privateKeyFromPem(myPrivateKey);
    return rsa.decrypt(atob(encriptedSymmetricKey))
  }

  encryptWithSymmetricKey(key: string, plainText: string) : string {
    return CryptoJS.AES.encrypt(plainText, key.toString()).toString();
  } 

  decryptWithSymmetricKey(key: string, encryptedText: string) {
    return CryptoJS.AES.decrypt((encryptedText), key).toString(CryptoJS.enc.Utf8);
  }
}

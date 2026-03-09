import { Injectable } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import CryptoJS from "crypto-js";


@Injectable({
    providedIn: 'root'

})


export class EncryptionService {

    // Matches the Backend Secret Key exactly
    private secretKey = "MY_SHARED_SECRET_KEY_12345";

    encrypt(value: any): string {
        return CryptoJS.AES.encrypt(JSON.stringify(value), this.secretKey).toString();
    }

    decrypt(textToDecrypt: string): any {
        try {
            const bytes = CryptoJS.AES.decrypt(textToDecrypt, this.secretKey);
            const decryptedString = bytes.toString(CryptoJS.enc.Utf8);
            return decryptedString ? JSON.parse(decryptedString) : null;
        } catch (error) {
            console.error("Decryption failed on frontend:", error);
            return null;
        }
    }
}
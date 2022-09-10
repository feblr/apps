export declare const KeyGenParams: {
    name: string;
    namedCurve: string;
};
export declare const PrivateKeyExportFormat: Exclude<KeyFormat, "jwk">;
export declare const PublicKeyExportFormat: Exclude<KeyFormat, "jwk">;
export declare const SignHashAlgorithm = "SHA-256";
export declare const KeyUsages: KeyUsage[];
export declare class PublicKey {
    format: Exclude<KeyFormat, "jwk">;
    value: string;
}
export declare class Signature {
    name: string;
    hash: string;
    value: string;
}
export declare class Feed {
    id: string;
    title: string;
    desciption: string;
    favicon: string;
    updatedAt: number;
    sources: string[];
    publicKey: PublicKey;
    signature: Signature;
}
export declare function generateKey(subtle: SubtleCrypto): Promise<{
    privateKey: string;
    publicKey: string;
}>;
export declare function sign(subtle: SubtleCrypto, privateKeyHex: string, feed: Feed): Promise<string>;
export declare function verify(subtle: SubtleCrypto, feed: Feed): Promise<boolean>;

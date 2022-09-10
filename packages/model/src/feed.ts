import {
  IsNotEmpty,
  IsNumber,
  MinLength,
  ValidateNested,
} from "class-validator";
import { arrayBufferToHex, hexToArrayBuffer } from "./convert";

export const KeyGenParams = {
  name: "ECDSA",
  namedCurve: "P-256",
};

export const PrivateKeyExportFormat: Exclude<KeyFormat, "jwk"> = "pkcs8";
export const PublicKeyExportFormat: Exclude<KeyFormat, "jwk"> = "raw";

export const SignHashAlgorithm = "SHA-256";

export const KeyUsages: KeyUsage[] = ["sign", "verify"];

export class PublicKey {
  @IsNotEmpty()
  format!: Exclude<KeyFormat, "jwk">;

  @IsNotEmpty()
  value!: string;
}

export class Signature {
  @IsNotEmpty()
  name!: string;

  @IsNotEmpty()
  hash!: string;

  @IsNotEmpty()
  value!: string;
}

export class Feed {
  @IsNotEmpty()
  id!: string;

  @IsNotEmpty()
  title!: string;

  @IsNotEmpty()
  desciption!: string;

  @IsNotEmpty()
  favicon!: string;

  @IsNumber()
  updatedAt!: number;

  @MinLength(1, {
    each: true,
  })
  sources!: string[];

  @IsNotEmpty()
  publicKey!: PublicKey;

  @ValidateNested()
  signature!: Signature;
}

export async function generateKey(subtle: SubtleCrypto) {
  const keyPair = await subtle.generateKey(KeyGenParams, true, KeyUsages);
  const privateKey = await subtle.exportKey(
    PrivateKeyExportFormat,
    keyPair.privateKey
  );
  const publicKey = await subtle.exportKey(
    PublicKeyExportFormat,
    keyPair.publicKey
  );

  return {
    privateKey: arrayBufferToHex(privateKey),
    publicKey: arrayBufferToHex(publicKey),
  };
}

function gather(feed: Feed) {
  const strings = [feed.id, feed.title, feed.desciption, feed.updatedAt];
  for (const source of feed.sources) {
    strings.push(source);
  }
  return new TextEncoder().encode(strings.join(""));
}

export async function sign(
  subtle: SubtleCrypto,
  privateKeyHex: string,
  feed: Feed
) {
  const privateKey = await subtle.importKey(
    PrivateKeyExportFormat,
    hexToArrayBuffer(privateKeyHex),
    KeyGenParams,
    true,
    ["sign"]
  );
  const data = gather(feed);

  const signature = await subtle.sign(
    {
      name: feed.signature.name,
      hash: {
        name: feed.signature.hash,
      },
    },
    privateKey,
    data
  );

  return arrayBufferToHex(signature);
}

export async function verify(subtle: SubtleCrypto, feed: Feed) {
  const publicKey = await subtle.importKey(
    feed.publicKey.format,
    hexToArrayBuffer(feed.publicKey.value),
    KeyGenParams,
    true,
    ["verify"]
  );
  const data = gather(feed);
  const signature = hexToArrayBuffer(feed.signature.value);

  return subtle.verify(
    {
      name: feed.signature.name,
      hash: {
        name: feed.signature.hash,
      },
    },
    publicKey,
    signature,
    data
  );
}

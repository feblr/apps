import { webcrypto } from "node:crypto";
import test from "tape";
import {
  PublicKeyExportFormat,
  Feed,
  KeyGenParams,
  generateKey,
  sign,
  SignHashAlgorithm,
  verify,
} from "../src/feed";

const subtle = webcrypto.subtle;

test("sign and verify should match", async (t) => {
  const { publicKey, privateKey } = await generateKey(subtle);

  const feed = new Feed();
  feed.id = publicKey;
  feed.title = "test";
  feed.desciption = "feed for unit test";
  feed.favicon = "https://localhost/favicon.cc";
  feed.updatedAt = Date.now();
  feed.sources = ["https://localhost/website.rss"];
  feed.publicKey = {
    format: PublicKeyExportFormat,
    value: publicKey,
  };
  feed.signature = {
    name: KeyGenParams.name,
    hash: SignHashAlgorithm,
    value: "",
  };
  console.log(feed);
  const signature = await sign(subtle, privateKey, feed);
  feed.signature.value = signature;
  console.log(feed);

  const result = await verify(subtle, feed);
  t.equals(result, true);
  t.end();
});

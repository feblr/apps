import test from "tape";
import { hexToArrayBuffer, arrayBufferToHex } from "../src/convert";

test("hexToArrayBuffer and arrayBufferToHex should match", (t) => {
  const input = "some random string";
  const arrayBuffer = new TextEncoder().encode(input);
  const output = new TextDecoder().decode(
    hexToArrayBuffer(arrayBufferToHex(arrayBuffer))
  );
  t.equals(input, output);
  t.end();
});

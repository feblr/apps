export function hexToArrayBuffer(input: string) {
  if (input.length % 2 !== 0) {
    throw new RangeError("Expected string to be an even number of characters");
  }

  const view = new Uint8Array(input.length / 2);

  for (let i = 0; i < input.length; i += 2) {
    view[i / 2] = parseInt(input.substring(i, i + 2), 16);
  }

  return view.buffer;
}

export function arrayBufferToHex(arrayBuffer: ArrayBuffer) {
  const view = new Uint8Array(arrayBuffer);
  let result = "";

  for (var i = 0; i < view.length; i++) {
    const value = view[i].toString(16);
    result += value.length === 1 ? "0" + value : value;
  }

  return result;
}

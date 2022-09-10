import { useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import {
  Feed,
  generateKey,
  KeyGenParams,
  PublicKeyExportFormat,
  sign,
  SignHashAlgorithm,
  verify,
} from "@feblr/model";

function App() {
  useEffect(() => {
    async function init() {
      const subtle = window.crypto.subtle;
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
      console.log(result);
    }

    init();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;

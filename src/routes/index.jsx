import { parseUri } from "@walletconnect/utils";
import LegacySignClient from '@walletconnect/client/dist/umd/index.min.js';
import { EIP155_SIGNING_METHODS } from './EIP155Data';
import QRReader from "~/components/QRScanner";
import { createLegacySignClient } from "~/utils/LegacyWalletConnectUtil";
export default function Home() {
  let legacySignClient;
  async function onConnect(uri) {
    try {
      const { version } = (parseUri(uri));
      if (version === 1) {
        createLegacySignClient({ uri });
      } else {
        console.log("awesome, v2 client");
      }
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <main class="text-center flex justify-center p-4">
      <QRReader onConnect={onConnect} />
    </main>
  );
}

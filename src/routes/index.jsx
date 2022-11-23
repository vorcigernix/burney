import { parseUri } from "@walletconnect/utils";
import Modal from '~/components/ConnectModal';
import QRReader from "~/components/QRScanner";
import { createLegacySignClient } from "~/utils/LegacyWalletConnectUtil";
import { createOrRestoreEIP155Wallet } from "~/utils/EIP155WalletUtil.js";
import walletState from '~/components/WalletState';
import { createSignal, createEffect, onMount } from 'solid-js';
export default function Home() {
  const [method, setMethod] = createSignal("");
  const { pload, changeWallet } = walletState;


  onMount(() => {
    const wallet = changeWallet(createOrRestoreEIP155Wallet());
  });


  createEffect(() => {
    if (pload()) setMethod(pload().method);
  });


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
      {method() === "" && (
        <QRReader onConnect={onConnect} />
      )}
      {method() === "session_request" && (
        <Modal payload={pload()} />)}
    </main>
  );
}

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
    changeWallet(createOrRestoreEIP155Wallet());
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
    <>
      <div class="hidden lg:flex items-center justify-between p-6 border-l-8 sm:py-8 border-amber-400 bg-gray-900 text-gray-100 mx-6">
        <span>Hello there. This application is intended for mobile use.</span><a href="/about" class="underline font-bold">Read more here</a>
      </div>
      <main class="text-center flex justify-center p-2">
        {method() === "" && (
          <QRReader onConnect={onConnect} />
        )}
        {method() === "session_request" && (
          <Modal payload={pload()} />)}
      </main>
    </>
  );
}

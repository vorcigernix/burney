import { A } from "solid-start";
export default function About() {
  return (
    <>
      <section class="bg-zinc-600/60 lg:bg-zinc-900/90 lg:m-6 backdrop-blur-lg text-zinc-50 m-2">
        <div class="container flex flex-col justify-center p-4 mx-auto md:p-8">
          <p class="p-2 text-sm font-medium tracking-wider text-center uppercase">How it works</p>
          <h2 class="mb-8 text-4xl font-bold leading-none text-center sm:text-5xl">Frequently Asked Questions</h2>
          <div class="flex flex-col divide-y sm:px-8 lg:px-12 xl:px-32 divide-gray-700">
          <details>
              <summary class="py-4 outline-none cursor-pointer focus:underline">What this application do?</summary>
              <div class="px-4 pb-4">
                <p>This is a web version of "wallet". Wallets are used for blockchain (web3) applications as a tools to provide authentication via unique address and to sign transactions using a private key.</p>
                <p>Web3 applications needs a wallet installed on the user computer, most common software for this is called Metamask.</p>
                <p>We are not a competition to a Metamask, this is a "burn" wallet. It is expected to be used for testing applications or onboarding. While it does work the same way as other wallets, recovery phrase cannot be stored safely in a browser environment and we discourage using this wallet for storing assets.</p>
              </div>
            </details>
            <details>
              <summary class="py-4 outline-none cursor-pointer focus:underline">Is using web page as wallet safe?</summary>
              <div class="px-4 pb-4">
                <p>No. The purpose of this wallet is to substitute in the situation when you don't have any wallet or you want to anonymize access to a particular application. Please do not send any assets to this wallet.</p>
              </div>
            </details>
            <details>
              <summary class="py-4 outline-none cursor-pointer focus:underline">Is it legal?</summary>
              <div class="px-4 pb-4">
                <p>Absolutely. This web application use the very same WalletConnect libraries as other wallets.</p>
              </div>
            </details>
            <details>
              <summary class="py-4 outline-none cursor-pointer focus:underline">Can I migrate to other wallets?</summary>
              <div class="px-4 pb-4 space-y-2">
                <p>Yes, it is actaully our intent. If you copy the recovery phrase to the other wallet, you will have the very same wallet content as you see here.</p>
                <p>Wallets in blockchain actually does not store any data except your private key that is used for accessing assets on blockchain.</p>
              </div>
            </details>
          </div>
        </div>
      </section>
      <section class="bg-zinc-600/60 lg:bg-zinc-900/90 lg:m-6 backdrop-blur-lg text-zinc-50 m-2">
        <div class="container flex flex-col justify-center p-4 mx-auto md:p-8">
          <p class="p-2 text-sm font-medium tracking-wider text-center uppercase">Why this exist</p>
          <h2 class="mb-8 text-4xl font-bold leading-none text-center sm:text-5xl">Use Cases</h2>
          <div class="flex flex-col divide-y sm:px-8 lg:px-12 xl:px-32 divide-gray-700">
            <details>
              <summary class="py-4 outline-none cursor-pointer focus:underline">Privacy</summary>
              <div class="px-4 pb-4">
                <p>There is a growing trend of web3 applications tracking their users by their address. You can have a lot of addresses in a wallet, but this application makes this use case more convenient and secure.</p><p> Our application does not have any access nor knowledge of your other wallets.</p>
              </div>
            </details>
            <details>
              <summary class="py-4 outline-none cursor-pointer focus:underline">Security</summary>
              <div class="px-4 pb-4">
                <p>It is relatively easy to trick you (or anyone else) to sign a transaction that will do a permanent damage to your assets. </p>
                <p>There is a saying "do not sign gibberish" but in reality you may want to try an application that you don't completely trust - our wallet is perfect for that. If you don't save you wallet, you simply close the application and the wallet you were using is burned. Next time, you will have a different address and recovery phrase.</p>
                <p>That does not mean that assets on this wallet are safe. If you think that you want to keep assets you gathered using our wallet, please migrate your address immediately and <a href="/wallet" class="font-bold underline">delete your address</a> from this wallet.</p>
              </div>
            </details>
            <details>
              <summary class="py-4 outline-none cursor-pointer focus:underline">Onboarding</summary>
              <div class="px-4 pb-4 space-y-2">
                <p>~80% of users can't or won't install wallet as a plugin on their PC. Some of them can install mobile wallet, but even this create a considerable friction for any application.</p>
                <p>Burney solves this by creating a wallet that does not need any installation. Users can try your application with zero risk</p>
              </div>
            </details>
          </div>
        </div>
      </section>
    </>
  );
}

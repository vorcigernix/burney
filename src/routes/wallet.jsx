import walletState from "../components/WalletState";
import { createOrRestoreEIP155Wallet, storeEIP155Wallet } from "~/utils/EIP155WalletUtil.js";
export default function WalletPage() {
    const { wallet, changeWallet } = walletState;
    //this should be called by refresh button
    async function refreshWallet() {
        await changeWallet(createOrRestoreEIP155Wallet());
    }
    async function saveWallet() {
        storeEIP155Wallet(wallet().mnemonic);
    }
    async function deleteWallet() {
        localStorage.removeItem('EIP155_MNEMONIC_1');
        window.location.reload();
    }

    if (!wallet()) refreshWallet();
    const mnemonicTokens = wallet().mnemonic.split(" ");


    return (
        <main class="flex justify-center p-2">
            <div class="flex w-full mb-8 sm:px-4 md:w-1/2 lg:w-1/3 lg:mb-0">
                <div class="flex flex-col p-6 space-y-6 shadow sm:p-8 bg-amber-400/60 backdrop-blur-lg text-zinc-900">
                    <div class="space-y-2">
                        <h4 class="text-2xl font-bold">Wallet</h4>
                        <span class="text-6xl font-bold">{wallet().eip155Addresses[0].slice(0, 5)}
                        </span>
                        <span class="text-sm tracking-wide break-all">{wallet().eip155Addresses[0].slice(5)}</span>
                    </div>
                    <details class="flex-1 space-y-2">
                        <summary class="py-2 outline-none cursor-pointer focus:underline">Reveal recovery</summary>
                        <For each={mnemonicTokens} fallback={<div>Loading...</div>}>

                            {(item) =>
                                <div class="flex items-center space-x-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="flex-shrink-0 w-6 h-6">
                                        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                                    </svg>
                                    <span>{item}</span>
                                </div>
                            }
                        </For>
                    </details>
                    <p class="leading-relaxed">Waiting for transaction... </p>
                    <div class="flex text-zinc-800">
                        <button onClick={saveWallet} class="inline-block w-full px-5 py-3 font-bold tracking-wider text-center bg-zinc-800 text-amber-400">Save</button>
                        <button onclick={deleteWallet}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-12 h-12 p-3">
                                <path fill-rule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z" clip-rule="evenodd" />
                            </svg>
                        </button>
                    </div>
                    <p class="leading-relaxed text-sm">Save wallet to your browser storage. Not considered safe, please do not send any assets to the wallet you saved.</p>
                </div>
            </div>

        </main>
    );
}
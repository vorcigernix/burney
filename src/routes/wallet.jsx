import { createLegacySignClient } from "~/utils/LegacyWalletConnectUtil";
import walletState from "../components/WalletState";
import { createEffect, createSignal, onMount, Show } from "solid-js";
import {
    createOrRestoreEIP155Wallet,
    storeEIP155Wallet,
} from "~/utils/EIP155WalletUtil.js";

import { approveEIP155Request, rejectEIP155Request } from '~/utils/EIP155RequestHandlerUtil';

export default function WalletPage() {
    const { wallet, changeWallet, pload, changePayload } = walletState;
    const [walletInstance, setWalletInstance] = createSignal(wallet());
    async function saveWallet() {
        storeEIP155Wallet(walletInstance().mnemonic);
    }
    async function deleteWallet() {
        createEffect(() => {
            localStorage.removeItem("EIP155_MNEMONIC_1");
            changePayload(null);
            changeWallet(createOrRestoreEIP155Wallet());
        });
    }
    const mnemonicTokens = () => { return walletInstance()?.mnemonic.split(" "); };
    onMount(async () => {
        if (!walletInstance()) {
            changeWallet(createOrRestoreEIP155Wallet());
            setWalletInstance(wallet());
        }
    });
    //console.log(pload());
    // Handle approve action
    async function onApprove() {
        if (!pload()) return;
        const { id, method, params } = pload();
        const { result } = await approveEIP155Request({
            id,
            topic: '',
            params: { request: { method, params }, chainId: '1' }
        });
        console.log(result);
        legacySignClient.approveRequest({
            id,
            result
        });
    }

    // Handle reject action
    async function onCancel() {
        if (pload()) {
            const { error } = rejectEIP155Request({
                id,
                topic: '',
                params: { request: { method, params }, chainId: '1' }
            });
            legacySignClient.rejectRequest({
                id,
                error
            });
        }
    }
    const _legacySignClient = createLegacySignClient();

    return (
        <main class="flex justify-center p-2">
            <div class="flex w-full mb-8 md:w-1/2 lg:w-1/3 lg:mb-0">
                <div class="flex flex-col shadow bg-amber-400/60 backdrop-blur-lg text-zinc-900">
                    <div class="space-y-2 p-6">
                        <h4 class="text-2xl font-bold">Wallet</h4>
                        <span class="text-6xl font-bold">
                            {wallet() && wallet().eip155Addresses[0].slice(0, 5)}
                        </span>
                        <span class="text-sm tracking-wide break-all">
                            {wallet() && wallet().eip155Addresses[0].slice(5)}
                        </span>
                        <Show when={mnemonicTokens()} fallback={<div>Generating...</div>}>
                            <details class="flex-1 space-y-2">

                                <summary class="py-2 outline-none cursor-pointer focus:underline">
                                    Reveal recovery
                                </summary>
                                <For each={mnemonicTokens()} >
                                    {(item) => (
                                        <div class="flex items-center space-x-2">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 20 20"
                                                fill="currentColor"
                                                class="flex-shrink-0 w-6 h-6"
                                            >
                                                <path
                                                    fill-rule="evenodd"
                                                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                                    clip-rule="evenodd"
                                                >
                                                </path>
                                            </svg>
                                            <span>{item}</span>
                                        </div>
                                    )}
                                </For>
                            </details>
                        </Show>
                    </div>


                    <Show when={pload() && pload().method === "session_request"}>
                        <div class="flex flex-col w-full p-6">
                            <div class="flex items-center justify-start space-x-2">
                                <div class="w-2 h-2 rounded-full animate-ping bg-black mr-2"></div>
                                awaiting transaction
                            </div>
                        </div>
                    </Show>
                    <Show when={pload() && pload().method === "eth_sendTransaction"}>
                        <div class="flex flex-col w-full bg-white/25 p-2 mb-4">
                            <div class="flex items-center justify-start space-x-2">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6 mr-2">
                                    <path d="M10.464 8.746c.227-.18.497-.311.786-.394v2.795a2.252 2.252 0 01-.786-.393c-.394-.313-.546-.681-.546-1.004 0-.323.152-.691.546-1.004zM12.75 15.662v-2.824c.347.085.664.228.921.421.427.32.579.686.579.991 0 .305-.152.671-.579.991a2.534 2.534 0 01-.921.42z" />
                                    <path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 6a.75.75 0 00-1.5 0v.816a3.836 3.836 0 00-1.72.756c-.712.566-1.112 1.35-1.112 2.178 0 .829.4 1.612 1.113 2.178.502.4 1.102.647 1.719.756v2.978a2.536 2.536 0 01-.921-.421l-.879-.66a.75.75 0 00-.9 1.2l.879.66c.533.4 1.169.645 1.821.75V18a.75.75 0 001.5 0v-.81a4.124 4.124 0 001.821-.749c.745-.559 1.179-1.344 1.179-2.191 0-.847-.434-1.632-1.179-2.191a4.122 4.122 0 00-1.821-.75V8.354c.29.082.559.213.786.393l.415.33a.75.75 0 00.933-1.175l-.415-.33a3.836 3.836 0 00-1.719-.755V6z" clip-rule="evenodd" />
                                </svg>
                                Received Send transaction
                            </div>
                            <p class="text-sm pt-2"> This usually requires funding on your wallet (we discourage sending any assets on Burney)</p>
                            <div class="flex flex-col justify-end gap-3 mt-6 sm:flex-row">
                                <button onClick={onCancel} class="px-6 py-2 ">Cancel</button>
                                <button onClick={onApprove} class="px-6 py-2 shadow-sm bg-amber-400 text-zinc-900">
                                    Approve
                                </button>
                            </div>
                        </div>
                    </Show>
                    <div class="flex text-zinc-800 px-6 mt-12">
                        <button
                            onClick={saveWallet}
                            class="inline-block w-full px-5 py-3 font-bold tracking-wider text-center bg-zinc-800 text-amber-400"
                        >
                            Save Wallet
                        </button>
                        <button onclick={deleteWallet}>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                class="w-12 h-12 p-3"
                            >
                                <path
                                    fill-rule="evenodd"
                                    d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z"
                                    clip-rule="evenodd"
                                />
                            </svg>
                        </button>
                    </div>
                    <p class="leading-relaxed text-sm px-6 pb-4 mt-2">
                        Save wallet to your browser storage. Not considered safe, please do
                        not send any assets to the wallet you saved.
                    </p>
                </div>
            </div>
        </main>
    );
}

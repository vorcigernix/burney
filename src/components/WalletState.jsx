import { createSignal, createRoot } from "solid-js";

function createWalletState() {
    const [pload, setPload] = createSignal(null);
    const [wallet, setWallet] = createSignal(null);
    const changePayload = (u) => setPload(u);
    const changeWallet = (w) => setWallet(w);
    return { pload, changePayload, wallet, changeWallet };
}

export default createRoot(createWalletState);
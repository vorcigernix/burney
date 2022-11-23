import { createSignal, createRoot } from "solid-js";

function createWalletState() {
    const [pload, setPload] = createSignal(null);
    const changePayload = (u) => setPload(u);
    return { pload, changePayload };
}

export default createRoot(createWalletState);
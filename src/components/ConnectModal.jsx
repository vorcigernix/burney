import { legacySignClient } from "~/utils/LegacyWalletConnectUtil";
import walletState from "../components/WalletState";
import { getSdkError } from "@walletconnect/utils";
import { useNavigate } from "solid-start";
export default function Modal({ payload }) {
    const { params } = payload;
    if (!params) return;
    const { peerMeta, chainId } = params[0];
    const { wallet, changePayload } = walletState;
    const navigate = useNavigate();
    //console.log(wallet());
    async function onApprove() {
        try {
            if (wallet()) {
                legacySignClient.approveSession({
                    accounts: wallet().eip155Addresses,
                    chainId: chainId ?? 1,
                });
            }
            navigate("/wallet");
        }
        catch {
            console.log("hmmm..failed to approve");
        }
    }
    async function onCancel() {
        legacySignClient.rejectSession(getSdkError("USER_REJECTED_METHODS"));
        changePayload(null);
        navigate("/");
    }
    return (
        <>
            <div class="flex flex-col max-w-md gap-2 p-6 shadow-md bg-zinc-900/60 backdrop-blur-lg text-zinc-100 border-white/10 border-2">
                <h2 class="flex items-center gap-2 text-xl font-semibold leading-tight tracking-wide">
                    <img
                        class="w-12 h-12 shrink-0 rounded-full"
                        alt="network icon"
                        src={peerMeta?.icons[0]}
                    />
                    {peerMeta?.name}
                </h2>
                <p class="flex-1 text-zinc-200 mt-8">{peerMeta?.description}</p>
                <div class="flex flex-col justify-end gap-3 mt-6 sm:flex-row">
                    <button onClick={onCancel} class="px-6 py-2 ">Cancel</button>
                    <button onClick={onApprove} class="px-6 py-2 shadow-sm bg-amber-400 text-zinc-900">
                        Connect
                    </button>
                </div>
            </div>
        </>
    );
}

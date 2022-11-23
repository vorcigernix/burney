export default function Modal({ payload }) {
    const { params } = payload;
    const { peerMeta } = params[0];
    //console.log(peerMeta);
    return (
        <>
            <div class="flex flex-col max-w-md gap-2 p-6 shadow-md bg-gray-900/60 backdrop-blur-lg text-gray-100 border-white/10 border-2">
                <h2 class="flex items-center gap-2 text-xl font-semibold leading-tight tracking-wide">
                    <img class="w-12 h-12 shrink-0 rounded-full" alt="network icon" src={peerMeta?.icons[0]} />
                    {peerMeta?.name}
                </h2>
                <p class="flex-1 text-gray-200 mt-8">{peerMeta?.description}</p>
                <div class="flex flex-col justify-end gap-3 mt-6 sm:flex-row">
                    <button class="px-6 py-2 ">Cancel</button>
                    <button class="px-6 py-2 shadow-sm bg-amber-400 text-gray-900">Connect</button>
                </div>
            </div>
        </>
    );


}
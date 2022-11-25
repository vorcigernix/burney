import { createEffect, createSignal } from "solid-js";
import { A } from "solid-start";
import QrScanner from "qr-scanner";
export default function QRReader({ onConnect }) {
  const [count, setCount] = createSignal(0);
  const [scanResult, setScanResult] = createSignal(null);
  let videoRef;
  let scanner;

  createEffect(async () => {
    const qrScanner = new QrScanner(
      videoRef,
      async (result) => {
        //console.log(result.data);
        qrScanner.stop();
        onConnect(result.data);
        //await scanPass(result.data);
      },
      {
        preferredCamera: "environment",
        highlightScanRegion: false,
      },
    );
    scanner = qrScanner;
  }, []);
  return (
    <div class="flex flex-col justify-center items-center">
      <video
        ref={videoRef}
        className="object-cover w-full max-w-sm h-96 mb-8 mix-blend-screen opacity-60"
        muted
        id="scanner"
        poster="qr-code-animation.gif"
      />
      <div class="flex text-amber-400">
        <button
          class="w-48 flex justify-center items-center px-6 h-12 uppercase font-semibold tracking-wider border-2 border-black bg-amber-400 text-black"
          onClick={() => scanner.start()}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" class="w-6 h-6 mr-2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 013.75 9.375v-4.5zM3.75 14.625c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5a1.125 1.125 0 01-1.125-1.125v-4.5zM13.5 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 0113.5 9.375v-4.5z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 6.75h.75v.75h-.75v-.75zM6.75 16.5h.75v.75h-.75v-.75zM16.5 6.75h.75v.75h-.75v-.75zM13.5 13.5h.75v.75h-.75v-.75zM13.5 19.5h.75v.75h-.75v-.75zM19.5 13.5h.75v.75h-.75v-.75zM19.5 19.5h.75v.75h-.75v-.75zM16.5 16.5h.75v.75h-.75v-.75z" />
          </svg>

          Scan
        </button>
        <A href="/about">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-12 h-12 bg-black p-2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
          </svg>
        </A>
      </div>
    </div>
  );
}

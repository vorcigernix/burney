import { A } from "solid-start";
import { createSignal } from "solid-js";

export default function Nav() {

    const [open, setOpen] = createSignal(false);

    return (
        <nav class="flex flex-wrap items-center justify-center py-6  mx-auto sticky top-0 z-50">
            <div class="container flex flex-wrap items-center justify-between xl:max-w-screen-xl px-3">
                <div class="w-full relative flex justify-between xl:w-auto xl:static xl:block xl:justify-start">
                    <A
                        class="ml-2 text-amber-400 font-bold text-xl leading-relaxed flex items-center justify-center"
                        href="/"
                        onClick={() => setOpen(false)}
                    >

                        BURNEY
                    </A>
                    <button
                        class="text-white cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent bg-transparent block xl:hidden outline-none focus:outline-none focus:bg-amber-400"
                        type="button"
                        onClick={() => setOpen(open ? true : false)}
                    >
                        ☰
                    </button>
                </div>

                <div class={open() ? 'block w-full' : 'xl:flex flex-grow items-center hidden'} id="navbar">

                    <div class="flex flex-grow items-center bg-amber-400 text-black">
                        <ul
                            class="flex flex-col xl:flex-row xl:flex-grow-0 xl:mt-0 list-none xl:ml-auto text-base flex-grow my-8 xl:my-0"
                        >
                            <li>
                                <A
                                    href="/"
                                    class="px-5 py-2 flex items-center leading-snug hover:opacity-75"
                                    onClick={() => setOpen(false)}
                                    activeClass="activeLink" >Scan</A>
                            </li>
                            <li>
                                <A
                                    href="/manual"
                                    class="px-5 py-2 flex items-center leading-snug hover:opacity-75"
                                    onClick={() => setOpen(false)}
                                    activeClass="activeLink" >Wallet</A>
                            </li>
                            <li>
                                <A
                                    href="/schedule"
                                    class="px-5 py-2 flex items-center leading-snug hover:opacity-75"
                                    onClick={() => setOpen(false)}
                                    activeClass="activeLink" >About</A>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </nav>

    );
}
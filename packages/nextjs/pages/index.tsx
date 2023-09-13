import Link from "next/link";
import type { NextPage } from "next";
import { BanknotesIcon, BugAntIcon, MagnifyingGlassIcon, SparklesIcon } from "@heroicons/react/24/outline";
import { MetaHeader } from "~~/components/MetaHeader";

const Home: NextPage = () => {
  return (
    <>
      <MetaHeader />
      <div className="flex items-center flex-col flex-grow pt-10 bg-[url('/assets/background.jpeg')] bg-fixed">
        <div className="px-0">
          <h1 className="text-center mb-8">
            <span className="block bg-[url('/assets/hoarder.png')] text-accent text-5xl mb-2">Welcome to</span>
            <span className="block bg-[url('/assets/hoarder.png')] text-accent text-8xl font-bold">
              BOP by M.H.G.N Hoarding Gateway
            </span>
          </h1>
          <p className="text-center text- bg-[url('/assets/background.jpeg')]">
            Your only as good as your network!{" "}
            <div>
              {" "}
              <code className="italic bg-[url('/assets/background.jpeg')]  text-4xl font-bold max-w-full break-words break-all inline-block">
                Join the M.H.G.N ecosystem today!
              </code>
            </div>
          </p>
          <p className="text-center text-2xl text-accent">
            This dApp allows Hoarders to interact with{" "}
            <code className="italic bg-[url('/assets/background.jpeg')] text-2xl text-white font-bold max-w-full break-words break-all inline-block">
              BOP by MHGN
            </code>{" "}
            our first live on chain digital asset.
          </p>
        </div>

        <div className="flex-grow bg-center bg-[url('/assets/hoarder.png')] bg-no-repeat w-full mt-16 px-8 py-12">
          <div className="flex justify-center items-center gap-12 flex-col sm:flex-col">
            <div className="flex flex-col bg-[url('/assets/background.jpeg')] px-10 py-10 text-center items-center max-w-xs rounded-3xl">
              <BugAntIcon className="h-8 w-8 fill-secondary" />
              <p>
                Fully interact with M.H.G.N smart contract using the{" "}
                <Link href="/debug" passHref className="link">
                  <div></div>
                  Full Interaction
                </Link>{" "}
                tab.
              </p>
            </div>
            <div className="flex flex-col bg-[url('/assets/background.jpeg')] px-10 py-10 text-center items-center max-w-xs rounded-3xl">
              <SparklesIcon className="h-8 w-8 fill-secondary" />
              <p>
                Check Out <div></div>
                <Link href="https://moneyhoardersglobal.net" passHref className="link">
                  M.H.G.N Official Website
                </Link>{" "}
                <div></div>
                for ecosystem updates & more.
              </p>
            </div>
          </div>
        </div>
        <div className="flex-grow  w-full mt-16 px-8 py-12">
          <div className="flex justify-center items-center gap-12 flex-col sm:flex-row">
            <div className="flex flex-col bg-[url('/assets/background.jpeg')] px-10 py-10 text-center items-center max-w-xs rounded-3xl">
              <BanknotesIcon className="h-8 w-8 fill-secondary" />
              <p>
                Hoard your MHGD using the{" "}
                <Link href="/mhgd-ui" passHref className="link">
                  MHGD UI
                </Link>{" "}
                tab.
              </p>
            </div>
            <div className="flex flex-col bg-[url('/assets/background.jpeg')] px-10 py-10 text-center items-center max-w-xs rounded-3xl">
              <SparklesIcon className="h-8 w-8 fill-secondary" />
              <p>
                Hoard your BOP by MHGN <div></div>
                using the
                <div></div>
                <Link href="/example-ui" passHref className="link">
                  BOP UI
                </Link>{" "}
              </p>
            </div>
            <div className="flex flex-col bg-[url('/assets/background.jpeg')] px-10 py-10 text-center items-center max-w-xs rounded-3xl">
              <MagnifyingGlassIcon className="h-8 w-8 fill-secondary" />
              <p>
                Explore your local transactions with the{" "}
                <Link href="/blockexplorer" passHref className="link">
                  Block Explorer
                </Link>{" "}
                tab.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;

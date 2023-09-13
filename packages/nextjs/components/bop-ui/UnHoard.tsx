import { useState } from "react";
import { ArrowSmallRightIcon } from "@heroicons/react/24/outline";
import { useScaffoldContractWrite } from "~~/hooks/scaffold-eth";

export const UnHoard = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [visible, setVisible] = useState(true);

  const { writeAsync, isLoading } = useScaffoldContractWrite({
    contractName: "BopHoardingContract",
    functionName: "Unhoard",
    onBlockConfirmation: txnReceipt => {
      console.log("📦 Transaction blockHash", txnReceipt.blockHash);
    },
  });

  return (
    <div className="flex bg-[url('/assets/background.jpeg')] relative pb-10">
      <div className="flex flex-col w-full mx-5 sm:mx-8 2xl:mx-20 items-center">
        <div className={`mt-10 flex gap-2 ${visible ? "" : "invisible"} max-w-2xl`}>
          <div className="flex flex-col mt-6 px-7 py-8 bg-base-200 opacity-80 rounded-2xl shadow-lg border-2 border-primary items-center">
            <span className="text-4xl sm:text-6xl text-black">UnHoard BOP</span>

            <div className="mt-8 flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-5">
              <div className="flex rounded-full border border-primary p-1 flex-shrink-0">
                <div className="flex rounded-full border-2 border-primary p-1">
                  <button
                    className="btn btn-secondary rounded-full capitalize font-normal font-white w-24 flex items-center gap-1 hover:gap-2 transition-all tracking-widest"
                    onClick={() => writeAsync()}
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <span className="loading loading-spinner loading-sm"></span>
                    ) : (
                      <>
                        UnHoard <ArrowSmallRightIcon className="w-3 h-3 mt-0.5" />
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
            <div className="mt-4 flex gap-2 items-start">
              <span className="text-md leading-tight">Project 6:</span>
              <div className="badge badge-warning">Hoarding time must be greater than 360 seconds to UnHoard</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

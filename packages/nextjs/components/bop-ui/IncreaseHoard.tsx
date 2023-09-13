/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";
import { ArrowSmallRightIcon } from "@heroicons/react/24/outline";
import { useScaffoldContractWrite } from "~~/hooks/scaffold-eth";

export const IncreaseHoard = () => {
  const [visible, setVisible] = useState(true);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_amount, setAmount] = useState("");

  const { writeAsync, isLoading } = useScaffoldContractWrite({
    contractName: "BopHoardingContract",
    functionName: "IncreaseHoard",
    args: [_amount],
    onBlockConfirmation: txnReceipt => {
      console.log("📦 Transaction blockHash", txnReceipt.blockHash);
    },
  });

  return (
    <div className="flex bg-[url('/assets/background.jpeg')] relative pb-10">
      <div className="flex flex-col w-full mx-5 sm:mx-8 2xl:mx-20">
        <div className="flex flex-col mt-6 px-7 py-8 bg-base-200 opacity-80 rounded-2xl shadow-lg border-2 border-primary">
          <span className="text-4xl sm:text-6xl text-black">Increase Your Hoard</span>

          <div className="mt-8 flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-5">
            <input
              type="text"
              placeholder="Amount"
              className="input font-bai-jamjuree w-full px-5 bg-[url('/assets/background.jpeg')] bg-[length:100%_100%] border border-primary text-neutral text-lg sm:text-2xl placeholder-white uppercase"
              onChange={e => setAmount(e.target.value)}
            />
            <div className="flex rounded-full border border-primary p-1 flex-shrink-0">
              <div className="flex rounded-full border-2 border-primary p-1">
                <button
                  className="btn btn-primary rounded-full capitalize font-normal font-white w-24 flex items-center gap-1 hover:gap-2 transition-all tracking-widest"
                  onClick={() => writeAsync()}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <span className="loading loading-spinner loading-sm"></span>
                  ) : (
                    <>
                      Hoard <ArrowSmallRightIcon className="w-3 h-3 mt-0.5" />
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

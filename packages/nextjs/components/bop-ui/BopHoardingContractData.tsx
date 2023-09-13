/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from "react";
import Image from "next/image";
import { formatEther } from "ethers";
import { useAccount } from "wagmi";
import {
  useScaffoldContract,
  useScaffoldContractRead,
  useScaffoldContractWrite,
  useScaffoldEventHistory,
  useScaffoldEventSubscriber,
} from "~~/hooks/scaffold-eth";

export const BopHoardingContractData = () => {
  const { address } = useAccount();

  const { data: bopTokenSymbol } = useScaffoldContractRead({
    contractName: "BopToken",
    functionName: "symbol",
  });

  const { data: bopTokenBalance } = useScaffoldContractRead({
    contractName: "BopToken",
    functionName: "balanceOf",
    args: [address],
  });

  const { data: bopTokenAllowance } = useScaffoldContractRead({
    contractName: "BopToken",
    functionName: "allowance",
    args: [address, "0x0860A1883FA630Beb62a51482f94Fecf63937166"],
  });

  const { data: hoardingBalance } = useScaffoldContractRead({
    contractName: "BopHoardingContract",
    functionName: "Check_Bop_Hoarded_Balance",
    args: [address],
  });

  const { data: calculateReward } = useScaffoldContractRead({
    contractName: "BopHoardingContract",
    functionName: "calculateReward",
    args: [address],
  });

  const { data: GetHoardingingTimeInSeconds } = useScaffoldContractRead({
    contractName: "BopHoardingContract",
    functionName: "GetHoardingingTimeInSeconds",
    args: [address],
  });

  const { data: totalHoarded } = useScaffoldContractRead({
    contractName: "BopHoardingContract",
    functionName: "hoarders",
    args: [address],
  });

  const { data: totalSupply } = useScaffoldContractRead({
    contractName: "BopToken",
    functionName: "totalSupply",
  });

  const { data: Total_Hoarders } = useScaffoldContractRead({
    contractName: "BopHoardingContract",
    functionName: "Total_Hoarders",
  });

  const { data: Total_Reward_Pool } = useScaffoldContractRead({
    contractName: "BopHoardingContract",
    functionName: "Total_Reward_Pool",
  });

  const { data: hoarded } = useScaffoldContractRead({
    contractName: "BopHoardingContract",
    functionName: "totalHoarded",
  });

  useScaffoldEventSubscriber({
    contractName: "BopHoardingContract",
    eventName: "Hoarded",
    listener: logs => {
      logs.map(log => {
        const { user, amount } = log.args;
        console.log("📡 Hoarded event", user, amount);
      });
    },
  });

  const {
    data: hoardedEvents,
    isLoading: isLoadingEvents,
    error: errorReadingEvents,
  } = useScaffoldEventHistory({
    contractName: "BopHoardingContract",
    eventName: "Hoarded",
    fromBlock: process.env.NEXT_PUBLIC_DEPLOY_BLOCK ? BigInt(process.env.NEXT_PUBLIC_DEPLOY_BLOCK) : 0n,
    filters: { user: address },
    blockData: true,
  });

  console.log("Events:", isLoadingEvents, errorReadingEvents, hoardedEvents);

  const { data: bopHoardingContract } = useScaffoldContract({ contractName: "BopHoardingContract" });
  console.log("bopHoardingContract: ", bopHoardingContract);

  return (
    <div className="flex flex-col justify-center items-center bg-[url('/assets/background.jpeg')] bg-[length:100%_100%] py-10 px-5 sm:px-0 lg:py-auto max-w-[100vw] ">
      <div
        className={`flex flex-col max-w-full items-center bg-accent bg-opacity-100 rounded-2xl shadow-lg px-5 py-4 w-full }`}
      >
        <div className="text-6xl text-right min-w-[3rem] px-2 py-1 flex justify-end font-bai-jamjuree">
          Welcome Hoarder
        </div>
        This is the BOP by MHGN User Interface
        <div className="flex relative w-40 h-40">
          <Image alt="SE2 logo" className="cursor-pointer" fill src="/bop_logo.png" />
        </div>
      </div>
      <p>
        {" "}
        <div className="text-xl text-accent">
          Your wallet balance:{" "}
          <div className="inline-flex items-center justify-center text-white">
            {parseFloat(formatEther(bopTokenBalance || "0")).toFixed(2)}
            <span className="font-bold ml-1">{bopTokenSymbol}</span>
          </div>
        </div>
      </p>
      <p>
        {" "}
        <div className="text-xl text-accent">
          Hoarding Contract Allowance:{" "}
          <div className="inline-flex items-center justify-center text-white">
            {parseFloat(formatEther(bopTokenAllowance || "0")).toFixed(2)}
            <span className="font-bold ml-1">{bopTokenSymbol}</span>
          </div>
        </div>
      </p>
      <p>
        {" "}
        <div className="text-xl text-accent">
          You Hoarded:{" "}
          <div className="inline-flex items-center justify-center text-white">
            {parseFloat(formatEther(hoardingBalance || "0")).toFixed(2)}
            <span className="font-bold ml-1">{bopTokenSymbol}</span>
          </div>
        </div>
      </p>
      <div className="block justify-between w-full">
        <div className="bg-accent border border-primary rounded-xl flex">
          <div className="p-2 py-1 border-r border-primary flex items-top w-min">Total Hoarders</div>
          <div className="text-2xl text-right min-w-[3rem] px-2 py-1 flex justify-end font-bai-jamjuree">
            {Total_Hoarders?.toString() || "0"}
          </div>
        </div>
        <div className="bg-accent border border-primary rounded-xl flex">
          <div className="p-2 py-1 border-r border-primary flex items-top w-min">Total Reward Pool</div>
          <div className="text-2xl text-right min-w-[3rem] px-2 py-1 flex justify-end font-bai-jamjuree">
            {parseFloat(formatEther(Total_Reward_Pool || "0")).toFixed(2)}
          </div>
        </div>
        <div className="bg-accent border border-primary rounded-xl flex">
          <div className="p-2 py-1 border-r border-primary flex items-top w-min">Total Hoarded</div>
          <div className="text-2xl text-right min-w-[3rem] px-2 py-1 flex justify-end font-bai-jamjuree">
            {parseFloat(formatEther(hoarded || "0")).toFixed(2)}
          </div>
        </div>
        <div className="bg-accent border border-primary rounded-xl flex">
          <div className="p-2 py-1 border-r border-primary flex items-top w-min">Hoarding Stats</div>
          <div className="text-2xl text-right min-w-[3rem] px-2 py-1 flex justify-end font-bai-jamjuree">
            {totalHoarded?.toString() || "0"}
          </div>
        </div>
        <div>
          <div className="flex justify-between w-full">
            <div className="bg-accent border border-primary rounded-xl flex">
              <div className="p-2 py-1 border-r border-primary flex items-top w-min">Total Supply</div>
              <div className="text-2xl text-right min-w-[3rem] px-2 py-1 flex justify-end font-bai-jamjuree">
                {parseFloat(formatEther(totalSupply || "0")).toFixed(2)}
              </div>
            </div>
          </div>
        </div>
      </div>
      <p></p>
      <div className="grid lg:grid-cols-3 flex-grow">
        <div className="bg-accent border border-primary rounded-xl flex">
          <div className="p-2 py-1 border-r border-primary flex items-top w-min">Hoarding Time in Seconds</div>
          <div className="text-2xl text-right min-w-[3rem] px-2 py-1 flex justify-end font-bai-jamjuree">
            {GetHoardingingTimeInSeconds?.toString() || "0"}
          </div>
        </div>
        <div></div>
        <div className="grid lg:grid-cols-1 flex-grow">
          <div className="bg-accent border border-primary rounded-xl flex">
            <div className="p-2 py-1 border-r border-primary flex items-top w-min">Pending Rewards</div>
            <div className="text-2xl text-right min-w-[3rem] px-2 py-1 flex justify-end font-bai-jamjuree">
              {parseFloat(formatEther(calculateReward || "0")).toFixed(4)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

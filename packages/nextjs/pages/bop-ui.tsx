import type { NextPage } from "next";
import { MetaHeader } from "~~/components/MetaHeader";
import { ApproveBop } from "~~/components/bop-ui/ApproveBop";
import { BopHoardingContractData } from "~~/components/bop-ui/BopHoardingContractData";
import { Claim } from "~~/components/bop-ui/Claim";
import { ContractData } from "~~/components/bop-ui/ContractData";
import { ContractInteraction } from "~~/components/bop-ui/ContractInteraction";
import { DonateBop } from "~~/components/bop-ui/DonateBop";
import { Hoard } from "~~/components/bop-ui/Hoard";
import { IncreaseHoard } from "~~/components/bop-ui/IncreaseHoard";
import { UnHoard } from "~~/components/bop-ui/UnHoard";

const BopUI: NextPage = () => {
  return (
    <>
      <MetaHeader
        title="Bop UI | Scaffold-ETH 2"
        description="Bop UI created with 🏗 Scaffold-ETH 2, showcasing some of its features."
      >
        {/* We are importing the font this way to lighten the size of SE2. */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link href="https://fonts.googleapis.com/css2?family=Bai+Jamjuree&display=swap" rel="stylesheet" />
      </MetaHeader>
      <div className="grid lg:grid-block flex-grow" data-theme="BopUi">
        <ContractData />
        <BopHoardingContractData />
        <ContractInteraction />
        <ApproveBop />
        <DonateBop />
        <Hoard />
        <IncreaseHoard />
        <UnHoard />
        <Claim />
      </div>
    </>
  );
};

export default BopUI;

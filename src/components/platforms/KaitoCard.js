import React, { useEffect, useState } from "react";
import axios from "axios";
import DataCard from "../Cards/DataCard";
import { coinList } from "../assets/list";

const KaitoCard = () => {

  return (
    <>
      <div className="cardMoprh px-[29px] py-[33px] h-[263px] w-[317px] flex flex-col justify-between">
        <img
          className="w-[155px] h-[30px]"
          src="/kaito.png"
          alt="Asset"
        />
        <p className="text-center text-[#595D74] flex justify-center items-center sm:text-sm press-start-2p-regular gap-2">Connect
          <img src="/xGray.svg" className="w-[16px] h-[16px]"></img>
        </p>
      </div>
    </>
  );
};


export default KaitoCard;
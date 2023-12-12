import Select, { Option } from "rc-select";
import { SVGIcon } from "../components/SVGIcon/SVGIcon";
import { Action } from "./components/Action";
import { AssetCard } from "./components/AssetCard";
import { Back } from "./components/Back";
import { Menu } from '@headlessui/react'

export const Send = () => {
    const onGetBalance = () => {
        return 0;
    };

    const EXCHANGE_VALUE = "0.00"
    return (
        <div className="bg-[#12121d] h-full">
            <Back name={"back"} title={"Send"} />
            <div className="flex-col text-[#fff] justify-center items-center flex pt-[40px] pb-[30px]">
                <h2 className="text-[4.4rem] font-bold">{onGetBalance()}</h2>
                <p className="text-[1.28rem] flex flex-row items-center font-[300] opacity-50">
                    ≈ {EXCHANGE_VALUE} USD
                </p>
                <p className="text-[1.28rem] flex flex-row items-center font-[300]  mt-[10px]">
                    <span className="opacity-50"> Available: {onGetBalance()}</span>
                    <button className="ml-[10px] border-[0.5px] border-[#ffffff29] text-[#ffffffeb] px-[6px] py-[3px] text-[1rem] rounded-[9999px] cursor-pointer"> Use Max</button>
                </p>
            </div>
            <div>
                <p className="text-[1.28rem] text-[#fff] flex flex-row items-center font-[300] opacity-50 mb-[5px]">
                    Send To
                </p>
                <input type="text" placeholder="Send to account ID" className="text-[#fff] bg-[#ffffff0a] w-full focus:outline-none text-[16px] px-[20px] py-[10px] rounded-[9999px] "></input>
                <p className="text-[#fff] opacity-60 mt-3">The account ID must include a Top Level Account such as.near or contain exactly 64 characters.
                </p>
            </div>
        </div>
    );
};
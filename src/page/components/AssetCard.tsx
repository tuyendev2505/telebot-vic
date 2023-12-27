import { PNGIcon, PNGIconNames } from "../../components/PNGIcon";

export type Props = {
    name: PNGIconNames;
    tokenName: string;
    tokenValue: number;
    currentPrice: number;
    exchangePrice: number;
    title: string;
    onAction: () => void;
};

export const AssetCard = ({ name, tokenName, tokenValue, currentPrice, exchangePrice, onAction }: Props) => {
    return (
        <div className="flex flex-row items-center bg-[#1e1e1e] rounded-[8px] px-[10px] py-[12px] mt-[10px] cursor-pointer" onClick={onAction}>
            <div>
                <PNGIcon name={name} width={32} height={32} />

            </div>
            <div className="flex-1 flex flex-col text-[#fff] ml-[8px]">
                <div className="flex-row flex justify-between">
                    <h2 className="text-[16px] font-bold uppercase">{tokenName}</h2>
                    <p className="text-[1.4rem]">{tokenValue}</p>
                </div>
                <div className="flex-row flex justify-between mt-[5px]">
                    <p className="text-[1.2rem]">${Math.ceil(currentPrice)}</p>
                    <p className="text-[1.2rem]">≈ ${exchangePrice?.toFixed(2) ?? 0}</p>
                </div>
            </div>
        </div>
    );
};

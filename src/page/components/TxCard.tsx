import { PNGIcon, PNGIconNames } from "../../components/PNGIcon";
import { shortenAddress } from "../../utils/help";

export type Props = {
    name: PNGIconNames;
    from: string;
    hash: string;
    amount: string;
    link: string;
    onAction: () => void;
};

export const TxCard = ({ name, from, hash, amount, onAction, link }: Props) => {

    return (
        <div className="flex flex-row items-center bg-[#1e1e1e] rounded-[8px] py-[5px] mt-[10px] cursor-pointer" onClick={onAction}>
            <div className="flex-1 flex flex-col text-[#fff]">
                <div className="flex-row flex justify-between">
                    <h2 className="text-[12px]">{shortenAddress(from, 3)}</h2>
                    <p className="text-[1.2rem]">${amount}</p>
                    <a className="flex-row flex" onClick={onAction} href={link} target="_blank">
                        <PNGIcon name={name} width={16} height={16} />
                        <p className="text-[1.2rem] ml-[4px]">{shortenAddress(hash, 3)}</p>
                    </a>
                </div>
            </div>
        </div>
    );
};

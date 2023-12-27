import { useNavigate, useParams } from "react-router-dom";
import { SVGIcon } from "../components/SVGIcon/SVGIcon";
import { config, useAA } from "../hooks/useAA";
import { Action } from "./components/Action";
import { AssetCard } from "./components/AssetCard";
import { shortenAddress } from "../utils/help";
import { PNGIcon } from "../components/PNGIcon";
import { useEffect, useState } from "react";
import { TxCard } from "./components/TxCard";
import axios from "axios";
import { VictionTestnet } from "@particle-network/chains";
import { Back } from "./components/Back";
import { ethers } from "ethers";
// import { useTelegram } from "../hooks/useTelegram";


export type Props = {};
export const Transaction = (props: Props) => {

    const param = useParams()
    const address = param.txId ?? ''
    const [txs, setTxs] = useState([])
    const [loading, setLoading] = useState<boolean>(false)

    const getTxFromAddress = async () => {
        setLoading(true)
        try {
            const response = await axios.post('https://rpc.particle.network/evm-chain', {
                chainId: VictionTestnet.id,
                jsonrpc: '2.0',
                id: 1,
                method: 'particle_getTransactionsByAddress',
                params: [`${address}`],
            }, {
                auth: {
                    username: config.projectId,
                    password: config.clientKey
                }
            });
            console.log("response.data", response.data);
            setTxs(response.data.result)
            return;
        } catch (error) {
            setTxs([])
        }
        finally {
            setLoading(false)
        }
    }
    useEffect(() => {


        getTxFromAddress()
    }, [address])
    const scanUrl = 'https://testnet.vicscan.xyz/tx/'

    return (
        <div className="bg-[#877661] h-full  p-[16px]">
            <Back name={"back"} title={"Transaction"} />
            <div className="bg-[#1e1e1e] p-[10px] rounded-[8px] mt-[30px] ">
                <div className="flex flex-row justify-between">
                    <p className="text-[1.28rem] text-[#fff] flex flex-row items-center font-[500] rounded-[20px] opacity-50">
                        My Transaction
                    </p>
                    {/* <button className="text-[#fff] flex-row flex items-center bg-[#313131] px-[10px] py-[5px] rounded-[20px] opacity-50" onClick={getTxFromAddress}>
                        <SVGIcon name="refresh" /> <span className="ml-[4px]">Refresh</span>
                    </button> */}
                </div>
                <div className="mt-[15px]">
                    <div className="flex-row flex justify-between text-[#fff]">
                        <h2 className="text-[12px] font-bold">TO</h2>
                        <p className="text-[1.2rem] font-bold">AMOUNT</p>
                        <p className="text-[1.2rem] font-bold">HASH</p>
                    </div>
                    {txs?.filter((item: any) => item.status == 3)?.map((item: any) => {
                        return <TxCard name={"viction"} from={item.from} hash={item.hash} amount={ethers.utils.formatEther(item.value)} link={scanUrl + item.hash} onAction={() => { }} />
                    }) ?? null}
                </div>
            </div>
        </div>
    );
};

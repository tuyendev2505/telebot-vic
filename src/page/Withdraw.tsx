import { useAA } from "../hooks/useAA";
import { Back } from "./components/Back";


export const Withdraw = () => {
    const { sendTransaction, onChangeValueSend, onUseMaxBalanceSend, onChangeAddressSend, errorAddress, exchangeValueSend, toAddress, balance, valueSend, loading } = useAA()
    return (
        <div className="bg-[#877661]">
            <div className="p-[16px] h-full">
                <Back name={"back"} title={"Withdraw"} />
                <div className="flex-col text-[#fff] justify-center items-center flex pt-[40px] pb-[30px]">
                    <input onChange={onChangeValueSend} value={valueSend} onKeyPress={(event) => {
                        if (!/[0-9]/.test(event.key)) {
                            event.preventDefault();
                        }
                    }} className="bg-transparent text-center text-[4.4rem] font-bold text-[#fff] outline-none" placeholder="0" />
                    <p className="text-[1.28rem] flex flex-row items-center font-[300] opacity-50">
                        ≈ {exchangeValueSend.toFixed(4)} USD
                    </p>
                    <p className="text-[1.28rem] flex flex-row items-center font-[300]  mt-[10px]">
                        <span className="opacity-50"> Available: ${balance.toFixed()}</span>
                        <button onClick={onUseMaxBalanceSend} className="ml-[10px] border-[0.5px] border-[#fff] text-[#ffffffeb] px-[6px] py-[3px] text-[1rem] rounded-[9999px] cursor-pointer"> Use Max</button>
                    </p>
                </div>
                <div>
                    <p className="text-[1.28rem] text-[#fff] flex flex-row items-center font-[300] opacity-50 mb-[5px]">
                        Withdraw To
                    </p>
                    <input value={toAddress} onChange={onChangeAddressSend} type="text" placeholder="Send to account ID" className="text-[#fff] bg-[#ffffff0a] w-full focus:outline-none text-[16px] px-[20px] py-[10px] rounded-[9999px] "></input>

                    <p className="text-[#f40f0f] text-[13px] mt-1">{errorAddress}</p>

                </div>
            </div>
            <div className="fixed bottom-0  max-w-[38rem] w-full bg-[#877661] p-[16px] ">
                <button disabled={loading} onClick={() => sendTransaction()} className="w-full py-[10px] rounded-[9999px] text-[#fff] font-bold text-[1.4rem] relative bg-transparent cursor-pointer border-2 border-solid border-#252525 overflow-hidden rounded-full text-#333 transition-all duration-500 ease-in-out group hover:bg-[#333] hover:text-white">
                    {loading ? <span className="z-10 font-semibold tracking-wider relative z-10">Loading...</span> : <><span className="z-10 font-semibold tracking-wider relative z-10">WITHDRAW</span>
                        <span className="absolute left-0 top-0 bg-[#333] rounded-full opacity-0 transition-all duration-500 ease-in-out group-hover:opacity-100" style={{ content: "", height: "10px", width: "10px" }}></span></>}
                </button>
            </div>
        </div>
    );
};

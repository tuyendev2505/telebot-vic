import { QRCode } from 'react-qrcode-logo';
import { useAA } from "../hooks/useAA";
import { Back } from "./components/Back";

export const Deposit = () => {
    const { onCopyAddress, handleLogin, currentAddress, loading } = useAA()
    return (
        <div className="bg-[#877661]">
            <div className="p-[16px] h-full">
                <Back name={"back"} title={"Deposit"} />

                {
                    !currentAddress ? <>
                        <div className="w-fit m-auto mt-[40px] border-[1px] border-[#fff] p-[5px]">
                            <QRCode
                                style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                                value={currentAddress}
                                logoPaddingStyle='circle'
                                logoImage={'https://assets.coingecko.com/coins/images/3416/standard/viction.jpeg?1698894318'}
                            />
                        </div>
                        <h4 style={{ wordWrap: 'break-word', whiteSpace: 'pre-wrap', margin: '0 auto', width: '70%', marginTop: 20 }} className='text-center mt-[20px] text-[14px] text-[#fff]'>{currentAddress}</h4>
                    </> :
                        <div className='flex aligns-center justify-center'>
                            <button className='' onClick={handleLogin}>
                                Create Wallet
                            </button></div>
                }

            </div>
            <div className="fixed bottom-0  max-w-[38rem] w-full bg-[#877661] p-[16px] ">
                <button disabled={loading} onClick={() => onCopyAddress(currentAddress)} className="w-full py-[10px] rounded-[9999px] text-[#fff] font-bold text-[1.4rem] relative bg-transparent cursor-pointer border-2 border-solid border-#252525 overflow-hidden rounded-full text-#333 transition-all duration-500 ease-in-out group hover:bg-[#333] hover:text-white">
                    {loading ? <span className="z-10 font-semibold tracking-wider relative z-10">Loading...</span> : <><span className="z-10 font-semibold tracking-wider relative z-10">COPY ADDRESS</span>
                        <span className="absolute left-0 top-0 bg-[#333] rounded-full opacity-0 transition-all duration-500 ease-in-out group-hover:opacity-100" style={{ content: "", height: "10px", width: "10px" }}></span></>}
                </button>
            </div>
        </div>
    );
};

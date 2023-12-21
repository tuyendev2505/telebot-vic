import { useNavigate } from "react-router-dom";
import { SVGIcon } from "../components/SVGIcon/SVGIcon";
import { Action } from "./components/Action";
import { AssetCard } from "./components/AssetCard";
import { useAA } from "../hooks/useAA";
// import { useTelegram } from "../hooks/useTelegram";
import { useEffect } from "react";


export type Props = {};
export const Home = (props: Props) => {

    const navigate = useNavigate()
    const { handleLogin } = useAA();
    // const { webApp } = useTelegram()

    const onGetBalance = () => {
        return 0;
    };

    const onHandleSend = () => {
        // handleLogin('google')
        navigate('/send')
    }

    useEffect(() => {
        // handleLogin();

        // Replace 'YOUR_BOT_USERNAME' with your actual bot username

        const botUsername = 'televicbot';

        const script = document.createElement('script');
        script.src = `https://telegram.org/js/telegram-widget.js?6`;
        script.setAttribute('data-telegram-login', botUsername);
        script.setAttribute('data-size', 'large');
        script.setAttribute('data-radius', '10');
        script.setAttribute('data-auth-url', 'https://d8a8-42-113-119-130.ngrok-free.app/login');
        script.setAttribute('data-request-access', 'write');

        document.body.appendChild(script);
    }, [handleLogin])

    return (
        <div className="bg-[#877661] h-full  p-[16px]">
            <div className="flex-col text-[#fff] justify-center items-center flex pt-[40px] pb-[30px]">
                <h2 className="text-[4.4rem] font-bold">${onGetBalance()}</h2>
                <p className="text-[1.28rem] flex flex-row items-center font-[500] opacity-50">
                    Available Balance
                </p>
            </div>
            <div className="flex flex-row justify-evenly">
                <Action name="send" title="Send" onAction={onHandleSend} />
                <Action name="stake" title="Deposit" onAction={() => { }} />
                <Action name="withdraw" title="Withdraw" onAction={() => { }} />
            </div>
            <div className="bg-[#1e1e1e] p-[10px] rounded-[8px] mt-[30px] ">
                <div className="flex flex-row justify-between">
                    <p className="text-[1.28rem] text-[#fff] flex flex-row items-center font-[500] rounded-[20px] opacity-50">
                        My Asset
                    </p>
                    <button className="text-[#fff] flex-row flex items-center bg-[#313131] px-[10px] py-[5px] rounded-[20px] opacity-50">
                        <SVGIcon name="refresh" /> <span className="ml-[4px]">Refresh</span>
                    </button>
                </div>
                <div className="mt-[15px]">
                    <AssetCard
                        name={"viction"}
                        tokenName={"Vic"}
                        tokenValue={0}
                        currentPrice={2.27}
                        exchangePrice={0}
                        title={""}
                        onAction={onHandleSend}
                    />
                    <AssetCard
                        name={"eth"}
                        tokenName={"eth"}
                        tokenValue={0}
                        currentPrice={2.27}
                        exchangePrice={0}
                        title={""}
                        onAction={onHandleSend}
                    />
                </div>
            </div>
        </div>
    );
};

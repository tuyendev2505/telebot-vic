import { AAWrapProvider, SmartAccount } from '@particle-network/aa';
import { ParticleNetwork, UserInfo } from '@particle-network/auth';
import { VictionTestnet } from '@particle-network/chains';
import { ParticleProvider } from '@particle-network/provider';
import { ethers } from 'ethers';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';


const config = {
    projectId: 'd5b563c0-ed88-41ac-bbfd-95a96f97ef5d' ?? process.env.REACT_APP_PROJECT_ID ?? '',
    clientKey: 'cEGmxx2bHQWjOGuzRlnW40e27lpdxB4Kyg8vFaeb' ?? process.env.REACT_APP_CLIENT_KEY ?? '',
    appId: '46322ad5-e618-44b1-af4c-f51260c00f00' ?? process.env.REACT_APP_APP_ID ?? '',
};

const particle = new ParticleNetwork({
    ...config,
    chainName: VictionTestnet.name,
    chainId: VictionTestnet.id,
    wallet: { displayWalletEntry: true }
});

const smartAccount = new SmartAccount(new ParticleProvider(particle.auth), {
    ...config,
    aaOptions: {
        accountContracts: {
            SIMPLE: [{ chainIds: [VictionTestnet.id], version: '1.0.0' }]
        }
    }
});

const customProvider = new ethers.providers.Web3Provider(new AAWrapProvider(smartAccount), "any");

particle.setERC4337({
    name: 'SIMPLE',
    version: '1.0.0'
});

const BALANCE_RATE = 0.8
export const useAA = () => {
    const [userInfo, setUserInfo] = useState<UserInfo | null>();
    const [balance, setBalance] = useState<number>(0);
    const [toAddress, setToAddress] = useState<string>('');
    const [valueSend, setValueSend] = useState<number>(0);
    const [exchangeValueSend, setExchangeValueSend] = useState<number>(0);
    const [errorAddress, setErrorAddress] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(false)
    const [currentAddress, setCurrentAddress] = useState<string>('')
    const [pageLoading, setPageLoading] = useState<boolean>(false)

    const onChangeValueSend = (e: any) => {
        const value = +e.target.value ?? 0
        if (value > balance) return
        setValueSend(value)
        setExchangeValueSend(value * BALANCE_RATE)
    }

    const onUseMaxBalanceSend = () => {
        setValueSend(Math.ceil(balance))
        setExchangeValueSend(balance * BALANCE_RATE)
    }

    const getBalanceOf = async () => {
        const address = await smartAccount.getAddress();
        const balance = await customProvider.getBalance(address);
        setBalance(+ethers.utils.formatEther(balance));
        console.log("BALANCE", balance)
        setCurrentAddress(address)
    }

    const onChangeAddressSend = (e: any) => {
        setToAddress(e.target.value)
        if (!!e.target.value) {
            setErrorAddress('')
        }
    }


    const handleLogin = async () => {
        try {
            setPageLoading(true)
            const user = !particle.auth.isLogin()
                ? await particle.auth.login({ preferredAuthType: 'google' }) :
                await particle.auth.getUserInfo();

            console.log("User", user)
            if (user) {
                getBalanceOf()
                setUserInfo(user)
            }
            setPageLoading(false)
            return
        } catch (error) {
            toast.error('Connect account abstraction Error!')
        } finally {
            setPageLoading(false)
        }
    };


    const sendTransaction = async () => {
        setLoading(true)
        try {
            if (!toAddress) { setErrorAddress("Please input address send!"); return }
            if (valueSend < 1) { toast.error("Please input amount"); return }
            if (valueSend > balance) { toast.error("Amount must be greater than balance"); return }
            const signer = customProvider.getSigner();
            const tx = {
                to: toAddress,
                value: ethers.utils.parseEther(valueSend.toString()),
            };
            const txResponse = await signer.sendTransaction(tx);
            const txReceipt = await txResponse.wait();
            console.log('Transaction hash:', txReceipt.transactionHash);

            if (txReceipt.transactionHash) {
                setValueSend(0)
                setExchangeValueSend(0)
                setToAddress('')
                getBalanceOf()
                setErrorAddress('')
                toast.success("Send success to: " + toAddress);

            }

            return true
        } catch (error) {
            toast.error("Send error! Please send again");
        } finally {
            setLoading(false)
        }
    }

    const onCopyAddress = async (text: string) => {
        setLoading(true)
        toast.success("Copy success!")
        if ('clipboard' in navigator) {
            setLoading(false)
            return await navigator.clipboard.writeText(text);
        } else {
            setLoading(false)
            return document.execCommand('copy', true, text);
        }

    }

    useEffect(() => {
        handleLogin()
    }, []);

    return {
        balance,
        userInfo,
        toAddress,
        exchangeValueSend,
        valueSend,
        errorAddress,
        loading,
        currentAddress,
        pageLoading,
        sendTransaction,
        setToAddress,
        onChangeValueSend,
        onUseMaxBalanceSend,
        onChangeAddressSend,
        onCopyAddress,
        handleLogin
    };
};

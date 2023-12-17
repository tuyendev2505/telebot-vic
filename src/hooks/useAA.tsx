import React, { useState, useEffect } from 'react';
import { AuthType, ParticleNetwork, UserInfo } from '@particle-network/auth';
import { ParticleProvider } from '@particle-network/provider';
import { Viction } from '@particle-network/chains';
import { AAWrapProvider, SmartAccount } from '@particle-network/aa';
import { ethers } from 'ethers';

const config = {
    projectId: process.env.REACT_APP_PROJECT_ID ?? '',
    clientKey: process.env.REACT_APP_CLIENT_KEY ?? '',
    appId: process.env.REACT_APP_APP_ID ?? '',
};

const particle = new ParticleNetwork({
    ...config,
    chainName: Viction.name,
    chainId: Viction.id,
    wallet: { displayWalletEntry: true }
});

const smartAccount = new SmartAccount(new ParticleProvider(particle.auth), {
    ...config,
    aaOptions: {
        accountContracts: {
            simple: [{ chainIds: [Viction.id], version: '1.0.0' }]
        }
    }
});

const customProvider = new ethers.providers.Web3Provider(new AAWrapProvider(smartAccount), "any");

particle.setERC4337({
    name: 'SIMPLE',
    version: '1.0.0'
});
export const useAA = () => {

    console.log({
        chainName: Viction.name,
        chainId: Viction.id,
        Viction
    })
    const [userInfo, setUserInfo] = useState<UserInfo>();
    const [balance, setBalance] = useState<number>(0);

    const fetchBalance = async () => {
        const address = await smartAccount.getAddress();
        const balance = await customProvider.getBalance(address);
        setBalance(+ethers.utils.formatEther(balance));
    };

    const handleLogin = async (preferredAuthType: AuthType) => {
        // const wallet = await particle.auth.createWallet(Viction.name)
        const user = !particle.auth.isLogin() ? await particle.auth.login({
            preferredAuthType: 'jwt',
            account: 'JWT Value',
            hideLoading: true,
        }) : particle.auth.getUserInfo();

        console.log("USER", user)
        // setUserInfo(user as UserInfo);
    }

    const executeUserOp = async () => {
        const signer = customProvider.getSigner();
        const tx = {
            to: "0x000000000000000000000000000000000000dEaD",
            value: ethers.utils.parseEther("0.001"),
        };
        const txResponse = await signer.sendTransaction(tx);
        const txReceipt = await txResponse.wait();
        console.log('Transaction hash:', txReceipt.transactionHash);
    };

    useEffect(() => {
        if (userInfo) {
            fetchBalance();
        }
    }, [userInfo]);


    return {
        handleLogin
    }
}
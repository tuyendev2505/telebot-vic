import React, { useState, useEffect } from 'react';
import { AuthType, ParticleNetwork, UserInfo } from '@particle-network/auth';
import { ParticleProvider } from '@particle-network/provider';
import { VictionTestnet } from '@particle-network/chains';
import { AAWrapProvider, SmartAccount } from '@particle-network/aa';
import { ethers } from 'ethers';
// import * as jwt from 'jsonwebtoken';


const config = {
    projectId: process.env.REACT_APP_PROJECT_ID ?? '',
    clientKey: process.env.REACT_APP_CLIENT_KEY ?? '',
    appId: process.env.REACT_APP_APP_ID ?? '',
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
            simple: [{ chainIds: [VictionTestnet.id], version: '1.0.0' }]
        }
    }
});

const customProvider = new ethers.providers.Web3Provider(new AAWrapProvider(smartAccount), "any");

particle.setERC4337({
    name: 'SIMPLE',
    version: '1.0.0'
});

export const useAA = () => {
    const [userInfo, setUserInfo] = useState<UserInfo>();
    const [balance, setBalance] = useState<number>(0);

    const fetchBalance = async () => {
        const address = await smartAccount.getAddress();
        const balance = await customProvider.getBalance(address);
        setBalance(+ethers.utils.formatEther(balance));
    };

    const handleLogin = async () => {
        // const userId = 'Telejwt'; 
        // const token = jwt.sign({ userId }, 'EWGRWWNSAR', { expiresIn: '24h' });

        const user = !particle.auth.isLogin() ? await particle.auth.login({
            account: "token",
            hideLoading: true,
        }) : particle.auth.getUserInfo();
        console.log("USER", user);
    };

    useEffect(() => {
        if (userInfo) {
            fetchBalance();
        }
    }, [userInfo]);

    return {
        handleLogin,
    };
};

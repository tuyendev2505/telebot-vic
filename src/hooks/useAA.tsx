import { AAWrapProvider, SmartAccount } from '@particle-network/aa';
import { ParticleNetwork, UserInfo } from '@particle-network/auth';
import { Ethereum, VictionTestnet } from '@particle-network/chains';
import { ParticleProvider } from '@particle-network/provider';
import { ethers } from 'ethers';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';


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

export const useAA = () => {
    console.log("CONFIG", config)
    const [userInfo, setUserInfo] = useState<UserInfo | null>();
    const [balance, setBalance] = useState<number>(0);
    const { search } = useLocation()


    const fetchBalance = async () => {
        const address = await smartAccount.getAddress();
        const balance = await customProvider.getBalance(address);
        setBalance(+ethers.utils.formatEther(balance));
    };

    useEffect(() => {
        const query = new URLSearchParams(search);
        const accessToken = query.get("accessToken") ?? ''
        console.log("ACCESSTOKEN", accessToken)
        // handleLogin(accessToken)
        // AA address
        // const get = async () => {
        //     const address = await smartAccount.getAddress();
        //     console.log("ADD", address)
        //     // load account more info.
        //     const accountInfo = await smartAccount.getAccount();
        // }
        // get()
    }, [])

    const handleLogin = async (accessToken: string) => {
        // const userId = 'Telejwt'; 
        // const token = jwt.sign({ userId }, 'EWGRWWNSAR', { expiresIn: '24h' });

        // try {
        //     const account = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEyNzQ1ODk5MTgsImlhdCI6MTcwMzE4MTUyMn0.ZNy6OHzkMCBS-hxZMV3wXUg7gRQaioiyk7fqoQLnaEr0vDI7Wc-hmpxQYvwGQ7ks-HIBZnfp-3_E4XCKbWSkPCIFXeoq2O0eL_U1n45yZBffcFuKVekLZ0QIoyK7QyDna3T-vPvyGfRB_4NJcjLSei3jSs_fUaNlReDmU8mGTeNx09WJyCZfmO8Ilo-HvnWwAlDNVHfPlm9CPd9zSnvOL6AIFbaC-ob0l2XMq3p95fasdjwjapNdVCxiddAvfn7diwenj8F9Bs4A_uSmT4W8wL_q-uiaU1gthTbwQ5WX19Ek95aJ81i6CBiABOCwkTft1sfNi-kM1ApFA3FZkak5vvLwqL93vZA5QbvqNCbzB50VCKDylrNUjeRNb4GGcahGzMC-XvogoxVRkqByqvk47ZW5sE1p6SdmLFk2dycOF-In3IgWkWdawnt3hC6PkICjAnQyCRGnA94WvbLy-4RCLQ6vrS5RQnrjOCYpR8x1BMRF15sh60ppp-nzXxBkHGz3qL_mg5qnRjpEKw-0EKaZMts-vu3P0sD5q2LpwQr6p_HLNic2a9zomwY7AOjQZQlmZCoD_wn9k8WiKy7UKLq9YLJ3grDDc6hQrCC6m4UhbJA9nexmUYTgSCYKAEkrnmat3D1olb8WurSr1mfY6Iu5S21upF60bctbOHGy0WnO62I'
        //     // const address = await smartAccount.getAddress();
        //     // console.log("ADD", address)
        //     // // load account more info.
        //     // const accountInfo = await smartAccount.getAccount();
        //     const user = await particle.auth.login({
        //         preferredAuthType: 'jwt',
        //         account
        //     })
        //     console.log("USER", user);
        // } catch (error) {
        //     console.log("ERRR", error)

        // }
        await particle.auth.logout()
        const user = !particle.auth.isLogin() ? await particle.auth.login({ preferredAuthType: 'google' }) : particle.auth.getUserInfo();
        console.log("USER", user)
        setUserInfo(user);
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

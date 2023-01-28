import React, {useContext, createContext, Children} from 'react';

import {useAddress, useContract, useMetamask, useContractWrite} from '@thirdweb-dev/react';
import { ethers} from 'ethers';


const StateContext = createContext();

export const StateContextProvider = ({children}) => {
    const { contract } = useContract('0xBaEbef2a762f900912228431f52D27b9F600b18f');
    const { mutateAsync :createCampaign} = useContractWrite(contract, 'createCampaign');

    const address = useAddress();
    const connect = useMetamask();

    const publishCampaign = async(form) => {
        try {
            const data = await createCampaign([
                address, // Owner
                form.title,
                form.description,
                form.target,
                new Date(form.deadline).getTime(),
                form.image
            ])

            console.log("Contract call Success",data)
        } catch (error) {
            console.log("Contract call failure",error)
        }
    }

    const getCampaigns = async () =>{
        const campaigns = await contract.call
        ('getCampaigns');
        const parsedCampaigns = campaigns.map((campaign,i) => ({
            owner: campaign.owner,
            title: campaign.title,
            description: campaign.description,
            target: ethers.utils.formatEther(campaign.target.toString()), 
            deadline: campaign.deadline.toNumber(),
            amountCollected: ethers.utils.formatEther(campaign.amountCollected.toString()),
            image: campaign.image,
            pId: i
        }));
        return parsedCampaigns;
    }

    const getUserCampaigns = async () => {
        const allCampaigns = await getCampaigns();
        const filteredCampaigns = allCampaigns.filter((campaign)=>
        campaign.owner === address);

        return filteredCampaigns;
    }

    const donate = async (pId, amount)=>{
        const data = await contract.call('donateToCampaign',pId,{value: ethers.utils.parseEther(amount)});
        return data;
    }

    const getDonations = async (pId) => {
        const donations = await contract.call('getDonators', pId);
        const numberOfDonaors = donations[0].length;

        const parsedDonation = [];

        for(let i=0;i<numberOfDonaors; i++){
            parsedDonation.push({
                donator: donations[0][i],
                donation: ethers.utils.formatEther(donations[1][i].toString())
            });
        }

        return parsedDonation;
    }

    return(
        <StateContext.Provider
            value={{
                address,
                contract,
                connect,
                createCampaign:publishCampaign,      
                getCampaigns,
                getUserCampaigns,
                donate,
                getDonations,
            }}
        >
            {children}
        </StateContext.Provider>
    )
}

export const useStateContext = () => useContext(StateContext);
import { Contract, ethers } from "ethers";
import { useEffect, useState } from "react";
import { Constants } from "../Constants";

export default class LNR {
    private static getContract() {
        const provider = ethers.providers.getDefaultProvider(1);
        return new Contract(Constants.lnrAddress, Constants.lnrContractAbi, provider);
    }

    private static getAddressFromStr(address: string) {
        return ethers.utils.getAddress(address);
    }

    public static async getName(address: string) {
        const contract = this.getContract();
        const rawName = await contract.primary(this.getAddressFromStr(address));

        return ethers.utils.parseBytes32String(rawName);
    }

    public static async getAddress(name: string) {
        const contract = this.getContract();

        return await contract.resolve(name);
    }

    public static async verifyIsNameOwner(name: string, address: string) {
        const contract = this.getContract()
        const parsedName = ethers.utils.formatBytes32String(name);
        const parsedAddress = ethers.utils.getAddress(address);

        return await contract.verifyIsNameOwner(parsedName, parsedAddress);
    }
}

/**
 * 
 * @param address The address to get the lnr name of
 * @returns The name primarily set for the address
 */
const useLnrAddressResolver = (address: string): { name: string | undefined } => {
    const [name, setName] = useState<string | undefined>();

    useEffect(() => {
        LNR.getName(address)
            .then(res => setName(res))
            .catch(console.error);
    }, [address])

    return { name }
}

/**
 * 
 * @param name Name to get address of
 * @returns The address associated with the name
 */
const useLnrNameResolver = (name: string): { address: string | undefined } => {
    const [address, setAddress] = useState();

    useEffect(() => {
        LNR.getAddress(name)
            .then(setAddress)
            .catch(console.error)
    }, [address])

    return { address }
}

/**
 * 
 * @param name The name to check
 * @param address The address to check
 * @returns If the address is the owner of the domain
 */
const useLnrVerifyOwner = (name: string, address: string): { isOwner: boolean | undefined } => {
    const [isOwner, setIsOwner] = useState();

    useEffect(() => {
        LNR.verifyIsNameOwner(name, address)
            .then(setIsOwner)
            .catch(console.error);
    }, [name, address])

    return { isOwner };
}

export { useLnrAddressResolver, useLnrNameResolver, useLnrVerifyOwner };

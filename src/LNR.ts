import { ethers, Contract } from "ethers";
import { Constants } from "./Constants";

export default class LNR {
    private provider: ethers.providers.BaseProvider;

    private getContract() {
        return new Contract(Constants.lnrAddress, Constants.lnrContractAbi, this.provider);
    }

    constructor(provider: ethers.providers.BaseProvider) {
        this.provider = provider;
    }

    private getAddressFromStr(address: string) {
        return ethers.utils.getAddress(address);
    }

    public async getName(address: string) {
        const contract = this.getContract();
        const rawName = await contract.primary(this.getAddressFromStr(address));

        return ethers.utils.parseBytes32String(rawName);
    }

    public async getAddress(name: string) {
        const contract = this.getContract();

        return await contract.resolve(name);
    }

    public async verifyIsNameOwner(name: string, address: string) {
        const contract = this.getContract()
        const parsedName = ethers.utils.formatBytes32String(name);
        const parsedAddress = ethers.utils.getAddress(address);

        return await contract.verifyIsNameOwner(parsedName, parsedAddress);
    }
}

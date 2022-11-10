import { useState, useContext, useEffect } from "react";
import LNR from "../LNR";
import { LnrContext } from "../provider/LnrConfigProvider";

/**
 *
 * @param address The address to get the lnr name of
 * @returns The name primarily set for the address
 */
export const useLnrGetName = (address: string): { name: string | null } => {
    const [name, setName] = useState<string | null>(null);
    const ctx = useContext(LnrContext);
    const lnr = new LNR(ctx.provider);

    useEffect(() => {
        lnr.getName(address).then(setName).catch(console.error);
    }, [address]);

    return { name };
};

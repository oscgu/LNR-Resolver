import { useState, useContext, useEffect } from "react";
import LNR from "../LNR";
import { LnrContext } from "../provider/LnrConfigProvider";

/**
 *
 * @param name Name to get address of
 * @returns The address associated with the name
 */
export const useLnrGetAddress = (name: string): { address: string | null } => {
    const [address, setAddress] = useState(null);
    const ctx = useContext(LnrContext);
    const lnr = new LNR(ctx.provider);

    useEffect(() => {
        lnr.getAddress(name).then(setAddress).catch(console.error);
    }, [address]);

    return { address };
};

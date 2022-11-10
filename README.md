# LNR-Resolver

A small react library with some useful hooks for dealing with LNR domains  

## Setup

You can use the hooks as they are, if you dont mind the rate limit of the  
public provider being used. See below how to change that.  

`_app.tsx`
```typescript
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
    const config: LnrConfig = {
        provider: new ethers.providers.AlchemyProvider(1, "your-api-key")
    };

    return (
        <LnrConfigProvider config={config}>
            <Component {...pageProps} />
        </LnrConfigProvider>
    )
}
```

## Using the hooks


```typescript
const { name } = useLnrGetName("0x...");
const { address } = useLnrGetAddress("name.og");
```

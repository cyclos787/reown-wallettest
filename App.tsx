import '@walletconnect/react-native-compat'
import React, { useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { View } from 'react-native';
import { AppKitButton, } from '@reown/appkit-wagmi-react-native'
// WalletConnect/Reown
import { WagmiProvider } from "wagmi";
import { mainnet, polygon, arbitrum } from '@wagmi/core/chains'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createAppKit, defaultWagmiConfig, AppKit } from "@reown/appkit-wagmi-react-native";
import { authConnector } from '@reown/appkit-auth-wagmi-react-native';

const projectId = 'cd256463d437436cb0d1705489006fde';
// Reown declarations

const metadata = {
  name: 'WalletTest',
  description: 'Unifying CEX/DEX',
  url: 'https://reown.com/appkit',
  icons: ['https://avatars.githubusercontent.com/u/179229932'],
  redirect: {
  },
};
const auth = authConnector({ projectId, metadata })
const chains = [mainnet, polygon, arbitrum] as const
const wagmiConfig = defaultWagmiConfig({
  chains,
  projectId,
  metadata,
  extraConnectors: [auth]
});

  createAppKit({
  projectId,
  wagmiConfig,
  metadata,
  features: {
    email: true, // default to true
    socials: ['x', 'apple'], // default value
    emailShowWallets: true, // default to true
  }
});

const queryClient = new QueryClient();

function App(): React.JSX.Element {
  const navigationRef = React.useRef(null);
  
  return (
    <WagmiProvider config={wagmiConfig}>
      <GestureHandlerRootView style={{ flex: 1 }}>     
        <NavigationContainer
          ref={navigationRef}
        >
          <QueryClientProvider client={queryClient}>
  
            <AppKit />
            <View style={{backgroundColor: 'pink', flex: 1, justifyContent: 'center'}}>
              <AppKitButton />
            </View>

          </QueryClientProvider>
        </NavigationContainer>
      </GestureHandlerRootView>
    </WagmiProvider>
  );
}



export default App;

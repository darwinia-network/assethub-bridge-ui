"use client";

import "@rainbow-me/rainbowkit/styles.css";

import { connectorsForWallets, darkTheme, getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { publicProvider } from "wagmi/providers/public";
import { PropsWithChildren } from "react";
import { darwiniaChain } from "@/config/chains";
import { APP_NAME } from "@/config";
import { safeWallet } from "@rainbow-me/rainbowkit/wallets";

const projectId = process.env.NEXT_PUBLIC_WALLET_CONNECT_ID || "";
const appName = APP_NAME;

const { chains, publicClient } = configureChains(
  [darwiniaChain].map(({ assets, existential, ...chain }) => chain),
  [publicProvider()],
);

const { wallets } = getDefaultWallets({ appName, projectId, chains });

const connectors = connectorsForWallets([...wallets, { groupName: "More", wallets: [safeWallet({ chains })] }]);

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
});

export default function RainbowProvider({ children }: PropsWithChildren<unknown>) {
  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider chains={chains} theme={darkTheme({ borderRadius: "small", accentColor: "#FF0083" })}>
        {children}
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

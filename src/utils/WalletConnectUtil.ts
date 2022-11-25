import SignClient from '@walletconnect/sign-client'

export let signClient: SignClient

export async function createSignClient(relayerRegionURL: string) {
  signClient = await SignClient.init({
    logger: 'debug',
    projectId: process.env.PUBLIC_PROJECT_ID,
    relayUrl: relayerRegionURL ?? process.env.PUBLIC_RELAY_URL,
    metadata: {
      name: 'Burney',
      description: 'Burner Wallet for WalletConnect',
      url: 'https://walletconnect.com/',
      icons: ['https://avatars.githubusercontent.com/u/37784886']
    }
  })
}

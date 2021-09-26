import type { CeramicApi } from '@ceramicnetwork/common'
import NftResolver, { NftResolverConfig } from 'nft-did-resolver'
import { DID } from 'dids'
import ThreeIdResolver from '@ceramicnetwork/3id-did-resolver'
import KeyDidResolver from 'key-did-resolver'
import { Resolver } from 'did-resolver'

import { createCeramic } from './ceramic'
import { createIDX } from './idx'
import { getProvider } from './wallet'
import type { ResolverRegistry } from 'did-resolver'

declare global {
  interface Window {
    did?: DID
  }
}

const ceramicPromise = createCeramic()



const createNFTResolver = (ceramicInstance:CeramicApi) => {

const config: NftResolverConfig = {
  ceramic: ceramicInstance,
  chains: {
    'eip155:1': {
      blocks: 'https://api.thegraph.com/subgraphs/name/yyong1010/ethereumblocks',
      skew: 15000,
      assets: {
        erc721: 'https://api.thegraph.com/subgraphs/name/sunguru98/mainnet-erc721-subgraph',
        erc1155: 'https://api.thegraph.com/subgraphs/name/sunguru98/mainnet-erc1155-subgraph',
      },
    },
    'eip155:4': {
      blocks: 'https://api.thegraph.com/subgraphs/name/mul53/rinkeby-blocks',
      skew: 15000,
      assets: {
        erc721: 'https://api.thegraph.com/subgraphs/name/sunguru98/erc721-rinkeby-subgraph',
        erc1155: 'https://api.thegraph.com/subgraphs/name/sunguru98/erc1155-rinkeby-subgraph',
      },
    },
  },
}

const nftResolver = NftResolver.getResolver(config)
const nftDidResolver = new Resolver(nftResolver)
window.nftResolver = nftResolver
window.nftDidResolver = nftDidResolver

}


const authenticate = async (): Promise<string> => {
  const [ceramic, provider] = await Promise.all([ceramicPromise, getProvider()])
  const keyDidResolver = KeyDidResolver.getResolver()
  const threeIdResolver = ThreeIdResolver.getResolver(ceramic)

  const resolverRegistry: ResolverRegistry = {
    ...threeIdResolver,
    ...keyDidResolver,
  }
  const did = new DID({
    provider: provider,
    resolver: resolverRegistry,
  })
  await did.authenticate()
  await ceramic.setDID(did)
  const idx = createIDX(ceramic)
  window.did = ceramic.did
  createNFTResolver(ceramic) 
  
  return idx.id
}

const updateAlert = (status: string, message: string) => {
  const alert = document.getElementById('alerts')

  if (alert !== null) {
    alert.textContent = message
    alert.classList.add(`alert-${status}`)
    alert.classList.remove('hide')
    setTimeout(() => {
      alert.classList.add('hide')
    }, 5000)
  }
}

document.getElementById('activate_ceramic')?.addEventListener('click', () => {
  const ceramicIframe = document.getElementById('ceramic_docs')
  if (ceramicIframe?.classList.contains('show')) {
    ceramicIframe?.classList.remove('show')
    document.getElementById('activate_ceramic')?.classList.remove('active')
  } else {
    document.getElementById('activate_ceramic')?.classList.add('active')
    ceramicIframe?.classList.add('show')
  }
})

document.getElementById('activate_idx')?.addEventListener('click', () => {
  const idxIframe = document.getElementById('idx_docs')
  if (idxIframe?.classList.contains('show')) {
    idxIframe?.classList.remove('show')
    document.getElementById('activate_idx')?.classList.remove('active')
  } else {
    document.getElementById('activate_idx')?.classList.add('active')
    idxIframe?.classList.add('show')
  }
})

document.getElementById('bauth')?.addEventListener('click', () => {
  document.getElementById('loader')?.classList.remove('hide')
  authenticate().then(
    (id) => {
      const userDid = document.getElementById('userDID')
      const concatId = id.split('did:3:')[1]
      if (userDid !== null) {
        userDid.textContent = `${concatId.slice(0, 4)}...${concatId.slice(
          concatId.length - 4,
          concatId.length
        )}`
      }
      updateAlert('success', `Successfully connected with ${id}`)
      document.getElementById('loader')?.classList.add('hide')
      document.getElementById('bauth')?.classList.add('hide')
      document.getElementById('instructions')?.classList.remove('hide')
    },
    (err) => {
      console.error('Failed to authenticate:', err)
      updateAlert('danger', err)
      document.getElementById('loader')?.classList.add('hide')
    }
  )
})



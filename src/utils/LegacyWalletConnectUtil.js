import LegacySignClient from '@walletconnect/client/dist/umd/index.min.js';
import { EIP155_SIGNING_METHODS } from './EIP155Data';
import ploadState from '../components/WalletState';
export let legacySignClient;

const { pload, changePayload } = ploadState;
export function createLegacySignClient({ uri } = {}) {

  //console.log(pload());
  // If URI is passed always create a new session,
  // otherwise fall back to cached session if client isn't already instantiated.
  if (uri) {
    deleteCachedLegacySession();
    legacySignClient = new LegacySignClient({ uri });
  } else if (!legacySignClient && getCachedLegacySession()) {
    console.log("cached session");
    const session = getCachedLegacySession();
    legacySignClient = new LegacySignClient({ session });
  } else {
    return;
  }

  legacySignClient.on('session_request', (error, payload) => {
    if (error) {
      throw new Error(`legacySignClient > session_request failed: ${error}`);
    }
    //console.log("session request", payload);
    changePayload(payload);
  });

  legacySignClient.on('connect', () => {
    console.log('legacySignClient > connect');
  });

  legacySignClient.on('error', error => {
    throw new Error(`legacySignClient > on error: ${error}`);
  });

  legacySignClient.on('call_request', (error, payload) => {
    if (error) {
      throw new Error(`legacySignClient > call_request failed: ${error}`);
    }
    onCallRequest(payload);
  });

  legacySignClient.on('disconnect', async () => {
    deleteCachedLegacySession();
  });
}

const onCallRequest = async (payload) => {
  //console.log("call received");
  changePayload(payload);
  console.log(pload());
  /*   switch (payload.method) {
      case EIP155_SIGNING_METHODS.ETH_SIGN:
      case EIP155_SIGNING_METHODS.PERSONAL_SIGN:
        return ModalStore.open('LegacySessionSignModal', {
          legacyCallRequestEvent: payload,
          legacyRequestSession: legacySignClient.session
        });
  
      case EIP155_SIGNING_METHODS.ETH_SIGN_TYPED_DATA:
      case EIP155_SIGNING_METHODS.ETH_SIGN_TYPED_DATA_V3:
      case EIP155_SIGNING_METHODS.ETH_SIGN_TYPED_DATA_V4:
        return ModalStore.open('LegacySessionSignTypedDataModal', {
          legacyCallRequestEvent: payload,
          legacyRequestSession: legacySignClient.session
        });
  
      case EIP155_SIGNING_METHODS.ETH_SEND_TRANSACTION:
      case EIP155_SIGNING_METHODS.ETH_SIGN_TRANSACTION:
        return ModalStore.open('LegacySessionSendTransactionModal', {
          legacyCallRequestEvent: payload,
          legacyRequestSession: legacySignClient.session
        });
  
      default:
        alert(`${payload.method} is not supported for WalletConnect v1`);
    } */
};

function getCachedLegacySession() {
  if (typeof window === 'undefined') return;

  const local = window.localStorage ? window.localStorage.getItem('walletconnect') : null;

  let session = null;
  if (local) {
    try {
      session = JSON.parse(local);
    } catch (error) {
      throw error;
    }
  }
  return session;
}

export function deleteCachedLegacySession() {
  if (typeof window === 'undefined') return;
  window.localStorage.removeItem('walletconnect');
}

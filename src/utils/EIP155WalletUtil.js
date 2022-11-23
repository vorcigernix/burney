import EIP155Lib from './EIP155Lib';

export let wallet;
export let eip155Wallets;
export let eip155Addresses;

let address;

/**
 * Utilities
 */
export function createOrRestoreEIP155Wallet() {
  let mnemonic = localStorage.getItem('EIP155_MNEMONIC_1');

  if (mnemonic) {
    wallet = EIP155Lib.init({ mnemonic: mnemonic });
  } else {
    wallet = EIP155Lib.init({});
    mnemonic = wallet.getMnemonic();
  }

  address = wallet.getAddress();

  eip155Wallets = {
    [address]: wallet
  };
  eip155Addresses = Object.keys(eip155Wallets);

  return {
    eip155Wallets,
    eip155Addresses,
    mnemonic
  };
}

export function storeEIP155Wallet(mnemonic) {
  localStorage.setItem('EIP155_MNEMONIC_1', mnemonic);
}

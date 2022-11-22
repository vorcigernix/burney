import { providers, Wallet } from 'ethers';



/**
 * Library
 */
export default class EIP155Lib {
  wallet;

  constructor(wallet) {
    this.wallet = wallet;
  }

  static init({ mnemonic }) {
    const wallet = mnemonic ? Wallet.fromMnemonic(mnemonic) : Wallet.createRandom();

    return new EIP155Lib(wallet);
  }

  getMnemonic() {
    return this.wallet.mnemonic.phrase;
  }

  getAddress() {
    return this.wallet.address;
  }

  signMessage(message) {
    return this.wallet.signMessage(message);
  }

  _signTypedData(domain, types, data) {
    return this.wallet._signTypedData(domain, types, data);
  }

  connect(provider) {
    return this.wallet.connect(provider);
  }

  signTransaction(transaction) {
    return this.wallet.signTransaction(transaction);
  }
}

import { PublicService } from '@makerdao/services-core';

export default class CustomService extends PublicService {
  constructor(name = 'custom') {
    super(name, ['web3', 'smartContract']);
  }

  getContractName() {
    return this.get('smartContract').getContractByName('CONTRACT_NAME');
  }
}

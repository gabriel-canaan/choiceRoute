

import {
    PublicAccount,
    NetworkType,
    TransferTransaction,
    Deadline,
    PlainMessage,
    Address,
    AggregateTransaction,
    XEM,
    Account} from 'nem2-sdk';
  
  
  const initiatorPrivateKey = process.env.COSIGNATORY_1_PRIVATE_KEY as string;
  
  const cosignatoriesPks: string[] = [
    'pk1',
    'pk2',
    'pk3',
  ];
  const recipientAddress = 'SD5DT3-CH4BLA-BL5HIM-EKP2TA-PUKF4N-Y3L5HR-IR54';
  
  const multisigAccountPublicKey = '202B3861F34F6141E120742A64BC787D6EBC59C9EFB996F4856AA9CBEE11CD31';
  const multisigAccount = PublicAccount.createFromPublicKey(multisigAccountPublicKey, NetworkType.MIJIN_TEST);
  const initiator = Account.createFromPrivateKey(initiatorPrivateKey, NetworkType.MIJIN_TEST);
  // array of cosignatories account
  const cosignatories: Account[] = [];
  
  cosignatoriesPks.forEach((pk) => {
    // populate the array of cosignatories by using the array of private kyies
    cosignatories.push(Account.createFromPrivateKey(pk, NetworkType.MIJIN_TEST));
  });
  
  const transferTransaction = TransferTransaction.create(
    Deadline.create(),
    Address.createFromRawAddress(recipientAddress),
    [XEM.createRelative(10)],
    PlainMessage.create('sending 10 nem:xem'),
    NetworkType.MIJIN_TEST,
  );
  
  const aggregateTransaction = AggregateTransaction.createComplete(
    Deadline.create(),
    [
        transferTransaction.toAggregate(multisigAccount),
    ],
    NetworkType.MIJIN_TEST,
    [],
  );
  
  initiator.signTransactionWithCosignatories(aggregateTransaction, cosignatories);
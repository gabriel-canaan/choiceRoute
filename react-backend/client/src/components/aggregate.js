
const nem2Sdk = require("nem2-sdk");
const Account = nem2Sdk.Account,
    Deadline = nem2Sdk.Deadline,
    NetworkType = nem2Sdk.NetworkType,
    TransferTransaction = nem2Sdk.TransferTransaction,
    MosaicSupplyChangeTransaction = nem2Sdk.MosaicSupplyChangeTransaction,
    TransactionHttp = nem2Sdk.TransactionHttp,
    PlainMessage = nem2Sdk.PlainMessage,
    XEM = nem2Sdk.XEM,
    AggregateTransaction = nem2Sdk.AggregateTransaction,
    Address = nem2Sdk. Address;

// Replace with the cosignatory private key
const cosignatoryPrivateKey = process.env.COSIGNATORY_1_PRIVATE_KEY;

// Replace with the multisig public key
const multisigAccountPublicKey = 'DF12DB14EA78498B1FBAD9D73838CE97B474DA92FB9F169FE9E02A87E0E34DBC';

// Replace with recipient address
const recipientAddress = 'SBG2AR-6VPSMZ-7JTJOF-OZ5NYY-FJ4UVW-C5EIHV-N5WA';
const multisigAccount = PublicAccount.createFromPublicKey(multisigAccountPublicKey, NetworkType.MIJIN_TEST);
const cosignatoryAccount = Account.createFromPrivateKey(cosignatoryPrivateKey, NetworkType.MIJIN_TEST);

const transferTransaction = (amount) => {
    return TransferTransaction.create(Deadline.create(),
    Address.createFromRawAddress(recipientAddress), [new Mosaic(new MosaicId('choice:nzdc'),
    UInt64.fromUint(amount))],
    NetworkType.MIJIN_TEST);
};

const mosaicSupplyChangeTransaction = (amount) => {
    return MosaicSupplyChangeTransaction.create(Deadline.create(),
    mosaicID,
    MosaicSupplyType.Increase,
    UInt64.fromUint(2000000),
    // PlainMessage.create('please sir I want some more !'),
    NetworkType.MIJIN_TEST,);
};

const aggregateTransaction = AggregateTransaction.createComplete(
    Deadline.create(),
    [
        mosaicSupplyChangeTransaction.toAggregate(multisigAccount),
        transferTransaction.toAggregate(multisigAccount)
    ],
    NetworkType.MIJIN_TEST,
    []
);

const signedTransaction = cosignatoryAccount.sign(aggregateTransaction);

const transactionHttp = new TransactionHttp('http://api.beta.catapult.mijin.io:3000');

transactionHttp.announce(signedTransaction).subscribe(x => console.log(x),
    err => console.error(err));
const noop = () => ({});
const noopClass = class { constructor() {} };

const signedTx = {};
const tx = { toAggregate: noop };

module.exports = {
  Account: {
    createFromPrivateKey: () => ({ sign: () => signedTx, signTransactionWithCosignatories: noop }),
  },
  AccountHttp: noopClass,
  Address: { createFromRawAddress: noop },
  AggregateTransaction: { createComplete: () => tx },
  Deadline: { create: noop },
  Mosaic: noopClass,
  MosaicHttp: noopClass,
  MosaicId: noopClass,
  MosaicService: noopClass,
  MosaicSupplyChangeTransaction: { create: () => tx },
  MosaicSupplyType: { Increase: 1, Decrease: 0 },
  NamespaceHttp: noopClass,
  NetworkType: { MIJIN_TEST: 144 },
  PlainMessage: { create: noop },
  PublicAccount: { createFromPublicKey: noop },
  TransactionHttp: class { announce() { return { subscribe: noop }; } },
  TransferTransaction: { create: () => tx },
  UInt64: { fromUint: noop },
  XEM: { createRelative: noop },
};

# JavaScript Data Primitives Library for Pugdag

**PLEASE NOTE: This project is under heavy development and is not
production ready**

Based on the popular [Bitcore library](https://github.com/bitpay/bitcore)
developed by BitPay for the Bitcoin and [Kaspacore](https://github.com/aspectron/kaspa-core-lib)
developed by ASPECTRON Inc., Pugdagcore library provides primitives for
interfacing with the Pugdag network.

## Get Started

```sh
git clone https://github.com/Pugdag/node-pugdag-core-lib
```

Adding Pugdagcore to your app's `package.json`:

```json
"dependencies": {
    "pugdag/pugdagcore-lib": "*"
}
```

## Pugdag adaptation

Pugdagcore library provides primitives such as Transaction and UTXO
data structures customized for use with the next-generation
high-performance Pugdag network.

## Documentation

The complete docs are hosted here: [bitcore documentation](https://github.com/bitpay/bitcore).
There's also a [bitcore API reference](https://github.com/bitpay/bitcore/blob/master/packages/bitcore-node/docs/api-documentation.md)
available generated from the JSDocs of the project, where you'll find
low-level details on each bitcore utility.

## Building the Browser Bundle

To build a pugdagcore-lib full bundle for the browser:

```sh
gulp browser
```

This will generate files named `pugdagcore-lib.js` and
`pugdagcore-lib.min.js`.

# License

Code released under [the MIT license](https://github.com/bitpay/bitcore/blob/master/LICENSE).

Bitcore - Copyright 2013-2019 BitPay, Inc. Bitcore is a trademark
maintained by BitPay, Inc.

Kaspacore - Copyright 2020 ASPECTRON Inc.

Pugdagcore - Copyright 2024 Pugdag Developers.

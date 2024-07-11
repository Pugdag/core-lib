'use strict';


const secp256k1 = require('secp256k1-wasm');
const blake2b = require('blake2b-wasm');

var pugdagcore = module.exports;

pugdagcore.secp256k1 = secp256k1;

// module information
pugdagcore.version = 'v' + require('./package.json').version;
pugdagcore.versionGuard = function(version) {
	if (version !== undefined) {
		var message = 'More than one instance of pugdagcore-lib found. ' +
			'Please make sure to require pugdagcore-lib and check that submodules do' +
			' not also include their own pugdagcore-lib dependency.';
		throw new Error(message);
	}
};
pugdagcore.versionGuard(global._pugdagcoreLibVersion);
global._pugdagcoreLibVersion = pugdagcore.version;


const wasmModulesLoadStatus = new Map();
pugdagcore.wasmModulesLoadStatus = wasmModulesLoadStatus;
wasmModulesLoadStatus.set("blake2b", false);
wasmModulesLoadStatus.set("secp256k1", false);

const setWasmLoadStatus = (mod, loaded) => {
	//console.log("setWasmLoadStatus:", mod, loaded)
	wasmModulesLoadStatus.set(mod, loaded);
	let allLoaded = true;
	wasmModulesLoadStatus.forEach((loaded, mod) => {
		//console.log("wasmModulesLoadStatus:", mod, loaded)
		if (!loaded)
			allLoaded = false;
	})

	if (allLoaded)
		pugdagcore.ready();
}


blake2b.ready(() => {
	setWasmLoadStatus("blake2b", true);
})

secp256k1.onRuntimeInitialized = () => {
	//console.log("onRuntimeInitialized")
	setTimeout(() => {
		setWasmLoadStatus("secp256k1", true);
	}, 1);
}

secp256k1.onAbort = (error) => {
	console.log("secp256k1:onAbort:", error)
}
const deferred = ()=>{
	let methods = {};
	let promise = new Promise((resolve, reject)=>{
		methods = {resolve, reject};
	})
	Object.assign(promise, methods);
	return promise;
}
const readySignal = deferred();

pugdagcore.ready = ()=>{
	readySignal.resolve(true);
}
pugdagcore.initRuntime = ()=>{
	return readySignal;
}


// crypto
pugdagcore.crypto = {};
pugdagcore.crypto.BN = require('./lib/crypto/bn');
pugdagcore.crypto.ECDSA = require('./lib/crypto/ecdsa');
pugdagcore.crypto.Schnorr = require('./lib/crypto/schnorr');
pugdagcore.crypto.Hash = require('./lib/crypto/hash');
pugdagcore.crypto.Random = require('./lib/crypto/random');
pugdagcore.crypto.Point = require('./lib/crypto/point');
pugdagcore.crypto.Signature = require('./lib/crypto/signature');

// encoding
pugdagcore.encoding = {};
pugdagcore.encoding.Base58 = require('./lib/encoding/base58');
pugdagcore.encoding.Base58Check = require('./lib/encoding/base58check');
pugdagcore.encoding.BufferReader = require('./lib/encoding/bufferreader');
pugdagcore.encoding.BufferWriter = require('./lib/encoding/bufferwriter');
pugdagcore.encoding.Varint = require('./lib/encoding/varint');

// utilities
pugdagcore.util = {};
pugdagcore.util.buffer = require('./lib/util/buffer');
pugdagcore.util.js = require('./lib/util/js');
pugdagcore.util.preconditions = require('./lib/util/preconditions');
pugdagcore.util.base32 = require('./lib/util/base32');
pugdagcore.util.convertBits = require('./lib/util/convertBits');
pugdagcore.setDebugLevel = (level)=>{
	pugdagcore.util.js.debugLevel = level;
}

// errors thrown by the library
pugdagcore.errors = require('./lib/errors');

// main bitcoin library
pugdagcore.Address = require('./lib/address');
pugdagcore.Block = require('./lib/block');
pugdagcore.MerkleBlock = require('./lib/block/merkleblock');
pugdagcore.BlockHeader = require('./lib/block/blockheader');
pugdagcore.HDPrivateKey = require('./lib/hdprivatekey.js');
pugdagcore.HDPublicKey = require('./lib/hdpublickey.js');
pugdagcore.Networks = require('./lib/networks');
pugdagcore.Opcode = require('./lib/opcode');
pugdagcore.PrivateKey = require('./lib/privatekey');
pugdagcore.PublicKey = require('./lib/publickey');
pugdagcore.Script = require('./lib/script');
pugdagcore.Transaction = require('./lib/transaction');
pugdagcore.URI = require('./lib/uri');
pugdagcore.Unit = require('./lib/unit');

// dependencies, subject to change
pugdagcore.deps = {};
pugdagcore.deps.bnjs = require('bn.js');
pugdagcore.deps.bs58 = require('bs58');
pugdagcore.deps.Buffer = Buffer;
pugdagcore.deps.elliptic = require('elliptic');
pugdagcore.deps._ = require('lodash');

// Internal usage, exposed for testing/advanced tweaking
pugdagcore.Transaction.sighash = require('./lib/transaction/sighash');

const assert = require('assert');
const cosmosjs = require("../src");

const mnemonic = "swear buyer security impulse public stereo peasant correct cross tornado bid discover anchor float venture deal patch property cool wreck eight dwarf december surface";

describe("Rizon", function() {
	const chainId = "groot-011";
	const cosmos = cosmosjs.network("https://lcd-rizon-testnet.cosmostation.io", chainId);
	describe("getAddress", function () {

		it("gets a cosmos address from mnemonic", function () {
			let address = cosmos.getAddress(mnemonic);
			assert.strictEqual(address, "rizon1juaucju67kcxpn522k9h5et8h529tqlnayghma");
		});
	});
});


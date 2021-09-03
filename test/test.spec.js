const assert = require('assert');
const cosmosjs = require("../src");

const mnemonic = "swear buyer security impulse public stereo peasant correct cross tornado bid discover anchor float venture deal patch property cool wreck eight dwarf december surface";

describe("Rizon", function() {
	const chainId = "groot-011";
	const rizon = cosmosjs.network("http://127.0.0.1:1337", chainId);
	rizon.setBech32MainPrefix("rizon");
	rizon.setPath("m/44'/1217'/0'/0/0");
	describe("getAddress", function () {

		it("gets a cosmos address from mnemonic", function () {
			let address = rizon.getAddress(mnemonic);
			assert.strictEqual(address, "rizon1juaucju67kcxpn522k9h5et8h529tqlnayghma");
		});
	});
});

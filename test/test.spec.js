const assert = require('assert');
const cosmosjs = require("../src");

const mnemonic = "swear buyer security impulse public stereo peasant correct cross tornado bid discover anchor float venture deal patch property cool wreck eight dwarf december surface";

describe("Rizon", function() {
	const chainId = "groot-014";
	const rizon = cosmosjs.network("http://seed-2.testnet.rizon.world:1337", chainId);
	rizon.setBech32MainPrefix("rizon");
	rizon.setPath("m/44'/118'/0'/0/0");
	describe("getAddress", function () {

		it("gets a cosmos address from mnemonic", function () {
			let address = rizon.getAddress(mnemonic);
			assert.strictEqual(address, "rizon1fnk3lxlks7tdg6x55ynv6vggtnd73ycqnam5u8");
		});
	});
});

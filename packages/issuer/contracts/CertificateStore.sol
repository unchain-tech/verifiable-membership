pragma solidity >=0.6.0;

contract CertificateStore {
	enum State {not_issued, valid, revoked}

	struct Hash {
		State status;
	}

	address internal owner;
	// key: hash, value: Batch/Cert
	mapping(bytes32 => Hash) public hashes;

	modifier only_owner() {
		require(
			msg.sender == owner,
			"only contract owner can issue"
		);
		_;
	}

	constructor() public {
		owner = msg.sender;
	}

	function issue_hash(bytes32 _hash) public only_owner {
		hashes[_hash].status = State.valid;
	}

	function revoke_hash(bytes32 _hash) public only_owner {
		hashes[_hash].status = State.revoked;
	}
}
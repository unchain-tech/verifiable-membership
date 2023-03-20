/* SPDX-License-Identifier: MIT */

pragma solidity ^0.8.17;

contract EthereumDIDRegistry {
    mapping(address => address) public owners;
    mapping(address => mapping(bytes32 => mapping(address => uint)))
        public delegates;
    mapping(address => uint) public changed;
    mapping(address => uint) public nonce;

    modifier onlyOwner(address identity, address actor) {
        require(actor == identityOwner(identity), "bad_actor");
        _;
    }

    event DIDOwnerChanged(
        address indexed identity,
        address owner,
        uint previousChange
    );

    event DIDDelegateChanged(
        address indexed identity,
        bytes32 delegateType,
        address delegate,
        uint validTo,
        uint previousChange
    );

    event DIDAttributeChanged(
        address indexed identity,
        bytes32 name,
        bytes value,
        uint validTo,
        uint previousChange
    );

    function identityOwner(address identity) public view returns (address) {
        address owner = owners[identity];
        if (owner != address(0x00)) {
            return owner;
        }
        return identity;
    }

    function _checkSignature(
        address identity,
        uint8 sigV,
        bytes32 sigR,
        bytes32 sigS,
        bytes32 hash
    ) internal returns (address) {
        address signer = ecrecover(hash, sigV, sigR, sigS);
        require(signer == identityOwner(identity), "bad_signature");
        nonce[signer]++;
        return signer;
    }

    function validDelegate(
        address identity,
        bytes32 delegateType,
        address delegate
    ) public view returns (bool) {
        uint validity = delegates[identity][
            keccak256(abi.encode(delegateType))
        ][delegate];
        return (validity > block.timestamp);
    }

    function _changeOwner(
        address identity,
        address actor,
        address newOwner
    ) internal onlyOwner(identity, actor) {
        owners[identity] = newOwner;
        emit DIDOwnerChanged(identity, newOwner, changed[identity]);
        changed[identity] = block.number;
    }

    function changeOwner(address identity, address newOwner) public {
        _changeOwner(identity, msg.sender, newOwner);
    }

    function changeOwnerSigned(
        address identity,
        uint8 sigV,
        bytes32 sigR,
        bytes32 sigS,
        address newOwner
    ) public {
        bytes32 hash = keccak256(
            abi.encodePacked(
                bytes1(0x19),
                bytes1(0),
                this,
                nonce[identityOwner(identity)],
                identity,
                "changeOwner",
                newOwner
            )
        );
        _changeOwner(
            identity,
            _checkSignature(identity, sigV, sigR, sigS, hash),
            newOwner
        );
    }

    function _addDelegate(
        address identity,
        address actor,
        bytes32 delegateType,
        address delegate,
        uint validity
    ) internal onlyOwner(identity, actor) {
        delegates[identity][keccak256(abi.encode(delegateType))][delegate] =
            block.timestamp +
            validity;
        emit DIDDelegateChanged(
            identity,
            delegateType,
            delegate,
            block.timestamp + validity,
            changed[identity]
        );
        changed[identity] = block.number;
    }

    function addDelegate(
        address identity,
        bytes32 delegateType,
        address delegate,
        uint validity
    ) public {
        _addDelegate(identity, msg.sender, delegateType, delegate, validity);
    }

    function addDelegateSigned(
        address identity,
        uint8 sigV,
        bytes32 sigR,
        bytes32 sigS,
        bytes32 delegateType,
        address delegate,
        uint validity
    ) public {
        bytes32 hash = keccak256(
            abi.encodePacked(
                bytes1(0x19),
                bytes1(0),
                this,
                nonce[identityOwner(identity)],
                identity,
                "addDelegate",
                delegateType,
                delegate,
                validity
            )
        );
        _addDelegate(
            identity,
            _checkSignature(identity, sigV, sigR, sigS, hash),
            delegateType,
            delegate,
            validity
        );
    }

    function _revokeDelegate(
        address identity,
        address actor,
        bytes32 delegateType,
        address delegate
    ) internal onlyOwner(identity, actor) {
        delegates[identity][keccak256(abi.encode(delegateType))][
            delegate
        ] = block.timestamp;
        emit DIDDelegateChanged(
            identity,
            delegateType,
            delegate,
            block.timestamp,
            changed[identity]
        );
        changed[identity] = block.number;
    }

    function revokeDelegate(
        address identity,
        bytes32 delegateType,
        address delegate
    ) public {
        _revokeDelegate(identity, msg.sender, delegateType, delegate);
    }

    function revokeDelegateSigned(
        address identity,
        uint8 sigV,
        bytes32 sigR,
        bytes32 sigS,
        bytes32 delegateType,
        address delegate
    ) public {
        bytes32 hash = keccak256(
            abi.encodePacked(
                bytes1(0x19),
                bytes1(0),
                this,
                nonce[identityOwner(identity)],
                identity,
                "revokeDelegate",
                delegateType,
                delegate
            )
        );
        _revokeDelegate(
            identity,
            _checkSignature(identity, sigV, sigR, sigS, hash),
            delegateType,
            delegate
        );
    }

    function _setAttribute(
        address identity,
        address actor,
        bytes32 name,
        bytes memory value,
        uint validity
    ) internal onlyOwner(identity, actor) {
        emit DIDAttributeChanged(
            identity,
            name,
            value,
            block.timestamp + validity,
            changed[identity]
        );
        changed[identity] = block.number;
    }

    function setAttribute(
        address identity,
        bytes32 name,
        bytes memory value,
        uint validity
    ) public {
        _setAttribute(identity, msg.sender, name, value, validity);
    }

    function setAttributeSigned(
        address identity,
        uint8 sigV,
        bytes32 sigR,
        bytes32 sigS,
        bytes32 name,
        bytes memory value,
        uint validity
    ) public {
        bytes32 hash = keccak256(
            abi.encodePacked(
                bytes1(0x19),
                bytes1(0),
                this,
                nonce[identityOwner(identity)],
                identity,
                "setAttribute",
                name,
                value,
                validity
            )
        );
        _setAttribute(
            identity,
            _checkSignature(identity, sigV, sigR, sigS, hash),
            name,
            value,
            validity
        );
    }

    function _revokeAttribute(
        address identity,
        address actor,
        bytes32 name,
        bytes memory value
    ) internal onlyOwner(identity, actor) {
        emit DIDAttributeChanged(identity, name, value, 0, changed[identity]);
        changed[identity] = block.number;
    }

    function revokeAttribute(
        address identity,
        bytes32 name,
        bytes memory value
    ) public {
        _revokeAttribute(identity, msg.sender, name, value);
    }

    function revokeAttributeSigned(
        address identity,
        uint8 sigV,
        bytes32 sigR,
        bytes32 sigS,
        bytes32 name,
        bytes memory value
    ) public {
        bytes32 hash = keccak256(
            abi.encodePacked(
                bytes1(0x19),
                bytes1(0),
                this,
                nonce[identityOwner(identity)],
                identity,
                "revokeAttribute",
                name,
                value
            )
        );
        _revokeAttribute(
            identity,
            _checkSignature(identity, sigV, sigR, sigS, hash),
            name,
            value
        );
    }
}

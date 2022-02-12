// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract NFT is ERC721URIStorage {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    address contractAddress;
    constructor(address marketplaceAddress) ERC721("Verse Tokens", "VRST") {
        contractAddress = marketplaceAddress;
    }

    function createToken(string memory tokenURI) public returns (uint256) {
        _tokenIds.increment();
        uint256 newItemId = _tokenIds.current();

        
        _mint(msg.sender, newItemId);
        _setTokenURI(newItemId, tokenURI);
        // setApprovalForAll(contractAddress, true);

        return newItemId;
    }

    function fetchTokenId() public view returns(uint256) {
        uint256 _itemId = _tokenIds.current();
        return _itemId;
    }

    function giveSaleApproval(address _saleOwner, uint256 _tokenId) public {
        // approve(_saleOwner, _tokenId);
        setApprovalForAll(_saleOwner, true);
    }

}
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;


import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "./NFT.sol";
import "./Sale.sol";
import "hardhat/console.sol";


contract Verse is ReentrancyGuard {
    using Counters for Counters.Counter;
    Counters.Counter private _itemIds;
    Counters.Counter private _saleIds;
    Counters.Counter private _saleOwnerIds;

    address public nftContractAddress;
    address public organization;
    mapping(address => int256) reliability; 

    constructor() {
        organization = payable(msg.sender);
    }
    

    struct Item{
        uint256 itemId;
        address nftContract;
        uint256 tokenId;
        address payable owner;
        bool listed;
    }

    mapping(uint256 => Item) private idToItem;

    event ItemCreated (
        uint256 indexed itemId,
        address indexed nftContract,
        uint256 indexed tokenId,
        address owner,
        bool listed
    );


    struct SaleDetails{
        uint256 saleId;
        address saleAddress;
        address ownerAddress;
        int256 saleReliability;
        uint256 nftLimit;
        uint256 saleState; // 1: Sellers joining, 2: Buyers joining, 3: Sale ended.
        uint256 saleCategory; // 1: Art, 2: Bonds, 3: Securities, 4: Events, 5: Miscellaneous.
        string saleName;
        uint256 MSP;
        uint256 duration; // in minutes (if duration is x, then there will be x time for sellers and x time for buyers)
    }

    mapping(uint256 => SaleDetails) private idToSaleDetails;

    function createItem(
        uint256 _tokenId
    ) public nonReentrant {
        require(nftContractAddress != address(0),"Invalid NFT Address");
        
        _itemIds.increment();
        uint256 _itemId = _itemIds.current();

        idToItem[_itemId] = Item(
            _itemId,
            nftContractAddress,
            _tokenId,
            payable(msg.sender),
            false
        );

        emit ItemCreated(_itemId, nftContractAddress, _tokenId, payable(msg.sender), false);
    }

    function fetchMyItems(address _user) public view returns (Item[] memory){
        uint256 itemCount = _itemIds.current();
        uint256 currentIndex = 0;

        Item[] memory items = new Item[](itemCount);
        for(uint i=0; i < itemCount; i++){
            if(idToItem[i+1].owner == _user) {
                uint256 currentId = i + 1;
                Item storage currentItem = idToItem[currentId];
                items[currentIndex] = currentItem;
                currentIndex += 1;
            }
        }
        return items;
    }

    function createSale(
        uint256 _MSP,
        string memory _saleName,
        uint256 _saleCategory,
        uint256 _nftLimit,
        uint256 _duration
    ) public payable nonReentrant {
        require(msg.value >= (_nftLimit)*(1 ether/1000),"Please pay required price to create sale");
        _saleIds.increment();
        uint256 _saleId = _saleIds.current();

        Sale newSale = new Sale(msg.sender, msg.value, _MSP, _saleName,_saleId, _saleCategory, _nftLimit, _duration, address(this), organization);
        
        idToSaleDetails[_saleId] = SaleDetails(
            _saleId,
            address(newSale),
            payable(msg.sender),
            reliability[msg.sender],
            _nftLimit,
            1,
            _saleCategory,
            _saleName,
            _MSP,
            _duration
        );
    }

    // 1: Art
    function fetchSales() public view returns (SaleDetails[] memory){
        uint256 itemCount = _saleIds.current();
        uint256 currentIndex = 0;
        

        SaleDetails[] memory items = new SaleDetails[](itemCount);
        for(uint i=0; i < itemCount; i++){
            if(idToSaleDetails[i+1].saleState == 1 || idToSaleDetails[i+1].saleState == 2) {
                uint256 currentId = i + 1;
                SaleDetails storage currentItem = idToSaleDetails[currentId];
                items[currentIndex] = currentItem;
                currentIndex += 1;
            }
        }
        return items;
    }

    // // 2: Bonds
    // function fetchSales2() public view returns (SaleDetails[] memory){
    //     uint256 itemCount = _saleIds.current();
    //     uint256 currentIndex = 0;

    //     SaleDetails[] memory items = new SaleDetails[](itemCount);
    //     for(uint i=0; i < itemCount; i++){
    //         if(idToSaleDetails[i+1].saleState == 1 || idToSaleDetails[i+1].saleState == 2) {
    //             if(idToSaleDetails[i+1].saleCategory == 2){ //category details mentioned in the struct definition
    //                 uint256 currentId = i + 1;
    //                 SaleDetails storage currentItem = idToSaleDetails[currentId];
    //                 items[currentIndex] = currentItem;
    //                 currentIndex += 1;
    //             }
    //         }
    //     }
    //     return items;
    // }

    // // 3: Securities
    // function fetchSales3() public view returns (SaleDetails[] memory){
    //     uint256 itemCount = _saleIds.current();
    //     uint256 currentIndex = 0;

    //     SaleDetails[] memory items = new SaleDetails[](itemCount);
    //     for(uint i=0; i < itemCount; i++){
    //         if(idToSaleDetails[i+1].saleState == 1 || idToSaleDetails[i+1].saleState == 2) {
    //             if(idToSaleDetails[i+1].saleCategory == 3){ //category details mentioned in the struct definition
    //                 uint256 currentId = i + 1;
    //                 SaleDetails storage currentItem = idToSaleDetails[currentId];
    //                 items[currentIndex] = currentItem;
    //                 currentIndex += 1;
    //             }
    //         }
    //     }
    //     return items;
    // }
    
    // // 4: Events
    // function fetchSales4() public view returns (SaleDetails[] memory){
    //     uint256 itemCount = _saleIds.current();
    //     uint256 currentIndex = 0;

    //     SaleDetails[] memory items = new SaleDetails[](itemCount);
    //     for(uint i=0; i < itemCount; i++){
    //         if(idToSaleDetails[i+1].saleState == 1 || idToSaleDetails[i+1].saleState == 2) {
    //             if(idToSaleDetails[i+1].saleCategory == 4){ //category details mentioned in the struct definition
    //                 uint256 currentId = i + 1;
    //                 SaleDetails storage currentItem = idToSaleDetails[currentId];
    //                 items[currentIndex] = currentItem;
    //                 currentIndex += 1;
    //             }
    //         }
    //     }
    //     return items;
    // }

    // // 5: Miscellaneous
    // function fetchSales5() public view returns (SaleDetails[] memory){
    //     uint256 itemCount = _saleIds.current();
    //     uint256 currentIndex = 0;

    //     SaleDetails[] memory items = new SaleDetails[](itemCount);
    //     for(uint i=0; i < itemCount; i++){
    //         if(idToSaleDetails[i+1].saleState == 1 || idToSaleDetails[i+1].saleState == 2) {
    //             if(idToSaleDetails[i+1].saleCategory == 5){ //category details mentioned in the struct definition
    //                 uint256 currentId = i + 1;
    //                 SaleDetails storage currentItem = idToSaleDetails[currentId];
    //                 items[currentIndex] = currentItem;
    //                 currentIndex += 1;
    //             }
    //         }
    //     }
    //     return items;
    // }

    // function fetchNftAddress(uint256 _itemId) public view returns(address) {
    //     return idToItem[_itemId].nftContract;
    // }

    function fetchItemDetails(uint256 _itemId) public view returns (uint256,address,uint256,address,bool){
        return (idToItem[_itemId].itemId, idToItem[_itemId].nftContract, idToItem[_itemId].tokenId, idToItem[_itemId].owner, idToItem[_itemId].listed );
    }

    function itemListingStateChange(uint _itemId) public {
        idToItem[_itemId].listed = (!idToItem[_itemId].listed);
    }

    // sale state change function
    function changeSaleState(uint256 _saleId,uint256 _toState) public {
        idToSaleDetails[_saleId].saleState = _toState;
    } 

    // nft owner change function
    function changeItemOwner(uint256 _itemId, address _newOwner) public {
        idToItem[_itemId].owner = payable(_newOwner);
    }

    // feedback
    function changeReliability(uint256 _saleId, bool _satisfied) public{
        if(_satisfied == true){
            reliability[idToSaleDetails[_saleId].ownerAddress] += 1;
        }else{
            reliability[idToSaleDetails[_saleId].ownerAddress] -= 1;
        }  
    }

    function fetchCurrentSaleId() public view returns(uint256){
        uint256 _saleId = _saleIds.current();
        return _saleId;
    }

    function fetchSaleDetails(uint256 _saleId) public view returns(SaleDetails memory){
        return idToSaleDetails[_saleId];
    }

    function setNftContractAddress(address _nftContract) public nonReentrant { //This function is for tests only.
        nftContractAddress = _nftContract;
    }

    // function idToNftTokenId(uint256 _id) public view returns(uint256) {
    //     return idToItem[_id].itemId;
    // } 
}



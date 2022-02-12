// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;


import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "./Verse.sol";
import "./NFT.sol";



contract Sale is ReentrancyGuard {

    using Counters for Counters.Counter;

    address public verseAddress;
    address public organizationAddress;
    address public saleOwner;
    uint256 public verseSaleId;
    uint256 public deposit;
    uint256 public MSP;
    string public saleName;
    uint256 public saleCategory;
    uint256 public saleState; // 1: Sellers joining, 2: Buyers joining, 3: Sale ended
    uint256 public nftLimit;

    uint256 public duration;
    uint256 public durationSeconds;

    uint256 public lastTimeStamp;

    Counters.Counter private _itemIds;
    Counters.Counter private _buyerIds;

    mapping(uint256 => uint256) public itemIdToPoints;
    uint256 totalPoints = 0;
    mapping(address => bool) nftAllottedToBidder;

    
    struct Participant{
        bool feedbackGiven;
        bool satisfied;
    }
    mapping(address => Participant) AddressToParticipant;

    // mapping(address => bool) public nftReceived;
    
    struct Item{
        uint256 itemId;
        uint256 verseItemId;
        address nftContract;
        uint256 tokenId;
        address payable owner;
        address payable sellTo;
    
        Counters.Counter bidIds;
        mapping(uint256 => address) idToBidderAddress;
        mapping(address => uint256) bids;
        uint256 currentBid;
        uint256 totalBid;
        uint256 points;
    }

    struct ItemThumb {
        address _nftAddress;
        uint256 _tokenId;
        uint256 _totalBid;
        uint256 _itemId;
    }

    

    mapping(uint256 => Item) idToItems;
    
    constructor(
        address _saleOwner,
        uint256 _deposit,
        uint256 _MSP,
        string memory _saleName,
        uint256 _saleId,
        uint256 _saleCategory,
        uint256 _nftLimit,
        uint256 _duration,
        address _verseAddress,
        address _organization
    ) {
        verseAddress = _verseAddress;
        organizationAddress = _organization;
        saleOwner = _saleOwner;
        deposit = _deposit;
        MSP = _MSP;
        saleName = _saleName;
        verseSaleId = _saleId;
        saleCategory = _saleCategory;
        nftLimit = _nftLimit;
        
        duration = _duration;
        durationSeconds = 60*_duration;
        lastTimeStamp = block.timestamp;
        saleState = 1;
    }

    function addNft(
        uint256 _nftId
    ) public payable nonReentrant {
        Verse _verse = Verse(verseAddress);
        
        uint256 _verseItemId;
        address _nftContractAddress;
        uint256 _tokenId;
        address _owner;
        bool _listed; 

        (_verseItemId, _nftContractAddress, _tokenId, _owner, _listed) = _verse.fetchItemDetails(_nftId);
        
        require(_nftContractAddress != address(0));
        require(msg.value >= (MSP/3),"Please sumbit required listing fee.");
        require(msg.sender == _owner, "Caller is not owner");
        
        Counters.Counter memory _bidIds;
        // mapping(uint256 => address)  _idToBidderAddress;
        // mapping(address => uint256) calldata _bids;

        _itemIds.increment();
        uint256 _itemId = _itemIds.current();

        Item storage I = idToItems[_itemId]; 
        I.itemId = _itemId;
        I.verseItemId = _verseItemId;
        I.nftContract = _nftContractAddress;
        I.tokenId = _tokenId;
        I.owner = payable(_owner);
        I.sellTo = payable(address(0));
        I.bidIds = _bidIds;
        I.currentBid = 0;
        I.totalBid = 0;
        I.points = 0;

        _verse.itemListingStateChange(_nftId);

        AddressToParticipant[_owner] = Participant(
            false,
            false
        );
    }

    
    
    function changeState() public {
        require(msg.sender == organizationAddress || msg.sender == saleOwner,"To be called by the sale onwer.");
        require(saleState < 3,"The sale has ended.");
        saleState += 1;

        Verse _verse = Verse(verseAddress);
        _verse.changeSaleState(verseSaleId, saleState);
    }

    function addBid(
        uint256 _nftId
    ) public payable nonReentrant {
        require(msg.sender != idToItems[_nftId].owner,"Can't bid for your own item.");
        require(msg.value >= (MSP/2),"Please enter a bid greater than or equal to minimum threshold.");
        require(msg.value >= (idToItems[_nftId].currentBid-idToItems[_nftId].bids[msg.sender]),"Your total bid must be at least 10% greater than the previous bid.");
        idToItems[_nftId].bidIds.increment();
        uint bidId = idToItems[_nftId].bidIds.current();
        
        idToItems[_nftId].idToBidderAddress[bidId] = msg.sender;
        idToItems[_nftId].bids[msg.sender] += msg.value;
        idToItems[_nftId].totalBid += msg.value;
        idToItems[_nftId].currentBid = msg.value;

        
        AddressToParticipant[msg.sender] = Participant(
            false,
            false
        );
    }

    function endSale() public payable nonReentrant {
        require(msg.sender == saleOwner || msg.sender == organizationAddress,"To be performed by sale owner.");
        
        setPoints();
        distribute();
        changeState();
    }

    function setPoints() internal {
        require(msg.sender == saleOwner || msg.sender == organizationAddress,"You do not have permissions to call this function.");
        uint256 totalItemsCount = _itemIds.current();

        for(uint256 i=0; i<totalItemsCount; i++){
            uint256 totalBiddersCount = idToItems[i+1].bidIds.current();
            uint256 temp = 0;
            idToItems[i+1].points = 0;
            for(uint256 j=0; j < totalBiddersCount; j++){
                address inv = idToItems[i+1].idToBidderAddress[j+1];
                temp += sqrt(idToItems[i+1].bids[inv]);
            }
            idToItems[i+1].points += (temp*temp); 
            totalPoints += idToItems[i+1].points;
        }
    }

    function distribute() public payable {
        require(msg.sender == saleOwner || msg.sender == organizationAddress,"You do not have permissions to call this function.");
        uint256 totalBalance = address(this).balance;
        uint256 usableBalance = (9*totalBalance)/10;  // buffer for gas costs, extra will go to organization.
        uint256 playersBalance = (9*usableBalance)/10; // one-tenth goes to sale owner

        uint256 totalItemsCount = _itemIds.current();

        // transfering currencies
        for(uint256 i=0; i<totalItemsCount; i++){
            payable(idToItems[i+1].owner).transfer((idToItems[i+1].points*playersBalance)/totalPoints);
        }
        payable(saleOwner).transfer(usableBalance/10);
        
        
        for(uint256 i=0; i<totalItemsCount; i++){
            if(idToItems[i+1].points == 0){
                idToItems[i+1].sellTo = idToItems[i+1].owner;
            }else{
                //find highest bidder.
                uint256 totalBids = idToItems[i+1].bidIds.current();
                uint256 highestBid = 0;

                for(uint256 j=0; j<totalBids; j++){
                    if(idToItems[i+1].bids[idToItems[i+1].idToBidderAddress[j+1]]>((110*highestBid)/100)){
                        highestBid = idToItems[i+1].bids[idToItems[i+1].idToBidderAddress[j+1]];
                    }
                }
                for(uint256 j=totalBids-1; j>=0; j++){
                    if(nftAllottedToBidder[idToItems[i+1].idToBidderAddress[j+1]]==false){
                        idToItems[i+1].sellTo = payable(idToItems[i+1].idToBidderAddress[j+1]);
                        break;
                    }else{
                        continue;
                    }
                }
            }
        }

        //get the verse contract
        Verse _verse = Verse(verseAddress);
        // NFT _nft = NFT(idToItems[1].nftContract);
        

        for(uint256 i=0; i<totalItemsCount; i++){  //VERY VERY IMPORTANT FUNCTIONALITY BELOW
            // IERC721(idToItems[1].nftContract).transferFrom(idToItems[i+1].owner, idToItems[i+1].sellTo, idToItems[i+1].tokenId);
            _verse.changeItemOwner(idToItems[i+1].verseItemId, idToItems[i+1].sellTo);
        }

        //pay remaining to organization
        payable(organizationAddress).transfer(address(this).balance);
    }

    function feedback(bool _satisfied) public {
        require(saleState == 3,"The sale must have ended.");
        require(AddressToParticipant[msg.sender].feedbackGiven == false,"Feedback already given.");
        Verse _verse = Verse(verseAddress);
        _verse.changeReliability(verseSaleId, _satisfied);
    }

    function sqrt(uint num) public pure returns(uint){
        uint start = 1;
        uint end = num;
        uint mid = start;
        while(start < end){
            mid = start + (end - start)/2;
            if(mid * mid >= num){
                end = mid;
            }else{
                start = mid+1;
            }
        }
        return end;
    }
    
    function fetchSaleItems() public view returns(
        ItemThumb[] memory
    ) {
        uint256 itemCount = _itemIds.current();
        uint256 currentIndex = 0;


        ItemThumb[] memory itemThumbs = new ItemThumb[](itemCount);
        for(uint i=0; i<itemCount ; i++){
            ItemThumb memory itTh = ItemThumb(
                idToItems[i+1].nftContract,
                idToItems[i+1].tokenId,
                idToItems[i+1].totalBid,
                idToItems[i+1].itemId
            );
            itemThumbs[currentIndex] = itTh;
            currentIndex += 1;
        }
        return itemThumbs;
    }

    // function fetchNftImages() public view returns(address[] memory) {
    //     uint256 itemCount = _itemIds.current();
    //     uint256 currentIndex = 0;

    //     address[] memory nftAddresses;
    //     for(uint i=0; i<itemCount; i++){
    //         nftAddresses[currentIndex] = idToItems[i+1].nftContract;
    //         currentIndex += 1;
    //     }
    //     return nftAddresses;
    // }

    function fetchItemDetails(uint256 _itemId) public view returns(
        address,
        uint256,
        address payable,
        address payable,
        uint256,
        uint256
    ) {
        return (
            idToItems[_itemId].nftContract,
            idToItems[_itemId].tokenId,
            idToItems[_itemId].owner,
            idToItems[_itemId].sellTo,
            idToItems[_itemId].currentBid,
            idToItems[_itemId].totalBid
        );
    }
    
    function fetchSaleOwner() public view returns(address) {
        return saleOwner;
    } 
}
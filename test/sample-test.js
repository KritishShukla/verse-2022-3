const { expect } = require("chai");
const { ethers } = require("hardhat")

describe("Verse", async function () {
  
  it("Should allow nft to be minted, sale to be created, nft to be added, sold and end sale and take feedback.", async function () {
    const accounts = await ethers.getSigners();
    const organization = accounts[0]
    
    const Verse = await ethers.getContractFactory("Verse")
    const verse = await Verse.deploy()
    await verse.deployed()
    const verseAddress = verse.address 
    console.log("Verse contract address: ",verseAddress) 

    const NFT = await ethers.getContractFactory("NFT")
    const nft = await NFT.deploy(verseAddress)
    await nft.deployed()
    await verse.setNftContractAddress(nft.address)
    

    let tokenId

    await nft.connect(accounts[1]).createToken("https://www.token1.com")
    tokenId = await nft.fetchTokenId()
    await verse.connect(accounts[1]).createItem(tokenId.toString())

    await nft.connect(accounts[2]).createToken("https://www.token1.com")
    tokenId = await nft.fetchTokenId()
    await verse.connect(accounts[2]).createItem(tokenId.toString())

    await nft.connect(accounts[3]).createToken("https://www.token1.com")
    tokenId = await nft.fetchTokenId()
    await verse.connect(accounts[3]).createItem(tokenId.toString())

    await nft.connect(accounts[4]).createToken("https://www.token1.com")
    tokenId = await nft.fetchTokenId()
    await verse.connect(accounts[4]).createItem(tokenId.toString())

    console.log("tokens so far: ",tokenId.toString())
    console.log("address of 4: ",accounts[4].address)
    // console.log("address of 4 in Verse:",)


    let saleId
    await verse.connect(accounts[5]).createSale(1000,"Pilot",1,4,2,{ value: '10000000000000000'})
    saleId = await verse.fetchCurrentSaleId()
    const saleDetails = await verse.fetchSaleDetails(saleId);
    const saleAddress = saleDetails.saleAddress
    console.log("Sale Address: ", saleAddress)

    const sale = await hre.ethers.getContractAt("Sale", saleAddress)
    
    //add nfts to sale
    let saleOwner = await sale.fetchSaleOwner()
    saleOwner = saleOwner.toString()
    console.log("Sale Owner: ", saleOwner)
    console.log("accounts[5]: " ,accounts[5].address)
    
    let nftId
    nftId = await sale.connect(accounts[1]).addNft(1,{value: 333})
    await nft.connect(accounts[1]).giveSaleApproval(saleOwner,'1')

    nftId = await sale.connect(accounts[2]).addNft(2,{value: 333})
    await nft.connect(accounts[2]).giveSaleApproval(saleOwner,'2')
    
    nftId = await sale.connect(accounts[3]).addNft(3,{value: 333})
    await nft.connect(accounts[3]).giveSaleApproval(saleOwner,'3')
    
    nftId = await sale.connect(accounts[4]).addNft(4,{value: 333})
    await nft.connect(accounts[4]).giveSaleApproval(saleOwner,'4')

    //change state
    await sale.connect(accounts[5]).changeState()

    //add bids
    await sale.connect(accounts[6]).addBid(1,{value: 1000})
    await sale.connect(accounts[7]).addBid(2,{value: 1000})
    await sale.connect(accounts[8]).addBid(3,{value: 1000})
    await sale.connect(accounts[9]).addBid(4,{value: 1000})

    await sale.connect(accounts[6]).addBid(2,{value: 1200})
    await sale.connect(accounts[6]).addBid(3,{value: 1200})
    
    //end sale
    await sale.connect(accounts[5]).endSale()

    //feedback
  });
});

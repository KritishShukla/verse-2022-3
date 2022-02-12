import React, { Component, useEffect, useState, Fragment } from 'react'
import { Link } from '../routes';
import { Router } from '../routes';
import Brand from '../brand'
import Header from '../components/Header'
import { ethers } from 'ethers'
import Web3Modal from 'web3modal'
import web3 from '../web3'

import Verse from '../artifacts/contracts/Verse.sol/Verse.json'
import NFT from '../artifacts/contracts/NFT.sol/NFT.json'

import { nftaddress, verseaddress } from '../config'

import { Dialog, Popover, Tab, Transition } from '@headlessui/react'
import { data } from 'autoprefixer';
// import { MenuIcon, SearchIcon, ShoppingBagIcon, XIcon } from '@heroicons/react/outline'

const itemDetails = {
    itemId: '6',
    itemSeller: '0xeca731d765576F675BB850aa402ab08280d463C7',
    itemImage: Brand.nft2,
    itemTitle: 'Botticelli, The Birth of Venus',
    itemDescription: 'The Birth of Venus is a painting by the Italian artist Sandro Botticelli, probably executed in the mid 1480s. It depicts the goddess Venus arriving at the shore after her birth, when she had emerged from the sea fully-grown.',
    itemNoOfBids: '3',
    itemCurrentBid: '0.5',
  }


export default function SaleItem(props) {
  
  const [userAddress,setUserAddress] = useState("")
  const [saleAddress,setSaleAddress] = useState("0x805Ac8234314dFD10Ab1A597890fa9D05f78D0AA")
  const [saleState, setSaleState] = useState('1')
  const [loading, setLoading] = useState(false)
  const [amount, setAmount] = useState('')

  useEffect(async () => {
    let data = window.location.search;
    // console.log(data.substring(1))
    await setUserAddress(data.substring(1))
    
  })

  async function changeCategory(category){
    setCategory(category)
  }

  async function addBid(){
    if(!loading){
      setLoading(true);
      await web3.eth.sendTransaction({ from: '0x6DF3472cf508b9E024C140A18Ad930774Fd713bc' ,to:'0xe7f1725e7734ce288f8367e1bb143e90bb3f0512', value: web3.utils.toWei('0.05','ether') });

      Router.push({
        pathname: `/saledashboard2/${saleAddress}`
      });
    }
  }

  return(
      
      <div className="overflow-x-hidden text-white" >
        <div className="h-screen content-center" style={{"backgroundImage":`url(${Brand.bg1})`,"backgroundPosition":"center","backgroundSize":"cover","backgroundRepeat":"no-repeat"}} >
          <Header loggedIn={true} user={userAddress} />     
          
          <section class="bg-gray-800 text-white bg-opacity-60 dark:bg-gray-800 py-3 rounded-lg max-w-3xl mx-auto">
            <div class="container px-6 mx-auto">
                <div class="items-center lg:flex">
                <img src={itemDetails.itemImage} className="rounded-xl shadow-lg object-cover h-40 w-40 p-1"></img>
                </div>
                <h2 class="text-3xl font-bold text-white dark:text-gray-100">{itemDetails.itemTitle}</h2>
                <br/>
                <p class="text-white dark:text-white lg:max-w-md">{itemDetails.itemDescription}</p>
                <br/>         

                <p class="text-white dark:text-white lg:max-w-md">ID: {itemDetails.itemId} | Seller: {itemDetails.itemSeller} </p>
                <br/> 
                <h7 class="text-3xl font-bold text-green-500 dark:text-gray-100">Current Bid: {itemDetails.itemCurrentBid} ETH</h7>
                <h7 class="text-3xl font-bold text-gray-500 dark:text-gray-100"> | Bids: {itemDetails.itemNoOfBids}</h7>
                <br/><br/>
                <input value={amount} onChange={e => setAmount(e.target.value)} type="number" className="p-3 px-8 mr-4 border border-bg-white bg-gray-900 rounded text-white placeholder-gray-300" placeholder="Enter Bid"/>
                <button onClick={addBid} class="p-2  leading-none rounded font-medium mt-3 bg-purple-700 text-m uppercase" >
                <svg class={loading ? "animate-spin h-5 w-5 mr-3 border-t-2 border-bg-white rounded-full" : "hidden"} viewBox="0 0 24 24">
                  </svg>
                  <div className={loading? "hidden" : ""}>
                    Add Bid
                  </div>
                </button>

            </div>
        </section>
        </div>
      </div>
  )
}

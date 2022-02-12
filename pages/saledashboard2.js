import React, { Component, useEffect, useState, Fragment } from 'react'
import { Link } from '../routes';
import { Router } from '../routes';
import Brand from '../brand'
import Header from '../components/Header'
import { ethers } from 'ethers'
import Web3Modal from 'web3modal'

import Verse from '../artifacts/contracts/Verse.sol/Verse.json'
import NFT from '../artifacts/contracts/NFT.sol/NFT.json'

import { nftaddress, verseaddress } from '../config'

import { Dialog, Popover, Tab, Transition } from '@headlessui/react'
import { data } from 'autoprefixer';
// import { MenuIcon, SearchIcon, ShoppingBagIcon, XIcon } from '@heroicons/react/outline'

const items = [
  {
    itemId: '5',
    itemImage: Brand.nft1,
    itemTitle: 'Pablo Picasso, Les Demoiselles',
    itemCurrentBid: '24',
    itemLink: ''
  },
  {
    itemId: '6',
    itemImage: Brand.nft2,
    itemTitle: 'Botticelli, The Birth of Venus',
    itemCurrentBid: '0.5',
    itemLink: ''
  },
  {
    itemId: '7',
    itemImage: Brand.nft3,
    itemTitle: 'James Abbott McNeill Whistler',
    itemCurrentBid: '12',
    itemLink: ''
  },
  {
    itemId: '8',
    itemImage: Brand.nft4,
    itemTitle: 'Gustav Klimt, The Kiss',
    itemCurrentBid: '12',
    itemLink: ''
  },
  {
    itemId: '9',
    itemImage: Brand.nft13,
    itemTitle: 'Van Gogh, The Starry Night',
    itemCurrentBid: '0',
    itemLink: ''
  }

]


export default function Sales(props) {
  
  const [userAddress,setUserAddress] = useState("")
  const [saleAddress,setSaleAddress] = useState("0x805Ac8234314dFD10Ab1A597890fa9D05f78D0AA")
  const [saleState, setSaleState] = useState('1')

  useEffect(async () => {
    let data = window.location.search;
    // console.log(data.substring(1))
    await setUserAddress(data.substring(1))
    
  })

  async function changeCategory(category){
    setCategory(category)
  }

  return(
      
      <div className="overflow-x-hidden text-white" >
        <div className="h-screen content-center" style={{"backgroundImage":`url(${Brand.bg1})`,"backgroundPosition":"center","backgroundSize":"cover","backgroundRepeat":"no-repeat"}} >
          <Header loggedIn={true} user={userAddress} />     
          
          
          <div >
          
            <div className="h-16 flex ">

                {/* Presentational element used to render the bottom shadow, if we put the shadow on the actual panel it pokes out the top, so we use this shorter element to hide the top of the shadow */}
                
                
                <div className="absolute inset-0   shadow" aria-hidden="true" />

               

                <div className="relative ">

                

                    <div className="max-w-6xl mx-auto px-8 ">
                    <div className=" grid-cols-1 gap-y-10 gap-x-4 py-5 ">
                    
                    
                    <section class="bg-gray-800 text-white bg-opacity-40 dark:bg-gray-800 py-3 rounded-lg">
                        <div class="container px-6 mx-auto">
                            <div class="items-center lg:flex">
                                <div class="lg:w-1/2 max-w-7xl mx-auto">
                                    <h2 class="text-3xl font-bold text-white dark:text-gray-100">Sale Live - Prehistoric Art</h2>

                                    <p class="text-gray-400 dark:text-gray-400 lg:max-w-md">
                                    Address: {saleAddress}
                                    </p>
                                    
                                    <p class="mt-4 text-white dark:text-gray-400 lg:max-w-md">
                                    MSP: 0.5 ETH | Max. No. of NFTs: 5 | Duration: 5 Hours
                                    </p> 
                                    
                                    <Link route={`/additemtosale/${saleAddress}`}>
                                    <button class="p-2  leading-none rounded font-medium mt-3 bg-green-600 text-m uppercase" >Add an item to sale</button>
                                    </Link>
                            </div>
                        </div>
                        </div>
                    </section>


                        <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-5 xl:gap-x-4">
                        {items.map(item => {
                            return ( 
                            <div>
                            <div class="flex flex-col bg-gray-800 text-white bg-opacity-90 rounded-lg p-4 m-2">
                                <div class="flex flex-wrap justify-center pt-1 text-white">
                                <img src={item.itemImage} className="rounded-xl shadow-lg object-cover h-40 w-40 p-1"></img>
                                </div>
                                <div class="flex flex-col items-start mt-4">
                                <h4 class="text-xl font-semibold">{item.itemTitle}</h4>
                                <p class="p-0.5 text-sm">Highest Bid: {item.itemCurrentBid} ETH</p>
                                <Link route={`/saleitem/${item.itemId}`}>
                                <button class="p-2  leading-none rounded font-medium mt-3 bg-purple-700 text-m uppercase" >View Item</button>
                                </Link>
                                
                                </div>
                            </div>
                            
                            </div>
                            );       
                        })}
                        </div>
                        <div className="row-start-1 grid grid-cols-3 gap-y-10 gap-x-8 text-sm">
                        
                        </div>
                    </div>
                    </div>
                </div>
                </div>
            </div>
          



        </div>
      </div>
  )
}

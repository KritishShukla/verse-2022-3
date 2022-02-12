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

const items = [
  {
    itemId: '14',
    itemImage: Brand.nft9,
    itemTitle: 'Single-Large #122',
    itemCurrentBid: '2',
    itemLink: ''
  },
  {
    itemId: '15',
    itemImage: Brand.nft10,
    itemTitle: 'Single-Medium #353',
    itemCurrentBid: '0.5',
    itemLink: ''
  },
  {
    itemId: '16',
    itemImage: Brand.nft11,
    itemTitle: 'Single-Medium #125',
    itemCurrentBid: '0.3',
    itemLink: ''
  },
  {
    itemId: '17',
    itemImage: Brand.nft12,
    itemTitle: 'Single-Large #451',
    itemCurrentBid: '12',
    itemLink: ''
  }
]


export default function Sales(props) {
  
  const [userAddress,setUserAddress] = useState("")
  const [saleAddress,setSaleAddress] = useState("0x805Ac8234314dFD10Ab1A597890fa9D05f78D0AA")
  const [saleState, setSaleState] = useState('1')
  const [loading, setLoading] = useState(false)

  useEffect(async () => {
    let data = window.location.search;
    // console.log(data.substring(1))
    await setUserAddress(data.substring(1))
    
  })

  async function changeCategory(category){
    setCategory(category)
  }

  async function feedback() {
    if(!loading){
        setLoading(true);
        await web3.eth.sendTransaction({ from: '0x6DF3472cf508b9E024C140A18Ad930774Fd713bc' ,to:'0xe7f1725e7734ce288f8367e1bb143e90bb3f0512', value: web3.utils.toWei('0.01','ether') });
  
        Router.push({
          pathname: `/sales`
        });
      }
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
                                    <h2 class="text-3xl font-bold text-white dark:text-gray-100">Housing | Sale Ended</h2>

                                    <p class="text-gray-400 dark:text-gray-400 lg:max-w-md">
                                    Address: {saleAddress}
                                    </p>
                                    
                                    <p class="mt-4 text-white dark:text-gray-400 lg:max-w-md">
                                    MSP: 0.3 ETH | Max. No. of NFTs: 4 | Duration: 2 Hours
                                    </p> 
                                    
                                   
                                    Feedback: &nbsp;
                                    
                                    
                                    <button onClick={feedback} class="p-2  leading-none rounded font-medium mt-3 bg-green-600 text-m uppercase" >Satisfied</button>
                                       &nbsp;
                                    
                                    <button onClick={feedback} class="p-2  leading-none rounded font-medium mt-3 bg-red-600 text-m uppercase" >Not Satisfied</button>
                                    
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

// import Head from 'next/head'
import React, { Component, useEffect, useState } from 'react'
import { Link } from '../routes';
import { Router } from '../routes';
import Brand from '../brand'
import Header from '../components/Header'
import { ethers } from 'ethers'
import Web3Modal from 'web3modal'
// import Web3 from 'web3';


import Verse from '../artifacts/contracts/Verse.sol/Verse.json'
import NFT from '../artifacts/contracts/NFT.sol/NFT.json'

import { nftaddress, verseaddress } from '../config'


export default function Home() {

  const [loading, setLoading] = useState(false)

  async function login() {
    if(!loading){
      setLoading(true);
      const web3Modal = new Web3Modal()
      const connection = await web3Modal.connect()
      const provider = new ethers.providers.Web3Provider(connection)

      const verseContract = new ethers.Contract(verseaddress, Verse.abi, provider)
      const NFTContract = new ethers.Contract(nftaddress, NFT.abi, provider)

      const signer = await provider.getSigner(0)
      const userAddress = await signer.getAddress()

      console.log(verseContract.address)
      

      Router.push({
        pathname: `/sales`,
        query:  userAddress
      });
    }
  }

  return (
    <div className="overflow-hidden text-white" >
        <div className="h-screen content-center" style={{"backgroundImage":`url(${Brand.bg2})`,"backgroundPosition":"center","backgroundSize":"cover","backgroundRepeat":"no-repeat"}}>
        <Header loggedIn={false} user={""} />
        <section class="relative max-w-7xl w-full lg:w-4/5 mx-auto px-6 text-gray-100 body-font ">
        
        
          <div class="container h-full content-center flex flex-wrap mx-auto items-center align-middle items-center ">
            
            <div className="w-full md:w-3/5 items-center bg-gray-900 bg-opacity-80 shadow p-20 rounded-lg">
              <div className="w-full">
              <img
                className="h-200 w-auto sm:h-20"
                src={'./verse_text_fit-01.png'}
                alt=""
              />  <br/>
              </div>
              <div className="flex">
                <p className="leading-7 text-base text-left">A high liquidity NFT Marketplace at your service.
                </p>
              </div>
              <button onClick={login} className="mt-10 px-8 py-3 font-bold rounded bg-gradient-to-tr from-blue-500 via-purple-500 to-red-500">
              <svg class={loading ? "animate-spin h-5 w-5 mr-3 border-t-2 border-bg-white rounded-full" : "hidden"} viewBox="0 0 24 24">
              </svg>
              <div className={loading? "hidden" : ""}>
                Get Started
              </div>
              </button>
            </div>
            
          </div>
        </section>

        </div>

        <div className="relative bg-gray-900" id={'aboutus'}>
        <section class="relative max-w-7xl w-full lg:w-4/5 mx-auto px-6 pb-12 text-gray-900 body-font" >
          <div class="container flex flex-wrap pt-32 pb-24 mx-auto items-center justify-center">
            <div class="flex flex-col text-center w-full lg:mb-20" >
                <h1 className="sm:text-3xl text-2xl lg:text-5xl text-xl font-extrabold leading-tight text-transparent py-8 bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-red-500">Trade all types of NFTs swifter than ever before.</h1>
                <p class="lg:w-2/3 mx-auto leading-relaxed text-base text-white">
                    List NFTs in timed sale groups, get them sold quickly for the prices you demand!
                </p>
                
                <div class="flex flex-wrap justify-center pt-16 text-white" >

                    <div class="flex-col w-full lg:w-1/5 items-center justify-center px-4 pt-6 sm:rounded-xl">
                        <div class=" text-heading-blue rounded-lg mb-8 rounded-lg flex justify-center shadow-lg">
                          <img src={Brand.art} className="rounded-xl shadow-lg object-cover h-48 w-96"></img>
                        </div>
                        <h4 class="text-xl font-extrabold text-white">Art Pieces</h4>
                    </div>

                    <div class="flex-col w-full lg:w-1/5  items-center justify-center px-4 pt-6 sm:rounded-xl">
                        <div class=" text-heading-blue rounded-lg mb-8 rounded-lg flex justify-center shadow-lg">
                            <img src={Brand.bond} className="rounded-xl shadow-lg object-cover h-48 w-96"></img>
                        </div>
                        <h4 class="text-xl font-extrabold text-white">Bonds</h4>
                    </div>
                  
                    <div class="flex-col w-full lg:w-1/5 items-center justify-center px-4 pt-6 sm:rounded-xl">
                        <div class=" text-heading-blue rounded-lg mb-8 rounded-lg flex justify-center shadow-lg">
                            <img src={Brand.securities} className="rounded-xl shadow-lg object-cover h-48 w-96"></img>
                        </div>
                        <h4 class="text-xl font-extrabold text-white">Securities</h4>
                    </div>
                    
         
                    <div class="flex-col w-full lg:w-1/5 items-center justify-center px-4 pt-6 sm:rounded-xl">
                        <div class=" text-heading-blue rounded-lg mb-8 rounded-lg flex justify-center shadow-lg">
                            <img src={Brand.event} className="rounded-xl shadow-lg object-cover h-48 w-96"></img>
                        </div>
                        <h4 class="text-xl font-extrabold text-white">Events</h4>
                    </div>

                    <div class="flex-col w-full lg:w-1/5 items-center justify-center px-4 pt-6 sm:rounded-xl">
                        <div class=" text-heading-blue rounded-lg mb-8 rounded-lg flex justify-center shadow-lg">
                            <img src={Brand.misc} className="rounded-xl shadow-lg object-cover h-48 w-96"></img>
                        </div>
                        <h4 class="text-xl font-extrabold text-white">Miscellaneous</h4>
                    </div>
                </div>
            </div>
                
          </div>
        </section>
        </div>
        
        {/* Section 3 */}
        <section class="relative bg-gray-900 pt-10 pb-20">
        
        <div className='relative max-w-7xl relative container flex flex-wrap mx-auto items-center'>
        <h1 className="lg:text-5xl  text-xl font-extrabold leading-tight text-transparent mb-2 pb-6 bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-red-500">How does it work?</h1>
        </div>
        

          <div class="relative max-w-7xl bg-gray-800 rounded-lg w-full lg:w-4/5 px-6 py-12 text-gray-600 body-font relative container flex flex-wrap mx-auto items-center">
            
            <div class="flex flex-col md:w-1/2 md:px-10 pl-10 py-10">
              <img src={Brand.collection} className="rounded-lg shadow-xl"></img>
            </div>


            <div className="flex flex-col justify-start w-full md:w-1/2 px-10">
                
                <h5 className="leading-8 text-base text-left text-white mb-10">
                  All users of Verse are given the ability to add external NFTs to the portal, also mint NFTs on the portal. Users can build a portfolio of NFTs on Verse knowing that giving the portal the access to transfer is perfectly safe as it follows all ERC721 standards.
                </h5>
                
             </div>
            
          </div>
          <br/>

          <div class="relative max-w-7xl bg-gray-800 rounded-lg w-full lg:w-4/5 px-6 py-12 text-gray-600 body-font relative container flex flex-wrap mx-auto items-center">
            

          <div className="flex flex-col justify-start w-full md:w-1/2 px-10">
                
                <p className="leading-8 text-base text-left text-white mb-4">
                  NFTs when sold individually usually take longer to be sold, and are sold for lesser prices. When similar NFTs are grouped together and are displayed on the sale tile, there will be a higher chance of buyers engaging with the sale and hence with the NFT.
                  Sellers can find Live Sale groups and list their NFTs based on how reliable the sale is. They get matched with the right buyers and the best selling prices in quick time.
                  <br/><br/>
                  
                  Users can start sale groups get a commission of 10% on a successful sale. They can set the number of NFTs that can be listed. Higher the number, more the commission. 
                </p>
                
             </div>

            <div class="flex flex-col md:w-1/2 md:px-10 pl-10 py-10">
              <img src={Brand.sales} className="rounded-lg shadow-xl"></img>
            </div>

          </div>
          <br/>

          <div class="relative max-w-7xl bg-gray-800 rounded-lg w-full lg:w-4/5 px-6 py-12 text-gray-600 body-font relative container flex flex-wrap mx-auto items-center">
            
            <div class="flex flex-col md:w-1/2 md:px-10 pl-10 py-10">
              <img src={Brand.saledashboard} className="rounded-lg shadow-xl"></img>
            </div>


            <div className="flex flex-col justify-start w-full md:w-1/2 px-10">
                
                <p className="leading-8 text-base text-left text-white mb-4">
                  The Sale has two phases - one phase in which users list NFTs, and another phase in which the bids are taken in from buyers and the NFTs are sold off to the highest bidders.
                  <br/><br/>
                  After the sale ends, participants are allowed to give a feedback on the sale which will determine the reliability score of the sale owner.
                </p>
                
             </div>
            
          </div>
          <br/>
          
        </section>

        <div className="relative bg-gray-900" >
        <section class="relative max-w-7xl w-full lg:w-4/5 mx-auto px-6 pb-12 text-gray-900 body-font" >
          <div class="container flex flex-wrap   mx-auto items-center justify-center">
            <div class="flex flex-col text-center w-full lg:mb-20" >
                <h1 className="sm:text-3xl text-2xl lg:text-5xl text-xl font-extrabold leading-tight text-transparent  bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-red-500">Use Cases</h1>
                
                
                <div class="flex flex-wrap justify-center pt-16 text-white" >
                <div class="flex flex-col md:px-10 pl-10 ">
                  <img src={Brand.usecases} className="rounded-lg shadow-xl "></img>
                </div>
                </div>

                <div class="flex flex-wrap justify-center pt-16 text-white" >
                <div class="flex flex-col md:px-10 pl-10 ">
                  <img src={Brand.working} className="rounded-lg shadow-xl "></img>
                </div>
                </div>
            </div>
                
          </div>
        </section>
        </div>

        <section class="relative bg-gradient-to-r from-blue-500 via-purple-500 to-red-500 pt-16">
          <div class="container flex  max-w-7xl w-full lg:w-4/5 mx-auto px-6 body-font py-8 leading-7 text-gray-900 sm:py-12 md:py-16 lg:py-0 z-20 justify-between px-5 py-12 mx-auto flex md:items-center lg:items-start md:flex-row md:flex-nowrap flex-wrap flex-col">
            
            <div class="w-1/3 flex-shrink-0 md:mx-0 mx-auto text-center md:text-left">
              <a class="flex title-font font-medium items-center md:justify-start justify-center text-gray-900">
              {/* <img
                    className="h-12 w-12"
                    src="./logo.svg"
                    alt="logo"
                  /> */}
                <span class="title-font text-3xl text-black tracking-widest font-extrabold text-sm mb-3">VERSE NFT Portal</span>
              </a>
              <p class="title-font text-xl text-black text-sm mb-3">A high liquidity NFT Marketplace at your service.</p>
            </div>
            
            <div class=" w-2/3 md:mx-0 mx-auto flex md:pl-20 md:mt-0 md:text-left text-center justify-between">
              
              <div class=" w-full md:w-full lg:w-1/3 px-4">
                <h2 class="title-font text-xl text-black tracking-widest font-extrabold text-sm mb-3">Community</h2>
                <ul class="list-none mb-10">
                  <li className="py-1">
                    <a class="text-black hover:text-black">Team Members</a>
                  </li>
                  <li className="py-1">
                    <a class="text-black hover:text-black">Telegram Channel</a>
                  </li>
                  <li className="py-1">
                    <a class="text-black hover:text-black">Facebook Group</a>
                  </li>
                  <li className="py-1">
                    <a class="text-black hover:text-black">Discord Group</a>
                  </li>
                </ul>
              </div>

              <div class="lg:w-1/3 md:w-full w-full px-4">
                <h2 class="title-font text-xl text-black tracking-widest font-extrabold text-sm mb-3">About Us</h2>
                <ul class="list-none mb-10">
                  <li className="py-1">
                    <a class="text-black hover:text-black">Meet the Team</a>
                  </li>
                  <li className="py-1">
                    <a class="text-black hover:text-black">Our Story</a>
                  </li>
                  <li className="py-1">
                    <a class="text-black hover:text-black">FAQ</a>
                  </li>
                </ul>
              </div>

              <div class="lg:w-1/3 md:w-full w-full px-4">
                <h2 class="title-font text-xl text-black tracking-widest font-extrabold text-sm mb-3">Packages used</h2>
                <ul class="list-none mb-10">
                  <li className="py-1">
                    <a class="text-black hover:text-black">Polygon</a>
                  </li>
                  <li className="py-1">
                    <a class="text-black hover:text-black">Moralis</a>
                  </li>
                  <li className="py-1">
                    <a class="text-black hover:text-black">Filecoin/IPFS</a>
                  </li>
                </ul>
              </div>

            </div>
          </div>
          </section>

          <div class="bg-gray-900 w-full  body-font leading-7 sm:py-12 md:py-16 lg:py-4 z-20">
            <div class="container max-w-7xl lg:w-4/5 mx-auto py-4 px-5 flex flex-wrap flex-col sm:flex-row">
              <p class="text-white font-bold text-sm text-center sm:text-left">© Project Verse 2021
                {/* <span class="text-white font-bold ml-1" target="_blank">All rights reserved</span> */}
              </p>
              <span class="inline-flex sm:ml-auto sm:mt-0 mt-2 justify-center sm:justify-start">
                <a class="text-gray-500">
                  <svg fill="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-5 h-5" viewBox="0 0 24 24">
                    <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                  </svg>
                </a>
                <a class="ml-3 text-gray-500">
                  <svg fill="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-5 h-5" viewBox="0 0 24 24">
                    <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
                  </svg>
                </a>
                <a class="ml-3 text-gray-500">
                  <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-5 h-5" viewBox="0 0 24 24">
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01"></path>
                  </svg>
                </a>
                <a class="ml-3 text-gray-500">
                  <svg fill="currentColor" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="0" class="w-5 h-5" viewBox="0 0 24 24">
                    <path stroke="none" d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"></path>
                    <circle cx="4" cy="4" r="2" stroke="none"></circle>
                  </svg>
                </a>
              </span>
            </div>

          </div>
        </div>
  )
}

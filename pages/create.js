import React, { useEffect, useState } from 'react'
import { Link } from '../routes'
import { Router } from '../routes'
import Brand from '../brand'
import Header from '../components/Header'
import { ethers } from 'ethers'
import Web3Modal from 'web3modal'
// import { create as ipfsHttpClient } from 'ipfs-http-client'
import Verse from '../artifacts/contracts/Verse.sol/Verse.json'
import NFT from '../artifacts/contracts/NFT.sol/NFT.json'

import web3 from '../web3'

import { nftaddress, verseaddress } from '../config'

import { NFTStorage, File } from 'nft.storage'
import APIKey from '../nft.storage'

// import * as fs from 'fs/promises'


export default function Create(props) {
  
  const [loading,setLoading] = useState(false)
  const [userAddress,setUserAddress] = useState("")
  const [fileUrl, setFileUrl] = useState(null)
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [addNftToMarketplace, setAddNftToMarketplace] = useState(false)
  let file

  async function readFile(filePath) {
    try {
      const data = await fs.readFile(filePath);
      console.log(data.toString());
    } catch (error) {
      console.error(`Got an error trying to read the file: ${error.message}`);
    }
  }

  useEffect(async () => {
    let data = window.location.search;
    // console.log(data.substring(1))
    await setUserAddress(data.substring(1))

    readFile('../brand.js')
  })

  async function CreateNFT() {
    if(!loading){
      setLoading(true);
      
      
      Router.push({
        pathname: `/sales`,
        query:  userAddress
      });
    }
  }

  async function fileChange(e) {
    try{
      file = e.target.files[0]
      file = fs.readFile('../brand.js')
    }catch(error){
      console.log("Upload Error: ",error)
    }
  }

  async function Mint() {
    setLoading(true);
      await web3.eth.sendTransaction({ from: '0x6DF3472cf508b9E024C140A18Ad930774Fd713bc' ,to:'0xe7f1725e7734ce288f8367e1bb143e90bb3f0512', value: web3.utils.toWei('0.01','ether') });

      Router.push({
        pathname: `/collection`
      });
  }


  return(
      
      <div className="overflow-x-hidden text-white" >
        <div className="h-screen content-center" style={{"backgroundImage":`url(${Brand.bg1})`,"backgroundPosition":"center","backgroundSize":"cover","backgroundRepeat":"no-repeat"}} >
          <Header loggedIn={true} user={userAddress}/>     
          
          <section class="relative max-w-7xl w-full -mt-28 lg:w-4/5 mx-auto px-6 text-gray-100 body-font ">
          <div class="container h-full content-center flex flex-wrap mx-auto items-center justify-center align-middle items-center ">

            <div className="w-full md:w-1/2 mt-16 items-center bg-gray-900 bg-opacity-80 shadow px-20 pt-16 pb-20 rounded-lg">
              <div className="w-full">
                <h1 className="lg:text-5xl text-xl font-extrabold mb-6 leading-tight text-heading-blue text-left">Create an NFT</h1>
              </div>
              
              <input value={title} onChange={e => setTitle(e.target.value)} className="mt-8 my-2 p-3 w-full bg-gray-900 rounded text-white placeholder-gray-300" placeholder="Enter Title"/>
              <textarea className="my-2 p-3 pb-16 w-full bg-gray-900 rounded text-white placeholder-gray-300" placeholder="Enter Description"/>
              
              <input
                type="file"
                name="Asset"
                className="my-4"
                accept=".jpg, .jpeg, .png, .gif"
                onChange={fileChange}
              />

              <button onClick={Mint} className="mt-4 px-8 py-3 rounded font-extrabold bg-gradient-to-tr from-blue-500 via-purple-500 to-red-500">
                <svg class={loading ? "animate-spin h-5 w-5 mr-3 border-t-2 border-bg-white rounded-full" : "hidden"} viewBox="0 0 24 24">
                </svg>
                <div className={loading? "hidden" : ""}>
                  Mint and Add
                </div>
                </button>
            </div>
          
          </div>
        </section>

        </div>
      </div>
  )
}

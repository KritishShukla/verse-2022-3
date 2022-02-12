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


const navigation = {
  categories: [
    {
      id: '1',
      name: 'Art Pieces',
      
    },
    {
      id: '2',
      name: 'Bonds'
    },
    {
      id: '3',
      name: 'Securities',
    },
    {
      id: '4',
      name: 'Events',
    },
    {
      id: '5',
      name: 'Miscellaneous',
    }
  ]
}

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}


const sales = [
  {
    saleId: '1',
    saleAddress: '0xeca731d765576F675BB850aa402ab08280d463C7',
    saleReliability: '-3',
    nftLimit: '4',
    saleState: '2',
    saleCategory: '1',
    saleName: 'People - S5',
    MSP: '0.2',
    duration: '3',
    img1: Brand.nft5,
    img2: Brand.nft6,
    img3: Brand.nft7,
    img4: Brand.nft8
  },
  {
    saleId: '2',
    saleAddress: '0x805Ac8234314dFD10Ab1A597890fa9D05f78D0AA',
    ownerAdddress: '0x805Ac8234314dFD10Ab1A597890fa9D05f78D0AO',
    saleReliability: '7',
    nftLimit: '5',
    saleState: '1',
    saleCategory: '1',
    saleName: 'Prehistoric Art',
    MSP: '0.5',
    duration: '5',
    img1: Brand.nft1,
    img2: Brand.nft2,
    img3: Brand.nft3,
    img4: Brand.nft4
  },
  {
    saleId: '3',
    saleAddress: '0x9b29B26cc1ee02e772818155F4A467Ea11042b27',
    saleReliability: '1',
    nftLimit: '5',
    saleState: '3',
    saleCategory: '2',
    saleName: 'Hosuing',
    MSP: '0.3',
    duration: '2',
    img1: Brand.nft9,
    img2: Brand.nft10,
    img3: Brand.nft11,
    img4: Brand.nft12
  }
]


export default function Sales(props) {
  
  const [userAddress,setUserAddress] = useState("")
  const [open, setOpen] = useState(false)
  const [category,setCategory] = useState('Art Pieces')

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

            <header className="w-full flex bg-transparent text-white backdrop-filter backdrop-blur-md bg-opacity-100 shadow-lg">
              <nav aria-label="Top" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="border-b border-gray-200">
                  <div className="h-16 flex items-center">
                    

                   

                    {/* Flyout menus */}
                    <Popover.Group className=" lg:ml-8 lg:block lg:self-stretch">
                      <div className="h-full flex space-x-40">
                        {navigation.categories.map((category) => (
                          <Popover key={category.name} className="flex">
                            {({ open }) => (
                              <>
                                <div className="relative flex">
                                  <Popover.Button
                                    className={classNames(
                                      open
                                        ? 'border-purple-500 text-purple-500'
                                        : 'border-transparent text-white hover:text-gray-800',
                                      'relative z-10 flex font-bold items-center transition-colors ease-out duration-300 border-b-4 -mb-px pt-px'
                                    )}
                                    onClick={changeCategory(category.name)}
                                  >
                                    {category.name}
                                  </Popover.Button>
                                </div>

                                <Transition
                                  as={Fragment}
                                  enter="transition ease-out duration-200"
                                  enterFrom="opacity-0"
                                  enterTo="opacity-100"
                                  leave="transition ease-in duration-150"
                                  leaveFrom="opacity-100"
                                  leaveTo="opacity-0"
                                >
                                  <Popover.Panel className="absolute top-full inset-x-0 text-sm text-gray-500">
                                    {/* Presentational element used to render the bottom shadow, if we put the shadow on the actual panel it pokes out the top, so we use this shorter element to hide the top of the shadow */}
                                    <div className="absolute inset-0   shadow" aria-hidden="true" />

                                    <div className="relative ">
                                      <div className="max-w-7xl mx-auto px-8">
                                        <div className=" grid-cols-1 gap-y-10 gap-x-8 py-16">
                                          <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                                          
                                            {sales.map(sale => {
                                              
                                                if(sale.saleCategory == category.id){
                                                  return ( 
                                                    <div>
                                                    <div class="flex flex-col bg-gray-800 text-white bg-opacity-90 rounded-lg p-4 m-2">
                                                      <div class="flex flex-wrap justify-center pt-5 text-white">
                                                      <img src={sale.img1} className="rounded-xl shadow-lg object-cover h-20 w-24 p-1"></img>
                                                      <img src={sale.img2} className="rounded-xl shadow-lg object-cover h-20 w-24 p-1"></img>
                                                      <img src={sale.img3} className="rounded-xl shadow-lg object-cover h-20 w-24 p-1"></img>
                                                      <img src={sale.img4} className="rounded-xl shadow-lg object-cover h-20 w-24 p-1"></img>
                                                      </div>
                                                      <div class="flex flex-col items-start mt-4">
                                                        <h4 class="text-xl font-semibold">{sale.saleName}</h4>
                                                        <p class="p-0.5 text-sm">MSP: {sale.MSP}ETH</p>
                                                        <p class="p-0.5 text-sm">Duration: {sale.duration} Hours</p >
                                                        <a class={ parseInt(sale.saleReliability) >=0 ? "p-2 leading-none rounded font-medium mt-3 bg-green-600 text-xs uppercase" : "p-2 leading-none rounded font-medium mt-3 bg-red-600 text-xs uppercase"} >Reliability: {sale.saleReliability}</a>
                                                        <Link route={parseInt(sale.saleReliability) > 0 ? sale.saleCategory == '1' ? `/saledashboard1/${sale.saleAddress}` : `/saledashboard3/${sale.saleAddress}` : "/" }>
                                                        <button class="p-2  leading-none rounded font-medium mt-3 bg-purple-700 text-m uppercase" >
                                                          <div className={sale.saleState == '3' ? '' : 'hidden'}>
                                                            View (Sale Ended)
                                                          </div>
                                                          <div className={sale.saleState == '3' ? 'hidden' : ''}>
                                                            Participate
                                                          </div>
                                                        </button>
                                                        </Link>
                                                      </div>
                                                    </div>
                                                    
                                                    </div>
                                                    );
                                                }else{
                                                  return ( 
                                                    <></>);
                                                }
                                                  
                                            })}
                                          </div>
                                          <div className="row-start-1 grid grid-cols-3 gap-y-10 gap-x-8 text-sm">
                                            
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </Popover.Panel>
                                </Transition>
                              </>
                            )}
                          </Popover>
                        ))}

                       
                      </div>
                    </Popover.Group>
                  </div>
                </div>
              </nav>
            </header>
          </div>



        </div>
      </div>
  )
}

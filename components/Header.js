import React, { Component, useEffect, useState } from 'react'
import { Transition } from "@headlessui/react";
import { useHistory } from "react-router-dom";

import { ethers } from 'ethers'
import axios from 'axios'
import Web3Modal from "web3modal"
import { Link } from '../routes';
import { Router } from '../routes';
import Brand from '../brand'

export default function Header(props) {
    const [isOut, setIsOut] = useState(true)
    const [userAddress,setUserAddress] = useState('0x6DF3472cf508b9E024C140A18Ad930774Fd713bc')

    useEffect( async () => {
        if(props.loggedIn){
            setIsOut(false)
            let data = window.location.search;
            // console.log("header: ",data.substring(1))
            await setUserAddress(data.substring(1))
           
        }else{
            setIsOut(true)
        }
    }, [])

    return (
        <div className="mb-20">
        <nav className=" w-full flex bg-transparent text-white backdrop-filter backdrop-blur-md bg-opacity-100 shadow-lg">
        <div className="flex max-w-7xl w-full lg:w-4/5 mx-auto px-6 py-3 sm:px-6 justify-between">
          
          <div className="flex items-center h-16">
            <div className="flex items-center">
                  <Link route={`/sales/${userAddress}`}>
                  <img
                        className="h-8 w-auto sm:h-10"
                        src={Brand.logo_purple}
                        alt=""
                    />
                    
                  </Link>
            </div>
            <img
                className="h-8 w-auto sm:h-10"
                src={Brand.logo_text_fit}
                alt=""
            />
          </div>

          <div className="flex items-center h-16">
              <div className="hidden md:block flex">
                <div className="ml-10 flex justify-end">
                  
                  {(isOut)? 
                    <>
                    <Link route="/#aboutus">
                    <button className="text-heading-blue hover:bg-gray-500 hover:shadow px-5 py-2 rounded-md text-md font-medium focus:outline-none ">
                      About Us
                    </button>
                    </Link>
                    {/* <Link route="/">
                    <button  className="text-heading-blue hover:bg-gray-500 hover:shadow px-8 py-2 rounded-md text-md font-medium focus:outline-none ">
                      Login
                    </button>
                    </Link> */}
                    </>
                    :
                    <div className="flex align-center items-center">
                    <Link route={`/sales/${userAddress}`} className="">
                    <button  className="text-heading-blue hover:bg-gray-500 hover:bg-opacity-20 hover:shadow px-4 py-2 rounded-md text-md font-medium focus:outline-none ">
                    Sale Groups
                    </button>
                    </Link>
                    <Link route={`/createsale/${userAddress}`} className="">
                    <button  className="text-heading-blue hover:bg-gray-500 hover:bg-opacity-20 hover:shadow px-4 py-2 rounded-md text-md font-medium focus:outline-none ">
                    Create Sale
                    </button>
                    </Link>
                    <Link route={`/collection/${userAddress}`} className="">
                    <button  className="text-heading-blue hover:bg-gray-500 hover:bg-opacity-20 hover:shadow px-4 py-2 rounded-md text-md font-medium focus:outline-none ">
                    My Collection
                    </button>
                    </Link>
                    <Link route={`/create/${userAddress}`} className="mr-2">
                    <button  className="text-heading-blue hover:bg-gray-500 hover:bg-opacity-20 hover:shadow px-6 py-2 rounded-md text-md font-medium focus:outline-none ">
                    Create
                    </button>
                    </Link>
                    <Link route="/" >
                    <button className="text-heading-blue bg-purple-600 hover:bg-purple-900 hover:shadow px-6 py-2 rounded-md text-md font-medium focus:outline-none ">
                    Sign Out
                    </button>
                    </Link>
                    </div>
                  }
                </div>
            </div>

            <div className="-mr-2 flex flex-row md:hidden">

              
              
            </div>
          </div>
        </div>

        
      </nav>
    </div>
    );
}


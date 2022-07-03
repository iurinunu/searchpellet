import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios'


// const ws = new W3CWebSocket('wss://stream.binance.com:9443/ws/etheur@trade');

const Ticker = () => {
    const musicPlayers = useRef<HTMLAudioElement | undefined>(
        typeof Audio !== "undefined" ? new Audio("/alarm.mp3") : undefined
      );

      
  // https://www.binance.com/api/v3/ticker/price?symbol=GALUSDT
// https://www.binance.com/api/v3/ticker/price?symbol=GMTUSDT

// stream of prices coming in// initialized to zero in reality


// set timeout and every 10 secs check the prices:

useEffect(() => {
    let galPriceTicker: number = 0//6.30;
    let gmtPriceTicker: number = 0//1.56;

    let myCurrentCoin = 'GAL';


    let galPriceCurrent = 6.26;
    let gmtPriceCurrent = 1.58;

    let galCoinsCurrent = 268.39; // 1500 $  => 6.30$ per coin
    let gmtCoinsCurrent = 1063.29; // 1500$ / 1.56$ (price of gmt when first snapshot)

    const percentageForChange = 0.05; // = 5%
    const percentageForCashOut = 0.15 // = 15%

    let tempGmtCoinNumber: number;
    let tempGalCoinNumber: number;


    let myInterval = setInterval(async () => {
        const btc = await axios.get('https://www.binance.com/api/v3/ticker/price?symbol=BTCUSDT');

        const responseGal = await axios.get('https://www.binance.com/api/v3/ticker/price?symbol=GALUSDT');
        const responseGmt = await axios.get('https://www.binance.com/api/v3/ticker/price?symbol=GMTUSDT');

        console.log('TICK------------------------------------------');
        console.log('BTC: ' + parseFloat(btc.data.price))
        console.log('GAL: ' + parseFloat(responseGal.data.price));
        console.log('GMT: ' + parseFloat(responseGmt.data.price));

        galPriceTicker = parseFloat(responseGal.data.price);
        gmtPriceTicker = parseFloat(responseGmt.data.price);

        if (myCurrentCoin === 'GAL') {
            console.log('GAL-BUSD: ' + parseFloat(responseGal.data.price) * galCoinsCurrent);

            tempGmtCoinNumber = ( galPriceTicker * galCoinsCurrent ) / gmtPriceTicker;
            console.log('Percentage change');
            console.log((((galPriceTicker - galPriceCurrent) / galPriceCurrent) * 100).toFixed(2));
            console.log('Percentage change against GMT');
            console.log((((tempGmtCoinNumber - gmtCoinsCurrent) / gmtCoinsCurrent) * 100).toFixed(2));
            console.log('How much would be an increase of 15%');
            console.log(galPriceCurrent + (galPriceCurrent * percentageForCashOut));
            if (((tempGmtCoinNumber - gmtCoinsCurrent) / gmtCoinsCurrent) > percentageForChange) {
                console.log('TRUE CAZZO 1');
                musicPlayers.current?.pause();
                if (musicPlayers.current) {
                    console.log('play1');
                    musicPlayers.current.muted = false;
                    musicPlayers.current.play();
                }
               
                
                // alert('cazzo');

            
                // STOP timer to allow me to make exchange and reset values:
        
                // over percentageForChange 10%:  need to exchange COINS! if I change:
                // 1) gmtCoinsCurrent = 930 + (930 * 5%)
                // 2) myCurrentCoin = 'GMT'
                // 2) galCoinsCurrent = remains the same
            } else if (galPriceTicker > (galPriceCurrent + (galPriceCurrent * percentageForCashOut))) {
                // STOP timer to allow me to make exchange and reset values:
        
                console.log('TRUE CAZZO 2');
                musicPlayers.current?.pause();
                if (musicPlayers.current) {
                    console.log('play2');
                    musicPlayers.current.muted = false;
                    musicPlayers.current.play();
                }
                // cash out per BUSD and wait drop in the price of one of the coins to buy one of them with at least 5% of increase in quantity
            }
        }
                
        if (myCurrentCoin === 'GMT') {
            tempGalCoinNumber = ( gmtPriceTicker * gmtCoinsCurrent ) / galPriceTicker;

            console.log('percentage change');
            console.log((((tempGalCoinNumber - galCoinsCurrent) / galCoinsCurrent) * 100).toFixed(2));
            console.log('how much would be an increase of 15%');
            console.log(gmtPriceCurrent + (gmtPriceCurrent * percentageForCashOut));
            
            

            if (((tempGalCoinNumber - galCoinsCurrent) / galCoinsCurrent) > percentageForChange) {
                // over percentageForChange 5%:  need to exchange!
            } else if (gmtPriceTicker > (gmtPriceCurrent + (gmtPriceCurrent * percentageForCashOut))) {
                // STOP timer to allow me to make exchange and reset values:
        
                // cash out per BUSD and wait drop in the price of one of the coins to buy one of them with at least 5% of increase in quantity
            }
        }
        // if (x===5) {
            
        //     clearInterval(myInterval);
    
        // }
    }, 20000);
}, []);






  
    return (
        <>
         TICKER
        </>
      )
  };

export default Ticker;
const electron = require('electron');
const path = require('path');
const BrowserWindow = electron.remote.BrowserWindow;
const axios = require('axios');
const ipc = electron.ipcRenderer

var notifyBtn = document.getElementById('notifyBtn');
var price = document.querySelector('h1');
var targetPrice = document.getElementById('targetPrice');
var targetPriceVal;
var notification = {
    title : "BTC alert",
    body : "BTC just beat your target price!",
    icon : path.join(__dirname,'../assets/images/bitcoin.png')
}
function getBTC()
{
    axios.get('https://min-api.cryptocompare.com/data/pricemulti?fsyms=ETH,DASH&tsyms=BTC,USD,EUR&api_key=b432b51d0eac0e819eaf17cb548e34f1cffc731b7c6756f3ad5e27465f35d677')
    .then(res=>
        {
            const cryptos = res.data.ETH.USD;
            price.innerHTML = '$' + cryptos.toLocaleString('en');

     if( targetPrice.innerHTML != '' && targetPriceVal < res.data.ETH.USD)
     {
          const myNotification = new window.Notification(notification.title , notification)
          console.log('noti');
     }   
        })

}
getBTC();
setTimeout(getBTC,10000);


notifyBtn.addEventListener('click',function(){
      const modalPath = path.join('file://',__dirname,'add.html');
      let win = new BrowserWindow({ width:400 , height:200,frame:false , alwaysOnTop:true });
      win.on('close',function()
      {
          win = null;
      });
      win.loadURL(modalPath);
      win.show();
 
});

ipc.on('targetPriceVal',function(event,arg){
        targetPriceVal = Number(arg);
        targetPrice.innerHTML = '$'+targetPriceVal.toLocaleString('en');    
});

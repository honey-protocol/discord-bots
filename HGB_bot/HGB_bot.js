// Require the necessary discord.js classes
const { Client, Intents } = require('discord.js');
const { HGB_TOKEN } = require('../config.json');
const axios = require('axios');

// Create a new client instance
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

const updateFloorPrice = (member) => {
	axios.get('https://api-mainnet.magiceden.dev/v2/collections/honey_genesis_bee/stats') //api call magic eden
	.then((res) => {
		var floorPrice = res.data.floorPrice/1000000000 
		var volume = res.data.volumeAll/1000000000
		var listedCount = res.data.listedCount
		console.log(floorPrice)
		console.log(volume.toFixed(2))
		console.log(listedCount)
		client.user?.setPresence({ 
		  status: 'online',
		  activities: [
			  {
				  name: `◎ All: ${volume.toFixed(2)}`,
				  type: 'WATCHING'
			  }
		  ]
	  })
	  member.setNickname(`🐝  ◎${floorPrice}|${listedCount}`)
    	.then(updatedMember => {
      console.log(`Changed nickname of ${updatedMember.user.username} to 🐝  ◎${floorPrice}|${listedCount}`);
    })
    .catch(console.error);
	})
	.catch((err) => {
		console.log(err);
	})
  setTimeout(updateFloorPrice, 1000 * 60) //every 20 seconds 
}

// When the client is ready, run this code (only once)
client.once('ready', () => {
	console.log('Ready!');
	const guild = client.guilds.cache.get('881855452537823232')	
	const member = guild.members.cache.get('913215970875703357')
	client.user?.setUsername("HGB Floor price")
	updateFloorPrice(member)
});
// Login to Discord with your client's token
client.login(HGB_TOKEN);

// Call api and update every 1 minute


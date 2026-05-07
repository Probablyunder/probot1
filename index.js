const http = require('http');
const mineflayer = require('mineflayer');

// --- SECTION 1: THE WEB SERVER ---
// Render requires a web server to stay alive. 
// This creates a simple page that says "Bot is running!"
const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Bot is running!\n');
});

// Use Render's assigned port or default to 3000
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Web server listening on port ${PORT}`);
});

// --- SECTION 2: THE MINEFLAYER BOT ---
const botArgs = {
  host: 'driftfish.aternos.host', // Change this to your server IP
  port: 52619,                  // Change this if your server uses a different port
  username: 'TDSC',  
    connectTimeout: 60000,         // <--- ADD THIS LINE (don't forget the comma!)
  version: '1.21.11'              // <--- Also add your Minecraft version here
};                              // The name of your bot
  // auth: 'microsoft'          // Uncomment this if joining a premium/Microsoft server
};

let bot;

function createBot() {
  bot = mineflayer.createBot(botArgs);

  // When the bot joins the game
  bot.on('spawn', () => {
  console.log('Bot spawned in the world!');
    
    // Check if the server is asking the bot to register or login
    if (message.includes('/login') || message.includes('/register')) {
      console.log('Server requested login. Sending password...')

  // Basic chat response (Optional)
  bot.on('chat', (username, message) => {
    if (username === bot.username) return;
    if (message === 'hello') {
      bot.chat(`Hi ${username}!`);
    }
  });

  // --- SECTION 3: ERROR HANDLING & AUTO-RESTART ---
  // If the bot gets kicked, this will try to reconnect after 5 seconds
  bot.on('kicked', (reason) => {
    console.log(`Kicked for: ${reason}`);
    setTimeout(createBot, 5000);
  });

  // If there is an error (like wrong IP), this prevents the whole program from crashing
  bot.on('error', (err) => {
    console.log(`Error: ${err.message}`);
    if (err.code === 'ECONNREFUSED') {
      console.log('Failed to connect. Is the server offline?');
    }
    setTimeout(createBot, 5000);
  });
}

// Start the bot for the first time
createBot();

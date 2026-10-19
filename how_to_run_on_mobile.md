## 📱 How to Play on Mobile

This game is more fun to play on a mobile phone because it supports multiple fingers touching the screen at the same time.

To play it on your mobile, you can run the project on your PC and open it on your phone using the same Wi-Fi network.

**Steps to run the game on mobile:**

1. Run the project on your PC:

   ```bash
   npm run dev -- --host 0.0.0.0
   ```

2. Find your PC's local IP address.

   On Windows, open Command Prompt and run:

   ```bash
   ipconfig
   ```

   Look for the IPv4 Address of your active Wi-Fi connection.

3. Vite will show a network URL in your terminal. It will look something like this:

   `http://192.168.1.5:5173`

4. Connect your mobile phone to the same Wi-Fi network as your PC.

5. Open the network URL in your mobile browser. Replace the example IP with the actual URL shown on your PC.

6. Now both players can use their fingers to press their buttons and compete!

**Note:** Your PC and mobile must be on the same local network, and your firewall must allow the connection. Use the network URL shown by Vite, not `localhost`, because `localhost` on your phone refers to the phone itself.
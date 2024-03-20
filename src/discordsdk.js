import { DiscordSDK } from "@discord/embedded-app-sdk";

const DISCORD_CLIENT_ID = process.env.DISCORD_CLIENT_ID;

const discordSdk = new DiscordSDK(DISCORD_CLIENT_ID);

let auth;

console.log('discordsdk.js start')
export async function setupDiscordSdk() {
    await discordSdk.ready();

    // Authorize with Discord Client
  const { code } = await discordSdk.commands.authorize({
    client_id: DISCORD_CLIENT_ID,
    response_type: "code",
    state: "",
    prompt: "none",
    scope: [
      "identify",
      "guilds",
    ],
  });

  // Retrieve an access_token from your activity's server
  const response = await fetch("/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      code,
    }),
  });
  const { access_token } = await response.json();

  // Authenticate with Discord client (using the access_token)
  auth = await discordSdk.commands.authenticate({
    access_token,
  });

  if (auth == null) {
    throw new Error("Authenticate command failed");
  }
}
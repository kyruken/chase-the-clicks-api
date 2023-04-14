import express from "express";
import { SuperfaceClient } from "@superfaceai/one-sdk";
const app = express();
app.set("trust proxy", true);

// You can manage tokens here: https://superface.ai/insights
const sdk = new SuperfaceClient({ sdkAuthToken: 'sfs_7439ab3549b6899fcf612babd08dfbb8e822b492d5abdb3182f7e1f022bb2d0cdec29bd4b6a1866420063c2661817307422782bf925546eaa1d3f5a037f729f4_0ab62307' });

async function run(ip) {
  // Load the profile
  const profile = await sdk.getProfile('address/ip-geolocation@1.0.1');

  // Use the profile
  const result = await profile
    .getUseCase('IpGeolocation')
    .perform({
      ipAddress: ip
    }, {
      provider: 'ipdata',
      security: {
        apikey: {
          apikey: '03ce5d014abb590347d79a4bf448beaafd1348c4ba79d24594dbe1b9'
        }
      }
    });

  // Handle the result
  try {
    const data = result.unwrap();
    console.log(data.addressCountry);
  } catch (error) {
    console.error(error);
  }
}

app.get("/", async (req, res) => {
  res.send(await run(req.ip));
});



app.listen(3000, () => {
    console.log("server listening on port 3000")
})
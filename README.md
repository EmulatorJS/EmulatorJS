<center><h1>Emulator.js Cloud Save</h1></center>
 With this app you can save your game state progress in the cloud using Dropbox.
This was created quickly so that I could play Pokemon and transition from my phone to my computer more conveniently. Bugs can appear on some devices, especially on phones and other consoles other than 3ds and nds.

---

## How to get Refresh Token

At the beginning make sure you have your `App key` and `App secret` at hand from [App Console](https://www.dropbox.com/developers/apps) page. Select desired application there and once got there in and scroll to field "`App key`" and "`App secret`" (for the secret "Show" should be used) keep the browser window accessible, so would be able take a look there when needed.

Next, open a new browser window and put into address line following:

```
https://www.dropbox.com/oauth2/authorize?token_access_type=offline&response_type=code&client_id=<App key>
```

Where "`<App key>`" is the one from you previous browser window. Next the confirmation you will get a code (alphanumeric sequence). The same could be received automatic when redirect URL is in use (either direct or PKCE code flow), but here we will perform it in such a way for clarity.

Next step will be to "materialize" the received code. In a terminal window execute following curl command:

```
curl https://api.dropbox.com/oauth2/token -d code=<received code> -d grant_type=authorization_code -u <App key>:<App secret>
```

Where "`<received code>`" is the code shown up in the second browser window after confirmation. "`<App key>`" and "`<App secret>`" come from the first browser window. As a result you will get in your terminal something like:

> {"access_token": "sl.abcdefg123456789AbCdEf-GHijKLmn0U", "token_type": "bearer", "expires_in": 14400, "`refresh_token": "oDfT54975DfGh12345KlMnOpQrSt01a`", "scope": "account_info.read files.content.read etc.", "uid": "123456789", "account_id": "dbid:ABCDEF5g8HijklMNopQ2Rs5tUV_wxy5z_YO4"}

Of course, you will receive different values filling the pattern. Here "sl.abcdefg123456789AbCdEf-GHijKLmn0U" is access token you can use in every regular API call for "14400" second since current moment until expires. "oDfT54975DfGh12345KlMnOpQrSt01a" is your refresh token. The one that will never expire (or till revoke).

When currently received access token expires, you can perform following curl call:

```
curl https://api.dropbox.com/oauth2/token -d grant_type=refresh_token -d refresh_token=oDfT54975DfGh12345KlMnOpQrSt01a -u <App key>:<App secret>
```

Where "`oDfT54975DfGh12345KlMnOpQrSt01a`" is the **refresh token**

Tutorial taken from [Dropbox Forums](https://www.dropboxforum.com/t5/Dropbox-API-Support-Feedback/Issue-in-generating-access-token/td-p/592667) written by Здравко

### You will take your **refresh token** and add it on the website

---

## How to get Client Secret and ID

You can get Client ID and Client Secret [App Console](https://www.dropbox.com/developers/apps)

---

<center>Thank you <a href="https://github.com/EmulatorJS/EmulatorJS">Emulator.js</a> for creating this emulator <3</center>

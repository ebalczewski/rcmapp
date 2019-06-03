# RCMapp

RC people, on maps!

RC Mapp is a couch-surfing-esque app
for members of the [Recurse Center](https://recurse.com) community
to connect around the globe to socialize, talk about tech, and/or do short-term homestays.

## Getting Started
Standing up a local instance of the RCMapp
currently requires setting up local environment variables
and API keys for the Google Maps and RC APIs.
If you are interested in contributing,
please reach out to any of the
[previous contributors](https://github.com/ebalczewski/rcmapp/graphs/contributors) for access to the keys.

Once you have obtained the necessary environment variables,
copy those values to a new file named `.env`
in the root directory. A sample `.env-template` is provided
to show which values are needed.

Then, run `npm install` to install Node dependencies.
Lastly, run `npm run dev` to start the development server,
and the app will then be available at `localhost:4000`.

### Authorize the App
Once the app is running,
the user will first need to login
with an authorized RC account.

From the homepage, click `login`,
then authorize the app to use your RC account for authorization:
<img src="./screenshots/authorize.png?raw=true" alt="Authorize RC Mapp" width="400"/>

### Enter an Address
Then, a map is shown centered
on the Recurse Center's Brooklyn location:
<img src="./screenshots/welcome.png?raw=true" alt="RC Mapp Home Page" width="400"/>

When the database is populated with addresses,
this map will display markers showing the location of RCers.

To enter a new address,
click `Add Address` in the top-right corner.
A new page is displayed
where users can enter their preferred address,
as well as their desired level of interaction
with the RC community:
<img src="./screenshots/enter_address.png?raw=true" alt="Address prompt" width="400"/>
* **Social**: RCer is interested in meeting to socialize.
* **Tech**: RCer is willing to meet to discuss technology-related topics.
* **Stay**: RCer can host other RCers at their home for short-term stays.

Once entered, a new marker is shown
with the address and saved preferences:
<img src="./screenshots/data_entered.png?raw=true" alt="Populated address information" width="400"/>

## Technologies

Node
React
Next
Express
Sequelize (SQLite)

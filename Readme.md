# Carleton Energy App Comps

A Carleton College Computer Science department Comps with the goal of creating an  app
detailing Carleton's energy usage.

## Built With

* [React Native](https://facebook.github.io/react-native/docs/getting-started.html) - App development framework
* [React Navigation](https://reactnavigation.org/) - RN package, provides tab and stack navigation for the app
* [Redux](https://redux.js.org/) - RN package, handles navigation state, and data state for the app
* [Victory](https://formidable.com/open-source/victory/docs/native/) - RN package, creates data visualizations
* [Node](https://nodejs.org/en/download/) - Necessary dependency for RN
* [npm](https://nodejs.org/en/download/) - Package manager, included with Node
* [Expo](https://docs.expo.io/versions/latest/introduction/installation.html) - sets up necessary RN dependencies, and
provides tools for smoother development

## Getting Started
### Prerequisites
Before running this project, a few dependencies must be installed.

(Note: if at any point you have issues, check out the getting started guides for [React Native](https://facebook.github.io/react-native/docs/getting-started.html) and
[Expo](https://docs.expo.io/versions/latest/introduction/installation.html))

1) Install [Node](https://nodejs.org/en/download/)
2) Install [Expo](https://docs.expo.io/versions/latest/introduction/installation.html) (both the XDE and either a mobile
client, or use a simulator/emulator)

### Running the project
1) Clone this repository, and cd to carleton-energy-app/energy-app-react
2) Then, run the following command to install the necessary dependencies:
```
npm install
```

3) Run the app with:

```
npm start
```

From here, either scan the QR code on the Expo mobile client on your phone, or press 'A' to run the Expo app on the
Android emulator, or 'I' to run it on the iOS simulator.
## Demo

If you simply want to see a demo of the app, you can download the [Expo](https://docs.expo.io/versions/latest/introduction/installation.html)
mobile client, and scan our [QR code](https://expo.io/@phillipsl/cc-energy-app). (Note: the version of our app on Expo is
our most stable version, and pulls from our Master branch).

## Future Deployment
In order to deploy the app to the app store/play store, please check out the following [guide](https://docs.expo.io/versions/latest/guides/publishing.html)
## Authors

* **Jesse Bolton** -  [jboltron3000](https://github.com/jboltron3000)
* **Veronica Child** -  [childv](https://github.com/childv)
* **Martin Green** - [Martination](https://github.com/Martination)
* **Jack Kennelly** - [Kennelly57](https://github.com/Kennelly57)
* **Liv Phillips** - [phillipsl0](https://github.com/phillipsl0)
* **Andrew Woosnam** - [atwoosnam](https://github.com/atwoosnam)

See also the list of [contributors](https://github.com/phillipsl0/carleton-energy-app/graphs/contributors) who participated in this project.

## Acknowledgments

* Jeff Ondich, our comps advisor
* Martha Larson, our client
* Dave Flynn, Mike Tie, and Matt Ryan
* Jeff's Energy Analytics Comps Team for their help wrangling data

## To Do
* Hook up all live data
* Make server accessible from off campus
* Set up time out in case server is inaccessible
* Fix styling issues in Android (graph labels, Turbine card image margins)
* Fix graph labels on Individual Buildings page
* Make sure that energy conversions are accurate
* API calls:
    * Get historical high and low for each building, for use in heat map normalization
    * Ask Martha if she wants this normalization as a static number or as a percentage of the building's high
    * Add up all data points for the graphs (aka daily sum, weekly sum, monthly sum, and yearly sum) on the server side
    
<div align="center">

# Clinical Trials Map

Clinical Trials Map aims to consolidate clinical trial from around the world into a user-friendly application to tackle the the theme of <b>data analysis and presentation in doctor portals</b>.

[About](#about) | [Running the App](#running-the-app) | [Technologies](#technologies) | [Credits](#credits) | [License](#license)

</div>

## About

<div align="center">

<img max-height=350 alt="demo of Clinical Trials Map" src="https://raw.githubusercontent.com/rparin/CTMap/main/_preview/Demo.gif">

</div>

### Features

- Browse through clinical trials available around the world pulled.
- Use of Mapbox API to view clinical trial locations on the map.
- Multiple filters to find a specific type of clinical trial within a specific location.

## Running the App

### Getting Started

1. Clone the repo and follow the steps below

⚠️ **Note:** You need to do the steps twice. Once to setup the client, another for the server.

### Installing packages for the client app or server

2. Open a terminal in the Client or Server directory and run the following command

```bash
npm install
```

### Setting up Env variables:

3. (Server Only) Create a _.env_ file In the _Server_ folder. In the _.env_ file create two variables:

```
   MAPBOX_ACCESS_TOKEN = <Your_Mapbox_Token>
   MAPBOX_STYLE = <Your_Mapbox_Style_>
```

4. (Client Only) In the _Client/components/Map.tsx_ file, replace **MAP_TOKEN** with your Mapbox token and
   **MAP_Style** with your Mapbox style

```
mapboxgl.accessToken = "MAP_TOKEN" //line 15
style: "MAP_Style" //line 48
```

### Running the client or server:

5. Open a terminal in the Client or Server directory and run the following command

```bash
npm run dev
```

6 (Client). Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Technologies

<div align="center">

![React][react-url] ![NodeJS][nodejs-url] ![TailwindCSS][tailwind-url]

</div>

## Credits

Clinical Trials Map was made in collaboration of me, Ralph Parin, and my team, [Tenzo][tenzo-url], [Maxine][maxine-url], and [Yenina][yen-url].

## License

This project is licensed under the MIT License - see the [LICENSE][git-license-url] file for details.

<!-- MARKDOWN LINKS & IMAGES -->

[react-url]: https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB
[nodejs-url]: https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white
[tailwind-url]: https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white
[tenzo-url]: https://github.com/Alfendi
[maxine-url]: https://github.com/mgjypil
[yen-url]: https://github.com/yen-lei
[git-license-url]: https://github.com/rparin/CTMap/blob/main/LICENSE

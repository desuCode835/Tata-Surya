const textureURL = "textures/";

export const planetData = [
    {
        name: "Sun",
        radius: 10,
        distance: 0,
        speed: 0,
        color: 0xffff00,
        texture: textureURL + "sun.jpg",
        description: "The star at the center of the Solar System. It is a nearly perfect sphere of hot plasma."
    },
    {
        name: "Mercury",
        radius: 2,
        distance: 20,
        speed: 0.04,
        color: 0xaaaaaa,
        texture: textureURL + "mercury.jpg",
        description: "The smallest planet in the Solar System and the closest to the Sun."
    },
    {
        name: "Venus",
        radius: 3,
        distance: 30,
        speed: 0.015,
        color: 0xe3bb76,
        texture: textureURL + "venus.jpg",
        description: "The second planet from the Sun. It has a thick atmosphere that traps heat."
    },
    {
        name: "Earth",
        radius: 3.2,
        distance: 45,
        speed: 0.01,
        color: 0x2233ff,
        texture: textureURL + "earth.jpg",
        description: "Our home planet. The only known planet to harbor life."
    },
    {
        name: "Mars",
        radius: 2.5,
        distance: 60,
        speed: 0.008,
        color: 0xff4500,
        texture: textureURL + "mars.jpg",
        description: "The Red Planet. Dusty, cold, desert world with a very thin atmosphere."
    },
    {
        name: "Jupiter",
        radius: 8,
        distance: 90,
        speed: 0.004,
        color: 0xd2b48c,
        texture: textureURL + "jupiter.jpg",
        description: "The largest planet in the Solar System. A gas giant with a Great Red Spot."
    },
    {
        name: "Saturn",
        radius: 7,
        distance: 130,
        speed: 0.002,
        color: 0xf4a460,
        texture: textureURL + "saturn.jpg",
        ringTexture: textureURL + "saturn_ring.png",
        description: "Adorned with a dazzling, complex system of icy rings."
    },
    {
        name: "Uranus",
        radius: 5,
        distance: 170,
        speed: 0.001,
        color: 0xadd8e6,
        texture: textureURL + "uranus.jpg",
        description: "An ice giant. It rotates at a nearly 90-degree angle from the plane of its orbit."
    },
    {
        name: "Neptune",
        radius: 4.8,
        distance: 200,
        speed: 0.0005,
        color: 0x4169e1,
        texture: textureURL + "neptune.jpg",
        description: " The eighth and farthest known Solar planet from the Sun. It is dark, cold, and whipped by supersonic winds."
    }
];

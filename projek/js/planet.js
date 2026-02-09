import * as THREE from 'three';

const textureLoader = new THREE.TextureLoader();

export function createPlanet(scene, data) {
    const planetGroup = new THREE.Group();
    scene.add(planetGroup);

    // Create Mesh
    const geometry = new THREE.SphereGeometry(data.radius, 32, 32);

    // Material with Texture
    let material;
    if (data.texture) {
        material = new THREE.MeshStandardMaterial({
            map: textureLoader.load(data.texture),
            roughness: 0.5,
        });
    } else {
        material = new THREE.MeshStandardMaterial({
            color: data.color,
            roughness: 0.7,
        });
    }

    const planetMesh = new THREE.Mesh(geometry, material);
    planetMesh.name = data.name;
    planetMesh.userData = data;

    // Handle Rings for Saturn
    if (data.ringTexture) {
        const ringGeo = new THREE.RingGeometry(data.radius * 1.4, data.radius * 2.2, 64);

        // Align texture rotation if needed, but default mapping usually puts the texture radially
        // For a strip texture, we might need to rotate the texture itself or the UVs
        // Let's assume the texture is a radial gradient or strip that works with RingGeometry default UVs
        // For 'mistic100' texture, it might be a full circle image.
        // If it is a full circle image, RingGeometry default UVs (polar) will distort it.
        // If it is a full circle image, we should use PlaneGeometry or fix UVs to be planar.
        // Given uncertainty, let's use the safer PlaneGeometry approach for a full image ring.
        // BUT, looking at the repo 'mistic100', the saturn_ring.png is likely a TRANSPARENT PNG of the rings (circle).

        // Let's try RingGeometry with planar UVs if we want to map a circle image on it.
        var pos = ringGeo.attributes.position;
        var v3 = new THREE.Vector3();
        for (let i = 0; i < pos.count; i++) {
            v3.fromBufferAttribute(pos, i);
            // Planar mapping: map x,y to u,v
            // range is [-R, R] -> [0, 1]
            // u = (x / maxRadius + 1) / 2
            // v = (y / maxRadius + 1) / 2
            const maxRadius = data.radius * 2.2;
            const u = (v3.x / maxRadius + 1) / 2;
            const v = (v3.y / maxRadius + 1) / 2;
            ringGeo.attributes.uv.setXY(i, u, v);
        }

        const ringMat = new THREE.MeshBasicMaterial({
            map: textureLoader.load(data.ringTexture),
            side: THREE.DoubleSide,
            transparent: true,
            opacity: 0.8
        });
        const ring = new THREE.Mesh(ringGeo, ringMat);
        ring.rotation.x = -Math.PI / 2;
        planetMesh.add(ring);
    }

    planetGroup.add(planetMesh);

    // Create Orbit Path
    let orbitMesh = null;
    if (data.distance > 0) {
        const orbitCurve = new THREE.EllipseCurve(
            0, 0,            // ax, aY
            data.distance, data.distance, // xRadius, yRadius
            0, 2 * Math.PI,  // aStartAngle, aEndAngle
            false,            // aClockwise
            0                 // aRotation
        );

        const points = orbitCurve.getPoints(100);
        const orbitGeometry = new THREE.BufferGeometry().setFromPoints(points);
        const orbitMaterial = new THREE.LineBasicMaterial({ color: 0x444444 });
        orbitMesh = new THREE.Line(orbitGeometry, orbitMaterial);
        orbitMesh.rotation.x = Math.PI / 2;
        scene.add(orbitMesh);
    }

    // State for animation
    let angle = Math.random() * Math.PI * 2; // Random start position

    return {
        mesh: planetMesh,
        update: (speedFactor) => {
            // Rotate planet on its axis
            planetMesh.rotation.y += 0.005;

            // Orbit around Sun
            if (data.distance > 0) {
                angle += data.speed * speedFactor;
                planetMesh.position.x = Math.cos(angle) * data.distance;
                planetMesh.position.z = Math.sin(angle) * data.distance;
            }
        }
    };
}

export function createSun(scene) {
    // Import sun data from data object if possible, but hardcoded for now in data.js it is the first element
    // Use local texture for consistency
    const sunTextureURL = "textures/sun.jpg";

    const sunData = {
        radius: 10,
        texture: sunTextureURL
    };

    // Sun Mesh
    const geometry = new THREE.SphereGeometry(sunData.radius, 32, 32);
    const material = new THREE.MeshBasicMaterial({
        map: textureLoader.load(sunData.texture),
    });
    const sunMesh = new THREE.Mesh(geometry, material);
    sunMesh.name = "Sun";
    sunMesh.userData = {
        name: "Sun",
        description: "The star at the center of the Solar System.",
        radius: 696340,
        distance: 0,
        speed: 0
    };

    // Add PointLight at Sun's position
    const light = new THREE.PointLight(0xffffff, 3, 1000); // Stronger light, longer range
    sunMesh.add(light);

    scene.add(sunMesh);
    return sunMesh;
}

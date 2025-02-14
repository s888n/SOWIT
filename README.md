# SOWIT

## Table of Contents

- [Description](#description)
- [Installation](#installation)
- [Demo](#demo)
- [Tech Stack](#tech-stack)
- [Features](#features)
  - [Required Features](#required-features)
  - [Additional Features](#additional-features)
- [Pages](#pages)
- [Resources](#resources)


## Description


## Tech Stack

- React
- R3F
- Django
- Django Rest Framework
- PostgreSQL
- Docker
- Mapbox
- TailwindCSS

## Features

### Required Features

- Draw plot (polygon) on the MapBox. 
- Save the plots on the PostgreSQL database. 
- Retrieve back all saved plots and show them in a Select UI (Dropdown menu). 
- When you select a plot from the Dropdown menu animate the camera view of the 
map to the selected plot.

### Additional Features

- User Authentication (Normal login and Google login)
- Light/Dark mode
- Responsive design
- View Plot in 3D 
- Plot thumbnail preview
- Plot search
## Pages

- Dashboard
- Login/Signup

## Resources

- [Django-allauth](https://docs.allauth.org/en/latest/)


### Polygon Thumbnail Generation

- in javascript
```js
// Get the map canvas
const canvas = map.getCanvas();

// Get the polygon's bounding box (you'll need to calculate this based on the polygon's coordinates)
const bbox = turf.bbox(polygon);

// Create a new canvas element with the desired dimensions
const thumbnailCanvas = document.createElement('canvas');
thumbnailCanvas.width = 200;
thumbnailCanvas.height = 200;

// Get the 2D rendering context for the thumbnail canvas
const ctx = thumbnailCanvas.getContext('2d');

// Draw the map canvas onto the thumbnail canvas, scaling and cropping as needed
ctx.drawImage(canvas, bbox[0], bbox[1], bbox[2] - bbox[0], bbox[3] - bbox[1], 0, 0, thumbnailCanvas.width, thumbnailCanvas.height);

// Convert the thumbnail canvas to a data URL
const dataURL = thumbnailCanvas.toDataURL();

// Create an image element and set its source to the data URL
const thumbnailImage = document.createElement('img');
thumbnailImage.src = dataURL;

// Add the thumbnail image to the page
document.body.appendChild(thumbnailImage);
```

- in React
```js
import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import * as turf from '@turf/turf';

// Your Mapbox access token
mapboxgl.accessToken = 'YOUR_MAPBOX_ACCESS_TOKEN';

const MapComponent = () => {
  const mapContainer = useRef(null);
  const [map, setMap] = useState(null);
  const [polygon, setPolygon] = useState(null); // Store your polygon GeoJSON here
  const [thumbnailUrl, setThumbnailUrl] = useState(null);

  useEffect(() => {
    const initializeMap = () => {
      const newMap = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/streets-v12', // Or your preferred style
        center: [0, 0], // Initial center (adjust as needed)
        zoom: 2, // Initial zoom (adjust as needed)
      });

      newMap.on('load', () => {
        setMap(newMap);

        // Example polygon (replace with your actual polygon data)
        const examplePolygon = turf.polygon([[[0, 0], [0, 10], [10, 10], [10, 0], [0, 0]]]);
        setPolygon(examplePolygon);

        // Add the polygon to the map (optional - if you want it displayed)
        newMap.addSource('polygon-source', {
          type: 'geojson',
          data: examplePolygon,
        });
        newMap.addLayer({
          id: 'polygon-layer',
          type: 'fill',
          source: 'polygon-source',
          paint: {
            'fill-color': 'blue',
            'fill-opacity': 0.5,
          },
        });

        // Fit the map to the polygon bounds
        const bbox = turf.bbox(examplePolygon);
        newMap.fitBounds(bbox, { padding: 50 });  // Add padding for better visualization

      });
    };

    if (!map) {
      initializeMap();
    }

    return () => {
      if (map) map.remove(); // Clean up on unmount
    };
  }, [map]);

  const generateThumbnail = () => {
    if (!map || !polygon) return;

    const canvas = map.getCanvas();
    const bbox = turf.bbox(polygon);

    const thumbnailCanvas = document.createElement('canvas');
    thumbnailCanvas.width = 200; // Adjust as needed
    thumbnailCanvas.height = 200; // Adjust as needed
    const ctx = thumbnailCanvas.getContext('2d');

    // Calculate scaling factors to fit the bbox into the thumbnail canvas
    const mapWidth = bbox[2] - bbox[0];
    const mapHeight = bbox[3] - bbox[1];
    const scaleX = thumbnailCanvas.width / mapWidth;
    const scaleY = thumbnailCanvas.height / mapHeight;
    const scale = Math.min(scaleX, scaleY); // Use the smaller scale to fit the entire polygon


    const offsetX = (thumbnailCanvas.width - mapWidth * scale) / 2;
    const offsetY = (thumbnailCanvas.height - mapHeight * scale) / 2;

    ctx.drawImage(
      canvas,
      // Source rectangle (from the map canvas)
      bbox[0], bbox[3], mapWidth, -mapHeight, // Note the negative mapHeight for correct orientation
      // Destination rectangle (on the thumbnail canvas)
      offsetX, offsetY, mapWidth * scale, mapHeight * scale
    );



    const dataURL = thumbnailCanvas.toDataURL();
    setThumbnailUrl(dataURL);
  };

  return (
    <div>
      <div ref={mapContainer} style={{ width: '500px', height: '300px' }} />
      <button onClick={generateThumbnail}>Generate Thumbnail</button>
      {thumbnailUrl && <img src={thumbnailUrl} alt="Polygon Thumbnail" />}
    </div>
  );
};

export default MapComponent;
```

```javascript
import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import * as turf from '@turf/turf';

// Your Mapbox access token
mapboxgl.accessToken = 'YOUR_MAPBOX_ACCESS_TOKEN';

const MapComponent = () => {
  const mapContainer = useRef(null);
  const [map, setMap] = useState(null);
  const [polygon, setPolygon] = useState(null);
  const [thumbnailUrl, setThumbnailUrl] = useState(null);
  const [showSaveForm, setShowSaveForm] = useState(false);
  const [polygonName, setPolygonName] = useState('');
  const [saving, setSaving] = useState(false); // Track saving state
  const [saveError, setSaveError] = useState(null); // Track save errors

  useEffect(() => {
    // ... (Map initialization code - same as before)

        newMap.on('draw.create', (e) => {
            const drawnPolygon = e.features[0];
            setPolygon(drawnPolygon);
            const bbox = turf.bbox(drawnPolygon);
            newMap.fitBounds(bbox, { padding: 50 });
            setShowSaveForm(true); // Show the form after drawing
        });

        newMap.on('draw.update', (e) => {
            const updatedPolygon = e.features[0];
            setPolygon(updatedPolygon);
            const bbox = turf.bbox(updatedPolygon);
            newMap.fitBounds(bbox, { padding: 50 });
        });

        newMap.on('draw.delete', () => {
            setPolygon(null);
            setShowSaveForm(false);
            setThumbnailUrl(null);
        });

    return () => {
      if (map) map.remove();
    };
  }, [map]);


  const generateThumbnail = () => {
    if (!map || !polygon) return;
    // ... (Thumbnail generation code - same as before)
  };

  const handleSave = async () => {
      setSaving(true);
      setSaveError(null); // Clear any previous errors

      try {
          const thumbnail = generateThumbnail(); // Generate if not already done

          // Here you would send the polygon data and thumbnail to your backend
          const response = await fetch('/api/savePolygon', { // Replace with your API endpoint
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                  name: polygonName,
                  geojson: polygon,
                  thumbnail: thumbnailUrl, // Send the thumbnail data URL
              }),
          });

          if (!response.ok) {
              const errorData = await response.json(); // Get error details from the server
              throw new Error(errorData.message || 'Failed to save polygon.');
          }

          // Handle successful save (e.g., reset form, show message)
          setPolygonName('');
          setShowSaveForm(false);
          alert('Polygon saved successfully!');

      } catch (error) {
          console.error("Error saving polygon:", error);
          setSaveError(error.message); // Display error message to the user
      } finally {
          setSaving(false);
      }
  };


  return (
    <div>
      <div ref={mapContainer} style={{ width: '500px', height: '300px' }} />

      {showSaveForm && (
        <form onSubmit={handleSave}>
          <label htmlFor="polygonName">Polygon Name:</label>
          <input
            type="text"
            id="polygonName"
            value={polygonName}
            onChange={(e) => setPolygonName(e.target.value)}
            required
          />
          <button type="submit" disabled={saving}>
              {saving ? 'Saving...' : 'Save Polygon'}
          </button>
          {saveError && <p style={{ color: 'red' }}>{saveError}</p>} {/* Display error */}
        </form>
      )}

      {thumbnailUrl && <img src={thumbnailUrl} alt="Polygon Thumbnail" />}
    </div>
  );
};

export default MapComponent;
```

Key changes and explanations:

1.  **State for Form Visibility:** Added `showSaveForm` state to control the visibility of the save form. It's set to `true` after a polygon is drawn.

2.  **State for Polygon Name:** Added `polygonName` state to store the name entered by the user.

3.  **Save Form:** Added a form with an input field for the polygon name and a save button.

4.  **`handleSave` Function:** This function is called when the user submits the form. It now includes:
    *   **Fetching Thumbnail:** Calls `generateThumbnail()` if the thumbnail hasn't been generated yet.
    *   **API Call:** Makes a POST request to your backend API endpoint (`/api/savePolygon` – replace with your actual endpoint).  It sends the polygon data (GeoJSON) and the thumbnail data URL.
    *   **Error Handling:** Includes a `try...catch` block to handle potential errors during the API call.  Error messages from the server are displayed to the user.
    *   **Saving State:** Uses the `saving` state to disable the save button while the request is in progress and show a "Saving..." message.
    *   **Success Handling:** After a successful save, the form is reset, and a success message is displayed (you might want to use a more user-friendly notification).

5.  **API Endpoint:** You'll need to create a backend API endpoint (`/api/savePolygon` in this example) to handle saving the polygon data and thumbnail to your database or storage.

6.  **Thumbnail Storage:**  The backend will need to handle storing the thumbnail image. You can either save it as a file and store the file path, or you can store the data URL directly (though this might not be ideal for very large images).

7.  **Error Display:** The `saveError` state is used to display any error messages returned from the server to the user.

8.  **Draw Events:** The code now listens to the `draw.create`, `draw.update`, and `draw.delete` events of the Mapbox Draw plugin.  It updates the `polygon` state when the polygon is drawn, updated, or deleted, and shows/hides the save form accordingly.  It also refits the map bounds after each change.

**Backend (Example using Node.js and Express):**

```javascript
const express = require('express');
const app = express();
const fs = require('fs'); // For file system operations (if saving image to file)

app.use(express.json());

app.post('/api/savePolygon', (req, res) => {
  const { name, geojson, thumbnail } = req.body;

  try {
    // 1. Save the GeoJSON data (e.g., to a database or file)
    // ... your code to save geojson ...

    // 2. Save the thumbnail image
    const base64Data = thumbnail.replace(/^data:image\/png;base64,/, "");  // Remove data URL prefix
    const filename = `${name}.png`; // Or generate a unique filename
    fs.writeFile(`public/thumbnails/${filename}`, base64Data, 'base64', (err) => { // Save to file
        if (err) {
            console.error("Error saving thumbnail:", err);
            return res.status(500).json({ message: "Failed to save thumbnail." });
        }
    });

    // ... save filename or path to your database

    res.json({ message: 'Polygon saved successfully' });
  } catch (error) {
    console.error("Error saving polygon:", error);
    res.status(500).json({ message: 'Failed to save polygon.' });
  }
});

// ... rest of your server code
```

Remember to adapt the backend code to your specific database or storage solution.  This example saves the thumbnail image as a PNG file.  You'll need to adjust the file path and saving logic as needed.  Also, make sure the `public/thumbnails` directory exists.

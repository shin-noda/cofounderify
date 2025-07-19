// src/components/ProjectMap.tsx
import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { getFirestore, collection, query, onSnapshot } from "firebase/firestore";
import { app } from "../lib/firebase";
import L from "leaflet";

const db = getFirestore(app);

// Optional: Fix missing marker icons
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

interface Project {
  id: string;
  title: string;
  location?: {
    lat: number;
    lng: number;
  };
}

const ProjectMap = () => {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    const q = query(collection(db, "projects"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Project[];
      setProjects(data);
    });

    return () => unsubscribe();
  }, []);

  const center: [number, number] = [20, 0]; // lat, lng

  return (
    <div className="h-[80vh] w-full mt-6">
      <MapContainer 
        center={center} 
        zoom={2} 
        scrollWheelZoom={true} 
        className="h-full w-full z-0"
      >
        <TileLayer
          attribution='&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, © OpenMapTiles © OpenStreetMap contributors'
          url="https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png"
        />
        {projects
          .filter((proj) => proj.location && proj.location.lat && proj.location.lng)
          .map((proj) => (
            <Marker key={proj.id} position={[proj.location!.lat, proj.location!.lng]}>
              <Popup>{proj.title}</Popup>
            </Marker>
          ))}
      </MapContainer>
    </div>
  );
};

export default ProjectMap;
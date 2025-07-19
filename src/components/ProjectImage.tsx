import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import 'react-lazy-load-image-component/src/effects/blur.css';
import type { ProjectImageProps } from "../types/ProjectImage";

const ProjectImage: React.FC<ProjectImageProps> = ({ imageUrl, title }) => {
  return (
    <div className="h-48 w-full overflow-hidden rounded-t-lg bg-gray-200 flex items-center justify-center">
      {imageUrl ? (
        <LazyLoadImage
          src={imageUrl}
          alt={`Project ${title}`}
          effect="blur"
          className="object-cover h-full w-full"
        />
      ) : (
        <div className="text-gray-500 italic">No Image</div>
      )}
    </div>
  );
};

export default ProjectImage;

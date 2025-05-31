import { getTechLogos, parseTechStack } from "@/lib/utils";
import React from "react";
import Image from "next/image";

const DisplayTechIcons = async ({ techStack }: TechIconProps) => {
  const parsedStack = parseTechStack(techStack);
  const techIcons = await getTechLogos(parsedStack);
  return (
    <div className="flex gap-2 p-2">
      {techIcons.slice(0, 3).map(({ tech, url }, index) => (
        <div
          key={index}
          className="relative group w-12 h-12 p-1 -m-2 flex items-center justify-center rounded-full bg-neutral-900 shadow-md transition-transform duration-200 hover:scale-110"
        >
          <span className="absolute bottom-full mb-2 px-2 py-1 text-xs text-white bg-gray-800 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-10">
            {tech}
          </span>
          <Image
            className="w-8 h-8 object-contain"
            src={url}
            alt={tech}
            width={120}
            height={120}
          />
        </div>
      ))}
    </div>
  );
};

export default DisplayTechIcons;

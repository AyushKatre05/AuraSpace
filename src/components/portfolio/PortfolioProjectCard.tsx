"use client"
import React from "react";
import { FaExternalLinkAlt, FaGithub } from "react-icons/fa";
import Link from "next/link";
import { motion } from "framer-motion";

const PortfolioProjectCard = ({ projectData }: any) => {
  return (
    <section id="project" className="w-full py-10 dark:bg-black">
      {/* Section Header */}
      <div>
        <h1 className="text-3xl text-center font-bold dark:text-gray-100 mb-4">
          #Projects
        </h1>
      </div>

      {/* Projects Grid */}
      <div className="w-full mt-8 flex flex-wrap dark:bg-gray-900 gap-6 px-6">
        {projectData &&
          projectData.map((project: any, i: number) => (
            <motion.div
              key={i}
              className="dark:bg-gray-800 relative p-4 max-w-[350px] w-full rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2, duration: 0.6 }}
            >
              {/* Project Image */}
              <img
                className="w-full cursor-pointer rounded-lg object-cover h-[200px] border-2"
                src={project?.image}
                alt="project"
              />

              {/* Project Details */}
              <div className="mt-4">
                <h1 className="text-xl font-bold dark:text-gray-100">
                  {project?.title}
                </h1>
                <p
                  style={{
                    display: "-webkit-box",
                    WebkitBoxOrient: "vertical",
                    WebkitLineClamp: 2,
                    overflow: "hidden",
                  }}
                  className="dark:text-gray-100 mt-2 text-sm"
                >
                  {project?.description}
                </p>

                {/* Technologies */}
                <div className="flex mt-3 flex-wrap gap-2">
                  {project?.technologies &&
                    project?.technologies.map((tech: any, j: number) => (
                      <span
                        key={j}
                        className="font-medium dark:text-gray-100 border border-gray-300 rounded-full px-3 py-1 text-gray-700 text-xs"
                      >
                        {tech}
                      </span>
                    ))}
                </div>
              </div>

              {/* Project Links */}
              {(project.github || project.link) && (
                <div className="absolute bottom-4 right-4 flex gap-4">
                  {project.github && (
                    <Link href={project.github} target="_blank">
                      <FaGithub className="text-gray-500 hover:text-black hover:scale-125 transition-all cursor-pointer text-2xl" />
                    </Link>
                  )}
                  {project.link && (
                    <Link href={project.link} target="_blank">
                      <FaExternalLinkAlt className="text-gray-500 hover:text-black hover:scale-125 transition-all cursor-pointer text-2xl" />
                    </Link>
                  )}
                </div>
              )}
            </motion.div>
          ))}
      </div>
    </section>
  );
};

export default PortfolioProjectCard;

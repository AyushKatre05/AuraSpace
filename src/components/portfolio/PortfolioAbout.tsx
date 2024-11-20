"use client";
import PortfolioLinks from "./PortfolioLinks";
import Image from "next/image";
import { motion } from "framer-motion";

const PortfolioAbout = ({
  aboutDatas,
  allLinks,
}: {
  aboutDatas: any;
  allLinks: any;
}) => {
  return (
    <section
      id="about"
      className="w-full h-full bg-gray-100 dark:bg-gray-900 py-12 px-6 transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 items-center gap-12">
        {/* Left Side - Image Section */}
        <motion.div
          className="flex justify-center"
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {aboutDatas[0]?.image && (
            <div className="relative w-[250px] h-[250px] md:w-[300px] md:h-[300px] rounded-full shadow-lg overflow-hidden border-4 border-primary dark:border-secondary">
              <Image
                className="rounded-full object-cover"
                src={aboutDatas[0]?.image}
                alt="User's Image"
                layout="fill"
                quality={100}
                title="User Image"
              />
            </div>
          )}
        </motion.div>

        {/* Right Side - Content Section */}
        <motion.div
          className="text-center md:text-left"
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h2 className="text-2xl md:text-4xl font-bold text-gray-800 dark:text-gray-100">
            Hello, I'm{" "}
            <span className="text-primary dark:text-blue-600">
              {aboutDatas[0]?.name}
            </span>
          </h2>
          <h3 className="text-lg md:text-2xl font-medium text-gray-600 dark:text-gray-300 mt-2">
            {aboutDatas[0]?.heading}
          </h3>
          <p className="mt-4 text-gray-500 dark:text-gray-400 text-base md:text-lg leading-relaxed">
            {aboutDatas[0]?.about}
          </p>

          {/* Links Section */}
          <motion.div
            className="mt-6"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            <PortfolioLinks allLinks={allLinks} />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default PortfolioAbout;

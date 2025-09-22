import React from "react";
import { Link } from "react-router-dom";
import calLogLogo from "../assets/img/calLogLogo.png";
import firstPage from "../assets/img/firstpage.png";
import profile2 from "../assets/img/profile2.png";
import food55 from "../assets/img/food55.png";
import food1 from "../assets/img/food1.png";
import tracker2 from "../assets/img/tracker2.png";
import tracker3 from "../assets/img/tracker3.png";
import tracker4 from "../assets/img/tracker4.png";
import wloss from "../assets/img/wloss.png";
import main from "../assets/img/main.png";
import wgain from "../assets/img/wgain.png";
import target from "../assets/img/target.png";
import five1 from "../assets/img/five1.png";
import five2 from "../assets/img/five2.png";
import five3 from "../assets/img/five3.png";
import food2 from "../assets/img/food2.png";
import food33 from "../assets/img/food33.png";
import drink1 from "../assets/img/drink1.png";
import main2 from "../assets/img/main2.jpg";
import main4 from "../assets/img/main4.jpg";
import main6 from "../assets/img/main6.jpg";
import im3 from "../assets/img/im3.png";
import im4 from "../assets/img/im4.png";
import im5 from "../assets/img/im5.png";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaCheckCircle } from "react-icons/fa";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";
import { MdEmail, MdPhone } from "react-icons/md";

export default function LandingHero() {
  const [count1, setCount1] = useState(0);
  const [count2, setCount2] = useState(0);
  const [count3, setCount3] = useState(0);

  useEffect(() => {
    let start1 = 0,
      start2 = 0,
      start3 = 0;
    const end1 = 3200; // 3.2K
    const end2 = 1.8; // 1.8%
    const end3 = 4.5; // 4.5M

    const timer = setInterval(() => {
      start1 += 50;
      start2 += 0.05;
      start3 += 0.05;
      if (start1 <= end1) setCount1(start1);
      if (start2 <= end2) setCount2(start2);
      if (start3 <= end3) setCount3(start3);
    }, 20);

    return () => clearInterval(timer);
  }, []);
  return (
    <div
      className="w-full relative font-sans text-white"
      style={{ fontFamily: "'Poppins', sans-serif" }}
    >
      {/* Background */}
      <div
        className="fixed inset-0 z-0"
        style={{
          background: "linear-gradient(135deg, #1D2D44 0%, #FF6B6B 100%)",
        }}
      />
      {/* Navbar */}
      <nav className="sticky top-0 z-50 flex items-center justify-between px-8 py-4 bg-transparent backdrop-blur-md">
        <img
          src={calLogLogo}
          alt="CalLog Logo"
          className="h-8 w-auto object-contain"
        />
        <div className="flex items-center gap-10">
          <a
            href="#home"
            className="text-gray-200 font-medium hover:text-blue-400 transition-colors duration-200"
          >
            Home
          </a>
          <a
            href="#about"
            className="text-gray-200 font-medium hover:text-blue-400 transition-colors duration-200"
          >
            About Us
          </a>
          <a
            href="#contact"
            className="text-gray-200 font-medium hover:text-blue-400 transition-colors duration-200"
          >
            Contact
          </a>
          <Link to="/signup">
            <button>Signup</button>
          </Link>
          <Link
            to="/login"
            className="ml-6 px-10 py-2 bg-gray-700 text-white rounded-3xl hover:bg-blue-500 transition-colors duration-200"
          >
            Log In
          </Link>
        </div>
      </nav>
      {/* Hero Section */}
      <div
        id="home"
        className="relative z-10 min-h-screen flex flex-col md:flex-row items-center justify-between px-6 md:px-16 mt-12"
      >
        {/* Text Column */}
        <motion.div
          className="w-full md:w-1/2 flex flex-col justify-center text-left -mt-32"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.6 } },
          }}
        >
          <motion.h1
            className="text-[44px] md:text-[56px] lg:text-[50px] font-semibold leading-tight"
            variants={{
              hidden: { opacity: 0, x: -40 },
              visible: {
                opacity: 1,
                x: 0,
                transition: { duration: 2.5, ease: "easeOut" },
              },
            }}
          >
            Fuel your body, reach <br /> your goals, your smart <br /> calorie
            tracker
          </motion.h1>

          <motion.p
            className="mt-6 text-sm md:text-base text-gray-300 max-w-lg"
            variants={{
              hidden: { opacity: 0, x: -20 },
              visible: {
                opacity: 1,
                x: 0,
                transition: { duration: 2.5, delay: 0.5, ease: "easeOut" },
              },
            }}
          >
            Log meals, track workouts, and stay on top of your health every day.
          </motion.p>

          <motion.a
            href="#fitness-goals"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 2.5, delay: 1, ease: "easeOut" },
              },
            }}
          >
            <motion.button
              className="mt-10 self-start inline-flex items-center px-6 md:px-8 py-3 bg-white text-[#1D2D44] rounded-full text-lg font-medium shadow-lg"
              whileHover={{ scale: 1.08, rotate: 1 }}
              whileTap={{ scale: 0.96, rotate: -1 }}
              onClick={() => (window.location.href = "/signup")}
            >
              Start Tracking <span className="ml-3 text-xl">›</span>
            </motion.button>
          </motion.a>
        </motion.div>

        {/* Image Column */}
        <div className="w-full md:w-1/2 flex justify-end items-start -mt-48">
          <motion.img
            src={firstPage}
            alt="CalLogFit hero"
            className="w-[500px] h-[500px] md:w-[650px] md:h-[650px] object-cover rounded-full drop-shadow-2xl"
            animate={{
              rotateY: [0, 10, -10, 0], // subtle 3D tilt left-right
              rotateX: [0, 5, -5, 0], // subtle 3D tilt up-down
              y: [0, -20, 0, 20, 0], // floating up-down
              scale: [1, 1.04, 1, 1.03, 1], // subtle scaling
            }}
            transition={{
              duration: 14, // long duration for smooth movement
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </div>
      </div>

      {/* Fitness Goals Section */}
      <section
        id="fitness-goals"
        className="relative z-10 min-h-screen flex flex-col md:flex-row items-start justify-center px-6 md:px-16 py-20 bg-white"
      >
        {/* Image Cards */}
        <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-10 p-4">
          {[food1, drink1, food55, food33, im4, im5].map((food, index) => (
            <motion.div
              key={index}
              className="w-full h-60 rounded-xl shadow-lg overflow-hidden bg-[#1D2D44] transform"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.05, y: -10 }}
              viewport={{ once: true }}
              transition={{
                duration: 3,
                delay: index * 0.3,
                type: "spring",
                stiffness: 50,
              }}
            >
              <motion.img
                src={food}
                alt={`Food${index}`}
                className="w-full h-full object-cover"
                animate={{ y: [0, -10, 0] }}
                transition={{
                  duration: 4 + index * 0.2,
                  repeat: Infinity,
                  repeatType: "loop",
                }}
              />
            </motion.div>
          ))}
        </div>

        {/* Text Content */}
        <div className="flex-1 px-4 md:px-8 py-6 flex flex-col justify-center text-[#1D2D44] space-y-4">
          <motion.h2
            className="text-2xl md:text-3xl font-bold mb-2 leading-tight text-center md:text-left"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: [0, 1, 0.9, 1], y: [0, -5, 0] }}
            transition={{ duration: 5, repeat: Infinity }}
          >
            Discover Your Perfect Meals <br className="hidden md:block" />& Plan
            Your Journey
          </motion.h2>

          <motion.p
            className="text-base md:text-lg text-gray-700 text-center md:text-left font-medium leading-relaxed"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: [0, 1, 0.9, 1], y: [0, -5, 0] }}
            transition={{ duration: 5, repeat: Infinity, delay: 0.5 }}
          >
            Track your calories and make consistent progress every day with our
            smart nutrition tracker.
          </motion.p>

          <motion.div
            className="space-y-3 text-center md:text-left mt-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0.9, 1] }}
            transition={{ duration: 5, repeat: Infinity, delay: 1 }}
          >
            <div className="bg-blue-50 p-3 rounded-lg border-l-4 border-blue-500">
              <h3 className="font-bold text-blue-700 text-base mb-1">
                Set Daily Calorie Targets
              </h3>
              <p className="text-gray-600 text-xs">
                Personalized goals based on your body and objectives
              </p>
            </div>

            <div className="bg-green-50 p-3 rounded-lg border-l-4 border-green-500">
              <h3 className="font-bold text-green-700 text-base mb-1">
                Track Meals & Workouts
              </h3>
              <p className="text-gray-600 text-xs">
                Comprehensive logging for complete nutrition awareness
              </p>
            </div>

            <div className="bg-purple-50 p-3 rounded-lg border-l-4 border-purple-500">
              <h3 className="font-bold text-purple-700 text-base mb-1">
                Get Food Recommendations
              </h3>
              <p className="text-gray-600 text-xs">
                Smart suggestions tailored to your preferences and goals
              </p>
            </div>
          </motion.div>

          <motion.button
            className="bg-gradient-to-r from-[#1D2D44] to-[#3E5C76] text-white px-6 py-3 rounded-lg font-semibold shadow-md hover:shadow-lg transition-all duration-300 self-center md:self-start mt-4 w-full md:w-48 text-base"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: [0, 1], scale: [0.8, 1] }}
            transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}
            onClick={() => (window.location.href = "/signup")}
          >
            Start Your Journey
          </motion.button>
        </div>
      </section>
      {/* Feature Cards Section */}
      <section className="relative z-10 bg-white min-h-screen py-24 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <motion.h2
            className="text-3xl md:text-4xl font-bold text-[#1D2D44] mb-8"
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 3 }} // increased duration
          >
            Explore Your Personalized Nutrition & Fitness
          </motion.h2>
          <motion.p
            className="text-gray-600 mb-10 text-sm md:text-base max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 3, delay: 0.5 }} // increased duration
          >
            Track your meals, discover foods, and stay on top of your health
            goals
          </motion.p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[tracker2, tracker3, tracker4].map((tracker, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-2xl shadow-lg p-5 flex flex-col items-center h-[32rem] hover:scale-105 transition-transform"
                initial={{ opacity: 0, y: 50, rotate: -2 }}
                whileInView={{ opacity: 1, y: 0, rotate: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 3, // increased duration
                  delay: index * 0.5, // longer delay between cards
                  type: "spring",
                  stiffness: 80,
                }}
                whileHover={{ y: -10, scale: 1.05, rotate: 1 }}
              >
                <img
                  src={tracker}
                  alt={`Tracker${index}`}
                  className="rounded-xl w-full h-[22rem] object-cover mb-4"
                />
                <h3 className="text-lg font-semibold text-[#1D2D44] mb-2">
                  {index === 0 && "Log Your Meals"}
                  {index === 1 && "Personalized Food "}
                  {index === 2 && "Track Your Progress"}
                </h3>
                <p className="text-gray-500 text-sm">
                  {index === 0 &&
                    "Quickly record your daily meals and track your calories with ease."}
                  {index === 1 &&
                    "Discover foods tailored to your dietary needs and fitness goals."}
                  {index === 2 &&
                    "Monitor your daily calorie intake and see how your health improves over time."}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      {/* Continuous Background Wrapper */}
      <div className="relative z-0">
        {/* Shared Background */}
        <div
          className="fixed inset-0 z-0"
          style={{
            background: "linear-gradient(135deg, #020617 0%, #1D2D44 100%)",
          }}
        />
        <div
          className="fixed inset-0 z-0"
          style={{
            backgroundImage:
              "radial-gradient(circle 500px at 50% 200px, #3e3e3e, transparent)",
          }}
        />
        {/* What We Stand For Section */}
        <section id="about" className="relative z-10 py-16 px-6 bg-[#1D2D44]">
          <div className="max-w-6xl mx-auto">
            {/* Section Header */}
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-100 mb-4 relative inline-block">
                What We Stand For
                <span className="absolute left-1/2 -bottom-3 w-24 h-1 bg-green-400 rounded-full transform -translate-x-1/2"></span>
              </h2>
              <p className="text-gray-300 max-w-2xl mx-auto text-sm md:text-base">
                Our core principles guide everything we do, helping you build
                sustainable health through awareness and community.
              </p>
            </div>

            <div className="flex flex-col lg:flex-row gap-8 items-stretch">
              {/* Image Gallery - Horizontal Layout */}
              <div className="w-full lg:w-2/5">
                <div className="flex justify-center gap-4 md:gap-6">
                  <div
                    className="flex-1 rounded-2xl overflow-hidden shadow-lg h-64 md:h-72 animate-float"
                    style={{ animationDelay: "0s" }}
                  >
                    <img
                      src={five1}
                      alt="Nutrition awareness"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div
                    className="flex-1 rounded-2xl overflow-hidden shadow-lg h-72 md:h-72 animate-float"
                    style={{ animationDelay: "0.3s" }}
                  >
                    <img
                      src={five2}
                      alt="Community support"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div
                    className="flex-1 rounded-2xl overflow-hidden shadow-lg h-64 md:h-72 animate-float"
                    style={{ animationDelay: "0.6s" }}
                  >
                    <img
                      src={five3}
                      alt="Healthy progress"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                {/* Mini Indicators for small screens */}
                <div className="flex justify-center mt-4 lg:hidden">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 rounded-full bg-green-400"></div>
                    <div className="w-2 h-2 rounded-full bg-green-400"></div>
                    <div className="w-2 h-2 rounded-full bg-green-400"></div>
                  </div>
                </div>
              </div>

              {/* Principles Cards */}
              <div className="w-full lg:w-3/5">
                <div className="grid md:grid-cols-2 gap-5">
                  {/* Card 1 */}
                  <div className="bg-[#2A3A50] rounded-xl p-5 border-l-4 border-green-400 transition-all hover:translate-y-[-5px]">
                    <div className="flex items-start mb-3">
                      <div className="bg-green-400/20 p-2 rounded-lg mr-3">
                        <svg
                          className="w-5 h-5 text-green-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                          ></path>
                        </svg>
                      </div>
                      <h3 className="text-green-400 font-semibold text-sm">
                        Awareness First
                      </h3>
                    </div>
                    <p className="text-gray-300 text-xs leading-relaxed">
                      Understanding your nutrition is the essential foundation
                      for lasting health. Every successful journey begins with
                      knowing exactly where you stand today.
                    </p>
                  </div>

                  {/* Card 2 */}
                  <div className="bg-[#2A3A50] rounded-xl p-5 border-l-4 border-blue-400 transition-all hover:translate-y-[-5px]">
                    <div className="flex items-start mb-3">
                      <div className="bg-blue-400/20 p-2 rounded-lg mr-3">
                        <svg
                          className="w-5 h-5 text-blue-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                          ></path>
                        </svg>
                      </div>
                      <h3 className="text-blue-400 font-semibold text-sm">
                        Progress Over Perfection
                      </h3>
                    </div>
                    <p className="text-gray-300 text-xs leading-relaxed">
                      We reject quick fixes in favor of steady, meaningful
                      improvements that actually stick. Small consistent steps
                      lead to transformative results over time.
                    </p>
                  </div>

                  {/* Card 3 */}
                  <div className="bg-[#2A3A50] rounded-xl p-5 border-l-4 border-purple-400 transition-all hover:translate-y-[-5px]">
                    <div className="flex items-start mb-3">
                      <div className="bg-purple-400/20 p-2 rounded-lg mr-3">
                        <svg
                          className="w-5 h-5 text-purple-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                          ></path>
                        </svg>
                      </div>
                      <h3 className="text-purple-400 font-semibold text-sm">
                        Community Matters
                      </h3>
                    </div>
                    <p className="text-gray-300 text-xs leading-relaxed">
                      Connecting with others who share your journey provides
                      invaluable motivation. We celebrate milestones together
                      and find strength in our collective growth.
                    </p>
                  </div>

                  {/* Card 4 */}
                  <div className="bg-[#2A3A50] rounded-xl p-5 border-l-4 border-yellow-400 transition-all hover:translate-y-[-5px]">
                    <div className="flex items-start mb-3">
                      <div className="bg-yellow-400/20 p-2 rounded-lg mr-3">
                        <svg
                          className="w-5 h-5 text-yellow-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                          ></path>
                        </svg>
                      </div>
                      <h3 className="text-yellow-400 font-semibold text-sm">
                        Sustainable Results
                      </h3>
                    </div>
                    <p className="text-gray-300 text-xs leading-relaxed">
                      We focus on building habits that become natural parts of
                      your lifestyle. True transformation happens when healthy
                      choices stop feeling like effort.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Animations */}
          <style>{`
    @keyframes float {
      0%, 100% { transform: translateY(0px); }
      50% { transform: translateY(-10px); }
    }
    .animate-float {
      animation: float 8s ease-in-out infinite;
    }
  `}</style>
        </section>

        <section className="relative z-20 w-full bg-white text-gray-900 py-6">
          <div className="mx-auto max-w-7xl px-6 grid grid-cols-1 md:grid-cols-4 items-center gap-10">
            <div className="flex md:col-span-3 divide-x divide-gray-200">
              <div className="flex-1 px-6">
                <div className="flex items-baseline gap-1">
                  <span className="text-5xl font-semibold">1K</span>
                  <span className="text-2xl font-medium">+</span>
                </div>
                <p className="mt-2 text-sm">Calories Tracked</p>
              </div>

              <div className="flex-1 px-6">
                <div className="flex items-baseline gap-1">
                  <span className="text-5xl font-semibold">98</span>
                  <span className="text-2xl font-medium">%</span>
                </div>
                <p className="mt-2 text-sm">Personalized Accuracy</p>
              </div>

              <div className="flex-1 px-6">
                <div className="flex items-baseline gap-1">
                  <span className="text-5xl font-semibold">3000</span>
                  <span className="text-2xl font-medium">K</span>
                </div>
                <p className="mt-2 text-sm">Meals Recommended</p>
              </div>
            </div>

            <div className="space-y-5 md:pl-6">
              <p>
                CalLog helps you track your daily calories and provides smart
                meal recommendations tailored to your health goals.
              </p>
              <a
                href="#join"
                className="inline-block font-medium underline underline-offset-4 text-blue-500"
              >
                Start Tracking
              </a>
            </div>
          </div>
        </section>

        {/* Continuous Gradient Wrapper */}
        <section
          className="relative w-full font-sans text-white"
          style={{ fontFamily: "'Poppins', sans-serif" }}
        >
          {/* Background Layers applied ONCE */}
          <div
            className="absolute inset-0 z-0"
            style={{
              background: "linear-gradient(135deg, #020617 0%, #1D2D44 100%)",
            }}
          />
          <div
            className="absolute inset-0 z-0"
            style={{
              backgroundImage:
                "radial-gradient(circle 500px at 50% 200px, #3e3e3e, transparent)",
            }}
          />
          import {motion} from "framer-motion";
          {/* Top Pick Goals Section */}
          <section className="relative z-10 py-32 px-6 min-h-[120vh] pb-40">
            <div className="relative z-10 max-w-6xl mx-auto text-center">
              {/* Top text */}
              <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
                Our Top Pick for Your Goals
              </h2>
              <p className="text-white mb-16 max-w-3xl mx-auto">
                Whether you want to lose weight, gain muscle, or maintain your
                current shape, our programs give you the right calorie targets
                to reach your goals faster—all based on your unique body and
                lifestyle.
              </p>

              {/* Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                {[
                  {
                    title: "Weight Loss",
                    description:
                      "Burn fat smartly with a personalized calorie deficit for steady progress.",
                    color: "bg-gradient-to-tr from-purple-200 to-purple-400",
                    textColor: "text-black",
                  },
                  {
                    title: "Weight Maintenance",
                    description:
                      "Maintain your ideal weight with the perfect daily calorie balance.",
                    color: "bg-gradient-to-tr from-purple-200 to-purple-400",
                    textColor: "text-black",
                  },
                  {
                    title: "Weight Gain",
                    description:
                      "Build muscle and strength with a calculated calorie surplus.",
                    color: "bg-gradient-to-tr from-white to-gray-200",
                    textColor: "text-black",
                  },
                  {
                    title: "Personalized Targets",
                    description:
                      "Get your exact daily calorie needs based on your body metrics.",
                    color: "bg-gradient-to-tr from-purple-200 to-purple-400",
                    textColor: "text-black",
                  },
                ].map((goal, index) => (
                  <motion.div
                    key={index}
                    className={`rounded-2xl p-8 flex flex-col justify-between shadow-xl cursor-pointer ${goal.color}`}
                    initial={{ opacity: 0, y: 80 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{
                      duration: 2,
                      delay: index * 0.5,
                      ease: "easeOut",
                    }} // ⬅️ Slow, smooth
                    whileHover={{
                      scale: 1.05,
                      y: -12,
                      boxShadow: "0px 25px 50px rgba(0,0,0,0.25)",
                      transition: { duration: 0.6, ease: "easeInOut" }, // slower hover effect
                    }}
                  >
                    <h3
                      className={`text-xl font-semibold mb-4 ${goal.textColor}`}
                    >
                      {goal.title}
                    </h3>
                    <p className={`text-sm mb-6 ${goal.textColor}`}>
                      {goal.description}
                    </p>
                    <a
                      href="#"
                      className={`font-medium hover:underline self-start ${goal.textColor}`}
                    >
                      Learn More →
                    </a>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
          {/* Contact Section - no extra gradient */}
          <section id="contact" className="relative z-10 py-20 px-6 md:px-16">
            <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10">
              {/* Left Content */}
              <div>
                <p className="text-sm mb-2">| Contact Us</p>
                <h2 className="text-3xl font-bold mb-4 leading-snug">
                  Get in Touch with <br /> CalLog
                </h2>
                <p className="text-sm leading-relaxed mb-6 text-gray-300">
                  Have questions or need guidance on tracking your nutrition?
                  Our team is here to support you. Whether you’re just getting
                  started, looking to fine-tune your calorie tracking, or
                  exploring your health goals, we’re just a message away.
                </p>
                <p className="text-sm leading-relaxed text-gray-300 mb-6">
                  At CalLog, we take pride in offering personalized assistance
                  tailored to your needs. From your first log to reaching your
                  milestones, we’re committed to making your health journey
                  smooth and empowering. Don’t hesitate to reach out, your path
                  to better nutrition might be just one conversation away.
                </p>

                <div className="flex flex-col gap-3">
                  <input
                    type="text"
                    placeholder="Phone No"
                    className="bg-gray-200 text-black px-4 py-2 rounded-md outline-none w-64"
                  />
                  <input
                    type="email"
                    placeholder="Business E-mail"
                    className="bg-gray-200 text-black px-4 py-2 rounded-md outline-none w-64"
                  />
                </div>
              </div>

              {/* Right Form */}
              <div className="bg-gray-200 rounded-2xl p-6 text-black">
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    placeholder="Your Name ....."
                    className="w-full px-4 py-2 rounded-md outline-none"
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="Your Email ....."
                    className="w-full px-4 py-2 rounded-md outline-none"
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">
                    Subject
                  </label>
                  <input
                    type="text"
                    placeholder="Subject ....."
                    className="w-full px-4 py-2 rounded-md outline-none"
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">
                    Message
                  </label>
                  <textarea
                    placeholder="Your Message ....."
                    rows="4"
                    className="w-full px-4 py-2 rounded-md outline-none resize-none"
                  />
                </div>

                <button className="bg-[#1D2D44] text-white px-6 py-2 rounded-full">
                  Send Message
                </button>
              </div>
            </div>
          </section>
        </section>
        <footer className="relative z-50 bg-white text-gray-700 pt-14 pb-6 shadow-inner">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
            {/* Logo & About */}
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <img
                  src={calLogLogo}
                  alt="CalLog Logo"
                  className="w-12 h-12  "
                />
                <span className="text-2xl font-extrabold text-black tracking-wide">
                  CalLog
                </span>
              </div>
              <p className="text-sm leading-relaxed text-gray-600">
                Track meals, calories, and workouts effortlessly with CalLog.
                Your personal companion for a healthier lifestyle.
              </p>
            </div>

            {/* Explore */}
            <div>
              <h3 className="text-lg font-semibold mb-4 text-black">Explore</h3>
              <ul className="text-sm space-y-3">
                <li>
                  <a href="#home" className="hover:text-green-600 transition">
                    Home
                  </a>
                </li>
                <li>
                  <a href="/signup" className="hover:text-green-600 transition">
                    Calculator
                  </a>
                </li>
                <li>
                  <a href="#meals" className="hover:text-green-600 transition">
                    Meal Plans
                  </a>
                </li>
                <li>
                  <a href="#join" className="hover:text-gray-500 transition">
                    Get Started
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 className="text-lg font-semibold mb-4 text-[#1D2D44]">
                Contact
              </h3>
              <ul className="space-y-3 text-sm">
                <li className="flex items-center space-x-2">
                  <MdEmail className="text-[#1D2D44]" />
                  <span>support@callog.com</span>
                </li>
                <li className="flex items-center space-x-2">
                  <MdPhone className="text-[#1D2D44]" />
                  <span>+251983000000</span>
                </li>
              </ul>
            </div>

            {/* Socials */}
            <div>
              <h3 className="text-lg font-semibold mb-4 text-[#1D2D44]">
                Connect
              </h3>
              <div className="flex space-x-5">
                <a
                  href="#"
                  className="text-gray-500 hover:text-green-600 transition"
                >
                  <FaFacebook size={22} />
                </a>
                <a
                  href="#"
                  className="text-gray-500 hover:text-green-600 transition"
                >
                  <FaTwitter size={22} />
                </a>
                <a
                  href="#"
                  className="text-gray-500 hover:text-green-600 transition"
                >
                  <FaInstagram size={22} />
                </a>
              </div>
            </div>
          </div>

          {/* Bottom */}
          <div className="mt-12 border-t border-gray-200 pt-5 text-center text-sm text-gray-500">
            &copy; {new Date().getFullYear()}{" "}
            <span className="font-semibold text-[#1D2D44]">CalLog</span>. All
            rights reserved.
          </div>
        </footer>
      </div>
    </div>
  );
}

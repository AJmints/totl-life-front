'use client'
import React, { useEffect } from 'react';
import Image from 'next/image';
import springcurrent from '../../public/images/spring-current.jpg';
import aboutView from '../../public/images/about-view.jpg';
import riverView from '../../public/images/river-view.jpg';
import lifeStyle from '../../public/images/lifestyle.jpg';
import viceroy from '../../public/images/viceroy.jpg';
import secretary from '../../public/images/secretary-of-the-treasury.jpg';

const AboutAll = () => {
  useEffect(() => {
    // Manually add the 'fade-in' class to the first section on page load
    const firstSection = document.querySelector('.fade-in-section');
    if (firstSection) {
      firstSection.classList.add('fade-in');
    }
    const handleScroll = () => {
      const sections = document.querySelectorAll('.fade-in-section');
      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        const offset = -100; // Adjust this value as needed
        const isVisible = rect.top - offset < window.innerHeight;
        if (isVisible) {
          section.classList.add('fade-in');
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="mb-5 ">
      {/* Section 1 */}
      <div className="mx-2 fade-in-section">
        <div className="block fade-in">
          <div className="flex justify-center">
          <h1 className="text-center mt-5 sm:mt-10 text-2xl bg-gray-100 p-5 rounded-md w-full">What the heck is TOTL.life??</h1>
          </div>
        </div>
        <div className="block fade-in-section">
          <div className="grid grid-cols-1 sm:grid-cols-2 items-center">
              <Image
                  src={aboutView}
                  alt=""
                  className="w-96 mt-5 p-2 rounded-md bg-gray-100 h-auto mx-auto"
              />
              <p className="text-center mt-5 bg-gray-100 p-5 rounded-md mx-2 sm:mx-5">
              Welcome to TOTL.life, where 
                    we are a collective striving to engage in Sustainable Stewardship, in Missouri and beyond. 
                    Our mission is rooted in the ethos of responsible and lasting care for our environment, 
                    aiming for a positive impact that resonates far into the future. At TOTL.life, we believe in 
                    doing good with purpose, and our journey towards Sustainable Stewardship starts here.
              </p>
          </div>
        </div>
      </div>

      {/* Section 2 */}
      <div className="mx-2 fade-in-section">
        <div className="block fade-in">
          <div className="flex justify-center">
            <h1 className="text-center mt-5 sm:mt-10 text-2xl bg-gray-100 p-5 rounded-md w-full">Our Current Initiative: River Cleanup 2024</h1>
          </div>
          <div className="mx-2 fade-in-section">
            <div className="block fade-in">
                <div className="grid grid-cols-1 sm:grid-cols-2 items-center">
                  <p className="text-center mt-5 bg-gray-100 p-5 rounded-md mx-2 sm:mx-5">
                  River Cleanup 2024, 
                    embodies our philosophy of &#39;We don&#39;t do much, but when we do, it is to help.&#39; 
                    Join us as we roll up our sleeves and work together to protect and restore our local rivers. 
                    Together, we can make a significant impact on the environment and the communities that rely 
                    on these waterways<br/>
                    The details for this event are 
                    pending, but once Totl finds its footing, we will start releasing details about our first 
                    ever group river clean up in 2024!
                  </p>
                  <Image
                      src={riverView}
                      alt=""
                      className="w-96 mt-5 p-2 rounded-md bg-gray-100 h-auto mx-auto"
                  />
                </div>
            </div>
          </div>
        </div>
      </div>

      {/* Section 3 */}
      <div className="mx-2 fade-in-section">
        <div className="block fade-in">
          <div className="flex justify-center">
            <h1 className="text-center mt-5 sm:mt-10 text-2xl bg-gray-100 p-5 rounded-md w-full">The TOTL lifestyle
            </h1>
          </div>
          <div className="mx-2 fade-in-section">
            <div className="block fade-in">
                <div className="grid grid-cols-1 sm:grid-cols-2 items-center">
                    <Image
                        src={lifeStyle}
                        alt=""
                        className="w-96 mt-5 p-2 rounded-md bg-gray-100 h-auto mx-auto"
                    />
                    <p className="text-center mt-5 bg-gray-100 p-5 rounded-md mx-2 sm:mx-5">
                        At TOTL.life, our lifestyle is defined by Sustainable Stewardship. We embrace a mindful approach to living, making choices that contribute to the well-being of our planet. Sustainable Stewardship, to us, means carefully managing and nurturing the resources we&#39;ve been entrusted with. As TOTLers, we understand the profound impact of our actions, and we strive to lead by example.
                    </p>
                </div>
            </div>
          </div>
        </div>
      </div>

      {/* Section 4 */}
      <div className="mx-2 fade-in-section">
        <h1 className="text-center mt-5 sm:mt-10 text-2xl bg-gray-100 p-5 rounded-md w-full">Get to know the heart and soul of TOTL.life
        </h1>
        <div className="block fade-in sm:flex justify-around mt-5">
        <div>
                    <Image src={viceroy} alt="" className="w-52 h-auto mx-auto bg-gray-500 p-2 rounded-full shadow-lg shadow-gray-800 hover:p-0 duration-300"/>
                    <p className="bg-gray-100 p-2 rounded-md text-lg text-center mt-2">Alex</p>
                    </div>
                    <div>
                    <Image src={secretary} alt="" className="w-52 mt-2 h-auto mx-auto bg-gray-500 p-2 rounded-full shadow-lg shadow-gray-800 hover:p-0 duration-300"/>
                    <p className="bg-gray-100 p-2 rounded-md text-lg text-center mt-2">Iley</p>
                    </div>
                    </div>

                    <div className="text-center my-5 space-y-2 bg-gray-100 p-5 rounded-md">
                    <p>Our incredible team of TOTLers. 
                    We&#39;re not just a collective; we&#39;re a *Bale,* a close-knit community united by a 
                    shared commitment to Sustainable Stewardship.</p>
                    <p className="text-2xl">Alex, the Viceroy (he/him):</p>
                    <p>Alex was raised in Missouri, and always had a strong love for nature. Growing up, he
                    had exposure to many of the beautiful local, city, state, and national parks that MO 
                    has to offer. He also got to visit some of the parks in the South Eastern part of the US. 
                    His love for nature sparked a desire to get more involved in preserving the natural 
                    beauty that we have left. That is what sparked the desire for Alex and Iley to create the 
                    Totl.life website! We believe in the power of organizing and working towards a common 
                    goal, and hope you do too! 
                    </p>
                    <p className="text-2xl">Iley, the Secretary of Treasury (he/him):</p>
                    <p>Iley is a native of Missouri and Oklahoma, where the rivers and lakes of the Midwest became the backdrop to many of
                    his childhood summers. Infused with a love for the outdoors from a young age, Iley felt a calling to ensure that the
                    pristine beauty he enjoyed would be preserved for future generations.
                    Drawing from his expertise in data analytics and engineering, Iley is driven to document and study the most effective methods for achieving Sustainable Stewardship. His professional background uniquely positions him to contribute valuable insights, aligning his passion for nature with a commitment to strategic environmental conservation.</p>
        </div>
      </div>
    </div>
  );
};

export default AboutAll;

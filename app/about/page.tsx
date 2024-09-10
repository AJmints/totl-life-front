'use client'
import React, { useEffect } from 'react';
import Image from 'next/image';
import aboutView from '../../public/images/about-view.jpg';
import riverView from '../../public/images/river-view.jpg';
import lifeStyle from '../../public/images/lifestyle.jpg';
import viceroy from '../../public/images/viceroy.jpg';
import secretary from '../../public/images/secretary-of-the-treasury.jpg';
import duke from '../../public/images/kick-ass-duke.jpg'
import archbishop from '../../public/images/archbishop-of-the-sandbar.png'
import mAlchemist from '../../public/images/master-alchemist.jpg'

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
          <div className="block mx-auto">
          <div className='bg-gray-700/80 text-gray-200 mt-5 rounded-md'>
          <h1 className="text-3xl sm:text-7xl p-5 text-center font-serif">
          What the heck is...</h1>
          </div>
          <div>
          <h1 className='mt-5 text-[55px] sm:text-[8rem] md:text-[10rem] lg:text-[13rem] xl:text-[17rem] font-serif mx-5 lg:mx-10 xl:mx-20 text-gray-100 border-b-2 border-gray-300 duration-300'>Totl.Life?</h1>
          </div>
          <div className='flex justify-center'>
            <div className='bg-gray-700/90 mt-5 p-3 rounded-md text-gray-300'>
            <h1>Scroll to learn more...</h1>
            </div>
          </div>
          </div>
        </div>
        <div className="block fade-in-section">
          <div className="grid grid-cols-1 sm:grid-cols-2 items-center">
              <Image
                  src={aboutView}
                  alt=""
                  className="w-96 mt-5 p-2 rounded-md bg-gray-300 h-auto mx-auto"
              />
              <p className="text-center mt-5 bg-gray-700/80 text-gray-300 p-5 rounded-md mx-2 sm:mx-5">
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
      <div className="mx-2 mt-24 fade-in-section">
        <div className="block fade-in">
          <div className="mt-10">
            <div className='flex justify-center bg-gray-700/80 rounded-md'>
            <h1 className="text-left mx-2 sm:mx-10 font-serif text-gray-200 text-2xl md:text-5xl lg:text-7xl p-3 w-full" id='Initiative'>
              Our Current Initiative:</h1>
            </div>
            <div>
              <h1 className='text-5xl sm:text-6xl md:text-[5rem] lg:text-[7rem] xl:text-[8rem] text-gray-100 font-serif text-right mx-10 border-b-2'> River Cleanup 2024</h1>
            </div>
          </div>
          <div className="mx-2 fade-in-section">
            <div className="block fade-in">
                <div className="grid grid-cols-1 mt-5 sm:grid-cols-2 items-center">
                  <p className="text-center mt-5 bg-gray-700/80 text-gray-300 p-5 rounded-md mx-2 sm:mx-5">
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
                      className="w-96 mt-5 p-2 rounded-md bg-gray-300 h-auto mx-auto"
                  />
                </div>
            </div>
          </div>
        </div>
      </div>

      {/* Section 3 */}
      <div className="mx-2 mt-16 fade-in-section">
        <div className="block fade-in">
          <div className="flex justify-center mb-10">
            <h1 className="text-center mt-5 sm:mt-10 text-7xl md:text-[7rem] lg:text-[10rem] text-gray-100 font-serif p-5 w-full lg:mx-10 border-b-2" id='Lifestyle'>The TOTL lifestyle
            </h1>
          </div>
          <div className="mx-2 fade-in-section">
            <div className="block fade-in">
                <div className="grid grid-cols-1 sm:grid-cols-2 items-center">
                    <Image
                        src={lifeStyle}
                        alt=""
                        className="w-96 mt-5 p-2 rounded-md bg-gray-300 h-auto mx-auto"
                    />
                    <p className="text-center mt-5 bg-gray-700/80 text-gray-300 p-5 rounded-md mx-2 sm:mx-5">
                        At TOTL.life, our lifestyle is defined by Sustainable Stewardship. We embrace a mindful approach to living, making choices that contribute to the well-being of our planet. Sustainable Stewardship, to us, means carefully managing and nurturing the resources we&#39;ve been entrusted with. As TOTLers, we understand the profound impact of our actions, and we strive to lead by example.
                    </p>
                </div>
            </div>
          </div>
        </div>
      </div>

      {/* Section 4 */}
      <div className="mx-2 mt-20 fade-in-section pb-5">
        <div>
        <h1 className="text-center mt-5 sm:mt-10 font-serif text-gray-100 text-5xl sm:text-7xl  w-full border-b-2" id='MeetUs'>Get to know the heart and soul of TOTL.life
        </h1>
        </div>
        <div className="block fade-in sm:flex justify-around mt-5">
        <div>
                    <Image src={viceroy} alt="" className="w-52 h-auto mx-auto bg-gray-500 p-2 rounded-full shadow-lg shadow-gray-800 hover:p-0 duration-300"/>
                    <p className="p-2 text-3xl text-gray-200 font-serif border-b-2 text-center mt-2">Alex</p>
                    <p className="text-sm font-serif text-gray-200 text-center">Viceroy</p>
                    </div>
                    <div>
                    <Image src={secretary} alt="" className="w-52 mt-2 h-auto mx-auto bg-gray-500 p-2 rounded-full shadow-lg shadow-gray-800 hover:p-0 duration-300"/>
                    <p className="p-2 text-3xl text-gray-200 font-serif border-b-2 text-center mt-2">Iley</p>
                    <p className="text-sm font-serif text-gray-200 text-center">Secretary of Treasury</p>
                    </div>
                    <div>
                    <Image src={duke} alt="" className="w-52 mt-2 h-auto mx-auto bg-gray-500 p-2 rounded-full shadow-lg shadow-gray-800 hover:p-0 duration-300"/>
                    <p className="p-2 text-3xl text-gray-200 font-serif border-b-2 text-center mt-2">Matt</p>
                    <p className="text-sm font-serif text-gray-200 text-center">Kick Ass Duke</p>
                    </div>
                    <div>
                    <Image src={archbishop} alt="" className="w-52 mt-2 h-auto mx-auto bg-gray-500 p-2 rounded-full shadow-lg shadow-gray-800 hover:p-0 duration-300"/>
                    <p className="p-2 text-3xl text-gray-200 font-serif border-b-2 text-center mt-2">Alex</p>
                    <p className="text-sm font-serif text-gray-200 text-center">Archbishop of the Sandbar</p>
                    </div>
                    <div>
                    <Image src={mAlchemist} alt="" className="w-52 mt-2 h-auto mx-auto bg-gray-500 p-2 rounded-full shadow-lg shadow-gray-800 hover:p-0 duration-300"/>
                    <p className="p-2 text-3xl text-gray-200 font-serif border-b-2 text-center mt-2">Cory</p>
                    <p className="text-sm font-serif text-gray-200 text-center">Master Alchemist</p>
                    </div>
                    </div>
                    
                    

                    <div className="text-center text-gray-300 my-20 space-y-6 bg-gray-700/80 p-5 rounded-md">
                    <p>Our incredible team of TOTLers. 
                    We&#39;re not just a collective; we&#39;re a *Bale,* a close-knit community united by a 
                    shared commitment to Sustainable Stewardship.</p>
                    <div>
                    <p className="text-2xl font-serif border-b-[1px]">Alex, the Viceroy (he/him):</p>
                    <p className='text-sm font-serif mt-1'>Lead Developer / Project Designer</p>
                    </div>
                    <p>
                      On a trip in the year of 2022, Alex was floating with his friends on the Current river when the idea of Totl was hatched.
                      Iley and Alex came up with this idea to start a project that shared their love of nature and the river. Totl is a 
                      project that aims to be a hub for outdoor people and nature lovers to organize and meet. 
                    </p>
                    <div>
                    <p className="text-2xl font-serif border-b-[1px]">Iley, the Secretary of Treasury (he/him):</p>
                    <p className='text-sm font-serif mt-1'>Business Coordinator / Developer</p>
                    </div>
                    <p>Iley is a native of Missouri and Oklahoma, where the rivers and lakes of the Midwest became the backdrop to many of
                    his childhood summers. Infused with a love for the outdoors from a young age, Iley felt a calling to ensure that the
                    pristine beauty he enjoyed would be preserved for future generations.
                    Drawing from his expertise in data analytics and engineering, Iley is driven to document and study the most effective 
                    methods for achieving Sustainable Stewardship. His professional background uniquely positions him to contribute valuable 
                    insights, aligning his passion for nature with a commitment to strategic environmental conservation.</p>
                    <div>
                    <p className="text-2xl font-serif border-b-[1px]">Matt, the Kick Ass Duke (he/him):</p>
                    <p className='text-sm font-serif mt-1'>Project Coordinator</p>
                    </div>
                    <p>Matt is a Missouri native. He grew up exploring rivers and creeks as a child and loved when he experienced interactions 
                      with the wildlife. He&#39;s the navigator of the group and takes charge organizing events and planning.</p>
                      <div>
                    <p className="text-2xl font-serif border-b-[1px]">Alex, Archbishop of the Sandbar (he/him):</p>
                    <p className='text-sm font-serif mt-1'>Project Coordinator</p>
                    </div>
        </div>
      </div>
    </div>
  );
};

export default AboutAll;

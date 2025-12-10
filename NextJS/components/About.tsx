const About = () => {
  return (
    <section id="about" className="bg-white text-black section-padding">
      <div className="container">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-light mb-16 text-center">
            What is Audio <span className="font-bold">Mastering?</span>
          </h2>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                Mastering is simply quality control. We are optimizing the sound of your music to be audible for proper 
                playback in any possible scenario - headphones, speakers, streaming platforms, radio, or any kind of 
                speaker that plays music in a public space.
              </p>

              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                This is the process of transferring the audio from your final mix to the medium for distribution. 
                We make sure that what you created can be reproduced in all scenarios possible, ensuring your music 
                becomes more audible so people can listen to it and enjoy it without any discomfort.
              </p>

              <p className="text-lg text-gray-700 leading-relaxed">
                As a mastering engineer, I provide fresh, neutral ears to catch details you might miss after working 
                on your production for a long time. This ensures consistency and quality control for your final product.
              </p>
            </div>

            <div className="bg-gray-50 p-8 rounded-lg">
              <h3 className="text-2xl font-semibold mb-6">The Importance of Mastering</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-black rounded-full mt-3 mr-3 flex-shrink-0"></span>
                  <span>Quality control and consistency</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-black rounded-full mt-3 mr-3 flex-shrink-0"></span>
                  <span>Optimize for streaming services</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-black rounded-full mt-3 mr-3 flex-shrink-0"></span>
                  <span>Ensure proper translation across systems</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-black rounded-full mt-3 mr-3 flex-shrink-0"></span>
                  <span>Technical insights from fresh ears</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-black rounded-full mt-3 mr-3 flex-shrink-0"></span>
                  <span>Proper format preparation</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About

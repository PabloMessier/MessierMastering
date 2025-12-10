const Studio = () => {
  return (
    <section id="studio" className="bg-white text-black section-padding">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-light mb-8">
              Our <span className="font-bold">Studio</span>
            </h2>

            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              Our mastering suite is equipped with professional monitoring systems and specialized digital processing 
              tools. We work exclusively in the digital domain, utilizing high-end software and precise monitoring 
              in an acoustically treated environment designed for critical listening.
            </p>

            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              Using cutting-edge digital processors and careful technical analysis, we bring out the best in every 
              recording while maintaining the artistic vision of your music. Our digital approach ensures precision 
              and consistency across all projects.
            </p>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <h4 className="font-semibold mb-2">Monitoring</h4>
                <ul className="text-gray-600 space-y-1">
                  <li>Professional studio monitors</li>
                  <li>Multiple reference systems</li>
                  <li>Silent listening environment</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Processing</h4>
                <ul className="text-gray-600 space-y-1">
                  <li>Digital EQ & dynamics</li>
                  <li>High-end digital tools</li>
                  <li>Precision audio analysis</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="relative">
            <img
              src="/studio.jpg"
              alt="Messier Mastering Studio"
              className="w-full h-96 object-cover rounded-lg"
            />
            <div className="absolute inset-0 bg-black/20 rounded-lg"></div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Studio

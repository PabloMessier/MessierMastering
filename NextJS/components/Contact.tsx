import { Mail, Instagram, Facebook, Clock, FileText } from "lucide-react"

const Contact = () => {
  return (
    <section id="contact" className="bg-white text-black section-padding">
      <div className="container">
        <h2 className="text-4xl md:text-5xl font-light mb-16 text-center">
          Get In <span className="font-bold">Touch</span>
        </h2>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div className="lg:pt-8">
            <h3 className="text-2xl font-semibold mb-6">Ready to Master Your Music?</h3>
            <p className="text-lg text-gray-700 mb-8 leading-relaxed">
              Contact us to discuss your project and get a personalized quote. We work with artists of all genres and
              experience levels, from bedroom producers to major label releases.
            </p>

            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <Mail className="text-black" size={24} />
                <div>
                  <h4 className="font-semibold">Email</h4>
                  <a 
                    href="mailto:messiermastering@outlook.com?subject=Mastering%20Project%20Inquiry&body=Hi%2C%0A%0AI%27m%20interested%20in%20your%20mastering%20services.%0A%0AProject%20details%3A%0A-%20Number%20of%20tracks%3A%0A-%20Genre%3A%0A-%20Intended%20release%20date%3A%0A-%20Reference%20tracks%3A%0A%0AThank%20you!" 
                    className="text-gray-600 hover:text-black transition-colors"
                  >
                    messiermastering@outlook.com
                  </a>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <Clock className="text-black" size={24} />
                <div>
                  <h4 className="font-semibold">Response Time</h4>
                  <p className="text-gray-600">Within 24 hours</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <FileText className="text-black" size={24} />
                <div>
                  <h4 className="font-semibold">Turnaround</h4>
                  <p className="text-gray-600">3-5 days for singles, 1-2 weeks for albums</p>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <h4 className="font-semibold mb-4">Follow Our Work</h4>
              <div className="flex space-x-4">
                <a
                  href="https://www.instagram.com/messiermastering/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 text-gray-600 hover:text-black transition-colors"
                >
                  <Instagram size={20} />
                  <span>Instagram</span>
                </a>
                <a
                  href="https://www.facebook.com/MessierMastering"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 text-gray-600 hover:text-black transition-colors"
                >
                  <Facebook size={20} />
                  <span>Facebook</span>
                </a>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-8">
            <h3 className="text-2xl font-semibold mb-6">Project Guidelines</h3>

            <div className="space-y-6">
              <div>
                <h4 className="font-medium mb-2">File Requirements</h4>
                <ul className="text-gray-600 text-sm space-y-1">
                  <li>• WAV or AIFF format</li>
                  <li>• 24-bit/44.1kHz minimum</li>
                  <li>• -6dB headroom minimum</li>
                  <li>• No limiting on master bus</li>
                </ul>
              </div>

              <div>
                <h4 className="font-medium mb-2">What to Include</h4>
                <ul className="text-gray-600 text-sm space-y-1">
                  <li>• Reference tracks you like</li>
                  <li>• Intended release format</li>
                  <li>• Any specific requests</li>
                  <li>• Project timeline</li>
                </ul>
              </div>

              <div>
                <h4 className="font-medium mb-2">Pricing</h4>
                <ul className="text-gray-600 text-sm space-y-1">
                  <li>• Single track: Starting at $75</li>
                  <li>• EP (3-6 tracks): Starting at $200</li>
                  <li>• Album: Starting at $400</li>
                  <li>• Rush delivery: +50%</li>
                </ul>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-gray-200">
              <p className="text-sm text-gray-600">
                All projects include up to 3 revisions and delivery in multiple formats (streaming, CD-ready,
                vinyl-ready as needed).
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact

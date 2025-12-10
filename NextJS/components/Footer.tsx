import { Instagram, Facebook, Mail } from "lucide-react"

const Footer = () => {
  return (
    <footer className="bg-black text-white py-12">
      <div className="container">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="mb-6 md:mb-0">
            <h3 className="text-xl font-bold">Messier Mastering</h3>
            <p className="text-white/70 mt-2">Professional Audio Mastering Services</p>
          </div>

          <div className="flex items-center space-x-6">
            <a
              href="https://www.instagram.com/messiermastering/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/70 hover:text-white transition-colors"
            >
              <Instagram size={20} />
            </a>
            <a
              href="https://www.facebook.com/MessierMastering"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/70 hover:text-white transition-colors"
            >
              <Facebook size={20} />
            </a>
            <a href="mailto:contact@messiermastering.com" className="text-white/70 hover:text-white transition-colors">
              <Mail size={20} />
            </a>
          </div>
        </div>

        <div className="border-t border-white/20 mt-8 pt-8 text-center">
          <p className="text-white/60 text-sm">© 2024 Messier Mastering. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer

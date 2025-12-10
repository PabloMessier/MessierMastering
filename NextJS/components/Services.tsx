import { Volume2, Wrench, Layers } from "lucide-react"

const Services = () => {
  const services = [
    {
      icon: <Volume2 size={48} />,
      title: "Audio Mastering",
      description: "The final step in music production. We optimize sound for best playback and determine the format or medium in the digital domain.",
      features: [
        "24-bit 44.1kHz & 16-bit WAV delivery",
        "Streaming platform optimization", 
        "CD replication ready files",
        "Quality control documentation",
        "Recall sheets for future reference",
      ],
    },
    {
      icon: <Wrench size={48} />,
      title: "Audio Repair & Restoration",
      description:
        "Remove imperfections like noise, hums, electrical interference, and artifacts from recordings. Also includes music digitization.",
      features: [
        "Background noise removal",
        "Electrical hum elimination",
        "Click and artifact repair",
        "Music digitization from old media",
        "Environmental noise reduction",
      ],
    },
    {
      icon: <Layers size={48} />,
      title: "Stem Mastering",
      description: "Offered when customers need more control due to spectrum issues or monitoring environment limitations.",
      features: [
        "Individual stem processing",
        "Frequency spectrum correction",
        "Monitoring translation assistance",
        "Enhanced mix control",
        "Consultation-based service",
      ],
    },
  ]

  return (
    <section id="services" className="bg-black text-white section-padding">
      <div className="container">
        <h2 className="text-4xl md:text-5xl font-light mb-16 text-center">
          Our <span className="font-bold">Services</span>
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div key={index} className="glass rounded-lg p-8 hover:bg-white/20 transition-all duration-300">
              <div className="text-white mb-6">{service.icon}</div>

              <h3 className="text-2xl font-semibold mb-4">{service.title}</h3>

              <p className="text-white/80 mb-6 leading-relaxed">{service.description}</p>

              <ul className="space-y-2">
                {service.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center text-white/70">
                    <span className="w-1.5 h-1.5 bg-white rounded-full mr-3"></span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Services

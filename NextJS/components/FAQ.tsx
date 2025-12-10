"use client"

import { useState } from "react"

const FAQ = () => {
  const [selectedIndex, setSelectedIndex] = useState<number>(0)

  const faqs = [
    {
      question: "What file formats do you accept?",
      answer:
        "We accept digital files only. Always bring finish mix, first generation mixes when possible. 24-bit .aiff or .wav files, or 16-bit 'red-book' CD. We work on the sampling rate that you send us - if possible, recording at 88.2 or 96 kHz will yield better results.",
    },
    {
      question: "Should I normalize my tracks before mastering?",
      answer:
        "NO, NO and NO. This will only have a negative effect on the fidelity of the project and will not help us in mastering in ANY way. You'll leave no headroom because normalize function will scale everything to 0dB.",
    },
    {
      question: "What is ideal headroom for mastering?",
      answer:
        "There's no magic number like -6dB. The headroom we're looking for has to do with the average level of the program (RMS), not just peak level. We want your peak-to-average level to reflect exactly what the music is. Feel free to send your levels where you see fit - the lower the levels up to standard operating point, the better the results.",
    },
    {
      question: "What do I get back from the mastering session?",
      answer:
        "At least two renders: one in 24-bit 44.1kHz .WAV file, and a 16-bit 44.1kHz .WAV file with limiter ceiling at -1.0dB (useful for CD replication and streaming aggregators). Plus additional documentation including recall sheet and QC document explaining any technical flaws or imperfections.",
    },
    {
      question: "Should I use processing on my master bus?",
      answer:
        "It depends on your experience. If you're experienced and know what you're looking for, go for it but always send two versions: one with no processing and one with your processing. If you have little experience, leave your stereo output clear to avoid side effects you might not hear properly.",
    },
    {
      question: "Do you offer stem mastering?",
      answer:
        "Yes, but I only offer stem mastering if the customer requests it or there are issues with monitoring. To me, stem mastering is a way to have more control when there are spectrum issues or when your monitoring environment lacks full frequency response.",
    },
    {
      question: "What about audio restoration?",
      answer:
        "This is a separate service from mastering. We can extract imperfections like noises, wind blowing, electrical hums, clicks, or artifacts from recordings. We also digitalize music from old mediums like tapes or records, which includes cleaning and possibly remastering.",
    },
    {
      question: "Should I arrange my project in sequence?",
      answer:
        "Yes, please specify the order of songs from the start. Leave some margin at the beginning and end of each song for potential fades. In general, leave the trimming and fading for the mastering session unless there's a tricky fade you specifically want to handle.",
    },
  ]

  return (
    <section id="faq" className="bg-black text-white section-padding">
      <div className="container">
        <h2 className="text-4xl md:text-5xl font-light mb-16 text-center">
          Frequently Asked <span className="font-bold">Questions</span>
        </h2>

        <div className="lg:grid lg:grid-cols-2 lg:gap-12 max-w-7xl mx-auto lg:items-start">
          {/* Questions List */}
          <div className="space-y-2">
            {faqs.map((faq, index) => (
              <button
                key={index}
                onClick={() => setSelectedIndex(index)}
                className={`w-full text-left p-4 transition-all duration-300 ${
                  selectedIndex === index 
                    ? "bg-white text-black" 
                    : "hover:bg-white/10 text-white"
                }`}
              >
                <h3 className="text-lg font-medium leading-relaxed">{faq.question}</h3>
              </button>
            ))}
          </div>

          {/* Answer Display - Desktop: stays at top aligned with first question */}
          <div className="hidden lg:block">
            <p className="text-white leading-relaxed text-lg p-4">
              {faqs[selectedIndex].answer}
            </p>
          </div>

          {/* Answer Display - Mobile (below questions) */}
          <div className="lg:hidden mt-8">
            <p className="text-white leading-relaxed text-lg">
              {faqs[selectedIndex].answer}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default FAQ

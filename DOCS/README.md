# Messier Mastering Website

Professional audio mastering services website with minimalistic design, comprehensive content, interactive audio examples, and advanced device detection functionality.

## Project Structure

```
MessierMastering/
├── index.html                 # Main website file (root)
├── README.md                  # Project documentation
│
├── CSS/                       # Stylesheets
│   ├── styles.css            # Main CSS file (enhanced with device detection)
│   ├── styles_minimalist.css # Backup of minimalistic styles
│   └── styles_original_backup.css # Original styles backup
│
├── JS/                        # JavaScript files
│   ├── script.js             # Main JavaScript file (with device detection & audio management)
│   ├── config.js             # Site configuration (dynamic file discovery)
│   ├── script_minimalist.js  # Backup of minimalistic script
│   └── script_original_backup.js # Original script backup
│
├── HTML/                      # HTML file versions
│   ├── index.html            # Current version
│   ├── index_minimalist.html # Minimalistic version
│   └── index_original_backup.html # Original backup
│
├── IMAGES/                    # All image assets
│   ├── logo.jpg              # Main logo (JPG format) - Primary logo file
│   ├── logo.png              # Logo (PNG format) - Backup
│   ├── studio.jpg            # Studio background image
│   ├── speaker-icon.jpg      # Audio mastering service icon
│   ├── stethoscope-icon.JPG  # Audio repair service icon
│   ├── fader-icon.JPG        # Stem mastering service icon
│   └── LOGOEXAMPLE.jpg       # Logo example
│
├── DOCS/                      # Documentation files (translated to English)
│   ├── HOME.docx             # Home page content
│   ├── SERVICES.docx         # Services documentation
│   ├── MASTERING Q&A.docx    # FAQ content
│   ├── What is audio Mastering.docx # Mastering explanation
│   ├── mastering benefits.docx # Benefits of mastering
│   └── Restauración y Reparación de Audio.docx # Audio restoration (Spanish)
│
├── audio/                     # Audio examples (dynamically discovered)
│   ├── EJEMPLOS DEL SERVICIO DE MASTERIZACION.docx # Mastering examples info
│   ├── Ejemplos de Restauración.docx # Restoration examples info
│   ├── Mastering-Examples/   # Mastering audio examples
│   │   ├── FRAGMENT-1-(FINAL-MIX).wav
│   │   ├── FRAGMENT-1-(MASTERED).wav
│   │   ├── FRAGMENT-1-(UN-MASTERED).wav
│   │   ├── FRAGMENT-2-(FINAL-MIX).wav
│   │   ├── FRAGMENT-2-(MASTERED).wav
│   │   ├── FRAGMENT-2-(UN-MASTERED).wav
│   │   └── [Additional fragments 3-5...]
│   └── Audio-Restoration-Examples/ # Audio restoration examples
│       ├── FRAGMENT01 (REPAIRED).wav
│       ├── FRAGMENT01 (UN-REPAIRED).wav
│       ├── FRAGMENT02 (REPAIRED).wav
│       └── FRAGMENT02 (UN-REPAIRED).wav
│
└── BACKUP/                    # Backup and archive folders
    ├── logos/                # Original logos folder
    ├── ORIGINAL/             # Original files
    ├── PoC/                  # Proof of concept files
    ├── TEST/                 # Test files
    └── .vscode/              # VS Code settings
```

## Features

### Design & User Experience
- **Minimalistic approach**: Clean, professional design with focus on content
- **Black header**: Professional dark header with enhanced navigation
- **Circular logo frames**: Professional hero logo (320px) and footer logo (70px) with layered shadows and hover effects
- **Enhanced service icons**: Clearly visible 80px circular icons for each service
- **Responsive layout**: Works perfectly on desktop, tablet, and mobile devices
- **Modern typography**: Inter font family with proper hierarchy
- **Professional hover effects**: Clean highlight-only hover states (no pop-up animations)

### Advanced Device Detection
- **Device Type Recognition**: Automatically detects mobile, tablet, and desktop devices
- **Touch Support Detection**: Identifies touch-capable devices for optimized interactions
- **Responsive Breakpoints**: Dynamic breakpoint detection (mobile-small, mobile, tablet, desktop)
- **Orientation Awareness**: Portrait/landscape detection with automatic updates
- **Performance Optimization**: Device-specific optimizations (audio preloading, touch events)

### Content & Information Architecture
- **Personal introduction**: Professional welcome message from Pablo Messier
- **Comprehensive services**: Detailed descriptions of all mastering services
- **Educational content**: Explains what mastering is and why it's important
- **Professional presentation**: Content organized and translated from .docx files
- **Interactive FAQ**: Comprehensive answers to common technical questions
- **Audio restoration**: Detailed explanation of repair and restoration services

### Interactive Audio Examples
- **Dynamic File Discovery**: Configuration-based system automatically discovers audio files
- **Professional Audio Management**: Only one audio plays at a time with automatic stop/reset
- **Mastering Examples**: Three-way comparisons (original, mastered, level-matched)
- **Restoration Examples**: Before/after demonstrations of noise removal
- **Educational Value**: Clear explanations of each audio process
- **Flexible File Structure**: Supports any filename format through config.js
- **Mobile Optimization**: Bandwidth-conscious loading on mobile devices
- **CORS-Free Operation**: Uses JavaScript configuration instead of JSON fetch

### Technical Implementation
- **Organized file structure**: Clean separation of concerns with dynamic configuration
- **Advanced JavaScript**: Device detection, audio management, config-based file discovery
- **Audio integration**: Native HTML5 audio players with professional management
- **Dynamic Configuration**: JavaScript-based config system for flexible file management
- **CORS Compatibility**: Works with file:// protocol for local development
- **Optimized performance**: Minimal CSS and JavaScript with smart loading
- **SEO friendly**: Proper meta tags and semantic HTML
- **Accessibility**: ARIA labels and keyboard navigation
- **CloudFront Integration**: CDN delivery with cache invalidation support

## Services Offered

1. **Audio Mastering**
   - Final step in music production chain
   - Digital format optimization (.mp3, .AAC, .WAV)
   - Multiple delivery formats with documentation
   - Level-matched examples for accurate comparison
   - Professional quality control and optimization

2. **Audio Repair & Restoration**
   - Comprehensive noise reduction and cleanup
   - Digitalization of old recordings
   - Stationary noise removal (hiss, hum, environmental)
   - Transient noise removal (clicks, pops)
   - Music restoration from various analog formats

3. **Stem Mastering**
   - Enhanced control for complex mixes
   - Monitoring environment compensation
   - Frequency spectrum optimization
   - Professional mixing meets mastering approach

## New Sections & Features

### Enhanced Audio Examples Section
- **Three-way Mastering Comparisons**: Original, mastered, and level-matched versions
- **Professional Audio Management**: Single playback system with auto-stop functionality
- **Restoration Demonstrations**: Clear before/after examples with technical explanations
- **Educational Approach**: Detailed explanations of each audio process

### Comprehensive FAQ Section
- **Technical Guidance**: Covers formats, headroom, sampling rates, bit depth
- **Professional Recommendations**: Expert advice on preparation and delivery
- **Industry Standards**: Clear guidelines for best mastering results
- **Problem Prevention**: Addresses common issues and misconceptions

### Enhanced About Section
- **Personal Connection**: Professional introduction from Pablo Messier
- **Historical Context**: Explanation of mastering evolution from analog to digital
- **Philosophy**: "Mixing Meets Mastering" approach explanation
- **Quality Focus**: Emphasis on professional standards and results

### Device-Specific Optimizations
- **Mobile Enhancements**: Touch-optimized controls, bandwidth management
- **Desktop Features**: Enhanced hover effects, mouse-specific interactions
- **Tablet Adaptations**: Optimized layouts for medium-screen devices
- **Cross-Platform Consistency**: Uniform experience across all devices

## Content Translation & Localization

All Spanish content from .docx files has been professionally translated to English:
- Audio restoration terminology and technical processes
- Service descriptions and methodologies
- FAQ responses and professional guidance
- Technical explanations and industry procedures

## Deployment & Infrastructure

### AWS S3 + CloudFront Setup
- **S3 Bucket**: `messiermastering.com`
- **CloudFront Distribution**: `E29W5AKLSEOXYL`
- **Domain**: https://messiermastering.com
- **SSL Certificate**: AWS Certificate Manager integration
- **Cache Management**: Automated invalidation for updates

### Performance Optimizations
- **CDN Delivery**: Global content delivery via CloudFront
- **Compression**: Gzip compression enabled
- **Caching Strategy**: Optimized cache policies for static assets
- **Mobile Optimization**: Device-specific loading strategies

## Browser Compatibility & Requirements

- **Modern Browsers**: Chrome, Firefox, Safari, Edge (latest versions)
- **HTML5 Audio**: Required for audio examples functionality
- **JavaScript**: Required for device detection and audio management
- **Mobile Responsive**: Optimized for iOS and Android devices
- **Progressive Enhancement**: Graceful degradation for older browsers

## Configuration System

### Dynamic File Discovery
The website uses a JavaScript-based configuration system for managing audio and video files:

#### config.js Structure
```javascript
const siteConfig = {
    "audio": {
        "Audio-Restoration-Examples": [
            "FRAGMENT01 (REPAIRED).wav",
            "FRAGMENT01 (UN-REPAIRED).wav",
            // ... additional files
        ],
        "Mastering-Examples": [
            "FRAGMENT-1-(FINAL-MIX).wav",
            "FRAGMENT-1-(MASTERED).wav",
            "FRAGMENT-1-(UN-MASTERED).wav",
            // ... additional fragments
        ]
    },
    "VIDEO": {
        "Collaboration": [...],
        "Mastering": [...],
        "Restoration": [...]
    }
}
```

#### Benefits of JavaScript Configuration
- **CORS Compatibility**: Works with file:// protocol for local development
- **Dynamic Discovery**: Automatically groups files by fragment and version
- **Flexible Naming**: Supports any filename format with regex parsing
- **Easy Maintenance**: Simple array-based file management
- **Browser Compatible**: No fetch() or server requirements

#### Audio File Naming Conventions
- **Mastering Files**: `FRAGMENT-N-(VERSION).wav`
  - Example: `FRAGMENT-1-(MASTERED).wav`
  - Versions: FINAL-MIX, MASTERED, UN-MASTERED
- **Restoration Files**: `FRAGMENTNN (VERSION).wav`
  - Example: `FRAGMENT01 (REPAIRED).wav`
  - Versions: REPAIRED, UN-REPAIRED

## Getting Started

1. **Local Development**: Open `index.html` in your web browser
2. **Asset Management**: All assets properly linked with relative paths
3. **Audio Examples**: Will play directly in browser with professional management
4. **Configuration**: Update `JS/config.js` when adding new audio/video files
5. **Device Testing**: Automatic device detection and optimization

## Audio File Requirements & Management

- **Format**: WAV files for best quality and compatibility
- **Browser Support**: HTML5 audio element with fallback support
- **File Paths**: Relative paths to audio folder structure
- **Dynamic Loading**: Files loaded via config.js configuration
- **Playback Management**: Single audio playback with automatic stop/reset
- **Mobile Optimization**: Bandwidth-conscious loading strategies
- **Accessibility**: Full audio controls for all users
- **Configuration Updates**: Simply update config.js when adding new files

## Development Features

### JavaScript Functionality
- **Configuration System**: Dynamic file discovery and management via config.js
- **Device Detection**: Comprehensive device and capability detection
- **Audio Management**: Professional single-playback audio system with regex parsing
- **Smooth Scrolling**: Enhanced navigation with header offset calculation
- **Responsive Breakpoints**: Dynamic breakpoint detection and management
- **Event Handling**: Optimized touch and mouse event management
- **File Parsing**: Intelligent filename parsing and grouping system

### CSS Architecture
- **Device-Specific Styles**: Targeted styles for different device types
- **Responsive Design**: Mobile-first approach with progressive enhancement
- **Professional Animations**: Subtle, performance-optimized transitions
- **Accessibility**: High contrast ratios and keyboard navigation support

## Deployment Process

The website is production-ready and deployed on AWS:

1. **S3 Upload**: Automated sync with exclusion of development files
2. **CloudFront Invalidation**: Cache clearing for immediate updates
3. **SSL/TLS**: Secure HTTPS delivery with AWS Certificate Manager
4. **Global CDN**: Worldwide content delivery optimization

## Quality Assurance

- **Cross-Device Testing**: Verified on mobile, tablet, and desktop
- **Audio Functionality**: Professional single-playback system tested
- **Performance Optimization**: Lighthouse scores optimized
- **Accessibility Compliance**: WCAG guidelines followed
- **SEO Optimization**: Meta tags and semantic HTML structure

---

*Professional audio mastering services - Listening Through a New Perspective*

**Pablo Messier - Messier Mastering**

**Live Website**: https://messiermastering.com

**Technical Stack**: HTML5, CSS3, JavaScript ES6, Dynamic Configuration System, AWS S3, CloudFront CDN

---

## Recent Updates

### Dynamic Configuration System (Latest)
- **JavaScript Configuration**: Replaced JSON fetch with embedded config.js for CORS compatibility
- **Intelligent File Parsing**: Automatic grouping of audio files by fragment and version
- **Flexible File Structure**: Support for various filename formats through regex parsing
- **Local Development**: Full functionality without requiring web server
- **Maintainable**: Easy to add new audio files by updating config.js array

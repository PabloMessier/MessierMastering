// Configuration is loaded from config.js

// Audio Player Management
function initializeAudioPlayers() {
    const audioElements = document.querySelectorAll('audio');
    let currentlyPlaying = null;
    
    audioElements.forEach(audio => {
        audio.addEventListener('play', function() {
            // If another audio is currently playing, pause it and reset
            if (currentlyPlaying && currentlyPlaying !== this) {
                currentlyPlaying.pause();
                currentlyPlaying.currentTime = 0;
            }
            // Set this audio as currently playing
            currentlyPlaying = this;
        });
        
        audio.addEventListener('pause', function() {
            // If this audio was paused, clear the currently playing reference
            if (currentlyPlaying === this) {
                currentlyPlaying = null;
            }
        });
        
        audio.addEventListener('ended', function() {
            // When audio ends, clear the currently playing reference
            if (currentlyPlaying === this) {
                currentlyPlaying = null;
            }
        });
    });
}

// Video Playlist Management
function initializeVideoPlaylist() {
    const mainPlayer = document.getElementById('main-player');
    const playlistContainer = document.getElementById('video-playlist');
    const videoLoading = document.getElementById('video-loading');
    
    if (!mainPlayer || !playlistContainer) return;
    
    if (!siteConfig) {
        console.error('❌ Site config not loaded for video playlist');
        return;
    }
    
    // Get video files from config
    const videoFiles = siteConfig.VIDEO['Collaboration'] || [];
    console.log('🔍 Collaboration videos from config:', videoFiles);
    
    // Function to extract artist and song from filename
    function parseVideoTitle(filename) {
        // Remove file extension and extra info
        let cleanName = filename.replace(/\.(mp4|avi|mov|mkv)$/i, '');
        cleanName = cleanName.replace(/\s*-\s*[^-]*\([^)]*\)$/i, ''); // Remove (1080p, h264, youtube) etc.
        cleanName = cleanName.replace(/\s*-\s*[A-Za-z\s]*$/i, ''); // Remove trailing channel names
        
        // Split by common separators
        const parts = cleanName.split(/\s*[-–—]\s*/);
        
        if (parts.length >= 2) {
            const artist = parts[0].trim();
            const song = parts[1].trim();
            return { artist, song, full: `${artist} - ${song}` };
        }
        
        return { artist: cleanName, song: '', full: cleanName };
    }
    
    // Function to generate video thumbnail
    function generateThumbnail(videoPath, callback) {
        const video = document.createElement('video');
        video.crossOrigin = 'anonymous';
        video.currentTime = 5; // Seek to 5 seconds
        
        video.addEventListener('loadeddata', function() {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            canvas.width = 320;
            canvas.height = 180;
            
            ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
            const thumbnailUrl = canvas.toDataURL('image/jpeg', 0.7);
            callback(thumbnailUrl);
        });
        
        video.addEventListener('error', function() {
            // Fallback to a default thumbnail
            callback('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIwIiBoZWlnaHQ9IjE4MCIgdmlld0JveD0iMCAwIDMyMCAxODAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMjAiIGhlaWdodD0iMTgwIiBmaWxsPSIjMjYyNjI2Ii8+Cjx0ZXh0IHg9IjE2MCIgeT0iOTAiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iI2ZmZiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZG9taW5hbnQtYmFzZWxpbmU9Im1pZGRsZSI+VmlkZW88L3RleHQ+Cjwvc3ZnPg==');
        });
        
        video.src = videoPath;
    }
    
    // Generate playlist items
    videoFiles.forEach((filename, index) => {
        const videoPath = `VIDEO/Collaboration/${filename}`;
        const videoInfo = parseVideoTitle(filename);
        const isActive = index === 0;
        
        const playlistItem = document.createElement('div');
        playlistItem.className = `playlist-item${isActive ? ' active' : ''}`;
        playlistItem.setAttribute('data-video-path', videoPath);
        
        playlistItem.innerHTML = `
            <div class="playlist-thumbnail">
                <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAiIGhlaWdodD0iNDUiIHZpZXdCb3g9IjAgMCA4MCA0NSIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjgwIiBoZWlnaHQ9IjQ1IiBmaWxsPSIjMjYyNjI2Ii8+Cjx0ZXh0IHg9IjQwIiB5PSIyMi41IiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTAiIGZpbGw9IiNmZmYiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGRvbWluYW50LWJhc2VsaW5lPSJtaWRkbGUiPlZpZGVvPC90ZXh0Pgo8L3N2Zz4K" alt="${videoInfo.artist}">
                <div class="play-icon">▶</div>
            </div>
            <div class="playlist-info">
                <h4>${videoInfo.full}</h4>
                <p>Mastered by Messier Mastering</p>
            </div>
        `;
        
        // Add click event listener with lazy loading
        playlistItem.addEventListener('click', function() {
            // Remove active class from all items
            document.querySelectorAll('.playlist-item').forEach(item => {
                item.classList.remove('active');
            });
            
            // Add active class to clicked item
            this.classList.add('active');
            
            // Show loading state
            if (videoLoading) {
                videoLoading.style.display = 'block';
                videoLoading.innerHTML = '<p>Loading video...</p>';
            }
            
            // Update main player source only when clicked (lazy loading)
            const videoPath = this.getAttribute('data-video-path');
            // Properly encode the video URL to handle special characters
            mainPlayer.src = encodeURI(videoPath);
            mainPlayer.preload = 'metadata'; // Only load metadata first
            mainPlayer.load();
            
            // Hide loading and auto-play video when ready
            mainPlayer.addEventListener('loadedmetadata', function() {
                if (videoLoading) {
                    videoLoading.style.display = 'none';
                }
                console.log('Video metadata loaded:', videoPath);
                
                // Auto-play the video after metadata is loaded
                this.play().catch(error => {
                    console.log('Auto-play prevented by browser:', error);
                });
            }, { once: true });
            
            // Handle loading errors
            mainPlayer.addEventListener('error', function(e) {
                if (videoLoading) {
                    videoLoading.innerHTML = '<p>Error loading video. Please try again.</p>';
                }
                console.error('Video load error:', e);
            }, { once: true });
            
            // Optional: Add fade effect
            mainPlayer.style.opacity = '0.5';
            setTimeout(() => {
                mainPlayer.style.opacity = '1';
            }, 300);
        });
        
        playlistContainer.appendChild(playlistItem);
        
        // Generate thumbnail asynchronously
        generateThumbnail(videoPath, (thumbnailUrl) => {
            const img = playlistItem.querySelector('.playlist-thumbnail img');
            img.src = thumbnailUrl;
        });
    });
}

// Mastering Video Playlist Management
function initializeMasteringPlaylist() {
    const masteringPlayer = document.getElementById('mastering-player');
    const playlistContainer = document.getElementById('mastering-playlist');
    
    if (!masteringPlayer || !playlistContainer) return;
    
    if (!siteConfig) {
        console.error('❌ Site config not loaded for mastering videos');
        return;
    }
    
    // Get mastering video files from config
    const masteringVideos = siteConfig.VIDEO['Mastering'] || [];
    console.log('🔍 Mastering videos from config:', masteringVideos);
    
    // Function to extract title from mastering filename
    function parseMasteringTitle(filename) {
        let cleanName = filename.replace(/\.(mp4|avi|mov|mkv)$/i, '');
        
        // Format different types of filenames
        if (cleanName.match(/^\d{4}-\d{2}-\d{2}$/)) {
            return { title: `Mastering Session ${cleanName}`, description: 'Studio Session Recording' };
        } else if (cleanName.toLowerCase().includes('pop')) {
            return { title: `Pop Music Mastering - ${cleanName.toUpperCase()}`, description: 'Pop Genre Mastering Example' };
        } else {
            return { title: cleanName, description: 'Mastering Process Example' };
        }
    }
    
    // Generate mastering playlist items
    masteringVideos.forEach((filename, index) => {
        const videoPath = `VIDEO/Mastering/${filename}`;
        const videoInfo = parseMasteringTitle(filename);
        const isActive = index === 0;
        
        const playlistItem = document.createElement('div');
        playlistItem.className = `playlist-item${isActive ? ' active' : ''}`;
        playlistItem.setAttribute('data-video-path', videoPath);
        
        playlistItem.innerHTML = `
            <div class="playlist-thumbnail">
                <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAiIGhlaWdodD0iNDUiIHZpZXdCb3g9IjAgMCA4MCA0NSIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjgwIiBoZWlnaHQ9IjQ1IiBmaWxsPSIjMjYyNjI2Ii8+Cjx0ZXh0IHg9IjQwIiB5PSIyMi41IiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTAiIGZpbGw9IiNmZmYiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGRvbWluYW50LWJhc2VsaW5lPSJtaWRkbGUiPlZpZGVvPC90ZXh0Pgo8L3N2Zz4K" alt="${videoInfo.title}">
                <div class="play-icon">▶</div>
            </div>
            <div class="playlist-info">
                <h4>${videoInfo.title}</h4>
                <p>${videoInfo.description}</p>
            </div>
        `;
        
        // Add click event listener
        playlistItem.addEventListener('click', function() {
            document.querySelectorAll('#mastering-playlist .playlist-item').forEach(item => {
                item.classList.remove('active');
            });
            
            this.classList.add('active');
            
            const videoPath = this.getAttribute('data-video-path');
            masteringPlayer.src = encodeURI(videoPath);
            masteringPlayer.preload = 'metadata'; // Only load metadata first
            masteringPlayer.load();
            
            // Auto-play the video after loading
            masteringPlayer.addEventListener('loadedmetadata', function() {
                this.play().catch(error => {
                    console.log('Auto-play prevented by browser:', error);
                });
            }, { once: true });
            
            console.log('Mastering video loaded:', videoPath);
            
            masteringPlayer.style.opacity = '0.5';
            setTimeout(() => {
                masteringPlayer.style.opacity = '1';
            }, 300);
        });
        
        playlistContainer.appendChild(playlistItem);
    });
    
    // Don't set default video - use lazy loading instead
    console.log('Mastering playlist initialized with lazy loading');
}

// Audio Restoration Video Playlist Management
function initializeRestorationPlaylist() {
    const restorationPlayer = document.getElementById('restoration-player');
    const playlistContainer = document.getElementById('restoration-playlist');
    
    if (!restorationPlayer || !playlistContainer) return;
    
    if (!siteConfig) {
        console.error('❌ Site config not loaded for restoration videos');
        return;
    }
    
    // Get restoration video files from config
    const restorationVideos = siteConfig.VIDEO['Restoration'] || [];
    console.log('🔍 Restoration videos from config:', restorationVideos);
    
    // Function to extract title from restoration filename
    function parseRestorationTitle(filename) {
        let cleanName = filename.replace(/\.(mp4|avi|mov|mkv)$/i, '');
        
        // Format restoration filenames
        if (cleanName.toLowerCase() === 'optometra') {
            return { title: 'Audio Restoration Example', description: 'Noise Reduction and Audio Enhancement' };
        } else {
            return { title: cleanName, description: 'Audio Restoration Process' };
        }
    }
    
    // Generate restoration playlist items
    restorationVideos.forEach((filename, index) => {
        const videoPath = `VIDEO/Restoration/${filename}`;
        const videoInfo = parseRestorationTitle(filename);
        const isActive = index === 0;
        
        const playlistItem = document.createElement('div');
        playlistItem.className = `playlist-item${isActive ? ' active' : ''}`;
        playlistItem.setAttribute('data-video-path', videoPath);
        
        playlistItem.innerHTML = `
            <div class="playlist-thumbnail">
                <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAiIGhlaWdodD0iNDUiIHZpZXdCb3g9IjAgMCA4MCA0NSIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjgwIiBoZWlnaHQ9IjQ1IiBmaWxsPSIjMjYyNjI2Ii8+Cjx0ZXh0IHg9IjQwIiB5PSIyMi41IiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTAiIGZpbGw9IiNmZmYiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGRvbWluYW50LWJhc2VsaW5lPSJtaWRkbGUiPlZpZGVvPC90ZXh0Pgo8L3N2Zz4K" alt="${videoInfo.title}">
                <div class="play-icon">▶</div>
            </div>
            <div class="playlist-info">
                <h4>${videoInfo.title}</h4>
                <p>${videoInfo.description}</p>
            </div>
        `;
        
        // Add click event listener
        playlistItem.addEventListener('click', function() {
            document.querySelectorAll('#restoration-playlist .playlist-item').forEach(item => {
                item.classList.remove('active');
            });
            
            this.classList.add('active');
            
            const videoPath = this.getAttribute('data-video-path');
            restorationPlayer.src = encodeURI(videoPath);
            restorationPlayer.preload = 'metadata'; // Only load metadata first
            restorationPlayer.load();
            
            // Auto-play the video after loading
            restorationPlayer.addEventListener('loadedmetadata', function() {
                this.play().catch(error => {
                    console.log('Auto-play prevented by browser:', error);
                });
            }, { once: true });
            
            console.log('Restoration video loaded:', videoPath);
            
            restorationPlayer.style.opacity = '0.5';
            setTimeout(() => {
                restorationPlayer.style.opacity = '1';
            }, 300);
        });
        
        playlistContainer.appendChild(playlistItem);
    });
    
    // Don't set default video - use lazy loading instead
    console.log('Restoration playlist initialized with lazy loading');
}

// Audio Examples Management
function initializeMasteringAudioPlaylist() {
    console.log('🔍 Starting initializeMasteringAudioPlaylist...');
    console.log('🔍 Site config status:', siteConfig ? 'LOADED' : 'NOT LOADED');
    console.log('🔍 Site config object:', siteConfig);
    
    if (!siteConfig) {
        console.error('❌ Site config not loaded');
        return;
    }
    
    const audioPlayer = document.getElementById('mastering-audio-player');
    const playlistContainer = document.getElementById('mastering-audio-playlist');
    const trackTitle = document.getElementById('mastering-track-title');
    const trackType = document.getElementById('mastering-track-type');
    
    console.log('🔍 Elements found:', {
        audioPlayer: !!audioPlayer,
        playlistContainer: !!playlistContainer,
        trackTitle: !!trackTitle,
        trackType: !!trackType
    });
    
    if (!audioPlayer || !playlistContainer) {
        console.error('❌ Mastering audio elements not found');
        return;
    }
    
    // Get mastering files from config
    console.log('🔍 Site config audio section:', siteConfig.audio);
    const masteringFiles = siteConfig.audio['Mastering-Examples'] || [];
    console.log('🔍 Mastering files from config:', masteringFiles);
    console.log('🔍 Number of mastering files:', masteringFiles.length);
    
    // Parse and group files by fragment
    const fragmentGroups = {};
    const versionTypes = {
        'FINAL-MIX': { label: 'Final Mix', description: 'Original unprocessed mix' },
        'MASTERED': { label: 'Mastered', description: 'Professionally mastered version' },
        'UN-MASTERED': { label: 'Level Matched', description: 'Level matched to mastered version' }
    };
    
    masteringFiles.forEach(filename => {
        // Extract fragment number and version from filename
        // Handle both formats: FRAGMENT-1-(FINAL-MIX).wav and FRAGMENT-1 -(UN-MASTERED).wav
        const match = filename.match(/FRAGMENT-(\d+)\s*-?\s*\(([^)]+)\)/);
        if (match) {
            const fragmentNum = match[1];
            const versionType = match[2];
            
            console.log(`🔍 Parsed: ${filename} → Fragment ${fragmentNum}, Version ${versionType}`);
            
            if (!fragmentGroups[fragmentNum]) {
                fragmentGroups[fragmentNum] = {};
            }
            
            fragmentGroups[fragmentNum][versionType] = filename;
        } else {
            console.warn(`⚠️  Could not parse filename: ${filename}`);
        }
    });
    
    console.log('🔍 Fragment groups:', fragmentGroups);
    
    // Create playlist items for each fragment group
    Object.keys(fragmentGroups).sort().forEach(fragmentNum => {
        const fragmentData = fragmentGroups[fragmentNum];
        console.log(`🔍 Creating item for FRAGMENT ${fragmentNum}:`, fragmentData);
        
        const playlistItem = document.createElement('div');
        playlistItem.className = 'audio-playlist-item';
        
        // Create buttons for available versions
        const buttons = Object.keys(fragmentData).map(versionKey => {
            const versionInfo = versionTypes[versionKey];
            if (versionInfo) {
                return `
                    <button class="version-button" 
                            data-filename="${fragmentData[versionKey]}"
                            data-label="${versionInfo.label}"
                            data-description="${versionInfo.description}">
                        ${versionInfo.label}
                    </button>
                `;
            }
            return '';
        }).filter(button => button !== '').join('');
        
        playlistItem.innerHTML = `
            <h4>FRAGMENT #${fragmentNum}</h4>
            <p>Click on a version below to play</p>
            <div class="version-buttons">
                ${buttons}
            </div>
        `;
        
        // Add click event listeners to version buttons
        const versionButtons = playlistItem.querySelectorAll('.version-button');
        console.log(`🔍 Adding ${versionButtons.length} button listeners for FRAGMENT ${fragmentNum}`);
        
        versionButtons.forEach((button, buttonIndex) => {
            console.log(`🔍 Setting up button ${buttonIndex} for FRAGMENT ${fragmentNum}`);
            button.addEventListener('click', function(e) {
                e.stopPropagation();
                
                const filename = this.getAttribute('data-filename');
                const label = this.getAttribute('data-label');
                const description = this.getAttribute('data-description');
                
                console.log('🎵 Mastering button clicked:', filename);
                
                // Remove active class from all items and buttons
                document.querySelectorAll('#mastering-audio-playlist .audio-playlist-item').forEach(item => {
                    item.classList.remove('active');
                });
                document.querySelectorAll('#mastering-audio-playlist .version-button').forEach(btn => {
                    btn.classList.remove('active');
                });
                
                // Add active class to current item and button
                playlistItem.classList.add('active');
                this.classList.add('active');
                
                // Create audio path using actual filename
                const audioPath = `audio/Mastering-Examples/${filename}`;
                console.log('🎵 Loading audio path:', audioPath);
                
                // Add error handling for the main audio player
                audioPlayer.addEventListener('loadstart', function() {
                    console.log('✅ Main player load started for:', audioPath);
                }, { once: true });
                
                audioPlayer.addEventListener('canplay', function() {
                    console.log('✅ Main player can play:', audioPath);
                }, { once: true });
                
                audioPlayer.addEventListener('error', function(e) {
                    console.error('❌ Main player load error for', audioPath, ':', e);
                    console.error('❌ Error details:', {
                        code: e.target.error ? e.target.error.code : 'unknown',
                        message: e.target.error ? e.target.error.message : 'unknown error'
                    });
                }, { once: true });
                
                audioPlayer.src = audioPath;
                audioPlayer.load();
                
                trackTitle.textContent = `FRAGMENT #${fragmentNum} - ${label}`;
                trackType.textContent = description;
                
                // Try to play automatically (may be blocked by browser)
                audioPlayer.play().catch(error => {
                    console.log('Auto-play prevented by browser. Click play button to start:', error);
                });
            });
        });
        
        playlistContainer.appendChild(playlistItem);
    });
    
    // Set default track info
    trackTitle.textContent = "Select a track from the playlist";
    trackType.textContent = "Choose a version to play";
    
    console.log('Mastering audio playlist initialized with', Object.keys(fragmentGroups).length, 'fragments');
}

function initializeRestorationAudioPlaylist() {
    console.log('🔍 Starting initializeRestorationAudioPlaylist...');
    
    if (!siteConfig) {
        console.error('❌ Site config not loaded');
        return;
    }
    
    const audioPlayer = document.getElementById('restoration-audio-player');
    const playlistContainer = document.getElementById('restoration-audio-playlist');
    const trackTitle = document.getElementById('restoration-track-title');
    const trackType = document.getElementById('restoration-track-type');
    
    if (!audioPlayer || !playlistContainer) {
        console.error('❌ Restoration audio elements not found');
        return;
    }
    
    // Get restoration files from config
    const restorationFiles = siteConfig.audio['Audio-Restoration-Examples'] || [];
    console.log('🔍 Restoration files from config:', restorationFiles);
    
    // Parse and group files by fragment
    const fragmentGroups = {};
    const versionTypes = {
        'UN-REPAIRED': { label: 'Before Restoration', description: 'Original damaged audio' },
        'REPAIRED': { label: 'After Restoration', description: 'Professionally restored audio' }
    };
    
    const fragmentDescriptions = {
        'FRAGMENT01': { 
            title: 'Example 1 - Stationary Noise Removal', 
            detail: 'Stationary noise refers to noise that doesn\'t change - hiss, hum, and environmental tones.' 
        },
        'FRAGMENT02': { 
            title: 'Example 2 - Transient Noise Removal', 
            detail: 'Transient noise means \'it\'s here and then it\'s gone\' - pops or clicks.' 
        }
    };
    
    restorationFiles.forEach(filename => {
        console.log(`🔍 Attempting to parse restoration filename: "${filename}"`);
        
        // Extract fragment name and version from filename
        const match = filename.match(/^(FRAGMENT\d+)\s*\(([^)]+)\)/);
        console.log(`🔍 Regex match result:`, match);
        
        if (match) {
            const fragmentName = match[1];
            const versionType = match[2];
            
            console.log(`🔍 Parsed restoration: ${filename} → Fragment ${fragmentName}, Version ${versionType}`);
            
            if (!fragmentGroups[fragmentName]) {
                fragmentGroups[fragmentName] = {};
            }
            
            fragmentGroups[fragmentName][versionType] = filename;
        } else {
            console.warn(`⚠️  Could not parse restoration filename: ${filename}`);
            console.warn(`⚠️  Expected format: FRAGMENT##(VERSION) but got: "${filename}"`);
        }
    });
    
    console.log('🔍 Restoration fragment groups:', fragmentGroups);
    
    // Create playlist items for each fragment group
    Object.keys(fragmentGroups).sort().forEach(fragmentName => {
        const fragmentData = fragmentGroups[fragmentName];
        const fragmentInfo = fragmentDescriptions[fragmentName] || { 
            title: `${fragmentName} Restoration`, 
            detail: 'Audio restoration example' 
        };
        
        console.log(`🔍 Creating restoration item for ${fragmentName}:`, fragmentData);
        
        const playlistItem = document.createElement('div');
        playlistItem.className = 'audio-playlist-item';
        
        // Create buttons for available versions
        const buttons = Object.keys(fragmentData).map(versionKey => {
            const versionInfo = versionTypes[versionKey];
            if (versionInfo) {
                return `
                    <button class="version-button" 
                            data-filename="${fragmentData[versionKey]}"
                            data-label="${versionInfo.label}"
                            data-description="${versionInfo.description}">
                        ${versionInfo.label}
                    </button>
                `;
            }
            return '';
        }).filter(button => button !== '').join('');
        
        playlistItem.innerHTML = `
            <h4>${fragmentInfo.title}</h4>
            <p>${fragmentInfo.detail}</p>
            <div class="version-buttons">
                ${buttons}
            </div>
        `;
        
        // Add click event listeners to version buttons
        const versionButtons = playlistItem.querySelectorAll('.version-button');
        console.log(`🔍 Adding ${versionButtons.length} button listeners for ${fragmentName}`);
        
        versionButtons.forEach((button, buttonIndex) => {
            console.log(`🔍 Setting up button ${buttonIndex} for ${fragmentName}`);
            button.addEventListener('click', function(e) {
                e.stopPropagation();
                
                const filename = this.getAttribute('data-filename');
                const label = this.getAttribute('data-label');
                const description = this.getAttribute('data-description');
                
                console.log('🔧 Restoration button clicked:', filename);
                
                // Remove active class from all items and buttons
                document.querySelectorAll('#restoration-audio-playlist .audio-playlist-item').forEach(item => {
                    item.classList.remove('active');
                });
                document.querySelectorAll('#restoration-audio-playlist .version-button').forEach(btn => {
                    btn.classList.remove('active');
                });
                
                // Add active class to current item and button
                playlistItem.classList.add('active');
                this.classList.add('active');
                
                // Create audio path using actual filename
                const audioPath = `audio/Audio-Restoration-Examples/${filename}`;
                console.log('🔧 Loading restoration audio path:', audioPath);
                
                // Add error handling
                audioPlayer.addEventListener('error', function(e) {
                    console.error('❌ Restoration audio load error for', audioPath, ':', e);
                }, { once: true });
                
                audioPlayer.src = audioPath;
                audioPlayer.load();
                
                trackTitle.textContent = `${fragmentInfo.title} - ${label}`;
                trackType.textContent = description;
                
                // Try to play automatically (may be blocked by browser)
                audioPlayer.play().catch(error => {
                    console.log('Auto-play prevented by browser. Click play button to start:', error);
                });
            });
        });
        
        playlistContainer.appendChild(playlistItem);
    });
    
    // Set default track info
    trackTitle.textContent = "Select a track from the playlist";
    trackType.textContent = "Choose a version to play";
    
    console.log('Restoration audio playlist initialized with', Object.keys(fragmentGroups).length, 'fragments');
}

// Device Detection
function detectDevice() {
    const userAgent = navigator.userAgent.toLowerCase();
    const isMobile = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent);
    const isTablet = /ipad|android(?!.*mobile)|tablet/i.test(userAgent);
    const isDesktop = !isMobile && !isTablet;
    
    // Add classes to body for CSS targeting
    document.body.classList.add(isMobile ? 'mobile-device' : 'desktop-device');
    if (isTablet) document.body.classList.add('tablet-device');
    
    // Store device info globally
    window.deviceInfo = {
        isMobile: isMobile,
        isTablet: isTablet,
        isDesktop: isDesktop,
        userAgent: userAgent,
        screenWidth: window.innerWidth,
        screenHeight: window.innerHeight,
        touchSupport: 'ontouchstart' in window || navigator.maxTouchPoints > 0
    };
    
    console.log('Device detected:', window.deviceInfo);
    return window.deviceInfo;
}

// Touch and Mouse Event Handling
function initializeDeviceSpecificEvents() {
    const device = window.deviceInfo;
    
    if (device.isMobile || device.touchSupport) {
        // Mobile-specific functionality
        document.body.classList.add('touch-device');
        
        // Optimize touch interactions
        document.addEventListener('touchstart', function() {}, { passive: true });
        
        // Mobile-specific audio player handling
        const audioElements = document.querySelectorAll('audio');
        audioElements.forEach(audio => {
            audio.preload = 'none'; // Save bandwidth on mobile
        });
        
    } else {
        // Desktop-specific functionality
        document.body.classList.add('mouse-device');
        
        // Desktop-specific hover effects
        const hoverElements = document.querySelectorAll('.service, .example-category, .faq-item');
        hoverElements.forEach(element => {
            element.addEventListener('mouseenter', function() {
                this.classList.add('hover-active');
            });
            element.addEventListener('mouseleave', function() {
                this.classList.remove('hover-active');
            });
        });
    }
}

// Responsive Breakpoint Detection
function detectBreakpoint() {
    const width = window.innerWidth;
    let breakpoint = 'desktop';
    
    if (width <= 480) {
        breakpoint = 'mobile-small';
    } else if (width <= 768) {
        breakpoint = 'mobile';
    } else if (width <= 1024) {
        breakpoint = 'tablet';
    } else {
        breakpoint = 'desktop';
    }
    
    document.body.setAttribute('data-breakpoint', breakpoint);
    window.currentBreakpoint = breakpoint;
    
    return breakpoint;
}

// Orientation Detection
function detectOrientation() {
    const orientation = window.innerHeight > window.innerWidth ? 'portrait' : 'landscape';
    document.body.setAttribute('data-orientation', orientation);
    window.currentOrientation = orientation;
    
    return orientation;
}

// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM Content Loaded - Starting initialization...');
    console.log('✅ Config loaded from config.js:', siteConfig);
    
    // Check if audio elements exist
    console.log('Mastering audio player:', document.getElementById('mastering-audio-player'));
    console.log('Mastering playlist container:', document.getElementById('mastering-audio-playlist'));
    console.log('Restoration audio player:', document.getElementById('restoration-audio-player'));
    console.log('Restoration playlist container:', document.getElementById('restoration-audio-playlist'));
    
    // Initialize device detection
    detectDevice();
    detectBreakpoint();
    detectOrientation();
    initializeDeviceSpecificEvents();
    
    // Initialize audio player management
    initializeAudioPlayers();
    
    // Initialize video playlists
    initializeVideoPlaylist();
    initializeMasteringPlaylist();
    initializeRestorationPlaylist();
    
    // Initialize audio examples playlists with a slight delay to ensure DOM is ready
    console.log('Initializing audio playlists...');
    setTimeout(() => {
        console.log('About to initialize mastering audio playlist...');
        initializeMasteringAudioPlaylist();
        console.log('About to initialize restoration audio playlist...');
        initializeRestorationAudioPlaylist();
        console.log('Audio playlists initialization completed');
    }, 100);
    
    // Navigation link highlighting
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');
    
    // Update active navigation link based on scroll position
    function updateActiveNavLink() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }
    
    // Listen for scroll events
    window.addEventListener('scroll', updateActiveNavLink);
    
    // Mobile menu toggle (basic implementation)
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('.nav');
    
    if (menuToggle && nav) {
        menuToggle.addEventListener('click', function() {
            nav.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });
    }
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            
            if (target) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = target.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Header background opacity on scroll - maintain consistent dark black
    const header = document.querySelector('.header');
    
    function updateHeaderOpacity() {
        // Keep consistent dark black color regardless of scroll position
        header.style.background = 'rgba(0, 0, 0, 0.98)';
    }
    
    window.addEventListener('scroll', updateHeaderOpacity);
    
    // Window resize and orientation change listeners
    window.addEventListener('resize', function() {
        detectBreakpoint();
        detectOrientation();
        
        // Update device info on resize
        window.deviceInfo.screenWidth = window.innerWidth;
        window.deviceInfo.screenHeight = window.innerHeight;
    });
    
    window.addEventListener('orientationchange', function() {
        setTimeout(() => {
            detectBreakpoint();
            detectOrientation();
        }, 100);
    });
    
    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll('.service, .benefit, .content-block');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    // Initialize
    updateActiveNavLink();
    updateHeaderOpacity();
});

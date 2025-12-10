#!/bin/bash

echo "Performance Testing Script for Messier Mastering"
echo "================================================="
echo ""

# Function to test a specific page version
test_version() {
    local version_name=$1
    local page_file=$2
    local config_file=$3
    
    echo "Testing: $version_name"
    echo "------------------------"
    
    # Backup current files
    cp app/page.tsx app/page.tsx.backup 2>/dev/null
    cp next.config.js next.config.js.backup 2>/dev/null
    
    # Apply test configuration
    cp $page_file app/page.tsx
    if [ ! -z "$config_file" ]; then
        cp $config_file next.config.js
    fi
    
    # Clean build
    rm -rf .next out
    
    # Build the project
    echo "Building..."
    npm run build > build.log 2>&1
    
    # Check build size
    echo "Build size:"
    du -sh out/ 2>/dev/null || echo "Build output not found"
    
    # Get chunk sizes
    echo ""
    echo "JavaScript chunks:"
    find out/_next/static -name "*.js" -type f -exec du -h {} \; | sort -hr | head -10
    
    echo ""
    echo "------------------------"
    echo ""
}

# Option 1: Test current version
echo "1. CURRENT VERSION (No optimization)"
test_version "Current" "app/page.tsx.backup" ""

# Option 2: Test with basic lazy loading
echo "2. BASIC LAZY LOADING"
test_version "Basic Lazy" "app/page-optimized.tsx" ""

# Option 3: Test with viewport lazy loading
echo "3. VIEWPORT-BASED LAZY LOADING"
test_version "Viewport Lazy" "app/page-viewport-lazy.tsx" ""

# Option 4: Test with optimized config
echo "4. VIEWPORT LAZY + OPTIMIZED CONFIG"
test_version "Full Optimization" "app/page-viewport-lazy.tsx" "next.config.optimized.js"

# Restore original files
echo "Restoring original files..."
cp app/page.tsx.backup app/page.tsx 2>/dev/null
cp next.config.js.backup next.config.js 2>/dev/null
rm app/page.tsx.backup 2>/dev/null
rm next.config.js.backup 2>/dev/null

echo ""
echo "Testing complete!"
echo ""
echo "Recommendations:"
echo "1. Use page-viewport-lazy.tsx for best initial load performance"
echo "2. Consider using the optimized config for better caching on S3"
echo "3. Monitor real-world performance with Lighthouse after deployment"

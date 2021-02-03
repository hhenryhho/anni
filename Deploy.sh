#!/bin/sh

# Make sure we're current
#git pull

# Build out the website
cd website
vue-cli-service build

# Add CNAME to build
cd dist
echo "whois.timmytimj.com" > CNAME

# Copy index.html to 404.html
# This allows for Vue Routing on Github Pages
cp index.html 404.html

# Reset Directory to Root
cd ../../ # curr: website/dist

# Push The New Build
#git add -A
#git commit -m "Production Website Build."
#git push

# Split The Build To Github Pages Branch
#Egit subtree split --prefix website/dist -b gh-pages

# Push branch to publish, delete local branch
#git push -f origin gh-pages
#git branch -D gh-pages

# Pixel Art Creator

An interactive pixel art creation tool that lets you draw, save, and download pixel art.

## Features

- Create pixel art on customizable canvas sizes (16×16, 32×32, 64×64)
- Choose any color using the color picker
- Save your creations to a gallery (stored in local storage)
- Download your pixel art as PNG images
- Responsive design works on desktop and mobile devices

## How to Deploy to Netlify

1. Make sure you have Node.js installed

2. Install Netlify CLI:
   ```
   npm install -g netlify-cli
   ```

3. Initialize Git in this directory:
   ```
   git init
   git add .
   git commit -m "Initial commit"
   ```

4. Deploy to Netlify:
   ```
   netlify deploy
   ```

5. Follow the command prompts:
   - Choose to create a new site
   - Select your team
   - Set the deploy path to the current directory (.)

6. Check the preview URL to make sure everything looks good

7. Deploy to production:
   ```
   netlify deploy --prod
   ```

8. Your site is now live at the URL Netlify provides!

## Customization

- Edit `style.css` to change the appearance
- Modify `index.html` to add new features or UI elements
- Update `script.js` to enhance functionality

## License

Free to use for personal and commercial projects. 
# Publish The Savory Bar to GitHub Pages

This project is a Vite + React site. GitHub Pages must build it before publishing.
The repository already contains `.github/workflows/deploy.yml` for that build/deploy process.

## 1. Add the old food images

Copy the images from the old repository into:

`public/images/`

Required by the current gallery:

- wrap.jpg
- burger.jpg
- sandwich.jpg
- rolls.jpg
- patis.jpg
- foods.jpg
- platter.jpg
- platterbox.jpg

The other old images can also stay in that folder.

## 2. Test locally

```bash
npm install
npm run dev
```

Before publishing, verify the production build:

```bash
npm run build
```

## 3. Create a new GitHub repository

Create a new empty public repository. Do not initialize it with another README or .gitignore.

## 4. Push from the VS Code terminal

```bash
git init
git add .
git commit -m "Initial Savory Bar React website"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPOSITORY.git
git push -u origin main
```

## 5. Enable GitHub Pages

In the GitHub repository:

Settings -> Pages -> Build and deployment -> Source -> GitHub Actions

The included workflow will install dependencies, run the Vite build, upload `dist`, and deploy it.

## 6. Future updates

```bash
git add .
git commit -m "Update website"
git push
```

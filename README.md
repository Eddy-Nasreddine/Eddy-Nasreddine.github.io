# Eddy — portfolio

Plain HTML, CSS and a little JavaScript. No framework, no build step, nothing to install.

```
index.html     your info: tagline, skills, about, contact links
projects.js    every project, as one list  ← the file you'll edit most
styles.css     the look (colors and sizes are at the top)
script.js      draws the star map, tabs and project panel (no need to touch)
images/        project images, one folder per project: images/<project-id>/
resume.pdf     add your resume here (the Resume button links to it)
```

## Preview it

Double-click `index.html` to open it in your browser. Refresh after you make an edit.

## Projects

All projects live in `projects.js`. The file starts with a short guide to every field.

- **Add a project:** copy the TEMPLATE at the bottom of `projects.js`, paste it into the `PROJECTS` list, and fill it in. Put its images in `images/<id>/`.
- **Edit a project:** change its fields.
- **Remove a project:** delete its `{ ... },` block.
- **Reorder projects:** move the blocks. The first one opens by default.

Only `id` and `title` are required. Anything you leave out or empty, such as specs, images or links, simply doesn't appear, so the same template works for a software project and a hardware build.

An image without a `src` shows as a placeholder box with its caption. That's how the telescope project looks until you add photos.

Each project also gets a star on the map in the header. Stars are placed automatically. Add `map: { x: 40, y: 30 }` (percent across, percent down) to a project to place its star yourself.

You can link straight to a project: `yoursite.com/#project-telescope`.

## Filling in the placeholders

Search the project for `[` to find every placeholder, e.g. `[email]`, `[username]`, `[language]`. The spots to change in `index.html` are also marked with `<!-- EDIT -->` comments.

## Publishing on GitHub Pages (free)

1. Create a GitHub repository. Name it `<your-username>.github.io` if you want the site at `https://<your-username>.github.io`.
2. Upload these files to the repository.
3. In the repository, go to **Settings → Pages**. Under **Build and deployment**, choose **Deploy from a branch**, pick `main` and `/ (root)`, then save.
4. After a minute or two, the site is live at the address shown on that page.

From then on, every change you push to `main` updates the site.

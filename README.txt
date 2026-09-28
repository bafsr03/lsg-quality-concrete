BouldHQ workspace for: L.S.G-Quality-Concrete

This folder is where the BouldHQ agent looks for everything related to
this store. Two things should live here once it's fully set up:

  1. The Shopify theme export — drag in the entire `theme_export__*` 
     folder you downloaded from Shopify (or pulled with `shopify theme
     pull`). It must be a git checkout (have a `.git` directory) and
     pushed to a GitHub repo connected to this Shopify store via the
     Shopify "Themes from GitHub" integration. Pushes to `main` deploy.

  2. Whatever else you work on for the store — design files, 3D models,
     reference images, screenshots, voice memos. The agent reads these
     as context but never modifies them.

When a request comes in:

  - BouldHQ regenerates `.bouldhq/` here with the request body + the
    team's notes about this store. Do not edit those files.
  - The agent finds the most recent `theme_export__*/` and works in it.
  - If you want to override the agent's instructions for this store,
    edit the `CLAUDE.md` at the root of this folder.

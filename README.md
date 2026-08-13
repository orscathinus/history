# The History of the World

An interactive digital museum of world history, built as a static site for GitHub Pages.

## Version 1.1.2

Version 1.1 expands the original museum into a page-based experience with 11 historical and thematic sectors and 29 dedicated exhibit galleries.

Highlights include richer sector landing pages, interactive exhibit timelines and story lenses, a “Meanwhile in the World” feature, a searchable/filterable directory, a broader master timeline, historical image galleries with source links, and responsive/reduced-motion support.

Version 1.1.2 fixes the dedicated exhibit renderer, adds a validation workflow, and cache-busts exhibit assets so corrected gallery JavaScript is fetched immediately.

The site remains dependency-free and data-driven: `data.js` holds the collection, while `exhibit.js` and `sector.js` render reusable dedicated pages.

Deployment note: v1.1.2 gallery assets were rebuilt after renderer validation passed.

# Vitalis Pharmacy Website

A static, multi-page pharmacy website for Vitalis Pharmacy in Gaborone.

## Pages

- `index.html` — pharmacy overview
- `shop.html` — over-the-counter products and basket
- `prescriptions.html` — prescription request information and form
- `services.html` — pharmacy services and wellness tools
- `contact.html` — contact details and opening hours

## Run locally

Serve this directory with any static web server. For example:

```powershell
python -m http.server 8000
```

Then open `http://localhost:8000`.

## GitHub Pages

The GitHub Actions workflow in `.github/workflows/pages.yml` publishes this
directory to GitHub Pages whenever changes are pushed to `main`.
The published site is available at
<https://trevor896.github.io/vitalis-pharmacy/>.

The full Iconify JSON library is kept in the development workspace. This
repository includes only `logos.json`, the collection used by the website, to
keep the published repository and Pages artifact small. Lucide SVGs used by
the site are included locally under `assets/lucide-icons/icons`.

The prescription form is a front-end demonstration. It does not transmit
prescription files or patient details to the pharmacy.

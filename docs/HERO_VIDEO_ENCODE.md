# Hero Video Compression

Current file: `public/hero.mp4` (~8.1 MB)

Re-encode before production deploy to reduce load time on desktop.

## Recommended command (ffmpeg)

```bash
ffmpeg -i public/hero.mp4 \
  -vf "scale=1280:-2" \
  -c:v libx264 \
  -preset slow \
  -crf 28 \
  -movflags +faststart \
  -an \
  public/hero-optimized.mp4
```

Then replace:

```bash
mv public/hero-optimized.mp4 public/hero.mp4
```

Target: under **2 MB** while keeping acceptable visual quality for a background hero.

## Optional WebM fallback

```bash
ffmpeg -i public/hero.mp4 \
  -vf "scale=1280:-2" \
  -c:v libvpx-vp9 \
  -crf 35 \
  -b:v 0 \
  -an \
  public/hero.webm
```

Add a second `<source src="/hero.webm" type="video/webm" />` in `Hero.jsx` if WebM is generated.

## Notes

- Video is disabled on mobile / save-data / slow networks (poster only).
- Desktop uses `preload="metadata"` to avoid full eager download when possible.
- Always keep `public/hero-poster.png` as LCP fallback.

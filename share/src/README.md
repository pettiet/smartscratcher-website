# Share image sources

Each `.html` here renders to the same-named `.png` one folder up (1200×630 for Facebook/X,
`-ig` = 1080×1080 for Instagram). Fonts come from Google Fonts, same as the site. Render with
headless Chrome:

    CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
    "$CHROME" --headless=new --disable-gpu --hide-scrollbars --virtual-time-budget=15000 \
      --window-size=1200,830 --screenshot=../android-launch.png "file://$PWD/android-launch.html"

Use `--window-size=1080,1280` for the `-ig` files. Headless Chrome deducts ~84px of window chrome from
the height, so render taller and crop to 1200×630 or 1080×1080 with PIL.

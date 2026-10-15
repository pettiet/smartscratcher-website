# SmartScratcher for Android — social captions

Two posts: a teaser while the app is in Google's review queue, and the launch post
the day it is approved. Images live in `share/` (sources in `share/src/`):

- Teaser: `android-coming-soon.png` (FB/X, 1200×630) · `android-coming-soon-ig.png` (IG, 1080×1080)
- Launch day: `android-launch.png` (FB/X, 1200×630) · `android-launch-ig.png` (IG, 1080×1080)

Facebook gets the link in the post body. Instagram doesn't link from captions — put the
article URL in the bio link and say "link in bio."

House rules that apply here as everywhere: no "hot", "cold", "due", or "lucky"; never
promise winning; 17 states (not 15); never shorten the name.

---

## 0 · Teaser — post now, while Android 1.0 is in review

Article: https://www.smartscratcherapp.com/articles/android-coming-soon.html

**Facebook**
> Android friends: we hear you. 🤖
>
> The SmartScratcher Android app is finished, tested, and sitting in Google's review queue right now. Same 17 states, same games, same prize counts every morning, same free tier as the iPhone app.
>
> We're not going to guess at a date, because the last step is Google's, not ours. The day it's approved, we'll post it right here.
>
> Where things stand: https://www.smartscratcherapp.com/articles/android-coming-soon.html
>
> In the meantime, every game in all 17 states is free to look up on the website, on any phone.

**Instagram**
> Android. Almost. 🤖
>
> The Android app is built, tested, and in Google's review queue right now. Same 17 states, same games, same numbers every morning as the iPhone app.
>
> No date guesses from us, because the last step is Google's. The day it's approved, you'll see it here first.
>
> Which phone are you on? 👇 Full update at the link in bio.
>
> #scratchoff #scratchers #lottery #scratchofftickets #smartscratcher #android #googleplay #comingsoon

---

## 1 · Launch day — "Android. It's here."

Article: https://www.smartscratcherapp.com/articles/android-launch.html
Play link: https://play.google.com/store/apps/details?id=com.gamingdatasolutions.smartscratcher

**Facebook**
> It's here. SmartScratcher is on Google Play. 🤖🎉
>
> Same app as iPhone: every active scratch-off in 17 states, with how many prizes are left at every level, pulled fresh from each lottery every morning. Free to download. Premium adds the SmartScratcher Score, rankings, and daily deep dives, with a 3-day free trial.
>
> Get it: https://play.google.com/store/apps/details?id=com.gamingdatasolutions.smartscratcher
> The full story: https://www.smartscratcherapp.com/articles/android-launch.html
>
> If you've been reading our posts on an Android phone for months, thank you for your patience. Go pick your state.

**Instagram**
> Android. It's here. 🤖🎉
>
> SmartScratcher is on Google Play today. Same 17 states, same games, same prize counts every morning as the iPhone app. Free to download, and Premium comes with a 3-day free trial.
>
> Tag the Android friend who kept asking. 👇 Link in bio.
>
> #scratchoff #scratchers #lottery #scratchofftickets #smartscratcher #android #googleplay #nowavailable

---

## Launch-day checklist (website side)

Everything below is already written and waiting; it is a flip, not a build.

1. `articles/android-launch.html`: replace the `LAUNCH_DATE` token in the hero meta with the real date.
2. `blog-index.html`: uncomment the "Android. It's here." card (it sits above the teaser card) and fill in its date.
3. `articles/android-coming-soon.html`: uncomment the `update-banner` at the top so the teaser points at the launch post.
4. Homepage (`index.html`): replace the two "Android coming soon" lines with the Play button and add "or Google Play" to the pricing/FAQ lines that only mention the App Store.
5. Backend (`ScratchSmart` repo): set `PLAY_URL` and bump `TEMPLATE_CHANGED` in `generate_site.py`, deploy, re-run the publish. The generated pages then carry the Play button.
6. One push to origin/main, then post the launch captions above.

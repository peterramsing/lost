# Browser Support

- LostGrid relies on [`calc()`](https://developer.mozilla.org/en-US/docs/Web/CSS/calc) to create the grid. Thus, LostGrid is limited to browsers that support `calc()`. The great thing is that `calc()` is widely supported in all current browsers and the LostGrid usage of `calc()` is supported as far back as IE9+.
- **If using LostGrid in flexbox mode** browser support is limited to IE 10+.
- [Calc browser support](http://caniuse.com/#feat=calc)
- [Flexbox browser support](http://caniuse.com/#feat=flexbox)

### Official Support
- LostGrid is tested in the following browsers for compatibility
  - IE10+ (IE9 has the same `calc()` support as IE10 except for background position which LostGrid doesn't affect)
  - Evergreen Browsers (as they update automatically, tests are performed on the latest version of the following browsers)
    - Chrome
      - Chrome Canary + Chromium as well
    - Opera
    - Firefox
      - FirefoxDeveloperEdition as well
    - Edge
  - Safari 9+
- Automated browser testing with Selenium is coming soon. 👍

Note: LostGrid no longer supports Node 0.10 and 0.12. I'll be following the Node LTS plan for Node. Let me know if you any questions. Thanks!

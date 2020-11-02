const puppeteer = require('puppeteer');

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

async function screenshot(url, imageUrl, name) {
  const browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox']});
  const page = await browser.newPage();
  await page.setViewport({
    width: 1920,
    height: 3000,
  });

  await page.goto(url);

  await sleep(1000);

  await page.evaluate((imageUrl, name) => {
    // remove card actions
    const copyButton = document.querySelector('.card-actions');
    copyButton.remove();

    // add wrapper around the card
    const card = document.querySelector('.snippet-card');
    card.style.maxWidth = '800px';
    card.style.zIndex = '8';

    // move logo to inside the card
    const logo = document.querySelector('.nav-website-logo');
    logo.style.position = 'absolute';
    logo.style.top = '32px';
    logo.style.right = '24px';
    card.prepend(logo);

    const { width: cardWidth, height: cardHeight } = card.getBoundingClientRect();

    const wrapperSize = Math.max(cardWidth, cardHeight, 900);

    const wrapper = document.createElement('div');
    card.parentNode.insertBefore(wrapper, card);
    wrapper.appendChild(card);

    wrapper.id = 'custom-card';
    wrapper.style.display = 'flex';
    wrapper.style.alignItems = 'center';
    wrapper.style.justifyContent = 'center';
    wrapper.style.width = `${wrapperSize}px`;
    wrapper.style.height = `${wrapperSize}px`;
    wrapper.style.padding = '40px 20px';
    wrapper.style.position = 'relative';

    wrapper.style.background = `url("${imageUrl}")`;
    wrapper.style.backgroundSize = 'cover';

    const photoBy = document.createElement('span');
    photoBy.innerText = `Background photo by ${name}`;

    photoBy.style.position = 'absolute';
    photoBy.style.bottom = '16px';
    photoBy.style.right = '16px';
    photoBy.style.fontStyle = 'italic';
    photoBy.style.weight = '400';
    photoBy.style.color = 'rgba(255, 255, 255, 0.85)';
    photoBy.style.fontSize = '1rem';
    photoBy.style.letterSpace = '0.5px';
    photoBy.style.textShadow = '0 4px 12px rgba(0,0,0,.14)';
    photoBy.style.zIndex = '3';

    wrapper.append(photoBy);

    const codeBy = document.createElement('span');
    codeBy.innerText = `Code by 30secondsofcode.org`;

    codeBy.style.position = 'absolute';
    codeBy.style.bottom = '16px';
    codeBy.style.left = '16px';
    codeBy.style.fontStyle = 'italic';
    codeBy.style.weight = '400';
    codeBy.style.color = 'rgba(255, 255, 255, 0.85)';
    codeBy.style.fontSize = '1rem';
    codeBy.style.letterSpace = '0.5px';
    codeBy.style.textShadow = '0 4px 12px rgba(0,0,0,.14)';
    codeBy.style.zIndex = '3';

    wrapper.append(codeBy);

    const backGradient = document.createElement('div');

    backGradient.style.position = 'absolute';
    backGradient.style.bottom = '0';
    backGradient.style.left = '0';
    backGradient.style.width = '100%';
    backGradient.style.height = '80px';
    backGradient.style.background = 'linear-gradient(180deg, transparent, rgba(0,0,0,0.5))';

    wrapper.append(backGradient);
  }, imageUrl, name);

  await sleep(5000);

  const element = await page.$('#custom-card');
  await element.screenshot({ path: `snippet.png` });

  await sleep(3000);

  await browser.close();
}

module.exports = screenshot;

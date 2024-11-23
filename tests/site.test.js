const puppeteer = require('puppeteer');
const path = require('path');

(async () => {
  // Launch Puppeteer browser instance
  const browser = await puppeteer.launch({
    headless: 'new', // Ensures compatibility with Puppeteer >= v20
    args: ['--no-sandbox', '--disable-setuid-sandbox'], // Essential for CI environments
  });

  const page = await browser.newPage();

  // --- Test 1: Sign In Button ---
  try {
    const filePath = `file://${path.resolve('C:\\paytm_clone\\paytm1.html')}`;
    await page.goto(filePath);

    const signInButtonSelector = '.right_button .button_text';

    // Wait for and click the button
    await page.waitForSelector(signInButtonSelector);
    await page.click(signInButtonSelector);

    console.log('Test 1: Sign In button clicked successfully.');
  } catch (error) {
    console.error('Test 1: Sign In button test failed.', error);
  }

  // --- Test 2: Verify Heading and Description ---
  try {
    const filePath = `file://${__dirname}/../paytm1.html`; // Adjust the path
    await page.goto(filePath);

    console.log("HTML file loaded successfully.");

    const headingSelector = '.sec1_first h1'; // Selector for the heading
    const descriptionSelector = '.sec1_first div:nth-child(3)'; // Selector for the description

    await page.waitForSelector(headingSelector);
    const headingText = await page.$eval(headingSelector, el => el.textContent.trim());

    await page.waitForSelector(descriptionSelector);
    const descriptionText = await page.$eval(descriptionSelector, el => el.textContent.trim());

    console.log('Heading found:', headingText);
    console.log('Description found:', descriptionText);

    if (
      headingText.includes("India's Most-loved Payments App") &&
      descriptionText.length > 0
    ) {
      console.log('Test 2: Heading and description verified successfully.');
    } else {
      throw new Error('Test 2: Heading or description verification failed.');
    }
  } catch (error) {
    console.error('Test 2: Heading and description test failed.', error);
  }

  // --- Test 3: Verify Investor Relations and Career Links ---
  try {
    const filePath = `file://${__dirname}/../paytm1.html`; // Adjust path
    await page.goto(filePath);

    const stripe1Selector = '.stripe1';
    await page.waitForSelector(stripe1Selector);

    const investorText = await page.$eval(
      '.stripe1_c1 h5',
      el => el.textContent.trim()
    );

    const careerText = await page.$eval(
      '.stripe1_c2 h5',
      el => el.textContent.trim()
    );

    console.log('Investor Relations text:', investorText);
    console.log('Career @ Paytm text:', careerText);

    if (
      investorText.includes('Investor relations') &&
      careerText.includes('Career @ Paytm')
    ) {
      console.log('Test 3: Stripe links verified successfully.');
    } else {
      throw new Error('Test 3: Stripe links text mismatch.');
    }
  } catch (error) {
    console.error('Test 3: Stripe links test failed.', error);
  }

  // --- Test 4: Verify Wallet, UPI, Bank, Passbook Icons ---
  try {
    const walletIconsSelector = '.sec2_tab .sec2_flex div';
    const walletIcons = await page.$$eval(walletIconsSelector, elements =>
      elements.map(el => el.textContent.trim())
    );

    console.log('Wallet Icons:', walletIcons);

    const expectedWalletIcons = [
      'Paytm Wallet',
      'UPI Money Transfer',
      'Bank',
      'Passbook',
    ];

    if (JSON.stringify(walletIcons) === JSON.stringify(expectedWalletIcons)) {
      console.log('Test 4: Wallet icons verified successfully.');
    } else {
      throw new Error('Test 4: Wallet icons mismatch.');
    }
  } catch (error) {
    console.error('Test 4: Wallet icons test failed.', error);
  }

  // Close the browser
  await browser.close();
})();

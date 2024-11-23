const puppeteer = require('puppeteer');
const path = require('path');
const os = require('os');

(async () => {
  // Determine file path dynamically based on the operating system
  const isWindows = os.platform() === 'win32';
  const filePath = isWindows
    ? `file://${path.resolve('C:\\paytm_clone\\paytm1.html')}` // Windows path
    : `file://${path.resolve(__dirname, '../paytm1.html')}`; // Linux/CI path

  // Launch Puppeteer browser instance
  const browser = await puppeteer.launch({
    headless: 'new', // Ensures compatibility with Puppeteer >= v20
    args: ['--no-sandbox', '--disable-setuid-sandbox'], // Essential for CI environments
  });

  const page = await browser.newPage();

  try {
    console.log('Opening the Paytm clone page...');
    await page.goto(filePath);

    // Test 1: Verify "Sign In" button
    const signInButtonSelector = '.right_button .button_text';
    await page.waitForSelector(signInButtonSelector);
    await page.click(signInButtonSelector);
    console.log('Test 1: Sign In button clicked successfully.');

    // Test 2: Verify heading and description
    const headingSelector = '.sec1_first h1';
    const descriptionSelector = '.sec1_first div:nth-child(3)';
    await page.waitForSelector(headingSelector);
    const headingText = await page.$eval(headingSelector, el => el.textContent.trim());
    console.log('Heading found:', headingText);

    await page.waitForSelector(descriptionSelector);
    const descriptionText = await page.$eval(descriptionSelector, el => el.textContent.trim());
    console.log('Description found:', descriptionText);

    if (
      headingText.includes("India's Most-loved Payments App") &&
      descriptionText.length > 0
    ) {
      console.log('Test 2: Heading and description verified successfully.');
    } else {
      throw new Error('Test 2 failed: Heading or description mismatch.');
    }

    // Test 3: Verify "Investor Relations" and "Career @ Paytm" links
    const stripe1Selector = '.stripe1';
    await page.waitForSelector(stripe1Selector);

    const investorText = await page.$eval(
      '.stripe1_c1 h5',
      el => el.textContent.trim()
    );
    console.log('Investor Relations text:', investorText);

    const careerText = await page.$eval(
      '.stripe1_c2 h5',
      el => el.textContent.trim()
    );
    console.log('Career @ Paytm text:', careerText);

    if (
      investorText.includes('Investor relations') &&
      careerText.includes('Career @ Paytm')
    ) {
      console.log('Test 3: Stripe links verified successfully.');
    } else {
      throw new Error('Test 3 failed: Stripe links text mismatch.');
    }

    // Test 4: Verify "Pay or Transfer Money" heading
    const transferMoneyHeadingSelector = 'div[style*="relative"] h4';
    await page.waitForSelector(transferMoneyHeadingSelector);

    const transferHeadingText = await page.$eval(
      transferMoneyHeadingSelector,
      el => el.textContent.trim()
    );
    console.log('Transfer Money heading:', transferHeadingText);

    if (transferHeadingText === 'PAY OR TRANSFER MONEY') {
      console.log('Test 4: Transfer money heading verified successfully.');
    } else {
      throw new Error('Test 4 failed: Transfer money heading mismatch.');
    }

    // Test 5: Verify Wallet, UPI, Bank, Passbook Icons
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
      console.log('Test 5: Wallet icons verified successfully.');
    } else {
      throw new Error('Test 5 failed: Wallet icons mismatch.');
    }

  } catch (error) {
    console.error('Error during test execution:', error);
  } finally {
    await browser.close();
  }
})();

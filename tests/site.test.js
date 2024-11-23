const puppeteer = require('puppeteer');
const path = require('path');

(async () => {
    // Launch the browser
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();

    // Load the Paytm clone page
    const filePath = `file://${path.resolve('C:\\paytm_clone\\paytm1.html')}`;
    await page.goto(filePath);

    try {
        const signInButtonSelector = '.right_button .button_text'; 

        // Wait for the button to be available
        await page.waitForSelector(signInButtonSelector);

        // Click the button
        await page.click(signInButtonSelector);

        console.log('Sign In button clicked successfully.');
    } catch (error) {
        console.error('Error: Sign In button test failed.', error);
    }

    // Close the browser
    await browser.close();
})();


(async () => {
  // Launch a Puppeteer browser instance
  const browser = await puppeteer.launch({ headless: true }); // Set headless: false to see the browser
  const page = await browser.newPage();

  try {
      // Open your HTML file (use `file://` path for local files)
      const filePath = `file://${__dirname}/../paytm1.html`; // Adjust path as needed
      await page.goto(filePath);

      console.log("HTML file loaded successfully.");

      // --- Test: Verify Heading and Description ---
      const headingSelector = '.sec1_first h1'; // Selector for the heading
      const descriptionSelector = '.sec1_first div:nth-child(3)'; // Selector for the description

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
          console.log('Heading and description are verified successfully.');
      } else {
          throw new Error('Heading or description verification failed.');
      }
  } catch (error) {
      console.error('Error during test execution:', error);
  } finally {
      // Close the browser
      await browser.close();
  }
})();




(async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  try {
    // Open the local HTML file
    const filePath = `file://${__dirname}/../paytm1.html`; // Adjust the path if needed
    await page.goto(filePath);

    console.log("HTML file loaded successfully.");

    // --- Test 1: Verify 'Investor Relations' and 'Career @ Paytm' Links ---
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
      console.log('Test 1: Stripe links verified successfully.');
    } else {
      throw new Error('Test 1 failed: Stripe links text does not match.');
    }

    // --- Test 2: Verify 'Pay or Transfer Money' Heading ---
    const transferMoneyHeadingSelector = 'div[style*="relative"] h4';
    await page.waitForSelector(transferMoneyHeadingSelector);

    const transferHeadingText = await page.$eval(
      transferMoneyHeadingSelector,
      el => el.textContent.trim()
    );
    console.log('Transfer Money heading:', transferHeadingText);

    if (transferHeadingText === 'PAY OR TRANSFER MONEY') {
      console.log('Test 2: Transfer money heading verified successfully.');
    } else {
      throw new Error('Test 2 failed: Transfer money heading mismatch.');
    }

    // --- Test 3: Verify Wallet, UPI, Bank, Passbook Icons ---
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
      console.log('Test 3: Wallet icons verified successfully.');
    } else {
      throw new Error('Test 3 failed: Wallet icons mismatch.');
    }



  } catch (error) {
    console.error('Error during test execution:', error);
  } finally {
    // Close the browser
    await browser.close();
  }
})();

# Tennis Arbitrage Finder

A simple yet powerful web tool designed to automatically find arbitrage betting opportunities in tennis matches across various Australian bookmakers. This tool uses a serverless back-end to securely handle API requests and a clean, responsive front-end to display the results.
<div align="center">
<img src="https://github.com/arronmong/sports_arb/blob/main/Demo%20Screenshot.jpg?raw=true" width="400">
</div>

## Disclaimer

This is strictly a technical proof of concept and not financial advice, hence the creator of this tool is not responsible for any financial losses incurred. This tool is not intended to be used in an actual gambling/betting setting and therefore the tool will **not** be available online publicly. Arbitrage opportunities are rare and can disappear quickly. Odds data may have delays or inaccuracies. 


## Features

-   **Automated Arbitrage Detection:** Automatically scans and calculates arbitrage opportunities where a guaranteed profit can be made.
-   **Secure API Key Management:** Your private API key is stored securely in an environment variable on the back-end, never exposed to the front-end.
-   **Dynamic Data Fetching:** Fetches a list of active tennis tournaments and their corresponding match odds in real-time.
-   **Interactive Profit Calculator:** For each opportunity found, a calculator is provided to see how to distribute a stake to guarantee a return.
-   **Clean & Responsive UI:** A simple, mobile-friendly interface built with Tailwind CSS.

## How It Works

This tool performs **Bookmaker Arbitrage** (also known as "Dutching"). It does not use "Lay" bets, which are found on betting exchanges. The strategy is as follows:

1.  **Fetch Odds:** The tool fetches head-to-head (H2H) match odds for two players from multiple bookmakers.
2.  **Find Best Odds:** It identifies the highest available "Back" odds for Player A to win and the highest available "Back" odds for Player B to win, even if they are on different betting sites.
3.  **Calculate Margin:** It calculates the implied probability margin using the formula:
    `Margin = (1 / Player_A_Odds) + (1 / Player_B_Odds)`
4.  **Identify Opportunity:** If the calculated `Margin` is less than 1, it represents a risk-free arbitrage opportunity. The tool then displays this opportunity, along with the percentage of guaranteed profit.

## Tech Stack

-   **Front-End:** HTML, Tailwind CSS, Vanilla JavaScript (ES Modules)
-   **Back-End:** Node.js Serverless Function
-   **API:** [The Odds API](https://the-odds-api.com/) for sports betting odds.
-   **Deployment:** [Vercel](https://vercel.com/)

-   ## Setup and Local Development

To run this project on your local machine, follow these steps:

1.  **Clone the Repository:**
    ```bash
    git clone [https://github.com/your-username/your-repo-name.git](https://github.com/your-username/your-repo-name.git)
    cd your-repo-name
    ```

2.  **Install Node.js:**
    If you don't have it, download and install the LTS version of [Node.js](https://nodejs.org/).

3.  **Install Vercel CLI:**
    The Vercel Command Line Interface is used to run the serverless function locally.
    ```bash
    npm install -g vercel
    ```

4.  **Create Environment File:**
    Create a file named `.env` in the root of the project and add your API key:
    ```
    ODDS_API_KEY="your_secret_api_key_goes_here"
    ```
    *(This file is included in `.gitignore` and will not be uploaded to GitHub).*

5.  **Run the Development Server:**
    ```bash
    vercel dev
    ```
    The application will now be running on a local server, typically `http://localhost:3000`.

## Deployment

This project is configured for easy, free deployment on Vercel.

1.  **Push to GitHub:**
    Make sure your project is pushed to a GitHub repository.

2.  **Import to Vercel:**
    -   Sign up for a free account on [vercel.com](https://vercel.com) with your GitHub profile.
    -   On your dashboard, click "Add New..." -> "Project".
    -   Import your project's GitHub repository.

3.  **Configure Environment Variables:**
    -   In the project configuration screen, expand the "Environment Variables" section.
    -   Add your secret API key:
        -   **Name:** `ODDS_API_KEY`
        -   **Value:** `your_secret_api_key_goes_here`

4.  **Deploy:**
    -   Click the "Deploy" button. Vercel will build and host your site, providing you with a public URL.



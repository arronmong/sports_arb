// This is a serverless function for Vercel
// It acts as a secure proxy between your front-end and The Odds API.
// It reads the API key from an environment variable named ODDS_API_KEY.

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight OPTIONS request
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Only allow GET requests for this API
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  // Retrieve the API key securely from environment variables.
  const apiKey = process.env.ODDS_API_KEY;

  if (!apiKey) {
    return res.status(500).json({ 
      message: 'Server configuration error: API key not set.' 
    });
  }

  // Extract query parameters
  const { endpoint, sport } = req.query;

  let apiUrl = '';
  const API_BASE_URL = 'https://api.the-odds-api.com/v4';

  // Construct the correct Odds API URL based on the request from the front-end.
  if (endpoint === 'sports') {
    apiUrl = `${API_BASE_URL}/sports/?apiKey=${apiKey}`;
  } else if (endpoint === 'odds' && sport) {
    apiUrl = `${API_BASE_URL}/sports/${sport}/odds/?apiKey=${apiKey}&regions=au&markets=h2h&oddsFormat=decimal`;
  } else {
    return res.status(400).json({ 
      message: 'Invalid request. Please specify a valid endpoint and sport (if needed).' 
    });
  }

  try {
    console.log(`Fetching data from: ${apiUrl.replace(apiKey, '[HIDDEN]')}`);
    
    // Securely fetch data from The Odds API using the hidden key.
    const response = await fetch(apiUrl);
    const data = await response.json();

    if (!response.ok) {
      console.error('Odds API error:', data);
      return res.status(response.status).json(data);
    }

    console.log(`Successfully fetched data. Records: ${Array.isArray(data) ? data.length : 'N/A'}`);
    
    // Send the successful response from The Odds API back to the front-end.
    return res.status(200).json(data);

  } catch (error) {
    console.error('Proxy error:', error);
    return res.status(500).json({ 
      message: `An error occurred: ${error.message}` 
    });
  }
}
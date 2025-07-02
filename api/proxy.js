// This is a serverless function, designed to run on platforms like Vercel or Netlify.
// It acts as a secure proxy between your front-end and The Odds API.
// It reads the API key from an environment variable named ODDS_API_KEY.

// The handler function is the main entry point.
// `event` contains information about the incoming request (like query parameters).
export default async function handler(event) {
  // Retrieve the API key securely from environment variables.
  // This will be loaded from your .env file during local development.
  const apiKey = process.env.ODDS_API_KEY;

  if (!apiKey) {
    // This error will show if the environment variable is not set correctly.
    return new Response(
      JSON.stringify({ message: 'Server configuration error: API key not set.' }),
      { 
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }

  // Use the URL search parameters to determine what the front-end is asking for.
  const searchParams = new URL(event.url).searchParams;
  const endpoint = searchParams.get('endpoint'); // 'sports' or 'odds'
  const sportKey = searchParams.get('sport');   // e.g., 'tennis_atp_wimbledon'

  let apiUrl = '';
  const API_BASE_URL = 'https://api.the-odds-api.com/v4';

  // Construct the correct Odds API URL based on the request from the front-end.
  if (endpoint === 'sports') {
    apiUrl = `${API_BASE_URL}/sports/?apiKey=${apiKey}`;
  } else if (endpoint === 'odds' && sportKey) {
    apiUrl = `${API_BASE_URL}/sports/${sportKey}/odds/?apiKey=${apiKey}&regions=au&markets=h2h&oddsFormat=decimal`;
  } else {
    // If the request from the front-end is invalid, return an error.
    return new Response(
      JSON.stringify({ message: 'Invalid request. Please specify a valid endpoint.' }),
      { 
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }

  try {
    // Securely fetch data from The Odds API using the hidden key.
    const response = await fetch(apiUrl);
    const data = await response.json();

    if (!response.ok) {
        // If The Odds API returns an error, pass it back to the front-end.
        return new Response(JSON.stringify(data), { status: response.status, headers: { 'Content-Type': 'application/json' } });
    }

    // Send the successful response from The Odds API back to the front-end.
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        // Allows your front-end (even on localhost) to call this API function.
        'Access-Control-Allow-Origin': '*' 
      }
    });

  } catch (error) {
    // Handle network errors or other issues with the fetch call.
    return new Response(
      JSON.stringify({ message: `An error occurred: ${error.message}` }),
      { 
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
}

import axios from 'axios';

const GOOGLE_MAPS_API_KEY = process.env.GOOGLE_MAPS_API_KEY; // Use an environment variable for the API key

export default async (req, res) => {
  if (req.method === 'POST') {
    const { latitude, longitude } = req.body;

    try {
      const response = await axios.get(`https://maps.googleapis.com/maps/api/place/nearbysearch/json`, {
        params: {
          location: `${latitude},${longitude}`,
          radius: 5000, // 5km radius
          type: 'health',
          keyword: 'counselor|clinic|therapist',
          key: GOOGLE_MAPS_API_KEY,
        },
      });

      const places = response.data.results.map(place => place.name).join(', ');

      res.status(200).json({ message: `Here are some places near you: ${places}` });
    } catch (error) {
      console.error('Error fetching places:', error);
      res.status(500).json({ message: 'Failed to fetch places.' });
    }
  } else {
    res.status(405).end(); // Method Not Allowed
  }
};

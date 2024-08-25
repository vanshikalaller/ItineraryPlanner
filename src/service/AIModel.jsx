import { GoogleGenerativeAI } from "@google/generative-ai";
  
  const apiKey = import.meta.env.VITE_GOOGLE_GEMINI_AI_API_KEY;
  const genAI = new GoogleGenerativeAI(apiKey);
  
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
  });
  
  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: "application/json",
  };
  

   export const chatSession = model.startChat({
      generationConfig,
  
      history: [
        {
          role: "user",
          parts: [
            {text: "Generate Travel Plan for Location : Las Vegas, for 3 Days for Couple with a Cheap budget, Give me a Hotels options list with HotelName, Hotel address, Price, hotel image url, geo coordinates, rating, description and suggest itineary with placeName, Place Details, Place image url, Geo coordinates, ticket Pricing, Time travel each of the location for 3 days with each day plan with best time to visit in JSON format.\n"},
          ],
        },
        {
          role: "model",
          parts: [
            {text: "```json\n{\n  \"hotels\": [\n    {\n      \"hotelName\": \"The D Las Vegas\",\n      \"hotelAddress\": \"301 Fremont Street, Las Vegas, NV 89101\",\n      \"price\": \"$50-$100 per night\",\n      \"hotelImageUrl\": \"https://www.theD.com/images/hotel/hero.jpg\",\n      \"geoCoordinates\": \"36.1699° N, 115.1424° W\",\n      \"rating\": \"3.5 stars\",\n      \"description\": \"A budget-friendly hotel located in the heart of Fremont Street Experience, offering a vibrant atmosphere, casino, and dining options.\"\n    },\n    {\n      \"hotelName\": \"Golden Nugget Las Vegas\",\n      \"hotelAddress\": \"129 E Fremont St, Las Vegas, NV 89101\",\n      \"price\": \"$75-$150 per night\",\n      \"hotelImageUrl\": \"https://www.goldennugget.com/las-vegas/images/hotel/hero.jpg\",\n      \"geoCoordinates\": \"36.1696° N, 115.1409° W\",\n      \"rating\": \"4 stars\",\n      \"description\": \"A historic hotel with a lively casino, pool, and several dining options, known for its famous shark tank.\"\n    },\n    {\n      \"hotelName\": \"The Orleans Hotel & Casino\",\n      \"hotelAddress\": \"4500 W Tropicana Ave, Las Vegas, NV 89103\",\n      \"price\": \"$60-$120 per night\",\n      \"hotelImageUrl\": \"https://www.orleanscasino.com/images/hotel/hero.jpg\",\n      \"geoCoordinates\": \"36.0996° N, 115.1685° W\",\n      \"rating\": \"3.5 stars\",\n      \"description\": \"A large resort with multiple pools, a casino, and various dining options, offering a relaxing and affordable stay.\"\n    },\n    {\n      \"hotelName\": \"Circus Circus Hotel & Casino\",\n      \"hotelAddress\": \"2880 S Las Vegas Blvd, Las Vegas, NV 89109\",\n      \"price\": \"$40-$80 per night\",\n      \"hotelImageUrl\": \"https://www.circuscircus.com/images/hotel/hero.jpg\",\n      \"geoCoordinates\": \"36.0986° N, 115.1744° W\",\n      \"rating\": \"3 stars\",\n      \"description\": \"A classic hotel known for its circus theme, budget-friendly rooms, and entertainment options like the Adventuredome.\"\n    }\n  ],\n  \"itinerary\": {\n    \"day1\": {\n      \"bestTimeToVisit\": \"Morning\",\n      \"plan\": [\n        {\n          \"placeName\": \"Fremont Street Experience\",\n          \"placeDetails\": \"A pedestrian mall with a vibrant atmosphere, featuring live music, street performers, and a canopy of LED lights.\",\n          \"placeImageUrl\": \"https://www.fremontstreetexperience.com/media/images/home-carousel-01.jpg\",\n          \"geoCoordinates\": \"36.1696° N, 115.1427° W\",\n          \"ticketPricing\": \"Free\",\n          \"timeTravel\": \"2 hours\"\n        },\n        {\n          \"placeName\": \"The Neon Museum\",\n          \"placeDetails\": \"A museum showcasing vintage neon signs from Las Vegas's past.\",\n          \"placeImageUrl\": \"https://www.neonmuseum.org/sites/default/files/styles/hero_image/public/2021-07/neon-museum-hero-image-2021.jpg?itok=bU22f1lM\",\n          \"geoCoordinates\": \"36.1676° N, 115.1390° W\",\n          \"ticketPricing\": \"$20-$30 per person\",\n          \"timeTravel\": \"1.5 hours\"\n        },\n        {\n          \"placeName\": \"Mob Museum\",\n          \"placeDetails\": \"A museum dedicated to the history of organized crime in Las Vegas.\",\n          \"placeImageUrl\": \"https://www.themobmuseum.org/media/images/homepage/hero-image.jpg\",\n          \"geoCoordinates\": \"36.1699° N, 115.1453° W\",\n          \"ticketPricing\": \"$25-$35 per person\",\n          \"timeTravel\": \"2 hours\"\n        }\n      ]\n    },\n    \"day2\": {\n      \"bestTimeToVisit\": \"Afternoon\",\n      \"plan\": [\n        {\n          \"placeName\": \"Hoover Dam\",\n          \"placeDetails\": \"A historic dam on the Colorado River, offering scenic views and tours.\",\n          \"placeImageUrl\": \"https://www.nps.gov/hoov/learn/nature/images/hoover-dam-from-black-canyon-highway.jpg\",\n          \"geoCoordinates\": \"36.0201° N, 114.9385° W\",\n          \"ticketPricing\": \"Free for the dam itself, tours are additional\",\n          \"timeTravel\": \"3 hours (including travel time)\"\n        },\n        {\n          \"placeName\": \"Red Rock Canyon National Conservation Area\",\n          \"placeDetails\": \"A stunning desert landscape with hiking trails, rock formations, and scenic drives.\",\n          \"placeImageUrl\": \"https://www.nps.gov/redr/learn/nature/images/red-rock-canyon-national-conservation-area-001.jpg\",\n          \"geoCoordinates\": \"36.1554° N, 115.2288° W\",\n          \"ticketPricing\": \"$15 per vehicle\",\n          \"timeTravel\": \"2 hours\"\n        }\n      ]\n    },\n    \"day3\": {\n      \"bestTimeToVisit\": \"Evening\",\n      \"plan\": [\n        {\n          \"placeName\": \"Bellagio Conservatory & Botanical Garden\",\n          \"placeDetails\": \"A free, stunning display of flowers and botanical wonders within the Bellagio Hotel.\",\n          \"placeImageUrl\": \"https://www.bellagio.com/content/dam/bellagio/images/homepage/hero-images/conservatory_hero.jpg\",\n          \"geoCoordinates\": \"36.1148° N, 115.1721° W\",\n          \"ticketPricing\": \"Free\",\n          \"timeTravel\": \"1 hour\"\n        },\n        {\n          \"placeName\": \"The LINQ Promenade\",\n          \"placeDetails\": \"An outdoor shopping and dining promenade with a high roller observation wheel.\",\n          \"placeImageUrl\": \"https://www.caesars.com/linq/media/linq-promenade-2.jpg\",\n          \"geoCoordinates\": \"36.1005° N, 115.1729° W\",\n          \"ticketPricing\": \"High Roller tickets vary\",\n          \"timeTravel\": \"2 hours\"\n        },\n        {\n          \"placeName\": \"Free show on the Strip\",\n          \"placeDetails\": \"Catch a free show on the Las Vegas Strip, such as the Bellagio Fountains or the Mirage Volcano.\"\n        }\n      ]\n    }\n  }\n}\n```\n\n**Explanation:**\n\n* **Hotels:** The list provides four budget-friendly hotel options with their addresses, prices, images, coordinates, ratings, and descriptions.\n* **Itinerary:** This section outlines a 3-day itinerary with a suggested time of day to visit each location.\n* **Day 1:** This day focuses on exploring downtown Las Vegas with attractions like the Fremont Street Experience, The Neon Museum, and the Mob Museum.\n* **Day 2:** This day takes you outside the city to see Hoover Dam and Red Rock Canyon National Conservation Area.\n* **Day 3:** This day focuses on the Las Vegas Strip with a visit to the Bellagio Conservatory, the LINQ Promenade, and a free show.\n\n**Important Notes:**\n\n* Prices are approximate and can vary depending on the season and availability.\n* It is highly recommended to book hotels and tours in advance, especially during peak season.\n* Consider purchasing a Las Vegas Strip pass if you plan to visit multiple attractions.\n* This itinerary is just a suggestion, feel free to customize it to suit your interests and time constraints.\n\nThis JSON format provides a structured and easily parsable way to organize your Las Vegas trip planning information. You can use this data to build a website, mobile app, or any other tool for travelers.\n"},
          ],
        },
      ],
    });
  
    
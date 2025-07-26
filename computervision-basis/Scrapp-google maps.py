import requests

def get_google_maps_data(keyword, api_key):
    # Define the endpoint and parameters
    endpoint = "https://maps.googleapis.com/maps/api/place/textsearch/json"
    params = {
        'query': keyword,
        'key': api_key
    }

    # Make the request to the Google Maps API
    response = requests.get(endpoint, params=params)
    data = response.json()

    # Check if the request was successful
    if data.get("status") == "OK":
        return data.get("results", [])
    else:
        print("Error fetching data from Google Maps API:", data.get("status"))
        return []

def main():
    # Prompt the user for a keyword
    keyword = input("Enter the keyword you want to search for: ")
    
    # Your Google Maps API key
    api_key = "YOUR_GOOGLE_MAPS_API_KEY"

    # Fetch the data from Google Maps API
    results = get_google_maps_data(keyword, api_key)

    # Display the results on the console
    for result in results:
        print(f"Name: {result.get('name')}")
        print(f"Address: {result.get('formatted_address')}")
        print(f"Rating: {result.get('rating')}")
        print(f"Place ID: {result.get('place_id')}")
        print("-" * 40)

if __name__ == "__main__":
    main()

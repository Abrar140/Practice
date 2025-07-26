import requests
import pandas as pd

# Set your API key
API_KEY = '45f841fb03a50796d33a6631e81fe27a'  # Replace with your OpenWeatherMap API key

# Function to get weather data
def get_weather_data(location):
    url = f"http://api.openweathermap.org/data/2.5/forecast/daily?q={location}&cnt=7&appid={API_KEY}&units=metric"
    print("Requesting URL:", url)  # Print the request URL
    response = requests.get(url)
    return response.json()

# Function to save data to Excel
def save_to_excel(data, filename='weather_data.xlsx'):
    df = pd.DataFrame(data)
    df.to_excel(filename, index=False)

# Main function
def main():
    location = input("Enter the location (e.g., Lahore,PK): ")
    weather_data = get_weather_data(location)
    
    print("Response Data:", weather_data)  # Print the response for debugging
    
    if weather_data.get('list'):
        # Extract relevant details
        processed_data = []
        for day in weather_data['list']:
            processed_data.append({
                'Date': pd.to_datetime(day['dt'], unit='s'),
                'Temperature (°C)': day['temp']['day'],
                'Weather': day['weather'][0]['description'],
                'Humidity (%)': day['humidity'],
                'Wind Speed (m/s)': day['speed'],
            })
        
        # Save to Excel
        save_to_excel(processed_data)
        print("Weather data saved to Excel file.")
    else:
        print("Error fetching weather data:", weather_data)

if __name__ == "__main__":
    main()

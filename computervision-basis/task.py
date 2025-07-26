
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
import time

def search_google_maps(place):
    # Setup Selenium options
    chrome_options = Options()
    chrome_options.add_argument("--headless")  # Run in headless mode
    chrome_service = Service('path/to/chromedriver')  # Update with the path to your chromedriver

    # Initialize WebDriver
    driver = webdriver.Chrome(service=chrome_service, options=chrome_options)
    
    # Open Google Maps
    url = f"https://www.google.com/maps/search/{place}"
    driver.get(url)
    
    # Wait for the page to load
    time.sleep(5)  # Adjust sleep time as needed

    # Scrape data
    places = []
    results = driver.find_elements(By.CSS_SELECTOR, 'div.section-result')  # Update selector based on inspection

    for result in results:
        try:
            name = result.find_element(By.CSS_SELECTOR, 'h3.section-result-title').text
            address = result.find_element(By.CSS_SELECTOR, 'span.section-result-location').text
        except:
            name = 'N/A'
            address = 'N/A'
        
        places.append({'name': name, 'address': address})

    driver.quit()
    return places

def main():
    place = input("Enter the place you want to search: ")
    
    google_places = search_google_maps(place)
    
    # Print the results to the console
    if google_places:
        print(f"Search results for '{place}':")
        for place in google_places:
            print(f"Name: {place['name']}, Address: {place['address']}")
    else:
        print("No results found.")

if __name__ == "__main__":
    main()

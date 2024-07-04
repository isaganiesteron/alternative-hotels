# Alternative Hotel Finder

## Overview

This script identifies alternative hotels with a similar price range (+/- 20%) and a similar rating (over 8) using the Booking.com API. If no such hotels are found, the script broadens the search to include hotels with ratings over 7.

## Requirements

### 1. API Integration

-   **Booking.com API Access**: The script must authenticate and access the Booking.com API to fetch hotel information.
-   **Data Retrieval**: Retrieve the necessary data, including hotel IDs, geographical coordinates, prices, and ratings.

### 2. Parameter Configuration

-   **Geographical Distance**: Initially set to 1km.
-   **Price Range**: Define the acceptable price range as ±20% of the given hotel’s price.
-   **Rating Threshold**: Set the initial rating threshold to 8.0. If no suitable hotels are found, lower the threshold to 7.0.

### 3. Hotel Data Collection

-   **Initial Data Fetch**: Collect data for all hotels in the specified location or region.
-   **Filter Criteria** (in this order):
    -   Rating over 8.0.
    -   Price within ±20% of the original hotel’s price.
    -   Distance no larger than 1km.
-   **Fallback Criteria**: If no hotels meet the initial criteria, filter for hotels with ratings over 7.0.

### 4. Alternative Hotel Identification

-   **Price Comparison**: Compare the prices of available hotels to find those within the specified range.
-   **Rating Comparison**: Ensure the hotels meet the rating criteria (initially over 8.0, fallback over 7.0).
-   **Geographical Proximity**: Optionally, ensure alternatives are within a reasonable distance from the original hotel (if specified).

### 5. Output Generation

-   **Result Formatting**: Format the results to include the following details for each alternative hotel:
    -   Hotel ID
    -   Name
    -   Geographical Coordinates
    -   Price
    -   Rating
    -   Distance from the original hotel (if geographical proximity is considered)
-   **Sorting**: Sort the alternative hotels by relevance, considering both price and rating similarity.

### 6. Error Handling

-   **API Errors**: Implement error handling for potential issues with API requests (e.g., rate limits, network errors).
-   **No Results Found**: Handle cases where no hotels meet the criteria by providing an appropriate message or fallback options.

### 7. Script Execution

-   **API Endpoint**: Add an API endpoint to collect this info.
-   **Manual Trigger**: Allow for manual execution to update alternatives on-demand.

## Example Workflow

1. **Input**: Hotel ID of the original hotel.
2. **Retrieve Data**: Fetch details of the original hotel, including price and rating.
3. **Fetch Alternatives**: Use the Booking.com API to gather a list of hotels in the same region AND store them in a database.
4. **Filter and Compare**:
    - Filter hotels within ±20% of the original price.
    - Ensure the rating is over 8.0.
    - If no hotels match, filter for ratings over 7.0.
5. **Generate Output**: Create a list of alternative hotels with the required details.
6. **Output Results**: Display or store the results for further use.

## Installation

1. **Clone the repository**:

    ```sh
    git clone <repository-url>
    ```

2. **Install dependencies**:

    ```sh
    npm install
    ```

3. **Set up environment variables**: Create a `.env` file in the root directory with the following variables:
    ```env
    BOOKING_API_KEY=<Your_Booking.com_API_Key>
    DATABASE_URL=<Your_Database_URL>
    ```

## Usage

1. **Start the server**:

    ```sh
    npm start
    ```

2. **Trigger the script manually**: Use the provided API endpoint to manually trigger the search for alternative hotels.

## API Endpoint

-   **Endpoint**: `/api/fetch-alternatives`
-   **Method**: GET
-   **Parameters**:
    -   `hotelId` (required): The ID of the original hotel.

## Error Handling

-   **API Errors**: The script includes error handling for issues with API requests, such as rate limits and network errors.
-   **No Results Found**: If no hotels meet the criteria, the script provides an appropriate message or fallback options.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any changes.

---

Replace `<repository-url>` with the actual URL of your repository and fill in the appropriate environment variable values. Let me know if you need any further adjustments!

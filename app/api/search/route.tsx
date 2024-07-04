import { NextResponse } from "next/server";
import { SearchItem } from "../../../const/Interfaces";
import chunkArray from "@/utils/chunkArray";
import fetchApi from "@/utils/fetchApi";

export async function POST(request: Request) {
  try {
    console.log("***** search request *****");
    const data = await request.json();
    const { hotelid, distance, price, rating } = data;
    console.log(data);

    // Find hotel based on id. "Fetch details of the original hotel, including price and rating."

    const hotelDetails = await _fetchHotelDetails([hotelid]);
    console.log("hotelDetails", hotelDetails);

    return NextResponse.json([
      {
        hotelId: "1",
        name: "Hotel 1",
        coordinates: "1.234, 5.678",
        price: 100,
        currency: "USD",
        rating: 4.5,
        distance: 1.5,
      },
      {
        hotelId: "2",
        name: "Hotel 2",
        coordinates: "1.234, 5.678",
        price: 100,
        currency: "USD",
        rating: 4.5,
        distance: 1.5,
      },
    ] as SearchItem[]);
  } catch (error: any) {
    return NextResponse.json("error", { status: 500 });
  }
}

const _fetchHotelDetails = async (hotelIds: number[]) => {
  /**
   * ***THIS IS EXACTLY THE SAME AS THE hotels API endpoint
   *
   * Hotel hoteIds here will most probably be an array of 100 hotels already because
   * _fetchHotelPrices is ran on a per page basis. BUT just in case it's split into
   * 100 hotels per request.
   *
   * It's also unlikely BUT it's possible that this could have a next_page as well.
   */

  const splitArray = chunkArray(hotelIds); // Note: change 2 to 100 after testing
  console.log(
    `     _fetchHotelDetails: There will be ${splitArray.length} requests.`
  );

  let allHotelDetails: object[] = [];
  let requestCount = 0;

  while (requestCount < splitArray.length) {
    let next_page = "";
    let fetchingDone = false;
    console.log(
      `     Fetching details for ${splitArray[requestCount].length} hotels.`
    );
    while (!fetchingDone) {
      const requestBody =
        next_page === ""
          ? {
              accommodations: splitArray[requestCount],
              extras: [
                "description",
                "photos",
                "facilities",
                "payment",
                "policies",
                "rooms",
              ],
            }
          : { next_page };
      const rawData = await fetchApi("/accommodations/details", requestBody);
      if (rawData.next_page) next_page = rawData.next_page;
      else fetchingDone = true;

      if (rawData.data) allHotelDetails.push(...rawData.data);
      else console.log("Error fetching hotel details");
    }
    requestCount++;
  }
  return allHotelDetails;
};

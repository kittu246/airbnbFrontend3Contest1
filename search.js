let urlParam = new URLSearchParams(window.location.search);

let city = urlParam.get("location");

let checkIndate = urlParam.get("checkIn");
// console.log(checkIndate.getDate());
let checkOutdate = urlParam.get("checkOut");

let guest = urlParam.get("guests");
console.log(city, checkIndate, checkOutdate, guest);

City.innerText = city;

checkIn.innerText = `${checkIndate}  to ${checkOutdate}`;
// checkOut.innerText = checkOutdate;
Guest.innerText = guest;
// console.log(city.innerText,checkIn.innerText,checkOut.innerText,guest.innerText);

async function getDummyData() {
  const url = `https://airbnb13.p.rapidapi.com/search-location?location=${city}&checkin=${checkIndate}&checkout=${checkOutdate}&adults=${guest}&children=0&infants=0&pets=0&page=1&currency=USD`;
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "013bb6931bmsh061041006257273p1c9d51jsne4087ba7b66e",
      "X-RapidAPI-Host": "airbnb13.p.rapidapi.com",
    },
  };

  try {
    const response = await fetch(url, options);
    // const response = await fetch("./dummy.json");
    const result = await response.json();
    let data = result.results;
    console.log(data);
    displayData(data);
  } catch (error) {
    console.error(error);
  }
}

document.addEventListener("DOMContentLoaded", function () {
  
  getDummyData();
  initMap();
});


// searchBar

// search functionality

let searchedRoom = document.getElementById("searchedRoom");

// console.log(searchedRoom);

function displayData(data) {
  // searchedRoom.innerHtml = "";

  data.forEach((ele) => {
    // console.log(ele.id);

    let roomCard = document.createElement("div");

    roomCard.className = "roomCard";

    let lowerBorder = document.createElement("div");
    lowerBorder.className = "outerHorizontalLine";

    roomCard.innerHTML = `
    
    <div id="roomCardImage">
    <img src=${ele.images[0]}>
  </div>
  
  <div class="roomCardInfo">
    <div class="CardHeading">
      <p>${ele.name}</p>
      <i class="fa-solid fa-heart" style="color: #ea064a;"></i>
    </div>
    <h2>${ele.city}</h2>

    <div class="horizontalLine"></div>
    <div class="anemities">
     <ul>
      
      <li>4-6 guests</li>
      <li>Entire Home</li>
      <li>5 beds</li>
      <li>3 bath</li>
      <li>Wifi</li>
      <li>Kitchen</li>
      <li>Free Parking</li>
     </ul>
    </div>
    <div class="horizontalLine"></div>

    <div id="ratingSection">
      <div id="leftRatingSection">
        <p>${ele.rating}</p>
        <i class="fa-solid fa-star" style="color: #eede2b;"></i>
        <p>(${ele.reviewsCount} views)</p>

      </div>
      <div>
        <p>$${ele.price.rate}/night</p>
      </div>

      <div>
        <button id="costButton" onclick="showBookingCostBreakdown(${ele.price.rate})"  class="costButton">Cost Breakdown</button>
      </div>
    </div>

    <div class="locationButton">
        <button id="locationButton" onclick="openDirections(${ele.lat},${ele.lng})">Get Location</button>
    </div> 
    

  </div>


           `;

    //   var marker = new google.maps.Marker({
    //     position: {lat: `${ele.lat}`, lng: `${ele.lng}`},
    //     map: map,
    //     title: 'Marker Title'
    //  });



    searchedRoom.appendChild(roomCard);
    searchedRoom.appendChild(lowerBorder);

    var marker = new google.maps.Marker({
      position: { lat: ele.lat, lng: ele.lng },
      map: map,
      
    });

    
  });
}

//cost breakDown functionality

function showBookingCostBreakdown(listingPrice) {
  console.log("hey");

  const additionalPrice = listingPrice * 0.12;

  const totalPrice = additionalPrice + listingPrice;

  // creating a modal

  let modalParent = document.createElement("div");
  modalParent.className = "modalParent";
  let modalBody = document.createElement("div");
  modalBody.className = "modalBody";

  modalBody.innerHTML = `<h2>Booking Cost Breakdown</h2>
  <div class="modalInfo">
  <div>
  <p>Base Rate: ${listingPrice}</p>
  <p>Additional Fees: ${additionalPrice}</p>
  </div>
  <p>Total Cost: ${totalPrice}</p>
  </div>
`;

  let closeButton = document.createElement("button");
  closeButton.innerText = "close";
  closeButton.className = "closeModalButton";

  closeButton.addEventListener(
    "click",
    () => (modalParent.style.display = "none")
  );

  modalBody.appendChild(closeButton);

  modalParent.appendChild(modalBody);

  document.body.appendChild(modalParent);
}


var map ;

function initMap() {
  // Create a map centered at a specific location
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: -34.397, lng: 150.644 },
    zoom: 15,
  });
}
  // Add a marker to the map
 


// user location functionality

function openDirections(lat, lng) {
  // Open Google Maps directions in a new tab
  console.log("hey");

  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(
      function (position) {
        // Access the latitude and longitude from the position object
        console.log(position);
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        // Store the coordinates in the 'geolocation' variable
        const geolocation = { latitude, longitude };

        const url = `https://www.google.com/maps/dir/${
          (geolocation.latitude, geolocation.longitude)
        }/${lat},${lng}`;
        window.open(url, "_blank");
      },
      function (error) {
        console.log(error);
      }
    );
  } else {
    // Browser doesn't support Geolocation
    console.error("Geolocation is not supported by this browser.");
  }
}

function initialize() {
    //grab previous locations from local storage
    savedLocations = JSON.parse(localStorage.getItem("weathercities"));
    var lastSearch;
    //display buttons for previous searches
    if (savedLocations) {
        //get the last city searched so we can display it
        currentLoc = savedLocations[savedLocations.length - 1];
        showPrevious();
        getCurrent(currentLoc);
    }
    else {
        //try to geolocate, otherwise set city to raleigh
        if (!navigator.geolocation) {
            //can't geolocate and no previous searches, so just give them one
            getCurrent("Raleigh");
        }
        else {
            navigator.geolocation.getCurrentPosition(success, error);
        }
    }

}
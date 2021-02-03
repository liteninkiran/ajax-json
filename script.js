
    // Initialise counter
    var pageCounter = 1;

    // Store DIV element to output data to
    var animalContainer = document.getElementById("animal-info");

    // Store BUTTON element to listen for a click
    var btn = document.getElementById("btn");

    // Listen for click
    btn.addEventListener("click", function()
    {
        // Create a new request object
        var ourRequest = new XMLHttpRequest();

        // Store URL to get data from - data is return as JSON string: { foods{ likes{}, dislikes{} }, name, species}
        var url = 'https://learnwebcode.github.io/json-example/animals-' + pageCounter + '.json';

        // Open the request
        ourRequest.open('GET', url);

        // Define onload event function
        ourRequest.onload = function()
        {
            // Check status is OK
            if(ourRequest.status == 200)
            {
                // Retreive the JSON encoded data
                var ourData = JSON.parse(ourRequest.responseText);

                // Output the HTML
                renderHTML(ourData);
            }
            else
            {
                // Hide the button
                btn.classList.add("hide-me");

                // Return an error message to the console
                console.log("We connected to the server, but it returned an error.");
            }
        };

        // Return an error message to the console
        ourRequest.onerror = function()
        {
            console.log("Connection error");
        };

        // Send request
        ourRequest.send();

        // Increment page counter (affects the URL)
        pageCounter++;

        // Hide button after three iterations
        if(pageCounter > 30)
        {
            // Hide the button
            btn.classList.add("hide-me");
        }
    });


    function renderHTML(data)
    {
        // Store empty string
        var htmlString = "";

        // Loop through elements of JSON string
        for(i = 0; i < data.length; i++)
        {
            htmlString += "<p>" + data[i].name + " is a " + data[i].species;
            htmlString += " that likes " + data[i].foods.likes.join(" and ");
            htmlString += " and dislikes " + data[i].foods.dislikes.join(" and ");
            htmlString += ".</p>";
        }

        animalContainer.insertAdjacentHTML('beforeend', htmlString);
    }


const createTrip = async (event) => {
    event.preventDefault();
  
    const name = document.querySelector("#trip-name").value.trim();
    const date_start = document.querySelector("#start-date").value.trim();
    const date_end = document.querySelector("#end-date").value.trim();
  
    const jsonBody=JSON.stringify({ name, date_start, date_end })
    console.log(jsonBody);
    if (name && date_start && date_end) {
        const response = await fetch("/api/trips", {
            method: "POST",
            body: jsonBody,
            headers: { "Content-Type": "application/json" },
        });
        
        if (response.ok) {
            document.location.replace("/");
        } else {
            alert("Error creating trip");
        }
    }
  };
  
  document.querySelector(".trip-form").addEventListener("submit", createTrip);
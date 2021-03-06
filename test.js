<% let long2 = (match.center[0]) %>
<% let lat2 = (match.center[1]) %>

<% let newZip = [] %>

<% for(let i = 0; i < zipRes.zip_codes.length; i++) { %>
 <%  newZip.push(parseInt(zipRes.zip_codes[i])) %>
  <% console.log(newZip) %>
<% } %> 

<div style="padding: 50px; background-image: url('https://res.cloudinary.com/dg0v67kcj/image/upload/v1588197828/farmstandbackground2_wmmxi7.png'); background-size: contain;">
<div class="row">
    <div class="row">
        <div class="col s3"></div>
        <div class="col s3 yellow darken-1">
            <form method="GET" action="/zipfind">
                <input type="text" name="zip" class="">
                <label for="zip" name="Search By Neighborhood">search by neighborhood</label>
                <button type="submit">submit</button>
            </form>
                    </div>
        <div class="col s3 yellow darken-1">
            <input type="text" name="produce" class="">
            <label for="neighborhood" name="Search By Neighborhood">search by produce</label>
        </div>
    </div>

    <p hidden id="long" > <%= match.center[0] %></p>
    <p hidden id="lat" > <%= match.center[1] %></p>
  

    <div class="col s12" id="mappy">
        <div id="map">
            <script>
                console.log("yeah this works!!!!")
                let lat = document.getElementById('lat').textContent
                let long = document.getElementById('long').textContent
                mapboxgl.accessToken = '<%= mapkey %>';

                var map = new mapboxgl.Map({
                    container: 'map', // container id
                    style: 'mapbox://styles/mapbox/streets-v11', // stylesheet location
                    center: [long, lat], // starting position [lng, lat]
                    zoom: 12 // starting zoom
                });
                let geojson = {
                    type: 'FeatureCollection',
                    features: [{
                        type: 'Feature',
                        geometry: {
                            type: 'Point',
                            coordinates: [long, lat]
                        },
                    properties: {
                        title: 'Mapbox',
                        description: 'map'
                    }
                    }]
                };
                geojson.features.forEach((marker) => {
                    let elem = document.createElement('div')
                    elem.className = 'marker'
                    new mapboxgl.Marker(elem)
                    .setLngLat(marker.geometry.coordinates)
                    .addTo(map)
                })
            </script>
        </div>
</div>



<div  class="container yellow darken-1" id="postBox">


    <% for (let i = 0; i < post.length; i++) { %>
       <% if(newZip.includes(post[i].zip)) { %>
            <div class="row">
                <div class="col s3" >
                    <img src="https://placekitten.com/150/150">
                </div>
                <div class="col s9 brown-text text-darken-1">
                    <%=post[i].user.displayName%>
                    <%= post[i].offer %>
                    <%= post[i].trade %>
                    <%= post[i].postContent %>
                </div>
            </div>
        <% } %>
    <% } %>
</div>
</div>
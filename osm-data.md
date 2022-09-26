# points

## sql 

### highway exits numbers

#### dk_exit

  agg_tags @@ 'exists ($."highway") && $."highway" == "motorway_junction"' 

###  public transportation symbols

  
  
- light rail or tram (S-train)
   - railway: tram_stop
   - agg_tags @@ '$."railway" == "tram_stop"'
 - subway
   - station: subway
   - agg_tags @@ '$."station" == "subway"'
 - train
   - railway: station and station != subway
   - agg_tags @@ '$."railway" == "station" && !(exists($."station") && $."station" == "subway") '
-  cable car or Gondola lift station? https://goo.gl/maps/znEHYUJzPcGoXgNA7
   -  missing loen skylift
   -  aerialway: yes
   -  agg_tags @@ '(exists($."aerialway") && $."aerialway" == "yes") '
 - bus stop
  - highway = bus_stop, might need to split into different priority level since they are close to each other
  - agg_tags @@ '$."highway" == "bus_stop"'
- ferry terminal (so many points)
  -  "amenity": "ferry_terminal"
  -  agg_tags @@ '!exists($."tourism") && $."amenity" == "ferry_terminal"'

    - parking, normally are polygons
    https://wiki.openstreetmap.org/wiki/Tag:amenity%3Dparking
     - airport

  - hospital, some are points, some are polygons


##It's possible to draw center points directly on maputnik
  just specify the filed that want to display





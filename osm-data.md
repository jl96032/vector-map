# areas

## administrative border

    "place": "island",
    "boundary": "administrative",
    "ref:nuts": "DK01",
    "ref:nuts:2": "DK01",
    "type": "boundary",

    "ref:nuts": "DK0",
    "ref:nuts:1": "DK0",

## forest

  manual select does not match with lcol_table, should have 771168 records
  ($."landuse" == "forest") ||($."natural" == "wood") 

## building

  could not find 3d info, need more time

  ### normal building


  ### public building

    shop in "mall"
    building in "school,hospital,university,stadium,sports_hall"
    
  ### industrial building

    builing in  "industrial,warehouse,parking,manufacture,hangar,garages,service,transportation,office,retail,commercial"


## landuse

  ### parking

    $."amenity" == "parking"

  ### buildup area

    $."landuse" == "residential"

  ### forest

    ($."landuse" == "forest")
  
  ### leisure

    select count(*) from osmtile.skan_poly
where
	--agg_tags ? 'leisure' and ( (agg_tags ->> 'leisure') = 'track' or (agg_tags ->> 'leisure') = 'pitch') -- < 200ms
	--agg_tags @@ '$."leisure" == "track" || $."leisure" == "pitch"'::jsonpath -- < 100ms
	agg_tags @> '{"leisure":"track"}' or agg_tags @> '{"leisure":"pitch"}' -- < 100ms I suggest using this method.
; --39045.

    agg_tags ? 'leisure' and (agg_tags->>'leisure'  in ('track','pitch'))
    ($."leisure" == "park" || ($."leisure" == "pitch" && $."sport" != "surfing"))
    Copenhagen cable park on water is classified as pitch as well, so not good to use green. 

  ### school 

    ($."amenity" == "school")

  ### water

    ($."natural" == "water")

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

-  cable car or Gondola lift station? 
   -  https://goo.gl/maps/znEHYUJzPcGoXgNA7
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


## line

### railway line
    ["name", "tunnel", "bridge"] attributes 
    exists($."railway") && $."railway" != "ferry" && $."railway" != "proposed"

    exclude railway == "abandoned"




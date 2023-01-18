
# !pixel_width! is 
https://wiki.openstreetmap.org/wiki/Zoom_levels

for data on mid zoom level, rememver to reproject it to google's projection, 100 meter for generealization. 

# agrithem that create center point
https://blog.mapbox.com/a-new-algorithm-for-finding-a-visual-center-of-a-polygon-7c77e6492fbc

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
  agg_tags @@ '($."landuse" == "forest") ||($."natural" == "wood")' 

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

    agg_tags @@ 'exists ($."amenity") && ($."amenity" == "parking")'

  ### park
    (agg_tags ? 'leisure' and (agg_tags->>'leisure' in ('park', 'stadium','track','golf_course') or (agg_tags->>'leisure'= 'pitch' and agg_tags->>'sport' != 'surfing'))) or (agg_tags ? 'leisure')
    
  ### water 
    agg_tags @@ '($."natural" == "water")'

  ### nature_reserve
    agg_tags->>'leisure' in ('nature_reserve')

  ### buildup area

    $."landuse" == "residential"

  ### scrub

    agg_tags ? 'natural' and (agg_tags->>'natural' in ('scrub','heath','grassland','fell','tundra')) 

  ### forest

    agg_tags @@ '($."natural" == "wood")'

  ### mud

    (agg_tags ? 'natural' and agg_tags->>'natural' in ('wetland')) and (agg_tags ? 'wetland' and agg_tags->>'wetland' in ('mud','tidalflat'))

  ### wetland

    (agg_tags ? 'natural' and agg_tags->>'natural' in ('wetland')) and (agg_tags ? 'wetland' and agg_tags->>'wetland' not in('mud','tidalflat'))

  ### glacier 

    (agg_tags ? 'natural' and agg_tags->>'natural' in ('glacier')) 

  ### hospital
    agg_tags ? 'leisure' and (agg_tags->>'amenity' in ('hospital'))

  ### school
    agg_tags ? 'leisure' and (agg_tags->>'amenity' in ('college','school','university','dindergarten','music_school'))

  ### airport 
    agg_tags ? 'aeroway' and (agg_tags->>'aeroway' in ('aerodrome'))

  ### leisure

    select count(*) from osmtile.skan_poly
where
	--agg_tags ? 'leisure' and ( (agg_tags ->> 'leisure') = 'track' or (agg_tags ->> 'leisure') = 'pitch') -- < 200ms
	--agg_tags @@ '$."leisure" == "track" || $."leisure" == "pitch"'::jsonpath -- < 100ms
	agg_tags @> '{"leisure":"track"}' or agg_tags @> '{"leisure":"pitch"}' -- < 100ms I suggest using this method.
; --39045.

    agg_tags ? 'leisure' and (agg_tags->>'leisure'  in ('track','pitch'))
    agg_tags @@ '($."leisure" == "park" || ($."leisure" == "pitch" && $."sport" != "surfing"))'
    Copenhagen cable park on water is classified as pitch as well, so not good to use green. 

  ### school 

    ($."amenity" == "school")

  ### water

     #### watter from osm data

       agg_tags @@ '($."natural" == "water")'
    
    #### world water polygons
      *simplified 
      *full
    
      https://osmdata.openstreetmap.de/data/water-polygons.html



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
  -  


    - parking, normally are polygons
    https://wiki.openstreetmap.org/wiki/Tag:amenity%3Dparking
     - airport

  - hospital, some are points, some are polygons


##It's possible to draw center points directly on maputnik
  just specify the filed that want to display


## line

### railway line
    ["name", "tunnel", "bridge"] attributes 
    
    agg_tags ? 'railway' and (agg_tags->>'railway' not in ('ferry','proposed','abandoned'))



### roads 

### roads z 10
agg_tags ? 'highway' and (agg_tags->>'highway' not in ('path','pedestrian','footway','cycleway','bridleway','steps','platform','proposed','construction') and agg_tags->>'highway' not in ('service','track','living_street','residential','unclassified')) 



# how to specify zoom in tegola
way_area > pixel_size(!ZOOM!)*4

if the zoom level is 11.5, then pixel_with is the pixel with on zoom levle 11

# zoom level and pixel size
https://learn.microsoft.com/en-us/azure/azure-maps/zoom-levels-and-tile-grid?tabs=csharp

  sql = """SELECT st_area(geom), !pixel_width!*1 as area,  
  ST_AsBinary(geom) AS geom,
  name
  FROM osmtile.lcol_water WHERE geom && !BBOX!"""

https://github.com/go-spatial/tegola/issues/343

!ZOOM!

https://github.com/go-spatial/tegola/issues/470

# slow performance 
https://github.com/go-spatial/tegola/issues/526


ferry agg_tags ? 'route' and (agg_tags->>'route' = 'ferry' ) and not agg_tags ? 'ferry' and agg_tags->>'type' = 'route'
agg_tags ? 'route' and (agg_tags->>'seamark:type' = 'ferry_route')

roads_extra		1	agg_tags @@ 'exists ($."highway")'::jsonpath	
roads_jsonpath		1	agg_tags @@ 'exists ($."highway") && ($."route" == "hiking")'::jsonpath	
roads_jsonpath2		1	agg_tags @@ 'exists ($."highway") && ($."bicycle" != "no" && $."bicycle" == "designated" || $."highway" == "cycleway")'::jsonpath	
amenity		1	agg_tags @@ 'exists ($."amenity") && ($."amenity" == "school")'::jsonpath	
buildings		1	agg_tags @@ 'exists ($."building")'::jsonpath	
place_name		1	agg_tags @@ 'exists ($."name")'::jsonpath	
roads		1	"agg_tags ? 'highway' and (agg_tags->>'highway' not in ('dismantled','razed','planned','disused','abandoned','proposed'))
"	
roads_name		1	agg_tags @@ 'exists ($."highway") && exists ($."name")'::jsonpath	
roads_ref	europe_road	1	agg_tags->>'highway'  in ('primary', 'trunk','motorway') and agg_tags->>'ref' like '%E%'	
roads_ref	two_digits_road	2	agg_tags->>'highway'  in ('primary', 'trunk','motorway') and length(agg_tags->>'ref') = 2	
land_use		1	agg_tags @@ 'exists ($."landuse")'::jsonpath	
administrative		1	agg_tags @@ 'exists ($."boundary") && exists ($."admin_level") && ($."boundary" == "administrative")'::jsonpath	
waterway		1	agg_tags @@ 'exists ($."waterway")'::jsonpath	
roads_t_src		1	agg_tags @@ 'exists ($."highway") && exists ($."ref")'::jsonpath	
roads_main		1	agg_tags @@ 'exists ($."highway") && ((((($."highway" == "motorway" || $."highway" == "motorway_link") || $."highway" == "primary") || $."highway" == "trunk") || $."highway" == "secondary") || $."highway" == "tertiary")'::jsonpath	
bicycle_designated		1	agg_tags @@ 'exists ($."bicycle") && ($."bicycle" != "no" && $."bicycle" == "designated" || $."highway" == "cycleway")'::jsonpath	
route_hiking_pilgrim		1	agg_tags @@ 'exists ($."route") && ($."route" == "hiking" && $."name" like_regex "^den danske pil" flag "i")'::jsonpath	
residential		1	agg_tags @@ 'exists ($."landuse") && ($."landuse" == "residential")'::jsonpath	
roads_main_class	motorway	4	agg_tags @@ '$."highway" == "motorway"'::jsonpath	
roads_main_class	motorway_link	5	agg_tags @@ '$."highway" == "motorway_link"'::jsonpath	
roads_main_class	primary	1	agg_tags @@ '$."highway" == "primary"'::jsonpath	
roads_main_class	trunk	6	agg_tags @@ '$."highway" == "trunk"'::jsonpath	
roads_main_class	secondary	2	agg_tags @@ '$."highway" == "secondary"'::jsonpath	
roads_main_class	tertiary	3	agg_tags @@ '$."highway" == "tertiary"'::jsonpath	
landuse	water	2	agg_tags @@ '($."natural" == "water")'	
landuse	parking	3	agg_tags @@ 'exists ($."amenity") && ($."amenity" == "parking")'	
leisure		1	agg_tags @@ '($."leisure" == "park" || ($."leisure" == "pitch" && $."sport" != "surfing"))'	
landuse	forest	1	agg_tags @@ '($."landuse" == "forest") ||($."natural" == "wood")'	
railway		1	"agg_tags ? 'railway' and (agg_tags->>'railway' not in ('ferry','dismantled','razed','planned','disused','abandoned','proposed'))
"	
public_transportation	se_exit	1	agg_tags @@ 'exists ($."highway") && $."highway" == "motorway_junction" && $."e_country" == "se" '	
public_transportation	no_exit	3	agg_tags @@ 'exists ($."highway") && $."highway" == "motorway_junction" && $."e_country" == "no" '	
public_transportation	dk_exit	2	agg_tags @@ 'exists ($."highway") && $."highway" == "motorway_junction" && $."e_country" == "dk" '	
public_transportation	se_tram	4	agg_tags @@ '$."railway" == "tram_stop" && $."e_country" == "se"'	
public_transportation	dk_tram	5	agg_tags @@ '$."railway" == "tram_stop" && $."e_country" == "dk"'	
public_transportation	no_tram	6	agg_tags @@ '$."railway" == "tram_stop" && $."e_country" == "no"'	
public_transportation	se_metro	7	agg_tags @@ '$."station" == "subway" && $."e_country" == "se"'	
public_transportation	dk_metro	8	agg_tags @@ '$."station" == "subway" && $."e_country" == "dk"'	
public_transportation	no_metro	9	agg_tags @@ '$."station" == "subway" && $."e_country" == "no"'	
public_transportation	se_train	10	agg_tags @@ '$."railway" == "station" && !(exists($."station") && $."station" == "subway") && $."e_country" == "se" '	
public_transportation	dk_train	11	agg_tags @@ '$."railway" == "station" && !(exists($."station") && $."station" == "subway") && $."e_country" == "dk" '	
public_transportation	no_train	12	agg_tags @@ '$."railway" == "station" && !(exists($."station") && $."station" == "subway") && $."e_country" == "no" '	
public_transportation	busstation	14	agg_tags @@ '$."highway" == "bus_stop"'	
public_transportation	cable_car	13	agg_tags @@ '(exists($."aerialway") && $."aerialway" == "yes") '	
roads_z_10		1	"agg_tags ? 'highway' and (agg_tags->>'highway' not in ('path','pedestrian','footway','cycleway','bridleway','steps','platform','proposed','construction') and agg_tags->>'highway' not in ('service','track','living_street','residential','unclassified')) 
"	
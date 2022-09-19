## point symbols

  ### how to create and maintain sprites library
    #### guide lines for styling
    according to the doc of mapbox 
    https://maplibre.org/maplibre-gl-js-docs/style-spec/sprite/

    We suppose to have 4 files if we would like to show symbols correctly
    https://ux14-geo-test.herokuapp.com/osm-liberty-origin.json
    https://ux14-geo-test.herokuapp.com/osm-liberty-origin.png
    https://ux14-geo-test.herokuapp.com/osm-liberty-origin@2x.json
    https://ux14-geo-test.herokuapp.com/osm-liberty-origin@2x.png

    currently, we are setting symbols with the following size
    
    ####  our origin png size
      - retina 100% 38X38
      - retina 75% 28X28

      - ordinary 100% 17X17
      - ordinary 75% 15X15
    To be able to maintain library easier, we put all pngs into grid and create some white space around it.
    then the index json file can be easierly setted up by adding 50 or 30 to x and y location

    ```
    "aerialway_15": {
        "height": 19,   
        "pixelRatio": 1,
        "width": 19,
        "x": 80,// horizontal location for image center couting from left up corner
        "y": 190 //vertical location for image center couting from left up corner
      },
    ```
  ### overlap

  ### prioritazation 
    To simplify the layout file, we should use {class}_100 or {class}_75 in the 
    Icon Layout properties -> Image when they have same priority value
    
## text 

  #### text size
     size 12 is good for normal text
     size 10 and bold if for important text

  #### font
    Arial is good enough
    Arial Italic can be used for some special objects

  ### anchor point
    https://docs.mapbox.com/help/troubleshooting/optimize-map-label-placement/
    Label density can be used for alternative anchor points
    sample text-variable-anchor = ["top", "bottom", "left"]


### prioritazation 
  To simplify the layout file, we should use {class}_100 or {class}_75 in the 
  Icon Layout properties -> Image when they have same priority value

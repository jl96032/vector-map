## 

    layers on the botton in the layerslist have higher priority.
    "padding" can be used to block souring symbols
    "spacing" can be used to block duplicate street names
    "dasharray"
    # design doc ["literal", [5, 3]], 
        the first number means the length of solid line, the second means gap
    https://tilemill-project.github.io/tilemill/docs/guides/styling-lines/

    ? how to avoid jump in effect for new objects, should we fade in them earlier?

## point symbols

###how to create and maintain sprites library
  
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

### collision control related to png size

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

### how to display collision outline of texts (how to do in maputnik???)

    https://docs.mapbox.com/mapbox-gl-js/api/map/#instance-members-debug-features 
    map.showCollisionBoxes = true


### prioritazation 

  To simplify the layout file, we should use {class}_100 or {class}_75 in the 
  Icon Layout properties -> Image when they have same priority value

### how to create sprites

https://www.npmjs.com/package/mbsprite


### how to use expressions in maplayout

https://bl.ocks.org/malwoodsantoro/e1737dcf458d278c16db82ad29679a11


### what will happen if filtered attribute does not exist
    the test will go on, so need to becareful 



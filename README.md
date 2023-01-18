# Getting Started with Create React App

# Heroku local
cd /Users/liang/work/node/vector-map

heroku ps:scale web=1

modified config var and added NODE_OPTIONS with value --max_old_space_size=1024
heroku local -p 3000
git remote add heroku-prod ----
git push heroku-prod master
heroku logs

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)





#### use https://www.toptal.com/developers/css/sprite-generator/ 
to generate sprite png from folders, copy out all config info but use positive location number instead of negative numbers

## public transport symbols
###  railway symbols
 - light rail  (S-train, Pendaltåg station)
   - railway : station, stop, halt
   - ligth_rail: yes
 - subway
   - railway: station
   - subway : yes
 - train
   - railway: station
   - train: yes
-  tram
   -  railway: tram_stop
   -  tram: yes
-  cable car? https://goo.gl/maps/znEHYUJzPcGoXgNA7
   -  aerialway: yes
   -  public_transport: stop_position

attribute: symbol (ligth_rail, ligth_rail, train, tram, busstop )  -> name in layout - {symbols}_75

## searching opensteetmap by id (type+id)
https://nominatim.openstreetmap.org/ui/details.html?osmtype=N&osmid=332572924
stadhagen 
  - relations
    - 
  entrance 5 objects
id : 332572924(entrance), 729858226(entrance), 4225502376(target), 332572923(entrance), 332572930(entrance)
  - transportaion harbour
    - 


### highway 
  - exits
    - highway: motorway_junction
    - ref: 6
  
  
agg_tags @@ '!exists ($."addr:city") && !exists ($."power") 
&& !exists ($."amenity") && !exists ($."street_cabinet") && 
!exists($."crossing") && !exists($."natural") && !exists($."shop") &&  !exists($."emergency")'

#### in the image field use {class}_11 to skipp different type of png setups

## another way of making png sprite
- https://w3bits.com/css-sprites/

## how to do svg sprites?
- https://www.sitepoint.com/use-svg-image-sprites/
- https://w3bits.com/svg-sprites/
## if I create a larger symbol, what will collition control get effected.




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

### prioritazation 
  To simplify the layout file, we should use {class}_100 or {class}_75 in the 
  Icon Layout properties -> Image when they have same priority value



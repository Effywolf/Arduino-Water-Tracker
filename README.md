# Arduino water tracking app for class
The goal of this project was to make a project that can be helpful using Arduinos. I made an app to track water consumption that connects to the Arduino to accomplish this.

# Materials used
## Physical components
- Arduino R4
- hx711 weight cell amplifier
- 4 weight cells*
- coaster
- cardboard

*while you can use less weight cells than 4, in testing having 4 was a more accurate count as I average out the readings from all 4. Furthermore, the coster used in the prototype was larger than average and placing a cup off centre would cause inaccurate readings and potentally tilt the cups over.

## Coding components
- electron
- typescript/javascript
- Arduino programming language
- Node
- WSL
- Joy UI

# Screenshots and Features

## App overview
![image](https://github.com/Effywolf/Arduino-Water-Tracker/assets/44181298/18209cdd-5d5f-40cb-b54b-5a33d0bb95f5)

## Recalibrate
![image](https://github.com/Effywolf/Arduino-Water-Tracker/assets/44181298/aa7dd08e-dd4f-4e00-9a1f-cba12df158a6)

This button is to be used to zero out/tare the scale to remove the weight of the empty cup. Simply place the empty cup on the scale and hit recalibrate and wait a few seconds. Then you are able to take your cup off and fill it with water to begin the process

## Change Goal
![image](https://github.com/Effywolf/Arduino-Water-Tracker/assets/44181298/d1d2a207-40b4-4312-8ec5-376db3cdac46)

The default goal is 770mL, based off my own daily use cup, however not all cups hold that much. So there is an option to change the goal to fit your own needs! **Keep in mind this will not save so if you close the app it will be reset + right now it does not carry over if you recalibrate the scale again**

## mLS drank
![image](https://github.com/Effywolf/Arduino-Water-Tracker/assets/44181298/209bf681-2551-47f2-a565-91f43ee1d487)

This is where your mLs drank (top) and goal mLs (bottom) are located. This is where it will tell you how much has been drank and can take a second to update. **If you know how to code and want to speed this process up you can edit line 64 in the App.tsx to speed it up but keep in mind you may need to change the SamplesPerAvg to match your speed**

## More stats
![image](https://github.com/Effywolf/Arduino-Water-Tracker/assets/44181298/820659f9-0a20-44f6-b018-1fbb84b5c156)

This area tells you the time since last drank and the current weight of the cup in mLs. The time since last drank is the last time the mLs drank is updated and current weight is the current weight of liquid in the cup. 

## User Info
![image](https://github.com/Effywolf/Arduino-Water-Tracker/assets/44181298/50c40e2f-84ae-43bb-aada-c6d9b850e7c3)

This is simply where the username and profile pic are stored. Currently no way to change it as I ran out of time but if you know what you're doing feel free to edit. **You may have to edit electron privacy settings though**

## Quotes 
![image](https://github.com/Effywolf/Arduino-Water-Tracker/assets/44181298/53bd08fb-4196-464d-8a2c-16918b404dfa)

Some quotes from a Quote API, you will need to use your own key the one provided is revoked :)

## Arduino face change
![image](https://github.com/Effywolf/Arduino-Water-Tracker/assets/44181298/da0e3c40-085a-411e-b788-43e1cfd2d507)

The arduino R4 has a matrix LED on the board itself and it will change the faces depending on the % completed for the water goal. This uses the Arduino_LED_Matrix and matrix library to function. If you do not have an LED matrix you may need to comment out the code for it in the .ino file.

# Arduino set up
![image](https://github.com/Effywolf/Arduino-Water-Tracker/assets/44181298/1f64f95b-e1d9-424b-84af-04b12846e10a)

Set up the arduino like this. When attaching the weight cells to the coaster be careful as the small inner square of the cell needs to have some space to flex! Personally I put the weight cells flat side down on some cardboard and put the coster on top since the cardboard had enough give to let it flex enough for this usecase. 

## Arduino Code (INO)
Currently the arduino default pins set up are the dout pin = 3 and sck pin = 2. The baud rate is 9600 with a calibration factor of -7050 (feel free to change this but its the best i got in testing). A majority of this code is just for sending the arduino data to Node and then to the actual application to use for logic and calculations.

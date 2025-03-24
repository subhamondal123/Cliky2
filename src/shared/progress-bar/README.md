## React Native Progress Bar

## Getting Started
### Prerequisites
#### Install Android and iOS development environments
  add this file in your project as a share component.

##### Props

###### 1. data
    data provive in number in between 1 - 10
###### 2. type
    it is two type ("shak" and "smoth")
###### 3. height
    it will provide the height of the bar, gives the value in number.
###### 4. borderRadius
    it is the process bar radious. gives the value in number. 
###### 5. backgroundColor
    it gives the color code or color name, like "green" and "#000000"
###### 6. isText
    if want to see the process text then, give it "true" otherwise "false", it only show for "smoth" process bar.
###### 7. activeFontColor
    it sets the font color of the active progress section
###### 7. primaryFontColor
    it sets the font color of main progress bar
    


###### 7. Usage of this
        <ProgressBar
            data={8}
            type={"smoth"}
            height={10}
            borderRadius={10}
            backgroundColor={"#000000"}
            isText={true}
        />
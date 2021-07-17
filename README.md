## INTRODUCTION
- The Covid Tracker application gives you the data of covid cases around the globe
- A Graphical representation is also shown in this app about the past data and worse affected places
- Nav bar are also included so that the user feel easy to navigate from one page to another so as to check the data in detail
- This application is made using javascript, react library, react bootstrap, react chartjs, CSS.

## DESCRIPTION
- This application shows the global data in its home page, Total Cases, deaths, reacovered, and active cases.
- A user can navigate from one page to another via nav bars to check the data in details, like continent data and countries data.
- There are three nav items, **Gobal**, **Continents**, **Countries**.
- **Global** shows the global data same in the home page and also the historical data are represented in graphical format for the user to understand it easier.
- **Continents** shows the graph of the worse affected continents in descending order, by which the user can easily understand which continent is worst affected by the covid pandemic.
- A User can check the Today's, yesterday's and day before yesterday data by selecting it from the drop down list.
- A User can also see the graphical representation based on number of cases, deaths, recovered and active. A user can change the graph type from bar to line
- The table structure is also available to see the data of continents, and to see the data in detail a user can click on the name of the continent in table which will navigate the user to a different page in which the information of that continent will be displayed.
- A table also provide in that particular continent page which user navigated by clicking on the name of the continent from the table. That table shows the list of countries and its data of that particular continent. Also a graphical representation of history data of that continent is also shown.
- **Countries** shows the graph of top 10 worst affected countries, these graph can be configured by the user like what kind of data they want to see in graph (cases, deaths, recovery, active cases) and also can change the graph type.
- A table is available which shows the data of all countries in the world.
- A user can navigate to a seperate page by clicking on the name of the country in the table, that page will show the data in detail with graph (showing the historical data) of that particular country.

## HOW TO RUN THIS PROJECT
- If you decide to run this project in your local system then you can use the git clone command to clone it in your system or you can download the zip file of the code by clicking on the 'Code' green button
- After that run ```npm install``` command to install all the dependencies which is require to run the project
- After that run ```npm start``` to run app in your system.

## TOOLS USED TO DEVELOP THIS PROJECT
- This application is developed using the react library, react bootstrap, react chartjs to display the graph, CSS to style the component and to make responsive
- An API name [**NovelCOVID**](https://documenter.getpostman.com/view/8854915/SzS7R6uu) is used to fetch the raw covid data.
- [**flaticon**](http://flaticon.com/) used as reference for the svg images which is used in the application

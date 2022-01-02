// these below methods are used to calculate the total data of each month from the raw data fetched from other server

// this method will return the set of dates of year 2020
const getYears = (dateArray, year) => {
    const years = dateArray.filter(date => {
        const tempYear = date.slice(date.length-2, date.length)
        if (tempYear === year) {
            return date
        }
        return null
    })
    return years
}

// this method will give the dates of a month of particular year
const getMonth = (year, month) => {
    const months = year.filter(el => {
        const tempMonth = el.slice(0,2)
        if (tempMonth === month) {
            return el
        }
        return null
    })

    return months
}

// this method will calculate the total cases, deaths and recovery rate of a month of that particular year
const getMonthlyData = (datesArray, year, month, cases) => {
    const yearArray = getYears(datesArray, year )
    const monthArray = getMonth(yearArray, month)

    // array of objects consist of daily cases, deaths and recovery of a month
    const monthlyData = monthArray.map(month => {
       const monthlyCases =  cases.cases[month]
       const monthlyDeaths = cases.deaths[month]
       const monthlyRecovered = cases.recovered[month]

       return {
           monthlyCases : monthlyCases,
           monthlyDeaths : monthlyDeaths,
           monthlyRecovered : monthlyRecovered
       }
    })
  
    // fetching the data of the last day of the month as it contains the total data of the month
    const totalMonthlyCases =  monthlyData[monthlyData.length-1].monthlyCases
    const totalMonthlyDeaths = monthlyData[monthlyData.length-1].monthlyDeaths
    const totalMonthlyRecovered = monthlyData[monthlyData.length-1].monthlyRecovered

    return {
        totalCases : totalMonthlyCases,
        totalDeaths : totalMonthlyDeaths,
        totalRecovered : totalMonthlyRecovered
    }
}

export const monthlyDataset = (datesArray, cases) => {
    const months = [
        {id : '1/', month : 'Jan'},
        {id : '2/', month : 'Feb'},
        {id : '3/', month : 'Mar'},
        {id : '4/', month : 'Apr'},
        {id : '5/', month : 'May'},
        {id : '6/', month : 'June'},
        {id : '7/', month : 'July'},
        {id : '8/', month : 'Aug'},
        {id : '9/', month : 'Sept'},
        {id : '10', month : 'Oct'},
        {id : '11', month : 'Nov'},
        {id : '12', month : 'Dec'}
    ]
    const years = ['20', '21']

    // to add new year in the years array
//     const currentYear = new Date().getFullYear().toString()
//     const yearInShort = currentYear.slice(currentYear.length-2, currentYear.length)
//     const findYear = years.find(year => yearInShort === year)
//     if(!findYear) {
//         years.push(yearInShort)
//     }

    let dataset = [] 
    const currentMonth = new Date().getMonth().toString() 
    let changeMonth

    // creating a dataset which is an array consist object with date and data as properties
    // this dataset will contain the total cases, deaths and recovery per month till last month
    for (let j = 0; j < years.length; j++) {
        for (let i = 0; i < months.length; i++) {
            const tempData = getMonthlyData(datesArray, years[j], months[i].id, cases)
            let tempMonthlyCases = 0 
            let tempMonthlyDeaths = 0
            let tempMonthlyRecovered = 0
            let prevTempData
            if (i-1 >= 0) { // if prev month is true
                prevTempData = getMonthlyData(datesArray, years[j], months[i-1].id, cases)
                tempMonthlyCases = tempData.totalCases - prevTempData.totalCases
                tempMonthlyDeaths = tempData.totalDeaths - prevTempData.totalDeaths
                tempMonthlyRecovered = tempData.totalRecovered - prevTempData.totalRecovered

            } else if (i-1 < 0 && j > 0) { // if prev month is false and prev year is true
                prevTempData = getMonthlyData(datesArray, years[j-1], months[months.length-1].id, cases)
                tempMonthlyCases = tempData.totalCases - prevTempData.totalCases
                tempMonthlyDeaths = tempData.totalDeaths - prevTempData.totalDeaths
                tempMonthlyRecovered = tempData.totalRecovered - prevTempData.totalRecovered
            } else if (i-1 < 0) { // if prev month is false
                prevTempData = 0
                tempMonthlyCases = tempData.totalCases - prevTempData
                tempMonthlyDeaths = tempData.totalDeaths - prevTempData
                tempMonthlyRecovered = tempData.totalRecovered - prevTempData
            }
            const dataObject = {
                date : `${months[i].month} ${years[j]}`,
                data : {
                    cases : tempMonthlyCases,
                    deaths : tempMonthlyDeaths,
                    recovered : tempMonthlyRecovered
                }
            }
            dataset.push(dataObject)

            if (currentMonth.length === 1) {
                changeMonth = currentMonth + '/'    
            } else {
                changeMonth = currentMonth
            }

            // this loop will break once the month equals to the current month
            if (months[i].id === changeMonth && years[j] === years[years.length-1]) {
                break;
            }    
        }
    }
    return dataset        
}

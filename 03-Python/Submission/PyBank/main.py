import csv
#assign path
filepath = "PyBank\\Resources\\budget_data.csv"

#assigning variables
totalMonths = 0
totalSum = 0 
changes = []
MonthChanges=[]
prevProfit = 0

#readCSV
with open(filepath, "r") as csvfile:
    csvreader = csv.reader(csvfile, delimiter=',')

   # Storeheader
    csv_header = next(csvreader)
  
    # Read each row of data after the header
    for row in csvreader:
        #counter for months
        totalMonths = totalMonths + 1
        #summing in 2nd row
        totalSum = int(row[1]) + totalSum
    #checks that it is not the first month, calculates change, and stores it.
        if totalMonths > 1 :
             change = int(row[1])- prevProfit
             changes.append(change)
             MonthChanges.append(row[0])
        prevProfit = int(row[1])
#Calculations for analysis
avgChange = sum(changes) / len(changes)
roundedAvgChange = round(avgChange,2)
maxChange = max(changes)
minChange = min(changes)

#finding month for where max and min occured
maxMonthIndx = changes.index(maxChange)
maxMonth = MonthChanges[maxMonthIndx]

minMonthIndx = changes.index(minChange)
minMonth = MonthChanges[minMonthIndx]

#stores descriptive text
analysis = f"""
Financial Analysis
----------------------------
Total Months: {totalMonths}
Total: ${totalSum}
Average  Change: ${roundedAvgChange}
Greatest Increase in Profits: {maxMonth} (${maxChange})
Greatest Decrease in Profits: {minMonth} (${minChange})
"""

print(analysis)

#stores descriptive text into a text file
with open("PyBank\\analysis\\analysis.txt","w") as file:
    file.write(analysis)
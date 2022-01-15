import csv
#assigining path
filepath = "PyPoll\\Resources\\election_data.csv"
#assiging variables and dicationaries
votercount= 0
candidates=[]
candidates_dict = {
    "Khan":0,
    "Correy":0,
    "Li": 0,
    "O'Tooley":0
}
#reading csv
with open(filepath, "r") as csvfile:
    csvreader = csv.reader(csvfile, delimiter=',')
    csv_header = next(csvreader)

    for row in csvreader:
        #counting total votes.
        votercount = votercount + 1
        #selecting unique candidates into list
        if row[2] not in candidates:
                candidates.append(row[2])
    #counting votes for each candidate and placing values in dictionary
        if row[2] == "Khan":
           candidates_dict["Khan"] += 1
        if row[2] == "Correy":
           candidates_dict["Correy"] += 1
        if row[2] == "Li":
           candidates_dict["Li"] += 1
        if row[2] == "O'Tooley":
           candidates_dict["O'Tooley"] += 1

#Calculations for analysis 
khanvotes= candidates_dict["Khan"]
livotes = candidates_dict["Li"]
correyvotes = candidates_dict["Correy"]
tooleyvotes = candidates_dict["O'Tooley"]
percentKhan = round((candidates_dict["Khan"]/votercount)*100)
percentCorrey = round((candidates_dict["Correy"]/votercount)*100)
percentLi = round((candidates_dict["Li"]/votercount)*100)
percentOtooley = round((candidates_dict["O'Tooley"]/votercount)*100)

#looks for winner by using max votes
#https://stackoverflow.com/questions/268272/getting-key-with-maximum-value-in-dictionary
maxVotes = max(candidates_dict, key=candidates_dict.get)




#stores descriptive text of analysis
analysis = f"""text
  Election Results
  -------------------------
  Total Votes: {votercount}
  -------------------------
  Khan: {percentKhan}.000% ({khanvotes})
  Correy: {percentCorrey}.000% ({correyvotes})
  Li: {percentLi}.000% ({livotes})
  O'Tooley: {percentOtooley}.000% ({tooleyvotes})
  -------------------------
  Winner: {maxVotes}
  -------------------------
  """

print(analysis)
#stores descriptive text into text file
with open("PyPoll\\analysis\\analysis.txt","w") as file:
    file.write(analysis)
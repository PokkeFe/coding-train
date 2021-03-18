# - Generate a new coding challenge project folder from template -
import os
import shutil

# Get user input
number = input("What is the coding challenge number? ")
name = input("What is the challenge name? (Proper capitalization) ")

# Process project info
number = "%03d" % int(number)
folderName = number + "-" + name.replace(" ", "-").lower()
projectPath = "coding-challenges/" + folderName + "/"

# Create the directory
os.mkdir("coding-challenges/" + folderName)

# Copy the template files
shutil.copy2("coding-challenges/000-template/index.html", projectPath + "indexTemplate.html")
shutil.copy2("coding-challenges/000-template/sketch.js", projectPath)

# Replace template strings
with open(projectPath + "indexTemplate.html", "rt") as f:
    with open(projectPath + "index.html", "wt") as fo:
        for line in f:
            line = line.replace("[TITLE]",name)
            fo.write(line)

# Delete leftover template files
os.remove(projectPath + "indexTemplate.html")

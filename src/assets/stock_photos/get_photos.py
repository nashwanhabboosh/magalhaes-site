import os

for root, dirs, files in os.walk('.'):
    for file in files:
        filepath = os.path.join(root, file)
        print(filepath)
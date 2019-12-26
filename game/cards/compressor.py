import json
D = {}
for i in range(2,11):
    with open(f'{i}.html', 'r') as file:
        D[i] = ""
        for line in file:
            D[i] = D[i] + line
D = json.dumps(D)
print(D)
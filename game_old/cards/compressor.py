import json
D = {}
l = list(range(2,11)) + ["J", "Q", "K", "A"]
for i in l:
    with open(f'{i}.html', 'r') as file:
        D[i] = ""
        for line in file:
            D[i] = D[i] + line
D = json.dumps(D)
print(D)
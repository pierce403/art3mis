import json

data={}
data['image']="https://art3mis.org/moonman.jpg"

for i in range(1,21):
  data['id']=3
  data['name']="Art3mis Zone "+str(i)
  f=open(str(i)+'.json','w')
  f.write(json.dumps(data))

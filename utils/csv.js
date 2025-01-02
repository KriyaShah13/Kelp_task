
const fs = require('fs');
const csvParser = require('csv-parser');

exports.readCsv = async (filePath) => {
    const results = [];
  
    return new Promise((resolve, reject)=>{
        fs.createReadStream(filePath)
        .pipe(csvParser())
        .on('data', (data) => results.push(data))
        .on('end', ()=>resolve(results))
        .on('error', (error) => {
          reject(error);
        });
    })
  };

function createHierarchyFromObject(obj) {
    const result = {};
  
    for (const path in obj) {
      const parts = path.split('.'); // ["name", "lastName"]
      let current = result; // {'firstName': 'Heet'}
  
      for (let i = 0; i < parts.length; i++) {
        const part = parts[i];
  
        if (i === parts.length - 1) {
          current[part] = obj[path];
        } else {
          current[part] = current[part] || {};
          current = current[part];
        }
      }
    }
  
    return result;
}

exports.convertRawJsonToObject = (rawJson)=>{
    let result = [];
    for(let obj of rawJson){
        let newObject = createHierarchyFromObject(obj);
        result.push(newObject);
    }
    return result;
}

exports.printAgeGroup = (userDetails) => {
  let obj = {
    "< 20": 0,
    "20 to 40": 0,
    "40 to 60": 0,
    "> 60": 0,
  };
  for (const user of userDetails) {
    const age = parseInt(user.age);
    if (age < 20) {
      obj["< 20"] += 1;
    }
    if (age >= 20 && age <= 40) {
      obj["20 to 40"] += 1;
    }

    if (age > 40 && age <= 60) obj["40 to 60"] += 1;

    if (age > 60) obj["> 60"] += 1;
  }

  for(let [key, value] of Object.entries(obj)){
    obj[key] = (obj[key]/userDetails.length)*100;
  }
  console.table(obj);
};
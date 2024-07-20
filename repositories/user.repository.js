const pool = require("../dbConnection");

exports.bulkUploadToDb = async ([...userDetails])=>{
    const insertDetails = userDetails.reduce((str, {...record}, i)=>{
        let {name, age, address} = record;
        delete record.name;
        delete record.age;
        delete record.address;
        let {firstName, lastName} = name;
        str+=`( '${firstName + '' + lastName}', ${age}, '${JSON.stringify(address)}', '${JSON.stringify(record)}' ) `;
        str = str + (userDetails.length - 1 === i ? '' : ', ');
        return str;
    }, '') 
    const str = `Insert into public.users (name, age, address, additional_info) VALUES ${insertDetails}`;
    await pool.query(str);

}
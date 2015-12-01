 var t = '{"firstName": "cyra", "lastName": "richardson", "address": { "streetAddress": "1 Microsoft way", "city": "Redmond", "state": "WA", "postalCode": 98052 },"phoneNumbers": [ "425-777-7777","206-777-7777" ] }';
 // var jsonobj = eval("(" + t + ")");
 var jsonobj = JSON.parse(t);
 console.log(jsonobj.firstName);
 console.log(jsonobj.lastName);
 console.log(jsonobj["address"]);
 console.log(jsonobj.address.streetAddress);
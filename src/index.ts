type imageTestObj = {
  thumbnail: string;
  small: string;
  medium: string;
  large: string;
  xlarge: string;
};
type TestObject = {
  a: {
    b: {
      _id: string;
      name?: string;
      [key: string]: any;
    }[];
    [key: string]: any; // dynamic key type
  };
  value?: string;
  [key: string]: any; // index signature
  images?: imageTestObj;
};
const arrayOperations = (
  obj: TestObject,
  operation: string,
  updateObj: { [key: string]: any }
) => {
  for (const key in updateObj) {
    console.log({ key });
    if (updateObj.hasOwnProperty(key)) {
      const value = updateObj[key];

      const [leftKey, rightKey, newKey] = key.split(".");

      const id = rightKey?.substring(
        rightKey?.indexOf("[") + 1,
        rightKey?.indexOf("]")
      );
    //  If Id is present
      if (id) {
        if (newKey && value) {
          
          const item = obj.a.b.find((item) => item?._id === id);
          if (item) {
            if (newKey in item) {
              delete item[newKey];
            }
            let newObject = { [newKey]: value };

            // change the item with the object given
            Object.assign(item, newObject);
            // return obj
          }
        } else if (!newKey && value) {
       
          const item = obj.a.b.find((item) => item?._id === id);
          if (item) {
            // remove name object
            delete item.name;
            // change the item with the object given
            Object.assign(item, updateObj[key]);
            // return obj;
          }
        } else if (!newKey && !value) {
  
        obj.a.b= obj?.a?.b?.filter((item) => item?._id !== id);
       
        }
      } else {
        if (rightKey && rightKey !== "b" && value) {
         
          if (obj.hasOwnProperty("a")) {
            
            let keyName = rightKey.includes("[]")
              ? rightKey.replace("[]", "")
              : rightKey;
              if(leftKey!=='a'){
            if (typeof obj.a[leftKey] === "undefined") {
              obj.a[leftKey] = {};
            }
            if (!newKey) {
              
           
             
              obj.a[leftKey][keyName] = [value];
              
            } else {
              // console.log("inside 2", leftKey, rightKey, newKey, value);
              if (typeof obj.a[leftKey][keyName] === "undefined") {
                obj.a[leftKey][keyName] = {};
              }
              obj.a[leftKey][keyName][newKey] = value;
            }

            // let keyName=rightKey.replace('[]','')
            // obj.a[leftKey][keyName]=[value]

            // obj.a[leftKey][rightKey.replace('[]','')]=[value]
          }
          else{
          
              obj.a[keyName]=value
              
          }
        }
        } else if (!newKey && rightKey && rightKey !== "b" && value) {
         

          if (rightKey) {
            obj.a[rightKey] = value;
          } else {
            obj.a[leftKey] = value;
          }

          // return obj
        } else if (!rightKey && leftKey && !value) {
       
          delete obj.value;
          // return obj
        } else if (leftKey && leftKey.includes("[]")) {
          // console.log("here1")
          obj.a[leftKey.replace("[]", "")] = [value];
        } else {
          if (leftKey === "images") {
          
            obj.images = value;
          } else {
            if (value && typeof value === "object") {
              // console.log("inside 5");
              obj.a.b.push(value);
              // return obj;
            } else if (!value) {
            
              // console.log("inside 6");
              delete obj[leftKey][rightKey];
              //  return obj
            }
          }
        }
      }
    }
  }
  return obj;
};

let obj = {
  a: {
    b: [
      { _id: "5dc0ad700000000000000000", name: "asdf1" },
      { _id: "5dc0ad700000000000000001", name: "asdf2" },
      { _id: "5dc0ad700000000000000002", name: "asdf3" },
    ],
    c: "hallo",
  },
  value: "hui",
};
const updateArrayObject = {
  "a.b[5dc0ad700000000000000000]": { title: "asdf1-updated" },
};
const updateArrayValue = {
  "a.b[5dc0ad700000000000000000].newValue": "asdf1-updated",
};
const newArray = {
  "a.b[]": { _id: "5dc0ad700000000000000004", name: "H20" },
};
const removeObj = {
  "a.b[5dc0ad700000000000000001]": null,
};
const objectValue = {
  "a.c": "new-key-added",
};
const changeObjectValue = {
  "a.c": "hallo-changed",
};
const unsetRootObject = {
  value: null,
};
const unsetRegularObject = {
  "a.b": null,
};
const multipleOperations = {
  value: null,
  something: "anything",
  "a.c": "new value updated",
};
const addArrayObject = {
  "x[]": "asdfX",
  "v.x[]": "asdfV",
  "v.m.l": "asdf-val",
  "v.m.m": "asdf-valm",
};
const imageObj = {
  a: {
    b: [
      { _id: "5dc0ad700000000000000000", name: "asdf1" },
      { _id: "5dc0ad700000000000000001", name: "asdf2" },
      { _id: "5dc0ad700000000000000002", name: "asdf3" },
    ],
  },
  value: "hui",
  images: {
    thumbnail:
      "http://files-test.hokify.com/user/pic_5b30ac932c6ba6190bfd7eef_1573477587288.jpg",
    small:
      "http://files-test.hokify.com/user/pic_5b30ac932c6ba6190bfd7eef_1573477587288.jpg",
    medium:
      "http://files-test.hokify.com/user/pic_5b30ac932c6ba6190bfd7eef_1573477587288.jpg",
    large:
      "http://files-test.hokify.com/user/pic_5b30ac932c6ba6190bfd7eef_1573477587288.jpg",
    xlarge:
      "http://files-test.hokify.com/user/pic_5b30ac932c6ba6190bfd7eef_1573477587288.jpg",
  },
};
const imgUpdateObj = {
  images: {
    thumbnail:
      "http://files-test.hokify.com/user/pic_5b30ac932c6ba6190bfd7eef_1573480304827.jpg",
    small:
      "http://files-test.hokify.com/user/pic_5b30ac932c6ba6190bfd7eef_1573480304827.jpg",
    medium:
      "http://files-test.hokify.com/user/pic_5b30ac932c6ba6190bfd7eef_1573480304827.jpg",
    large:
      "http://files-test.hokify.com/user/pic_5b30ac932c6ba6190bfd7eef_1573480304827.jpg",
    xlarge:
      "http://files-test.hokify.com/user/pic_5b30ac932c6ba6190bfd7eef_1573480304827.jpg",
  },
};
// const change_array_object=  arrayOperations(obj,"change_array_object",updateArrayObject)
// console.log(JSON.stringify(change_array_object));

// const change_array_value=  arrayOperations(obj,"change_array_value",updateArrayValue)
//  console.log(JSON.stringify(change_array_value));

// const add_an_entry=  arrayOperations(obj,"add_an_entry",newArray)
//  console.log(JSON.stringify(add_an_entry));

// const remove_an_entry=  arrayOperations(obj,"remove_an_entry",removeObj)
//  console.log(JSON.stringify(remove_an_entry));

// const add_object_value=  arrayOperations(obj,"add_object_value",objectValue)
//  console.log(JSON.stringify(add_object_value));
// const change_object_value=  arrayOperations(obj,"change_object_value",changeObjectValue)
//  console.log(JSON.stringify(change_object_value));

// const unset_root_level_value=  arrayOperations(obj,"unset_root_level_value",unsetRootObject)
//  console.log(JSON.stringify(unset_root_level_value));
//  ouput

// const unset_regular_object=  arrayOperations(obj,"unset_regular_object",unsetRegularObject)
//  console.log(JSON.stringify(unset_regular_object));

// const multiple_operations=  arrayOperations(obj,"multiple_operations",multipleOperations)
//  console.log(JSON.stringify(multiple_operations));
// const add_array_operations=  arrayOperations(obj,"add_array_operations",addArrayObject)
//  console.log(JSON.stringify(add_array_operations));
// const update_img_array = arrayOperations(obj, "update_img", imgUpdateObj);
// console.log(JSON.stringify(update_img_array));

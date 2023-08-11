//Packages
const path = require("path")
const yaml = require("js-yaml");
const fs = require("fs");

///Set path for file directory and push file directory names to an array.
const basePath = "../sde"
const jsonFiles = []
function fileList (filePath){
    const f = []
    for (const file of fs.readdirSync(filePath)){
        if(fs.lstatSync(path.join(filePath, file)).isDirectory()) {
            f.push(...fileList(path.join(filePath, file)))
        } else {
            if(![".yaml",".staticdata"].includes(path.parse(file).ext))
            continue;
            f.push(path.join(filePath, file))
        }
    }
    return f
}

jsonFiles.push(...fileList(basePath))

//Convert all files from directory to JSON
function massConvert (files) {
    files.forEach(element => {
        console.log(element)

        const yamlFile = fs.readFileSync(element, "utf-8")
        const yamlToJSON = yaml.load(yamlFile)

        const noextension = path.join(path.parse(element).dir,path.parse(element).name)

        fs.writeFileSync(`${noextension}.json`, JSON.stringify(yamlToJSON), "utf-8")

    });
    return 
}

massConvert(jsonFiles)
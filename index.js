// requirements
const express = require("express");
const path = require("path");
const fs = require("fs");

app = express();

// debug
console.log("Project folder: ", __dirname);
console.log("Path to index.js: ", __filename);
console.log("Path to working directory: ",  process.cwd());

app.set("view engine", "ejs")

obGlobal={
    obErrors:null
}

vect_foldere = ["temp", "temp1"]
for (let folder of vect_foldere){
    let folder_path = path.join(__dirname, folder)

    if (!fs.existsSync(folder_path)) fs.mkdirSync(folder_path)
}

// Error handling
function initErrors(){
    let content = fs.readFileSync(path.join(__dirname,"resource/json/errors.json")).toString("utf-8");

    obGlobal.obErrors=JSON.parse(content)

    obGlobal.obErrors.default_error.image=path.join(obGlobal.obErrors.default_path, obGlobal.obErrors.default_error.image)
    for (let error of obGlobal.obErrors.info_errors){
        error.image=path.join(obGlobal.obErrors.default_path, error.image)
    }
    console.log(obGlobal.obErrors)

}

function showError(res, identifier, title, text, image){
    let error= obGlobal.obErrors.info_errors.find(function(elem){
                return elem.identifier===identifier
            });
    let customTitle, customText, customImage
    if(error){
        if(error.status)
            res.status(identifier)
        customTitle=title || error.title;
        customText=text || error.text;
        customImage=image || error.image;


    }
    else{
        const err = obGlobal.obErrors.default_error;
        customTitle=title || err.title;
        customText=text || err.text;
        customImage=image || err.image;
    }
    res.render("pages/error", {
        title: customTitle,
        text: customText,
        image: customImage
    })
}

initErrors()

// static directories
app.use("/resource", express.static(path.join(__dirname, "resource")))
app.use("/node_modules", express.static(path.join(__dirname, "node_modules")))

// access home page
app.get(["/", "/home", "/index"], function(req, res){
    res.render("pages/index", {ip:req.ip});
})

app.get("/about", function(req, res){
    res.render("pages/about");
})

app.get("/favicon.ico", function(req, res){
    res.sendfile(path.join(__dirname, "resource/images/favicon/favicon.ico"));
})

app.get(/^\/resource\/[a-zA-Z0-9_\/]*$/, function(req, res){
    showError(res, 403);
})

app.get("/*.ejs", function(req, res){
    showError(res, 400);
})

// default route
app.get("/*", function(req, res){
    try{
        res.render("pages" + req.url, function(err, rezultatRandare){
            if (err){
                if(err.message.startsWith("Failed to lookup view")){
                    showError(res, 404);
                }
                else{
                    showError(res);
                }
            }
            else{
                console.log(rezultatRandare);
                res.send(rezultatRandare);
            }
        });
    }catch(errRandare){
        if (errRandare){
            if(errRandare.message.startsWith("Cannot find module")){
                showError(res, 404);
            }
            else{
                showError(res);
            }
        }
    }
})

app.listen(8080);
console.log("The server is up! :D")



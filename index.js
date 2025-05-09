"use strict";

// requirements
const express = require("express");
const path = require("path");
const fs = require("fs");
const sharp = require("sharp");

let app = express();

// debug
console.log("Project folder: ", __dirname);
console.log("Path to index.js: ", __filename);
console.log("Path to working directory: ",  process.cwd());

app.set("view engine", "ejs")

let obGlobal={
    obErrors:null,
    obImages:null
}

let directories_vector = ["temp", "temp1"]
for (let folder of directories_vector){
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
initErrors();

function initImages(){
    var content = fs.readFileSync(path.join(__dirname,"resource/json/gallery.json")).toString("utf-8");

    obGlobal.obImages=JSON.parse(content)
    let vImages = obGlobal.obImages.images;

    let absPath = path.join(__dirname,obGlobal.obImages.gallery_path);
    let absPathMedium = path.join(__dirname,obGlobal.obImages.gallery_path,"medium");

    if(!fs.existsSync(absPathMedium)) fs.mkdirSync(absPathMedium);

    for (let image of vImages){
        let [fileName, ext] = image.file.split("/");

        let absFilePath = path.join(absPath, image.file);
        let absMediumFilePath = path.join(absPathMedium, fileName+".webp");

        sharp(absFilePath).resize(300).toFile(absMediumFilePath);
        image.medium_file=path.join("/", obGlobal.obImages.gallery_path, "medium", fileName+".webp");
        image.file=path.join("/", obGlobal.obImages.gallery_path, image.file);
    }
    console.log(obGlobal.obImages);
}
initImages();

// static directories
app.use("/resource", express.static(path.join(__dirname, "resource")))
app.use("/node_modules", express.static(path.join(__dirname, "node_modules")))

// access home page
app.get(["/", "/home", "/index"], function(req, res){
    res.render("pages/index", {ip:req.ip, images:obGlobal.obImages.images});
})

app.get("/about", function(req, res){
    res.render("pages/about");
})

app.get("/gallery", function(req, res){
    res.render("pages/galleryPage", {images:obGlobal.obImages.images});
})

app.get("/favicon.ico", function(req, res){
    res.sendFile(path.join(__dirname, "resource/images/favicon/favicon.ico"));
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
        res.render("pages" + req.url, function(err, renderResult){
            if (err){
                if(err.message.startsWith("Failed to lookup view")){
                    showError(res, 404);
                }
                else{
                    showError(res);
                }
            }
            else{
                console.log(renderResult);
                res.send(renderResult);
            }
        });
    }catch(errRendering){
        if (errRendering){
            if(errRendering.message.startsWith("Cannot find module")){
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



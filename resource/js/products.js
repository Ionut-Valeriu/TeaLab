window.onload= function(){
    btn=document.getElementById("filtering");
    btn.onclick=function(){
        /////////////// VALIDATION ///////////////
        let inpName= document.getElementById("inp-name").value.trim().toLowerCase();
        let ingredient_choice = document.getElementById("ingredient-choice").value.trim().toLowerCase();
        let textareaKeywords = document.getElementById("filter-textarea").value
            .trim().toLowerCase()
            .split(",")
            .filter(word => word.length > 0);

        let errors = [];

        // Check for numbers in name
        if ((/^[0-9]+$/).test(inpName)) {
            document.getElementById("inp-name").value = "";
            errors.push("Name must not contain numbers.");
        }

        // Check for numbers in textarea
        if (textareaKeywords.some(word => (/^[0-9]+$/).test(word))) {
            errors.push("Textarea must not contain numbers.");
        }

        // Validate ingredient choice
        if (ingredient_choice != ""){
            let allowedIngredients = Array.from(document.querySelectorAll("#tea-ingredients option"))
                .map(opt => opt.value.trim().toLowerCase());
            if (!allowedIngredients.includes(ingredient_choice)) {
                ingredient_choice = document.getElementById("ingredient-choice").value="";
                errors.push("Ingredient choice must match a listed ingredient.");
            }
        }


        // Show errors or continue
        if (errors.length > 0) {
            alert(errors.join("\n"));
            return;
        }




        /////////////// INPUT ///////////////

        ///// NAME /////
        // let inpName= document.getElementById("inp-name").value.trim().toLowerCase()
        const nameLen = inpName.length;
        const freqInpName = {};
        for (const ch of inpName.toLowerCase()) {
            freqInpName[ch] = (freqInpName[ch] || 0) + 1;
        }

        ///// PRICE /////
        let inpPrice = parseFloat(document.getElementById("inp-price").value);

        ///// INGREDIENTS /////
        // let ingredient_choice = document.getElementById("ingredient-choice").value.trim().toLowerCase();

        ///// QUANTITY /////
        let vectRadio=document.getElementsByName("gr_rad")
        let inpQuantity=null
        let minQuantity=null
        let maxQuantity=null
        for (let rad of vectRadio){
            if (rad.checked){
                inpQuantity=rad.value
                if (inpQuantity != "all"){
                    [minQuantity,maxQuantity]=inpQuantity.split(":")
                    minQuantity=parseInt(minQuantity)
                    maxQuantity=parseInt(maxQuantity)
                }
                break
            }
        }

        ///// RISK /////
        const checkbox = document.getElementById("inp-risk").checked;

        ///// TEXTAREA /////
        // let textareaKeywords = document.getElementById("filter-textarea").value
        //     .trim().toLowerCase()
        //     .split(",")
        //     .filter(word => word.length > 0);

        ///// CATEGORY /////
        let inpCategory= document.getElementById("inp-category").value.trim().toLowerCase()
        
        ///// ORIGIN /////
        const selectOrigin = document.getElementById("select-origin");
        const selectedOrigins = Array.from(selectOrigin.selectedOptions).map(opt => opt.value.trim().toLowerCase());

        ///// CHECKBOX /////
        let ingredientFilter = document.getElementsByClassName("ingredients-filter");
        let yesList = [];
        let noList = [];
        for (let div of ingredientFilter){
            let checkbox = div.getElementsByTagName("input")[0];
            if (checkbox.checked) {
                let ingredient = checkbox.value.trim().toLowerCase();
                let radio1 = div.getElementsByTagName("input")[1];
                if (radio1.checked) {
                    yesList.push(ingredient);
                } else {
                    noList.push(ingredient);
                }
            }
        }



        /////////////// CHECK ///////////////
        let products= document.getElementsByClassName("product")
        for (let prod of products){
            prod.style.display="none";

            ///// NAME /////
            let name=prod.getElementsByClassName("val-name")[0].innerHTML.trim().toLowerCase()
            const trunkName = name.substring(0, nameLen);
            const freqName = {};
            for (const ch of trunkName.toLowerCase()) {
                freqName[ch] = (freqName[ch] || 0) + 1;
            }

            let diff = 0;
            const allChars = new Set([...Object.keys(freqInpName), ...Object.keys(freqName)]);
            for (const ch of allChars) {
                const countA = freqInpName[ch] || 0;
                const countB = freqName[ch] || 0;
                diff += Math.abs(countA - countB);
            }
            const cond1= diff <= 2;
            
            ///// PRICE /////
            let price = parseFloat(prod.getElementsByClassName("val-price")[0].innerHTML.trim())
            const cond2 = (price <= inpPrice)

            ///// INGREDIENTS /////
            let ingredients = Array.from(prod.getElementsByClassName("val-ingredient"))
                .map(span => span.textContent.toLowerCase().trim());
            const cond3 = ingredient_choice === "" || ingredients.includes(ingredient_choice);

            ///// QUANTITY /////
            let quantity=parseInt(prod.getElementsByClassName("val-quantity")[0].innerHTML.trim())
            const cond4 = inpQuantity=="all" || (minQuantity<=quantity && quantity<maxQuantity);
            
            ///// RISK /////
            let risk = prod.getElementsByClassName("val-risk")[0].innerHTML.trim().toLowerCase();
            const cond5 = !checkbox || risk == "no";
            
            ///// TEXTAREA /////
            let cond6 = textareaKeywords.length === 0;
            for (let keyword of textareaKeywords){
                if (name.startsWith(keyword) || name.includes(keyword) || ingredients.includes(keyword))
                {
                    cond6 = true;
                    break;
                }
            }

            ///// CATEGORY /////
            let category=prod.getElementsByClassName("val-category")[0].innerHTML.trim().toLowerCase()
            let cond7 =  (inpCategory=="all" || inpCategory==category)
            
            ///// ORIGIN /////
            let origin = prod.getElementsByClassName("val-origin")[0].innerHTML.trim().toLowerCase();
            const cond8 = selectedOrigins.includes(origin) || selectedOrigins.length == 0;

            ///// CHECKBOXES /////
            let cond9 = true;
            for (let ingr of yesList) {
                if (!ingredients.includes(ingr))
                {
                    cond9 = false;
                    break;
                }
            }
            for (let ingr of noList) {
                if (ingredients.includes(ingr))
                {
                    cond9 = false;
                    break;
                }
            }



            ///// ALL CHECKS /////
            if (cond1 && cond2 && cond3 && cond4 && cond5 && cond6 && cond7 && cond8 && cond9) {
                prod.style.display="block";
            }
        }

    }

    /////////////// UPDATE PRICE ///////////////
    document.getElementById("inp-price").oninput=function(){
        document.getElementById("infoRange").innerHTML=`( ${this.value} )`
    }

    /////////////// RESET ///////////////
    document.getElementById("reset").onclick=function(){
        if (!confirm("You sure resetting filters?")) return;

        ///// NAME /////
        document.getElementById("inp-name").value="";
        ///// PRICE /////
        document.getElementById("inp-price").value =
            document.getElementById("inp-price").max;
        document.getElementById("infoRange").innerHTML =
            "( " + document.getElementById("inp-price").max + " ) ";
        ///// INGREDIENTS /////
        document.getElementById("ingredient-choice").value="";
        ///// QUANTITY /////
        document.getElementById("i_rad4").checked=true;
        ///// RISK /////
        document.getElementById("inp-risk").checked=false;
        ///// TEXTAREA /////
        document.getElementById("filter-textarea").value="";
        ///// SIMPLE SELECT /////
        document.getElementById("inp-category").value="all";
        ///// ORIGIN /////
        const selectOrigin = document.getElementById("select-origin");
        for (let opt of selectOrigin.options) {
            opt.selected = false;
        }
        ///// CHECKBOXES /////
        let ingredientDivs = document.getElementsByClassName("ingredients-filter");
        for (let div of ingredientDivs) {
            let inputs = div.getElementsByTagName("input");
            for (let input of inputs) {
                if (input.type === "checkbox") {
                    input.checked = false;
                }
                if (input.type === "radio") {
                    input.checked = (input.value === "yes");
                }
            }
        }




        let products= document.getElementsByClassName("product")
        for (let prod of products){
            prod.style.display="block";
        }
    }



    document.getElementById("sortAscName").onclick=function(){
        sorteaza(1)
    }
    document.getElementById("sortDescName").onclick=function(){
        sorteaza(-1)
    }

    function sorteaza(semn){
        let products= document.getElementsByClassName("product");
        let vectProducts= Array.from(products);
        vectProducts.sort(function(a,b){
            let quantA =parseInt(a.getElementsByClassName("val-quantity")[0].innerHTML.trim());
            let priceA=parseFloat(a.getElementsByClassName("val-price")[0].innerHTML.trim());
            let quantB =parseInt(b.getElementsByClassName("val-quantity")[0].innerHTML.trim());
            let priceB=parseFloat(b.getElementsByClassName("val-price")[0].innerHTML.trim());
            if (quantA/priceA != quantB/priceB){
                return semn*(quantA/priceA - quantB/priceB)
            }
            let subA=a.getElementsByClassName("val-sub")[0].innerHTML.trim().toLowerCase()
            let subB=b.getElementsByClassName("val-sub")[0].innerHTML.trim().toLowerCase()
            return semn*subA.localeCompare(subB)
        })
        for (let prod of vectProducts){
            prod.parentNode.appendChild(prod);
        }

    }


    window.onkeydown=function(e){
        console.log(e)
        if (e.key=="c" && e.altKey){
            let products= document.getElementsByClassName("product")
            let sumapriceuri=0
            for (let prod of products){
                if(prod.style.display!="none"){
                    let price=parseFloat(prod.getElementsByClassName("val-price")[0].innerHTML.trim())
                    sumapriceuri+=price
                }
            }
            if(!document.getElementById("sum_price")){
                let pRezultat=document.createElement("p") //<p></p>
                pRezultat.innerHTML=sumapriceuri //<p>sumapriceuri</p>
                pRezultat.id="sum_price"
                let p= document.getElementById("p-sum")
                p.parentNode.insertBefore(pRezultat, p.nextElementSibling)
                setTimeout(function(){
                    let p1=document.getElementById("sum_price")
                    if(p1){
                        p1.remove()
                    }
                }, 2000)
            }
        }
    }

}

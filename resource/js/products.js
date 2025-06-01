window.onload= function(){
    btn=document.getElementById("filtering");
    btn.onclick=function(){
        let inpName= document.getElementById("inp-name").value.trim().toLowerCase()

        let vectRadio=document.getElementsByName("gr_rad")

        let inpQuantity=null
        let minQuantity=null
        let maxQuantity=null
        for (let rad of vectRadio){
            if (rad.checked){
                inpQuantity=rad.value
                if (inpQuantity != "all"){
                    [minQuantity,maxQuantity]=inpQuantity.split(":") //"350:700" -> ["350","700"]
                    minQuantity=parseInt(minQuantity) //"350" -> 350
                    maxQuantity=parseInt(maxQuantity)
                }
                break
            }
        }

        let inpPrice= document.getElementById("inp-price").value

        let inpCategory= document.getElementById("inp-category").value.trim().toLowerCase()

        let products= document.getElementsByClassName("product")
        for (let prod of products){
            prod.style.display="none";
            let name=prod.getElementsByClassName("val-name")[0].innerHTML.trim().toLowerCase()
            let cond1= name.startsWith(inpName)


            let quantity=parseInt(prod.getElementsByClassName("val-quantity")[0].innerHTML.trim())

            let cond2= (inpQuantity=="all" || (minQuantity<=quantity && quantity<maxQuantity) )

            let price=parseFloat(prod.getElementsByClassName("val-price")[0].innerHTML.trim())
            let cond3 = (inpPrice <= price)

            let category=prod.getElementsByClassName("val-category")[0].innerHTML.trim().toLowerCase()
            let cond4 =  (inpCategory=="all" || inpCategory==category)

            if (cond1 && cond2 && cond3 && cond4){
                prod.style.display="block";
            }
        }

    }

    document.getElementById("inp-price").onchange=function(){
        document.getElementById("infoRange").innerHTML=`(${this.value})`
    }

    document.getElementById("reset").onclick=function(){
        document.getElementById("inp-name").value=""

        let products= document.getElementsByClassName("product")

        document.getElementById("i_rad4").checked=true;

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
        vectProducts.sort(function(a,b){ // a si b sunt <article>
            let priceA=parseFloat(a.getElementsByClassName("val-price")[0].innerHTML.trim())
            let priceB=parseFloat(b.getElementsByClassName("val-price")[0].innerHTML.trim())
            if (priceA!=priceB){
                return semn*(priceA-priceB)
            }
            // aici priceA==priceB
            let nameA=a.getElementsByClassName("val-name")[0].innerHTML.trim().toLowerCase()
            let nameB=b.getElementsByClassName("val-name")[0].innerHTML.trim().toLowerCase()
            return semn*nameA.localeCompare(nameB)
        })
        for (let prod of vectProducts){
            prod.parentNode.appendChild(prod);
        }

    }


    window.onkeydown=function(e){
        console.log(e)
        if (e.key=="c" && e.altKey){
            let products= document.getElementsByClassName("product")
            sumapriceuri=0
            for (let prod of products){
                if(prod.style.display!="none"){
                    let price=parseFloat(prod.getElementsByClassName("val-price")[0].innerHTML.trim())
                    sumapriceuri+=price
                }
            }
            if(!document.getElementById("suma_priceuri")){
                let pRezultat=document.createElement("p") //<p></p>
                pRezultat.innerHTML=sumapriceuri //<p>sumapriceuri</p>
                pRezultat.id="suma_priceuri"
                let p= document.getElementById("p-suma")
                p.parentNode.insertBefore(pRezultat, p.nextElementSibling)
                setTimeout(function(){
                    let p1=document.getElementById("suma_priceuri")
                    if(p1){
                        p1.remove()
                    }
                }, 2000)
            }
        }
    }

}

//***********************************/
//*        CHECKOUT APP
//***********************************/

//! Donguler ile event tanımlamak mümkündür ancak fazla sayida event fazla tuketimi demektir. Bunun yerine bubbling ile parent elementler tek bir event tanımlanarak aşağıdaki elementlerin eventler yakalabilir. Yakalan event event.target ile ayrıştırılabilir.
// function createEventsForPlusMinus() {
//   const minusBtns = document.querySelectorAll(".fa-minus")
//   const plusBtns = document.querySelectorAll(".fa-plus")

//   console.log(minusBtns)
//   console.log(plusBtns)

//   minusBtns.forEach((minus) => {
//     minus.addEventListener("click", () => {
//       //? Eksilme islemleri
//     })
//   })

//   plusBtns.forEach((plus) => {
//     plus.addEventListener("click", () => {
//       //? Arttirma islemleri
//     })
//   })
// }


//!constants
const FREE_SHİPPİNG_LIMIT=3000// constant olduğu için yani sabit olduğudndan büyük harf yapılırmış
const SHIPPING_PRİCE=25.99
const TAX_RATE=0.18
//? Selectors
const deleteAllBtn= document.querySelector(".delete-div .fa-trash-can")
const products= document.querySelector("article.products")








//? EVENT HANDLERS
deleteAllBtn.addEventListener("click", ()=>{
    products.textContent= "NO PRODUCT"
    products.classList.add("no-product")// css de hazırlanan stili verdik böyle
    // document.querySelector(".delete-div").style.display="none"//!alttakinin alternatifi burada domdan kalkmıyor
    document.querySelector(".delete-div").remove()// bunda silinen div domdan komple kalkıyor yapı bozulabilir dikkat et!
    calculateTotalPrice()


})
products.addEventListener("click",(e)=>{
    if (e.target.classList.contains("fa-plus")) {
        // const discountedPrice=document.getElementById("discounted-price")
        // console.log(discountedPrice.innerText);
        //!traversing Dom ile yapmak gerek yoksa hepsinde yapmıyor!!!! dikkat!!!
        e.target.previousElementSibling.textContent++
    }else if (e.target.classList.contains("fa-minus")){
        if(e.target.nextElementSibling.textContent>1){        
        e.target.nextElementSibling.textContent--
    }}else if (e.target.classList.contains("fa-trash-can")){
        e.target.closest(".product").remove()
        // product.classList.add("no-product")

    }

    calculatePrice(e.target)



})

const calculatePrice = (btn) => {
    const discountedPrice = btn
      .closest(".product-info")
      .querySelector("#discounted-price")
  
    const productPrice = btn
      .closest(".buttons-div")
      .querySelector("#product-price")
  
    const quantity = btn.parentNode.querySelector("#quantity")
  
    productPrice.textContent = (
      quantity.textContent * discountedPrice.textContent
    ).toFixed(2)
  
   calculateTotalPrice()
  }
  
const calculateTotalPrice= ()=>{
    const prices=document.querySelectorAll("#product-price")
    const total=[...prices].reduce((sum,price)=>sum+Number(price.textContent),0)
    


    const shippingPrice=total>=FREE_SHİPPİNG_LIMIT || total===0 ? 0.00 : SHIPPING_PRİCE
    
    const taxPrice= total * TAX_RATE

    const sum= total + taxPrice+shippingPrice
    //!DOM'a yazdırma
    const selectedPrice=document.querySelector("#selected-price")
    selectedPrice.textContent=total.toFixed(2)
    document.getElementById("shipping").textContent=shippingPrice.toFixed(2)
    document.getElementById("tax").textContent=taxPrice.toFixed(2)
    document.getElementById("total").textContent=sum.toFixed(2)
}
window.addEventListener("load",()=>{
    calculateTotalPrice()
})
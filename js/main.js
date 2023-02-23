var inputname = document.getElementById('name');
var inputurl = document.getElementById('url');
var nameError =document.getElementById('nameError');
var urlError =document.getElementById('urlError');



var allbookmark = [];

if ( localStorage.getItem('allbookmark') != null ) {
    allbookmark = JSON.parse( localStorage.getItem('allbookmark') ) ;
    displayform();
}

function submit(){

   if ( validatename() && validateurl() ) {
        var bookmark = {
            name:inputname.value,
            url: inputurl.value ,
        }

        allbookmark.push(bookmark);

        localStorage.setItem('allbookmark' , JSON.stringify( allbookmark ) );

        clearform();
        displayform();
   }
   else if (validatename() == false ) {
        nameError.classList.replace('d-none' ,'d-block' );
   }
   else if (validateurl() == false) {
        urlError.classList.replace('d-none' ,'d-block' );
    }else{
        nameError.classList.replace('d-none' ,'d-block' );
        urlError.classList.replace('d-none' ,'d-block' );

    } 
}

function displayform(){

    var cartona = "" ;

    for(var i = 0  ;  i < allbookmark.length ; i++ ){

        cartona +=  `
            <div class="data " >
                <h4>${allbookmark[i].name}</h4>
                <a href="${allbookmark[i].url}" target="_blank" class="btn btn-info px-3 py-2 text-white">Visit</a>
                <button class="btn btn-danger" onclick="deleteform(${ i })">Delete</button>
            </div>  
        `
    }

    document.getElementById("data").innerHTML= cartona;
}

function clearform(){
    inputname.value = "" ;
    inputurl.value = "" ;
    nameError.classList.replace('d-block' ,'d-none' );
    urlError.classList.replace('d-block' ,'d-none' );
}

function deleteform(index){
    allbookmark.splice( index , 1);
    displayform();
    localStorage.setItem('allbookmark' , JSON.stringify(allbookmark));
}

function validatename(){
    var regexpName = /^[a-z]{3,}$/i;
    return regexpName.test( inputname.value ) ;
    
}
function validateurl(){
    var regexpUrl = /(?:https?):\/\/(\w+:?\w*)?(\S+)(:\d+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/;
    return regexpUrl.test( inputurl.value ) ;  
}

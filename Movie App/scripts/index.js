
import navbar from './components/navbar.js';

document.querySelector("#navbar").innerHTML=navbar();


document.querySelector("#search_box").addEventListener("input",function(){

  debounce(movie_data_on_search, 1000);
});



let movies_image_arr=["https://img1.hotstarext.com/image/upload/f_auto,t_web_m_1x/sources/r1/cms/prod/4831/1374831-h-13b22eedb0fa","https://img1.hotstarext.com/image/upload/f_auto,t_web_m_1x/sources/r1/cms/prod/old_images/MOVIE/7393/1000087393/1000087393-h","https://img1.hotstarext.com/image/upload/f_auto,t_web_m_1x/sources/r1/cms/prod/old_images/MOVIE/4189/1000074189/1000074189-h","https://img1.hotstarext.com/image/upload/f_auto,t_web_m_1x/sources/r1/cms/prod/1331/641331-h","https://img1.hotstarext.com/image/upload/f_auto,t_web_m_1x/sources/r1/cms/prod/700/600700-h"];




let movies_info_arr=[

{
    name:"Prey",
    type:"Action . 2022",
    desc:"Set in the Comanche Nation 300 years ago, this is the story of Naru, a fierce and skilled warrior, who hunts an alien predator with a technically advanced arsenal."
}
,

{
    name:"Hate Story 3",
    type:"Hindi . Thriller . 2015",
    desc:"Climbing up the success ladder, Aditya, a businessman makes many enemies. Now, one of them is back to seek revenge."
}
,
{
    name:"Drishyam",
    type:"Hindi . Thriller . 2015",
    desc:"Story of a common family man who takes desperate measures to save his wife and two daughters when they unwittingly get entangled into a crime."
}
,
{
    name:"Chhichhore",
    type:"Hindi . Drama . 2019",
    desc:"Divided by time, united by a tragic incident. In a bittersweet reunion, seven middle-aged friends take a walk down the memory lane at the least expected place."
}
,
{
    name:"Arjun Reddy",
    type:"Hindi . Romance . 2017",
    desc:"A short-tempered yet brilliant young medical surgeon immerses himself in drugs and alcohol when his lady-love is forced to marry someone else."
}

];


let img_tag=document.createElement("img");
let div_tag=document.createElement("div");
div_tag.setAttribute("id","movies_info");
let h1_tag=document.createElement("h1");
let h2_tag=document.createElement("h2");
let p_tag=document.createElement("p");



h1_tag.innerText=movies_info_arr[0].name;
h2_tag.innerText=movies_info_arr[0].type;
p_tag.innerText=movies_info_arr[0].desc;

div_tag.append(h1_tag,h2_tag,p_tag);



img_tag.setAttribute("src",movies_image_arr[0]);

document.querySelector("#carousel").append(div_tag,img_tag);


let i=1;

let slider_interval=setInterval(function(){


h1_tag.innerText=movies_info_arr[i].name;
h2_tag.innerText=movies_info_arr[i].type;
p_tag.innerText=movies_info_arr[i].desc;

div_tag.append(h1_tag,h2_tag,p_tag);


img_tag.setAttribute("src",movies_image_arr[i]);

document.querySelector("#carousel").append(div_tag,img_tag);
i++

if(i==5)
{
    i=0;
}
  
    
},5000);

let rating_arr1=[2.3, 8.7, 5.8, 4.4, 9, 9.5, 8.6, 7.2, 9.9, 3.8];
let rating_arr2=[7.8, 1.8, 3.3, 10, 4, 4.4, 8.9, 7.1, 9.6, 2];
 
  async function movie_data(){
     
    let query="hollywood";
    
   let ans= await fetch(`https://www.omdbapi.com/?apikey=cfc3a8b9&s=${query}`);
   let data=await ans.json();
   store_data(data.Search,rating_arr1);
   //append(data.Search,rating_arr1);

   setTimeout(function(){
  
    append(data.Search,rating_arr1)
  
  },3000);

   query="indian";
    
   ans= await fetch(`https://www.omdbapi.com/?apikey=cfc3a8b9&s=${query}`);
   data=await ans.json();
   store_data(data.Search,rating_arr2);
   //append(data.Search,rating_arr2);

   setTimeout(function(){
  
    append(data.Search,rating_arr1)
  
  },3000);

  setTimeout(function(){
    document.getElementById("loader").innerHTML=null;

  },3000);
  

  }



  movie_data();

function store_data(data,rate){

    let new_arr=JSON.parse(localStorage.getItem("movies")) || [];

   

data.forEach(function(el,i){

el.rating=rate[i];
new_arr.push(el);

});

if(new_arr.length<=20)
{
localStorage.setItem("movies",JSON.stringify(new_arr));
}



}




  function append(data,rate){

    let movie_data_arr=data;
  // console.log(movie_data_arr);

    movie_data_arr.forEach(function(el,i){

        let div=document.createElement("div");
        
        let image_div=document.createElement("div");
        image_div.setAttribute("id","image_div");

        let image_tag=document.createElement("img");
        image_tag.setAttribute("src",el.Poster);

        image_div.append(image_tag);

        let p1_tag=document.createElement("p");
        p1_tag.innerText=el.Title;

        let p2_tag=document.createElement("p");
        p2_tag.innerText=el.Type;

        let p3_tag=document.createElement("p");
        p3_tag.innerText=el.Year;

        let p4_tag=document.createElement("p");
        p4_tag.innerText=rate[i];


     div.append(image_div,p1_tag,p2_tag,p3_tag,p4_tag);

     document.querySelector("#container").append(div);



    });


  }


  function display(arr){

    document.querySelector("#container").innerHTML=null;
    arr.forEach(function(el){

        let div=document.createElement("div");
        
        let image_div=document.createElement("div");
        image_div.setAttribute("id","image_div");

        let image_tag=document.createElement("img");
        image_tag.setAttribute("src",el.Poster);

        image_div.append(image_tag);

        let p1_tag=document.createElement("p");
        p1_tag.innerText=el.Title;

        let p2_tag=document.createElement("p");
        p2_tag.innerText=el.Type;

        let p3_tag=document.createElement("p");
        p3_tag.innerText=el.Year;

        let p4_tag=document.createElement("p");
        p4_tag.innerText=el.rating;


     div.append(image_div,p1_tag,p2_tag,p3_tag,p4_tag);

     document.querySelector("#container").append(div);
    });
  }

  



  let low_to_high=document.querySelector("#sort-lh");
  low_to_high.addEventListener("click",ascending);

  function ascending(){


   let data_arr=JSON.parse(localStorage.getItem("movies"));
   
   data_arr.sort(function(a,b){

    return a.rating-b.rating;
   });
    
   display(data_arr);


  }





  let high_to_low=document.querySelector("#sort-hl");
  high_to_low.addEventListener("click",descending);

  function descending(){


   let data_arr=JSON.parse(localStorage.getItem("movies"));
   
   data_arr.sort(function(a,b){

    return b.rating-a.rating;
   });
    
   display(data_arr);


  }



  let all=document.querySelector("#all");
  all.addEventListener("click",normal);

  function normal(){


   let data_arr=JSON.parse(localStorage.getItem("movies")); 
   display(data_arr);
   

  }

  

let count=1;

let id;

function debounce(func_name,delay){


  clearInterval(slider_interval);
document.querySelector("#carousel").innerHTML=null;
document.querySelector("#carousel+div").innerHTML=null;
document.querySelector("#sorting").innerHTML=null;
//document.querySelector("#loader").innerHTML=null;
document.querySelector("#container").innerHTML=null;

 if(count==1)
  {
let loader=document.querySelector("#loader");
let image_tag=document.createElement("img");
image_tag.setAttribute("src","https://media4.giphy.com/media/xTk9ZvMnbIiIew7IpW/200w.webp?cid=ecf05e47bivnlly04nxujpbpy0dmpxgtcmt61cejv9k3tosd&rid=200w.webp&ct=g");

loader.append(image_tag);
}

count++;

  if(id)
  {
  clearInterval(id);
  }


  id=setTimeout(function(){
  
  func_name();
  document.querySelector("#loader").innerHTML=null;
  },delay);
  
  }

  async function movie_data_on_search(){

    let searched_movie=document.querySelector("#search_box").value;

    if(searched_movie=="")
    {
      window.location.reload();
    }
    let ans =await fetch(`https://www.omdbapi.com/?apikey=cfc3a8b9&s=${searched_movie}`);
  
    let data=await ans.json();

   append_again(data.Search);


}


function append_again(arr){

//   clearInterval(slider_interval);
// document.querySelector("#carousel").innerHTML=null;
// document.querySelector("#carousel+div").innerHTML=null;
// document.querySelector("#sorting").innerHTML=null;
// document.querySelector("#container").innerHTML=null;


arr.forEach(function(el){

  let div=document.createElement("div");
  
  let image_div=document.createElement("div");
  image_div.setAttribute("id","image_div");

  let image_tag=document.createElement("img");
  image_tag.setAttribute("src",el.Poster);

  image_div.append(image_tag);

  let p1_tag=document.createElement("p");
  p1_tag.innerText=el.Title;

  let p2_tag=document.createElement("p");
  p2_tag.innerText=el.Type;

  let p3_tag=document.createElement("p");
  p3_tag.innerText=el.Year;




div.append(image_div,p1_tag,p2_tag,p3_tag);

document.querySelector("#container").append(div);
});


}








  
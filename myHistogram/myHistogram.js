//HERE WE CALL THE HANDLEFILE FUNCTION WHEN ON THE TRIGGER OF THE "CHANGE" EVENT
document.getElementById("image").addEventListener("change",handlefile);

function handlefile()
{
   //here we get the image from the html part then we labelled with the id of "image"
   var uploadedimage=document.getElementById("image").files[0];
   
   //here we instantiate a new image object and name it as "imageobject"
   var imageobject=new Image();
   
   //here we make a filereader object and name it as reader
   var reader=new FileReader();
   
   
   //once the reader is loader the image source file is copied in the imageobect
   reader.addEventListener("load",function(){   imageobject.src=reader.result;})
   
   //once the image is loaded with send it to a function where the image data would be extracted from
   imageobject.onload=function()
   {
      getdatafromimage(imageobject);
   }
   
   reader.readAsDataURL(uploadedimage);
}

function getdatafromimage(imageobject)
{
   //here we call the canvas with the id of "imageCanvas"
   var imagecanvas=document.getElementById("imageCanvas");
   
   //here we get the 2d context of the specified canvas 
   let ctx=imagecanvas.getContext("2d");
   
   //in the below 2 lines we make the canvas width and height equal to the width and the height of the image
   imagecanvas.width=imageobject.width;
   imagecanvas.height=imageobject.height;
   
   //here we clear the canvas to remove any previous images
   ctx.clearRect(0,0,ctx.width,ctx.height);
   
   //the selected image is displayed here
   ctx.drawImage(imageobject,0,0);
   
   //data is extracted from the selected image 
   var pixelinformation=ctx.getImageData(0,0,imageobject.width,imageobject.height).data;
   
   //here 3 empty arrays are declared
   var redArray=[];
   var greenArray=[];
   var blueArray=[];
   
   //here 256 arrays locations been made in the above 3 arrays 
   for(var p=0;p<256;p++)
   {
      redArray[p]=0;
      greenArray[p]=0;
      blueArray[p]=0;
   }
   
   //here frequency of the value in the index gets incremented by 1 everytime the specified value of the pixel occurs
   //note the index are marked with the values from 0-255 everytime any pixel occurs in the range, the value that specific index is incremented by 1
   
    for(var i=0;i<pixelinformation.length;i+=4)         
    {
       redArray[    pixelinformation[i]     ]       ++;
       greenArray[    pixelinformation[i+1]   ]       ++;
       blueArray [    pixelinformation[i+2]   ]       ++;
    }
   
   //here the 3 arrays containing the RGBA values are passed, so that their histogram can be made
   histogramCreation(redArray,greenArray,blueArray,imageobject);
}

function histogramCreation(redArray,greenArray,blueArray,imageobject)
{
   //here we call the canvas with the id of "histogramCanvas"
   var histogramcanvas=document.getElementById("histogramCanvas");
   
   //here we get the 2d context of the specified canvas 
   let ctx=histogramcanvas.getContext("2d");
   
   //here we the y axis as 0
   var y=1000;
   
   //here we clear the canvas to remove traces of any previous histograms
   ctx.clearRect(0,0,1000,1000);
   
   
   //loop to check the frequency of the all the pixels in the histogram
   for(var i=0;i<256;i++)
   {
      //begin the path for the specified pixel
      ctx.beginPath();
      //move to (i,1000)
      ctx.moveTo((i),y);
      //make a line uptil  (i,1000-frequency of that specified pixel)
      ctx.lineTo((i),y-redArray[i]);

      //make the line of the red color
      ctx.strokeStyle="red";
      //draw the line
      ctx.stroke();


      //begin the path for the specified pixel
      ctx.beginPath();
      //move to (i+256,1000)
      ctx.moveTo((i+256),y);
      //make a line uptil  (i+256,1000-frequency of that specified pixel)
      ctx.lineTo((i+256),y-greenArray[i]);

      //make the line of green color
      ctx.strokeStyle="green";
      //draw the line
      ctx.stroke();


      //begin the path for the specified pixel
      ctx.beginPath();
      //move to (i+512,1000)
      ctx.moveTo((i+512),y);
      //make a line uptil  (i+512,1000-frequency of that specified pixel)
      ctx.lineTo((i+512),y-blueArray[i]);

      //make the line of blue color
      ctx.strokeStyle="blue";
      //draw the line
      ctx.stroke();
      
   }
}
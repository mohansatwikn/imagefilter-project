var image=null,greyimage=null,redimage=null,iimage=null;greyimage=null;yellowimage=null;blurimage=null;
var dd1=document.getElementById("canvas");
function showimage(){
  var getimage=document.getElementById("ipimage");
  image=new SimpleImage(getimage);
  greyimage=new SimpleImage(getimage);
  redimage=new SimpleImage(getimage);
  iimage=new SimpleImage(getimage);
  greyimage=new SimpleImage(getimage);
  yellowimage=new SimpleImage(getimage);
  blurimage=new SimpleImage(getimage);
   image.drawTo(dd1);
}
function resetimage(){
getimage=document.getElementById("ipimage");
  redimage=new SimpleImage(getimage);
  yellowimage=new SimpleImage(getimage);
  blurimage=new SimpleImage(getimage);
  image.drawTo(dd1);
}
function changegrey(){
  if(greyimage==null || !greyimage.complete())
  {alert("You did not upload image yet")}
  else{
  for(var pixel of greyimage.values()){
    var avg=(pixel.getRed()+pixel.getGreen()+pixel.getBlue())/3;
pixel.setRed(avg);pixel.setGreen(avg);pixel.setBlue(avg);
  } 
  greyimage.drawTo(dd1);
  }
}
function changered(){
  if(greyimage==null || !greyimage.complete())
  {alert("You did not upload image yet")}
  else{
  for(var pixel of redimage.values()){
    var avg=(pixel.getRed()+pixel.getGreen()+pixel.getBlue())/3;
   if(avg<128){
     pixel.setRed(2*avg);
      pixel.setGreen(0);
     pixel.setBlue(0)}
   else{ 
     pixel.setRed(255);
     pixel.setGreen(2*avg-255);
     pixel.setBlue(2*avg-255)}
  }
  redimage.drawTo(dd1);}
}
function iinvert(){
  if(greyimage==null || !greyimage.complete())
  {alert("You did not upload image yet")}
  else{
  for(var pixel of iimage.values()){
    pixel.setRed(255-pixel.getRed())
    pixel.setGreen(255-pixel.getGreen());
    pixel.setBlue(255-pixel.getBlue());
  }
  iimage.drawTo(dd1);}
}
function changeyellow(){
  if(greyimage==null || !greyimage.complete())
  {alert("You did not upload image yet")}
  else{
  for(var pixel of yellowimage.values()){
    var avg=(pixel.getRed()+pixel.getGreen()+pixel.getBlue())/3;
  if (avg < 128) {
        pixel.setRed(2 * avg);
        pixel.setGreen(2*avg);
        pixel.setBlue(0);
      } else {
        pixel.setRed(255);
        pixel.setGreen(255);
        pixel.setBlue(2 * avg - 255);}
      }
        yellowimage.drawTo(dd1);
  }
}
function changeblur() {
  if(blurimage==null || !blurimage.complete())
  {alert("You did not upload image yet")}
  else{
    for (var pixel of blurimage.values()) {
        var x = pixel.getX();
        var y = pixel.getY();
        if (Math.random() < 0.5) {
            //change pixel
            var newPixel = getNearbyPixel(x,y);
            blurimage.setPixel(x,y,newPixel);
        }
    }
    blurimage.drawTo(dd1); 
  }
}
function getNearbyPixel(x,y) {
    //returns a nearby pixel
    var radius = 10;
    var dx = Math.random()*2*radius - radius;
    var dy = Math.random()*2*radius - radius;
    var newX = ensureInImage(x+dx, blurimage.getWidth());
    var newY = ensureInImage(y+dx, blurimage.getHeight());
    var newPix = blurimage.getPixel(newX,newY);
    return newPix;
}

function ensureInImage(coord, size) {
    //returns acceptable coordinate
    if (coord < 0) {
        return 0;
    }
    if (coord >= size) {
        return size-1;
    }
    else {
        return coord;
    }
}
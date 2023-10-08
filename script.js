const ball=document.getElementById('ball');
const hole=document.getElementById('hole');
const field=document.getElementById('field');
let ballCord=ball.getBoundingClientRect();
let holeCord=hole.getBoundingClientRect();
const fieldCord=field.getBoundingClientRect();

let winsound=new Audio("./ballsound.mpeg")

ball.addEventListener('mousedown',ballPress);
let by=ballCord.top
let bx=ballCord.left
let vx=0,vy=0,dx=0,dy=0,dec=0.01;
let flag=0;

function ballPress(){
    flag=1;
}

document.addEventListener('mouseup',(event)=>{
    if(flag==1){
    let mx = event.clientX; 
    let my = event.clientY;
    let x1=bx+ballCord.width/2;
    let y1=by+ballCord.height/2;
    let speed=Math.min(20,(Math.abs(mx-x1)+ Math.abs(my-y1))/10);
    let angle=Math.atan((my-y1)/(mx-x1));
    vx=Math.abs((speed)*Math.cos(angle));
    vy=Math.abs((speed)*Math.sin(angle));
    dx=Math.abs((dec)*Math.cos(angle));
    dy=Math.abs((dec)*Math.sin(angle));
    if(mx>x1 && my<y1){
        vx=-vx;
    }
    else if(mx<x1 && my>y1){
        vy=-vy;
    }
    else if(mx>x1 && my>y1){
        vy=-vy;
        vx=-vx;
    }
    movement();
    flag=0;
}
})

function inhole(bx,by){
    if(bx>=holeCord.left && bx+ballCord.width<=holeCord.right && by>=holeCord.top && by+ballCord.height<=holeCord.bottom && Math.sqrt(vx*vx +vy*vy)<=8 ){
        winsound.play();
        return true;
    }
    return false;
}

function movement(){
    let timeid=setInterval(()=>{
        if(by+ballCord.height>fieldCord.bottom-fieldCord.top ||by<0){
            vy=-vy;
         }
        if(bx+ballCord.width >fieldCord.right-fieldCord.left || bx<0){
            vx=-vx;
        }
        vx=(vx/Math.abs(vx))*Math.abs(Math.abs(vx)-dx);
        vy=(vy/Math.abs(vy))*Math.abs(Math.abs(vy)-dy);
        if((Math.round(vx,10)==0 && Math.round(vy,10)==0) || inhole(bx,by)){
            clearInterval(timeid);
        }
        bx+=vx;
        by+=vy;
        ball.style.left=bx+'px'
        ball.style.top=by+'px'
    },10)
}
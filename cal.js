

//declare your class here

class Calculator {
    constructor (screen1TxtElement,screen2TxtElement){
        this.screen1TxtElement=screen1TxtElement;
        this.screen2TxtElement=screen2TxtElement;
        this.clear();
    }

    clear(){
        this.screen1='';
        this.screen2='';
        this.operation=undefined;
    }

    del(){

        this.screen2=this.screen2.toString().slice(0,-1);
    }

    append(num){

        if (num ==='.' && this.screen2.includes('.'))return
        this.screen2+=num;
    }

    Operate(operation){

        if (this.screen2==='')return

        if (this.operation!=''){
            this.compute()
        }
       
        this.operation=operation;
        this.screen1=this.screen2;
        this.screen2='';
    }

    compute(){
        let res;
        const cur=parseFloat(this.screen2);
        const prev=parseFloat(this.screen1);
        if (isNaN(prev) || isNaN(cur))return
        switch(this.operation){
            case '+':
                res=prev+cur;
                break;
            case '-':
                res=prev-cur;
                break;
            case '*':
                res=prev*cur;
                break;
            case '/':
                res=prev/cur;
                break;
            default:
                return
        }

        this.screen2=res;
        this.screen1='';
        this.operation='';
    }

    formatNum(num){
        const strNum=num.toString();
        const intDig=parseFloat(strNum.split('.')[0]);
        const decDig=strNum.split('.')[1];
        let out;
        if (isNaN(intDig)){
            out='';
        }else{
            out=intDig.toLocaleString('en',{maximumFractionDigits:0})
        }
        if (decDig!=null){

            return `${out}.${decDig}`;
        }else{
            return out;
        }
       

    }
    displayOut(){
        this.screen2TxtElement.innerText=this.formatNum(this.screen2);
        if (this.operation!=null){
            this.screen1TxtElement.innerText=`${this.screen1} ${this.operation}`;
        }else{
            this.screen1TxtElement.innerText='';
        }
        
    }


}

// code your logic here
//declare your variables here

const numButtons = document.querySelectorAll('[data-number]');
const opButtons = document.querySelectorAll('[data-operation]');
const eqButton = document.querySelector('[data-eq]');
const delButton = document.querySelector('[data-del]');
const acButton = document.querySelector('[data-ac]');
const screen1TxtElement = document.querySelector('[data-s1]');
const screen2TxtElement = document.querySelector('[data-s2]');

const cal = new Calculator(screen1TxtElement,screen2TxtElement);

numButtons.forEach(button => {
    button.addEventListener('click', () => {
        cal.append(button.innerText)
        cal.displayOut()
    })
})

acButton.addEventListener('click', ()=>{
    cal.clear();
    cal.displayOut();
})

opButtons.forEach(button => {
    button.addEventListener('click', () => {
        cal.Operate(button.innerText)
        cal.displayOut()
    })
})

eqButton.addEventListener('click',()=>{
    cal.compute()
    cal.displayOut()
})

delButton.addEventListener('click', ()=>{
    cal.del();
    cal.displayOut();
})

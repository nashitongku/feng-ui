const utils = {
    debounce: function (fn = () =>{}, time= 1000) {
        let timer: any;
        return function () {
            if (!timer) {
                timer = setTimeout(() => {fn();timer = null}, time);
            }
        }
    },
    inViewReport: function (windowWidth=0,windowHeight=0, {x=0, y=0, bottom=0, right=0}){
        if(x > 0 && x < windowWidth && y > 0 && y < windowHeight){
            return true
        }
        if(right > 0 && right < windowWidth && bottom > 0 && bottom < windowHeight){
            return true
        }

        return  false;
    }

}
export default utils;
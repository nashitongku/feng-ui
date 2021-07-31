const utils = {
    debounce: function (fn = () =>{}, time= 1000) {
        let timer: any;
        return function () {
            if (!timer) {
                timer = setTimeout(() => {fn();timer = null}, time);
            }
        }
    },

}
export default utils;
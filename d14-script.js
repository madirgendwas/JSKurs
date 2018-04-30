var addieren = function(a, b){
    if (arguments.length == 0 ){
        return 0;
    }

    if(a*1 == a && b*1 == b){
        return a*1 + b*1;
    }

    if (typeof(a) == "string" && typeof(b) == "string"){
        return a+b;
    }

     if (typeof(a) == "string") {
         if ((a.replace(",", ".")*1) !== NaN) {
             a = (a.replace(",", ".")*1)
         }
     }

    if (typeof(b) == "string") {
        if ((b.replace(",", ".")*1) !== NaN) {
            b = (b.replace(",", ".")*1)
        }
    }
    return a + b;

}

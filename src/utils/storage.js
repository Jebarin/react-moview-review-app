export const storage = { 
    set : function(name,value, type){ 
        value = (typeof value) === "object" ? JSON.stringify(value) : value;
        if(type === "session" ) {
            sessionStorage.setItem(name, value); 
        }
        else {
            localStorage.setItem(name, value); 
        }
    },
    get : function(key, type){ 
        let val = null;
        if(type === "session" ) {
            val = sessionStorage.getItem(key);
        }
        else {
            val = localStorage.getItem(key);
        }
        var parsed;
        try {
            parsed = JSON.parse(val);
        } catch (e) {
            parsed = JSON.parse(JSON.stringify(val));
        }

        return parsed;
    },   
    del :function(key,type) {
        if(type === "session" ) {
            sessionStorage.removeItem(key);
        }
        else {
            localStorage.removeItem(key);
        } 
    } 
};
class Mathf {
    static random(min, max, outInt = true, exclude = []) {
        if(outInt ? Math.floor(min) === Math.floor(max) && exclude.indexOf(Math.floor(min)) > -1
                : min === max && exclude.indexOf(Math.floor(min)) > -1) {
            return min;
        }
        for(;;) {
            let num = (Math.random() * (max - min + outInt ? 1 : 0.001)) + min;
            num = outInt ? Math.floor(num) : num;
            if(exclude.indexOf(num) <= -1) return num;
        }
    };
    
    static rad(degrees) {
        return degrees * Math.PI / 180;
    }
    
    static deg(radians) {
        return (radians / Math.PI) * 180;
    }
    
    static clamp(value, min, max) {
        return min === max ? min : min < max ? 
                (value < min ? min : value > max ? max : value)
                : (value > max && value < min ? 
                Math.abs(min - value) > Math.abs(max - value) 
                ? max : min : value);
    }
    static next(value, min, max) {
        if(max > min) {
            value++;
            if(value > max) value = min;
            return value;
        }
        if(min > max) {
            value--;
            if(value < min) value = max;
            return value;
        }
        return min;
    }
    
    static clamp360(angle) {
        if(angle > 0) return angle % 360;
        if(angle < 0) {
            while(angle < 0) angle += 360;
        }
        return angle;
    }
    
    static clamp2pi(angle) {
        if(angle > Math.PI * 2) {
            while(angle > Math.PI * 2) {
                angle -= Math.PI * 2;
            }
        }
        if(angle < 0) {
            while(angle < 0) angle += Math.PI * 2;
        }
        return angle;
    }
}

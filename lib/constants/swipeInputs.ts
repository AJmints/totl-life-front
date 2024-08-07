export const swipeEvent = (props:any) => { //props.setManuToggle, props.menuToggle
    document.addEventListener('touchstart', handleTouchStart, false);        
    document.addEventListener('touchmove', handleTouchMove, false);

    var xDown: any = null;                                                        
    var yDown: any = null;
    
    function getTouches(evt: any) {
      return evt.touches ||             // browser API
             evt.originalEvent.touches; // jQuery
    }                                                     
    
    function handleTouchStart(evt: any) {
        const firstTouch = getTouches(evt)[0];                                      
        xDown = firstTouch.clientX;                                      
        yDown = firstTouch.clientY;                                      
    };                                                
    
    function handleTouchMove(evt: any) {
        if ( ! xDown || ! yDown ) {
            return;
        }
    
        var xUp = evt.touches[0].clientX;                                    
        var yUp = evt.touches[0].clientY;
    
        var xDiff = xDown - xUp;
        var yDiff = yDown - yUp;
        
        if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) {/*most significant*/
            if ( xDiff > 0 ) {
                /* right swipe */
                props.setMenuToggle(true)
            } else {
                /* left swipe */
                // props.setMenuToggle(false)
            }                       
        } else {
            if ( yDiff > 0 ) {
                /* down swipe */ 
                // props.setMenuToggle(false)
            } else {
                /* up swipe */
                // if (props.menuToggle === true) {
                //     props.setMenuToggle(false)
                //     console.log("Why?")
                // } else {
                    /*    props.setMenuToggle(true)   */
                //     console.log("maybe?")
                // }
            }                                                                 
        }
        /* reset values */
        xDown = null;
        yDown = null;          
        
        return 
    };
}
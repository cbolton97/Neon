window.currentLayer;

function routeLayer($initiator, $requestedLayer) {

    var requestedPage = "Rotation";
        //Save "page" value of $requestedLayer to $requestedPage 

    switch(initiator){

        case "nav":
            if(requestedPage !== currentPage){
                if (requestedStackPos !== null) {
                    window.currentLayer = requestedStackPos;
                        
                } else {
                    window.currentLayer = requestedLayer;
                     
                }
			
            }
            break;

        default:
            window.currentLayer = requestedLayer;
            break;

    }
    //purge $requestedLayer
    //purge $requestedStackPos
    //Hide all stack elements
    console.log(currentLayer);
    //Activate $currentLayer and $currentPage UI generation (using CSS classes)
    //Run functions associated with $currentLayer and $currentPage


  }

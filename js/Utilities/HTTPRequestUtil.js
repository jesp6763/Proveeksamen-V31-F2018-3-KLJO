class HTTPRequestUtil
{
    static _Request(methodType, url, async = true, requestDoneCallback = null, mimeType = "application/json")
    {
        let xhttpRequest = new XMLHttpRequest();
        xhttpRequest.overrideMimeType(mimeType);
        xhttpRequest.open(methodType, url, async)

        xhttpRequest.onreadystatechange = function(){
            if(xhttpRequest.readyState == 4){
                if(xhttpRequest.status == "200"){
                    if(requestDoneCallback)
                    {
                        requestDoneCallback(xhttpRequest.responseText);
                    }
                    else{
                        return xhttpRequest.responseText;
                    }
                }
            }
        }

        xhttpRequest.send(null);
    }

    /**
     * Creates a new asynchronous XMLHttpRequest.
     * Returns the response text.
     * @param {string} methodType The method type of the request. GET or POST.
     * @param {string} mimeType The mime type. 
     */
    static RequestAsync(methodType, url, requestDoneCallback, mimeType = "application/json")
    {
        this._Request(methodType, url, true, requestDoneCallback, mimeType);
    }

    /**
     * Creates a new synchronous XMLHttpRequest.
     * Returns the response text.
     * @param {string} methodType The method type of the request. GET or POST.
     * @param {string} mimeType The mime type. 
     */
    static RequestSync(methodType, url, mimeType = "application/json"){
        this._Request(methodType, url, false, null, mimeType);
    }
}


(function() {

// http://www.saxproject.org/apidoc/org/xml/sax/SAXException.html
function SAXException(message, exception) { // java.lang.Exception
    this.message = message;
    this.exception = exception;
}
SAXException.prototype = new Error(); // We try to make useful as a JavaScript error, though we could even implement java.lang.Exception
SAXException.constructor = SAXException;
SAXException.prototype.getMessage = function () {
    return this.message;
};
SAXException.prototype.getException = function () {
    return this.exception;
};


// Not fully implemented
// http://www.saxproject.org/apidoc/org/xml/sax/SAXNotSupportedException.html
function SAXNotSupportedException (msg) { // java.lang.Exception
    this.message = msg || '';
}
SAXNotSupportedException.prototype = new SAXException();
SAXNotSupportedException.constructor = SAXNotSupportedException;

// http://www.saxproject.org/apidoc/org/xml/sax/SAXNotRecognizedException.html
function SAXNotRecognizedException (msg) { // java.lang.Exception
    this.message = msg || '';
}
SAXNotRecognizedException.prototype = new SAXException();
SAXNotRecognizedException.constructor = SAXNotRecognizedException;



//This constructor is more complex and not presently implemented;
//  see Java API to implement additional arguments correctly
// http://www.saxproject.org/apidoc/org/xml/sax/SAXParseException.html
function SAXParseException (msg, locator) { // java.lang.Exception //
    this.message = msg || '';
    this.locator = locator;
}
SAXParseException.prototype = new SAXException();
SAXParseException.constructor = SAXParseException;
SAXParseException.prototype.getColumnNumber = function () {
    if (this.locator) {
        return this.locator.getColumnNumber();
    }
};
SAXParseException.prototype.getLineNumber = function () {
    if (this.locator) {
        return this.locator.getLineNumber();
    }
};
SAXParseException.prototype.getPublicId = function () {
    if (this.locator) {
        return this.locator.getPublicId();
    }
};
SAXParseException.prototype.getSystemId = function () {
    if (this.locator) {
        return this.locator.getSystemId();
    }
};


this.SAXException = SAXException;
this.SAXParseException = SAXParseException;
this.SAXNotSupportedException = SAXNotSupportedException;
this.SAXNotRecognizedException = SAXNotRecognizedException;


}());
